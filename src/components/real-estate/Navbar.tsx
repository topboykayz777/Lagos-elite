"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

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

  const isDarkText = isScrolled || pathname !== '/';

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
      isScrolled || pathname !== '/' ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo light={!isDarkText} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "text-[11px] uppercase tracking-[0.2em] font-black transition-all hover:text-[#C5A059] relative group",
                isDarkText ? "text-[#002147]" : "text-white",
                pathname === link.href && "text-[#C5A059]"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-full",
                pathname === link.href && "w-full"
              )} />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="tel:+2348000000000" className={cn(
            "flex items-center gap-2 text-xs font-black tracking-widest",
            isDarkText ? "text-[#002147]" : "text-white"
          )}>
            <Phone className="w-4 h-4 text-[#C5A059]" />
            +234 800 000 0000
          </a>
          <Link href="/list-property">
            <Button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white font-black text-[10px] tracking-widest rounded-none px-8 h-12 shadow-lg shadow-[#C5A059]/20">
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
            <X className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} />
          ) : (
            <Menu className={cn("w-8 h-8", isDarkText ? "text-[#002147]" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 p-8 flex flex-col gap-6 md:hidden animate-in slide-in-from-top-5 shadow-2xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-black uppercase tracking-[0.3em] text-[#002147] hover:text-[#C5A059]"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="bg-[#002147] text-white w-full py-7 font-black tracking-widest text-xs rounded-none">
              CONTACT US
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;