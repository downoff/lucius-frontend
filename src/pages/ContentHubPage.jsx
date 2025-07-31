import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ContentCard = ({ item }) => {
    const navigate = useNavigate();
    return (
        <motion.div whileHover={{ y: -5 }} className="w-full">
            <Card className="glass-card text-white h-full flex flex-col justify-between">
                <div>
                    <CardHeader>
                        <CardTitle className="truncate">{item.title}</CardTitle>
                        <CardDescription>{item.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-400">{item.preview}</p>
                    </CardContent>
                </div>
                <div className="p-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/app/c/${item.id}`)}>View</Button>
                </div>
            </Card>
        </motion.div>
    );
};

function ContentHubPage() {
    const [feed, setFeed] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${backendUrl}/api/content-hub`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error("Failed to load your content feed.");
                const data = await response.json();
                setFeed(data);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeed();
    }, []);

    if (isLoading) {
        return <div className="text-center p-8 text-white">Loading your content hub...</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Content Command Center</h1>
                <p className="text-slate-400">All of your generated content, in one place.</p>
            </div>
            {feed.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feed.map(item => <ContentCard key={item.id} item={item} />)}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-slate-700 rounded-lg">
                    <h2 className="text-xl font-semibold">Your Hub is Empty</h2>
                    <p className="text-slate-400 mt-2">Start by using one of the tools in the sidebar to generate some content!</p>
                </div>
            )}
        </motion.div>
    );
}

export default ContentHubPage;
