"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle2, ArrowRight, ShieldCheck, Users, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function PropertySalesPage() {
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
                Elite <br /><span className="text-[#C5A059]">Property Sales.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl">
                Bespoke acquisition and disposal services for high-net-worth individuals seeking the most prestigious addresses in Nigeria.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#002147]">The Sovereign Approach to Sales</h2>
                  <p className="text-zinc-500 leading-relaxed text-lg">
                    Our sales division specializes in the acquisition and disposal of high-value residential and commercial assets. We provide exclusive access to off-market opportunities that never reach the public portals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Off-Market Access", desc: "Exclusive listings for our private network.", icon: ShieldCheck },
                    { title: "Vetted Buyers", desc: "Only qualified high-net-worth individuals.", icon: Users },
                    { title: "Legal Verification", desc: "Rigorous 50-point title check.", icon: Briefcase },
                    { title: "Price Negotiation", desc: "Expert representation for optimal value.", icon: Building2 },
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
                      INQUIRE ABOUT SALES
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                    alt="Luxury Property" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C5A059] -z-10 hidden md:block" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-zinc-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-[#002147]">Why Choose Lagos Elite?</h2>
              <p className="text-zinc-500 leading-relaxed text-lg">
                We don't just sell properties; we curate lifestyles. Every listing in our portfolio undergoes a rigorous verification process to ensure your investment is secure, profitable, and prestigious.
              </p>
              <div className="flex flex-wrap justify-center gap-12 pt-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#C5A059]">₦10B+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sales Volume</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#C5A059]">1,200+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Elite Clients</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#C5A059]">50+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Expert Advisors</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}