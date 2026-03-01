"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Wand2, 
  Settings2, 
  History, 
  Trash2,
  Sparkles,
  Copy,
  Check,
  Zap,
  Flame,
  Ghost,
  Skull
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const PRESETS = [
  { name: "Dark Fantasy", icon: Skull, prompt: "Write a gritty, dark fantasy scene involving " },
  { name: "Cyberpunk", icon: Zap, prompt: "Write a neon-soaked cyberpunk story about " },
  { name: "Horror", icon: Ghost, prompt: "Write a visceral, psychological horror story about " },
  { name: "Erotica", icon: Flame, prompt: "Write an intense, descriptive romantic scene between " },
];

const GeneratorForm = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativity, setCreativity] = useState([0.8]);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const { data } = await supabase.auth.signInAnonymously();
        if (data.user) setUser(data.user);
      } else {
        setUser(session.user);
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchHistory();
      checkPremiumStatus();
    }
  }, [user]);

  const checkPremiumStatus = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();
    
    setIsPremium(data?.subscription_status === 'active');
  };

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setHistory(data);
  };

  const checkRateLimit = async () => {
    if (isPremium) return true;

    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('stories')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today);
    
    return (count || 0) < 5;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    const canGenerate = await checkRateLimit();
    if (!canGenerate) {
      toast.error("Daily limit reached (5/5). Upgrade to Premium for unlimited access.");
      return;
    }
    
    setIsGenerating(true);
    setOutput("");
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, creativity: creativity[0] })
      });
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setOutput(data.text);
      
      if (user) {
        await supabase.from('stories').insert({
          user_id: user.id,
          prompt: prompt,
          content: data.text
        });
        fetchHistory();
      }
      
      toast.success("Story generated!");
    } catch (error: any) {
      toast.error(error.message || "Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyPreset = (presetPrompt: string) => {
    setPrompt(presetPrompt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-400">Style Presets</Label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.prompt)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-violet-400"
                >
                  <p.icon className="w-3 h-3" />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-400">Story Prompt</Label>
            <Textarea 
              placeholder="Describe your scene, characters, or plot twist..."
              className="min-h-[180px] bg-black/40 border-white/10 focus:border-violet-500/50 transition-all resize-none text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> Temperature
              </Label>
              <span className="text-xs font-mono text-violet-400">{creativity[0]}</span>
            </div>
            <Slider 
              value={creativity} 
              onValueChange={setCreativity} 
              max={1.5} 
              step={0.1} 
              className="py-4"
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 rounded-xl font-bold text-lg shadow-lg shadow-violet-600/20"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" /> Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" /> Generate Story
              </span>
            )}
          </Button>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>Recent History</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {history.map((item) => (
              <button 
                key={item.id}
                onClick={() => { setPrompt(item.prompt); setOutput(item.content); }}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs truncate border border-white/5"
              >
                {item.prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="h-full min-h-[600px] rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-zinc-400">Output</span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="text-xs text-zinc-500">Unbound-v3-Large</span>
            </div>
            <div className="flex items-center gap-2">
              {output && (
                <Button variant="ghost" size="icon" onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  toast.success("Copied!");
                  setTimeout(() => setCopied(false), 2000);
                }} className="h-8 w-8 text-zinc-400 hover:text-white">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setOutput("")} className="h-8 w-8 text-zinc-400 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-8 font-serif text-lg leading-relaxed text-zinc-300 overflow-y-auto whitespace-pre-wrap">
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-white/5 rounded w-3/4" />
                <div className="h-4 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/5 rounded w-5/6" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ) : output ? (
              <div className="prose prose-invert max-w-none">
                {output}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
                <Sparkles className="w-12 h-12 text-violet-500" />
                <p className="text-zinc-500 italic max-w-xs">Your generated story will appear here. No filters, no limits.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorForm;