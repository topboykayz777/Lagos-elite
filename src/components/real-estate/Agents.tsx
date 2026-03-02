"use client";

import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

const AGENTS = [
  {
    name: "Tunde Williams",
    role: "Senior Property Consultant",
    image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Sarah Adeyemi",
    role: "Luxury Listing Specialist",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Chidi Okafor",
    role: "Investment Advisor",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop"
  }
];

const Agents = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Our Experts</h4>
          <h2 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tighter leading-none">The Elite <br /><span className="text-[#C5A059]">Team.</span></h2>
          <p className="text-zinc-500 text-lg font-medium">Dedicated professionals with deep knowledge of the Nigerian property market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="group">
              <div className="relative h-[600px] overflow-hidden mb-8">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[#002147]/95 backdrop-blur-sm flex justify-center gap-10">
                  <Phone className="w-6 h-6 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                  <Mail className="w-6 h-6 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                  <Instagram className="w-6 h-6 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#002147]">{agent.name}</h3>
                <p className="text-xs text-[#C5A059] font-black uppercase tracking-[0.3em] mt-2">{agent.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;