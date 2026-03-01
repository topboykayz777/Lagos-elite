"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Calendar, 
  ChevronRight, 
  Search,
  Loader2,
  Type,
  Clock,
  Zap,
  TrendingUp,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';

export default function GalleryPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPublicStories();
  }, []);

  const fetchPublicStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*, profiles(sovereign_score)')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to load gallery");
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const filteredStories = stories.filter(s => 
    s.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold tracking-widest uppercase">
              <Globe className="w-3 h-3" /> The Unbound Archives
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Community <span className="text-violet-500">Feed.</span></h1>
            <p className="text-zinc-500 max-w-xl mx-auto">Explore the raw, unfiltered imagination of the Unbound community.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Search the archives..."
                className="bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-white">
                <TrendingUp className="w-4 h-4 mr-2" /> Trending
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-white">
                <Zap className="w-4 h-4 mr-2" /> Newest
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              <p className="text-zinc-500 animate-pulse">Decrypting public archives...</p>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => {
                const wordCount = story.content.split(/\s+/).length;
                const readTime = Math.ceil(wordCount / 200);
                const score = story.profiles?.sovereign_score || 500;
                
                return (
                  <Card key={story.id} className="bg-white/[0.02] border-white/5 hover:border-violet-500/30 transition-all group overflow-hidden flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center">
                            <User className="w-4 h-4 text-violet-400" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">Anonymous</span>
                            <span className="text-[8px] font-mono text-violet-500 uppercase">LVL {Math.floor(score / 100)}</span>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                          {format(new Date(story.created_at), 'MMM d')}
                        </div>
                      </div>
                      <CardTitle className="text-xl line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors">
                        {story.prompt}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-zinc-400 text-sm line-clamp-5 leading-relaxed mb-8 italic opacity-80">
                        "{story.content.substring(0, 250)}..."
                      </p>
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono">
                          <span className="flex items-center gap-1"><Type className="w-3 h-3" /> {wordCount}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}m</span>
                        </div>
                        <Link href={`/s/${story.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs gap-1 hover:text-violet-400 font-bold">
                            Read Story <ChevronRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <Globe className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-300">The gallery is quiet...</h3>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
                Be the first to publish a story from your library.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}