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

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ResultCard = ({ title, content }) => {
    return (
        <Card className="glass-card text-white">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="whitespace-pre-wrap">{content}</p>
            </CardContent>
        </Card>
    );
};

export default function ViralDNAPage() {
    const [videoUrl, setVideoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [briefing, setBriefing] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setBriefing(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/analyze-viral-dna`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setBriefing(data.briefing);
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
                            <CardTitle className="text-3xl">The Digital Ghost Engine</CardTitle>
                            <CardDescription>Paste a YouTube Short link to deconstruct its viral DNA.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="video-url">YouTube Short URL</Label>
                                    <Input id="video-url" placeholder="https://www.youtube.com/shorts/..." required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Analyzing DNA...' : 'Deconstruct Viral Code'}
                                </Button>
                            </form>

                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}
                            
                            {briefing && (
                                <div className="space-y-6">
                                    <ResultCard title="Viral DNA Analysis" content={briefing.viral_dna_analysis} />
                                    <ResultCard title="Your New Mission Template" content={briefing.mission_template} />
                                    <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg">Now, Make it Your Own.</h4>
                                        <p className="text-slate-300 mt-2">Unlock the full Lucius AI suite to generate content from this template in your unique Brand Voice.</p>
                                        <Link to="/signup">
                                            <Button size="lg" className="mt-4">Unlock the Perfection Engine</Button>
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