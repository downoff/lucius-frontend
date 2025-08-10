import React, { useState, useEffect, createContext, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Create a context to share user data with all child components
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

const NavLink = ({ to, children, isSettings = false }) => {
    // ... (NavLink component code - no changes)
};

export default function AppLayout() {
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                // Fetch user data
                const userResponse = await fetch(`${backendUrl}/api/users/me`, { headers: { 'x-auth-token': token } });
                if (!userResponse.ok) throw new Error("Failed to fetch user data.");
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch history
                const historyResponse = await fetch(`${backendUrl}/api/ai/history`, { headers: { 'x-auth-token': token } });
                if (!historyResponse.ok) throw new Error("Failed to fetch history.");
                const historyData = await historyResponse.json();
                setHistory(historyData);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="w-full h-screen bg-slate-900 flex justify-center items-center text-white">Loading Your Workspace...</div>;
    }

    return (
        <UserContext.Provider value={user}>
            <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
                <Header />
                <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                    <aside className="glass-card m-2 rounded-lg p-4 flex flex-col justify-between">
                        {/* ... (Your full sidebar JSX with Workspace, Tools, History, and Settings sections) */}
                    </aside>
                    <main className="p-4 md:p-6 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </UserContext.Provider>
    );
}