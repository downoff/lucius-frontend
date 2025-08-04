import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { CheckCircle } from 'lucide-react';

export default function PurchaseSuccessPage() {
    
    // In the future, we can add a useEffect hook here to send a "conversion" event to analytics

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-lg">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center items-center">
                            <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                            <CardTitle className="text-3xl">Payment Successful!</CardTitle>
                            <CardDescription>Welcome to the next level. Your account has been upgraded.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-slate-300 mb-6">Thank you for joining. Your credits have been added to your account, and all Pro features are now unlocked.</p>
                            <Link to="/app">
                                <Button size="lg">Go to My Dashboard</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}