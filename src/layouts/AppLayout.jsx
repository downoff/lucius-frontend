import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create context to share user data
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

const NavLink = ({ to, children, isSettings = false }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link
            to={to}
            className={`block px-3 py-2 rounded-lg transition ${
                isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
            } ${isSettings ? 'mt-auto' : ''}`}
        >
            {children}
        </Link>
    );
};

export default function AppLayout() {
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                // Fetch user
                const userRes = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!userRes.ok) throw new Error("Failed to fetch user data.");
                const { user: userData } = await userRes.json();
                setUser(userData);

                // Fetch history
                const historyRes = await fetch(`${backendUrl}/api/ai/history`, {
                    headers: { 'x-auth-token': token }
                });
                if (!historyRes.ok) throw new Error("Failed to fetch history.");
                const historyData = await historyRes.json();
                setHistory(historyData);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-screen bg-slate-900 flex justify-center items-center text-white">
                Loading Your Workspace...
            </div>
        );
    }

    return (
        <UserContext.Provider value={user}>
            <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
                <Header />
                <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                    <aside className="glass-card m-2 rounded-lg p-4 flex flex-col justify-between">
                        {/* Workspace Links */}
                        <div>
                            <h2 className="text-sm text-slate-400 uppercase mb-2">Workspace</h2>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/social-studio">Social Studio</NavLink>
                            <NavLink to="/scheduler">Scheduler</NavLink>
                        </div>

                        {/* Tools */}
                        <div>
                            <h2 className="text-sm text-slate-400 uppercase mt-6 mb-2">Tools</h2>
                            <NavLink to="/content-tools">Content Tools</NavLink>
                            <NavLink to="/analytics">Analytics</NavLink>
                        </div>

                        {/* History */}
                        <div>
                            <h2 className="text-sm text-slate-400 uppercase mt-6 mb-2">History</h2>
                            <div className="space-y-1 max-h-40 overflow-y-auto">
                                {history.length > 0 ? (
                                    history.map((item) => (
                                        <div key={item._id} className="text-xs text-slate-300 truncate">
                                            {item.prompt || 'Untitled'}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-xs text-slate-500">No history yet.</p>
                                )}
                            </div>
                        </div>

                        {/* Settings */}
                        <NavLink to="/settings" isSettings>
                            Settings
                        </NavLink>
                    </aside>

                    <main className="p-4 md:p-6 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </UserContext.Provider>
    );
}
