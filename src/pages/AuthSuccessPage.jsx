import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AuthSuccessPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // This code runs as soon as the page loads
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            // If a token is found, save it to the browser's storage
            localStorage.setItem('token', token);
            
            // Redirect to the main app dashboard after a short delay
            setTimeout(() => {
                window.location.href = '/app'; // Use window.location.href to force a full refresh
            }, 1000);

        } else {
            console.error("No token found in callback URL.");
            // If something went wrong, send them back to the login page
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                <Card className="w-full max-w-md mx-auto bg-slate-800/50 border-slate-700 text-white">
                    <CardHeader className="text-center">
                        <CardTitle>Authentication Successful</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                        <div className="loader"></div>
                        <p className="mt-4 text-slate-400">Please wait, redirecting you...</p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

export default AuthSuccessPage;