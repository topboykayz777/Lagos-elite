"use client";

import React from 'react';

const PARTNERS = [
  { name: "Emaar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emaar_Properties_Logo.svg/512px-Emaar_Properties_Logo.svg.png" },
  { name: "Mixta", logo: "https://mixtafrica.com/wp-content/uploads/2021/05/Mixta-Africa-Logo-1.png" },
  { name: "Landwey", logo: "https://landwey.ng/wp-content/uploads/2021/03/Landwey-Logo-1.png" },
  { name: "Periwinkle", logo: "https://periwinkleresidences.com/wp-content/uploads/2021/06/Periwinkle-Logo.png" },
  { name: "UPDC", logo: "https://updcplc.com/wp-content/uploads/2021/06/UPDC-Logo.png" }
];

const Partners = () => {
  return (
    <section className="py-16 border-y border-zinc-100 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-12">Trusted by Leading Developers</p>
        
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="h-10 md:h-14 w-28 md:w-40 flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;