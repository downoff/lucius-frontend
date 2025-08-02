import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton"; // <-- NEW IMPORT

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CampaignDayCard = ({ dayData }) => {
    return (
        <Card className="glass-card text-white w-full">
            <CardHeader>
                <CardTitle className="capitalize text-xl">{dayData.day}</CardTitle>
                <CardDescription>{dayData.theme}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label className="text-slate-400">Post Idea</Label>
                        <p className="text-sm mt-1">{dayData.post_idea}</p>
                    </div>
                    <div>
                        <Label className="text-slate-400">Visual Idea</Label>
                        <p className="text-sm mt-1">{dayData.visual_idea}</p>
                    </div>
                     <div>
                        <Label className="text-slate-400">Hashtags</Label>
                        <p className="text-sm mt-1 font-mono">{dayData.hashtags}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

function CampaignGeneratorPage() {
    const [goal, setGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [campaignData, setCampaignData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCampaignData(null);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${backendUrl}/api/ai/generate-campaign`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ goal }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setCampaignData(data.campaignData.campaignPlan); // Access the nested array
            toast.success("Your 7-day campaign is ready!");

        } catch (error) {
            toast.error(error.message, {
                action: error.message.includes('credits') ? (
                    <Link to="/pricing"><Button variant="outline" size="sm">Upgrade</Button></Link>
                ) : undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-4xl mx-auto glass-card text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">One-Click Campaign Generator</CardTitle>
                    <CardDescription>Enter your campaign goal and get a complete 7-day content plan in a single click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="goal">What is your main campaign goal?</Label>
                            <Input id="goal" placeholder="e.g., Launch a new productivity app next week" required value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-slate-900 border-slate-700" />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Generating Your Campaign...' : 'Generate 7-Day Campaign'}
                        </Button>
                    </form>

                    {isLoading && (
                        <div className="space-y-6">
                            <div className="space-y-4 p-4 border border-slate-700 rounded-lg">
                                <Skeleton className="h-8 w-1/4" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                            <div className="space-y-4 p-4 border border-slate-700 rounded-lg">
                                <Skeleton className="h-8 w-1/4" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                    )}

                    {campaignData && (
                        <div className="space-y-6">
                            {campaignData.map((dayPlan) => (
                                <CampaignDayCard key={dayPlan.day} dayData={dayPlan} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default CampaignGeneratorPage;