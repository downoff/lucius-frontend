import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Header from '@/components/Header';

// IMPORTANT: Replace these with your real Stripe Payment Links
const starterPlanLink = "https://buy.stripe.com/5kQfZg5YH6Eod5O67y38401";
const proPlanLink = "https://buy.stripe.com/aFa00ifzhe6Q9TC53u38402";

const PricingTier = ({ title, price, description, features, buttonText, isFeatured }) => {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        const link = isFeatured ? proPlanLink : starterPlanLink;
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = link;
        } else {
            toast.info('Please create a free account first to upgrade.');
            navigate('/signup');
        }
    };

    return (
        <Card className={`w-full ${isFeatured ? 'border-purple-500 bg-slate-800' : 'bg-slate-800/50 border-slate-700'}`}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <p className="text-4xl font-bold mt-4">${price}<span className="text-sm font-normal text-slate-400">/month</span></p>
                <CardDescription className="mt-2">{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 my-6">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <span className="text-purple-400">✓</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button onClick={handleUpgradeClick} className={`w-full ${isFeatured ? '' : 'bg-purple-600 hover:bg-purple-700'}`}>
                    {buttonText}
                </Button>
            </CardContent>
        </Card>
    );
};


function PricingPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex justify-center items-center p-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Find the Plan That's Right for You</h1>
                        <p className="text-lg text-slate-400 mt-4">Start for free, then upgrade to unlock Lucius's full potential.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <PricingTier
                            title="Starter"
                            price="9"
                            description="For individuals and creators just getting started."
                            features={["100 AI Credits per month", "Standard AI Models", "Access to all tools", "Email Support"]}
                            buttonText="Choose Starter"
                            isFeatured={false}
                        />
                        <PricingTier
                            title="Pro"
                            price="29"
                            description="For power users, agencies, and professionals."
                            features={["500 AI Credits per month", "Access to Pro AI Models", "Post Scheduler", "Priority Support"]}
                            buttonText="Choose Pro"
                            isFeatured={true}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default PricingPage;