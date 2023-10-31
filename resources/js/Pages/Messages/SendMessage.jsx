import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function SendMessage({onNewMessage, roomId, userId}) {
    const [formData, setFormData] = useState({
        'content': '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.content.trim() === "") {
            return;
        }
        Inertia.post(route('room.sendMessage', roomId), formData);

        onNewMessage({
            content: formData.content,
            sender_id: userId
        });
        setFormData({ content: '' });
    }

    return (
        <>
            {/* The Form */}
            <div className="h-full ">
                <form onSubmit={handleSubmit}>
                    <div className="p-4 m-2">
                        <input type="text" name="content" className="rounded-lg p-4 m-1"
                            value={formData.content}
                            onChange={(e)=>setFormData({ ...formData, content: e.target.value })}
                        />
                        <button type="submit" className="bg-green-500 p-3">Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}