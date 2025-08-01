import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Our Mission</h1>
                    <p className="text-lg text-slate-400 mt-4 text-center">
                        We believe that great ideas deserve to be heard. Lucius AI was built to empower creators, marketers, and founders to overcome the creative roadblocks that stand in their way.
                    </p>
                    
                    <div className="mt-12 prose prose-invert lg:prose-xl mx-auto">
                        <h2>The Founder's Journey</h2>
                        <p>
                            Lucius AI started not in a boardroom, but from a single point of frustration. As a solo founder, I experienced the constant pressure to create high-quality social media content to grow my projects. I knew what I wanted to say, but the process of translating those ideas into engaging posts, day after day, was a significant drain on my most valuable resource: time.
                        </p>
                        <p>
                            I saw the power of AI, but the existing tools felt generic. They were content generators, not creative partners. They didn't understand my brand, my voice, or my strategic goals. I didn't want a tool that would just write for me; I wanted a tool that would help me think, strategize, and execute faster.
                        </p>
                        <p>
                            So, I decided to build it myself.
                        </p>
                        <p>
                            Every feature in Lucius AI was born from a real-world need: from the Brand Voice AI that learns your unique style to the One-Click Campaign generator that transforms a single goal into a full week of strategic content. This is the tool I always wished I had.
                        </p>
                        <p>
                            Our mission is to be your creative co-pilot, giving you the leverage to turn your vision into a worldwide presence. We're just getting started, and we're thrilled to have you on this journey with us.
                        </p>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
}