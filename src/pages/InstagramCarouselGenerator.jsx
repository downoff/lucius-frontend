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

const CarouselSlideCard = ({ slideData }) => {
    const handleCopy = () => {
        const textToCopy = `${slideData.slide_title}\n\n${slideData.slide_content}`;
        navigator.clipboard.writeText(textToCopy);
        toast.success("Slide content copied!");
    };

    return (
        <Card className="glass-card text-white h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">{slideData.slide_title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="whitespace-pre-wrap">{slideData.slide_content}</p>
            </CardContent>
            <div className="p-4 text-right">
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy Text</Button>
            </div>
        </Card>
    );
};

export default function InstagramCarouselGenerator() {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [carouselData, setCarouselData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCarouselData(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/generate-ig-carousel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setCarouselData(data.carousel);
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-4xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Free AI Instagram Carousel Generator</CardTitle>
                            <CardDescription>Beat the new algorithm. Turn any topic into a 5-slide "original content" carousel.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="topic">What's your carousel about?</Label>
                                    <Input id="topic" placeholder="e.g., 5 tips for better sleep" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Generating Carousel...' : 'Generate Carousel Content'}
                                </Button>
                            </form>

                            {isLoading && (
                                <div className="text-center p-8"><div className="loader mx-auto"></div></div>
                            )}

                            {carouselData && (
                                <div className="mt-6 border-t border-slate-700 pt-6">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {carouselData.map((slide, index) => (
                                            <CarouselSlideCard key={index} slideData={slide} />
                                        ))}
                                    </div>
                                    <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                        <h4 className="font-bold text-lg">This is Just 1% of the Power</h4>
                                        <p className="text-slate-300 mt-2">The full Lucius AI suite includes a Brand Voice AI, a One-Click Campaign Generator, automated scheduling, and more.</p>
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
