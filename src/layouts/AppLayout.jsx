import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import { toast } from "sonner";

// ... (Your NavLink component code - no changes)

export default function AppLayout() {
    const [history, setHistory] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    useEffect(() => {
        // ... (Your fetchHistory logic - no changes)
    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <Header />
            <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                <aside className="glass-card m-2 rounded-lg p-4 flex flex-col justify-between">
                    <div>
                        {/* ... (Tools and History sections) */}
                    </div>

                    <div>
                        {/* NEW: Community Section */}
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Community</p>
                         <nav className="flex flex-col gap-2 mb-6">
                            <a href="https://discord.gg/qFCbqfgn" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                                Join the Discord
                            </a>
                        </nav>

                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Settings</p>
                         <nav className="flex flex-col gap-2">
                            <NavLink to="/brand-voice" isSettings={true}>Brand Voice</NavLink>
                            <NavLink to="/dashboard" isSettings={true}>Account & Billing</NavLink>
                            <NavLink to="/referrals" isSettings={true}>Refer a Friend</NavLink>
                        </nav>
                    </div>
                </aside>
                <main className="p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}