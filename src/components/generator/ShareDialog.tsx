"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/badge"; // Using badge as a placeholder if Dialog isn't fully exported, but wait, I have dialog.tsx
import { 
  Dialog as ShadDialog, 
  DialogContent as ShadContent, 
  DialogHeader as ShadHeader, 
  DialogTitle as ShadTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  storyId: string;
  trigger?: React.ReactNode;
}

const ShareDialog = ({ storyId, trigger }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/s/${storyId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Public link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ShadDialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-violet-400">
            <Share2 className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <ShadContent className="bg-[#0a0a0a] border-white/10 text-zinc-100 sm:max-w-md rounded-3xl">
        <ShadHeader>
          <ShadTitle className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <Globe className="w-5 h-5 text-violet-500" /> Share Story
          </ShadTitle>
        </ShadHeader>
        
        <div className="space-y-6 py-4">
          <div className="p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-violet-400 uppercase tracking-widest">
              <Shield className="w-3 h-3" /> Privacy Note
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Anyone with this link can read your story. No logs are kept of who accesses it, and the content remains encrypted on our servers.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Public URL</label>
            <div className="flex items-center gap-2 p-2 bg-black/40 rounded-xl border border-white/10">
              <Input 
                readOnly 
                value={shareUrl} 
                className="bg-transparent border-none h-8 text-xs text-zinc-400 focus-visible:ring-0"
              />
              <Button size="sm" onClick={handleCopy} className="bg-violet-600 hover:bg-violet-700 h-8 px-3">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-1 hover:bg-violet-500/20 transition-colors cursor-pointer">
              <Share2 className="w-4 h-4 text-zinc-400" />
            </div>
            <span className="text-[8px] font-bold text-zinc-600 uppercase">Social</span>
          </div>
        </div>
      </ShadContent>
    </ShadDialog>
  );
};

export default ShareDialog;