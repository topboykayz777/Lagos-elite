"use client";

import React from 'react';

const PARTNERS = [
  { name: "Emaar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Emaar_Properties_Logo.svg/2560px-Emaar_Properties_Logo.svg.png" },
  { name: "Mixta", logo: "https://mixtafrica.com/wp-content/uploads/2021/05/Mixta-Africa-Logo-1.png" },
  { name: "Landwey", logo: "https://landwey.ng/wp-content/uploads/2021/03/Landwey-Logo-1.png" },
  { name: "Periwinkle", logo: "https://periwinkleresidences.com/wp-content/uploads/2021/06/Periwinkle-Logo.png" },
  { name: "UPDC", logo: "https://updcplc.com/wp-content/uploads/2021/06/UPDC-Logo.png" }
];

const Partners = () => {
  return (
    <section className="py-12 border-y border-zinc-100 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-10">Trusted by Leading Developers</p>
        
        {/* Desktop Grid / Mobile Scroll */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="h-8 md:h-12 w-24 md:w-32 flex items-center justify-center">
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  // Fallback to text if logo fails
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-black tracking-tighter text-[#002147]">${partner.name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;