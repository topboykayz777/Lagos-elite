"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { TrendingUp, CheckCircle2, ArrowRight, Globe, Briefcase, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function InvestmentAdvisoryPage() {
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
                Investment <br /><span className="text-[#C5A059]">Advisory.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl">
                Data-driven insights and market analysis to help you identify high-yield opportunities in emerging districts.
              </p>
            </div>
          </div>
        </section>

        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#002147]">Intelligence-Led Investing</h2>
                  <p className="text-zinc-500 leading-relaxed text-lg">
                    Real estate in Lagos is a high-yield asset class when approached with data. Our advisors provide the intelligence needed to navigate land banking, development, and commercial leasing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Yield Analysis", desc: "Detailed ROI projections for every asset.", icon: TrendingUp },
                    { title: "Market Forecasting", desc: "Predicting the next growth corridors.", icon: Globe },
                    { title: "Portfolio Strategy", desc: "Diversification across asset classes.", icon: Briefcase },
                    { title: "Risk Mitigation", desc: "Thorough due diligence and legal checks.", icon: ShieldCheck },
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
                      BOOK ADVISORY SESSION
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" 
                    alt="Financial Data" 
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
              <h2 className="text-4xl font-bold text-[#002147]">Proven Performance</h2>
              <p className="text-zinc-500 leading-relaxed text-lg">
                Our clients consistently outperform the market average through our strategic guidance and exclusive access to pre-launch development opportunities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="p-10 bg-white border border-zinc-100">
                  <p className="text-5xl font-bold text-[#C5A059]">18%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">Avg. Annual Yield</p>
                </div>
                <div className="p-10 bg-white border border-zinc-100">
                  <p className="text-5xl font-bold text-[#C5A059]">₦50B+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mt-2">Assets Under Advice</p>
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