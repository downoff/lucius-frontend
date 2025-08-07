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

const ResultCard = ({ title, results }) => {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Title copied!");
    };
    return (
        <div className="mt-6 border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="mt-2 space-y-3">
                {results.map((result, index) => (
                    <div key={index} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg flex justify-between items-center">
                        <p className="flex-grow">{result}</p>
                        <Button variant="ghost" size="sm" onClick={() => handleCopy(result)}>Copy</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function GTAViralTitleGenerator() {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResults(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/gta-tool`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ toolType: 'viral_title', topic }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResults(data.results);
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
                            <CardTitle className="text-3xl">GTA VI - AI Viral Title Generator</CardTitle>
                            <CardDescription>Generate "MrBeast-style" titles for your gameplay videos and streams.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="topic-input">What's your video about?</Label>
                                    <Input id="topic-input" placeholder="e.g., The first mission" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Generating Titles...' : 'Generate Viral Titles'}
                                </Button>
                            </form>

                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}
                            
                            {results && <ResultCard title="Generated Titles" results={results} />}

                            <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                <h4 className="font-bold text-lg">This is Just the Beginning.</h4>
                                <p className="text-slate-300 mt-2">Unlock the full Lucius AI suite to generate scripts, campaigns, and more in your unique Brand Voice.</p>
                                <Link to="/signup">
                                    <Button size="lg" className="mt-4">Explore the Full Arsenal</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
