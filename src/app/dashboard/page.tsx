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
  AlertCircle,
  Copy,
  Check,
  Key,
  Download,
  TrendingUp,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import IdentityTags from '@/components/dashboard/IdentityTags';

interface UserStats {
  stories: number;
  premium: boolean;
  score: number;
  identity: string[];
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<UserStats>({ 
    stories: 0, 
    premium: false, 
    score: 0, 
    identity: [] as string[] 
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
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

        const isPremium = profileData?.subscription_status === 'active';
        const storyCount = count || 0;
        
        // Calculate dynamic score: Base 500 + 10 per story + 500 if premium
        const calculatedScore = 500 + (storyCount * 10) + (isPremium ? 500 : 0);

        setProfile(user);
        setStats({
          stories: storyCount,
          premium: isPremium,
          score: profileData?.sovereign_score || calculatedScore,
          identity: (profileData?.identity as string[]) || ['Autonomy', 'Truth', 'Discipline']
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const copyKey = () => {
    if (!profile?.id) return;
    navigator.clipboard.writeText(profile.id);
    setCopied(true);
    toast.success("Recovery key copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const updateIdentity = async (newIdentity: string[]) => {
    if (!profile) return;
    const { error } = await supabase
      .from('profiles')
      .update({ identity: newIdentity })
      .eq('id', profile.id);
    
    if (error) {
      toast.error("Failed to update identity");
    } else {
      setStats(prev => ({ ...prev, identity: newIdentity } as UserStats));
      toast.success("Identity updated");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Zap className="w-8 h-8 text-violet-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 p-8 rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 border border-white/5">
            <div className="w-20 h-20 bg-violet-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-600/40 shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-black tracking-tighter">Anonymous <span className="text-violet-400">User</span></h1>
              <p className="text-zinc-500 font-mono text-xs mt-1">Session Active • {profile?.id?.substring(0, 8)}</p>
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
            <div className="text-right hidden md:block">
              <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Sovereign Score</div>
              <div className="text-4xl font-black text-violet-400 flex items-center justify-end gap-2">
                {stats.score} <TrendingUp className="w-5 h-5 text-green-500" />
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
                  <div className="h-full bg-violet-500" style={{ width: `${Math.min(stats.stories * 10, 100)}%` }} />
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
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Key className="w-5 h-5 text-violet-500" /> Session Recovery
                </h3>
                <Card className="bg-white/[0.02] border-white/5 overflow-hidden">
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      This is your unique recovery key. Save it somewhere safe. If you clear your browser data, you'll need this to restore your library.
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-black/40 rounded-xl border border-white/10">
                      <code className="text-[10px] font-mono text-violet-400 flex-1 truncate">
                        {profile?.id || 'Loading...'}
                      </code>
                      <Button variant="ghost" size="icon" onClick={copyKey} className="shrink-0 hover:bg-white/5">
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              <IdentityTags 
                tags={stats.identity} 
                editable 
                onAdd={(tag) => updateIdentity([...stats.identity, tag])}
                onRemove={(tag) => updateIdentity(stats.identity.filter(t => t !== tag))}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" /> Security Notice
              </h3>
              <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/10 space-y-4">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  You are currently using an <span className="text-orange-400 font-bold">Anonymous Session</span>. 
                  We do not store your IP, email, or identity. Your stories are encrypted and tied to your recovery key.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full border-orange-500/20 text-orange-400 hover:bg-orange-500/10 gap-2">
                    <Download className="w-4 h-4" /> Export All Data
                  </Button>
                  <Button variant="ghost" className="w-full text-zinc-500 hover:text-red-400 text-xs">
                    Destroy Session & Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}