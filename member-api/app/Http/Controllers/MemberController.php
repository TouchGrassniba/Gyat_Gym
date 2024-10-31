<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Contracts\Support\ValidatedData;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::all();
        return response()->json([
            'code'=>200,
            'message'=>'Success',
            'data'=>$members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData= $request->validate([
            'nickname'=>'required|string|max:255',
            'fullname'=>'required|string|max:255',
            'email'=>'required|string|unique:members,email',
            'start_date'=>'required|date',
            'end_date'=>'required|date|after_or_equal:start_date'
        ]);
        $member = Member::create($validatedData);
        return response()->json([
            'code'=>201,
            'message'=>'member created successfully',
            'data'=>$member

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Member $member)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        //
    }
}
