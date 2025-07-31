import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function ConversationPage() {
    const { conversationId } = useParams();
    const [conversation, setConversation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newPrompt, setNewPrompt] = useState('');
    const [isReplying, setIsReplying] = useState(false);

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

    const handleContinueConversation = async (event) => {
        event.preventDefault();
        setIsReplying(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/api/ai/conversation/${conversationId}/continue`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ prompt: newPrompt }),
            });
            const updatedConversation = await response.json();
            if (!response.ok) throw new Error(updatedConversation.message);
            
            setConversation(updatedConversation); // Update the page with the full new conversation
            setNewPrompt(''); // Clear the input field

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsReplying(false);
        }
    };


    if (isLoading) {
        return <div className="text-center p-8 text-white">Loading conversation...</div>;
    }
    if (!conversation) {
        return <div className="text-center p-8 text-white">Conversation not found.</div>;
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="w-full max-w-3xl mx-auto glass-card text-white">
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
                    
                    {/* NEW: Chat Input Form */}
                    <form onSubmit={handleContinueConversation} className="mt-6">
                         <div className="relative">
                            <Textarea
                                placeholder="Continue the conversation..."
                                value={newPrompt}
                                onChange={(e) => setNewPrompt(e.target.value)}
                                className="bg-slate-900 border-slate-700 min-h-[100px] pr-20"
                                required
                            />
                            <Button type="submit" disabled={isReplying} className="absolute bottom-3 right-3">
                                {isReplying ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export default ConversationPage;
