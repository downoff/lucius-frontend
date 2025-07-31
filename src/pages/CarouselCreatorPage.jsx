import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CarouselSlide = ({ title, content, slideNumber }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        toast.success(`Slide ${slideNumber} content copied!`);
    };

    return (
        <Card className="bg-slate-900/50 border-slate-700 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="whitespace-pre-wrap">{content}</p>
            </CardContent>
            <div className="p-4 text-right">
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy Text</Button>
            </div>
        </Card>
    );
};

function CarouselCreatorPage() {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [carouselData, setCarouselData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCarouselData(null);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${backendUrl}/api/ai/generate-carousel`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ topic }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setCarouselData(data.carouselData);
            toast.success("Carousel content generated!");

        } catch (error) {
            toast.error(error.message, {
                action: error.message.includes('credits') ? (
                    <Link to="/pricing"><Button variant="outline" size="sm">Upgrade</Button></Link>
                ) : undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-4xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">AI Carousel Creator</CardTitle>
                    <CardDescription>Enter a topic and get the text for a 5-slide social media carousel instantly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="topic">Carousel Topic</Label>
                            <Input id="topic" placeholder="e.g., The future of remote work" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Generating Carousel...' : 'Generate Content'}
                        </Button>
                    </form>

                    {isLoading && (
                        <div className="text-center p-8">
                            <div className="loader"></div>
                            <p className="text-slate-400 mt-4">Generating your carousel...</p>
                        </div>
                    )}

                    {carouselData && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <CarouselSlide title="Slide 1: Title" content={carouselData.slide1_title} slideNumber={1} />
                            <CarouselSlide title="Slide 2: Intro" content={carouselData.slide2_intro} slideNumber={2} />
                            <CarouselSlide title="Slide 3: Point 1" content={carouselData.slide3_point1} slideNumber={3} />
                            <CarouselSlide title="Slide 4: Point 2" content={carouselData.slide4_point2} slideNumber={4} />
                            <CarouselSlide title="Slide 5: Call to Action" content={carouselData.slide5_cta} slideNumber={5} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default CarouselCreatorPage;
