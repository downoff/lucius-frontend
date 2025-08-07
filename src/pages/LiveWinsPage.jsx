import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import WinCard from '@/components/WinCard';
import { Skeleton } from '@/components/ui/skeleton';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function LiveWinsPage() {
    const [wins, setWins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWins = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/public/wins`);
                if (!response.ok) throw new Error("Failed to load the Wall of Wins.");
                const data = await response.json();
                setWins(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWins();
    }, []);

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Wall of Wins</h1>
                    <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">A live look at the value being created with Lucius AI, right now.</p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {isLoading ? (
                        <>
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                        </>
                    ) : (
                        wins.map(win => <WinCard key={win._id} win={win} />)
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}