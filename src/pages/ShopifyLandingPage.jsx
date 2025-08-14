import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Check } from 'lucide-react';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ResultCard = ({ title, content, isHtml = false }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toast.success(`${title} copied!`);
    };
    return (
        <Card className="glass-card text-white text-left">
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

export default function ShopifyLandingPage() {
    const [storeUrl, setStoreUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/analyze-shopify-store`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ storeUrl }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResult(data.assets);
            toast.success("Your first 5 AI-optimized assets are ready!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center pt-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI That Knows Shopify.</h1>
                    <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-2xl mx-auto">Generate high-converting product descriptions, ad copy, and emails instantly. Stop guessing. Start selling.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-full max-w-2xl mx-auto mt-8">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="store-url" className="text-center block font-semibold">Paste your Shopify store link to get your first 5 AI-optimized assets free.</label>
                                    <Input id="store-url" placeholder="e.g., your-store.myshopify.com" required value={storeUrl} onChange={(e) => setStoreUrl(e.target.value)} className="bg-slate-900 border-slate-700 text-center h-12 text-lg" />
                                </div>
                                <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-lg h-12">
                                    {isLoading ? 'Analyzing Your Store...' : 'Generate My Free Assets'}
                                </Button>
                            </form>
                             
                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}

                            {result && (
                                <div className="mt-6 border-t border-slate-700 pt-6 space-y-4">
                                    <ResultCard title="Rewritten Product Descriptions" content={result.rewritten_descriptions.join('\n\n')} />
                                    <ResultCard title="Generated Ad Headlines" content={result.ad_headlines.join('\n')} />
                                    <ResultCard title="Generated Welcome Email" content={result.welcome_email} />
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