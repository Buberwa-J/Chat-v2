<?php

namespace Database\Seeders;

use App\Models\Friendships;
use App\Models\Messages;
use App\Models\Room;
use App\Models\User;
use App\Models\UserRelations;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class DatabaseSeeder extends Seeder
{
    /* 1. Create the users
       2. Create Friendships
       3. Create Rooms
       4. Create user_room relations
       5. Create messages
           etc
     */
    public function getRandomNumberExcluding($NotNeeded)
    {
        do {
            $value = rand(1, 100);
        } while ($value == $NotNeeded);
        return $value;
    }
    public function run(): void
    {

        // Create the users
        for ($i = 1; $i < 101; $i++) {
            $firstName = fake()->firstName();
            User::factory()->create([
                'name' => $firstName,
                'email' => strtolower('user' . $i . '@gmail.com')
            ]);
        }
        $users = User::all();
        $user14 = User::findOrFail(14);
        // Create the friendships
        foreach ($users as $user) {
            $count = 0;
            while ($count < 5) {
                $randomUser = $this->getRandomNumberExcluding($user->id);

                // Check if the combination already exists
                $exists = Friendships::where([
                    ['user_one', '=', $user->id],
                    ['user_two', '=', $randomUser]
                ])
                    ->orWhere([
                        ['user_one', '=', $randomUser],
                        ['user_two', '=', $user->id]
                    ])->exists();

                if (!$exists) { // if it doesn't exist, create it
                    Friendships::create([
                        'user_one' => $user->id,
                        'user_two' => $randomUser,
                        'status' => 'accepted'
                    ]);
                    $count++;
                }
            }
        }

        // Create the rooms
        for ($i = 1; $i < 56; $i++) {
            //Create Private Rooms
            if ($i <= 40) {
                Room::create([
                    'room_name' => fake()->word() . ' ' . fake()->word(),
                    'room_type' => 'private',
                ]);
            }
            // create rooms for user 14
            elseif ($i > 50) {
                Room::create([
                    'room_name' => fake()->word() . ' ' . fake()->word(),
                    'room_type' => 'private'
                ]);
            }

            //Create Public Rooms
            else {
                Room::create([
                    'room_name' => fake()->word() . ' ' . fake()->word(),
                    'room_type' => 'public'
                ]);
            }
        }
        // Create the user relations 
        $AllPublicRooms = Room::where('room_type', 'public')->get();
        $AllPrivateRooms = Room::where('room_type', 'private')
            ->where('id', '<=', 40)
            ->get();
        $AllUser14Rooms = Room::where('id', '>', 50)->get();

        // Create the user relations for user14' (for front end visualization)
        foreach ($AllUser14Rooms as $room) {
            $counter = 0;
            while ($counter < 2) {

                if ($counter < 1)
                    $RandomUserId = $user14->id;

                else
                    $RandomUserId = rand(1, 100);

                $UserRelationExists = UserRelations::where([
                    ['user_id',  '=', $RandomUserId],
                    ['room_id', '=', $room->id]
                ])->exists();

                if (!$UserRelationExists) {
                    UserRelations::create([
                        'user_id' => $RandomUserId,
                        'room_id' => $room->id
                    ]);
                    $counter++;
                }
            }
        }

        foreach ($AllPrivateRooms as $room) {
            $counter = 0;
            while ($counter < 2) {
                $RandomUserId = rand(1, 100);
                $UserRelationExists = UserRelations::where([
                    ['user_id',  '=', $RandomUserId],
                    ['room_id', '=', $room->id]
                ])->exists();

                if (!$UserRelationExists) {
                    UserRelations::create([
                        'user_id' => $RandomUserId,
                        'room_id' => $room->id
                    ]);
                    $counter++;
                }
            }
        }

        foreach ($AllPublicRooms as $room) {
            $counter = 0;
            while ($counter < 5) {

                if ($counter == 4)
                    $RandomUserId = $user14->id;

                else
                    $RandomUserId = rand(1, 100);

                $UserRelationExists = UserRelations::where([
                    ['user_id',  '=', $RandomUserId],
                    ['room_id', '=', $room->id]
                ])->exists();

                if (!$UserRelationExists) {
                    UserRelations::create([
                        'user_id' => $RandomUserId,
                        'room_id' => $room->id
                    ]);
                    $counter++;
                }
            }
        }
        $AllRelations = UserRelations::all();

        // Create the messages
        foreach ($AllRelations as $relation) {
            Messages::create([
                'sender_id' => $relation->user_id,
                'room_id' => $relation->room_id,
                'content' => fake()->sentence()
            ]);
        }
    }
}
