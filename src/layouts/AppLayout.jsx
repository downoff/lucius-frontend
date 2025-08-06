import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NavLink = ({ to, children, isSettings = false }) => {
    const location = useLocation();
    const isActive = isSettings ? location.pathname === to : location.pathname === `/app${to === '/' ? '' : to}`;
    const linkPath = isSettings ? to : `/app${to === '/' ? '' : to}`;
    return (
        <Link 
            to={linkPath} 
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                ? 'bg-purple-600 text-white' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
        >
            {children}
        </Link>
    );
};

export default function AppLayout() {
    const [history, setHistory] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoadingHistory(false);
                return;
            }
            try {
                const response = await fetch(`${backendUrl}/api/ai/history`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error("Failed to fetch history.");
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoadingHistory(false);
            }
        };
        fetchHistory();
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <Header />
            <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                <aside className="glass-card m-2 rounded-lg p-4 flex flex-col justify-between">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Workspace</p>
                        <nav className="flex flex-col gap-2">
                             <NavLink to="/">The Canvas</NavLink>
                        </nav>

                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-4">Tools</p>
                        <nav className="flex flex-col gap-2">
                            <NavLink to="/social-studio">Social Studio</NavLink>
                            <NavLink to="/campaign-generator">Campaign Generator</NavLink>
                            <NavLink to="/carousel-creator">Carousel Creator</NavLink>
                            <NavLink to="/hashtag-generator">Hashtag AI</NavLink>
                            <NavLink to="/weekly-planner">Weekly Planner</NavLink>
                            <NavLink to="/image-generator">Image Generator</NavLink>
                            <NavLink to="/scheduler">Post Scheduler</NavLink>
                        </nav>
                        
                        <div className="mt-8 flex-grow overflow-y-auto">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">History</p>
                            {isLoadingHistory ? (
                                <p className="text-slate-400 text-sm">Loading...</p>
                            ) : (
                                <nav className="flex flex-col gap-2">
                                    {history.length > 0 ? history.map(conv => (
                                        <Link 
                                            key={conv._id} 
                                            to={`/app/c/${conv._id}`} 
                                            className="text-sm text-slate-400 truncate hover:text-white transition-colors"
                                        >
                                            {conv.title}
                                        </Link>
                                    )) : (
                                        <p className="text-slate-400 text-sm">No conversations yet.</p>
                                    )}
                                </nav>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Settings</p>
                         <nav className="flex flex-col gap-2">
                            <NavLink to="/brand-voice" isSettings={true}>Brand Voice</NavLink>
                            <NavLink to="/dashboard" isSettings={true}>Account & Billing</NavLink>
                            <NavLink to="/referrals" isSettings={true}>Refer a Friend</NavLink>
                        </nav>
                    </div>
                </aside>
                <main className="p-4 md-p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}