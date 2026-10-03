"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroDispenserWrapper } from "@/components/canvas/hero-dispenser-wrapper";
import { SnoutIcon } from "@/components/brand/logo";
import { ArrowRight, Check, ShieldCheck, Sparkles } from "lucide-react";

export interface ShadeItem {
  code: string;
  name: string;
  hex: string;
  undertone: string;
}

export const CORE_SHADES: ShadeItem[] = [
  {
    code: "#1903",
    name: "Ash Blond",
    hex: "#C9A77D",
    undertone: "Cool Nordic",
  },
  {
    code: "#2401",
    name: "Natural Brunette",
    hex: "#432E20",
    undertone: "Neutral Espresso",
  },
  {
    code: "#0802",
    name: "Obsidian Black",
    hex: "#1A1A1E",
    undertone: "Deep Mineral",
  },
  {
    code: "#3204",
    name: "Auburn Russet",
    hex: "#823824",
    undertone: "Warm Copper",
  },
  {
    code: "#1105",
    name: "Platinum Silver",
    hex: "#D2D6DC",
    undertone: "Ultra Pure",
  },
];

interface HeroSectionProps {
  onAddToCart?: (shade: ShadeItem) => void;
}

export function HeroSection({ onAddToCart }: HeroSectionProps) {
  const [activeShade, setActiveShade] = useState<ShadeItem>(CORE_SHADES[0]);
  const [added, setAdded] = useState(false);

  const handleOrder = () => {
    if (onAddToCart) {
      onAddToCart(activeShade);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative w-full lg:h-[calc(100vh-73px)] min-h-[calc(100vh-73px)] flex flex-col justify-between px-6 py-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeShade.hex }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Editorial Brand Headline & Purchase Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-6 space-y-5 text-left"
        >
          {/* Engineering Category Badge */}
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-steel/60 border border-brand text-[10px] font-mono uppercase tracking-widest text-ash">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              World&apos;s First Air-Driven System
            </span>
            <span className="text-[11px] font-mono text-ash/70">Est. 2025</span>
          </div>

          {/* Slogan from Page 32 of Brand Guide */}
          <h1 className="font-headline font-black text-4xl sm:text-6xl xl:text-7xl tracking-tighter text-platinum leading-[1.02]">
            Single-use <br />
            <span className="text-ash font-light italic">is over.</span>
          </h1>

          {/* Precision Narrative from Page 3 */}
          <p className="text-ash text-sm sm:text-base leading-relaxed max-w-lg font-light">
            Colourpig by Norman &amp; Brown is the world&apos;s first reusable, air-driven precision hair colour system. Engineered to eliminate 90% of product waste and 75% of plastic through proprietary air-compression technology.
          </p>

          {/* Interactive Shade Swatch Selector */}
          <div className="p-4 rounded-2xl bg-midnight/80 border border-brand space-y-3 max-w-lg">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-ash uppercase tracking-wider text-[11px]">
                Active Pigment Capsule
              </span>
              <span className="text-platinum font-semibold">
                {activeShade.name} ({activeShade.code})
              </span>
            </div>

            {/* Swatches */}
            <div className="grid grid-cols-5 gap-2">
              {CORE_SHADES.map((shade) => {
                const isSelected = activeShade.code === shade.code;
                return (
                  <button
                    key={shade.code}
                    onClick={() => setActiveShade(shade)}
                    className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? "border-platinum bg-steel/60 shadow-lg scale-102"
                        : "border-brand/40 bg-obsidian/40 hover:border-ash/60"
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner border border-white/20 mb-1 flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-ash truncate w-full text-center">
                      {shade.code}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-ash/80 pt-1 border-t border-brand/40">
              <span>Undertone: {activeShade.undertone}</span>
              <span>10-20ml Precision Dosing</span>
            </div>
          </div>

          {/* Order Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 max-w-lg">
            <button
              onClick={handleOrder}
              className="flex-1 py-3.5 px-6 rounded-xl bg-platinum text-obsidian font-headline font-bold text-xs tracking-wider uppercase hover:bg-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <span>{added ? "Dispatched to Bag" : "Order Starter System — $89"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-ash px-4 py-3 border border-brand/50 rounded-xl bg-midnight/40">
              <ShieldCheck className="w-4 h-4 text-ash" />
              <span>30-Day Guarantee</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Precision Dispenser Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-6 h-[400px] sm:h-[460px] lg:h-[500px] w-full relative rounded-3xl bg-gradient-to-b from-midnight/70 to-obsidian border border-brand/70 overflow-hidden shadow-2xl flex flex-col justify-between"
        >
          {/* Top Canvas Badges */}
          <div className="p-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian/80 backdrop-blur border border-brand text-[10px] font-mono text-ash">
              <SnoutIcon className="w-3.5 h-3.5" color="#CED1D0" />
              <span>Dispenser MK-1 • 50ml + 50ml</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-steel/70 text-[10px] font-mono text-platinum uppercase tracking-widest border border-brand">
              Interactive 3D
            </span>
          </div>

          {/* 3D Dispenser Canvas */}
          <div className="flex-1 w-full h-full relative">
            <HeroDispenserWrapper shadeHex={activeShade.hex} />
          </div>

          {/* Bottom Bar Info */}
          <div className="p-3 bg-obsidian/90 backdrop-blur border-t border-brand flex items-center justify-between text-[11px] font-mono text-ash z-10">
            <span>Drag to rotate 360°</span>
            <span className="text-platinum">
              Active: {activeShade.name} ({activeShade.code})
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Ticker: Data & Verified Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-brand/50 font-mono text-left">
        <div>
          <p className="text-lg sm:text-xl font-bold text-platinum tracking-tight">90%</p>
          <p className="text-[10px] text-ash uppercase tracking-wider">
            Less Waste
          </p>
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold text-platinum tracking-tight">75%</p>
          <p className="text-[10px] text-ash uppercase tracking-wider">
            Less Plastic
          </p>
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold text-platinum tracking-tight">8 Wks</p>
          <p className="text-[10px] text-ash uppercase tracking-wider">
            In-Shower Freshness
          </p>
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold text-platinum tracking-tight">10-20ml</p>
          <p className="text-[10px] text-ash uppercase tracking-wider">
            Precision Dosing
          </p>
        </div>
      </div>
    </section>
  );
}
