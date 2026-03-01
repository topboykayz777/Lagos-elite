"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, GripVertical, ListOrdered } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryBeatsProps {
  beats: string[];
  onChange: (beats: string[]) => void;
}

const StoryBeats = ({ beats, onChange }: StoryBeatsProps) => {
  const [newBeat, setNewBeat] = useState("");

  const addBeat = () => {
    if (newBeat.trim()) {
      onChange([...beats, newBeat.trim()]);
      setNewBeat("");
    }
  };

  const removeBeat = (index: number) => {
    onChange(beats.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <Label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
        <ListOrdered className="w-3 h-3 text-violet-500" /> Story Beats (Plot Points)
      </Label>
      
      <div className="space-y-2">
        {beats.map((beat, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/5 group animate-in slide-in-from-left-2"
          >
            <GripVertical className="w-3 h-3 text-zinc-700" />
            <span className="text-xs text-zinc-400 flex-1 truncate">{beat}</span>
            <button 
              onClick={() => removeBeat(index)}
              className="p-1 rounded-md hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input 
          placeholder="Add a plot point..." 
          className="bg-black/40 border-white/10 h-9 text-xs"
          value={newBeat}
          onChange={(e) => setNewBeat(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addBeat()}
        />
        <Button 
          variant="outline" 
          size="icon" 
          onClick={addBeat}
          className="h-9 w-9 border-white/10 bg-white/5 hover:bg-violet-500/20 hover:text-violet-400"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StoryBeats;