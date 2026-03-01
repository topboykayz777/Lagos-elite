"use client";

import React from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

const AGENTS = [
  {
    name: "Tunde Williams",
    role: "Senior Property Consultant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Sarah Adeyemi",
    role: "Luxury Listing Specialist",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Chidi Okafor",
    role: "Investment Advisor",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1974&auto=format&fit=crop"
  }
];

const Agents = () => {
  return (
    <section className="py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Our Experts</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002147]">Meet the Elite Team</h2>
          <p className="text-zinc-500">Dedicated professionals with deep knowledge of the Nigerian property market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="group">
              <div className="relative h-[450px] overflow-hidden mb-6">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-[#002147]/90 backdrop-blur-sm flex justify-center gap-6">
                  <Phone className="w-5 h-5 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                  <Mail className="w-5 h-5 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                  <Instagram className="w-5 h-5 text-[#C5A059] cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#002147]">{agent.name}</h3>
                <p className="text-sm text-[#C5A059] font-bold uppercase tracking-widest mt-1">{agent.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Agents;