"use client";

import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#002147] text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Logo light />
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              Lagos Elite Properties is the leading luxury real estate agency in Nigeria, providing bespoke property solutions for high-net-worth individuals and institutional investors.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#C5A059] transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C5A059]">Quick Links</h3>
            <ul className="space-y-4 text-sm text-zinc-400 font-bold">
              <li><Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link></li>
              <li><Link href="/properties" className="hover:text-[#C5A059] transition-colors">Featured Properties</Link></li>
              <li><Link href="/about" className="hover:text-[#C5A059] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-[#C5A059] transition-colors">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#C5A059] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C5A059]">Contact Info</h3>
            <ul className="space-y-6 text-sm text-zinc-400 font-medium">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>123 Luxury Way, Ikoyi, <br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
                <span>info@lagoselite.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C5A059]">Newsletter</h3>
            <p className="text-zinc-400 text-sm font-medium">Subscribe to get the latest property listings and market insights.</p>
            <div className="flex flex-col gap-3">
              <Input 
                placeholder="Your Email Address" 
                className="bg-white/5 border-white/10 text-white h-14 rounded-none focus:border-[#C5A059] transition-all"
              />
              <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white h-14 rounded-none font-black text-xs tracking-widest">
                SUBSCRIBE
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
          <p>© 2026 Lagos Elite Properties. All Rights Reserved.</p>
          <div className="flex flex-col items-center md:items-end gap-1">
            <p>Designed for Excellence in Nigeria.</p>
            <p className="text-[#C5A059]">Designed by <span className="text-white">dev kayz</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;