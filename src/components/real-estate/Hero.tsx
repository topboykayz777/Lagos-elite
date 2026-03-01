"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Building2, DollarSign } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-pulse-slow"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 via-[#002147]/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#C5A059] text-xs font-bold tracking-widest uppercase">
              Premium Real Estate in Lagos
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Find Your Dream <br />
              <span className="text-[#C5A059]">Luxury Home</span> in Nigeria.
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl max-w-xl leading-relaxed">
              From Ikoyi penthouses to Lekki waterfront villas, we provide exclusive access to the most prestigious properties in Lagos.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white p-2 md:p-4 rounded-none shadow-2xl flex flex-col md:flex-row items-center gap-4 max-w-4xl">
            <div className="flex-1 w-full flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-zinc-100 py-2">
              <MapPin className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Location</span>
                <input 
                  type="text" 
                  placeholder="Ikoyi, Lekki, Victoria Island..." 
                  className="text-sm font-semibold text-[#002147] focus:outline-none w-full bg-transparent"
                />
              </div>
            </div>
            
            <div className="flex-1 w-full flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-zinc-100 py-2">
              <Building2 className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Property Type</span>
                <select className="text-sm font-semibold text-[#002147] focus:outline-none w-full bg-transparent appearance-none">
                  <option>Apartment</option>
                  <option>Duplex</option>
                  <option>Penthouse</option>
                  <option>Land</option>
                </select>
              </div>
            </div>

            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
              <DollarSign className="text-[#C5A059] w-5 h-5 shrink-0" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Price Range</span>
                <select className="text-sm font-semibold text-[#002147] focus:outline-none w-full bg-transparent appearance-none">
                  <option>₦50M - ₦150M</option>
                  <option>₦150M - ₦500M</option>
                  <option>₦500M+</option>
                </select>
              </div>
            </div>

            <Button className="w-full md:w-auto bg-[#002147] hover:bg-[#003366] text-white h-14 px-8 rounded-none font-bold flex items-center gap-2">
              <Search className="w-5 h-5" /> SEARCH
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">500+</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Properties Sold</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">120+</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Luxury Listings</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">15+</span>
              <span className="text-xs text-zinc-400 uppercase tracking-wider">Years Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;