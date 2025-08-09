import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import SharableResult from '@/components/SharableResult';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HookResult = ({ hook, index }) => {
    // ... (HookResult component code - no changes)
};

export default function TweetHookGeneratorPage() {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hooks, setHooks] = useState([]);
    const [sharableImageUrl, setSharableImageUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setHooks([]);
        setSharableImageUrl('');
        try {
            // Step 1: Generate the hooks
            const hooksResponse = await fetch(`${backendUrl}/api/public/generate-hooks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });
            const hooksData = await hooksResponse.json();
            if (!hooksResponse.ok) throw new Error(hooksData.message);
            setHooks(hooksData.hooks);
            toast.success("Hooks generated!");

            // Step 2: Generate the sharable image from the best hook
            const imageResponse = await fetch(`${backendUrl}/api/public/generate-image-from-text`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: hooksData.hooks[0] }), // Use the first hook for the image
            });
            if (!imageResponse.ok) throw new Error("Failed to generate sharable image.");
            
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            setSharableImageUrl(imageUrl);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Free AI Tweet Hook Generator</CardTitle>
                            <CardDescription>Never write a boring tweet again. Get 5 viral hooks in seconds.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="topic">What's your tweet about?</Label>
                                    <Input id="topic" placeholder="e.g., The future of artificial intelligence" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Generating Hooks...' : 'Generate Hooks'}
                                </Button>
                            </form>

                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}

                            {hooks.length > 0 && (
                                <div className="mt-6 border-t border-slate-700 pt-6 space-y-3">
                                    {hooks.map((hook, index) => (
                                        <div key={index} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg flex justify-between items-center">
                                            <p className="flex-grow">{index + 1}. {hook}</p>
                                            <Button variant="ghost" size="sm" onClick={() => { navigator.clipboard.writeText(hook); toast.success("Hook copied!"); }}>Copy</Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {sharableImageUrl && <SharableResult imageUrl={sharableImageUrl} />}
                            
                             {hooks.length > 0 && !isLoading && (
                                <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                    <h4 className="font-bold text-lg">Unlock Your Full Content Suite</h4>
                                    <p className="text-slate-300 mt-2">Get access to the One-Click Campaign Generator, Brand Voice AI, and more.</p>
                                    <Link to="/signup">
                                        <Button size="lg" className="mt-4">Explore Lucius AI for Free</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}