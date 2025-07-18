import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Helper component for active navigation links
const NavLink = ({ to, children }) => {
    const location = useLocation();
    // The startsWith check handles nested routes like /app/image-generator
    const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
    return (
        <Link 
            to={to} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-slate-700 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
};

export default function AppLayout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${backendUrl}/api/users/me`, {
                        headers: { 'x-auth-token': token }
                    });
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    }
                } catch (error) {
                    console.error("Failed to fetch user", error);
                }
            }
        };
        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <header className="px-4 py-2 border-b border-slate-800">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="logo">
                            <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                            <strong>Lucius</strong>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {user && (
                            <span className="text-sm text-slate-400 hidden sm:block">
                                Credits: <strong className="text-white">{user.isPro ? 'Unlimited' : user.credits}</strong>
                            </span>
                        )}
                        <Link to="/dashboard">
                            <Button variant="ghost">Dashboard</Button>
                        </Link>
                        <Button onClick={logout}>Logout</Button>
                    </div>
                </nav>
            </header>
            <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                <aside className="bg-slate-900/30 border-r border-slate-800 p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Tools</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/app">Social Studio</NavLink>
                        <NavLink to="/app/image-generator">Image Generator</NavLink>
                        <NavLink to="/app/scheduler">Post Scheduler</NavLink>
                    </nav>
                </aside>
                <main className="p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    );
}