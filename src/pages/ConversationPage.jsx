import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ConversationPage() {
    const { conversationId } = useParams();
    const [conversation, setConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConversation = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${backendUrl}/api/ai/conversation/${conversationId}`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error("Failed to load conversation.");
                const data = await response.json();
                setConversation(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (conversationId) {
            fetchConversation();
        }
    }, [conversationId]);

    if (isLoading) {
        return <div className="text-center p-8 text-white">Loading conversation...</div>;
    }

    if (!conversation) {
        return <div className="text-center p-8 text-white">Conversation not found.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-3xl mx-auto bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                    <CardTitle>{conversation.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {conversation.messages.map((message, index) => (
                        <div key={index} className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-slate-700' : 'bg-slate-900/50'}`}>
                            <p className="text-sm font-bold capitalize mb-2">{message.role}</p>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default ConversationPage;
