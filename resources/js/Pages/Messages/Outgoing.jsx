import React from "react";
import { Head,Link } from "@inertiajs/react";
export default function Outgoing({ myMessages }) {
    return <>
        <Head title="My Messages" />
        {/* Main Container */}
        <div className=" bg-teal-500 h-screen p-4">
   
            <div className="w-1/4 ">
                <h1 className="text-black ">My Messeges</h1>
                <ul>
                    {myMessages ? (myMessages.map((message, index)=>(
                    <li key={index} className="text-black m-2">
                        <span className="text-blue-500 m-2 underline"> Sent At:{message.created_at}</span>
                         <span className="text-black m-2"> Content: {message.content}</span>
                      </li>
                    )))
                        : (<h1 className="text-2xl text-black">You dont have any messages yet.</h1>)
                    }
                </ul>
            </div>

        </div>
    </>
}