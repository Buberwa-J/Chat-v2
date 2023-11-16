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
                <div id="left-bar" className='p-3 w-full md:w-1/4 lg:w-1/5 h-screen bg-blue-600'>
                    <h1 className='text-xl text-white font-bold'>
                        Private Chats
                    </h1>
                    <div id='private-rooms-section'>
                        {myPrivateRooms ?
                            (myPrivateRooms.map((room, index) => (
                                <Link href={route('room.instance', room.id)} key={index} className="m-2 p-2">
                                    <div id='private-room-element' className='flex 'onClick={setChatWindowVisibility} >
                                        <div id='private-room-initials' className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                                            {room.room_name.charAt(0)}
                                        </div>
                                        <div id='private-room-name' className='text-3xl m-3 text-white flex-wrap'>
                                            {room.room_name}
                                        </div>
                                    </div>
                                </Link>
                            ))):(<h1> You Don't have any chats yet</h1>)
                        }
                    </div>

                    <div id='public-rooms-section'>
                        {myPublicRooms ?
                            (myPublicRooms.map((room, index) => (
                                <Link href={route('room.instance', room.id)} key={index} className="m-2 p-2">
                                    <div id='public-room' className='flex'>
                                        {/* Add content for public rooms */}
                                    </div>
                                </Link>
                            ))):(<h1> You Don't have any chats yet</h1>)
                        }
                    </div>
                </div>
                {/* Right Bar */}
                <div id="right-bar" className='bg-teal-600 h-screen w-full md:w-3/4 lg:w-4/5'>
                </div>
            </div>
        </>
    );
}
