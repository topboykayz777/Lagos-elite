"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Chief Emeka O.",
    role: "Property Investor",
    content: "Lagos Elite Properties helped me secure a prime acre in Epe. Their transparency regarding land titles is unmatched in this city.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Mrs. Adebayo",
    role: "Homeowner in Ikoyi",
    content: "Finding a penthouse that actually matches the pictures is hard in Lagos. They delivered exactly what was promised. Highly professional.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Dr. Segun Alabi",
    role: "Expat Client",
    content: "The seamless process of acquiring my Victoria Island office space while I was still in London was impressive. Best agency in Nigeria.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#002147] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 opacity-5">
        <Quote size={400} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Client Stories</h4>
          <h2 className="text-4xl md:text-5xl font-bold">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:border-[#C5A059] transition-all duration-500">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <p className="text-zinc-300 italic mb-8 leading-relaxed">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C5A059]" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-[#C5A059] uppercase font-bold tracking-wider">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;