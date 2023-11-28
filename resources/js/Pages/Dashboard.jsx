import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import ChatWindow from "./Messages/ChatWindow";

export default function Dashboard({ user, myPrivateRooms, myPublicRooms }) {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [roomHasChanged, setRoomHasChanged] = useState(false);

    const handleRoomItemClicked = (room) => {
        setSelectedRoom(room);
        console.log("Room with id " + room.id + " has been selected");
    };

    return (
        <>
            <Head title="Home" />
            <div className="flex">
                {/* Left Bar */}
                <div className="p-4 w-1/4 bg-gray-200">
                    <div id="user-details container" className="flex mb-8">
                        <div
                            id="profile-picture-container"
                            className="rounded-full h-24 w-24 overflow-hidden bg-cover"
                        >
                            <img src="/dp.jpeg" alt="profile picture" />
                        </div>

                        <div id="user-name" className="p-4">
                            <p className="text-2xl text-blue-600 font-bold">
                                {user.name}
                            </p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* Private Rooms Section */}
                    <div>
                        {myPrivateRooms && myPrivateRooms.length > 0 ? (
                            <>
                                <p className="text-lg text-gray-600 font-semibold mb-2">
                                    Chats
                                </p>
                                {myPrivateRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        onClick={() =>
                                            handleRoomItemClicked(room)
                                        }
                                        className="flex p-3 cursor-pointer hover:bg-gray-400 hover:scale-105 duration-300 rounded-sm border-gray-500"
                                    >
                                        <div
                                            id="rooms-container"
                                            className="flex "
                                        >
                                            <div
                                                id="room-image"
                                                className="rounded-full"
                                            >
                                                <img
                                                    src="/dp.jpeg"
                                                    alt="room image"
                                                    className="overflow-hidden h-12 w-12 rounded-full"
                                                />
                                            </div>
                                            <div className="px-3">
                                                <p className="text-lg text-blue-600 font-semibold">
                                                    {room.room_name}
                                                </p>
                                                <p className="text-gray-600 text-sm font-semibold">
                                                    Lorem ipsum dolor sit amet.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-white">
                                You don't have any private chats yet
                            </p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t my-4 border-gray-300"></div>

                    {/* Public Rooms Section */}
                    <div>
                        {myPublicRooms && myPublicRooms.length > 0 ? (
                            <>
                                <p className="text-lg text-gray-600 font-semibold mb-2">
                                    Groups
                                </p>
                                {myPublicRooms.map((room) => (
                                    <div
                                        key={room.id}
                                        onClick={() =>
                                            handleRoomItemClicked(room)
                                        }
                                        className={`flex p-3 cursor-pointer hover:bg-blue-600 
                                        ${
                                            selectedRoom &&
                                            selectedRoom.id === room.id
                                                ? "bg-blue-600"
                                                : ""
                                        }`}
                                    >
                                        <div
                                            id="rooms-container"
                                            className="flex"
                                        >
                                            <div
                                                id="room-image"
                                                className="rounded-full"
                                            >
                                                <img
                                                    src="/dp.jpeg"
                                                    alt="room image"
                                                    className="overflow-hidden h-12 w-12 rounded-full"
                                                />
                                            </div>
                                            <div className="px-3">
                                                <p className="text-lg text-blue-600 font-semibold">
                                                    {room.room_name}
                                                </p>
                                                <p className="text-gray-600 text-sm font-semibold">
                                                    Lorem ipsum dolor sit amet.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p className="text-white">
                                You don't have any public chats yet
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Bar */}
                <div className="bg-gray-100 w-3/4">
                    {selectedRoom && (
                        <ChatWindow
                            key={selectedRoom.id}
                            roomId={selectedRoom.id}
                            userId={user.id}
                            initialMessages={selectedRoom.messages}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
