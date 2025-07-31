import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DayPlanCard = ({ day, plan }) => {
    return (
        <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
                <CardTitle className="capitalize">{day}</CardTitle>
                <CardDescription>{plan.theme}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{plan.idea}</p>
            </CardContent>
        </Card>
    );
};

function WeeklyPlannerPage() {
    const [topic, setTopic] = useState('');
    const [audience, setAudience] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [weeklyPlan, setWeeklyPlan] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setWeeklyPlan(null);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${backendUrl}/api/ai/generate-weekly-plan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ topic, audience }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setWeeklyPlan(data.weeklyPlan);
            toast.success("Your weekly plan is ready!");

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
            <Card className="w-full max-w-4xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle className="text-3xl">AI Weekly Content Planner</CardTitle>
                    <CardDescription>Enter your main topic and target audience to get a strategic 7-day content plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="topic">Main Topic for the Week</Label>
                                <Input id="topic" placeholder="e.g., The benefits of AI in marketing" required value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border-slate-700" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="audience">Target Audience</Label>
                                <Input id="audience" placeholder="e.g., Small business owners" required value={audience} onChange={(e) => setAudience(e.target.value)} className="bg-slate-900 border-slate-700" />
                            </div>
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full">
                            {isLoading ? 'Planning Your Week...' : 'Generate 7-Day Plan'}
                        </Button>
                    </form>

                    {isLoading && (
                        <div className="text-center p-8">
                            <div className="loader"></div>
                            <p className="text-slate-400 mt-4">Generating your strategic plan...</p>
                        </div>
                    )}

                    {weeklyPlan && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(weeklyPlan).map(([day, plan]) => (
                                <DayPlanCard key={day} day={day} plan={plan} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default WeeklyPlannerPage;
