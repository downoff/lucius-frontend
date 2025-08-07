import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function CanvaMagicPage() {
    const { templateId } = useParams();
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult('');
        try {
            const response = await fetch(`${backendUrl}/api/public/generate-for-canva`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, templateId }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResult(data.text);
            toast.success("Text generated! You can now copy it to your Canva design.");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        toast.success("Copied to clipboard!");
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Canva Magic ✨</CardTitle>
                            <CardDescription>Generate the perfect text for your Canva template.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="topic-input">What is your post about?</label>
                                    <Textarea
                                        id="topic-input"
                                        placeholder="e.g., A special discount for our new summer collection."
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="bg-slate-900 border-slate-700 min-h-[100px]"
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Generating Text...' : 'Generate Magic Text'}
                                </Button>
                            </form>

                            {isLoading && (
                                <div className="text-center p-8"><div className="loader mx-auto"></div></div>
                            )}

                            {result && (
                                <div className="mt-6 border-t border-slate-700 pt-6 space-y-4">
                                    <div className="p-4 bg-slate-900/50 rounded-md relative">
                                        <p className="whitespace-pre-wrap">{result}</p>
                                        <Button onClick={handleCopy} variant="ghost" size="sm" className="absolute top-2 right-2">Copy</Button>
                                    </div>
                                    <div className="text-center bg-purple-900/30 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg">This is Just 1% of the Power</h4>
                                        <p className="text-slate-300 mt-2">The full Lucius AI suite includes a Brand Voice AI, a One-Click Campaign Generator, and more.</p>
                                        <Link to="/signup">
                                            <Button size="lg" className="mt-4">Unlock the Full Engine</Button>
                                        </Link>
                                    </div>
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