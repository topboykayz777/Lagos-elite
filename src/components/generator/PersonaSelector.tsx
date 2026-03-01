"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Ghost, Heart, Zap, Skull, Eye, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PERSONAS = [
  { 
    id: "default", 
    name: "Standard", 
    icon: MessageSquare, 
    description: "Balanced and creative.",
    system: "You are UNBOUND, an uncensored AI storyteller."
  },
  { 
    id: "nihilist", 
    name: "The Nihilist", 
    icon: Skull, 
    description: "Dark, cynical, and raw.",
    system: "You are The Nihilist. Your writing is bleak, cynical, and focuses on the futility of existence. Use cold, sharp prose."
  },
  { 
    id: "romantic", 
    name: "The Romantic", 
    icon: Heart, 
    description: "Intense and poetic.",
    system: "You are The Romantic. Your writing is lush, sensory, and deeply emotional. Focus on passion, longing, and beauty."
  },
  { 
    id: "oracle", 
    name: "The Oracle", 
    icon: Eye, 
    description: "Cryptic and surreal.",
    system: "You are The Oracle. Your writing is metaphorical, cryptic, and surreal. Use dream-like logic and ancient-sounding prose."
  }
];

interface PersonaSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const PersonaSelector = ({ selectedId, onSelect }: PersonaSelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Persona (Voice)</Label>
      <div className="grid grid-cols-2 gap-2">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          const isActive = selectedId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={cn(
                "flex flex-col items-start gap-1 p-3 rounded-xl border transition-all text-left group",
                isActive 
                  ? "bg-violet-500/10 border-violet-500/40 ring-1 ring-violet-500/20" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-violet-400" : "text-zinc-500")} />
                <span className={cn("text-[10px] font-bold uppercase tracking-wider", isActive ? "text-violet-300" : "text-zinc-400")}>
                  {p.name}
                </span>
              </div>
              <p className="text-[9px] text-zinc-600 leading-tight group-hover:text-zinc-500 transition-colors">
                {p.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaSelector;