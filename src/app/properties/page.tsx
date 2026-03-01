"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import FeaturedProperties from "@/components/real-estate/FeaturedProperties";
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h1 className="text-5xl font-bold text-[#002147] tracking-tight">Explore Our <span className="text-[#C5A059]">Listings</span></h1>
            <p className="text-zinc-500 text-lg">Discover the finest luxury properties across Lagos, from Ikoyi to Lekki.</p>
          </div>

          <div className="bg-[#F8F9FA] p-6 mb-12 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <Input className="pl-12 h-14 bg-white border-zinc-200 rounded-none" placeholder="Search by location, property type, or keyword..." />
            </div>
            <Button className="h-14 px-8 bg-[#002147] hover:bg-[#003366] text-white rounded-none font-bold gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4" /> FILTER
            </Button>
          </div>

          <FeaturedProperties />
        </div>
      </main>
      <Footer />
    </div>
  );
}