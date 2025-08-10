import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { useUser } from '../layouts/AppLayout'; // <-- Import the user context

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CampaignDayCard = ({ dayData }) => {
    // ... (CampaignDayCard component code - no changes)
};

export default function CampaignGeneratorPage() {
    const user = useUser(); // Get the logged-in user's data
    const [goal, setGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [campaignData, setCampaignData] = useState(null);
    const [placeholder, setPlaceholder] = useState('e.g., Launch a new productivity app next week');

    // This useEffect hook dynamically changes the placeholder
    useEffect(() => {
        if (user && user.niche === 'fitness-coaches') {
            setPlaceholder('e.g., Launch a new 6-week summer fitness challenge');
        } else if (user && user.niche === 'saas-founders') {
            setPlaceholder('e.g., Announce our new AI-powered analytics feature');
        }
    }, [user]);

    const handleSubmit = async (event) => {
        // ... (handleSubmit logic - no changes)
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
                            <Input id="goal" placeholder={placeholder} required value={goal} onChange={(e) => setGoal(e.target.value)} className="bg-slate-900 border-slate-700" />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Generating Your Campaign...' : 'Generate 7-Day Campaign'}
                        </Button>
                    </form>

                    {/* ... (rest of the component JSX for loading and results) ... */}
                </CardContent>
            </Card>
        </motion.div>
    );
}