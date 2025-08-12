import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import StreamingResult from '@/components/StreamingResult';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const nicheUiMap = {
  'fitness-coaches': {
    title: 'Client Post Generator',
    description: 'Your AI co-pilot for creating high-quality content for your fitness clients.',
    placeholder: 'e.g., A new 6-week summer fitness challenge'
  },
  'saas-founders': {
    title: 'SaaS Content Studio',
    description: 'Your AI co-pilot for creating high-converting content for your SaaS.',
    placeholder: 'e.g., Announce our new AI-powered analytics feature'
  },
  'default': {
    title: 'Social Studio',
    description: 'Your AI co-pilot for creating high-quality social media content in seconds.',
    placeholder: 'e.g., The launch of our new productivity app...'
  }
};

export default function SocialStudio() {
  const { user } = useUser();
  const [ui, setUi] = useState(nicheUiMap.default);
  const [platform, setPlatform] = useState('X (formerly Twitter)');
  const [coreMessage, setCoreMessage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (user && user.niche) {
      setUi(nicheUiMap[user.niche] || nicheUiMap.default);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResult('');
    setHasGenerated(false);

    try {
      const response = await fetch(`${backendUrl}/api/content/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, coreMessage, keywords })
      });

      if (!response.ok) throw new Error('Failed to generate content.');

      // Stream result (if backend supports it)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResult(accumulated);
      }

      setHasGenerated(true);
    } catch (error) {
      toast.error(error.message || 'Error generating content.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="w-full max-w-3xl mx-auto glass-card text-white">
        <CardHeader>
          <CardTitle className="text-3xl">{ui.title}</CardTitle>
          <CardDescription>{ui.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="core-message">Core Message or Topic</Label>
              <Textarea
                id="core-message"
                placeholder={ui.placeholder}
                value={coreMessage}
                onChange={(e) => setCoreMessage(e.target.value)}
                required
                className="bg-slate-900 border-slate-700 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platform-select">Target Platform</Label>
                <Select onValueChange={setPlatform} defaultValue={platform}>
                  <SelectTrigger id="platform-select" className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="X (formerly Twitter)">X (Twitter)</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram Caption">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (optional)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., productivity, new feature"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full text-lg h-12">
              {isLoading ? 'Generating...' : 'Generate Posts'}
            </Button>
          </form>

          {(isLoading || hasGenerated) && (
            <StreamingResult result={result} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
