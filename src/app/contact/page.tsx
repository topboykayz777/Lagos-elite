"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20 space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tight">Get In <span className="text-[#C5A059]">Touch.</span></h1>
            <p className="text-zinc-500 text-lg md:text-xl font-medium">Our elite consultancy team is ready to assist with your inquiries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center">
                    <MapPin className="text-[#C5A059] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002147]">Our Office</h3>
                  <p className="text-zinc-500 leading-relaxed">123 Luxury Way, Ikoyi,<br />Lagos, Nigeria</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center">
                    <Phone className="text-[#C5A059] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002147]">Phone</h3>
                  <p className="text-zinc-500">+234 800 000 0000</p>
                  <p className="text-zinc-500">+234 801 111 1111</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center">
                    <Mail className="text-[#C5A059] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002147]">Email</h3>
                  <p className="text-zinc-500">info@lagoselite.com</p>
                  <p className="text-zinc-500">sales@lagoselite.com</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center">
                    <Clock className="text-[#C5A059] w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#002147]">Hours</h3>
                  <p className="text-zinc-500">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-zinc-500">Sun: By Appointment</p>
                </div>
              </div>

              <div className="p-10 bg-[#002147] text-white space-y-6">
                <h3 className="text-2xl font-bold">Instant Support</h3>
                <p className="text-zinc-400">Need a quick response? Chat with our senior consultants directly on WhatsApp.</p>
                <Button className="w-full h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-none font-black text-xs tracking-widest gap-3">
                  <MessageCircle className="w-5 h-5 fill-current" /> START WHATSAPP CHAT
                </Button>
              </div>
            </div>

            <div className="bg-zinc-50 p-12 border border-zinc-100 space-y-8">
              <h3 className="text-3xl font-bold text-[#002147]">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">First Name</label>
                    <Input placeholder="John" className="h-14 rounded-none bg-white border-zinc-200 focus:border-[#C5A059]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Last Name</label>
                    <Input placeholder="Doe" className="h-14 rounded-none bg-white border-zinc-200 focus:border-[#C5A059]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</label>
                  <Input placeholder="john@example.com" className="h-14 rounded-none bg-white border-zinc-200 focus:border-[#C5A059]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Subject</label>
                  <Input placeholder="Property Inquiry" className="h-14 rounded-none bg-white border-zinc-200 focus:border-[#C5A059]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-none bg-white border-zinc-200 focus:border-[#C5A059]" />
                </div>
                <Button className="w-full h-16 bg-[#002147] hover:bg-[#003366] text-white rounded-none font-black text-xs tracking-widest">
                  SEND MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}