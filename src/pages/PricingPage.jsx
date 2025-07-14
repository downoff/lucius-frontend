import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// IMPORTANT: Use your real Stripe Payment Link here
const stripePaymentLink = "https://buy.stripe.com/..."; 

function PricingPage() {

    const handleUpgradeClick = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // If user is logged in, send them to Stripe
            window.location.href = stripePaymentLink;
        } else {
            // If user is not logged in, send them to sign up first
            alert('Please create a free account first to continue your upgrade.');
            window.location.href = '/signup';
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-12 animate-fadeIn">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Upgrade to Lucius Pro</CardTitle>
                    <CardDescription>Unlock the full power of Lucius with a special, limited-time offer.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-slate-400">Founder's Deal: Lifetime Access</p>
                    <p className="text-6xl font-bold my-4">$29</p>
                    <p className="text-slate-400">One-time payment</p>
                    
                    <ul className="text-left my-8 space-y-2">
                        <li className="flex items-center gap-3">
                            <span className="text-purple-400">✅</span>
                            <span>Access to our most powerful AI models for text & images.</span>
                        </li>
                        <li className="flex items-center gap-3">
                             <span className="text-purple-400">✅</span>
                             <span>Unlimited generations & chat history.</span>
                        </li>
                        <li className="flex items-center gap-3">
                             <span className="text-purple-400">✅</span>
                             <span>Priority access to all new tools, like the Post Scheduler.</span>
                        </li>
                         <li className="flex items-center gap-3">
                             <span className="text-purple-400">✅</span>
                             <span>Directly support a solo founder's journey.</span>
                        </li>
                    </ul>
                    
                    <Button onClick={handleUpgradeClick} className="w-full text-lg h-12">
                        Upgrade to Pro Now
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default PricingPage;