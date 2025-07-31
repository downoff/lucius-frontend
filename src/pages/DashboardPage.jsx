import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // ... (fetchUserData logic - no changes) ...
    }, []);

    const handleManageSubscription = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/create-customer-portal-session`, {
                method: 'POST',
                headers: { 'x-auth-token': token }
            });
            const data = await response.json();
            if (response.ok) {
                // Redirect user to the Stripe Customer Portal
                window.location.href = data.url;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (isLoading) { /* ... loading state JSX ... */ }
    if (!user) { /* ... no user state JSX ... */ }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Your Account</CardTitle>
                    <CardDescription>Welcome back, {user.name || user.email}</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <Label className="text-slate-400">Your Plan</Label>
                        <p className={`text-xl font-bold ${user.isPro ? 'text-purple-400' : 'text-white'}`}>
                            {user.isPro ? 'Lucius Pro' : 'Basic'}
                        </p>
                    </div>
                     <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <Label className="text-slate-400">Credits Remaining</Label>
                        <p className="text-xl font-bold">
                            {user.isPro ? 'Unlimited' : user.credits}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                    {user.isPro ? (
                        <Button onClick={handleManageSubscription} className="w-full">Manage Subscription</Button>
                    ) : (
                        <Link to="/pricing" className="w-full">
                            <Button className="w-full">Upgrade to Pro Now</Button>
                        </Link>
                    )}
                    <Link to="/app" className="w-full"><Button variant="outline" className="w-full">Back to App</Button></Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

export default DashboardPage;