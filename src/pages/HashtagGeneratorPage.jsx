import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const HashtagCategory = ({ title, hashtags }) => {
    const allHashtags = hashtags.join(' ');
    const handleCopy = () => {
        navigator.clipboard.writeText(allHashtags);
        toast.success(`${title} hashtags copied!`);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy All</Button>
            </div>
            <div className="p-4 bg-slate-900/50 border border-slate-700 rounded-md flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                    <span key={index} className="bg-slate-700 text-white px-2 py-1 rounded text-sm">{tag}</span>
                ))}
            </div>
        </div>
    );
};

function HashtagGeneratorPage() {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('Instagram');
    const [isLoading, setIsLoading] = useState(false);
    const [hashtagData, setHashtagData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setHashtagData(null);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${backendUrl}/api/ai/get-hashtags`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ topic, platform }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setHashtagData(data.hashtagData);
            toast.success("Hashtags generated!");

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
            <Card className="w-full max-w-3xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">AI Hashtag Generator</CardTitle>
                    <CardDescription>Get a strategic mix of popular, niche, and trending hashtags for your topic.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="topic">Post Topic</Label>
                                <Input id="topic" placeholder="e.g., Sustainable fashion" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="platform">Platform</Label>
                                 <Select onValueChange={setPlatform} defaultValue={platform}>
                                    <SelectTrigger id="platform" className="bg-slate-900 border-slate-700">
                                        <SelectValue placeholder="Select a platform" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 text-white border-slate-700">
                                        <SelectItem value="Instagram">Instagram</SelectItem>
                                        <SelectItem value="X (formerly Twitter)">X (Twitter)</SelectItem>
                                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                                        <SelectItem value="TikTok">TikTok</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Generating Hashtags...' : 'Generate Hashtags'}
                        </Button>
                    </form>

                    {isLoading && (
                        <div className="text-center p-8">
                            <div className="loader"></div>
                            <p className="text-slate-400 mt-4">Finding the best hashtags...</p>
                        </div>
                    )}

                    {hashtagData && (
                        <div className="space-y-6">
                            <HashtagCategory title="Popular" hashtags={hashtagData.popular} />
                            <HashtagCategory title="Niche" hashtags={hashtagData.niche} />
                            <HashtagCategory title="Trending" hashtags={hashtagData.trending} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default HashtagGeneratorPage;
