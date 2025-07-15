import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <header className="container mx-auto px-4">
                <nav className="flex items-center justify-between py-3 border-b border-slate-800">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="logo">
                            <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                            <strong>Lucius</strong>
                        </Link>
                        <Link to="/app" className="text-slate-300 hover:text-white transition-colors text-sm">Social Studio</Link>
                        <Link to="/app/image-generator" className="text-slate-300 hover:text-white transition-colors text-sm">Image Generator</Link>
                    </div>
                    <div>
                        {/* We will add login/logout logic back to the header later */}
                        <Link to="/login" role="button" className="bg-white text-slate-900 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-200 transition-colors text-sm">Login</Link>
                    </div>
                </nav>
            </header>
            <main className="p-4 md:p-6 overflow-y-auto">
                {/* This Outlet component is where your different tools will be rendered */}
                <Outlet />
            </main>
        </div>
    );
}