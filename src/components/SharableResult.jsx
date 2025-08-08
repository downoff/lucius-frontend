import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from 'lucide-react';

export default function SharableResult({ imageUrl }) {
    if (!imageUrl) {
        return null;
    }

    return (
        <Card className="glass-card text-white mt-6">
            <CardHeader>
                <CardTitle className="text-lg">Your Sharable Image</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={imageUrl} alt="AI generated content for social media" className="rounded-md w-full border border-slate-700" />
                <a href={imageUrl} download="lucius-ai-generated.png" className="w-full">
                    <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                    </Button>
                </a>
            </CardContent>
        </Card>
    );
}