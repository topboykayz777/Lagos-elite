"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AREAS = [
  { 
    name: "Ikoyi", 
    count: 42, 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", 
    desc: "The pinnacle of luxury and exclusivity." 
  },
  { 
    name: "Lekki Phase 1", 
    count: 85, 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", 
    desc: "A vibrant hub of modern life." 
  },
  { 
    name: "Victoria Island", 
    count: 31, 
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", 
    desc: "The financial heart of Nigeria." 
  },
  { 
    name: "Ibeju-Lekki", 
    count: 120, 
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop", 
    desc: "The new industrial frontier." 
  },
  { 
    name: "Ikeja GRA", 
    count: 28, 
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop", 
    desc: "Serene, colonial-style luxury." 
  },
  { 
    name: "Magodo Phase 2", 
    count: 15, 
    image: "https://images.unsplash.com/photo-1600607687940-467f5b637a53?q=80&w=2070&auto=format&fit=crop", 
    desc: "Secure gated community." 
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
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-32 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Prime Locations</h4>
            <h2 className="text-4xl md:text-6xl font-bold text-[#002147] tracking-tighter leading-none">
              Explore <br /><span className="text-[#C5A059]">Neighborhoods.</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base font-medium max-w-md">
              Discover the unique character and investment potential of Lagos' most sought-after districts.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              {AREAS.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "h-1 transition-all duration-500",
                    selectedIndex === index ? "w-8 bg-[#C5A059]" : "w-2 bg-zinc-200"
                  )}
                />
              ))}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-none border-zinc-200 hover:bg-[#002147] hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollNext}
              className="w-12 h-12 rounded-none border-zinc-200 hover:bg-[#002147] hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-8">
            {AREAS.map((area) => (
              <div key={area.name} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                <Link href="/properties" className="group block bg-white border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-700 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={area.image} 
                      alt={area.name} 
                      className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/60 to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[#002147] shadow-xl">
                        {area.count} Properties
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                        View Collection <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-[#002147] group-hover:text-[#C5A059] transition-colors tracking-tighter">
                        {area.name}
                      </h3>
                      <MapPin className="w-4 h-4 text-[#C5A059] opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                      {area.desc}
                    </p>
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