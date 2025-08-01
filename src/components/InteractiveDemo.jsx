import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function InteractiveDemo() {
    const [prompt, setPrompt] = useState('A tweet about the launch of a new productivity app.');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult('');
        try {
            const response = await fetch(`${backendUrl}/api/public/generate-demo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setResult(data.text);
            setHasGenerated(true);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Card className="glass-card text-white shadow-2xl shadow-purple-500/10">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Textarea
                            placeholder="Enter a topic..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="bg-slate-900 border-slate-700 min-h-[100px] text-lg"
                        />
                        <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700 text-lg">
                            {isLoading ? 'Generating...' : 'Get a Taste of the Magic ✨'}
                        </Button>
                    </form>

                    {isLoading && (
                        <div className="text-center p-8">
                            <div className="loader"></div>
                        </div>
                    )}

                    {result && (
                        <div className="mt-6 border-t border-slate-700 pt-6">
                            <h3 className="text-lg font-semibold">Generated Post:</h3>
                            <p className="mt-2 p-4 bg-slate-900/50 rounded-md whitespace-pre-wrap">{result}</p>
                            
                            {hasGenerated && (
                                <div className="mt-6 text-center bg-purple-900/30 p-4 rounded-lg">
                                    <h4 className="font-bold">Like what you see?</h4>
                                    <p className="text-slate-300 mt-1">Sign up for free to unlock all tools, save your history, and train your Brand Voice AI.</p>
                                    <Link to="/signup">
                                        <Button size="lg" className="mt-4">Unlock All Features</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
