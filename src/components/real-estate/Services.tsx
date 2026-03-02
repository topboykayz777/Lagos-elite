"use client";

import React from 'react';
import { Building2, Key, TrendingUp, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    title: "Property Sales",
    description: "We help you find and acquire the most prestigious properties in Lagos with full legal transparency.",
    icon: Building2
  },
  {
    title: "Property Management",
    description: "Comprehensive management services for landlords, ensuring high occupancy and maintenance standards.",
    icon: ShieldCheck
  },
  {
    title: "Investment Advisory",
    description: "Data-driven insights to help you make profitable real estate investments in the Nigerian market.",
    icon: TrendingUp
  },
  {
    title: "Leasing Services",
    description: "Connecting premium tenants with luxury residential and commercial spaces across the city.",
    icon: Key
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-white relative">
      {/* Section Demarcation */}
      <div className="absolute left-10 top-32 hidden lg:flex flex-col items-center gap-6">
        <span className="text-[10px] font-black text-[#C5A059] uppercase tracking-[0.5em] vertical-text">03 / CONCIERGE</span>
        <div className="w-px h-32 bg-zinc-100" />
      </div>

      <div className="container mx-auto px-6 lg:pl-32">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Our Expertise</h4>
          <h2 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tighter leading-none">Concierge <br /><span className="text-[#C5A059]">Solutions.</span></h2>
          <p className="text-zinc-500 text-lg font-medium">We provide a full suite of services tailored to the unique needs of the Lagos property market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="p-10 bg-zinc-50 border border-zinc-100 hover:border-[#C5A059] transition-all duration-500 group hover:shadow-2xl"
            >
              <div className="w-20 h-20 bg-white group-hover:bg-[#002147] flex items-center justify-center mb-8 transition-colors duration-500">
                <service.icon className="w-10 h-10 text-[#C5A059]" />
              </div>
              <h3 className="text-2xl font-bold text-[#002147] mb-6 group-hover:text-[#C5A059] transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-500 text-base leading-relaxed font-medium">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;