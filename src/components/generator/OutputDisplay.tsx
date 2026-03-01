"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  ChevronRight, 
  RotateCcw,
  Type,
  Clock,
  Maximize2,
  Minimize2,
  Share2,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface OutputDisplayProps {
  output: string;
  isGenerating: boolean;
  provider: string;
  onClear: () => void;
  onRefine: (instruction: string) => void;
}

const OutputDisplay = ({ output, isGenerating, provider, onClear, onRefine }: OutputDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [refineInput, setRefineInput] = useState("");
  const [isZenMode, setIsZenMode] = useState(false);

  const wordCount = output ? output.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineInput.trim()) return;
    onRefine(refineInput);
    setRefineInput("");
  };

  const toggleZenMode = () => {
    setIsZenMode(!isZenMode);
    if (!isZenMode) {
      toast.info("Zen Mode Active. Press ESC or the button to exit.");
    }
  };

  return (
    <div className={cn(
      "h-full min-h-[600px] rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col overflow-hidden transition-all duration-500",
      isZenMode ? "fixed inset-0 z-[100] bg-[#050505] rounded-none border-none" : "relative"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-zinc-400">Output</span>
          <div className="h-4 w-[1px] bg-white/10" />
          <span className="text-xs text-zinc-500">
            {provider === "openrouter" ? "Unbound-v3-Large" : "Gemini-1.5-Flash"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {output && (
            <>
              <div className="hidden sm:flex items-center gap-3 mr-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <Type className="w-3 h-3" /> {wordCount} words
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {readingTime} min read
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleZenMode} 
                className="h-8 w-8 text-zinc-400 hover:text-violet-400"
                title={isZenMode ? "Exit Zen Mode" : "Enter Zen Mode"}
              >
                {isZenMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8 text-zinc-400 hover:text-white">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </>
          )}
          {!isZenMode && (
            <Button variant="ghost" size="icon" onClick={onClear} className="h-8 w-8 text-zinc-400 hover:text-red-400">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className={cn(
        "flex-1 p-8 font-serif leading-relaxed text-zinc-300 overflow-y-auto whitespace-pre-wrap selection:bg-violet-500/30 custom-scrollbar transition-all duration-700",
        isZenMode ? "max-w-3xl mx-auto text-2xl py-20" : "text-lg"
      )}>
        {isGenerating ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-5/6" />
            <div className="h-4 bg-white/5 rounded w-2/3" />
            <div className="h-4 bg-white/5 rounded w-4/5" />
          </div>
        ) : output ? (
          <div className="prose prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700">
            {output}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-40">
            <Sparkles className="w-12 h-12 text-violet-500" />
            <p className="text-zinc-500 italic max-w-xs">Your generated story will appear here. No filters, no limits.</p>
          </div>
        )}
      </div>

      {/* Refinement Footer */}
      {output && !isGenerating && !isZenMode && (
        <div className="p-4 border-t border-white/5 bg-black/20">
          <form onSubmit={handleRefineSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <RotateCcw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text"
                placeholder="Refine this story (e.g., 'Make it darker', 'Add more dialogue')..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                value={refineInput}
                onChange={(e) => setRefineInput(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white px-4">
              Refine
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="border-white/10 hover:bg-white/5"
              onClick={() => onRefine("Continue the story from where it left off, maintaining the same tone and style.")}
            >
              Continue <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;