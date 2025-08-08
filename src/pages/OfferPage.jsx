import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

// CRITICAL: Replace this with your real Stripe Payment Link for the Pro Plan
const stripePaymentLink = "https://buy.stripe.com/aFa00ifzhe6Q9TC53u38402";

export default function OfferPage() {
    const handlePurchaseClick = () => {
        window.location.href = stripePaymentLink;
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Finally. An AI That Writes in Your Voice.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
                        Stop sounding like a robot. Train Lucius AI on your unique style and generate perfectly on-brand content in seconds. This is the unfair advantage you've been waiting for.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }} 
                    className="w-full max-w-md mx-auto mt-10"
                >
                    <Card className="glass-card text-white border-2 border-purple-500 shadow-lg shadow-purple-500/10">
                        <CardHeader>
                            <CardTitle className="text-2xl">The Lucius AI Pro Plan</CardTitle>
                            <p className="text-4xl font-bold mt-2">$29<span className="text-sm font-normal text-slate-400">/month</span></p>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 my-6">
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> <span>Train Your Personal Brand Voice AI</span></li>
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> <span>One-Click Campaign Generator</span></li>
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> <span>Full Suite of Pro Tools</span></li>
                                <li className="flex items-center gap-3"><Check className="text-green-400" /> <span>500 AI Credits per Month</span></li>
                            </ul>
                            <Button onClick={handlePurchaseClick} size="lg" className="w-full text-lg h-12 bg-purple-600 hover:bg-purple-700">
                                Get Instant Access
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}