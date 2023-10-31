import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';


export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
              {/* Main Container*/}
            <div className="flex h-screen bg-white">
              {/* Buttons Section */}
                <div className='m-4'>

                    <Link href={route('messages.show')} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 m-4 rounded">
                        View All Messages
                    </Link>

                    <Link href={route('rooms.show')} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 m-4 rounded">
                        View All Rooms
                    </Link>

                    <Link href={route('friends.show')} className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 m-4 rounded">
                        View All Friends
                    </Link>

                </div>
             </div>

        </AuthenticatedLayout>
    );
}
