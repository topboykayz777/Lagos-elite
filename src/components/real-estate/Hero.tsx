"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const LeafAnimation = () => {
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<{ left: string; duration: string; delay: string; size: string; blur: string }[]>([]);

  useEffect(() => {
    const newLeaves = [...Array(15)].map(() => ({
      left: `${Math.random() * 60}%`, // Biased towards the left where the trees are
      duration: `${12 + Math.random() * 15}s`,
      delay: `${-Math.random() * 20}s`,
      size: `${10 + Math.random() * 15}px`,
      blur: Math.random() > 0.7 ? 'blur(1px)' : 'none'
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
          className="animate-leaf absolute text-[#C5A059]/20"
          style={{
            left: leaf.left,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
            fontSize: leaf.size,
            filter: leaf.blur,
            top: '-5%'
          }}
        >
          {i % 2 === 0 ? '🍃' : '🍂'}
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-[#002147]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-in zoom-in duration-[10000ms]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-[#002147] via-[#002147]/40 to-transparent" />
      </div>

      <LeafAnimation />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-20 flex justify-end">
        <div className="max-w-4xl space-y-10 text-right">
          <div className="space-y-6 flex flex-col items-end">
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] shadow-[0_0_8px_#C5A059]" />
              <span className="text-[#C5A059] text-[9px] font-black tracking-[0.4em] uppercase">
                The Sovereign Standard
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight-extra tracking-tighter">
              Sovereign <br />
              <span className="text-[#C5A059] font-normal italic">Real Estate.</span>
            </h1>
            
            <p className="text-zinc-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium opacity-90">
              Exclusive access to the most prestigious properties in Nigeria. From Banana Island penthouses to Lekki waterfront villas.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-1 shadow-2xl flex flex-col md:flex-row items-center max-w-3xl ml-auto animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-zinc-100">
              <MapPin className="text-[#C5A059] w-4 h-4 shrink-0" />
              <div className="flex flex-col w-full text-left">
                <span className="text-[8px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-0.5">Location</span>
                <input 
                  type="text" 
                  placeholder="Ikoyi, Lekki, VI..." 
                  className="text-xs font-black text-[#002147] focus:outline-none w-full bg-transparent placeholder:text-zinc-300 uppercase tracking-widest"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-4 px-6 py-4 border-b md:border-b-0 md:border-r border-zinc-100">
              <Building2 className="text-[#C5A059] w-4 h-4 shrink-0" />
              <div className="flex flex-col w-full text-left">
                <span className="text-[8px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-0.5">Property Type</span>
                <select className="text-xs font-black text-[#002147] focus:outline-none w-full bg-transparent appearance-none cursor-pointer uppercase tracking-widest">
                  <option>Penthouse</option>
                  <option>Waterfront Villa</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>
            </div>

            <Link href="/properties" className="w-full md:w-auto">
              <Button className="w-full md:w-44 bg-[#002147] hover:bg-[#003366] text-white h-14 md:h-16 rounded-none font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all group">
                DISCOVER <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-12 pt-6">
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-white tracking-tighter">₦10B+</span>
              <span className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Sales Volume</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-4xl font-bold text-white tracking-tighter">150+</span>
              <span className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Elite Listings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;