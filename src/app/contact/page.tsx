"use client";

import React from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <h1 className="text-5xl font-bold text-[#002147] tracking-tight">Get In <span className="text-[#C5A059]">Touch</span></h1>
            <p className="text-zinc-500 text-lg">We're here to help you with all your real estate inquiries.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#F8F9FA] flex items-center justify-center">
                    <MapPin className="text-[#C5A059] w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#002147]">Our Office</h3>
                  <p className="text-sm text-zinc-500">123 Luxury Way, Ikoyi, Lagos, Nigeria</p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#F8F9FA] flex items-center justify-center">
                    <Phone className="text-[#C5A059] w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#002147]">Phone</h3>
                  <p className="text-sm text-zinc-500">+234 800 000 0000</p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#F8F9FA] flex items-center justify-center">
                    <Mail className="text-[#C5A059] w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#002147]">Email</h3>
                  <p className="text-sm text-zinc-500">info@lagoselite.com</p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#F8F9FA] flex items-center justify-center">
                    <Clock className="text-[#C5A059] w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#002147]">Working Hours</h3>
                  <p className="text-sm text-zinc-500">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="h-[300px] bg-zinc-100 grayscale">
                {/* Placeholder for Map */}
                <div className="w-full h-full flex items-center justify-center text-zinc-400 font-bold uppercase tracking-widest">
                  Interactive Map View
                </div>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-10 space-y-6">
              <h3 className="text-2xl font-bold text-[#002147]">Send Us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" className="h-12 rounded-none bg-white" />
                  <Input placeholder="Last Name" className="h-12 rounded-none bg-white" />
                </div>
                <Input placeholder="Email Address" className="h-12 rounded-none bg-white" />
                <Input placeholder="Phone Number" className="h-12 rounded-none bg-white" />
                <Textarea placeholder="Your Message" className="min-h-[150px] rounded-none bg-white" />
                <Button className="w-full h-14 bg-[#002147] hover:bg-[#003366] text-white rounded-none font-bold">
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