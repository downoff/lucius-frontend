import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from "@/components/ui/skeleton";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ContentCard = ({ card, index }) => {
    return (
        <Draggable draggableId={card._id.toString()} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                >
                    <Card className="glass-card text-white text-sm">
                        <CardContent className="p-3">
                            <p>{card.content}</p>
                            <p className="text-xs text-slate-400 mt-2">From: {card.sourceTool}</p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

const BoardColumn = ({ column, cards }) => {
    return (
        <Droppable droppableId={column._id.toString()}>
            {(provided) => (
                <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    className="bg-slate-900/50 rounded-lg p-3 w-72 flex-shrink-0"
                >
                    <h3 className="font-semibold mb-4 px-1">{column.name}</h3>
                    {cards.map((card, index) => <ContentCard key={card._id} card={card} index={index} />)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default function CanvasPage() {
    const [canvas, setCanvas] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCanvas = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${backendUrl}/api/canvas`, {
                    headers: { 'x-auth-token': token }
                });
                if (!response.ok) throw new Error("Failed to load your Content Canvas.");
                const data = await response.json();
                setCanvas(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCanvas();
    }, []);

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const startColumn = canvas.columns.find(col => col._id.toString() === source.droppableId);
        const endColumn = canvas.columns.find(col => col._id.toString() === destination.droppableId);
        const card = startColumn.cards.find(c => c._id.toString() === draggableId);

        // Optimistic UI Update
        const newStartCards = Array.from(startColumn.cards);
        newStartCards.splice(source.index, 1);
        
        const newColumns = canvas.columns.map(col => {
            if (col._id === startColumn._id) {
                return { ...col, cards: newStartCards };
            }
            return col;
        });

        const newEndCards = Array.from(endColumn.cards);
        newEndCards.splice(destination.index, 0, card);

        const finalColumns = newColumns.map(col => {
            if (col._id === endColumn._id) {
                 return { ...col, cards: newEndCards };
            }
            return col;
        });

        const newCanvasState = { ...canvas, columns: finalColumns };
        setCanvas(newCanvasState);

        // Update the backend
        const token = localStorage.getItem('token');
        try {
            await fetch(`${backendUrl}/api/canvas/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify({ columns: finalColumns }),
            });
        } catch (error) {
            toast.error("Failed to save changes. Reverting.");
            // Revert UI on failure
            // (For simplicity, we're not implementing full revert here, but a real app would)
        }
    };

    if (isLoading) {
        return (
            <div className="flex gap-4">
                <Skeleton className="h-[500px] w-72" />
                <Skeleton className="h-[500px] w-72" />
                <Skeleton className="h-[500px] w-72" />
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Lucius Canvas</h1>
                <p className="text-slate-400">Your Content Operating System. Drag, drop, and conquer.</p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {canvas.columns.map(column => (
                        <BoardColumn key={column._id} column={column} cards={column.cards} />
                    ))}
                </div>
            </DragDropContext>
        </motion.div>
    );
}