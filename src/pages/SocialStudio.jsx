import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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

        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". Each variation should be separated by "---".`;
        if (keywords) {
            finalPrompt += ` Include these keywords: ${keywords}.`;
        }

        try {
            // Using Puter.js for the free-to-use demo on this page
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
        <Card className="w-full max-w-3xl mx-auto bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
                <CardTitle className="text-2xl">Lucius Social Media Studio</CardTitle>
                <CardDescription>Enter a topic and let Lucius craft perfect posts for your social platforms.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form content remains the same */}
                </form>
                <div className="mt-8 space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-32"><div className="loader"></div></div>
                    ) : (
                        outputs.map((post, index) => (
                            <Card key={index} className="bg-slate-900/50 border-slate-700">
                                <CardContent className="p-4">
                                    <p className="whitespace-pre-wrap">{post.trim()}</p>
                                    <div className="text-right mt-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleCopy(post.trim())}>Copy</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default SocialStudio;