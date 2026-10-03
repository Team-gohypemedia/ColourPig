"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroDispenserWrapper } from "@/components/canvas/hero-dispenser-wrapper";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

export interface ShadeItem {
  code: string;
  name: string;
  hex: string;
  undertone: string;
}

export const CORE_SHADES: ShadeItem[] = [
  {
    code: "No.4",
    name: "Medium Brown",
    hex: "#4E4136",
    undertone: "Natural Chestnut",
  },
  {
    code: "No.1",
    name: "Pure Black",
    hex: "#2D2C2D",
    undertone: "Deep Mineral Jet",
  },
  {
    code: "No.7",
    name: "Medium Blonde",
    hex: "#BE966C",
    undertone: "Warm Golden",
  },
  {
    code: "No.9",
    name: "Very Light Blonde",
    hex: "#E3C8AD",
    undertone: "Champagne Blonde",
  },
  {
    code: "No.0/0",
    name: "Clear Gloss",
    hex: "#F2EFF0",
    undertone: "Translucent Gloss",
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
    <section className="relative w-full h-[calc(100vh-80px)] flex flex-col justify-between px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full blur-[130px] opacity-10 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: activeShade.hex }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
        {/* Left Column: Minimal Typography & Action */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-4 text-left"
        >
          {/* Subtle Tagline */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-ash">
              Air-Driven Precision System • Est. 2025
            </span>
          </div>

          {/* Slogan from Page 32 of Brand Guide */}
          <h1 className="font-headline font-black text-4xl sm:text-5xl xl:text-6xl tracking-tighter text-platinum leading-[1.05]">
            Single-use <br />
            <span className="text-ash font-light italic">is over.</span>
          </h1>

          {/* Brand Narrative from Page 3 */}
          <p className="text-ash text-xs sm:text-sm leading-relaxed max-w-md font-light">
            Colourpig by Norman &amp; Brown is the world&apos;s first reusable, air-driven hair colour system. Eliminating 90% of product waste and 75% of plastic through proprietary air-compression technology.
          </p>

          {/* Clean Inline Shade Selector */}
          <div className="pt-1 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ash">
                Selected Shade:
              </span>
              <span className="text-xs font-mono font-medium text-platinum">
                {activeShade.name} <span className="text-ash">({activeShade.code})</span>
              </span>
            </div>

            {/* Clean Swatch Circles */}
            <div className="flex items-center gap-2.5">
              {CORE_SHADES.map((shade) => {
                const isSelected = activeShade.code === shade.code;
                return (
                  <button
                    key={shade.code}
                    onClick={() => setActiveShade(shade)}
                    className={`relative w-8 h-8 rounded-full transition-all flex items-center justify-center ${
                      isSelected
                        ? "ring-2 ring-platinum ring-offset-2 ring-offset-obsidian scale-110"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: shade.hex }}
                    aria-label={shade.name}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean E-Commerce Action */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleOrder}
              className="py-3 px-6 rounded-xl bg-platinum text-obsidian font-headline font-bold text-xs tracking-wider uppercase hover:bg-white active:scale-[0.99] transition-all flex items-center gap-2 shadow-lg"
            >
              <span>{added ? "Dispatched" : "Order Starter System — $89"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <span className="text-[10px] font-mono text-ash flex items-center gap-1.5 pl-2">
              <ShieldCheck className="w-3.5 h-3.5 text-ash" />
              <span>30-Day Guarantee</span>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Clean Frameless 3D Product Canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-6 h-[340px] sm:h-[400px] lg:h-[460px] w-full relative flex items-center justify-center"
        >
          {/* 3D Dispenser Canvas */}
          <div className="w-full h-full relative">
            <HeroDispenserWrapper shadeHex={activeShade.hex} />
          </div>

          {/* Minimal Drag Notice */}
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-ash/60 uppercase tracking-widest pointer-events-none">
            360° Drag Orbit
          </div>
        </motion.div>
      </div>

      {/* Clean Bottom Ticker Line */}
      <div className="py-3 border-t border-brand/40 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-ash tracking-wider uppercase select-none">
        <span>90% LESS CHEMICAL WASTE</span>
        <span className="hidden sm:inline">•</span>
        <span>75% LESS PLASTIC</span>
        <span className="hidden sm:inline">•</span>
        <span>8-WEEK SHOWER FRESHNESS</span>
        <span className="hidden sm:inline">•</span>
        <span>10-20ML ROOT PRECISION</span>
      </div>
    </section>
  );
}
