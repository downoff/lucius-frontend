// frontend/src/pages/SocialStudio.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import StreamingResult from '@/components/StreamingResult';
import ShareButton from '@/components/ShareButton';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

function SocialStudio() {
  const [platform, setPlatform] = useState('X (formerly Twitter)');
  const [coreMessage, setCoreMessage] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);

  // helper to call your backend generate endpoint
  async function callGenerate({ makePublic = false } = {}) {
    setIsLoading(true);
    setResult('');
    setHasGenerated(true);

    const token = localStorage.getItem('token'); // if you use JWT auth
    if (!token && !navigator.cookieEnabled) {
      toast.error("Please log in to generate content.");
      setIsLoading(false);
      return;
    }

    try {
      let finalPrompt = `You are an expert social media marketer. Your target platform is ${platform}. Create 3 distinct post variations based on the core message: "${coreMessage}". Each variation MUST be separated by "---".`;
      if (keywords) finalPrompt += ` Be sure to include the following keywords: ${keywords}.`;

      const payload = {
        prompt: finalPrompt,
        tool: 'Social Studio',
        publicShare: !!makePublic,
        title: coreMessage.slice(0, 80)
      };

      const headers = { 'Content-Type': 'application/json' };
      let fetchOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      };

      // if you use JWT token in localStorage, send it. Otherwise rely on session cookie.
      if (token) {
        fetchOptions.headers = { ...headers, Authorization: `Bearer ${token}` };
      } else {
        fetchOptions.credentials = 'include';
      }

      const res = await fetch(`${backendUrl}/api/ai/generate`, fetchOptions);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Generation failed');
      }

      // show returned text
      setResult(json.text || '');

      // if share created, show toast and copy link
      if (json.shareUrl) {
        try {
          await navigator.clipboard.writeText(json.shareUrl);
          toast.success('Share link copied to clipboard!');
        } catch (err) {
          // fallback: show url in toast
          toast.success(`Share link: ${json.shareUrl}`);
        }
      }

    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    callGenerate({ makePublic: false });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-3xl mx-auto glass-card text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Social Media Studio</CardTitle>
          <CardDescription>Your AI co-pilot for creating high-quality social media content in seconds.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="core-message">Core Message or Topic</Label>
              <Textarea
                id="core-message"
                placeholder="e.g., The launch of our new productivity app..."
                required
                value={coreMessage}
                onChange={(e) => setCoreMessage(e.target.value)}
                className="bg-slate-900 border-slate-700 min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="platform-select">Target Platform</Label>
                <Select onValueChange={(val) => setPlatform(val)} defaultValue={platform}>
                  <SelectTrigger id="platform-select" className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 text-white border-slate-700">
                    <SelectItem value="X (formerly Twitter)">X (formerly Twitter)</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram Caption">Instagram Caption</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords to Include (optional)</Label>
                <Input
                  type="text"
                  id="keywords"
                  placeholder="e.g., productivity, new feature"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading} className="flex-1 text-lg h-12">
                {isLoading ? 'Generating...' : 'Generate (Private)'}
              </Button>

              {/* Share button triggers generation with publicShare=true */}
              <ShareButton onShare={() => callGenerate({ makePublic: true })} />
            </div>
          </form>

          {/* streaming result component (or just show text if not streaming) */}
          {(isLoading || result) && <StreamingResult result={result} isLoading={isLoading} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default SocialStudio;
