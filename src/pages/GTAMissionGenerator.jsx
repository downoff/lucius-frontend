import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MissionResultCard = ({ title, children }) => {
    const handleCopy = () => {
        let textToCopy = '';
        if (Array.isArray(children)) {
            textToCopy = children.join('\n');
        } else {
            textToCopy = children;
        }
        navigator.clipboard.writeText(textToCopy);
        toast.success(`${title} copied!`);
    };

    return (
        <Card className="glass-card text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleCopy}>Copy</Button>
            </CardHeader>
            <CardContent>
                {Array.isArray(children) ? (
                    <ul className="list-disc pl-5 space-y-1">
                        {children.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                ) : (
                    <p className="whitespace-pre-wrap">{children}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default function GTAMissionGenerator() {
    const [gameplay, setGameplay] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mission, setMission] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setMission(null);
        try {
            const response = await fetch(`${backendUrl}/api/public/generate-gta-mission`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ gameplay }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setMission(data.mission);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex justify-center items-center p-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-3xl">
                    <Card className="w-full mx-auto glass-card text-white">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">GTA VI - AI Mission Generator</CardTitle>
                            <CardDescription>Turn your gameplay into a viral content mission.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <Label htmlFor="gameplay-input">Briefly describe your last gameplay session</Label>
                                    <Textarea id="gameplay-input" placeholder="e.g., I stole a rare sports car and had a huge police chase through Vice City." required value={gameplay} onChange={(e) => setGameplay(e.target.value)} className="bg-slate-900 border-slate-700 min-h-[100px]" />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                                    {isLoading ? 'Generating Mission...' : 'Generate Mission Briefing'}
                                </Button>
                            </form>

                            {isLoading && <div className="text-center p-8"><div className="loader mx-auto"></div></div>}
                            
                            {mission && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-center text-purple-400">{mission.mission_title}</h2>
                                    <MissionResultCard title="Viral Video Titles" children={mission.viral_titles} />
                                    <MissionResultCard title="15-Second Short Script" children={mission.short_script} />
                                    <MissionResultCard title="Strategic Hashtags" children={mission.hashtags} />
                                    <MissionResultCard title="Crew Recruitment Post" children={mission.crew_recruitment_post} />
                                </div>
                            )}

                            <div className="mt-8 text-center bg-purple-900/30 p-6 rounded-lg">
                                <h4 className="font-bold text-lg">This is Just the Beginning.</h4>
                                <p className="text-slate-300 mt-2">Unlock the full Lucius AI suite to generate campaigns and schedule posts in your unique Brand Voice.</p>
                                <Link to="/signup">
                                    <Button size="lg" className="mt-4">Explore the Full Arsenal</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}