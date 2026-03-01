"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Bed, Bath, Square, MapPin, Share2, Heart, ChevronLeft, Phone, Mail, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const WHATSAPP_NUMBER = "+2348000000000";
  
  // In a real app, we'd fetch this by ID. For now, using placeholder data.
  const propertyTitle = "Ultra-Modern 5 Bedroom Penthouse";
  const propertyLocation = "Banana Island, Ikoyi";

  const waLink = getWhatsAppLink(
    WHATSAPP_NUMBER, 
    `Hi, I'm viewing the "${propertyTitle}" in ${propertyLocation} on your website. I'd like to schedule a viewing.`
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="mb-8 text-[#002147] hover:text-[#C5A059] gap-2 font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> BACK TO LISTINGS
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="relative h-[500px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" 
                  className="w-full h-full object-cover"
                  alt="Property"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#C5A059] font-bold uppercase tracking-widest text-xs">
                  <MapPin className="w-4 h-4" /> {propertyLocation}
                </div>
                <h1 className="text-4xl font-bold text-[#002147]">{propertyTitle}</h1>
                <p className="text-3xl font-bold text-[#C5A059]">₦850,000,000</p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-8 border-y border-zinc-100">
                <div className="text-center space-y-1">
                  <Bed className="w-6 h-6 text-[#C5A059] mx-auto" />
                  <p className="text-sm font-bold text-[#002147]">5 Bedrooms</p>
                </div>
                <div className="text-center space-y-1">
                  <Bath className="w-6 h-6 text-[#C5A059] mx-auto" />
                  <p className="text-sm font-bold text-[#002147]">6 Bathrooms</p>
                </div>
                <div className="text-center space-y-1">
                  <Square className="w-6 h-6 text-[#C5A059] mx-auto" />
                  <p className="text-sm font-bold text-[#002147]">1,200 sqm</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#002147]">Description</h3>
                <p className="text-zinc-600 leading-relaxed">
                  Experience the pinnacle of luxury living in this stunning 5-bedroom penthouse located in the heart of Banana Island. This architectural masterpiece features floor-to-ceiling windows offering panoramic views of the Lagos Lagoon, a private elevator, smart home automation, and a state-of-the-art kitchen.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-32 p-8 bg-[#F8F9FA] border border-zinc-100 space-y-6">
                <h3 className="text-xl font-bold text-[#002147]">Inquire About This Property</h3>
                <div className="space-y-4">
                  <a 
                    href={waLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center gap-3 font-bold transition-all shadow-lg shadow-green-500/20"
                  >
                    <MessageCircle className="w-6 h-6 fill-current" />
                    CHAT ON WHATSAPP
                  </a>
                  <Button className="w-full h-14 bg-[#002147] hover:bg-[#003366] text-white rounded-none font-bold gap-2">
                    <Phone className="w-4 h-4" /> CALL AGENT
                  </Button>
                </div>
                <div className="pt-6 border-t border-zinc-200">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Agent" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-[#002147]">Tunde Williams</p>
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Senior Property Consultant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}