"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What documents do I need to verify a property in Lagos?",
    a: "Key documents include the Certificate of Occupancy (C of O), Governor's Consent, Registered Survey Plan, and the Deed of Assignment. We assist all our clients in conducting thorough due diligence at the Land Registry."
  },
  {
    q: "Do you handle property management for Nigerians in the diaspora?",
    a: "Yes, a large percentage of our clients are based abroad. We provide full-service management including tenant vetting, rent collection, and maintenance reporting via our digital portal."
  },
  {
    q: "What is the difference between 'Freehold' and 'Leasehold' land?",
    a: "Freehold land is free from government acquisition, while Leasehold usually refers to land held under a 99-year lease from the government (common with C of O properties)."
  },
  {
    q: "How long does the closing process take?",
    a: "For outright purchases, closing can take between 7 to 21 days depending on the speed of documentation and verification. We strive to make it as seamless as possible."
  }
];

const FAQ = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="space-y-8">
            <h4 className="text-[#C5A059] font-bold uppercase tracking-[0.4em] text-[10px]">Common Questions</h4>
            <h2 className="text-5xl md:text-7xl font-bold text-[#002147] tracking-tighter leading-none">Everything You <br /><span className="text-[#C5A059]">Need to Know.</span></h2>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              Buying or selling property in Nigeria can be complex. We've compiled the most frequent questions our clients ask to help you make informed decisions.
            </p>
          </div>
          
          <div className="bg-[#F8F9FA] p-12 border border-zinc-100">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200 py-2">
                  <AccordionTrigger className="text-left font-bold text-xl text-[#002147] hover:text-[#C5A059] hover:no-underline py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-500 text-base leading-relaxed font-medium pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;