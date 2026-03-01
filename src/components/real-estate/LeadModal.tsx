"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyLocation: string;
}

const LeadModal = ({ isOpen, onClose, propertyTitle, propertyLocation }: LeadModalProps) => {
  const [loading, setLoading] = useState(false);
  const WHATSAPP_NUMBER = "+2348000000000";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate saving to a database for the demo
    setTimeout(() => {
      const waLink = getWhatsAppLink(
        WHATSAPP_NUMBER, 
        `Hi, I'm interested in "${propertyTitle}" in ${propertyLocation}. My name is ${new FormData(e.target as HTMLFormElement).get('name')}.`
      );
      window.open(waLink, '_blank');
      setLoading(false);
      onClose();
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-none border-t-4 border-t-[#C5A059] p-0 overflow-hidden">
        <div className="p-8">
          <DialogHeader className="text-left mb-6">
            <div className="w-12 h-12 bg-[#002147]/5 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-[#C5A059]" />
            </div>
            <DialogTitle className="text-2xl font-bold text-[#002147]">Secure Your Viewing</DialogTitle>
            <DialogDescription className="text-zinc-500 font-medium">
              Enter your details to connect with our elite consultancy team via WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required className="rounded-none border-zinc-200 focus:border-[#C5A059] h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+234..." required className="rounded-none border-zinc-200 focus:border-[#C5A059] h-12" />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-none font-bold text-xs tracking-widest uppercase transition-all gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4 fill-current" />}
              Start WhatsApp Chat
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
              <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
              Your data is encrypted and secure
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;