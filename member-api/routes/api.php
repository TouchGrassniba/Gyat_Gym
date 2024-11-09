<?php

use App\Http\Controllers\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Log;

// Register and login routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Secure route for authenticated user information using JWT
Route::middleware('jwt.auth')->get('/user', function (Request $request) {
    // Log the incoming token (optional, for debugging purposes)
    Log::info('Token:', [$request->header('Authorization')]);

    return $request->user(); // Return authenticated user
});

// Routes for managing gym members
Route::middleware('jwt.auth')->get('/member', [MemberController::class, 'index']);
Route::middleware('jwt.auth')->post('/member', [MemberController::class, 'store']);
Route::middleware('jwt.auth')->put('/member/{id}', [MemberController::class, 'update']);
Route::middleware('jwt.auth')->delete('/member/{id}', [MemberController::class, 'destroy']);

// AI Chat Route using ChatGPT (OpenAI API)
Route::middleware('jwt.auth')->post('/aichat', function (Request $request) {
    $message = $request->input('message');
    $apiKey = env('AI21_API_KEY'); // Use AI21 API Key from .env

    if (empty($message)) {
        return response()->json(['error' => 'Message is required'], 400);
    }

    if (!$apiKey) {
        return response()->json(['error' => 'AI21 API key is missing'], 500);
    }

    $attempts = 0;
    $maxAttempts = 3;
    $waitTime = 5; // seconds

    while ($attempts < $maxAttempts) {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->post('https://api.ai21.com/studio/v1/chat/completions', [
                'model' => 'jamba-1.5-large',
                'messages' => [
                    ['role' => 'system', 'content' => 'Your name is Jimmy and you are a knowledgeable fitness coach who provides expert advice on diet, fitness, and wellness programs. Answer questions in a supportive and encouraging way, tailored to users\' fitness goals.'],
                    ['role' => 'user', 'content' => $message]
                ],
                'n' => 1,
                'max_tokens' => 2048,
                'temperature' => 0.4,
                'top_p' => 1,
                'response_format' => ['type' => 'text']
            ]);

            if ($response->successful()) {
                $reply = $response->json()['choices'][0]['message']['content'] ?? 'No response generated';
                return response()->json(['reply' => $reply]);
            } elseif ($response->status() === 503) { // 503 for service unavailable/loading
                sleep($waitTime); // wait before retrying
                $attempts++;
            } else {
                Log::error('Failed response from AI21 API', ['response' => $response->body()]);
                return response()->json(['error' => 'Failed to get response from AI21 API'], 500);
            }
        } catch (\Exception $e) {
            Log::error('API request error', ['exception' => $e->getMessage()]);
            return response()->json(['error' => 'An unexpected error occurred.'], 500);
        }
    }

    return response()->json(['error' => 'The model is taking too long to load. Please try again later.'], 500);
});
