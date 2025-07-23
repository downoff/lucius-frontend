import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
                setTimeout(() => {
                    window.location.href = '/app'; // Redirect to the main app layout
                }, 1500);
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
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
            <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700 text-white animate-fadeIn">
                <CardHeader className="text-center">
                    <Link to="/" className="logo mx-auto mb-4">
                        <img src="/assets/logo.png" alt="Lucius Logo" className="logo-image" />
                    </Link>
                    <CardTitle className="text-2xl">Login to Your Account</CardTitle>
                    <CardDescription>Welcome back to Lucius AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <a href={`${backendUrl}/auth/google`} className="w-full">
                        <Button variant="outline" className="w-full">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 mr-2">{/* SVG Paths */}</svg>
                            Continue with Google
                        </Button>
                    </a>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-700" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-800 px-2 text-slate-400">OR</span></div>
                    </div>
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
                            {isLoading ? 'Logging In...' : 'Login with Email'}
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