import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

// IMPORTANT: Replace this with your real Stripe Test Payment Link
const stripePaymentLink = "https://buy.stripe.com/..."; 

function PricingPage() {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        // This is our "smart button" logic
        const token = localStorage.getItem('token');
        if (token) {
            // If user is logged in, send them directly to Stripe
            window.location.href = stripePaymentLink;
        } else {
            // If user is not logged in, redirect them to sign up first
            alert('Please create a free account first to continue your upgrade.');
            navigate('/signup');
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            {/* You can add your Header component here if you want it on this page */}
            <div className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <Card className="w-full max-w-lg mx-auto bg-slate-800/50 border-slate-700 text-white">
                        <CardHeader className="text-center p-8">
                            <CardTitle className="text-3xl">Lucius Pro</CardTitle>
                            <CardDescription className="text-slate-400 mt-2">Unlock the full power of Lucius with a special offer for our founding members.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="text-center mb-8">
                                <p className="text-slate-400">Founder's Deal</p>
                                <p><span className="text-6xl font-bold">$29</span> <span className="text-slate-400">/ one-time</span></p>
                                <p className="text-sm text-slate-400">Lifetime Access</p>
                            </div>
                            
                            <ul className="space-y-3 my-8">
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-400">✓</span>
                                    <span>Access to all Pro AI Models (Text & Image Generation).</span>
                                </li>
                                <li className="flex items-center gap-3">
                                     <span className="text-purple-400">✓</span>
                                     <span>Unlimited Generations & Full Chat History.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                     <span className="text-purple-400">✓</span>
                                     <span>Priority access to new tools, like the Post Scheduler.</span>
                                </li>
                                 <li className="flex items-center gap-3">
                                     <span className="text-purple-400">✓</span>
                                     <span>Directly support a solo founder's journey.</span>
                                </li>
                            </ul>
                            
                            <Button onClick={handleUpgradeClick} className="w-full text-lg h-12">
                                Upgrade to Pro Now
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default PricingPage;