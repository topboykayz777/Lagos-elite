"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShieldCheck, Globe, TrendingUp } from 'lucide-react';

export default function ListPropertyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-[#002147] tracking-tight">List Your <span className="text-[#C5A059]">Asset.</span></h1>
                <p className="text-zinc-500 text-lg leading-relaxed">Reach the most qualified pool of premium buyers and institutional investors in Nigeria.</p>
              </div>

              <div className="space-y-8">
                {[
                  { title: "Global Exposure", desc: "Your property featured across our international network.", icon: Globe },
                  { title: "Professional Media", desc: "High-end photography and cinematic video tours.", icon: TrendingUp },
                  { title: "Vetted Buyers", desc: "We only bring qualified, high-net-worth individuals to viewings.", icon: ShieldCheck },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-12 h-12 bg-[#C5A059]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-[#C5A059]" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#002147]">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-zinc-50 border border-zinc-100">
                <p className="text-sm text-zinc-500 italic">"Lagos Elite Properties sold my Ikoyi penthouse in 14 days at 98% of the asking price. Their marketing is simply superior."</p>
                <p className="mt-4 font-bold text-[#002147]">— Chief O. Adeyemi</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-zinc-100 p-10 shadow-2xl shadow-zinc-200/50 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#002147] border-b border-zinc-100 pb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Property Title</label>
                      <Input placeholder="e.g. Luxury 5 Bedroom Villa" className="h-14 rounded-none border-zinc-200 focus:border-[#C5A059]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Property Type</label>
                      <Select>
                        <SelectTrigger className="h-14 rounded-none border-zinc-200 focus:ring-0">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Location</label>
                      <Input placeholder="e.g. Banana Island, Ikoyi" className="h-14 rounded-none border-zinc-200 focus:border-[#C5A059]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Expected Price (₦)</label>
                      <Input placeholder="e.g. 500,000,000" className="h-14 rounded-none border-zinc-200 focus:border-[#C5A059]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Description</label>
                    <Textarea placeholder="Describe the unique features of your property..." className="min-h-[150px] rounded-none border-zinc-200 focus:border-[#C5A059]" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#002147] border-b border-zinc-100 pb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Full Name</label>
                      <Input placeholder="Your Name" className="h-14 rounded-none border-zinc-200 focus:border-[#C5A059]" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</label>
                      <Input placeholder="+234..." className="h-14 rounded-none border-zinc-200 focus:border-[#C5A059]" />
                    </div>
                  </div>
                </div>

                <Button className="w-full h-16 bg-[#C5A059] hover:bg-[#b38f4d] text-white rounded-none font-black text-xs tracking-widest">
                  SUBMIT PROPERTY FOR REVIEW
                </Button>
                <p className="text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  Our team will contact you within 24 hours for verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}