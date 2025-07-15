import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from "sonner"; // Import the toast function

// Import all our Shadcn/UI components
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
    
    // NEW: The output is now an array to hold multiple post variations
    const [outputs, setOutputs] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setOutputs([]); // Clear previous results

        let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". Each variation should be separated by "---".`;
        if (keywords) {
            finalPrompt += ` Include these keywords: ${keywords}.`;
        }

        try {
            const response = await puter.ai.chat(finalPrompt);
            // Split the AI's single response string into an array of separate posts
            const generatedPosts = response.message.content.split('---').filter(p => p.trim() !== '');
            setOutputs(generatedPosts);
        } catch (error) {
            console.error("Error during Puter.js generation:", error);
            setOutputs(['Sorry, an error occurred. Please try again.']);
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
                    <CardTitle className="text-2xl">Lucius Social Media Studio</CardTitle>
                    <CardDescription>Enter a topic and let Lucius craft perfect posts for your social platforms.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* ... Your form JSX remains the same ... */}
                    </form>

                    {/* NEW: The output section now maps over the results */}
                    <div className="mt-8 space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            outputs.map((post, index) => (
                                <Card key={index} className="bg-slate-900/50 border-slate-700">
                                    <CardContent className="p-4">
                                        <p className="whitespace-pre-wrap">{post.trim()}</p>
                                        <div className="text-right mt-2">
                                            <Button variant="ghost" size="sm" onClick={() => handleCopy(post.trim())}>
                                                Copy
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SocialStudio;