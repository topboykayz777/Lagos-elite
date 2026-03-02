"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppCTA = () => {
  return (
    <a 
      href="https://wa.me/2348166073291" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-transform group"
    >
      <div className="flex flex-col items-end leading-none">
        <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Chat with us</span>
        <span className="text-sm font-bold">WhatsApp</span>
      </div>
      <MessageCircle className="w-6 h-6 fill-current" />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 -z-10" />
    </a>
  );
};

export default WhatsAppCTA;