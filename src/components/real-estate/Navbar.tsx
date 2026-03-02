"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, ChevronDown, Building2, MapPin, ShieldCheck, TrendingUp, Key, Globe, Briefcase, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkText = isScrolled || pathname !== '/';

  const propertyLinks = [
    { title: "Ikoyi Collection", href: "/properties?area=ikoyi", icon: Building2, desc: "Ultra-luxury penthouses and villas." },
    { title: "Lekki Waterfronts", href: "/properties?area=lekki", icon: MapPin, desc: "Modern living by the Atlantic." },
    { title: "Commercial Assets", href: "/properties?type=commercial", icon: TrendingUp, desc: "High-yield office and retail spaces." },
    { title: "Off-Market Deals", href: "/properties?type=off-market", icon: ShieldCheck, desc: "Exclusive private listings." },
  ];

  const serviceLinks = [
    { title: "Property Sales", href: "/services#sales", icon: Key, desc: "Bespoke acquisition services." },
    { title: "Management", href: "/services#management", icon: ShieldCheck, desc: "Asset protection & maintenance." },
    { title: "Investment", href: "/services#investment", icon: TrendingUp, desc: "Data-driven portfolio growth." },
    { title: "Relocation", href: "/services#relocation", icon: Globe, desc: "Seamless transition for expats." },
  ];

  const companyLinks = [
    { title: "Our Story", href: "/about", icon: Briefcase },
    { title: "The Team", href: "/about#team", icon: Users },
    { title: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-700 px-6 py-4",
      isScrolled || pathname !== '/' ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo light={!isDarkText} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className={cn(
                    "px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059]",
                    isDarkText ? "text-[#002147]" : "text-white"
                  )}>
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all",
                  isDarkText ? "text-[#002147]" : "text-white"
                )}>
                  Properties
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[550px] gap-3 p-6 md:grid-cols-2 bg-white border-t-4 border-[#C5A059]">
                    {propertyLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="block select-none space-y-1 p-4 leading-none no-underline outline-none transition-all hover:bg-zinc-50 group border border-transparent hover:border-zinc-100"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[#002147] transition-colors">
                                <link.icon className="w-4 h-4 text-[#C5A059]" />
                              </div>
                              <div className="text-[11px] font-black uppercase tracking-widest text-[#002147] group-hover:text-[#C5A059]">
                                {link.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-[10px] leading-snug text-zinc-500 font-medium pl-11">
                              {link.desc}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="col-span-2 mt-2 pt-4 border-t border-zinc-100">
                      <Link href="/properties" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059] hover:underline flex items-center justify-center gap-2">
                        Explore Full Portfolio <ChevronDown className="w-3 h-3 -rotate-90" />
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all",
                  isDarkText ? "text-[#002147]" : "text-white"
                )}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 bg-white border-t-4 border-[#C5A059] md:grid-cols-2">
                    {serviceLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex flex-col gap-1 p-3 text-[10px] font-black uppercase tracking-widest text-[#002147] hover:bg-zinc-50 hover:text-[#C5A059] transition-all border border-transparent hover:border-zinc-100"
                          >
                            <div className="flex items-center gap-2">
                              <link.icon className="w-3.5 h-3.5" />
                              {link.title}
                            </div>
                            <span className="text-[8px] text-zinc-400 font-medium normal-case tracking-normal">{link.desc}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-black transition-all",
                  isDarkText ? "text-[#002147]" : "text-white"
                )}>
                  Company
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-3 bg-white border-t-4 border-[#C5A059]">
                    {companyLinks.map((link) => (
                      <li key={link.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="flex items-center gap-3 p-3 text-[10px] font-black uppercase tracking-widest text-[#002147] hover:bg-zinc-50 hover:text-[#C5A059] transition-all"
                          >
                            <link.icon className="w-4 h-4" />
                            {link.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className={cn("text-[9px] font-black uppercase tracking-[0.2em]", isDarkText ? "text-zinc-400" : "text-zinc-500")}>Concierge</span>
            <a href="tel:+2348000000000" className={cn(
              "flex items-center gap-2 text-xs font-black tracking-widest",
              isDarkText ? "text-[#002147]" : "text-white"
            )}>
              +234 800 000 0000
            </a>
          </div>
          <Link href="/list-property">
            <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white font-black text-[10px] tracking-widest rounded-none px-8 h-12 shadow-xl shadow-[#C5A059]/20 transition-all active:scale-95">
              LIST PROPERTY
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} />
          ) : (
            <Menu className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 p-8 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top-5 shadow-2xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Home</Link>
          <Link href="/properties" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Properties</Link>
          <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Services</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">About</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-black uppercase tracking-[0.3em] text-[#002147]">Contact</Link>
          <div className="pt-6 border-t border-zinc-100">
            <Link href="/list-property" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="bg-[#C5A059] text-white w-full py-7 font-black tracking-widest text-xs rounded-none">
                LIST PROPERTY
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;