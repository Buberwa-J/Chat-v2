<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\UserRelations;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $user = Auth::user();
        $myRelations = UserRelations::where('user_id', $user->id)->get();

        $myPublicRooms = collect();
        $myPrivateRooms = collect();

        if ($myRelations) {
            foreach ($myRelations as $relation) {
                $room = Room::where('id', $relation->room_id)
                    ->with('users')
                    ->first();

                if ($room->room_type === 'private') {
                    $otherUser = $room->users->firstWhere('id', '!=', $user->id);
                    $room->room_name = $otherUser->name;
                    $myPrivateRooms->push($room);
                } else {
                    $myPublicRooms->push($room);
                }
            }
        }
        //dd($myPrivateRooms, $myPublicRooms);
        return Inertia::render('Dashboard', compact('myPublicRooms', 'myPrivateRooms', 'user'));
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
