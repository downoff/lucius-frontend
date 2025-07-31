import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            // ... (existing fetchUserData logic)
        };
        fetchUserData();

        // Check for Twitter auth success/failure message in URL
        const params = new URLSearchParams(window.location.search);
        if (params.get('twitter_auth') === 'success') {
            toast.success("Successfully connected your X/Twitter account!");
        } else if (params.get('twitter_auth') === 'failed') {
            toast.error("Failed to connect your X/Twitter account.");
        }
    }, []);

    const handleConnectTwitter = () => {
        const token = localStorage.getItem('token');
        // We pass the user's JWT in the URL to securely identify them on the backend
        window.location.href = `${backendUrl}/auth/twitter?token=${token}`;
    };

    // ... (handleManageSubscription logic)

    if (isLoading) { /* ... loading JSX ... */ }
    if (!user) { /* ... no user JSX ... */ }

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Your Account</CardTitle>
                            <CardDescription>Welcome back, {user.name || user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            {/* ... Plan and Credits cards ... */}

                            {/* NEW: Twitter Connection Card */}
                            <Card className="glass-card md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Connected Accounts</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {user.twitterUsername ? (
                                        <div className="flex items-center justify-between">
                                            <p>X / Twitter: <span className="font-bold text-purple-400">@{user.twitterUsername}</span></p>
                                            <span className="text-sm text-green-400">Connected</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <p className="text-slate-400">Connect your X/Twitter account to enable post scheduling.</p>
                                            <Button onClick={handleConnectTwitter}>Connect</Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-4">
                            {/* ... Subscription and Back to App buttons ... */}
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default DashboardPage;
