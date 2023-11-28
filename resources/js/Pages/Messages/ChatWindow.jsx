import React, { useState, useEffect, useRef } from "react";
import SendMessage from "./SendMessage";

const ChatWindow = ({ roomId, userId, initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const chatContainerRef = useRef(null);
    console.log("rendering messages from room with ID: " + roomId);
    useEffect(() => {
        const messageListener = (e) => {
            const receivedMessage = e.message;
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        window.Echo.channel(`chat-room.${roomId}`).listen(
            "MessageSent",
            messageListener
        );

        // Scroll to the bottom when messages are updated
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }

        return () => {
            window.Echo.channel(`chat-room.${roomId}`).stopListening(
                "MessageSent",
                messageListener
            );
        };
    }, [roomId, messages]);

    const handleNewMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    return (
        <div className="flex flex-col min-h-full">
            <div
                ref={chatContainerRef}
                className="flex-grow overflow-y-auto px-4 py-2 bg-gray-100"
            >
                {messages &&
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                message.sender_id === userId
                                    ? "justify-end"
                                    : "justify-start"
                            } mb-2`}
                        >
                            <div
                                className={`p-2 rounded-lg max-w-2/3 ${
                                    message.sender_id === userId
                                        ? "self-end bg-blue-500 text-white"
                                        : "self-start bg-gray-300 text-black"
                                }`}
                            >
                                {message.content}{" "}
                                <span className="text-xs">
                                    {message.sender_id}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
            <SendMessage
                roomId={roomId}
                userId={userId}
                updateMessages={handleNewMessage}
            />
        </div>
    );
};

export default ChatWindow;
