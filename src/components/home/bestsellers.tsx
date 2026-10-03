"use client";

import React from "react";
import Link from "next/link";
import { Plus, ArrowRight, Star } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";
import { ShadeItem } from "@/components/sections/hero-section";

const BESTSELLER_ITEMS = [
  {
    id: "best-ash-blond",
    name: "Ash Blond #1903 Starter Duo",
    category: "Cool Nordic • 100% Gray Coverage",
    price: 89,
    shadeHex: "#C9A77D",
    shadeCode: "#1903",
    rating: 4.9,
    reviews: 142,
  },
  {
    id: "best-natural-brunette",
    name: "Natural Brunette #2401 Kit",
    category: "Neutral Espresso • In-Shower",
    price: 89,
    shadeHex: "#432E20",
    shadeCode: "#2401",
    rating: 5.0,
    reviews: 218,
  },
  {
    id: "best-refill-bundle",
    name: "6-Month Refill Allocation",
    category: "4x 50ml Aluminum Pods",
    price: 59,
    shadeHex: "#1A1A1E",
    shadeCode: "#0802",
    rating: 4.8,
    reviews: 96,
  },
  {
    id: "best-precision-dock",
    name: "Magnetic Shower Mount & Wand",
    category: "Induction Drying Tool",
    price: 24,
    shadeHex: "#949FA3",
    shadeCode: "#TOOL",
    rating: 4.9,
    reviews: 84,
  },
];

export function Bestsellers({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  return (
    <section id="bestsellers" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          SALON PROVEN
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          BESTSELLERS
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {BESTSELLER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between cursor-pointer space-y-4"
          >
            {/* Image Portrait Box */}
            <div className="relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-b from-midnight via-steel/30 to-obsidian border border-brand/50 overflow-hidden flex items-center justify-center p-6 group-hover:border-platinum/60 transition-all duration-300">
              {/* Reviews rating pill */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian/80 backdrop-blur border border-brand/50 text-[10px] font-mono text-platinum">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{item.rating}</span>
                <span className="text-ash/60">({item.reviews})</span>
              </div>

              <div className="absolute top-4 right-4 z-10 opacity-30 group-hover:opacity-70 transition-opacity">
                <SnoutIcon className="w-4 h-4" color="#CED1D0" />
              </div>

              {/* Graphic Representation */}
              <div className="w-full flex flex-col items-center justify-center space-y-3">
                <div
                  className="w-20 h-36 rounded-2xl border border-white/10 shadow-2xl flex flex-col justify-between items-center py-3 relative overflow-hidden transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(180deg, #1e293b 0%, ${item.shadeHex} 100%)`,
                  }}
                >
                  <div className="w-12 h-6 rounded bg-slate-300 shadow-sm" />
                  <div className="w-2 h-16 rounded-full bg-white/40 shadow-inner" />
                  <span className="text-[7px] font-mono tracking-widest text-white/80 uppercase">
                    MK-1
                  </span>
                </div>
              </div>

              {/* Quick Add Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.({
                    code: item.shadeCode,
                    name: item.name,
                    hex: item.shadeHex,
                    undertone: item.category,
                  });
                }}
                className="absolute bottom-4 left-4 right-4 py-3 rounded-xl bg-platinum text-obsidian text-xs font-headline font-bold uppercase tracking-wider opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Dispatch • ${item.price}</span>
              </button>
            </div>

            {/* Meta */}
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-mono text-ash uppercase tracking-wider block">
                {item.category}
              </span>
              <h3 className="font-headline font-semibold text-sm text-platinum group-hover:text-white transition-colors">
                {item.name}
              </h3>
              <p className="font-mono text-xs text-platinum font-medium pt-0.5">
                ${item.price} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-platinum border-b border-platinum/60 pb-1 hover:border-white hover:text-white transition-all"
        >
          <span>VIEW ALL BESTSELLERS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
