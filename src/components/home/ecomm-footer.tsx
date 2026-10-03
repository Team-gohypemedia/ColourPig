"use client";

import React, { useState } from "react";
import { ColourpigLogo, SnoutIcon } from "@/components/brand/logo";
import { ArrowRight, Check } from "lucide-react";

export function EcommFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="border-t border-brand bg-black text-ash py-20 px-6 sm:px-10 lg:px-14 font-mono text-xs">
      <div className="max-w-[1600px] mx-auto space-y-16">
        {/* Top Newsletter & Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-4">
            <ColourpigLogo color="#FFFFFF" className="h-6" />
            <p className="text-ash/80 text-xs font-body font-light leading-relaxed max-w-sm">
              The world&apos;s first reusable, air-driven precision hair colour system by Norman &amp; Brown. Eliminating 90% of product waste and 75% of plastic.
            </p>
            <span className="text-[10px] text-ash/60 tracking-widest block">
              NORMAN &amp; BROWN PRECISION LABS • EST. 2025
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="font-headline font-bold text-sm uppercase tracking-wider text-platinum block">
              Join The Airheads Community
            </span>
            <p className="text-xs font-light text-ash max-w-md">
              Receive formulation drop releases, technical laboratory dispatches, and priority refill allocations.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-obsidian border border-brand text-white placeholder:text-ash/50 text-xs focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-white text-black font-headline font-bold text-xs uppercase tracking-wider hover:bg-platinum transition-colors flex items-center gap-1.5"
              >
                <span>{subscribed ? "Enrolled" : "Join"}</span>
                {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </form>
          </div>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-headline font-bold uppercase tracking-wider text-white block">
              Collections
            </span>
            <ul className="space-y-2 text-ash/80">
              <li><a href="#system" className="hover:text-white transition-colors">The Starter System</a></li>
              <li><a href="#shades" className="hover:text-white transition-colors">Refill Dual-Pods</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">Micro-Chamber Wand</a></li>
              <li><a href="#bestsellers" className="hover:text-white transition-colors">Bestseller Bundles</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-headline font-bold uppercase tracking-wider text-white block">
              The Science
            </span>
            <ul className="space-y-2 text-ash/80">
              <li><a href="#engineering" className="hover:text-white transition-colors">Air-Compression Tech</a></li>
              <li><a href="#shades" className="hover:text-white transition-colors">Shade Formulary</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Zero-Waste Audit</a></li>
              <li><a href="#system" className="hover:text-white transition-colors">In-Shower Ritual</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-headline font-bold uppercase tracking-wider text-white block">
              Norman &amp; Brown
            </span>
            <ul className="space-y-2 text-ash/80">
              <li><a href="#about" className="hover:text-white transition-colors">Salon Mastery</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Ian Norman Story</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Airheads Archive</a></li>
              <li><a href="#press" className="hover:text-white transition-colors">Press &amp; Editorial</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-headline font-bold uppercase tracking-wider text-white block">
              Client Service
            </span>
            <ul className="space-y-2 text-ash/80">
              <li>30-Day In-Shower Trial</li>
              <li>Global Express Dispatch</li>
              <li>Order Tracking</li>
              <li>FAQ &amp; Concierge</li>
            </ul>
          </div>
        </div>

        {/* Bottom Palette and Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-ash/70">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-ash/50 mr-2">
              Brand Palette:
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-obsidian border border-white/20" title="Obsidian #0D151C" />
              <span className="w-3 h-3 rounded-full bg-midnight border border-white/20" title="Midnight #13212E" />
              <span className="w-3 h-3 rounded-full bg-steel border border-white/20" title="Steel #253744" />
              <span className="w-3 h-3 rounded-full bg-graphite border border-white/20" title="Graphite #495B69" />
              <span className="w-3 h-3 rounded-full bg-ash border border-white/20" title="Ash #949FA3" />
              <span className="w-3 h-3 rounded-full bg-platinum border border-white/20" title="Platinum #CED1D0" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SnoutIcon className="w-4 h-4 opacity-40" color="#CED1D0" />
            <span>© 2025 ColourPig by Norman &amp; Brown. Built to last.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
