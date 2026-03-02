"use client";

import React from 'react';

const Partners = () => {
  return (
    <section className="py-16 border-y border-zinc-100 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-12">Trusted by Leading Developers</p>
        <div className="flex items-center justify-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="text-3xl font-black tracking-tighter text-[#002147] hover:text-[#C5A059] transition-colors cursor-default">EMAAR</span>
          <span className="text-3xl font-black tracking-tighter text-[#002147] hover:text-[#C5A059] transition-colors cursor-default">MIXTA</span>
          <span className="text-3xl font-black tracking-tighter text-[#002147] hover:text-[#C5A059] transition-colors cursor-default">LANDWEY</span>
          <span className="text-3xl font-black tracking-tighter text-[#002147] hover:text-[#C5A059] transition-colors cursor-default">PERIWINKLE</span>
          <span className="text-3xl font-black tracking-tighter text-[#002147] hover:text-[#C5A059] transition-colors cursor-default">UPDC</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;