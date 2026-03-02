"use client";

import React from 'react';
import { Building2, TrendingUp, ShieldCheck, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    id: "property-sales",
    title: "Property Sales",
    description: "Bespoke acquisition services for high-net-worth individuals seeking the most prestigious addresses in Nigeria.",
    icon: Building2,
    features: ["Off-Market Access", "Legal Verification", "Price Negotiation"]
  },
  {
    id: "asset-management",
    title: "Asset Management",
    description: "Comprehensive protection and maintenance of your real estate portfolio with institutional-grade reporting.",
    icon: ShieldCheck,
    features: ["Tenant Vetting", "Facility Maintenance", "Rent Optimization"]
  },
  {
    id: "investment-advisory",
    title: "Investment Advisory",
    description: "Data-driven insights and market analysis to help you identify high-yield opportunities in emerging districts.",
    icon: TrendingUp,
    features: ["Yield Analysis", "Market Forecasting", "Portfolio Strategy"]
  },
  {
    id: "relocation-concierge",
    title: "Relocation Concierge",
    description: "Seamless transition services for expatriates and returning Nigerians, covering every aspect of settling in.",
    icon: Globe,
    features: ["School Placement", "Security Advisory", "Utility Setup"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-32 bg-[#002147] text-white overflow-hidden relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 border border-[#C5A059] rounded-full" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] border border-[#C5A059] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Concierge Solutions</h4>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
              Bespoke <br /><span className="text-[#C5A059]">Excellence.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-zinc-400 text-lg font-medium leading-relaxed">
              We provide a full suite of sovereign real estate services tailored to the unique complexities of the Nigerian market, ensuring absolute transparency and peace of mind.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-12 bg-[#002147] hover:bg-[#002a5a] transition-all duration-700 overflow-hidden"
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-[#C5A059] opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center group-hover:bg-[#C5A059] transition-all duration-500">
                    <service.icon className="w-8 h-8 text-[#C5A059] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[40px] font-black text-white/5 group-hover:text-[#C5A059]/20 transition-colors duration-700">0{index + 1}</span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold group-hover:text-[#C5A059] transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium max-w-md">
                    {service.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <Link href={`/services/${service.id}`}>
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059] group/btn">
                      Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;