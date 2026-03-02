"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Building2, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LeafIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className} 
    style={style}
  >
    <path d="M21,12.47c0-4.65-3.77-8.42-8.42-8.42c-2.33,0-4.43,0.94-5.95,2.47C5.1,8,4.16,10.1,4.16,12.43c0,4.65,3.77,8.42,8.42,8.42 c2.33,0,4.43-0.94,5.95-2.47C20.06,16.9,21,14.8,21,12.47z M12.58,18.85c-3.54,0-6.42-2.88-6.42-6.42c0-1.77,0.72-3.37,1.88-4.53 c1.16-1.16,2.76-1.88,4.53-1.88c3.54,0,6.42,2.88,6.42,6.42c0,1.77-0.72,3.37-1.88,4.53C15.95,18.13,14.35,18.85,12.58,18.85z" opacity="0.3"/>
    <path d="M17.5,12c0-3.04-2.46-5.5-5.5-5.5S6.5,8.96,6.5,12s2.46,5.5,5.5,5.5S17.5,15.04,17.5,12z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5 s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" />
  </svg>
);

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [type, setType] = useState("all");

  const handleDiscover = () => {
    const params = new URLSearchParams();
    if (location) params.set('q', location);
    if (type !== 'all') params.set('type', type);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-[#002147]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-in zoom-in duration-[10000ms]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/60 to-transparent" />
      </div>

      {/* Realistic Falling Leaves */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <LeafIcon 
            key={i}
            className="absolute animate-leaf text-[#C5A059]"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${12 + Math.random() * 15}s`,
              animationDelay: `${-Math.random() * 20}s`,
              width: `${15 + Math.random() * 15}px`,
              height: `${15 + Math.random() * 15}px`,
              opacity: 0.1 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-20">
        <div className="max-w-3xl space-y-8 lg:text-left text-center mx-auto lg:mx-0">
          <div className="space-y-6 flex flex-col lg:items-start items-center">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
              <span className="text-[#C5A059] text-[8px] font-black tracking-[0.4em] uppercase">
                The Sovereign Standard
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[0.95] tracking-tighter">
              Sovereign <br />
              <span className="text-[#C5A059] font-normal italic">Real Estate.</span>
            </h1>
            
            <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-medium opacity-90">
              Exclusive access to the most prestigious properties in Nigeria. From Banana Island penthouses to Lekki waterfront villas.
            </p>
          </div>

          <div className="bg-white p-1 shadow-2xl flex flex-col md:flex-row items-center w-full max-w-2xl animate-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="flex-1 w-full flex items-center gap-4 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-100">
              <MapPin className="text-[#C5A059] w-4 h-4 shrink-0" />
              <div className="flex flex-col w-full text-left">
                <span className="text-[7px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-0.5">Location</span>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ikoyi, Lekki, VI..." 
                  className="text-[10px] font-black text-[#002147] focus:outline-none w-full bg-transparent placeholder:text-zinc-300 uppercase tracking-widest"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-4 px-4 py-3 border-b md:border-b-0 md:border-r border-zinc-100">
              <Building2 className="text-[#C5A059] w-4 h-4 shrink-0" />
              <div className="flex flex-col w-full text-left">
                <span className="text-[7px] uppercase font-black text-zinc-400 tracking-[0.2em] mb-0.5">Type</span>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="text-[10px] font-black text-[#002147] focus:outline-none w-full bg-transparent appearance-none cursor-pointer uppercase tracking-widest"
                >
                  <option value="all">All Types</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleDiscover}
              className="w-full md:w-32 bg-[#002147] hover:bg-[#003366] text-white h-12 md:h-14 rounded-none font-black text-[9px] tracking-[0.3em] flex items-center justify-center gap-2 transition-all group"
            >
              DISCOVER <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="flex items-center lg:justify-start justify-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">₦10B+</span>
              <span className="text-[7px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Sales Volume</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">150+</span>
              <span className="text-[7px] text-zinc-500 uppercase font-black tracking-[0.3em] mt-1">Elite Listings</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;