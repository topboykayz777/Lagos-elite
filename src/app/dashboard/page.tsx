"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Shield, 
  Zap, 
  History, 
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ stories: 0, premium: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      const { count } = await supabase
        .from('stories')
        .select('*', { count: 'exact', head: true });

      setProfile(user);
      setStats({
        stories: count || 0,
        premium: profileData?.subscription_status === 'active'
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border border-white/5">
            <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-600/40">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">Anonymous <span className="text-violet-400">User</span></h1>
              <p className="text-zinc-500 font-mono text-xs mt-1">{profile?.id || 'Loading...'}</p>
              <div className="flex items-center gap-2 mt-3">
                {stats.premium ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" /> Premium Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">
                    <Shield className="w-3 h-3" /> Free Tier
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Total Stories</CardDescription>
                <CardTitle className="text-4xl font-black">{stats.stories}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-3/4" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Daily Limit</CardDescription>
                <CardTitle className="text-4xl font-black">{stats.premium ? '∞' : '5'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500">Resets in 14 hours</p>
              </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/5">
              <CardHeader className="pb-2">
                <CardDescription className="text-zinc-500 uppercase text-[10px] font-bold tracking-widest">Privacy Score</CardDescription>
                <CardTitle className="text-4xl font-black text-green-500">100%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-zinc-500">No logs, No tracking</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-violet-500" /> Subscription
              </h3>
              <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Current Plan</span>
                    <span className="font-bold">{stats.premium ? 'Unbound Pro' : 'Free'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Payment Method</span>
                    <span className="flex items-center gap-1 font-mono text-xs">
                      <Zap className="w-3 h-3 text-orange-500" /> Monero (XMR)
                    </span>
                  </div>
                  {!stats.premium && (
                    <Button className="w-full bg-violet-600 hover:bg-violet-700 mt-4">
                      Upgrade Now
                    </Button>
                  )}
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" /> Security Notice
              </h3>
              <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-3">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  You are currently using an <span className="text-orange-400 font-bold">Anonymous Session</span>. 
                  If you clear your browser cookies, you will lose access to your library and premium status.
                </p>
                <Button variant="outline" className="w-full border-orange-500/20 text-orange-400 hover:bg-orange-500/10">
                  Backup Session Key
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}