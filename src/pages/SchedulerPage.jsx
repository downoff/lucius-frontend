import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function SchedulerPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');

    const fetchScheduledPosts = useCallback(async () => {
        const token = localStorage.getItem('token');
        setIsLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/scheduled-posts`, {
                headers: { 'x-auth-token': token }
            });
            if (!response.ok) throw new Error('Failed to fetch scheduled posts.');
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchScheduledPosts();
    }, [fetchScheduledPosts]);

    const handleScheduleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/api/schedule-post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({ content, scheduledAt, platform: 'X/Twitter' })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            toast.success("Post scheduled successfully! It will be published automatically.");
            setContent('');
            setScheduledAt('');
            await fetchScheduledPosts(); // Refresh the list of posts
        } catch (err) {
            toast.error(err.message);
        }
    };

    const getStatusChip = (status) => {
        switch(status) {
            case 'scheduled': return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">Scheduled</span>;
            case 'posted': return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Posted</span>;
            case 'failed': return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Failed</span>;
            default: return null;
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-4xl mx-auto glass-card text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Post Scheduler</CardTitle>
                    <CardDescription>Plan your content in advance. Posts will be sent automatically to your connected X/Twitter account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Card className="glass-card mb-8">
                        <CardHeader>
                            <CardTitle>Schedule a New Post</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleScheduleSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="post-content">Post Content (Max 280 characters)</Label>
                                    <Textarea id="post-content" placeholder="What's happening?" required maxLength="280" value={content} onChange={e => setContent(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="schedule-datetime">Date and Time to Post</Label>
                                    <Input type="datetime-local" id="schedule-datetime" required value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="bg-slate-900 border-slate-700" />
                                </div>
                                <Button type="submit">Schedule Post</Button>
                            </form>
                        </CardContent>
                    </Card>
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Your Scheduled Posts</h3>
                        {isLoading && <p>Loading...</p>}
                        <div className="space-y-4">
                            {posts.length > 0 ? posts.map(post => (
                                <div key={post._id} className="glass-card p-4 rounded-lg flex justify-between items-start">
                                    <div>
                                        <p className="whitespace-pre-wrap">"{post.content}"</p>
                                        <p className="text-sm text-slate-400 mt-2">Scheduled for: {new Date(post.scheduledAt).toLocaleString()}</p>
                                    </div>
                                    {getStatusChip(post.status)}
                                </div>
                            )) : <p>You have no posts scheduled.</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default SchedulerPage;