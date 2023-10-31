<?php

namespace App\Http\Controllers;

use App\Models\Friendships;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FriendshipsController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $user = Auth::user();

        $friendships = Friendships::where('user_one', $user->id)
            ->orWhere('user_two', $user->id)
            ->get();

        $friends = collect();

        foreach ($friendships as $friendship) {
            $friendId = ($friendship->user_one === $user->id) ? $friendship->user_two : $friendship->user_one;

            $friend = User::find($friendId);
            if ($friend)
                $friends->push($friend);
        }

        return Inertia::render('Friends/ShowFriends', [
            'auth' => $user,  // Send authenticated user data
            'friends' => $friends // Send friends list
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Friendships $friendships)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Friendships $friendships)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Friendships $friendships)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Friendships $friendships)
    {
        //
    }
}
