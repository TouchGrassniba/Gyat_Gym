<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{

   
    // Get all members
    public function index()
    {
        $members = Member::all();
        return response()->json(['data' => $members], 200);
    }

    // Store a new member
    public function store(Request $request)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'paket' => 'required|string', // Add validation for Paket
        ]);

        $member = Member::create($request->all());
        return response()->json(['message' => 'Member added successfully!', 'member' => $member], 201);
    }

    // Update an existing member
    public function update(Request $request, $id)
    {
        $request->validate([
            'nickname' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'paket' => 'required|string', // Add validation for Paket
        ]);

        $member = Member::findOrFail($id);
        $member->update($request->all());
        return response()->json(['message' => 'Member updated successfully!', 'member' => $member], 200);
    }

    // Delete a member
    public function destroy($id)
    {
        $member = Member::findOrFail($id);
        $member->delete();
        return response()->json(['message' => 'Member deleted successfully!'], 200);
    }
}
