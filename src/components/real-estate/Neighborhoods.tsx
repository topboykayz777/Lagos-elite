"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const AREAS = [
  { name: "Ikoyi", count: 42, image: "https://images.unsplash.com/photo-1590059414167-6ed97d33630e?q=80&w=1974&auto=format&fit=crop" },
  { name: "Lekki Phase 1", count: 85, image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop" },
  { name: "Victoria Island", count: 31, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop" },
  { name: "Epe / Ibeju-Lekki", count: 120, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop" }
];

const Neighborhoods = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Prime Locations</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002147]">Explore Neighborhoods</h2>
          <p className="text-zinc-500">Discover the unique character and investment potential of Lagos' most sought-after districts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AREAS.map((area) => (
            <Link key={area.name} href="/properties" className="group relative h-80 overflow-hidden">
              <img 
                src={area.image} 
                alt={area.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-1">{area.count} Properties</p>
                <h3 className="text-2xl font-bold text-white flex items-center justify-between">
                  {area.name}
                  <ChevronRight className="w-5 h-5 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;