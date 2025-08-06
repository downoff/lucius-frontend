import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import StreamingResult from './StreamingResult'; // Assuming this component exists

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
        setHasGenerated(true);

        const eventSource = new EventSource(`${backendUrl}/api/public/generate-demo?prompt=${encodeURIComponent(prompt)}`);

        eventSource.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);

            if (parsedData.event === 'close') {
                setIsLoading(false);
                eventSource.close();
                return;
            }

            if (parsedData.error) {
                toast.error(parsedData.error);
                setIsLoading(false);
                eventSource.close();
            } else {
                setResult(prevResult => prevResult + parsedData.text);
            }
        };

        eventSource.onerror = () => {
            toast.error("Connection to the AI server failed. Please try again.");
            setIsLoading(false);
            eventSource.close();
        };
    };

    return (
        // ... (Your existing JSX for the demo form)
    );
}