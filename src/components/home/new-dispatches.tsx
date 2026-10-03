"use client";

import React from "react";
import Link from "next/link";
import { SnoutIcon } from "@/components/brand/logo";
import { Plus, ArrowRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  shadeCode: string;
  shadeName: string;
  shadeHex: string;
  price: number;
  tag?: string;
  onAddToCart?: (shade: ShadeItem) => void;
}

const NEW_ARRIVALS = [
  {
    id: "prod-starter-nordic",
    name: "Complete Starter System",
    category: "Permanent Hardware Kit",
    shadeCode: "#1903",
    shadeName: "Ash Blond",
    shadeHex: "#C9A77D",
    price: 89,
    tag: "New Formulation",
  },
  {
    id: "prod-refill-espresso",
    name: "Precision Refill Dual-Pack",
    category: "50ml + 50ml Pods",
    shadeCode: "#2401",
    shadeName: "Natural Brunette",
    shadeHex: "#432E20",
    price: 32,
    tag: "High Demand",
  },
  {
    id: "prod-wand-applicator",
    name: "Micro-Chamber Roots Wand",
    category: "Ergonomic Brush Tool",
    shadeCode: "#0802",
    shadeName: "Obsidian Black",
    shadeHex: "#1A1A1E",
    price: 18,
  },
  {
    id: "prod-starter-russet",
    name: "Auburn Precision System",
    category: "Permanent Hardware Kit",
    shadeCode: "#3204",
    shadeName: "Auburn Russet",
    shadeHex: "#823824",
    price: 89,
    tag: "Limited Batch",
  },
];

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  return (
    <section id="system" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          LABORATORY DISPATCH 01
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          NEW IN
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 4-Card Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {NEW_ARRIVALS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between cursor-pointer space-y-4"
          >
            {/* Image Card Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl bg-gradient-to-b from-midnight via-steel/40 to-obsidian border border-brand/50 overflow-hidden flex items-center justify-center p-6 transition-all duration-300 group-hover:border-platinum/60">
              {/* Badge */}
              {item.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-steel/80 backdrop-blur border border-brand/60 text-[9px] font-mono tracking-wider uppercase text-platinum">
                    {item.tag}
                  </span>
                </div>
              )}

              {/* Watermark Logo */}
              <div className="absolute top-4 right-4 z-10 opacity-30 group-hover:opacity-60 transition-opacity">
                <SnoutIcon className="w-4 h-4" color="#CED1D0" />
              </div>

              {/* Product Visual Mockup */}
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Dispenser Mock / Tube Graphic */}
                <div className="relative w-24 h-48 rounded-xl bg-gradient-to-b from-slate-200 via-slate-400 to-slate-800 p-0.5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                  <div className="w-full h-full rounded-[10px] bg-obsidian flex flex-col justify-between items-center py-4 relative overflow-hidden">
                    {/* Metallic Pump Top */}
                    <div className="w-16 h-8 rounded-md bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 shadow-sm" />
                    
                    {/* Liquid Shade Slit */}
                    <div
                      className="w-2.5 h-24 rounded-full shadow-inner border border-white/20 transition-all duration-300"
                      style={{ backgroundColor: item.shadeHex }}
                    />

                    {/* Logo on Body */}
                    <span className="text-[7px] font-mono tracking-[0.2em] text-ash/80 uppercase">
                      COLOURPIG
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Add Overlay on Hover */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.({
                    code: item.shadeCode,
                    name: item.shadeName,
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

            {/* Product Meta */}
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-mono text-ash uppercase tracking-wider block">
                {item.shadeName} ({item.shadeCode})
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

      {/* View All Dispatches Button */}
      <div className="text-center mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-platinum border-b border-platinum/60 pb-1 hover:border-white hover:text-white transition-all"
        >
          <span>VIEW ALL DISPATCHES</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
