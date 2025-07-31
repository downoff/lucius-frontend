import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header'; // Assuming a standalone page layout

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function BrandVoicePage() {
    const [brandVoice, setBrandVoice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    // Fetch the user's current brand voice when the page loads
    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${backendUrl}/api/users/me`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error('Could not fetch user data.');
                const userData = await response.json();
                setUser(userData);
                // Strip our instructional part of the prompt to show the user only their input
                const userDefinedVoice = userData.brandVoicePrompt.replace('You are an expert social media marketer. Your writing style and tone must be strictly: "', '').slice(0, -1);
                setBrandVoice(userDefinedVoice);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/api/users/brand-voice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ brandVoice }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            toast.success("Brand Voice saved successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <div className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                    <Card className="w-full mx-auto bg-slate-800/50 border-slate-700 text-white">
                        <CardHeader>
                            <CardTitle className="text-3xl">Your AI's Brand Voice</CardTitle>
                            <CardDescription>
                                Teach Lucius your unique tone. Describe your brand's voice or paste in examples of your writing. 
                                This will be used for all future content generation.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brand-voice-input">Brand Voice Description or Examples</Label>
                                    <Textarea
                                        id="brand-voice-input"
                                        placeholder="e.g., Witty, informal, and uses emojis. We target Gen Z tech enthusiasts."
                                        value={brandVoice}
                                        onChange={(e) => setBrandVoice(e.target.value)}
                                        className="bg-slate-900 border-slate-700 min-h-[200px]"
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    {isLoading ? 'Saving...' : 'Save Brand Voice'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

export default BrandVoicePage;
