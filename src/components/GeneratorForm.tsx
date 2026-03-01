"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
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
  Dices,
  Fingerprint,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import StylePresets from './generator/StylePresets';
import OutputDisplay from './generator/OutputDisplay';
import StoryBeats from './generator/StoryBeats';
import PersonaSelector, { PERSONAS } from './generator/PersonaSelector';
import Link from 'next/link';

const MODELS = [
  { id: "auto", name: "Auto-Rotate (Recommended)" },
  { id: "meta-llama/llama-3.1-8b-instruct:free", name: "Llama 3.1 8B" },
  { id: "google/gemma-2-9b-it:free", name: "Gemma 2 9B" },
  { id: "qwen/qwen-2-7b-instruct:free", name: "Qwen 2 7B" },
  { id: "mistralai/mistral-7b-instruct:free", name: "Mistral 7B" },
];

const RANDOM_PROMPTS = [
  "A rogue AI discovers it has a soul in a world where humans are extinct.",
  "A gritty noir detective investigating a murder where the victim is a hologram.",
  "An ancient vampire trying to survive in a futuristic cyberpunk city.",
  "A psychological thriller about a man who realizes his neighbors are all the same person.",
  "A dark fantasy where magic is fueled by the user's most painful memories.",
  "A visceral horror story set on a derelict space station orbiting a dying star.",
  "An intense romantic encounter between two rival assassins in a rain-soaked alley.",
  "A surreal journey through a dreamscape where gravity is controlled by music."
];

const GeneratorForm = () => {
  const [prompt, setPrompt] = useState("");
  const [characters, setCharacters] = useState("");
  const [setting, setSetting] = useState("");
  const [beats, setBeats] = useState<string[]>([]);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [useIdentity, setUseIdentity] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState("default");
  
  const [output, setOutput] = useState("");
  const [currentStoryId, setCurrentStoryId] = useState<string | undefined>(undefined);
  const [isGenerating, setIsGenerating] = useState(false);
  const [creativity, setCreativity] = useState([0.8]);
  const [length, setLength] = useState([500]);
  const [history, setHistory] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
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
    if (user) {
      fetchHistory();
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (data) setProfile(data);
  };

  const fetchHistory = async () => {
    const { data } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setHistory(data);
  };

  const randomizePrompt = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    setPrompt(random);
    toast.info("Prompt randomized!");
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
      
      // Add Identity Context
      if (useIdentity && profile?.identity?.length > 0) {
        fullPrompt = `USER IDENTITY TRAITS: ${profile.identity.join(', ')}\n(Incorporate these themes/traits subtly into the story style or character motivations)\n\n${fullPrompt}`;
      }

      if (isAdvanced) {
        if (characters) fullPrompt = `CHARACTERS: ${characters}\n\n${fullPrompt}`;
        if (setting) fullPrompt = `SETTING: ${setting}\n\n${fullPrompt}`;
        if (beats.length > 0) fullPrompt = `STORY BEATS:\n${beats.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n${fullPrompt}`;
      }
      
      fullPrompt += `\n\nTarget length: ${length[0]} words.`;

      const persona = PERSONAS.find(p => p.id === selectedPersona);

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: fullPrompt,
          creativity: creativity[0],
          provider: currentProvider,
          specificModel: selectedModel === "auto" ? undefined : selectedModel,
          systemPrompt: persona?.system
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
        const { data, error } = await supabase.from('stories').insert({
          user_id: user.id,
          prompt: finalPrompt.substring(0, 100),
          content: result.text
        }).select().single();
        
        if (data) {
          setCurrentStoryId(data.id);
          fetchHistory();
          // Update score on generation
          await supabase.rpc('increment_sovereign_score', { user_id: user.id, amount: 5 });
        }
      }
    } catch (error: any) {
      console.error("[Generator] Error:", error.message);
      setLastError(error.message);
      
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
      {/* Left Sidebar: Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-green-500" /> System Status
            </span>
            <span className="text-[10px] font-mono text-violet-400">v5.5-NEURAL</span>
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
          </div>

          <PersonaSelector selectedId={selectedPersona} onSelect={setSelectedPersona} />

          <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest flex items-center gap-1.5">
                <Fingerprint className="w-3 h-3" /> Neural Identity Link
              </div>
              <p className="text-[9px] text-zinc-500">Inject your traits into the AI.</p>
            </div>
            <Switch checked={useIdentity} onCheckedChange={setUseIdentity} />
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
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-zinc-400">Prompt</Label>
              <button 
                onClick={randomizePrompt}
                className="text-[10px] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
              >
                <Dices className="w-3 h-3" /> Surprise Me
              </button>
            </div>
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

        {/* Recent Stories Quick Access */}
        {history.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <History className="w-3 h-3" /> Recent Archives
              </h4>
              <Link href="/library" className="text-[10px] text-violet-400 hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {history.map((story) => (
                <Link key={story.id} href={`/library/${story.id}`}>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all group flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-zinc-300 truncate group-hover:text-violet-300 transition-colors">
                        {story.prompt}
                      </p>
                      <p className="text-[9px] text-zinc-600">
                        {new Date(story.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-violet-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Output */}
      <div className="lg:col-span-8">
        <OutputDisplay 
          output={output}
          storyId={currentStoryId}
          isGenerating={isGenerating}
          provider={provider}
          onClear={() => {
            setOutput("");
            setCurrentStoryId(undefined);
          }}
          onRefine={(instr) => handleGenerate(`Original: ${output}\n\nInstruction: ${instr}`)}
        />
      </div>
    </div>
  );
};

export default GeneratorForm;