"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Globe, CheckCircle2, ArrowRight, ShieldCheck, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function RelocationConciergePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <section className="py-20 bg-[#002147] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl space-y-6">
              <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Service Detail</h4>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                Relocation <br /><span className="text-[#C5A059]">Concierge.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl">
                Seamless transition services for expatriates and returning Nigerians, covering every aspect of settling in.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
                    alt="Luxury Waterfront" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C5A059] -z-10 hidden md:block" />
              </div>

              <div className="order-1 lg:order-2 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#002147]">A Seamless Transition</h2>
                  <p className="text-zinc-500 leading-relaxed text-lg">
                    Moving to Lagos requires local expertise. Our concierge team handles everything from finding the perfect home to securing school placements and setting up essential utilities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "School Placement", desc: "Access to the best international schools.", icon: Users },
                    { title: "Security Advisory", desc: "Comprehensive safety and logistics planning.", icon: ShieldCheck },
                    { title: "Utility Setup", desc: "Seamless activation of power, water, and internet.", icon: MapPin },
                    { title: "Global Network", desc: "Supporting clients from London to New York.", icon: Globe },
                  ].map((item) => (
                    <div key={item.title} className="space-y-3">
                      <div className="w-10 h-10 bg-[#C5A059]/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#C5A059]" />
                      </div>
                      <h4 className="font-bold text-[#002147]">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Link href="/contact">
                    <Button className="bg-[#002147] hover:bg-[#003366] text-white h-16 px-12 rounded-none font-black text-xs tracking-widest">
                      START YOUR RELOCATION
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-zinc-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-[#002147]">Welcome Home</h2>
              <p className="text-zinc-500 leading-relaxed text-lg">
                Our goal is to make your move to Nigeria as stress-free as possible, allowing you to focus on your professional and personal goals from day one.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-8">
                {["Ikoyi", "Victoria Island", "Lekki Phase 1", "Banana Island"].map((area) => (
                  <div key={area} className="px-8 py-4 bg-white border border-zinc-100 font-bold text-[#002147] uppercase text-[10px] tracking-widest">
                    {area} Specialist
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}