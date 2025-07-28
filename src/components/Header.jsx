import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`${backendUrl}/api/users/me`, { headers: { 'x-auth-token': token }});
                    if (response.ok) setUser(await response.json());
                    else localStorage.removeItem('token');
                } catch (error) {
                    localStorage.removeItem('token');
                }
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    return (
        <header className="px-4 py-2 border-b border-slate-800">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to={user ? "/app" : "/"} className="logo">
                        <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                        <strong className="text-white hidden sm:block">Lucius</strong>
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    {user ? (
                        <>
                            <span className="text-sm text-slate-400 hidden sm:block">
                                Credits: <strong className="text-white">{user.isPro ? 'Unlimited' : user.credits}</strong>
                            </span>
                            <Link to="/app">
                                <Button variant="ghost">Enter App</Button>
                            </Link>
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/pricing"><Button variant="ghost">Pricing</Button></Link>
                            <Link to="/login"><Button variant="ghost">Login</Button></Link>
                            <Link to="/signup"><Button>Sign Up</Button></Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;