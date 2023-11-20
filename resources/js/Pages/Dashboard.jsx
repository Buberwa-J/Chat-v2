import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import ChatWindow from './Messages/ChatWindow';

export default function Dashboard({ auth, myPrivateRooms, myPublicRooms }) {
    
    const [chatWindowVisible, setChatWindowVisibility] = useState(false);
    
    const handleRoomItemClicked = () => {
        setChatWindowVisibility(!chatWindowVisible);
    }
     
    return (
        <>
            <Head title="Home" />
            {/* Main Container */}
            <div id='main-container' className='flex'>
                {/* Left Bar */}
                <div id="left-bar" className='p-4 w-full md:w-1/4 lg:w-1/5 h-screen bg-gradient-to-r from-teal-400 to-blue-500'>
                    <h1 className='text-xl text-white font-bold mb-4'>
                        Private Chats
                    </h1>
                    <div id='private-rooms-section'>
                        {myPrivateRooms ?
                            (myPrivateRooms.map((room, index) => (
                                <Link href={route('room.instance', room.id)} key={index} className="block m-2 p-2 transition duration-300 transform hover:scale-105">
                                    <div id='private-room-element' className='flex items-center space-x-4 cursor-pointer'>
                                        <div id='private-room-initials' className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                            {room.room_name.charAt(0)}
                                        </div>
                                        <div id='private-room-name' className='text-lg text-white'>
                                            {room.room_name}
                                        </div>
                                    </div>
                                </Link>
                            ))):(<h1 className="text-white"> You Don't have any chats yet</h1>)
                        }
                    </div>

                    <div id='public-rooms-section'>
                        {myPublicRooms ?
                            (myPublicRooms.map((room, index) => (
                                <Link href={route('room.instance', room.id)} key={index} className="block m-2 p-2 transition duration-300 transform hover:scale-105">
                                    <div id='public-room' className='flex items-center space-x-4 cursor-pointer'>
                                        {/* Add content for public rooms */}
                                    </div>
                                </Link>
                            ))):(<h1 className="text-white"> You Don't have any chats yet</h1>)
                        }
                    </div>
                </div>
                {/* Right Bar */}
                <div id="right-bar" className='bg-gray-100 h-screen w-full md:w-3/4 lg:w-4/5'>
                    {/* Add your content for the right bar here */}
                </div>
            </div>
        </>
    );
}
