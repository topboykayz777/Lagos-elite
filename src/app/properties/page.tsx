import React, { Suspense } from 'react';
import Navbar from "@/components/real-estate/Navbar";
import Footer from "@/components/real-estate/Footer";
import PropertiesContent from "@/components/real-estate/PropertiesContent";
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-40 pb-32">
        <Suspense fallback={
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-[#C5A059] animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loading Elite Portfolio...</p>
          </div>
        }>
          <PropertiesContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}