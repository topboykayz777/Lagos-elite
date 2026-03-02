"use client";

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const AREAS = [
  { name: "Ikoyi", count: 42, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1974&auto=format&fit=crop", desc: "The pinnacle of luxury and exclusivity in Lagos." },
  { name: "Lekki Phase 1", count: 85, image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop", desc: "A vibrant hub of modern residential and commercial life." },
  { name: "Victoria Island", count: 31, image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1992&auto=format&fit=crop", desc: "The financial heart of Nigeria with premium waterfronts." },
  { name: "Ibeju-Lekki", count: 120, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", desc: "The new Lagos with massive industrial and residential growth." },
  { name: "Ikeja GRA", count: 28, image: "https://images.unsplash.com/photo-1590644365607-1c5a519a7a37?q=80&w=2070&auto=format&fit=crop", desc: "Serene, colonial-style luxury on the Lagos Mainland." },
  { name: "Magodo Phase 2", count: 15, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", desc: "A secure and prestigious gated community for families." }
];

const Neighborhoods = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Prime Locations</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002147]">Explore Neighborhoods</h2>
            <p className="text-zinc-500">Discover the unique character and investment potential of Lagos' most sought-after districts.</p>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {AREAS.map((area) => (
              <div key={area.name} className="embla__slide flex-[0_0_100%] min-w-0 px-2">
                <Link href="/properties" className="group relative block h-[600px] overflow-hidden">
                  <img 
                    src={area.image} 
                    alt={area.name} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002147] via-[#002147]/40 to-transparent opacity-90" />
                  
                  <div className="absolute inset-0 flex items-center p-12 md:p-24">
                    <div className="max-w-xl space-y-6">
                      <div className="space-y-2">
                        <p className="text-[#C5A059] text-sm font-bold uppercase tracking-[0.3em] animate-in fade-in slide-in-from-left-4 duration-700">
                          {area.count} Exclusive Properties
                        </p>
                        <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter animate-in fade-in slide-in-from-left-6 duration-1000">
                          {area.name}
                        </h3>
                      </div>
                      <p className="text-zinc-300 text-lg leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                        {area.desc}
                      </p>
                      <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
                        <span className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs group-hover:text-[#C5A059] transition-colors">
                          EXPLORE LISTINGS <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;