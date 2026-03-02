"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Bed, Square, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
  property: {
    id: number | string;
    title: string;
    location: string;
    price: string;
    beds: number;
    sqft: string;
    image: string;
    tag?: string;
  };
  onInquire: (property: any) => void;
}

const PropertyCard = ({ property, onInquire }: PropertyCardProps) => {
  return (
    <div className="group relative bg-white overflow-hidden border border-zinc-100 hover:border-[#C5A059]/30 transition-all duration-700 hover:shadow-2xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        {property.tag && (
          <div className="absolute top-6 left-6">
            <Badge className="bg-[#C5A059] text-white rounded-none px-4 py-1.5 font-black uppercase text-[8px] tracking-[0.2em] border-none shadow-2xl">
              {property.tag}
            </Badge>
          </div>
        )}

        {/* Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
          <Button 
            onClick={(e) => {
              e.preventDefault();
              onInquire(property);
            }}
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-7 rounded-none font-black text-[10px] tracking-[0.2em] uppercase shadow-2xl flex items-center gap-3"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Inquire on WhatsApp
          </Button>
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-10">
          <p className="text-3xl font-bold text-white tracking-tighter mb-1">{property.price}</p>
          <div className="flex items-center gap-2 text-zinc-300 text-[9px] font-black uppercase tracking-[0.2em]">
            <MapPin className="w-3 h-3 text-[#C5A059]" />
            {property.location}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-[#002147] leading-tight group-hover:text-[#C5A059] transition-colors">
            {property.title}
          </h3>
          <Link href={`/properties/${property.id}`}>
            <div className="w-10 h-10 border border-zinc-100 flex items-center justify-center group-hover:bg-[#002147] group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-8 pt-6 border-t border-zinc-50">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{property.beds} Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] font-black text-[#002147] uppercase tracking-widest">{property.sqft} sqm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;