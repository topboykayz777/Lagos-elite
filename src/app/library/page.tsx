"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trash2, 
  Calendar, 
  ChevronRight, 
  Search,
  Filter,
  Loader2,
  Download,
  Type,
  Clock,
  Share2
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import ShareDialog from '@/components/generator/ShareDialog';

export default function LibraryPage() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to load library");
    } else {
      setStories(data || []);
    }
    setLoading(false);
  };

  const deleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Could not delete story");
    } else {
      setStories(stories.filter(s => s.id !== id));
      toast.success("Story removed from library");
    }
  };

  const downloadAll = () => {
    if (stories.length === 0) return;
    const content = stories.map(s => `PROMPT: ${s.prompt}\nDATE: ${s.created_at}\n\n${s.content}\n\n${"=".repeat(50)}\n\n`).join("");
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `unbound-library-export-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Library exported successfully");
  };

  const filteredStories = stories.filter(s => 
    s.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tighter">Your <span className="text-violet-500">Library</span></h1>
              <p className="text-zinc-500 mt-1">Manage your unbound creations.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Search stories..."
                  className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                onClick={downloadAll}
                className="border-white/10 bg-white/5 gap-2"
                disabled={stories.length === 0}
              >
                <Download className="w-4 h-4" /> Export All
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
              <p className="text-zinc-500 animate-pulse">Accessing the archives...</p>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => {
                const wordCount = story.content.split(/\s+/).length;
                const readTime = Math.ceil(wordCount / 200);
                
                return (
                  <Card key={story.id} className="bg-white/[0.02] border-white/5 hover:border-violet-500/30 transition-all group overflow-hidden flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(story.created_at), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ShareDialog 
                            storyId={story.id} 
                            trigger={
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-violet-400">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            }
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                            onClick={() => deleteStory(story.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg line-clamp-2 leading-tight group-hover:text-violet-400 transition-colors">
                        {story.prompt}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-zinc-400 text-sm line-clamp-4 leading-relaxed mb-6 italic">
                        "{story.content.substring(0, 200)}..."
                      </p>
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[10px] text-zinc-600 font-mono">
                          <span className="flex items-center gap-1"><Type className="w-3 h-3" /> {wordCount}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}m</span>
                        </div>
                        <Link href={`/library/${story.id}`}>
                          <Button variant="ghost" size="sm" className="text-xs gap-1 hover:text-violet-400">
                            Read Full <ChevronRight className="w-3 h-3" />
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
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-300">No stories found</h3>
              <p className="text-zinc-500 mt-2 max-w-xs mx-auto">
                Your library is empty. Start generating to build your collection.
              </p>
              <Link href="/">
                <Button className="mt-6 bg-violet-600 hover:bg-violet-700">
                  Create Story
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}