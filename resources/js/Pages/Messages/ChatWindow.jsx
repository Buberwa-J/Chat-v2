import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SendMessage from "./SendMessage";

export default function ChatWindow({ messages: initialMessages, user, roomId }) {
    const [messages, setMessages] = useState(initialMessages);

    useEffect(() => {
        // Use an effect to set up the WebSocket listener when the component mounts
        const messageListener = (e) => {
            const receivedMessage = e.message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            preserveScroll: true;

        };

        window.Echo.channel('chat-room').listen('MessageSent', messageListener);

        // Clean up the listener when the component unmounts
        return () => {
            window.Echo.channel('chat-room').stopListening('MessageSent', messageListener);
        };
    }, []);

    return (
        <>
            {/* Main Container */}
            <div className="space-y-2 mx-auto max-w-lg my-12">
                {messages &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md max-w-2/3 ${
                                message.sender_id === user.id
                                    ? "ml-auto bg-blue-500 text-white"
                                    : "mr-auto bg-gray-300 text-black"
                            }`}
                        >
                            {message.content} {message.sender_id}
                        </div>
                    ))}
                <SendMessage roomId={roomId} userId={user.id} />
            </div>
        </>
    );
}
