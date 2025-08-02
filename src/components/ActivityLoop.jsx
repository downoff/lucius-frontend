import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
    "🔥 A Fitness Coach just generated a 7-day workout campaign.",
    "🚀 A SaaS Founder just created a launch announcement.",
    "✨ An E-commerce Brand just wrote 10 new product descriptions.",
    "📈 A Real Estate Agent just scheduled a new property listing.",
    "💡 A Podcast Host just generated 5 new episode ideas.",
];

export default function ActivityLoop() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % activities.length);
        }, 4000); // Change activity every 4 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <AnimatePresence>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card text-white text-sm py-2 px-4 rounded-full shadow-lg"
                >
                    {activities[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}