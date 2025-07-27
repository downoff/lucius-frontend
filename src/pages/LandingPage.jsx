import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header'; // We'll use our dynamic header

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animate children one after another
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex justify-center items-center">
                <motion.div 
                    className="text-center p-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="flex justify-center mb-6">
                        <img src="/assets/logo.png" alt="Lucius Logo" className="w-24 h-24 md:w-32 md:h-32" />
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold tracking-tighter">
                        Your Creative Co-Pilot for Social Media
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
                        Stop wasting time. Lucius helps you generate high-quality, platform-specific content and visuals in seconds, not hours.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/app">
                            <Button size="lg" className="w-full sm:w-auto">Get Started for Free</Button>
                        </Link>
                        <Link to="/pricing">
                             <Button size="lg" variant="outline" className="w-full sm:w-auto">View Pricing</Button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}