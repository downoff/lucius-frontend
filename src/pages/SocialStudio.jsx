import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function SocialStudio() {
    const [platform, setPlatform] = useState('X (formerly Twitter)');
    const [coreMessage, setCoreMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState('Your generated social media posts will appear here.');
    
    // This effect will clean up the connection if the user navigates away
    useEffect(() => {
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
        setOutput('');
        
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to use the Pro generator.");
            setIsLoading(false);
            return;
        }

        let finalPrompt = `You are an expert social media marketer...`; // Your full prompt logic

        // Use EventSource to connect to the streaming endpoint
        const eventSource = new EventSource(`${backendUrl}/api/ai/generate?token=${token}&prompt=${encodeURIComponent(finalPrompt)}`);

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.error) {
                toast.error(parsedData.error);
                eventSource.close();
                setIsLoading(false);
            } else {
                setOutput(prevOutput => prevOutput + parsedData.text);
            }
        };

        eventSource.onerror = () => {
            toast.error("Connection to the AI server failed. Please try again.");
            eventSource.close();
            setIsLoading(false);
        };
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-3xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">Social Media Studio</CardTitle>
                    <CardDescription>Your AI co-pilot for creating high-quality social media content in seconds.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ... Your full form JSX ... */}
                        <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
                            {isLoading ? 'Generating...' : 'Generate Posts'}
                        </Button>
                    </form>
                    <div className="mt-8">
                        <Label className="text-lg">Generated Content</Label>
                        <div className="mt-2 p-4 bg-slate-900/50 border border-slate-700 rounded-md min-h-[250px] whitespace-pre-wrap">
                            {output}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SocialStudio;