"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Zap, BookOpen, LayoutDashboard, Settings, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Generate', href: '/', icon: Zap },
    { name: 'Gallery', href: '/gallery', icon: Globe },
    { name: 'Library', href: '/library', icon: BookOpen },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter group">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
            <Zap className="w-6 h-6 text-white fill-current" />
          </div>
          <span className="hidden sm:block">UNBOUND<span className="text-violet-500">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={cn(
                    "rounded-full px-4 gap-2 transition-all",
                    isActive ? "bg-violet-600 text-white hover:bg-violet-700" : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/premium">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full px-6 font-bold shadow-lg shadow-violet-600/20 hidden sm:flex">
              Go Premium
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden text-zinc-400">
            <LayoutDashboard className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;