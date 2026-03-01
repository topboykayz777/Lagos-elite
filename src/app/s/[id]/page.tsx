"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from "@/integrations/supabase/client";
import { Zap, Calendar, Type, Clock, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function PublicStoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('id', id)
        .single();

      if (!error) setStory(data);
      setLoading(false);
    };
    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Zap className="w-8 h-8 text-violet-500 animate-pulse" />
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-black tracking-tighter mb-4">Story Not Found</h1>
        <p className="text-zinc-500 mb-8">This story may have been deleted or the link is invalid.</p>
        <Link href="/" className="text-violet-400 hover:underline font-bold">Go to Unbound AI</Link>
      </div>
    );
  }

  const wordCount = story.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-violet-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-xl tracking-tighter">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            UNBOUND<span className="text-violet-500">AI</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-green-500" /> Encrypted Share
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6 text-center">
            <div className="flex justify-center gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {format(new Date(story.created_at), 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center gap-1.5">
                <Type className="w-3 h-3" />
                {wordCount} Words
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {readTime} Min Read
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              {story.prompt}
            </h1>
          </div>

          <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 font-serif text-2xl leading-relaxed text-zinc-300 whitespace-pre-wrap">
            {story.content}
          </div>

          <div className="pt-12 border-t border-white/5 text-center space-y-4">
            <p className="text-zinc-500 text-sm">Generated with Unbound AI — The world's first truly uncensored writer.</p>
            <Link href="/">
              <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-full font-black tracking-tighter transition-all active:scale-95">
                Create Your Own Story
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}