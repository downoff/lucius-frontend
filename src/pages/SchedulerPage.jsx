import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const backendUrl = 'https://lucius-ai.onrender.com';

function SchedulerPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
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
            setError(err.message);
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
            setContent('');
            setScheduledAt('');
            await fetchScheduledPosts(); // Refresh the list
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-12 animate-fadeIn">
            <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Post Scheduler</CardTitle>
                    <CardDescription>Plan your content in advance. Posts will be sent automatically to your connected X/Twitter account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleScheduleSubmit} className="space-y-4 mb-8 p-4 border border-slate-700 rounded-lg">
                        <div className="grid gap-2">
                            <Label htmlFor="post-content">Post Content (Max 280 characters)</Label>
                            <Textarea id="post-content" placeholder="What's happening?" required maxLength="280" value={content} onChange={e => setContent(e.target.value)} className="bg-slate-900 border-slate-700" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="schedule-datetime">Date and Time to Post</Label>
                            <Input type="datetime-local" id="schedule-datetime" required value={scheduledAt} onChange={e => setScheduledAt(e.target.value)} className="bg-slate-900 border-slate-700" />
                        </div>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Scheduling...' : 'Schedule Post'}</Button>
                    </form>
                    
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Your Scheduled Posts</h3>
                        {isLoading && <p>Loading...</p>}
                        {error && <p className="text-red-400">{error}</p>}
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
        </div>
    );
}

export default SchedulerPage;