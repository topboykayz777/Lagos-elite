"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bed, Square, MapPin, Zap, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import LeadModal from './LeadModal';

const PROPERTIES = [
  {
    id: 1,
    title: "Ultra-Modern 5 Bedroom Penthouse",
    location: "Banana Island, Ikoyi",
    price: "₦850,000,000",
    beds: 5,
    sqft: "1,200",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    tag: "Featured",
    status: "Available"
  },
  {
    id: 2,
    title: "Luxury Waterfront Villa",
    location: "Lekki Phase 1, Lagos",
    price: "₦450,000,000",
    beds: 4,
    sqft: "850",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    tag: "New Listing",
    status: "Available"
  },
  {
    id: 3,
    title: "Contemporary 4 Bedroom Terrace",
    location: "Victoria Island, Lagos",
    price: "₦320,000,000",
    beds: 4,
    sqft: "600",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
    tag: "Hot Deal",
    status: "Available"
  }
];

const FeaturedProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  return (
    <section id="properties" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#C5A059] font-bold uppercase tracking-[0.3em] text-[10px]">
              <Zap className="w-3 h-3 fill-current" /> Curated Selection
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#002147] tracking-tight leading-none">
              Elite <span className="text-[#C5A059]">Portfolio.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="group block">
              <div className="space-y-6">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-[#C5A059] text-white rounded-none px-4 py-1.5 font-bold uppercase text-[9px] tracking-widest border-none shadow-xl">
                      {property.tag}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#002147]/90 to-transparent">
                    <p className="text-3xl font-bold text-white tracking-tight">{property.price}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      {property.location}
                    </div>
                    <h3 className="text-2xl font-bold text-[#002147] group-hover:text-[#C5A059] transition-colors leading-tight">
                      {property.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-8 pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <Bed className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.sqft} sqm</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button 
                      onClick={() => setSelectedProperty(property)}
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-7 rounded-none font-bold text-xs tracking-widest uppercase transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Inquire on WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </div>
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