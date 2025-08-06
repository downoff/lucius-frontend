import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import StreamingResult from '@/components/StreamingResult'; // <-- NEW

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function SocialStudio() {
    const [platform, setPlatform] = useState('X (formerly Twitter)');
    const [coreMessage, setCoreMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);

    useEffect(() => {
        // This ensures the EventSource connection is closed if the user navigates away
        let eventSource;
        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult('');
        setHasGenerated(true);

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to generate content.");
            setIsLoading(false);
            return;
        }

        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". Each variation MUST be separated by "---".`;
        if (keywords) {
            finalPrompt += ` Be sure to include the following keywords: ${keywords}.`;
        }
        
        // This is a GET request, so we pass the data in the URL
        const url = new URL(`${backendUrl}/api/ai/generate`);
        url.searchParams.append('token', token);
        url.searchParams.append('prompt', finalPrompt);

        const eventSource = new EventSource(url);

        eventSource.onmessage = (e) => {
            const parsedData = JSON.parse(e.data);
            if (parsedData.error) {
                toast.error(parsedData.error);
                eventSource.close();
                setIsLoading(false);
            } else {
                setResult(prevResult => prevResult + parsedData.text);
            }
        };

        eventSource.onerror = () => {
            toast.error("Connection to the AI server failed. Please check your credits or try again.");
            eventSource.close();
            setIsLoading(false);
        };
        
    };
    
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-3xl mx-auto glass-card text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">Social Media Studio</CardTitle>
                    <CardDescription>Your AI co-pilot for creating high-quality social media content in seconds.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="core-message">Core Message or Topic</Label>
                            <Textarea id="core-message" placeholder="e.g., The launch of our new productivity app..." required value={coreMessage} onChange={(e) => setCoreMessage(e.target.value)} className="bg-slate-900 border-slate-700 min-h-[120px]" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="platform-select">Target Platform</Label>
                                <Select onValueChange={setPlatform} defaultValue={platform}>
                                    <SelectTrigger id="platform-select" className="bg-slate-900 border-slate-700">
                                        <SelectValue placeholder="Select a platform" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 text-white border-slate-700">
                                        <SelectItem value="X (formerly Twitter)">X (Twitter)</SelectItem>
                                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                        <SelectItem value="Instagram Caption">Instagram</SelectItem>
                                        <SelectItem value="Facebook">Facebook</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="keywords">Keywords to Include (optional)</Label>
                                <Input type="text" id="keywords" placeholder="e.g., productivity, new feature" value={keywords} onChange={(e) => setKeywords(e.g.target.value)} className="bg-slate-900 border-slate-700" />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
                                {isLoading ? 'Generating...' : 'Generate Posts'}
                            </Button>
                        </div>
                    </form>
                    
                    {(isLoading || result) && <StreamingResult result={result} isLoading={isLoading} />}

                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SocialStudio;