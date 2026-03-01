"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import About from "@/components/real-estate/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#002147] tracking-tight">Our <span className="text-[#C5A059]">Story</span></h1>
            <p className="text-zinc-500 text-lg">Redefining luxury real estate in Nigeria since 2009.</p>
          </div>
        </div>
        <About />
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-[#C5A059]">₦10B+</h3>
                <p className="text-sm font-bold text-[#002147] uppercase tracking-widest">Total Sales Volume</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-[#C5A059]">1,200+</h3>
                <p className="text-sm font-bold text-[#002147] uppercase tracking-widest">Happy Clients</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-[#C5A059]">50+</h3>
                <p className="text-sm font-bold text-[#002147] uppercase tracking-widest">Expert Agents</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}