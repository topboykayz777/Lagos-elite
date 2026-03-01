"use client";

import React from 'react';
import { Home, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#002147] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-lg">
                <Home className="text-[#C5A059] w-6 h-6" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold tracking-tighter">
                  LAGOS<span className="text-[#C5A059]">ELITE</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-400">
                  Properties
                </span>
              </div>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lagos Elite Properties is the leading luxury real estate agency in Nigeria, providing bespoke property solutions for high-net-worth individuals.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#" className="hover:text-[#C5A059] transition-colors">Home</a></li>
              <li><a href="#properties" className="hover:text-[#C5A059] transition-colors">Featured Properties</a></li>
              <li><a href="#about" className="hover:text-[#C5A059] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#C5A059] transition-colors">Our Services</a></li>
              <li><a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>123 Luxury Way, Ikoyi, <br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>info@lagoselite.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-bold border-b border-white/10 pb-4">Newsletter</h3>
            <p className="text-zinc-400 text-sm">Subscribe to get the latest property listings and market insights.</p>
            <div className="flex flex-col gap-2">
              <Input 
                placeholder="Your Email Address" 
                className="bg-white/5 border-white/10 text-white h-12 rounded-none"
              />
              <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white h-12 rounded-none font-bold">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
          <p>© 2024 Lagos Elite Properties. All Rights Reserved.</p>
          <p>Designed for Excellence in Nigeria.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;