import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';

function BlogPage() {
  return (
    <div className="w-full min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight mb-8">The Lucius AI Blog</h1>
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug}>
              <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition-colors">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription className="mt-2">{post.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;