"use client";

import React from 'react';

const PARTNERS = [
  { name: "EMAAR" },
  { name: "MIXTA AFRICA" },
  { name: "LANDWEY" },
  { name: "PERIWINKLE" },
  { name: "UPDC" }
];

const Partners = () => {
  return (
    <section className="py-16 border-y border-zinc-100 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-12">Trusted by Leading Developers</p>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-[#002147] opacity-40 hover:opacity-100 transition-opacity cursor-default">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;