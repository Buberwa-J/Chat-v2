import React, { useState } from "react";
import axios from 'axios';
import { Inertia } from "@inertiajs/inertia";

export default function SendMessage({ roomId, userId, updateMessages }) {
    const [formData, setFormData] = useState({
        'content': '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.content.trim() === "") {
            return;
        }

        try {
            const response = await axios.post(route("room.sendMessage", roomId), formData);

            const newMessage = {
                content: formData.content,
                sender_id: userId,
            };

            updateMessages(newMessage);
            setFormData({ content: "" });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    return (
        <div className="h-full">
            <form onSubmit={handleSubmit}>
                <div className="p-4 m-2">
                    <input
                        type="text"
                        name="content"
                        className="rounded-lg p-4 m-1"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                    <button type="submit" className="bg-green-500 p-3">Send</button>
                </div>
            </form>
        </div>
    );
}
