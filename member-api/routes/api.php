<?php

use App\Http\Controllers\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

// Secure route for authenticated user information
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Routes for managing gym members
Route::get('/member', [MemberController::class, 'index']);
Route::post('/member', [MemberController::class, 'store']);
Route::put('/member/{id}', [MemberController::class, 'update']);
Route::delete('/member/{id}', [MemberController::class, 'destroy']);

// AI Chat Route
Route::post('/aichat', function (Request $request) {
    $message = $request->input('message');

    // Check if the message is empty
    if (empty($message)) {
        return response()->json(['error' => 'Message is required'], 400);
    }

    // Get Hugging Face API key from the .env file
    $apiKey = env('HUGGINGFACE_API_KEY');
    if (!$apiKey) {
        return response()->json(['error' => 'Hugging Face API key is missing'], 500);
    }

    // Define the system message for the AI (to behave as a coach)
    $systemMessage = 'You are a knowledgeable fitness coach who provides expert, friendly advice on exercise, nutrition, and health. Keep responses concise and educational.';

    try {
        // Hugging Face Inference API request
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiKey,
            'Content-Type' => 'application/json',
        ])->post('https://api-inference.huggingface.co/models/gpt2', [
            'inputs' => $message,
            'parameters' => [
                'max_length' => 150, // Control response length
                'temperature' => 0.7,
                'stop_sequence' => '\n', // Add stop sequence to prevent long responses
            ]
        ]);

        // If successful, return the model's reply
        if ($response->successful()) {
            // Add the system message context to make the response more aligned with a fitness coach
            return response()->json([
                'reply' => 'AI Coach: ' . $response->json()[0]['generated_text']
            ]);
        } else {
            // Log the error response from Hugging Face
            Log::error('Failed to get response from Hugging Face', ['response' => $response->body()]);
            return response()->json(['error' => 'Failed to get response from Hugging Face'], 500);
        }
    } catch (\Exception $e) {
        // Catch other exceptions and return a generic error
        Log::error('Error during Hugging Face request', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
    }
});
