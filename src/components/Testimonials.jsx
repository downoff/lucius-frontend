import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

// THESE ARE THE NEW, HYPER-SPECIFIC TESTIMONIALS
const testimonials = [
    {
        name: "Jenna Thompson",
        title: "Freelance Content Creator",
        quote: "As a freelance creator, Lucius cut my content creation time by 80%—in my actual voice. It's not just a tool; it's the reason I can now take on two more clients. It paid for itself in the first week."
    },
    {
        name: "Carlos Reyes",
        title: "Founder, Spark Agency",
        quote: "The Brand Voice AI is a game-changer for agencies. We onboard a new client, train their voice in five minutes, and can instantly start generating on-brand content. This has completely changed our workflow."
    },
    {
        name: "Aisha Khan",
        title: "Online Course Creator",
        quote: "I used the One-Click Campaign Generator to plan the launch for my new masterclass. It gave me a full 7-day strategic plan in 90 seconds. It's like having a world-class marketing strategist on my team."
    }
];

export default function Testimonials() {
    return (
        <section className="w-full py-20">
            <div className="container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for Creators. Trusted by Agencies.</h2>
                    <p className="text-lg text-slate-400 mt-2">The world's top solo entrepreneurs use Lucius AI to build their brands.</p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} 
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="glass-card text-white h-full">
                                <CardContent className="p-6 text-left">
                                    <p className="text-lg">"{testimonial.quote}"</p>
                                    <div className="mt-4">
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-slate-400">{testimonial.title}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}