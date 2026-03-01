"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Copy, 
  Check, 
  Trash2, 
  Download,
  Calendar,
  Clock,
  Type
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function StoryViewPage() {
  const { id } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast.error("Story not found");
      router.push('/library');
    } else {
      setStory(data);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (!story) return;
    navigator.clipboard.writeText(story.content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteStory = async () => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Story deleted");
      router.push('/library');
    }
  };

  const downloadAsTxt = () => {
    if (!story) return;
    const element = document.createElement("a");
    const file = new Blob([`PROMPT: ${story.prompt}\n\n${story.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `unbound-story-${story.id.substring(0, 8)}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/library')}
              className="text-zinc-400 hover:text-white gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Library
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={copyToClipboard} className="border-white/10 bg-white/5">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="icon" onClick={downloadAsTxt} className="border-white/10 bg-white/5">
                <Download className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={deleteStory} className="border-white/10 bg-white/5 hover:bg-red-500/10 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-4">
              <div className="flex flex-wrap gap-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(story.created_at), 'MMMM d, yyyy')}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {format(new Date(story.created_at), 'HH:mm')}
                </div>
                <div className="flex items-center gap-1.5">
                  <Type className="w-3 h-3" />
                  {story.content.split(' ').length} Words
                </div>
              </div>
              
              <h1 className="text-3xl font-black tracking-tighter leading-tight">
                {story.prompt}
              </h1>
            </div>

            <div className="p-10 rounded-3xl bg-white/[0.01] border border-white/5 font-serif text-xl leading-relaxed text-zinc-300 whitespace-pre-wrap selection:bg-violet-500/30">
              {story.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}