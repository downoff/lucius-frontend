import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === `/app${to === '/' ? '' : to}`;
    return (
        <Link to={`/app${to === '/' ? '' : to}`} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
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
                <aside className="bg-slate-900/30 border-r border-slate-800 p-4 flex flex-col">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Tools</p>
                        <nav className="flex flex-col gap-2">
                            <NavLink to="/">Social Studio</NavLink>
                            <NavLink to="/image-generator">Image Generator</NavLink>
                            <NavLink to="/scheduler">Post Scheduler</NavLink>
                        </nav>
                    </div>
                    <div className="mt-8 flex-grow overflow-y-auto">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">History</p>
                        {isLoadingHistory ? (
                            <p className="text-slate-400 text-sm">Loading...</p>
                        ) : (
                            <nav className="flex flex-col gap-2">
                                {history.length > 0 ? history.map(conv => (
                                    // UPDATE THIS LINK
                                    <Link key={conv._id} to={`/app/c/${conv._id}`} className="text-sm text-slate-400 truncate hover:text-white transition-colors">
                                        {conv.title}
                                    </Link>
                                )) : (
                                    <p className="text-slate-400 text-sm">No conversations yet.</p>
                                )}
                            </nav>
                        )}
                    </div>
                </aside>
                <main className="p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
