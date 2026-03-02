"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import About from "@/components/real-estate/About";
import Agents from "@/components/real-estate/Agents";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tight">Our <span className="text-[#C5A059]">Story.</span></h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">Redefining luxury real estate in Nigeria through transparency, expertise, and exclusive access.</p>
          </div>
        </div>
        
        <About />

        <section className="py-32 bg-[#002147] text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-bold text-[#C5A059]">₦10B+</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Total Sales Volume</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-bold text-[#C5A059]">1,200+</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Elite Clients</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl md:text-6xl font-bold text-[#C5A059]">50+</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Expert Advisors</p>
              </div>
            </div>
          </div>
        </section>

        <Agents />

        <section className="py-32 bg-zinc-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl font-bold text-[#002147]">The Sovereign Promise</h2>
              <p className="text-zinc-500 leading-relaxed text-lg">
                We don't just sell properties; we curate lifestyles. Every listing in our portfolio undergoes a rigorous 50-point verification process to ensure your investment is secure, profitable, and prestigious.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}