import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";

// Uses the environment variable for the backend URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function SchedulerPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');

    const fetchScheduledPosts = useCallback(async () => {
        const token = localStorage.getItem('token');
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
        setIsLoading(true);
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
            if (!response.ok) throw new Error('Failed to schedule post.');
            toast.success("Post scheduled successfully!");
            setContent('');
            setScheduledAt('');
            await fetchScheduledPosts();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
                <CardTitle className="text-2xl">Post Scheduler</CardTitle>
                <CardDescription>Plan your content in advance. This is a Pro feature.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleScheduleSubmit} className="space-y-4 mb-8 p-4 border border-slate-700 rounded-lg">
                    {/* ... JSX for the scheduler form ... */}
                </form>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Your Scheduled Posts</h3>
                    {isLoading && <p>Loading...</p>}
                    <div className="space-y-4">
                        {posts.length > 0 ? posts.map(post => (
                            <div key={post._id} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                                <p className="whitespace-pre-wrap">"{post.content}"</p>
                                <p className="text-sm text-slate-400 mt-2">Status: <span className="font-semibold">{post.status}</span></p>
                                <p className="text-sm text-slate-400">Scheduled for: {new Date(post.scheduledAt).toLocaleString()}</p>
                            </div>
                        )) : <p>You have no posts scheduled.</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default SchedulerPage;