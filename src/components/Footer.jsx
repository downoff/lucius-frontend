import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-800 text-slate-400">
            <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <Link to="/" className="logo">
                        <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                        <strong className="text-white">Lucius AI</strong>
                    </Link>
                    <p className="text-sm mt-2">&copy; {new Date().getFullYear()} Lucius AI. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
                    <Link to="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
}