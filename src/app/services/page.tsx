"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import Services from "@/components/real-estate/Services";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Globe, Key } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tight">Concierge <span className="text-[#C5A059]">Solutions.</span></h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">Tailored real estate advisory for the modern sovereign investor.</p>
          </div>
        </div>

        <Services />

        <section className="py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-[#002147]">Why Choose Elite?</h2>
                  <p className="text-zinc-500 leading-relaxed">Our services go beyond the transaction. We provide a lifetime of support for your real estate assets.</p>
                </div>
                
                <div className="grid gap-8">
                  {[
                    { title: "Legal Due Diligence", desc: "Every property is verified at the Land Registry before listing.", icon: ShieldCheck },
                    { title: "Market Intelligence", desc: "Access to off-market data and future development plans.", icon: TrendingUp },
                    { title: "Global Reach", desc: "Connecting Nigerian assets with international capital.", icon: Globe },
                    { title: "Seamless Closing", desc: "We handle all documentation from C of O to Governor's Consent.", icon: Key },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-6">
                      <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-[#C5A059]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-[#002147]">{item.title}</h4>
                        <p className="text-sm text-zinc-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                  alt="Commercial" 
                  className="w-full h-[600px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-10 -left-10 bg-[#C5A059] p-10 text-white hidden md:block">
                  <p className="text-4xl font-bold">15+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest">Years of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#002147] text-white text-center">
          <div className="container mx-auto px-6 space-y-8">
            <h2 className="text-4xl font-bold">Ready to Build Your Portfolio?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Our senior partners are available for private consultations regarding high-value acquisitions.</p>
            <Link href="/contact">
              <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white h-16 px-12 rounded-none font-black text-xs tracking-widest">
                BOOK A PRIVATE ADVISORY
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}