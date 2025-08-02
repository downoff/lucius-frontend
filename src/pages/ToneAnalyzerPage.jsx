import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ToneAnalyzerPage() {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setAnalysis(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/analyze-tone`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setAnalysis(data.analysis);
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
                            <CardTitle className="text-3xl">Free AI Brand Voice Analyzer</CardTitle>
                            <CardDescription>Paste any text to instantly discover its unique brand voice.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="text-input">Paste your text below (e.g., a blog post, email, or tweet)</Label>
                                    <Textarea id="text-input" placeholder="Your text here..." required value={text} onChange={(e) => setText(e.target.value)} className="bg-slate-900 border-slate-700 min-h-[200px]" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Analyzing...' : 'Analyze My Brand Voice'}
                                </Button>
                            </form>

                            {isLoading && (
                                <div className="text-center p-8"><div className="loader mx-auto"></div></div>
                            )}

                            {analysis && (
                                <div className="mt-6 border-t border-slate-700 pt-6 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Tone Summary</h3>
                                        <p className="text-purple-300">{analysis.tone_summary}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Voice Keywords</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {analysis.keywords.map((tag, index) => (
                                                <span key={index} className="bg-slate-700 text-white px-2 py-1 rounded text-sm">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">Recommendation</h3>
                                        <p>{analysis.recommendation}</p>
                                    </div>
                                    <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg">Now, Make the AI Write in This Voice</h4>
                                        <p className="text-slate-300 mt-2">Sign up for Lucius AI to save this voice and generate all future content in your perfect, unique style.</p>
                                        <Link to="/signup">
                                            <Button size="lg" className="mt-4">Train Your AI for Free</Button>
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