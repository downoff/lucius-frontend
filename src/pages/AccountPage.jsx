import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function AccountPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const referralLink = user ? `https://www.ailucius.com/signup?ref=${user.referralCode}` : '';

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Could not fetch user data.');
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success("Referral link copied to clipboard!");
    };
    
    const handleManageSubscription = async () => {
        // ... (your existing manage subscription logic)
    };

    if (isLoading || !user) {
        return <div className="text-center p-8 text-white">Loading your account...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-3xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">Your Account</CardTitle>
                            <CardDescription>Welcome back, {user.name || user.email}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Subscription Details</CardTitle>
                                </CardHeader>
                                <CardContent className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-slate-900/50 p-4 rounded-lg">
                                        <Label className="text-slate-400">Your Plan</Label>
                                        <p className={`text-xl font-bold ${user.isPro ? 'text-purple-400' : 'text-white'}`}>{user.isPro ? 'Lucius Pro' : 'Basic'}</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-4 rounded-lg">
                                        <Label className="text-slate-400">Credits Remaining</Label>
                                        <p className="text-xl font-bold">{user.isPro ? 'Unlimited' : user.credits}</p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {user.stripeCustomerId ? (
                                        <Button onClick={handleManageSubscription} className="w-full">Manage Subscription</Button>
                                    ) : (
                                        <Link to="/pricing" className="w-full"><Button className="w-full bg-purple-600 hover:bg-purple-700">Upgrade to a Plan</Button></Link>
                                    )}
                                </CardFooter>
                            </Card>

                            <Card className="glass-card">
                                <CardHeader>
                                    <CardTitle>Invite Friends, Earn Credits</CardTitle>
                                    <CardDescription>Share your unique link. When a new user signs up, you both get 50 bonus credits.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 mb-4">
                                        <Label>Your Unique Referral Link</Label>
                                        <div className="flex gap-2">
                                            <Input value={referralLink} readOnly className="bg-slate-900 border-slate-700" />
                                            <Button onClick={handleCopyLink} variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-slate-900/50 p-4 rounded-lg">
                                            <p className="text-2xl font-bold">{user.referrals.length}</p>
                                            <p className="text-sm text-slate-400">Successful Referrals</p>
                                        </div>
                                        <div className="bg-slate-900/50 p-4 rounded-lg">
                                            <p className="text-2xl font-bold">{user.referrals.length * 50}</p>
                                            <p className="text-sm text-slate-400">Credits Earned</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}
