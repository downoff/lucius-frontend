import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const backendUrl = 'https://lucius-ai.onrender.com';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: 'error' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', type: 'error' });

        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage({ text: 'Success! Your account has been created. Please proceed to the login page.', type: 'success' });
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
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>Get started with Lucius AI today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <a href={`${backendUrl}/auth/google`} className="w-full">
                        <Button variant="outline" className="w-full">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 mr-2">{/* ... SVG Paths ... */}</svg>
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
                    <form onSubmit={handleSignup} className="space-y-2">
                        <div className="grid gap-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
                 <CardFooter className="text-center text-sm text-slate-400">
                    Already have an account? <Link to="/login" className="underline text-white">Login</Link>
                </CardFooter>
            </Card>
            {message.text && <p style={{ marginTop: '1rem', color: message.type === 'error' ? '#f87171' : '#4ade80' }}>{message.text}</p>}
        </div>
    );
}

export default SignupPage;