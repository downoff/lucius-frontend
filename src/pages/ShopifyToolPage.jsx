// src/pages/ShopifyToolPage.jsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const DAILY_LIMIT = 3;

const ResultCard = ({ title, content, isHtml = false }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toast.success(`${title} copied!`);
    };
    return (
        <Card className="glass-card text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy</Button>
            </CardHeader>
            <CardContent>
                {isHtml ? (
                    <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                    <p className="whitespace-pre-wrap">{content}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default function ShopifyToolPage() {
    const [productName, setProductName] = useState('');
    const [features, setFeatures] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [remaining, setRemaining] = useState(DAILY_LIMIT);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const stored = JSON.parse(localStorage.getItem('shopifyGen') || '{}');

        if (stored.date !== today) {
            localStorage.setItem('shopifyGen', JSON.stringify({ date: today, count: 0 }));
            setRemaining(DAILY_LIMIT);
        } else {
            setRemaining(DAILY_LIMIT - stored.count);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (remaining <= 0) {
            toast.error("Daily free limit reached! Sign up for unlimited access.");
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch(`${backendUrl}/api/public/generate-shopify-description`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productName, features }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResult(data.description);
            toast.success("Your high-converting description is ready!");

            const today = new Date().toISOString().split('T')[0];
            const stored = JSON.parse(localStorage.getItem('shopifyGen') || '{}');
            const newCount = stored.date === today ? stored.count + 1 : 1;
            localStorage.setItem('shopifyGen', JSON.stringify({ date: today, count: newCount }));
            setRemaining(DAILY_LIMIT - newCount);

        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Generate 30 Days of Shopify Content in 5 Minutes
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">
                        The free AI engine for Shopify store owners. Turn a product name into high-converting descriptions, social posts, and more.
                        <br />
                        <span className="text-purple-400 font-semibold">{remaining} free generation(s) left today.</span>
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-2xl mx-auto mt-8">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">Product Name</Label>
                                    <Input
                                        id="product-name"
                                        placeholder="e.g., The All-Day Adventure Backpack"
                                        required
                                        value={productName}
                                        onChange={e => setProductName(e.target.value)}
                                        className="bg-slate-900 border-slate-700"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="features">Key Features (comma-separated)</Label>
                                    <Textarea
                                        id="features"
                                        placeholder="e.g., Waterproof, lightweight, 20L capacity, laptop sleeve"
                                        required
                                        value={features}
                                        onChange={e => setFeatures(e.target.value)}
                                        className="bg-slate-900 border-slate-700"
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-lg">
                                    {isLoading ? "Generating..." : "Generate My Description"}
                                </Button>
                            </form>

                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}

                            {result && (
                                <div className="mt-6 border-t border-slate-700 pt-6 space-y-4">
                                    <ResultCard title="Generated Product Title" content={result.title} />
                                    <ResultCard title="Generated Description (HTML)" content={result.body_html} isHtml={true} />
                                    <ResultCard title="Generated Social Post" content={result.social_post} />
                                </div>
                            )}

                            <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                {remaining > 0 ? (
                                    <>
                                        <h4 className="font-bold text-lg">This is Just the Beginning.</h4>
                                        <p className="text-slate-300 mt-2">
                                            Unlock the full Lucius AI suite to generate campaigns and schedule posts in your unique Brand Voice.
                                        </p>
                                        <Link to="/signup?niche=shopify-owner">
                                            <Button size="lg" className="mt-4">Explore Lucius AI for Free</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-slate-300">Daily free limit reached!</p>
                                        <Link to="/signup?niche=shopify-owner">
                                            <Button size="lg" className="mt-4">Sign Up for Unlimited Access</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}
