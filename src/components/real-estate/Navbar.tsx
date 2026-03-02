"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, Building2, MapPin, ShieldCheck, TrendingUp, Key, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = isScrolled || pathname !== '/';

  const propertyLinks = [
    { title: "Ikoyi Collection", href: "/properties?area=ikoyi", icon: Building2, desc: "Ultra-luxury penthouses." },
    { title: "Lekki Waterfronts", href: "/properties?area=lekki", icon: MapPin, desc: "Modern coastal living." },
    { title: "Commercial Assets", href: "/properties?type=commercial", icon: TrendingUp, desc: "High-yield spaces." },
    { title: "Off-Market Deals", href: "/properties?type=off-market", icon: ShieldCheck, desc: "Private listings." },
  ];

  const serviceLinks = [
    { title: "Property Sales", href: "/services#sales", icon: Key },
    { title: "Management", href: "/services#management", icon: ShieldCheck },
    { title: "Investment", href: "/services#investment", icon: TrendingUp },
    { title: "Relocation", href: "/services#relocation", icon: Globe },
  ];

  return (
    <nav 
      onMouseLeave={() => setIsMegaMenuOpen(false)}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-4",
        isScrolled || pathname !== '/' ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo light={!isDarkText} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className={cn(
            "text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059]",
            isDarkText ? "text-[#002147]" : "text-white"
          )}>
            Home
          </Link>
          
          <button 
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            className={cn(
              "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059]",
              isDarkText ? "text-[#002147]" : "text-white"
            )}
          >
            Explore <ChevronDown className={cn("w-3 h-3 transition-transform", isMegaMenuOpen && "rotate-180")} />
          </button>

          <Link href="/about" className={cn(
            "text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059]",
            isDarkText ? "text-[#002147]" : "text-white"
          )}>
            About
          </Link>
          
          <Link href="/contact" className={cn(
            "text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059]",
            isDarkText ? "text-[#002147]" : "text-white"
          )}>
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isDarkText ? "text-zinc-400" : "text-zinc-500")}>Concierge</span>
            <a href="tel:+2348166073291" className={cn(
              "flex items-center gap-2 text-xs font-black tracking-widest",
              isDarkText ? "text-[#002147]" : "text-white"
            )}>
              +234 816 607 3291
            </a>
          </div>
          <Link href="/list-property">
            <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white font-black text-[10px] tracking-widest rounded-none px-8 h-12 shadow-xl shadow-[#C5A059]/20 transition-all active:scale-95">
              LIST PROPERTY
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} /> : <Menu className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} />}
        </button>
      </div>

      {/* Mega Menu Dropdown */}
      <div className={cn(
        "absolute top-full left-0 right-0 bg-white border-t-4 border-[#C5A059] shadow-2xl transition-all duration-500 overflow-hidden",
        isMegaMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="max-w-7xl mx-auto p-12 grid grid-cols-3 gap-16">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Properties</h3>
            <div className="grid gap-6">
              {propertyLinks.map((link) => (
                <Link key={link.title} href={link.href} onClick={() => setIsMegaMenuOpen(false)} className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#002147] transition-colors">
                    <link.icon className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#002147] group-hover:text-[#C5A059] transition-colors">{link.title}</p>
                    <p className="text-[9px] text-zinc-400 font-medium">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Services</h3>
            <div className="grid gap-6">
              {serviceLinks.map((link) => (
                <Link key={link.title} href={link.href} onClick={() => setIsMegaMenuOpen(false)} className="group flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#002147] transition-colors">
                    <link.icon className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-[#002147] group-hover:text-[#C5A059] transition-colors">{link.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-zinc-50 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#002147]">Private Advisory</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">Schedule a confidential consultation with our senior partners for off-market acquisitions.</p>
            </div>
            <Link href="/contact" onClick={() => setIsMegaMenuOpen(false)}>
              <Button className="w-full bg-[#002147] text-white rounded-none font-black text-[10px] tracking-widest h-12">BOOK CONSULTATION</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-5 shadow-2xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Home</Link>
          <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Properties</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Services</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">About</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;