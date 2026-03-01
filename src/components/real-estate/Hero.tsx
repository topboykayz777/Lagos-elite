"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

const LeafAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="animate-leaf absolute text-[#C5A059]/20"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${10 + Math.random() * 20}s`,
            animationDelay: `${-Math.random() * 20}s`,
            fontSize: `${10 + Math.random() * 20}px`
          }}
        >
          🍃
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/40 to-transparent" />
      </div>

      <LeafAnimation />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C5A059]/10 border border-[#C5A059]/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.3em] uppercase">
                The Pinnacle of Lagos Living
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
              Sovereign <br />
              <span className="text-[#C5A059]">Real Estate.</span>
            </h1>
            
            <p className="text-zinc-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              From Banana Island penthouses to Lekki waterfront villas, we provide exclusive access to the most prestigious properties in Nigeria.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 shadow-2xl flex flex-col md:flex-row items-center max-w-4xl">
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-zinc-100">
              <MapPin className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-widest">Location</span>
                <input 
                  type="text" 
                  placeholder="Ikoyi, Lekki, VI..." 
                  className="text-sm font-bold text-[#002147] focus:outline-none w-full bg-transparent placeholder:text-zinc-300"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-zinc-100">
              <Building2 className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-widest">Type</span>
                <select className="text-sm font-bold text-[#002147] focus:outline-none w-full bg-transparent appearance-none cursor-pointer">
                  <option>Penthouse</option>
                  <option>Waterfront Villa</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>
            </div>

            <Link href="/properties" className="w-full md:w-auto">
              <Button className="w-full md:w-56 bg-[#002147] hover:bg-[#003366] text-white h-16 rounded-none font-black text-xs tracking-[0.2em] flex items-center gap-3 transition-all">
                <Search className="w-4 h-4" /> DISCOVER
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-12 pt-6">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white tracking-tighter">₦10B+</span>
              <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-[0.2em]">Sales Volume</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-white tracking-tighter">120+</span>
              <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-[0.2em]">Elite Listings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;