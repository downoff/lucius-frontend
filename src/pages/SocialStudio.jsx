import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';

function SocialStudio() {
    const [platform, setPlatform] = useState('X (formerly Twitter)');
    const [coreMessage, setCoreMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [outputs, setOutputs] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setOutputs([]);
        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". Each variation MUST be separated by "---".`;
        if (keywords) {
            finalPrompt += ` Be sure to include the following keywords: ${keywords}.`;
        }
        try {
            const response = await puter.ai.chat(finalPrompt);
            const generatedPosts = response.message.content.split('---').filter(p => p.trim() !== '');
            setOutputs(generatedPosts);
        } catch (error) {
            console.error("Error during Puter.js generation:", error);
            toast.error("An error occurred with the AI. Please try again.");
            setOutputs([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy);
        toast.success("Copied to clipboard!");
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
                                <Input type="text" id="keywords" placeholder="e.g., productivity, new feature" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="bg-slate-900 border-slate-700" />
                            </div>
                        </div>
                        <div>
                            <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
                                {isLoading ? 'Generating...' : 'Generate Posts'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-8 space-y-4">
                        <Label className="text-lg">Generated Content</Label>
                        {isLoading && (
                            <div className="flex justify-center items-center h-32"><div className="loader"></div></div>
                        )}
                        {outputs.map((post, index) => (
                            <Card key={index} className="bg-slate-900/50 border-slate-700">
                                <CardContent className="p-4">
                                    <p className="whitespace-pre-wrap">{post.trim()}</p>
                                    <div className="text-right mt-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleCopy(post.trim())}>Copy</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SocialStudio;