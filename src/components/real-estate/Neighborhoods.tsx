"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

const AREAS = [
  { 
    name: "Ikoyi", 
    count: 42, 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", 
    desc: "The pinnacle of luxury and exclusivity in Nigeria.",
    stats: ["98% Security Rating", "High Rental Yield", "Diplomatic Zone"]
  },
  { 
    name: "Lekki Phase 1", 
    count: 85, 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", 
    desc: "A vibrant hub of modern life and coastal luxury.",
    stats: ["Waterfront Access", "Commercial Hub", "Modern Infrastructure"]
  },
  { 
    name: "Victoria Island", 
    count: 31, 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", 
    desc: "The financial heart and entertainment capital.",
    stats: ["Business District", "Nightlife Hub", "Premium Offices"]
  },
  { 
    name: "Ibeju-Lekki", 
    count: 120, 
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", 
    desc: "The new industrial frontier and future of Lagos.",
    stats: ["Free Trade Zone", "Rapid Appreciation", "New Airport Proximity"]
  },
  { 
    name: "Ikeja GRA", 
    count: 28, 
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", 
    desc: "Serene, colonial-style luxury on the mainland.",
    stats: ["Quiet Enclave", "Government Presence", "Lush Greenery"]
  },
  { 
    name: "Magodo Phase 2", 
    count: 15, 
    image: "https://images.unsplash.com/photo-1600607687940-467f5b637a53?q=80&w=2070&auto=format&fit=crop", 
    desc: "A secure, family-oriented gated community.",
    stats: ["Gated Security", "Family Friendly", "Mainland Access"]
  }
];

const Neighborhoods = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      slidesToScroll: 1,
      containScroll: 'trimSnaps'
    }, 
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Prime Locations</h4>
            <h2 className="text-4xl md:text-6xl font-bold text-[#002147] tracking-tighter leading-none">
              Explore <br /><span className="text-[#C5A059]">Neighborhoods.</span>
            </h2>
          </div>

          {/* Editorial Navigation */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              {AREAS.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "h-0.5 transition-all duration-700",
                    selectedIndex === index ? "w-12 bg-[#C5A059]" : "w-4 bg-zinc-100"
                  )}
                />
              ))}
            </div>
            <div className="flex items-center gap-8">
              <button 
                onClick={scrollPrev}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-[#002147] transition-colors"
              >
                PREV
              </button>
              <button 
                onClick={scrollNext}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-[#002147] transition-colors"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {AREAS.map((area) => (
              <div key={area.name} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <div className="group relative bg-white overflow-hidden h-[550px] cursor-pointer">
                  {/* Background Image */}
                  <img 
                    src={area.image} 
                    alt={area.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002147] via-[#002147]/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700" />

                  {/* Default Content (Visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 transition-transform duration-700 group-hover:-translate-y-32">
                    <div className="flex items-center gap-2 text-[#C5A059] mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Lagos, Nigeria</span>
                    </div>
                    <h3 className="text-4xl font-bold text-white tracking-tighter mb-2">
                      {area.name}
                    </h3>
                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
                      {area.count} Exclusive Listings
                    </p>
                  </div>

                  {/* Hover Content (Revealed) */}
                  <div className="absolute bottom-0 left-0 right-0 p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-[#002147] to-transparent pt-20">
                    <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                      {area.desc}
                    </p>
                    
                    <div className="space-y-3 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {area.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">{stat}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/properties" className="inline-flex items-center gap-3 text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em] group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                      Explore Collection <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neighborhoods;