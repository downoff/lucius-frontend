import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function OnboardingPage() {
    const [brandVoice, setBrandVoice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedTweet, setGeneratedTweet] = useState('');
    const [step, setStep] = useState(1); // 1 for voice input, 2 for tweet generation
    const navigate = useNavigate();

    const handleVoiceSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const token = localStorage.getItem('token');
        try {
            // Step 1: Save the user's brand voice
            const voiceResponse = await fetch(`${backendUrl}/api/users/brand-voice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ brandVoice }),
            });
            if (!voiceResponse.ok) throw new Error('Failed to save brand voice.');
            
            toast.success("Brand Voice saved! Now, let's create your first post.");

            // Step 2: Generate the "first tweet" using their new voice
            const tweetPrompt = "Write a short, excited tweet announcing that I've just discovered a new AI tool called Lucius AI that can learn my unique brand voice. Mention how it's a game-changer for content creation.";
            const generateResponse = await fetch(`${backendUrl}/api/ai/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ prompt: tweetPrompt }),
            });
            const data = await generateResponse.json();
            if (!generateResponse.ok) throw new Error(data.message);

            setGeneratedTweet(data.text);
            setStep(2); // Move to the next step

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompleteOnboarding = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`${backendUrl}/api/users/complete-onboarding`, {
                method: 'POST',
                headers: { 'x-auth-token': token },
            });
            navigate('/app', { replace: true }); // Send them to the main app
        } catch (error) {
            toast.error("Failed to finalize onboarding. Please try again.");
        }
    };

    const shareOnTwitter = () => {
        const text = encodeURIComponent(generatedTweet + " #AI #ContentCreation");
        window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
        handleCompleteOnboarding();
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        {step === 1 && (
                            <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl">Welcome to Lucius AI</CardTitle>
                                    <CardDescription>Let's start by creating your personal Brand Voice.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleVoiceSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="brand-voice-input" className="text-sm font-medium">Describe your brand's tone or paste in examples of your writing.</label>
                                            <Textarea
                                                id="brand-voice-input"
                                                placeholder="e.g., Witty, informal, and uses emojis. We target Gen Z tech enthusiasts."
                                                value={brandVoice}
                                                onChange={(e) => setBrandVoice(e.target.value)}
                                                className="bg-slate-900 border-slate-700 min-h-[200px]"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                            {isLoading ? 'Training AI...' : 'Train My AI'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </>
                        )}
                        {step === 2 && (
                             <>
                                <CardHeader className="text-center">
                                    <CardTitle className="text-3xl">The Magic Moment</CardTitle>
                                    <CardDescription>Here's your first post, written in your new Brand Voice.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="p-4 bg-slate-900/50 rounded-md whitespace-pre-wrap mb-6">
                                        {generatedTweet}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button onClick={shareOnTwitter} className="w-full bg-blue-500 hover:bg-blue-600">Share to X/Twitter</Button>
                                        <Button onClick={handleCompleteOnboarding} variant="outline" className="w-full">Skip and Go to App</Button>
                                    </div>
                                </CardContent>
                            </>
                        )}
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}