"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
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
  }
];

const FeaturedProperties = () => {
  return (
    <section id="properties" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Exclusive Listings</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-[#002147] tracking-tight">Featured Properties</h2>
          </div>
          <Link href="/properties">
            <Button variant="outline" className="border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white rounded-none px-8 font-bold">
              VIEW ALL PROPERTIES
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROPERTIES.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`}>
              <Card className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 rounded-none overflow-hidden cursor-pointer">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
                      property.status === "Sold" && "grayscale"
                    )}
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-[#C5A059] text-white rounded-none px-3 py-1 font-bold uppercase text-[10px]">
                      {property.tag}
                    </Badge>
                    <Badge className={cn(
                      "rounded-none px-3 py-1 font-bold uppercase text-[10px]",
                      property.status === "Sold" ? "bg-red-600 text-white" : 
                      property.status === "Under Offer" ? "bg-orange-500 text-white" : "bg-green-600 text-white"
                    )}>
                      {property.status}
                    </Badge>
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-2xl font-bold text-white">{property.price}</p>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      {property.location}
                    </div>
                    <h3 className="text-xl font-bold text-[#002147] group-hover:text-[#C5A059] transition-colors">
                      {property.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-sm font-bold text-[#002147]">{property.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-sm font-bold text-[#002147]">{property.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-[#C5A059]" />
                      <span className="text-sm font-bold text-[#002147]">{property.sqft} sqm</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;