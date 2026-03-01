import { MadeWithDyad } from "@/components/made-with-dyad";
import Navbar from "@/components/Navbar";
import GeneratorForm from "@/components/GeneratorForm";
import { Sparkles, ShieldCheck, Zap, Ghost } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-violet-500/30">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold tracking-widest uppercase animate-fade-in">
            <Sparkles className="w-3 h-3" /> Unbound & Uncensored
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Write Without <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Boundaries.</span>
          </h1>
          
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            The world's first truly uncensored AI writer. No filters, no lectures, no limits. 
            Powered by privacy-first models and Monero.
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-green-500" /> No Logs
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Ghost className="w-4 h-4 text-violet-500" /> Anonymous Auth
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Zap className="w-4 h-4 text-orange-500" /> Instant XMR Unlock
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="max-w-6xl mx-auto">
          <GeneratorForm />
        </div>
      </main>

      <footer className="border-t border-white/5 py-12 bg-black/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">U</div>
            UNBOUND
          </div>
          <div className="text-zinc-500 text-sm">
            © 2024 Unbound AI. Built for the free thinkers.
          </div>
          <MadeWithDyad />
        </div>
      </footer>
    </div>
  );
}