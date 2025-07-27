import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    const handleImageGeneration = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setImageUrl('');
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please log in to use the Pro Image Generator.");
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${backendUrl}/api/ai/generate-image`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ prompt }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            setImageUrl(data.imageUrl);
            toast.success("Image generated successfully!");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">AI Image Generator</CardTitle>
                    <CardDescription>Describe any image you can imagine. This is a Pro feature.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleImageGeneration} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image-prompt">Your Image Prompt</Label>
                            <Textarea 
                                id="image-prompt" 
                                placeholder="e.g., A photorealistic portrait of a cat wearing a tiny wizard hat" 
                                required 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="bg-slate-900 border-slate-700 min-h-[100px]"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? 'Generating...' : 'Generate Image'}
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        {isLoading && (
                            <div className="flex flex-col justify-center items-center h-64">
                                <div className="loader"></div>
                                <p className="text-slate-400 mt-4">Generating your image... this can take up to a minute.</p>
                            </div>
                        )}
                        {imageUrl && (
                            <div className="mt-4 border border-slate-700 rounded-lg p-2 bg-slate-900/50">
                                <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                    <img src={imageUrl} alt="AI generated" className="w-full h-auto rounded-md" />
                                </a>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default ImageGenerator;