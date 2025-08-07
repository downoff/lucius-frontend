import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function WinCard({ win }) {
    const handleClone = () => {
        navigator.clipboard.writeText(win.template);
        toast.success("Idea copied to clipboard! Try it in the Social Studio.");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <Card className="glass-card text-white h-full flex flex-col justify-between">
                <CardContent className="p-4">
                    <p>
                        <span className="font-semibold">{win.niche}</span> {win.action}
                    </p>
                </CardContent>
                <div className="p-4 flex justify-end gap-2 border-t border-slate-700/50">
                    <Button variant="outline" size="sm" onClick={handleClone}>Clone this Idea</Button>
                </div>
            </Card>
        </motion.div>
    );
}