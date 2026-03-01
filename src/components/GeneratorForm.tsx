"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Wand2, 
  Settings2, 
  History, 
  Zap,
  Cpu,
  AlignLeft,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Users,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import StylePresets from './generator/StylePresets';
import OutputDisplay from './generator/OutputDisplay';
import StoryBeats from './generator/StoryBeats';

const MODELS = [
  { id: "auto", name: "Auto-Rotate (Recommended)" },
  { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B" },
  { id: "google/gemma-2-9b-it:free", name: "Gemma 2 9B" },
  { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B" },
  { id: "gryphe/mythomist-7b:free", name: "MythoMist (Uncensored)" },
];

const GeneratorForm = () => {
  const [prompt, setPrompt] = useState("");
  const [characters, setCharacters] = useState("");
  const [setting, setSetting] = useState("");
  const [beats, setBeats] = useState<string[]>([]);
  const [isAdvanced, setIsAdvanced] = useState(false);
  
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativity, setCreativity] = useState([0.8]);
  const [length, setLength] = useState([500]);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [provider, setProvider] = useState<"openrouter" | "gemini">("openrouter");
  const [selectedModel, setSelectedModel] = useState("auto");
  const [activeModel, setActiveModel] = useState<string>("");
  const [lastError, setLastError] = useState<string | null>(null);

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
    if (user) fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setHistory(data);
  };

  const handleGenerate = async (customPrompt?: string, forceProvider?: "openrouter" | "gemini") => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setLastError(null);
    setIsGenerating(true);
    const currentProvider = forceProvider || provider;
    
    try {
      let fullPrompt = finalPrompt;
      if (isAdvanced) {
        if (characters) fullPrompt = `CHARACTERS: ${characters}\n\n${fullPrompt}`;
        if (setting) fullPrompt = `SETTING: ${setting}\n\n${fullPrompt}`;
        if (beats.length > 0) fullPrompt = `STORY BEATS:\n${beats.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n${fullPrompt}`;
      }
      fullPrompt += `\n\nTarget length: ${length[0]} words.`;

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          creativity: creativity[0],
          provider: currentProvider,
          specificModel: selectedModel === "auto" ? undefined : selectedModel
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate story.");
      }

      setOutput(result.text);
      setActiveModel(result.modelUsed);
      toast.success(`Success via ${result.provider}`);

      if (user) {
        supabase.from('stories').insert({
          user_id: user.id,
          prompt: finalPrompt.substring(0, 100),
          content: result.text
        }).then(() => fetchHistory());
      }
    } catch (error: any) {
      console.error("[Generator] Error:", error.message);
      setLastError(error.message);
      
      // Automatic fallback to Gemini if OpenRouter fails and we are in auto mode
      if (currentProvider === "openrouter" && !forceProvider && selectedModel === "auto") {
        toast.info("OpenRouter failed. Trying Gemini fallback...");
        return handleGenerate(customPrompt, "gemini");
      }
      
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-green-500" /> System Status
            </span>
            <span className="text-[10px] font-mono text-violet-400">v5.0-FIXED</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="px-2 py-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[8px] text-zinc-600 uppercase">Engine</span>
              <span className="text-[10px] font-bold text-zinc-300 uppercase">{provider}</span>
            </div>
            <div className="px-2 py-1.5 rounded-lg bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[8px] text-zinc-600 uppercase">Active Model</span>
              <span className="text-[10px] font-bold text-zinc-300 truncate">{activeModel || 'Idle'}</span>
            </div>
          </div>
        </div>

        {lastError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2 text-red-400 text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold uppercase text-[10px]">Generation Error</p>
                <p className="leading-relaxed opacity-80">{lastError}</p>
              </div>
            </div>
            <div className="text-[10px] text-zinc-500 italic">
              Tip: Check your API keys in the "Secrets" tab.
            </div>
          </div>
        )}

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> AI Engine
              </Label>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsAdvanced(!isAdvanced)}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest h-7 px-2 rounded-md transition-all",
                  isAdvanced ? "bg-violet-500/20 text-violet-400" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                {isAdvanced ? "Advanced Mode ON" : "Standard Mode"}
              </Button>
            </div>
            
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

            {provider === "openrouter" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-black/40 border-white/10 h-10 text-xs">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-zinc-300">
                    {MODELS.map(m => (
                      <SelectItem key={m.id} value={m.id} className="text-xs focus:bg-violet-600 focus:text-white">
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {isAdvanced && (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-500">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <Users className="w-3 h-3" /> Characters
                  </Label>
                  <Input 
                    placeholder="Jax, a cyborg..." 
                    className="bg-black/40 border-white/10 h-9 text-xs"
                    value={characters}
                    onChange={(e) => setCharacters(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> Setting
                  </Label>
                  <Input 
                    placeholder="Neo-Tokyo..." 
                    className="bg-black/40 border-white/10 h-9 text-xs"
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                  />
                </div>
              </div>
              <StoryBeats beats={beats} onChange={setBeats} />
            </div>
          )}

          <StylePresets onSelect={(p) => setPrompt(p)} />

          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-400">Prompt</Label>
            <Textarea 
              placeholder="Describe your scene..."
              className="min-h-[180px] bg-black/40 border-white/10 focus:border-violet-500/50 transition-all resize-none text-base"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Settings2 className="w-4 h-4" /> Creativity
                </Label>
                <span className="text-xs font-mono text-violet-400">{creativity[0]}</span>
              </div>
              <Slider value={creativity} onValueChange={setCreativity} max={1.5} step={0.1} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" /> Length
                </Label>
                <span className="text-xs font-mono text-violet-400">{length[0]} words</span>
              </div>
              <Slider value={length} onValueChange={setLength} min={100} max={2000} step={100} />
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
      </div>

      <div className="lg:col-span-8">
        <OutputDisplay 
          output={output}
          isGenerating={isGenerating}
          provider={provider}
          onClear={() => setOutput("")}
          onRefine={(instr) => handleGenerate(`Original: ${output}\n\nInstruction: ${instr}`)}
        />
      </div>
    </div>
  );
};

export default GeneratorForm;