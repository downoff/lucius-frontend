import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import our professional UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// IMPORTANT: Replace this with your real Stripe Payment Link
const stripePaymentLink = "https://buy.stripe.com/test_..."; 

function PricingPage() {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        // This is the "smart button" logic
        const token = localStorage.getItem('token');

        if (token) {
            // If user is logged in, send them to Stripe
            window.location.href = stripePaymentLink;
        } else {
            // If user is not logged in, send them to sign up first
            alert('Please create a free account first to complete your upgrade.');
            navigate('/signup');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto py-12 animate-fadeIn">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader className="text-center p-8">
                    <CardTitle className="text-3xl">Lucius Pro</CardTitle>
                    <CardDescription className="text-slate-400 mt-2">Unlock the full power of Lucius with a special, limited-time offer for our founding members.</CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="text-center mb-8">
                        <p className="text-slate-400">Founder's Deal</p>
                        <p><span className="text-5xl font-bold">$29</span> <span className="text-slate-400">/ one-time</span></p>
                        <p className="text-sm text-slate-400">Lifetime Access</p>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center gap-3">
                            <span className="text-purple-400">✓</span>
                            <span>Access to our most powerful AI models (OpenAI/Gemini).</span>
                        </li>
                        <li className="flex items-center gap-3">
                             <span className="text-purple-400">✓</span>
                             <span>Unlimited Text & Image Generations (with a fair use policy).</span>
                        </li>
                        <li className="flex items-center gap-3">
                             <span className="text-purple-400">✓</span>
                             <span>Automated Post Scheduler for X/Twitter.</span>
                        </li>
                         <li className="flex items-center gap-3">
                             <span className="text-purple-400">✓</span>
                             <span>Priority access to all new tools and features.</span>
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