"use client";

import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Coins, Zap, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const MONERO_ADDRESS = "44AFFq5kSiGBoZ4NMD2MrA88zkX6W9X3B9iZCcCZiMH3CwSqiTDvAn6Vi8D98G5W9X3B9iZCcCZiMH3CwSqiTDvAn6Vi8D98G5";

export default function PremiumPage() {
  const [copied, setCopied] = useState(false);
  const [txId, setTxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(MONERO_ADDRESS);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitTx = async () => {
    if (!txId.trim() || txId.length < 10) {
      toast.error("Please enter a valid Transaction ID or Hash.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Try to sign in anonymously if not already
        const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
        var currentUserId = authData.user?.id;
      } else {
        var currentUserId = user.id;
      }

      const { error } = await supabase.from('premium_requests').insert({
        user_id: currentUserId,
        tx_id: txId,
        status: 'pending'
      });

      if (error) throw error;

      toast.success("Transaction submitted! Verification usually takes 1-6 hours.");
      setTxId("");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center space-y-6 mb-12">
          <h1 className="text-5xl font-black tracking-tighter">Unlock <span className="text-violet-500">The Beast.</span></h1>
          <p className="text-zinc-400 text-lg">
            Unlimited generations. Zero filters. Total privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Card className="border-white/5 bg-white/[0.02] backdrop-blur-md">
            <CardHeader>
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center mb-2">
                <Coins className="text-orange-500 w-5 h-5" />
              </div>
              <CardTitle>Step 1: Send XMR</CardTitle>
              <CardDescription>Scan or copy the address below.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="p-3 bg-white rounded-xl shadow-2xl shadow-orange-500/10">
                <QRCodeSVG value={MONERO_ADDRESS} size={180} />
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-white/10">
                  <code className="text-[10px] break-all text-zinc-400 flex-1">{MONERO_ADDRESS}</code>
                  <Button variant="ghost" size="icon" onClick={copyAddress} className="shrink-0 hover:bg-white/5">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-[10px] text-center text-zinc-500 italic">Minimum tip: 0.05 XMR (~$8)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-violet-500/20 bg-violet-500/[0.02] backdrop-blur-md">
            <CardHeader>
              <div className="w-10 h-10 bg-violet-500/20 rounded-full flex items-center justify-center mb-2">
                <Zap className="text-violet-500 w-5 h-5" />
              </div>
              <CardTitle>Step 2: Verify</CardTitle>
              <CardDescription>Paste your Transaction ID to activate.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-500 uppercase">Transaction ID / Hash</label>
                <Input 
                  placeholder="Paste your XMR hash here..." 
                  className="bg-black/40 border-white/10 h-12"
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleSubmitTx}
                disabled={isSubmitting}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 font-bold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </span>
                ) : "Activate Premium"}
              </Button>
              
              <div className="p-4 rounded-lg bg-white/5 border border-white/5 text-[11px] text-zinc-500 leading-relaxed">
                <p className="font-bold text-zinc-300 mb-1 flex items-center gap-1">
                  <Send className="w-3 h-3" /> How it works:
                </p>
                Once you submit, we check the Monero blockchain. If confirmed, your account is upgraded within 1-6 hours. No email required.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}