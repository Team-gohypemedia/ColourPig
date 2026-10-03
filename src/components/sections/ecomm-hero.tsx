"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { DispenserWrapper } from "@/components/canvas/dispenser-wrapper";
import { useCart } from "@/context/cart-context";
import { CircularSeal, SnoutEmblem } from "@/components/brand/brand-logo";
import { ArrowRight, Check, Droplets, ShieldCheck, Sparkles } from "lucide-react";

export interface ShadeOption {
  code: string;
  name: string;
  hex: string;
  category: string;
  undertone: string;
}

export const SHADES: ShadeOption[] = [
  {
    code: "#1903",
    name: "Ash Blond",
    hex: "#C9A77D",
    category: "Blonde",
    undertone: "Cool Nordic",
  },
  {
    code: "#2401",
    name: "Natural Brunette",
    hex: "#432E20",
    category: "Brunette",
    undertone: "Neutral Espresso",
  },
  {
    code: "#0802",
    name: "Obsidian Black",
    hex: "#1A1A1E",
    category: "Deep",
    undertone: "Pure Mineral",
  },
  {
    code: "#3204",
    name: "Auburn Russet",
    hex: "#823824",
    category: "Red",
    undertone: "Warm Copper",
  },
  {
    code: "#1105",
    name: "Platinum Silver",
    hex: "#D2D6DC",
    category: "Light",
    undertone: "Ultra Pure",
  },
  {
    code: "#2712",
    name: "Mochaccino",
    hex: "#5C4433",
    category: "Brunette",
    undertone: "Rich Cocoa",
  },
];

export function EcommHero() {
  const [selectedShade, setSelectedShade] = useState<ShadeOption>(SHADES[0]);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddStarterKit = () => {
    addItem({
      id: `starter-kit-${selectedShade.code.replace("#", "")}`,
      name: "Colourpig Starter System",
      shadeName: selectedShade.name,
      shadeCode: selectedShade.code,
      shadeHex: selectedShade.hex,
      price: 89,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="relative pt-6 pb-20 px-6 max-w-7xl mx-auto border-b border-brand/50">
      {/* Editorial Watermark Stamp */}
      <div className="absolute top-8 right-8 hidden lg:block opacity-60">
        <CircularSeal className="w-28 h-28" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Product Information & DTC Purchase Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-6"
        >
          {/* Status label following DO'S Talking Rules */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-steel/60 border border-brand text-[11px] font-mono uppercase tracking-widest text-ash">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              World&apos;s First Air-Driven System
            </span>
            <span className="text-xs font-mono text-ash/80">Est. 2025</span>
          </div>

          {/* Slogan from Page 32 */}
          <h1 className="font-headline font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter text-platinum leading-[1.05]">
            Single-use <br />
            <span className="text-ash font-light italic">is over.</span>
          </h1>

          {/* Narrative from Brand Guide Page 3 */}
          <p className="text-ash text-base sm:text-lg leading-relaxed max-w-xl font-light">
            Colourpig by Norman &amp; Brown is the world&apos;s first reusable, air-driven precision hair colour system. Engineered from first principles to eliminate 90% of product waste and 75% of plastic.
          </p>

          {/* Shade Selection Matrix */}
          <div className="p-5 rounded-2xl bg-midnight/80 border border-brand space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-ash uppercase tracking-wider">
                Select Your Precision Shade
              </span>
              <span className="text-platinum font-semibold">
                {selectedShade.name} ({selectedShade.code})
              </span>
            </div>

            {/* Shade Swatches */}
            <div className="grid grid-cols-6 gap-2.5">
              {SHADES.map((shade) => {
                const isSelected = selectedShade.code === shade.code;
                return (
                  <button
                    key={shade.code}
                    onClick={() => setSelectedShade(shade)}
                    className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? "border-platinum bg-steel/60 shadow-lg"
                        : "border-brand/40 bg-obsidian/40 hover:border-ash"
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full shadow-inner border border-white/20 mb-1.5 relative flex items-center justify-center transition-transform group-hover:scale-105"
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

            <div className="flex items-center justify-between text-[11px] font-mono text-ash/80 pt-1 border-t border-brand/40">
              <span>Undertone: {selectedShade.undertone}</span>
              <span>10-20ml Precision Dosing</span>
            </div>
          </div>

          {/* Price & Purchase Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={handleAddStarterKit}
              className="flex-1 py-4 px-6 rounded-xl bg-platinum text-obsidian font-headline font-bold text-sm tracking-wider uppercase hover:bg-white active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl"
            >
              <span>{added ? "Dispatched to Bag" : "Order Starter System — $89"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-ash px-4 py-2 border border-brand/50 rounded-xl bg-midnight/40">
              <ShieldCheck className="w-4 h-4 text-ash" />
              <span>30-Day Guarantee</span>
            </div>
          </div>

          {/* Technical Specs Ticker from Brand Rules */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand/50 font-mono text-left">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-platinum tracking-tight">90%</p>
              <p className="text-[11px] text-ash uppercase tracking-wider mt-0.5">
                Less Waste
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-platinum tracking-tight">75%</p>
              <p className="text-[11px] text-ash uppercase tracking-wider mt-0.5">
                Less Plastic
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-platinum tracking-tight">8 Wks</p>
              <p className="text-[11px] text-ash uppercase tracking-wider mt-0.5">
                Shower Life
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive 3D Model with Real-Time Shade Reflection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-6 relative flex flex-col items-center"
        >
          <div className="w-full relative rounded-3xl bg-gradient-to-b from-midnight/80 to-obsidian border border-brand/70 overflow-hidden shadow-2xl">
            {/* Top specs badge on canvas */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian/80 border border-brand text-[11px] font-mono text-ash">
              <SnoutEmblem className="w-4 h-4" color="#CED1D0" />
              <span>Dispenser Model MK-1 • 50ml + 50ml Dual Pod</span>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded bg-steel/70 text-[10px] font-mono text-platinum uppercase tracking-widest border border-brand">
                Interactive 3D
              </span>
            </div>

            {/* 3D Dispenser Canvas */}
            <DispenserWrapper
              shadeColor={selectedShade.hex}
              shadeCode={selectedShade.code}
            />

            {/* Bottom guide info */}
            <div className="p-4 bg-obsidian/90 border-t border-brand flex items-center justify-between text-xs font-mono text-ash">
              <span>Drag to rotate 360°</span>
              <span>Active Pigment: {selectedShade.name}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
