"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Github, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter group">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="hidden sm:block">UNBOUND<span className="text-violet-500">AI</span></span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/premium">
            <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/5 font-medium">
              Pricing
            </Button>
          </Link>
          <Link href="/premium">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 font-bold shadow-lg shadow-violet-600/20">
              Go Premium
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;