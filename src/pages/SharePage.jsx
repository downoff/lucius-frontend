import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function SharePage() {
    const { shareId } = useParams();
    const [share, setShare] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchShare = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/public/share/${shareId}`);
                const data = await response.json();
                if (!response.ok) throw new Error(data.message);
                setShare(data.share);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchShare();
    }, [shareId]);

    if (isLoading) {
        return <div className="text-center p-8 text-white">Loading...</div>;
    }

    if (!share) {
        return <div className="text-center p-8 text-white">Shared content not found.</div>;
    }

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <Card className="max-w-3xl mx-auto glass-card text-white">
                    <CardHeader>
                        <CardTitle>{share.content.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{ __html: share.content.text }} />
                    </CardContent>
                </Card>
                {share.watermark && (
                    <div className="text-center mt-4">
                        <a href="https://www.ailucius.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-white">
                            ✨ Generated with Lucius AI
                        </a>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}