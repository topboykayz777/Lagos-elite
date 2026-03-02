"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import Services from "@/components/real-estate/Services";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Globe, Key, Building2, Users, Briefcase, CheckCircle2 } from 'lucide-react';

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

        {/* Detailed Service Sections */}
        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 space-y-32">
            
            {/* Sales Detail */}
            <div id="sales" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center scroll-mt-32">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-[#C5A059]/10 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h2 className="text-4xl font-bold text-[#002147]">Elite Property Sales</h2>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  Our sales division specializes in the acquisition and disposal of high-value residential and commercial assets. We provide exclusive access to off-market opportunities that never reach the public portals.
                </p>
                <ul className="space-y-4">
                  {["Private Treaty Sales", "Auction Representation", "Portfolio Liquidation", "International Buyer Network"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                      <span className="font-bold text-[#002147] uppercase text-[10px] tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Sales" className="w-full h-[500px] object-cover shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#C5A059] -z-10" />
              </div>
            </div>

            {/* Management Detail */}
            <div id="management" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center scroll-mt-32">
              <div className="order-2 lg:order-1 relative">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Management" className="w-full h-[500px] object-cover shadow-2xl" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#002147] -z-10" />
              </div>
              <div className="order-1 lg:order-2 space-y-8">
                <div className="w-16 h-16 bg-[#C5A059]/10 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h2 className="text-4xl font-bold text-[#002147]">Asset Management</h2>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  We protect your wealth by ensuring your real estate assets are managed to the highest institutional standards. From tenant relations to structural maintenance, we handle it all.
                </p>
                <ul className="space-y-4">
                  {["24/7 Facility Support", "Financial Reporting", "Legal Compliance", "Tenant Retention Strategy"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                      <span className="font-bold text-[#002147] uppercase text-[10px] tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Investment Detail */}
            <div id="investment" className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center scroll-mt-32">
              <div className="space-y-8">
                <div className="w-16 h-16 bg-[#C5A059]/10 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h2 className="text-4xl font-bold text-[#002147]">Investment Advisory</h2>
                <p className="text-zinc-500 leading-relaxed text-lg">
                  Real estate in Lagos is a high-yield asset class when approached with data. Our advisors provide the intelligence needed to navigate land banking, development, and commercial leasing.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-50 border border-zinc-100">
                    <p className="text-2xl font-bold text-[#C5A059]">18%</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Avg. Annual Yield</p>
                  </div>
                  <div className="p-6 bg-zinc-50 border border-zinc-100">
                    <p className="text-2xl font-bold text-[#C5A059]">₦50B+</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Assets Under Advice</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" alt="Investment" className="w-full h-[500px] object-cover shadow-2xl" />
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