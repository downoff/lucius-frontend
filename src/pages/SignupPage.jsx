import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const backendUrl = 'https://lucius-ai.onrender.com';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        toast.info("Creating your account...");

        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success('Success! Your account has been created.', {
                  description: 'Please proceed to the login page.',
                });
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
                    <CardTitle className="text-2xl">Create Your Account</CardTitle>
                    <CardDescription>Get started with Lucius AI today.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* We will re-add the Google Button here later */}
                     <form onSubmit={handleSignup} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-slate-900" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-slate-900" />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                </CardContent>
                 <CardFooter className="text-center text-sm">
                    <p className="text-slate-400">Already have an account? <Link to="/login" className="underline text-white hover:text-purple-400">Login</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignupPage;