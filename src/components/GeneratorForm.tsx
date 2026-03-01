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
  Sparkles,
  Zap,
  AlertCircle,
  Cpu,
  Bug,
  AlignLeft,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import StylePresets from './generator/StylePresets';
import OutputDisplay from './generator/OutputDisplay';

const GeneratorForm = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativity, setCreativity] = useState([0.8]);
  const [length, setLength] = useState([500]);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [provider, setProvider] = useState<"openrouter" | "gemini">("openrouter");
  const [activeModel, setActiveModel] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) {
            setAuthError("Database history disabled: " + error.message);
          } else {
            setUser(data.user);
          }
        } else {
          setUser(session.user);
        }
      } catch (err: any) {
        setAuthError("Database connection issue.");
      }
    };
    initAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (data) setHistory(data);
    } catch (e) {
      console.error("Could not fetch history");
    }
  };

  const handleGenerate = async (customPrompt?: string, forceProvider?: "openrouter" | "gemini") => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) {
      toast.error("Please enter a prompt first.");
      return;
    }

    const currentProvider = forceProvider || provider;
    const lengthInstruction = `\n\nTarget length: approximately ${length[0]} words.`;
    const promptWithLength = finalPrompt + lengthInstruction;

    const endpoint = currentProvider === "openrouter" ? "/api/generate" : "/api/generate-gemini";
    setIsGenerating(true);
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptWithLength, creativity: creativity[0] })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // If OpenRouter fails, try to automatically fallback to Gemini
        if (currentProvider === "openrouter") {
          console.warn("OpenRouter failed, attempting fallback to Gemini...");
          toast.info("OpenRouter is busy. Switching to Gemini fallback...");
          return handleGenerate(customPrompt, "gemini");
        }
        throw new Error(data.error || "Generation failed");
      }
      
      if (!data.text) {
        throw new Error("The AI returned an empty response.");
      }

      setOutput(data.text);
      setActiveModel(data.modelUsed || (currentProvider === 'gemini' ? 'gemini-1.5-flash' : ''));
      toast.success(`Story generated via ${currentProvider}!`);

      if (user) {
        supabase.from('stories').insert({
          user_id: user.id,
          prompt: finalPrompt.substring(0, 100),
          content: data.text
        }).then(({ error }) => {
          if (!error) fetchHistory();
        });
      }
      
    } catch (error: any) {
      console.error("[Generator] Error:", error.message);
      toast.error(error.message || "Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    const refinementPrompt = `Original Story: ${output}\n\nInstruction: ${instruction}\n\nRewrite or continue the story based on the instruction above.`;
    handleGenerate(refinementPrompt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        {/* Debug Info */}
        <div className="px-3 py-2 rounded-xl bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-500 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Bug className="w-3 h-3" /> 
            <span>ACTIVE PROVIDER: <span className="text-violet-400 font-bold uppercase">{provider}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3" /> 
            <span>MODEL: <span className="text-zinc-300 truncate max-w-[180px]">{activeModel || 'Auto-Selecting...'}</span></span>
          </div>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] flex items-center gap-2">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <p>Note: {authError}</p>
          </div>
        )}

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6 shadow-xl">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Select AI Engine
            </Label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-black/40 rounded-xl border border-white/5">
              <button
                onClick={() => setProvider("openrouter")}
                className={cn(
                  "py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  provider === "openrouter" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                OpenRouter
              </button>
              <button
                onClick={() => setProvider("gemini")}
                className={cn(
                  "py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  provider === "gemini" ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Gemini
              </button>
            </div>
            <p className="text-[9px] text-zinc-600 italic px-1">
              * OpenRouter is uncensored but can be unstable. Gemini is stable but has filters.
            </p>
          </div>

          <StylePresets onSelect={(p) => setPrompt(p)} />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-400">Story Prompt</Label>
            <Textarea 
              placeholder="Describe your scene..."
              className="min-h-[180px] bg-black/40 border-white/10 focus:border-violet-500/50 transition-all resize-none text-base placeholder:text-zinc-700"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-6">
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
                className="py-2"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" /> Target Length
                </Label>
                <span className="text-xs font-mono text-violet-400">{length[0]} words</span>
              </div>
              <Slider 
                value={length} 
                onValueChange={setLength} 
                min={100}
                max={2000} 
                step={100} 
                className="py-2"
              />
            </div>
          </div>

          <Button 
            onClick={() => handleGenerate()}
            disabled={isGenerating}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white h-14 rounded-xl font-black text-lg shadow-lg shadow-violet-600/40 transition-all active:scale-95"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 animate-spin" /> Generating...
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
              <span className="font-bold uppercase text-[10px] tracking-widest">Recent History</span>
            </div>
          </div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {history.length > 0 ? history.map((item) => (
              <button 
                key={item.id}
                onClick={() => { setPrompt(item.prompt); setOutput(item.content); }}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs truncate border border-white/5 group"
              >
                <span className="text-zinc-500 group-hover:text-violet-400 transition-colors">{item.prompt}</span>
              </button>
            )) : (
              <p className="text-[10px] text-zinc-600 text-center py-4">No history yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <OutputDisplay 
          output={output}
          isGenerating={isGenerating}
          provider={provider}
          onClear={() => setOutput("")}
          onRefine={handleRefine}
        />
      </div>
    </div>
  );
};

export default GeneratorForm;