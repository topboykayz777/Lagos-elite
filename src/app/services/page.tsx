"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import Services from "@/components/real-estate/Services";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-5xl font-bold text-[#002147] tracking-tight">Our <span className="text-[#C5A059]">Services</span></h1>
            <p className="text-zinc-500 text-lg">Tailored solutions for every real estate need in Lagos.</p>
          </div>
        </div>
        <Services />
        <section className="py-24 bg-[#002147] text-white text-center">
          <div className="container mx-auto px-6 space-y-8">
            <h2 className="text-4xl font-bold">Need a Custom Solution?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Our team of experts is ready to provide personalized advisory for your specific real estate goals.</p>
            <Link href="/contact">
              <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white h-14 px-10 rounded-none font-bold">
                CONTACT AN EXPERT
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}