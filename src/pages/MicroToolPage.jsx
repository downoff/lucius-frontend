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

export default function MicroToolPage() {
    const { nicheSlug } = useParams();
    const [niche, setNiche] = useState(null);
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    // This useEffect hook now fetches the page data from the server
    useEffect(() => {
        const fetchPageData = async () => {
            try {
                // Fetch the generated JSON file from the public folder
                const response = await fetch('/pages.json');
                const allNiches = await response.json();
                const currentNiche = allNiches.find(p => p.slug === nicheSlug);

                if (currentNiche) {
                    setNiche(currentNiche);
                }
            } catch (error) {
                console.error("Failed to load page data", error);
            } finally {
                setIsLoadingPage(false);
            }
        };

        fetchPageData();
    }, [nicheSlug]);


    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');

    // This useEffect hook pre-fills the prompt once the niche data is loaded
    useEffect(() => {
        if(niche) {
            setPrompt(niche.placeholder);
        }
    }, [niche]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult('');
        try {
            const fullPrompt = `Generate a social media post for ${niche.title} about: ${prompt}`;
            const response = await fetch(`${backendUrl}/api/public/generate-demo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: fullPrompt }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResult(data.text);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoadingPage || !niche) {
        return <div className="w-full min-h-screen bg-slate-900 text-white flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Social Media Post Generator</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-400">for {niche.title}</h2>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-2xl mx-auto mt-8">
                    <Card className="glass-card text-white">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <Textarea
                                    placeholder={niche.placeholder}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    className="bg-slate-900 border-slate-700 min-h-[100px] text-lg"
                                    required
                                />
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-lg">
                                    {isLoading ? 'Generating Post...' : 'Generate Free Post'}
                                </Button>
                            </form>
                             {result && (
                                <div className="mt-6 border-t border-slate-700 pt-6">
                                    <h3 className="text-lg font-semibold">Generated Post:</h3>
                                    <p className="mt-2 p-4 bg-slate-900/50 rounded-md whitespace-pre-wrap">{result}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
                 <div className="mt-12 text-center bg-purple-900/30 p-8 rounded-lg max-w-3xl">
                    <h4 className="font-bold text-2xl">This is Just the Beginning.</h4>
                    <p className="text-slate-300 mt-2">The full Lucius AI suite includes a Brand Voice AI, a One-Click Campaign Generator, automated scheduling, and more. Unlock your full potential.</p>
                    <Link to="/signup">
                        <Button size="lg" className="mt-4">Explore Lucius AI for Free</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}