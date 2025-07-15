// The complete, professional login page component
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
                setTimeout(() => {
                    window.location.href = '/dashboard'; // Redirect to dashboard on login
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
        <div className="w-full max-w-md mx-auto py-12 animate-fadeIn">
            {/* ... JSX for the complete Login Card ... */}
        </div>
    );
}
export default LoginPage;