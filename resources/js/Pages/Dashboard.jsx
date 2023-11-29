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

                    {/* Divider */}
                    <div className="border-t my-4 border-gray-300"></div>

                    {/* Settings Panel */}
                    <div
                        id="settings panel"
                        className="px-2 justify-end mb-3 flex max-h-full space-x-4"
                    >
                        <form method="GET">
                            <div className="relative text-blue-600 focus-within:text-blue-400 mr-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button
                                        type="submit"
                                        className="p-1 focus:outline-none focus:shadow-outline"
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            className="w-8 h-6"
                                        >
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </button>
                                </span>
                                <input
                                    type="search"
                                    name="q"
                                    className="py-2 text-sm text-white rounded-md pl-10 focus:outline-none focus:bg-white focus:text-blue-500"
                                    placeholder="Search..."
                                    autoComplete="off"
                                />
                            </div>
                        </form>

                        <img
                            id="add-friend-icon"
                            src="add-friend.png"
                            alt="add friend"
                            className="h-10 w-10 hover:scale-125 duration-300"
                        />
                        <img
                            id="add-friend-icon"
                            src="new-message.png"
                            alt="add friend"
                            className="h-10 w-10 hover:scale-125 duration-300"
                        />
                        <img
                            id="add-friend-icon"
                            src="add-group.png"
                            alt="add friend"
                            className="h-10 w-10 hover:scale-125 duration-300"
                        />
                        <img
                            id="settings-icon"
                            src="settings.png"
                            alt="settings"
                            className="h-10 w-10 hover:scale-125 duration-300"
                        />
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
                                        className="flex p-3 cursor-pointer hover:bg-gray-300 hover:scale-105 duration-300 rounded-sm border-gray-500"
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
                                        className={`flex p-3 cursor-pointer hover:bg-gray-300 hover:scale-105 duration-300 
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
                        />
                    )}
                </div>
            </div>
        </>
    );
}
