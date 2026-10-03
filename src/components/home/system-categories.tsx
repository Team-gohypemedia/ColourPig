"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";

const CATEGORIES = [
  {
    id: "hardware",
    title: "AEROSPACE HARDWARE",
    tagline: "Engineered to endure a lifetime",
    desc: "Permanent chrome dispenser with air-compression pump chamber. 0 aerosol gases.",
    badge: "Hardware Only • $58",
    imageAccent: "#253744",
  },
  {
    id: "starter",
    title: "THE STARTER SYSTEM",
    tagline: "The world's first air-driven kit",
    desc: "Includes the permanent chrome MK-1 dispenser, 2x 50ml unoxidized pigment pods, and root wand.",
    badge: "Complete System • $89",
    imageAccent: "#C9A77D",
  },
  {
    id: "refills",
    title: "RECYCLABLE PODS",
    tagline: "75% less plastic per touch-up",
    desc: "Hermetically sealed 50ml + 50ml dual cartridges. Fresh unoxidized pigment ready in your shower.",
    badge: "Refill Duo • $32",
    imageAccent: "#495B69",
  },
];

export function SystemCategories() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? CATEGORIES.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === CATEGORIES.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          CURATED ESSENTIALS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          THE PRECISION SYSTEM
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 3-Card Carousel Container with Arrow Navigation */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-2 sm:left-4 z-20 w-10 h-10 rounded-full bg-steel/80 border border-brand text-platinum hover:bg-white hover:text-obsidian transition-all flex items-center justify-center shadow-xl"
          aria-label="Previous Category"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl items-center">
          {CATEGORIES.map((cat, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={cat.id}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-end p-8 text-center group cursor-pointer ${
                  isCenter
                    ? "md:scale-105 border-platinum/60 bg-gradient-to-b from-steel/60 via-midnight to-obsidian h-[480px] shadow-2xl z-10"
                    : "border-brand/40 bg-midnight/50 h-[420px] opacity-80 hover:opacity-100 hover:border-ash"
                }`}
              >
                {/* Background graphic motif */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none transition-opacity group-hover:opacity-30"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${cat.imageAccent} 0%, transparent 70%)`,
                  }}
                />

                <div className="absolute top-6 right-6">
                  <SnoutIcon className="w-5 h-5 opacity-30 group-hover:opacity-80 transition-opacity" color="#CED1D0" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full bg-obsidian/70 border border-brand text-[10px] font-mono tracking-wider uppercase text-platinum">
                    {cat.badge}
                  </span>

                  <h3
                    className={`font-headline font-bold uppercase tracking-tight text-white ${
                      isCenter ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {cat.title}
                  </h3>

                  <p className="text-xs font-mono text-ash tracking-wide">
                    {cat.tagline}
                  </p>

                  <p className="text-xs font-light text-ash/80 max-w-xs mx-auto line-clamp-2">
                    {cat.desc}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-headline font-semibold text-platinum group-hover:text-white transition-colors">
                      <span>Explore Configuration</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-2 sm:right-4 z-20 w-10 h-10 rounded-full bg-steel/80 border border-brand text-platinum hover:bg-white hover:text-obsidian transition-all flex items-center justify-center shadow-xl"
          aria-label="Next Category"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
