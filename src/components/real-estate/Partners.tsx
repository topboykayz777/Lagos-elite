"use client";

import React from 'react';

const Partners = () => {
  return (
    <section className="py-12 border-y border-zinc-100 bg-white">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-8">Trusted by Leading Developers</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {/* Using text-based logos for demo purposes */}
          <span className="text-2xl font-black tracking-tighter text-[#002147]">EMAAR</span>
          <span className="text-2xl font-black tracking-tighter text-[#002147]">MIXTA</span>
          <span className="text-2xl font-black tracking-tighter text-[#002147]">LANDWEY</span>
          <span className="text-2xl font-black tracking-tighter text-[#002147]">PERIWINKLE</span>
          <span className="text-2xl font-black tracking-tighter text-[#002147]">UPDC</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;