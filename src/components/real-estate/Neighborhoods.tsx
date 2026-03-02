"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';

const AREAS = [
  { name: "Ikoyi", count: 42, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1974&auto=format&fit=crop", desc: "The pinnacle of luxury and exclusivity." },
  { name: "Lekki Phase 1", count: 85, image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop", desc: "A vibrant hub of modern life." },
  { name: "Victoria Island", count: 31, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop", desc: "The financial heart of Nigeria." },
  { name: "Ibeju-Lekki", count: 120, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", desc: "The new industrial frontier." },
  { name: "Ikeja GRA", count: 28, image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop", desc: "Serene, colonial-style luxury." },
  { name: "Magodo Phase 2", count: 15, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", desc: "Secure gated community." }
];

const Neighborhoods = () => {
  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mb-16 space-y-4">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Prime Locations</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002147] tracking-tighter">Explore Neighborhoods.</h2>
          <p className="text-zinc-500 text-sm md:text-base font-medium">Discover the unique character of Lagos' most sought-after districts.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {AREAS.map((area) => (
            <Link key={area.name} href="/properties" className="group block bg-white border border-zinc-100 overflow-hidden hover:shadow-xl transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={area.image} 
                  alt={area.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[8px] font-black uppercase tracking-widest text-[#002147]">
                    {area.count} Properties
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#002147] group-hover:text-[#C5A059] transition-colors">{area.name}</h3>
                  <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{area.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;