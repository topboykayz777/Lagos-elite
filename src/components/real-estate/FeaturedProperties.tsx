"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Heart, Zap, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn, getWhatsAppLink } from '@/lib/utils';

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
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2070&auto=format&fit=crop",
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
  }
];

const FeaturedProperties = () => {
  const WHATSAPP_NUMBER = "+2348000000000";

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
          {PROPERTIES.map((property) => {
            const waLink = getWhatsAppLink(
              WHATSAPP_NUMBER, 
              `Hi, I'm interested in the "${property.title}" in ${property.location}. Is it still available?`
            );

            return (
              <div key={property.id} className="group block">
                <div className="space-y-6">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                    <Link href={`/properties/${property.id}`}>
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110",
                          property.status === "Sold" && "grayscale opacity-60"
                        )}
                      />
                    </Link>
                    
                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-[#C5A059] text-white rounded-none px-4 py-1.5 font-bold uppercase text-[9px] tracking-widest border-none shadow-xl">
                        {property.tag}
                      </Badge>
                    </div>

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
                      <Link href={`/properties/${property.id}`}>
                        <h3 className="text-2xl font-bold text-[#002147] group-hover:text-[#C5A059] transition-colors leading-tight">
                          {property.title}
                        </h3>
                      </Link>
                    </div>

                    <div className="flex items-center gap-8 pt-4 border-t border-zinc-100">
                      {property.beds > 0 && (
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-[#C5A059]" />
                          <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.beds} Beds</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Square className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">{property.sqft} sqm</span>
                      </div>
                    </div>

                    {/* WhatsApp Action */}
                    <div className="pt-2">
                      <a 
                        href={waLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 font-bold text-xs tracking-widest uppercase transition-all"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        Inquire on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;