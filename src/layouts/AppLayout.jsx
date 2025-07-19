import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <header className="px-4 py-2 border-b border-slate-800">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="logo">
                            <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                            <strong>Lucius</strong>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/login">
                            <Button variant="ghost">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="p-4 md:p-6 overflow-y-auto">
                <Outlet /> {/* This is where your different tools will be rendered */}
            </main>
        </div>
    );
}