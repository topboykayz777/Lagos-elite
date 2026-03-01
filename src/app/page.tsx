import Navbar from "@/components/real-estate/Navbar";
import Hero from "@/components/real-estate/Hero";
import FeaturedProperties from "@/components/real-estate/FeaturedProperties";
import About from "@/components/real-estate/About";
import Services from "@/components/real-estate/Services";
import Footer from "@/components/real-estate/Footer";
import WhatsAppCTA from "@/components/real-estate/WhatsAppCTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#C5A059]/30">
      <Navbar />
      
      <main>
        <Hero />
        <FeaturedProperties />
        <About />
        <Services />
        
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
              <button className="bg-[#C5A059] hover:bg-[#b38f4d] text-white px-10 py-4 font-bold transition-all active:scale-95">
                BOOK A CONSULTATION
              </button>
              <button className="border border-white/20 text-white hover:bg-white/10 px-10 py-4 font-bold transition-all">
                VIEW LISTINGS
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppCTA />
    </div>
  );
}