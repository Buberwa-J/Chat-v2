import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import SendMessage from "./SendMessage";
export default function ChatWindow({ roomId, roomName, userId }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const messageListener = (e) => {
            const receivedMessage = e.message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        window.Echo.channel(`chat-room.${roomId}`).listen('MessageSent', messageListener);

        return () => {
            window.Echo.channel(`chat-room.${roomId}`).stopListening('MessageSent', messageListener);
        };
    }, [roomId]);

    return (
        <>
            <p className="text-black">Inside Room:{roomId}</p>
            <div className="space-y-2 mx-auto max-w-lg my-12">
                
                {messages &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-md max-w-2/3 ${
                                message.sender_id === userId
                                    ? "ml-auto bg-blue-500 text-white"
                                    : "mr-auto bg-gray-300 text-black"
                            }`}
                        >
                            {message.content} {message.sender_id}
                        </div>
                    ))}
                <SendMessage roomId={roomId} userId={userId} />
            </div>
        </>
    );
}
