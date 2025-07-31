import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

// NEW: Import the markdown renderer
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function PostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    // A simple fallback for a post not being found
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white font-sans">
            <Header />
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <p className="text-slate-400">Sorry, we couldn't find the article you were looking for.</p>
                <Link to="/blog" className="mt-8 inline-block">
                    <Button variant="outline">← Back to Blog</Button>
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* The 'prose' classes from Tailwind automatically style the rendered markdown */}
        <article className="prose prose-invert lg:prose-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          {/* This component now handles the rendering */}
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>

          <Link to="/blog" className="mt-8 inline-block no-underline">
            <Button variant="outline">← Back to Blog</Button>
          </Link>
        </article>
      </div>
    </div>
  );
}

export default PostPage;