import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Copy } from 'lucide-react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ReferralPage() {
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

    if (isLoading) {
        return <div className="text-center p-8 text-white">Loading your referral dashboard...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Invite Friends, Earn Credits</CardTitle>
                            <CardDescription>Share your unique link. When a new user signs up, you both get 50 bonus credits.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-medium">Your Unique Referral Link</label>
                                <div className="flex gap-2">
                                    <Input value={referralLink} readOnly className="bg-slate-900 border-slate-700" />
                                    <Button onClick={handleCopyLink} variant="outline" size="icon">
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <p className="text-2xl font-bold">{user?.referrals?.length || 0}</p>
                                    <p className="text-sm text-slate-400">Successful Referrals</p>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-lg">
                                    <p className="text-2xl font-bold">{(user?.referrals?.length || 0) * 50}</p>
                                    <p className="text-sm text-slate-400">Credits Earned</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}