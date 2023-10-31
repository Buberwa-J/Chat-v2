import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SendMessage from "./SendMessage";

export default function ChatWindow({ messages: InitialMessages, user, roomId }) {
    const [messages, setMessages] = useState(InitialMessages);

    const handleNewMessages = (newMessage) => {
        setMessages([...messages, newMessage]);
    }
   
     return (
        <>
            {/* Main Container */}
            <div className="space-y-2 mx-auto max-w-lg my-12">
            {messages && messages.map((message, index) => (
                <div key={index} className={`p-2 rounded-md max-w-2/3 ${message.sender_id === user.id ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300 text-black'}`}>
                    {message.content}{message.sender_id}
                </div>
            ))}
                 
                 <SendMessage onNewMessage={handleNewMessages} roomId={roomId} userId={user.id}/>
        </div>
            
        </>
    )
}
