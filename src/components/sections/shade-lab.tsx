"use client";

import React, { useState } from "react";
import { SHADES, ShadeOption } from "./ecomm-hero";
import { useCart } from "@/context/cart-context";
import { Check, ArrowRight, Sparkles, Filter, Droplet } from "lucide-react";
import { SnoutEmblem } from "@/components/brand/brand-logo";

export function ShadeLab() {
  const [activeShade, setActiveShade] = useState<ShadeOption>(SHADES[0]);
  const [filter, setFilter] = useState<string>("All");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const categories = ["All", "Blonde", "Brunette", "Deep", "Red", "Light"];

  const filteredShades =
    filter === "All"
      ? SHADES
      : SHADES.filter((s) => s.category.toLowerCase() === filter.toLowerCase());

  const handleOrderShade = () => {
    addItem({
      id: `refill-${activeShade.code.replace("#", "")}`,
      name: `Refill Pods (${activeShade.name})`,
      shadeName: activeShade.name,
      shadeCode: activeShade.code,
      shadeHex: activeShade.hex,
      price: 32,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="shades" className="py-24 px-6 max-w-7xl mx-auto border-b border-brand/50">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-ash">
            Norman &amp; Brown Shade Library
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-5xl text-platinum tracking-tight mt-2">
            Precision Pigment <br className="hidden sm:inline" />
            <span className="text-ash font-light italic">Formulations.</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border ${
                filter === cat
                  ? "bg-platinum text-obsidian border-platinum font-semibold"
                  : "bg-midnight text-ash border-brand hover:border-ash"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Grid of Shades */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredShades.map((shade) => {
            const isSelected = activeShade.code === shade.code;
            return (
              <div
                key={shade.code}
                onClick={() => setActiveShade(shade)}
                className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-steel/60 border-platinum shadow-xl"
                    : "bg-midnight/70 border-brand/50 hover:border-ash/40"
                }`}
              >
                <div
                  className="w-full h-24 rounded-xl mb-4 shadow-inner relative flex items-center justify-center border border-white/10"
                  style={{ backgroundColor: shade.hex }}
                >
                  <SnoutEmblem className="w-8 h-8 opacity-20" color="#FFFFFF" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-obsidian/80 backdrop-blur flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-platinum" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-ash font-semibold">
                      {shade.code}
                    </span>
                    <span className="text-[10px] font-mono text-ash/80">
                      {shade.category}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-platinum truncate">
                    {shade.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Active Shade Spec Sheet (mimicking Page 30 Brand Guide) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-midnight border border-brand relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full blur-2xl" style={{ backgroundColor: activeShade.hex }} />
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-ash">
                Formulation Blueprint
              </span>
              <h3 className="font-headline font-black text-2xl text-platinum mt-1">
                {activeShade.name}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono text-ash block">COLOUR CODE</span>
              <span className="font-mono font-bold text-sm text-platinum">
                {activeShade.code}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-mono text-ash">
            <div className="flex justify-between py-2 border-b border-brand/40">
              <span>Undertone Profile</span>
              <span className="text-platinum">{activeShade.undertone}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-brand/40">
              <span>Gray Coverage Index</span>
              <span className="text-platinum">100% Resistant Gray</span>
            </div>
            <div className="flex justify-between py-2 border-b border-brand/40">
              <span>Standard Development Time</span>
              <span className="text-platinum">12 - 15 Minutes</span>
            </div>
            <div className="flex justify-between py-2 border-b border-brand/40">
              <span>Required Dosage</span>
              <span className="text-platinum">10 - 20ml (Roots)</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Compatibility</span>
              <span className="text-platinum">All Hair Textures 1A - 4C</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-brand space-y-3">
            <button
              onClick={handleOrderShade}
              className="w-full py-4 rounded-xl bg-platinum text-obsidian font-headline font-bold text-xs tracking-wider uppercase hover:bg-white transition-all flex items-center justify-center gap-2"
            >
              <span>{added ? "Added to Dispatch Bag" : `Order ${activeShade.name} Refills — $32`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] font-mono text-ash">
              Dual 50ml unoxidized pod capsules • 4-6 touch-up applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
