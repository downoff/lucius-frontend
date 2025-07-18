import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const backendUrl = 'https://lucius-ai.onrender.com';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success('Login successful! Redirecting...');
                localStorage.setItem('token', data.token);
                setTimeout(() => window.location.href = '/dashboard', 1500);
            } else {
                toast.error(`Error: ${data.message}`);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto py-12">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Login to Your Account</CardTitle>
                    <CardDescription>Welcome back to Lucius AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* We will re-add the Google Button here later */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-slate-900"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-slate-900"/>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Login'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm">
                    <p className="text-slate-400">Don't have an account? <Link to="/signup" className="underline text-white hover:text-purple-400">Sign Up</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginPage;