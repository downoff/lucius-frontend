import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <div className="w-full h-screen bg-slate-900 text-white flex flex-col justify-center items-center text-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center"
            >
                <img src="/assets/logo.png" alt="Lucius Logo" className="w-32 h-32 md:w-48 md:h-48" />
                <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mt-4">LUCIUS AI</h1>
                <p className="text-xl md:text-2xl text-slate-400 mt-2 max-w-2xl">
                    Your creative co-pilot for social media. Generate high-quality content and visuals in seconds, not hours.
                </p>
                <div className="mt-8 flex gap-4">
                    <Link to="/app">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all">
                            Get Started
                        </button>
                    </Link>
                    <Link to="/login">
                         <button className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-lg transition-all">
                            Login
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}