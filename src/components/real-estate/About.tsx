"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-none overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop" 
                alt="Lagos Real Estate Office"
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#C5A059] -z-0 hidden md:block" />
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 p-8 bg-[#002147] text-white hidden lg:block z-20 shadow-xl">
              <p className="text-5xl font-bold mb-1">15+</p>
              <p className="text-xs uppercase tracking-widest font-bold text-[#C5A059]">Years of Excellence</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">About Our Agency</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-[#002147] leading-tight">
                The Most Trusted Name in <br />
                <span className="text-[#C5A059]">Lagos Real Estate.</span>
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed">
                Lagos Elite Properties is a premier real estate agency dedicated to providing exceptional service in the Nigerian luxury market. We specialize in high-end residential and commercial properties across Ikoyi, Victoria Island, and Lekki.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Exclusive Off-Market Listings",
                "Expert Market Valuation",
                "Legal & Documentation Support",
                "Property Management Services",
                "Investment Advisory",
                "Seamless Transaction Process"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                  <span className="text-sm font-bold text-[#002147]">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/about">
                <Button className="bg-[#002147] hover:bg-[#003366] text-white h-14 px-10 rounded-none font-bold">
                  LEARN MORE ABOUT US
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