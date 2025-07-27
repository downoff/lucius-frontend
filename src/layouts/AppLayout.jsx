import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';

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
    return (
        <div className="min-h-screen bg-slate-900 text-white grid grid-rows-[auto_1fr] font-sans">
            <Header />
            <div className="grid grid-cols-[240px_1fr] h-[calc(100vh-61px)] overflow-hidden">
                <aside className="bg-slate-900/30 border-r border-slate-800 p-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Tools</p>
                    <nav className="flex flex-col gap-2">
                        <NavLink to="/">Social Studio</NavLink>
                        <NavLink to="/image-generator">Image Generator</NavLink>
                        <NavLink to="/scheduler">Post Scheduler</NavLink>
                    </nav>
                </aside>
                <main className="p-4 md:p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}