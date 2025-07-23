import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function SocialStudio() {
    const [platform, setPlatform] = useState('X (formerly Twitter)');
    const [coreMessage, setCoreMessage] = useState('');
    const [keywords, setKeywords] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [output, setOutput] = useState('Your generated social media posts will appear here.');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setOutput('');

        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". The tone should be engaging and professional.`;
        if (keywords) {
            finalPrompt += ` Be sure to include the following keywords: ${keywords}.`;
        }

        try {
            const response = await puter.ai.chat(finalPrompt);
            setOutput(response.message.content);
        } catch (error) {
            console.error("Error during Puter.js generation:", error);
            setOutput('Sorry, an error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold">Social Media Studio</h1>
                <p className="text-slate-400 mt-2">Your AI co-pilot for creating high-quality social media content in seconds.</p>
            </header>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="core-message">Core Message or Topic</Label>
                    <Textarea id="core-message" placeholder="e.g., The launch of our new productivity app..." required value={coreMessage} onChange={(e) => setCoreMessage(e.target.value)} className="bg-slate-800 border-slate-700 min-h-[120px]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="platform-select">Target Platform</Label>
                        <Select onValueChange={setPlatform} defaultValue={platform}>
                            <SelectTrigger id="platform-select" className="bg-slate-800 border-slate-700">
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
                        <Input type="text" id="keywords" placeholder="e.g., productivity, new feature" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="bg-slate-800 border-slate-700" />
                    </div>
                </div>
                <div>
                    <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
                        {isLoading ? 'Generating...' : 'Generate Posts'}
                    </Button>
                </div>
            </form>
            <div className="mt-8">
                <Label className="text-lg">Generated Content</Label>
                <div className="mt-2 p-4 bg-slate-800/50 border border-slate-700 rounded-md min-h-[250px] whitespace-pre-wrap">
                    {isLoading ? (<div className="flex justify-center items-center h-full"><div className="loader"></div></div>) : output}
                </div>
            </div>
        </div>
    );
}

export default SocialStudio;