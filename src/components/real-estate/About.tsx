"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  return (
    <section id="about" className="py-32 bg-zinc-50 relative">
      {/* Section Demarcation */}
      <div className="absolute left-10 top-32 hidden lg:flex flex-col items-center gap-6">
        <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] vertical-text">02 / PHILOSOPHY</span>
        <div className="w-px h-32 bg-zinc-200" />
      </div>

      <div className="container mx-auto px-6 lg:pl-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
            <div className="relative z-10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" 
                alt="Lagos Luxury Villa"
                className="w-full h-[650px] object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#C5A059] -z-0 hidden lg:block" />
            <div className="absolute top-1/2 -left-16 -translate-y-1/2 p-12 bg-[#002147] text-white hidden lg:block z-20 shadow-2xl">
              <p className="text-6xl font-bold mb-2 tracking-tighter">15+</p>
              <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[#C5A059]">Years of Trust</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="space-y-6">
              <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Our Philosophy</h4>
              <h2 className="text-5xl md:text-6xl font-bold text-[#002147] leading-[1.1] tracking-tighter">
                Redefining the <br />
                <span className="text-[#C5A059]">Luxury Standard.</span>
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                Lagos Elite Properties is more than an agency; we are a bespoke real estate consultancy. We specialize in high-yield investments and prestigious residential acquisitions across Nigeria's most coveted postcodes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {[
                "Off-Market Opportunities",
                "Asset Valuation Experts",
                "Legal Due Diligence",
                "Portfolio Management",
                "Expat Relocation Services",
                "Seamless Closings"
              ].map((item) => (
                <div key={item} className="flex items-center gap-4 group">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black text-[#002147] uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link href="/about">
                <Button className="bg-[#002147] hover:bg-[#003366] text-white h-16 px-12 rounded-none font-black text-xs tracking-[0.2em] flex items-center gap-3">
                  OUR STORY <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;