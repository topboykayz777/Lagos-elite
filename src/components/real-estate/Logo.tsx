"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo = ({ className, light = false }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-3 group", className)}>
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Outer Shield/Diamond Shape */}
        <div className={cn(
          "absolute inset-0 rotate-45 border-2 transition-all duration-500 group-hover:rotate-[135deg]",
          light ? "border-[#C5A059]" : "border-[#002147]"
        )} />
        {/* Inner Accent Shape */}
        <div className="absolute inset-2 rotate-45 bg-[#C5A059] opacity-20" />
        {/* The 'E' for Elite */}
        <span className={cn(
          "relative text-xl font-black tracking-tighter",
          light ? "text-white" : "text-[#002147]"
        )}>
          L<span className="text-[#C5A059]">E</span>
        </span>
      </div>
      
      <div className="flex flex-col leading-none">
        <span className={cn(
          "text-2xl font-bold tracking-tighter",
          light ? "text-white" : "text-[#002147]"
        )}>
          LAGOS<span className="text-[#C5A059]">ELITE</span>
        </span>
        <span className={cn(
          "text-[10px] uppercase tracking-[0.4em] font-black",
          light ? "text-zinc-400" : "text-zinc-500"
        )}>
          Properties
        </span>
      </div>
    </div>
  );
};

export default Logo;