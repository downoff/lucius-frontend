import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

const backendUrl = 'https://lucius-ai.onrender.com';

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
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
         <Card className="w-full max-w-2xl mx-auto bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
                <CardTitle className="text-2xl">AI Image Generator</CardTitle>
                <CardDescription>Describe any image you can imagine. This is a Pro feature.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleImageGeneration} className="space-y-4">
                    {/* ... JSX for the image gen form ... */}
                </form>
                 <div className="mt-6 text-center">
                    {isLoading ? <div className="loader"></div> : null}
                    {imageUrl && (
                        <div className="mt-4 border border-slate-700 rounded-lg p-2 bg-slate-900/50">
                            <img src={imageUrl} alt="AI generated" className="w-full h-auto rounded-md" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default ImageGenerator;