import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import StreamingResult from './StreamingResult'; // <-- NEW

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function InteractiveDemo() {
    const [prompt, setPrompt] = useState('A tweet about the launch of a new productivity app.');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [hasGenerated, setHasGenerated] = useState(false);

    useEffect(() => {
        // This ensures the EventSource connection is closed if the user navigates away
        return () => {
            // We'll manage the EventSource instance inside the handleSubmit function
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setResult('');
        setHasGenerated(true);

        const eventSource = new EventSource(`${backendUrl}/api/public/generate-demo?prompt=${encodeURIComponent(prompt)}`);

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            if (parsedData.error) {
                toast.error(parsedData.error);
                eventSource.close();
                setIsLoading(false);
            } else {
                setResult(prevResult => prevResult + parsedData.text);
            }
        };

        eventSource.onerror = () => {
            toast.error("Connection to the AI server failed. Please try again.");
            eventSource.close();
            setIsLoading(false);
        };

        // This event fires when the stream is closed from the server
        eventSource.addEventListener('close', () => {
            eventSource.close();
            setIsLoading(false);
        });
        
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

                    {(isLoading || result) && <StreamingResult result={result} isLoading={isLoading} />}
                    
                    {hasGenerated && !isLoading && (
                        <div className="mt-6 text-center bg-purple-900/30 p-4 rounded-lg">
                            <h4 className="font-bold">This is just 1% of the power.</h4>
                            <p className="text-slate-300 mt-1">Sign up to unlock the Brand Voice AI, Campaign Generator, and more.</p>
                            <Link to="/signup">
                                <Button size="lg" className="mt-4">Unlock All Features</Button>
                            </Link>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}