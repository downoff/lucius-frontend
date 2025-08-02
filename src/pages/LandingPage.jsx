import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import InteractiveDemo from '@/components/InteractiveDemo';
import Footer from '@/components/Footer';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* THIS IS THE FIX: The logo is now back above the main heading */}
                    <motion.div variants={itemVariants} className="flex justify-center mb-6">
                        <img src="/assets/logo.png" alt="Lucius AI Logo" className="w-24 h-24 md:w-32 md:h-32" />
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Your AI Co-Pilot for Social Media
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
                        Stop wasting time. Generate high-quality, on-brand content in seconds, not hours.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="mt-12 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <InteractiveDemo />
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}