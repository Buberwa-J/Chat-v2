<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Messages;
use App\Models\Room;
use App\Models\UserRelations;
use Illuminate\Console\Scheduling\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    // Send a message
    public function sendMessage(Request $request, Room $room)
    {
        $user = Auth::user();

        $request->validate([
            'content' => 'required|max:255',
        ]);

        $newMessage = Messages::create([
            'content' => $request->content,
            'sender_id' => $user->id,
            'room_id' => $room->id
        ]);
        broadcast(new MessageSent($newMessage))->toOthers();
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
    public function show(Room $room)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
