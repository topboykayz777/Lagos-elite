"use client";

import React, { useState } from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import PropertyCard from "@/components/real-estate/PropertyCard";
import LeadModal from "@/components/real-estate/LeadModal";
import { Search, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ALL_PROPERTIES = [
  { id: 1, title: "Ultra-Modern 5 Bedroom Penthouse", location: "Banana Island, Ikoyi", price: "₦850,000,000", beds: 5, sqft: "1,200", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop", tag: "Featured" },
  { id: 2, title: "Luxury Waterfront Villa", location: "Lekki Phase 1, Lagos", price: "₦450,000,000", beds: 4, sqft: "850", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop", tag: "New Listing" },
  { id: 3, title: "Contemporary 4 Bedroom Terrace", location: "Victoria Island, Lagos", price: "₦320,000,000", beds: 4, sqft: "600", image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop", tag: "Hot Deal" },
  { id: 4, title: "The Sovereign Mansion", location: "Old Ikoyi, Lagos", price: "₦1,200,000,000", beds: 7, sqft: "2,500", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", tag: "Exclusive" },
  { id: 5, title: "Minimalist Glass House", location: "Eko Atlantic City", price: "₦680,000,000", beds: 3, sqft: "450", image: "https://images.unsplash.com/photo-1600607687940-467f5b637a53?q=80&w=2070&auto=format&fit=crop", tag: "Modern" },
  { id: 6, title: "Colonial Style Estate", location: "Ikeja GRA, Lagos", price: "₦280,000,000", beds: 5, sqft: "1,100", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop" },
  { id: 7, title: "Waterfront Smart Duplex", location: "Osborne Foreshore, Ikoyi", price: "₦550,000,000", beds: 4, sqft: "720", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2070&auto=format&fit=crop", tag: "Smart Home" },
  { id: 8, title: "The Zenith Penthouse", location: "Victoria Island, Lagos", price: "₦950,000,000", beds: 4, sqft: "980", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop" },
  { id: 9, title: "Lush Garden Villa", location: "Maitama, Abuja", price: "₦720,000,000", beds: 6, sqft: "1,800", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" },
  { id: 10, title: "Urban Loft Apartment", location: "Oniru, Victoria Island", price: "₦180,000,000", beds: 2, sqft: "220", image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop" },
  { id: 11, title: "The Atlantic View Suite", location: "Eko Atlantic City", price: "₦420,000,000", beds: 3, sqft: "380", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop" },
  { id: 12, title: "Executive 5 Bedroom Detached", location: "Chevron Drive, Lekki", price: "₦250,000,000", beds: 5, sqft: "650", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop" },
  { id: 13, title: "The Heritage Manor", location: "Parkview Estate, Ikoyi", price: "₦1,100,000,000", beds: 6, sqft: "2,200", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
  { id: 14, title: "Modernist Cube Villa", location: "Lekki County, Lagos", price: "₦380,000,000", beds: 4, sqft: "580", image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop" },
  { id: 15, title: "The Skyline Penthouse", location: "Bourdillon, Ikoyi", price: "₦1,500,000,000", beds: 5, sqft: "1,400", image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop", tag: "Ultra-Luxury" },
];

export default function PropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-40 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C5A059]/5 border border-[#C5A059]/10">
              <span className="text-[#C5A059] text-[10px] font-black tracking-[0.4em] uppercase">The Elite Portfolio</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-[#002147] tracking-tighter leading-[0.9]">
              Curated <br />
              <span className="text-[#C5A059]">Listings.</span>
            </h1>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
              Explore our hand-picked selection of the most prestigious properties across Nigeria's most exclusive neighborhoods.
            </p>
          </div>

          <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-xl border border-zinc-100 p-4 mb-16 flex flex-col lg:row-row lg:items-center justify-between gap-6 shadow-2xl shadow-zinc-200/50">
            <div className="flex flex-col lg:flex-row items-center gap-4 flex-1 w-full">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <Input 
                  className="pl-12 h-14 bg-zinc-50/50 border-none rounded-none text-sm font-bold placeholder:text-zinc-300 focus-visible:ring-1 focus-visible:ring-[#C5A059]/30" 
                  placeholder="Search by location, title, or keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <Button variant="outline" className="h-14 px-8 border-zinc-100 rounded-none font-black text-[10px] tracking-widest gap-3 hover:bg-zinc-50 w-full lg:w-auto">
                  <SlidersHorizontal className="w-4 h-4" /> FILTERS
                </Button>
                <div className="hidden md:flex items-center border border-zinc-100 h-14">
                  <button className="px-4 h-full bg-[#002147] text-white"><Grid className="w-4 h-4" /></button>
                  <button className="px-4 h-full hover:bg-zinc-50"><List className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Showing <span className="text-[#002147]">{ALL_PROPERTIES.length}</span> Exclusive Results
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
            {ALL_PROPERTIES.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onInquire={setSelectedProperty} 
              />
            ))}
          </div>

          <div className="mt-32 text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="w-px h-20 bg-gradient-to-b from-[#C5A059] to-transparent" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">End of Current Collection</p>
              <Button className="bg-[#002147] hover:bg-[#003366] text-white h-16 px-12 rounded-none font-black text-[10px] tracking-[0.3em]">
                REQUEST PRIVATE VIEWING
              </Button>
            </div>
          </div>
        </div>
      </main>

      {selectedProperty && (
        <LeadModal 
          isOpen={!!selectedProperty} 
          onClose={() => setSelectedProperty(null)}
          propertyTitle={selectedProperty.title}
          propertyLocation={selectedProperty.location}
        />
      )}
      <Footer />
    </div>
  );
}