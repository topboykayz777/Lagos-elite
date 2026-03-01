"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Fingerprint, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IdentityTagsProps {
  tags: string[];
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  editable?: boolean;
}

const IdentityTags = ({ tags = [], onAdd, onRemove, editable = false }: IdentityTagsProps) => {
  const [isAdding, setIsAdding] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && onAdd) {
      onAdd(newTag.trim());
      setNewTag("");
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
          <Fingerprint className="w-3 h-3 text-violet-500" /> Digital Identity
        </h4>
        {editable && !isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Trait
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className={cn(
              "bg-violet-500/10 text-violet-300 border-violet-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider group",
              editable && "pr-1"
            )}
          >
            {tag}
            {editable && onRemove && (
              <button 
                onClick={() => onRemove(tag)}
                className="ml-1.5 p-0.5 rounded-full hover:bg-violet-500/20 text-violet-500/50 hover:text-violet-400 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
        
        {isAdding && (
          <form onSubmit={handleAdd} className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
            <input 
              autoFocus
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New trait..."
              className="bg-black/40 border border-violet-500/30 rounded-full px-3 py-1 text-[10px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-violet-500/50 w-24"
            />
          </form>
        )}

        {tags.length === 0 && !isAdding && (
          <p className="text-[10px] text-zinc-600 italic">No identity traits defined.</p>
        )}
      </div>
    </div>
  );
};

export default IdentityTags;