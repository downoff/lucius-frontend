import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// IMPORTANT: Make sure these are your real Stripe Payment Links
const starterPlanLink = "https://buy.stripe.com/YOUR_STARTER_LINK_HERE";
const proPlanLink = "https://buy.stripe.com/YOUR_PRO_LINK_HERE";

const PricingTier = ({ title, price, description, features, buttonText, isFeatured, isFree = false }) => {
    const navigate = useNavigate();
    const link = isFeatured ? proPlanLink : starterPlanLink;

    const handleClick = () => {
        if (isFree) {
            navigate('/signup');
            return;
        }
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = link;
        } else {
            toast.info('Please create a free account first to upgrade.');
            navigate('/signup');
        }
    };

    return (
        <Card className={`w-full h-full flex flex-col ${isFeatured ? 'border-2 border-purple-500 bg-slate-800 shadow-lg shadow-purple-500/10' : 'bg-slate-800/50 border-slate-700'}`}>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <p className="text-4xl font-bold mt-4">{price}<span className="text-sm font-normal text-slate-400">/month</span></p>
                <CardDescription className="mt-2 h-10">{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <ul className="space-y-3 my-6 flex-grow">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <Button onClick={handleClick} className={`w-full text-lg h-12 ${isFeatured ? 'bg-purple-600 hover:bg-purple-700' : isFree ? 'bg-white text-purple-700 hover:bg-slate-200' : 'bg-slate-700 hover:bg-slate-600'}`}>
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Perfect Plan for Your Ambition</h1>
                        <p className="text-lg text-slate-400 mt-4">Start for free and scale as you grow. No-nonsense pricing.</p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        <PricingTier
                            title="Free Forever"
                            price="$0"
                            description="Perfect for exploring the tools and getting started."
                            features={["10 AI Credits per month", "Standard AI Models", "Access to all tools", "Chat History"]}
                            buttonText="Get Started for Free"
                            isFree={true}
                        />
                        <PricingTier
                            title="Starter"
                            price="$9"
                            description="For individuals and creators ready to scale."
                            features={["100 AI Credits per month", "Standard AI Models", "Post Scheduler", "Email Support"]}
                            buttonText="Choose Starter"
                        />
                        <PricingTier
                            title="Pro"
                            price="$29"
                            description="For power users, agencies, and professionals."
                            features={["500 AI Credits per month", "Access to Pro AI Models", "Brand Voice AI", "Priority Support"]}
                            buttonText="Choose Pro"
                            isFeatured={true}
                        />
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}

export default PricingPage;