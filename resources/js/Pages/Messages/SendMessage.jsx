import React, { useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

const SendMessage = ({ roomId, userId, updateMessages }) => {
    const [formData, setFormData] = useState({
        content: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.content.trim() === "") {
            return;
        }

        try {
            const response = await axios.post(
                route("room.sendMessage", roomId),
                formData
            );

            const newMessage = {
                content: formData.content,
                sender_id: userId,
            };

            updateMessages(newMessage);
            setFormData({ content: "" });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="p-4 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex items-center justify-between"
            >
                <input
                    type="text"
                    name="content"
                    className="flex-grow rounded-lg p-4 m-1"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Type your message..."
                />
                <button type="submit" className=" p-3 ml-2">
                    <img
                        src="/SendIcon.svg"
                        alt="Send"
                        width="50"
                        height="50"
                    />
                </button>
            </form>
        </div>
    );
};

export default SendMessage;
