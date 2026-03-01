"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-[#002147] tracking-tight">List Your <span className="text-[#C5A059]">Property</span></h1>
              <p className="text-zinc-500 text-lg">Reach thousands of premium buyers and tenants in Lagos.</p>
            </div>

            <div className="bg-[#F8F9FA] p-10 border border-zinc-100 space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#002147] border-b border-zinc-200 pb-2">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Property Title</label>
                    <Input placeholder="e.g. Luxury 4 Bedroom Duplex" className="h-12 rounded-none bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Property Type</label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-none bg-white">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                        <SelectItem value="penthouse">Penthouse</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Location</label>
                    <Input placeholder="e.g. Lekki Phase 1" className="h-12 rounded-none bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Price (₦)</label>
                    <Input placeholder="e.g. 150,000,000" className="h-12 rounded-none bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-zinc-500">Description</label>
                  <Textarea placeholder="Describe your property features..." className="min-h-[150px] rounded-none bg-white" />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#002147] border-b border-zinc-200 pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Full Name</label>
                    <Input placeholder="Your Name" className="h-12 rounded-none bg-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500">Phone Number</label>
                    <Input placeholder="+234..." className="h-12 rounded-none bg-white" />
                  </div>
                </div>
              </div>

              <Button className="w-full h-14 bg-[#C5A059] hover:bg-[#b38f4d] text-white rounded-none font-bold text-lg">
                SUBMIT PROPERTY LISTING
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}