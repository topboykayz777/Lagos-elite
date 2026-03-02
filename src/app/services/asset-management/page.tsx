"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { ShieldCheck, CheckCircle2, ArrowRight, Key, Building2, Users } from 'lucide-react';
import Link from 'next/link';

export default function AssetManagementPage() {
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
                Asset <br /><span className="text-[#C5A059]">Management.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl">
                Comprehensive protection and maintenance of your real estate portfolio with institutional-grade reporting.
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
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                    alt="Modern Office Building" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#002147] -z-10 hidden md:block" />
              </div>

              <div className="order-1 lg:order-2 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#002147]">Protecting Your Wealth</h2>
                  <p className="text-zinc-500 leading-relaxed text-lg">
                    We protect your wealth by ensuring your real estate assets are managed to the highest institutional standards. From tenant relations to structural maintenance, we handle it all.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: "Tenant Vetting", desc: "Rigorous background and financial checks.", icon: Users },
                    { title: "Facility Support", desc: "24/7 maintenance and emergency response.", icon: Building2 },
                    { title: "Rent Optimization", desc: "Market-driven pricing strategies.", icon: Key },
                    { title: "Legal Compliance", desc: "Ensuring all documentation is up to date.", icon: ShieldCheck },
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
                      REQUEST MANAGEMENT
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
              <h2 className="text-4xl font-bold text-[#002147]">Institutional Standards</h2>
              <p className="text-zinc-500 leading-relaxed text-lg">
                Our management portal provides real-time access to your property's performance, including financial statements, maintenance logs, and tenant communication.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                <div className="p-8 bg-white border border-zinc-100">
                  <p className="text-3xl font-bold text-[#C5A059]">98%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Occupancy Rate</p>
                </div>
                <div className="p-8 bg-white border border-zinc-100">
                  <p className="text-3xl font-bold text-[#C5A059]">24h</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Response Time</p>
                </div>
                <div className="p-8 bg-white border border-zinc-100">
                  <p className="text-3xl font-bold text-[#C5A059]">100%</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Transparency</p>
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