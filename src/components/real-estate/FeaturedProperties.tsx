"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PropertyCard from './PropertyCard';
import LeadModal from './LeadModal';

const FEATURED = [
  {
    id: 1,
    title: "Ultra-Modern 5 Bedroom Penthouse",
    location: "Banana Island, Ikoyi",
    price: "₦850,000,000",
    beds: 5,
    sqft: "1,200",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    tag: "Featured"
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    location: "Lekki Phase 1, Lagos",
    price: "₦450,000,000",
    beds: 4,
    sqft: "850",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    tag: "New Listing"
  },
  {
    id: 3,
    title: "Contemporary 4 Bedroom Terrace",
    location: "Victoria Island, Lagos",
    price: "₦320,000,000",
    beds: 4,
    sqft: "600",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    tag: "Hot Deal"
  }
];

const FeaturedProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  return (
    <section id="properties" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px]">
              <Zap className="w-3 h-3 fill-current" /> Curated Selection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002147] tracking-tighter">
              Elite Portfolio.
            </h2>
          </div>
          <Link href="/properties">
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.3em] text-[#002147] hover:text-[#C5A059] gap-3 group p-0 h-auto">
              View All Listings <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onInquire={setSelectedProperty} 
            />
          ))}
        </div>
      </div>

      {selectedProperty && (
        <LeadModal 
          isOpen={!!selectedProperty} 
          onClose={() => setSelectedProperty(null)}
          propertyTitle={selectedProperty.title}
          propertyLocation={selectedProperty.location}
        />
      )}
    </section>
  );
};

export default FeaturedProperties;