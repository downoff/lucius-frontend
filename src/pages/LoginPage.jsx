import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import our new professional UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// This should be your LIVE backend URL
const backendUrl = 'https://lucius-ai.onrender.com';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: 'error' });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', type: 'error' });

        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
                localStorage.setItem('token', data.token);
                setTimeout(() => {
                    navigate('/');
                    window.location.reload(); 
                }, 1500);
            } else {
                setMessage({ text: `Error: ${data.message}`, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'An error occurred. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto py-12 animate-fadeIn">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Login to Your Account</CardTitle>
                    <CardDescription>Welcome back to Lucius AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <a href={`${backendUrl}/auth/google`} className="w-full">
                        <Button variant="outline" className="w-full">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 mr-2"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 5.93-2.36 10.46-5.73 13.16l-7.98-6.19c-2.31 1.45-5.33 2.42-8.23 2.42-8.84 0-16.14-6.81-18.44-15.91L2.56 25.99l.01.02C6.51 38.28 14.62 44 24 44c5.98 0 11.02-1.95 14.7-5.22l6.88 6.88C41.1 49.38 33.4 52 24 52c-14.62 0-26.56-11.72-26.56-26S9.38 0 24 0c6.47 0 12.04 2.28 16.48 6.15l-7.98 6.19C30.71 14.33 27.53 13 24 13c-4.47 0-8.54 2.3-10.87 5.86l-8.03-6.19C9.22 5.38 16.14 0 24 0z"></path><path fill="#FBBC05" d="M10.87 25.86c-.5-1.45-.78-2.99-.78-4.55s.28-3.1.78-4.55l-.01-.02L2.56 10.57C.94 13.8 0 17.69 0 22s.94 8.2 2.56 11.43l8.31-6.57z"></path><path fill="#34A853" d="M24 44c5.16 0 9.69-1.66 12.98-4.4l-7.02-5.46c-1.7 1.15-3.9 1.84-6.02 1.84-4.47 0-8.54 2.3-10.87-5.86l-8.03 6.19C9.22 46.62 16.14 52 24 52z"></path></svg>
                            Continue with Google
                        </Button>
                    </a>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-800/50 px-2 text-slate-400">
                                OR
                            </span>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-2">
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Logging In...' : 'Login with Email'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm text-slate-400">
                    Don't have an account? <Link to="/signup" className="underline text-white">Sign Up</Link>
                </CardFooter>
            </Card>
            {message.text && <p style={{ marginTop: '1rem', color: message.type === 'error' ? '#f87171' : '#4ade80' }}>{message.text}</p>}
        </div>
    );
}

export default LoginPage;