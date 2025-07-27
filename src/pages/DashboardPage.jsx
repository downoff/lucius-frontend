import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function DashboardPage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return; // ProtectedRoute will handle the redirect
            }
            try {
                const response = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Failed to fetch user data');
                
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error(error);
                localStorage.removeItem('token');
                window.location.href = '/login';
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (isLoading) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl mx-auto py-12">
                <Card className="bg-slate-800/50 border-slate-700 text-white">
                    <CardHeader>
                        <CardTitle>Loading Dashboard...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center items-center h-32">
                            <div className="loader"></div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }
    
    if (!user) {
        return (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl mx-auto py-12">
                <Card className="bg-slate-800/50 border-slate-700 text-white">
                    <CardHeader>
                        <CardTitle>Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Could not load your user data. Please try logging in again.</p>
                        <Link to="/login"><Button className="mt-4">Go to Login</Button></Link>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Dashboard</CardTitle>
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
                {!user.isPro && (
                    <CardFooter>
                        <Link to="/pricing" className="w-full">
                            <Button className="w-full">Upgrade to Pro Now</Button>
                        </Link>
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}

export default DashboardPage;