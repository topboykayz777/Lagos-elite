"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#C5A059]/[0.03]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" 
                alt="Lagos Luxury Villa"
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#C5A059] -z-0 hidden md:block" />
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Our Philosophy</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002147] tracking-tighter">
                Redefining the <br />
                <span className="text-[#C5A059]">Luxury Standard.</span>
              </h2>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                Lagos Elite Properties is a bespoke real estate consultancy specializing in high-yield investments and prestigious residential acquisitions across Nigeria's most coveted postcodes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Off-Market Opportunities",
                "Asset Valuation Experts",
                "Legal Due Diligence",
                "Portfolio Management"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 group">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button className="bg-[#002147] hover:bg-[#003366] text-white h-14 px-10 rounded-none font-black text-[10px] tracking-[0.2em] flex items-center gap-3">
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