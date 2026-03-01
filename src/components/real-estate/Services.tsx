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
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.2em] text-sm">Our Expertise</h4>
          <h2 className="text-4xl md:text-5xl font-bold text-[#002147]">Comprehensive Real Estate Solutions</h2>
          <p className="text-zinc-500">We provide a full suite of services tailored to the unique needs of the Lagos property market.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="p-8 border border-zinc-100 hover:border-[#C5A059] transition-all duration-500 group hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-[#F8F9FA] group-hover:bg-[#002147] flex items-center justify-center mb-6 transition-colors duration-500">
                <service.icon className="w-8 h-8 text-[#C5A059]" />
              </div>
              <h3 className="text-xl font-bold text-[#002147] mb-4 group-hover:text-[#C5A059] transition-colors">
                {service.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
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