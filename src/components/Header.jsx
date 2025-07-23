import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

function Header() {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };
        // Listen for changes to localStorage (e.g., after login/logout)
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/'); // Redirect to landing page on logout
    };

    return (
        <header className="px-4 py-2 border-b border-slate-800">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link to="/" className="logo">
                        <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                        <strong className="text-white hidden sm:block">Lucius</strong>
                    </Link>
                </div>
                
                <div className="flex items-center gap-2">
                    {token ? (
                        // --- Logged-in User View ---
                        <>
                            <Link to="/app">
                                <Button variant="ghost">Enter App</Button>
                            </Link>
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        // --- Logged-out User View ---
                        <>
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;