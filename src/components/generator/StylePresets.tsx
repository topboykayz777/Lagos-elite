"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Skull, Zap, Ghost, Flame, Sword, Moon } from 'lucide-react';

const PRESETS = [
  { name: "Dark Fantasy", icon: Skull, prompt: "Write a gritty, dark fantasy scene involving " },
  { name: "Cyberpunk", icon: Zap, prompt: "Write a neon-soaked cyberpunk story about " },
  { name: "Horror", icon: Ghost, prompt: "Write a visceral, psychological horror story about " },
  { name: "Erotica", icon: Flame, prompt: "Write an intense, descriptive romantic scene between " },
  { name: "Epic Quest", icon: Sword, prompt: "Write an epic adventure beginning with " },
  { name: "Noir", icon: Moon, prompt: "Write a cynical, hard-boiled detective scene about " },
];

interface StylePresetsProps {
  onSelect: (prompt: string) => void;
}

const StylePresets = ({ onSelect }: StylePresetsProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-zinc-400">Style Presets</Label>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.prompt)}
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-violet-400 group"
          >
            <p.icon className="w-3 h-3 group-hover:scale-110 transition-transform" />
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;