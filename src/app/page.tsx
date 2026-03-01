import Navbar from "@/components/real-estate/Navbar";
import Hero from "@/components/real-estate/Hero";
import Partners from "@/components/real-estate/Partners";
import Neighborhoods from "@/components/real-estate/Neighborhoods";
import FeaturedProperties from "@/components/real-estate/FeaturedProperties";
import About from "@/components/real-estate/About";
import Services from "@/components/real-estate/Services";
import Agents from "@/components/real-estate/Agents";
import Testimonials from "@/components/real-estate/Testimonials";
import FAQ from "@/components/real-estate/FAQ";
import Footer from "@/components/real-estate/Footer";
import WhatsAppCTA from "@/components/real-estate/WhatsAppCTA";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#C5A059]/30">
      <Navbar />
      
      <main>
        <Hero />
        <Partners />
        <Neighborhoods />
        <FeaturedProperties />
        <About />
        <Services />
        <Agents />
        <Testimonials />
        <FAQ />
        
        {/* CTA Section */}
        <section className="py-20 bg-[#002147] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>
          <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Ready to Find Your <span className="text-[#C5A059]">Elite Home?</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Our expert agents are ready to guide you through the most exclusive property market in Africa.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white px-10 py-4 font-bold transition-all active:scale-95">
                  BOOK A CONSULTATION
                </button>
              </Link>
              <Link href="/properties">
                <button className="border border-white/20 text-white hover:bg-white/10 px-10 py-4 font-bold transition-all">
                  VIEW LISTINGS
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppCTA />
    </div>
  );
}