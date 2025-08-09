import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import InteractiveDemo from '@/components/InteractiveDemo';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div
                    className="text-center pt-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex justify-center mb-6">
                        <img src="/assets/logo.png" alt="Lucius AI Logo" className="w-24 h-24 md:w-32 md:h-32" />
                    </motion.div>
                    {/* THIS IS THE NEW, HYPER-SPECIFIC HEADLINE */}
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tighter">
                        The AI That Writes in Your Voice.
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
                        Built for solo creators & small agencies burning hours on social media. Stop the burnout. Start the growth.
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
            
            {/* NEW SECTION: Speaking directly to the pain points */}
            <section className="w-full py-20 bg-slate-950/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for the Grind.</h2>
                    <p className="text-lg text-slate-400 mt-2 max-w-3xl mx-auto">Lucius AI was designed to solve the three biggest bottlenecks for any solo content entrepreneur.</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
                        <div className="glass-card p-6">
                            <h3 className="font-bold text-xl flex items-center gap-2"><Check className="text-green-400" /> End Writer's Block</h3>
                            <p className="text-slate-300 mt-2">Use the One-Click Campaign Generator to turn a single idea into a full strategic plan.</p>
                        </div>
                         <div className="glass-card p-6">
                            <h3 className="font-bold text-xl flex items-center gap-2"><Check className="text-green-400" /> Sound Like You</h3>
                            <p className="text-slate-300 mt-2">Train the Brand Voice AI on your unique style so your content is always 100% authentic.</p>
                        </div>
                         <div className="glass-card p-6">
                            <h3 className="font-bold text-xl flex items-center gap-2"><Check className="text-green-400" /> Save Your Time</h3>
                            <p className="text-slate-300 mt-2">Go from idea to a fully scheduled post in minutes, not hours, with our seamless workflow.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />
            <Footer />
        </div>
    );
}