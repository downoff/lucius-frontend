// frontend/src/pages/SharePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export default function SharePage() {
  const { shareId } = useParams();
  const [share, setShare] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/public/share/${shareId}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        setShare(json.share);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShare();
  }, [shareId]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!share) return <div className="p-8 text-center">Shared content not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="py-6 border-b bg-white">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-lg font-bold">Lucius AI</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-semibold mb-4">{share.content.title}</h1>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: share.content.text }} />
          {share.watermark && (
            <div className="mt-6 text-sm text-gray-500">
              ✨ <a href="https://www.ailucius.com" target="_blank" rel="noreferrer" className="underline">Generated with Lucius AI</a>
            </div>
          )}
        </article>
      </main>

      <footer className="py-8 text-center text-sm text-gray-500">
        <div>Share ID: {share.shareId}</div>
      </footer>
    </div>
  );
}
