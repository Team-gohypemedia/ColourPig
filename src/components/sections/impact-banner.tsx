"use client";

import React, { useState } from "react";
import { SnoutEmblem } from "@/components/brand/brand-logo";
import { ArrowRight, Check } from "lucide-react";

export function ImpactBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section id="impact" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Editorial High-Impact Frame mimicking billboard on Page 32 */}
      <div className="relative rounded-3xl p-8 sm:p-16 bg-gradient-to-br from-steel/60 via-midnight to-obsidian border border-brand/80 overflow-hidden text-center">
        {/* Subtle snout pattern background */}
        <div className="absolute inset-0 brand-snout-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-steel/80 border border-brand text-[11px] font-mono text-platinum uppercase tracking-widest">
            <SnoutEmblem className="w-3.5 h-3.5" color="#CED1D0" />
            <span>Community Dispatch</span>
          </div>

          <h2 className="font-headline font-black text-3xl sm:text-5xl text-platinum tracking-tight leading-tight">
            Join the Airheads.
          </h2>

          <p className="text-ash text-sm sm:text-base font-light leading-relaxed">
            We&apos;re normalizing intelligent hair care without shame or stigma. Receive formulation drop releases, technical laboratory dispatches, and priority refill allocations.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3.5 rounded-xl bg-obsidian border border-brand text-platinum text-xs font-mono placeholder:text-ash/60 focus:outline-none focus:border-platinum transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-platinum text-obsidian font-headline font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 flex-shrink-0"
            >
              <span>{subscribed ? "Enrolled" : "Access Priority"}</span>
              {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

          <p className="text-[11px] font-mono text-ash/70 pt-2">
            Built to last, not just built to sell. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
