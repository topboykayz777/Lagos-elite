"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const LeafAnimation = () => {
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<{ left: string; duration: string; delay: string; size: string }[]>([]);

  useEffect(() => {
    const newLeaves = [...Array(12)].map(() => ({
      left: `${Math.random() * 100}%`,
      duration: `${15 + Math.random() * 25}s`,
      delay: `${-Math.random() * 20}s`,
      size: `${12 + Math.random() * 18}px`
    }));
    setLeaves(newLeaves);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {leaves.map((leaf, i) => (
        <div
          key={i}
          className="animate-leaf absolute text-[#C5A059]/15"
          style={{
            left: leaf.left,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
            fontSize: leaf.size
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
    <section className="relative h-screen min-h-[850px] flex items-center overflow-hidden bg-[#002147]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-in zoom-in duration-[10000ms]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-transparent to-transparent opacity-40" />
      </div>

      <LeafAnimation />

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-5xl space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] shadow-[0_0_10px_#C5A059]" />
              <span className="text-[#C5A059] text-[10px] font-black tracking-[0.4em] uppercase">
                The Sovereign Standard
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold text-white leading-[0.85] tracking-tighter">
              Sovereign <br />
              <span className="text-[#C5A059]">Real Estate.</span>
            </h1>
            
            <p className="text-zinc-300 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium opacity-90">
              Exclusive access to the most prestigious properties in Nigeria. From Banana Island penthouses to Lekki waterfront villas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center max-w-4xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="flex-1 w-full flex items-center gap-5 px-8 py-6 border-b md:border-b-0 md:border-r border-zinc-100">
              <MapPin className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-1">Location</span>
                <input 
                  type="text" 
                  placeholder="Ikoyi, Lekki, VI..." 
                  className="text-sm font-black text-[#002147] focus:outline-none w-full bg-transparent placeholder:text-zinc-300 uppercase tracking-widest"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-5 px-8 py-6 border-b md:border-b-0 md:border-r border-zinc-100">
              <Building2 className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[9px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-1">Property Type</span>
                <select className="text-sm font-black text-[#002147] focus:outline-none w-full bg-transparent appearance-none cursor-pointer uppercase tracking-widest">
                  <option>Penthouse</option>
                  <option>Waterfront Villa</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>
            </div>

            <Link href="/properties" className="w-full md:w-auto">
              <Button className="w-full md:w-64 bg-[#002147] hover:bg-[#003366] text-white h-20 rounded-none font-black text-[11px] tracking-[0.3em] flex items-center justify-center gap-4 transition-all group">
                DISCOVER <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-16 pt-10">
            <div className="flex flex-col">
              <span className="text-5xl font-bold text-white tracking-tighter">₦10B+</span>
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Sales Volume</span>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-5xl font-bold text-white tracking-tighter">150+</span>
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Elite Listings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white vertical-text">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
};

export default Hero;