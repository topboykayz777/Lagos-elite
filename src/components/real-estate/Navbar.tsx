"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled || pathname !== '/' ? "bg-white shadow-md py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#002147] flex items-center justify-center rounded-lg">
            <Home className="text-[#C5A059] w-6 h-6" />
          </div>
          <div className="flex flex-col leading-none">
            <span className={cn("text-xl font-bold tracking-tighter", isScrolled || pathname !== '/' ? "text-[#002147]" : "text-white")}>
              LAGOS<span className="text-[#C5A059]">ELITE</span>
            </span>
            <span className={cn("text-[10px] uppercase tracking-[0.2em] font-medium", isScrolled || pathname !== '/' ? "text-zinc-500" : "text-zinc-300")}>
              Properties
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-[#C5A059]",
                isScrolled || pathname !== '/' ? "text-[#002147]" : "text-white",
                pathname === link.href && "text-[#C5A059]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+2348000000000" className={cn(
            "flex items-center gap-2 text-sm font-bold",
            isScrolled || pathname !== '/' ? "text-[#002147]" : "text-white"
          )}>
            <Phone className="w-4 h-4 text-[#C5A059]" />
            +234 800 000 0000
          </a>
          <Link href="/list-property">
            <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white font-bold rounded-none px-6">
              LIST PROPERTY
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-8 h-8", isScrolled || pathname !== '/' ? "text-[#002147]" : "text-white")} />
          ) : (
            <Menu className={cn("w-8 h-8", isScrolled || pathname !== '/' ? "text-[#002147]" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-[#002147] hover:text-[#C5A059]"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="bg-[#002147] text-white w-full py-6 font-bold">
              CONTACT US
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;