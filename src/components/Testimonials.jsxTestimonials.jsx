import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Danielle Mimoni",
        title: "Social Media Manager, Klowt",
        quote: "Lucius AI's Brand Voice feature is a game-changer. It's the first AI that actually sounds like my clients. It has saved me hours of editing and has become an indispensable part of my workflow."
    },
    {
        name: "Ross Simmonds",
        title: "Founder, Foundation Marketing",
        quote: "The One-Click Campaign Generator is not just a tool; it's a strategic partner. The ability to go from a single goal to a full week of content is a massive unlock for any B2B marketing team."
    },
    {
        name: "Olly Meakings",
        title: "Co-founder, Senja.io",
        quote: "As a bootstrapped founder, my time is everything. Lucius AI is the highest-leverage tool I've seen. It's a perfect example of a product built with a deep understanding of the user's real pain."
    }
];

export default function Testimonials() {
    return (
        <section className="w-full py-20">
            <div className="container mx-auto px-4 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trusted by the Best in the Industry</h2>
                    <p className="text-lg text-slate-400 mt-2">The world's top marketers and founders use Lucius AI to build their brands.</p>
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