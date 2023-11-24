import React, { useState,useEffect } from 'react';
import { Head } from '@inertiajs/react';
import ChatWindow from './Messages/ChatWindow';

export default function Dashboard({ user, myPrivateRooms, myPublicRooms }) {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleRoomItemClicked = (room) => {
        setSelectedRoom(room);
    };
    useEffect(() => {
        console.log('Dashboard component re-rendered'); 
    });

    return (
        <>
            <Head title="Home" />
            <div className='flex h-screen'>
                {/* Left Bar */}
                <div className='p-4 w-1/4 bg-gradient-to-r from-teal-400 to-blue-500'>
                    <h1 className='text-xl text-white font-bold mb-4'>Private Chats</h1>

                    {/* Private Rooms Section */}
                    <div>
                        {myPrivateRooms && myPrivateRooms.length > 0 ? (
                            myPrivateRooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => handleRoomItemClicked(room)}
                                    className={`room-item cursor-pointer p-2 rounded-md hover:bg-blue-600 text-white ${
                                        selectedRoom && selectedRoom.id === room.id ? 'bg-blue-600' : ''
                                    }`}
                                >
                                    {room.room_name}
                                </div>
                            ))
                        ) : (
                            <p className="text-white">You don't have any private chats yet</p>
                        )}
                    </div>

                    {/* Public Rooms Section */}
                    <div>
                        {myPublicRooms && myPublicRooms.length > 0 ? (
                            myPublicRooms.map((room) => (
                                <div
                                    key={room.id}
                                    onClick={() => handleRoomItemClicked(room)}
                                    className={`room-item cursor-pointer p-2 rounded-md hover:bg-blue-600 text-white ${
                                        selectedRoom && selectedRoom.id === room.id ? 'bg-blue-600' : ''
                                    }`}
                                >
                                    {room.room_name}
                                </div>
                            ))
                        ) : (
                            <p className="text-white">You don't have any public chats yet</p>
                        )}
                    </div>
                </div>

                {/* Right Bar */}
                <div className='bg-gray-100 w-3/4'>
                    {selectedRoom && (
                        <ChatWindow
                            roomId={selectedRoom.id}
                            userId={user.id}
                            initialMessages={selectedRoom.messages}
                        />
                    )}
                </div>
            </div>
</>    );
}
