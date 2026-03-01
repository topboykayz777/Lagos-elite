"use client";

import React from 'react';
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Coins, Zap } from 'lucide-react';
import { toast } from 'sonner';

const MONERO_ADDRESS = "44AFFq5kSiGBoZ4NMD2MrA88zkX6W9X3B9iZCcCZiMH3CwSqiTDvAn6Vi8D98G5W9X3B9iZCcCZiMH3CwSqiTDvAn6Vi8D98G5"; // Placeholder

export default function PremiumPage() {
  const [copied, setCopied] = React.useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(MONERO_ADDRESS);
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-12 flex flex-col items-center">
        <div className="max-w-2xl w-full text-center space-y-6 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight">Go <span className="text-violet-500">Unlimited</span></h1>
          <p className="text-muted-foreground text-lg">
            Support the project and unlock unlimited generations for 30 days. 
            We accept Monero (XMR) for total privacy.
          </p>
        </div>

        <Card className="w-full max-w-md border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4">
              <Coins className="text-orange-500 w-6 h-6" />
            </div>
            <CardTitle>Tip to Unlock</CardTitle>
            <CardDescription>Send any amount (min 0.05 XMR) to unlock</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="p-4 bg-white rounded-xl">
              <QRCodeSVG value={MONERO_ADDRESS} size={200} />
            </div>
            
            <div className="w-full space-y-2">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Monero Address</p>
              <div className="flex items-center gap-2 p-3 bg-black/40 rounded-lg border border-white/10">
                <code className="text-[10px] break-all text-zinc-300 flex-1">{MONERO_ADDRESS}</code>
                <Button variant="ghost" size="icon" onClick={copyAddress} className="shrink-0">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="w-full p-4 rounded-lg bg-violet-500/10 border border-violet-500/20 space-y-2">
              <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
                <Zap className="w-4 h-4 fill-current" /> Instant Activation
              </div>
              <p className="text-xs text-zinc-400">
                Once the transaction is confirmed on the blockchain, your account will be automatically upgraded.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}