"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const PROPERTIES = [
  {
    id: 1,
    title: "Ultra-Modern 5 Bedroom Penthouse",
    location: "Banana Island, Ikoyi",
    price: "₦850,000,000",
    beds: 5,
    baths: 6,
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
    baths: 5,
    sqft: "850",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    tag: "New Listing",
    status: "Under Offer"
  },
  {
    id: 3,
    title: "Contemporary 4 Bedroom Terrace",
    location: "Victoria Island, Lagos",
    price: "₦320,000,000",
    beds: 4,
    baths: 4,
    sqft: "600",
    image: "https://images.unsplash.com/photo-1600607687940-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    tag: "Hot Deal",
    status: "Sold"
  },
  {
    id: 4,
    title: "Prime Commercial Land (1 Acre)",
    location: "Epe, Lagos",
    price: "₦45,000,000",
    beds: 0,
    baths: 0,
    sqft: "4,046",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
    tag: "Investment",
    status: "Available"
  },
  {
    id: 5,
    title: "Smart 5 Bedroom Detached Duplex",
    location: "Chevron, Lekki",
    price: "₦180,000,000",
    beds: 5,
    baths: 5,
    sqft: "450",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    tag: "Smart Home",
    status: "Available"
  },
  {
    id: 6,
    title: "Grand 7 Bedroom Mansion",
    location: "Magodo Phase 2, Lagos",
    price: "₦550,000,000",
    beds: 7,
    baths: 8,
    sqft: "1,500",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop",
    tag: "Elite",
    status: "Available"
  },
  {
    id: 7,
    title: "Modern Office Complex",
    location: "Marina, Lagos Island",
    price: "₦1,200,000,000",
    beds: 0,
    baths: 12,
    sqft: "2,500",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    tag: "Commercial",
    status: "Available"
  },
  {
    id: 8,
    title: "Luxury 3 Bedroom Apartment",
    location: "Oniru, Victoria Island",
    price: "₦120,000,000",
    beds: 3,
    baths: 3,
    sqft: "280",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
    tag: "Best Value",
    status: "Available"
  },
  {
    id: 9,
    title: "Premium Shortlet Studio",
    location: "Old Ikoyi, Lagos",
    price: "₦85,000 / Night",
    beds: 1,
    baths: 1,
    sqft: "65",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2070&auto=format&fit=crop",
    tag: "Shortlet",
    status: "Available"
  },
  {
    id: 10,
    title: "4 Bedroom Semi-Detached",
    location: "Ikate, Lekki",
    price: "₦145,000,000",
    beds: 4,
    baths: 4,
    sqft: "380",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    tag: "Family Home",
    status: "Under Offer"
  },
  {
    id: 11,
    title: "Executive 4 Bedroom Flat",
    location: "Parkview Estate, Ikoyi",
    price: "₦280,000,000",
    beds: 4,
    baths: 4,
    sqft: "520",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    tag: "Exclusive",
    status: "Available"
  },
  {
    id: 12,
    title: "Industrial Plot (2,000 sqm)",
    location: "Ibeju-Lekki, Lagos",
    price: "₦65,000,000",
    beds: 0,
    baths: 0,
    sqft: "2,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    tag: "Industrial",
    status: "Available"
  }
];

const FeaturedProperties = () => {
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
          <Link href="/properties">
            <Button variant="outline" className="border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white rounded-none px-10 h-14 font-bold transition-all">
              EXPLORE ALL LISTINGS
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PROPERTIES.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="group block">
              <div className="space-y-6">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110",
                      property.status === "Sold" && "grayscale opacity-60"
                    )}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <Badge className="bg-[#C5A059] text-white rounded-none px-4 py-1.5 font-bold uppercase text-[9px] tracking-widest border-none shadow-xl">
                      {property.tag}
                    </Badge>
                    <Badge className={cn(
                      "rounded-none px-4 py-1.5 font-bold uppercase text-[9px] tracking-widest border-none shadow-xl",
                      property.status === "Sold" ? "bg-red-600 text-white" : 
                      property.status === "Under Offer" ? "bg-orange-500 text-white" : "bg-[#002147] text-white"
                    )}>
                      {property.status}
                    </Badge>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                    <Heart className="w-5 h-5" />
                  </button>

                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#002147]/90 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-3xl font-bold text-white tracking-tight">{property.price}</p>
                  </div>
                </div>

                {/* Content */}
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
                    {property.beds > 0 && (
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.beds} Beds</span>
                      </div>
                    )}
                    {property.baths > 0 && (
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.baths} Baths</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.sqft} sqm</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;