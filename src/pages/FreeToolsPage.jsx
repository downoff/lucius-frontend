import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const tools = [
    {
        title: "AI Tweet Hook Generator",
        description: "Never write a boring tweet again. Get 5 viral hooks in seconds.",
        link: "/free-tools/tweet-hook-generator"
    },
    {
        title: "AI Brand Voice Analyzer",
        description: "Paste any text to instantly discover its unique brand voice.",
        link: "/free-tools/tone-analyzer"
    },
    {
        title: "AI Instagram Carousel Generator",
        description: "Beat the new algorithm. Turn any topic into a 5-slide carousel.",
        link: "/free-tools/instagram-carousel-generator"
    },
    {
        title: "GTA VI Viral Title Generator",
        description: "Generate 'MrBeast-style' titles for your gameplay videos.",
        link: "/gta/viral-title-generator"
    },
    // Add more free tools here in the future
];

export default function FreeToolsPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Lucius AI Arsenal</h1>
                    <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">A suite of world-class, free tools to give you an unfair advantage. No signup required.</p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={tool.link}>
                                <Card className="glass-card text-white h-full hover:border-purple-500 transition-colors">
                                    <CardHeader>
                                        <CardTitle>{tool.title}</CardTitle>
                                        <CardDescription className="pt-2">{tool.description}</CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}