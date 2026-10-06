"use client";

import React from "react";
import { SnoutIcon } from "@/components/brand/logo";

const TEXTURE_CARDS = [
  {
    title: "AIR-DRIVEN DISPENSER",
    subtitle: "Dual Chamber System",
    desc: "Proprietary air-compression technology delivers fresh colour cream and developer with a single press.",
    pantone: "299C",
    hex: "#00A3E0",
  },
  {
    title: "50ML + 50ML NET",
    subtitle: "Multiple Touch-Up Uses",
    desc: "Pre-measured dual delivery designed for ongoing root touch-ups without mixing or product waste.",
    pantone: "165C",
    hex: "#FF671F",
  },
  {
    title: "COMPLETE AFTERCARE",
    subtitle: "Shampoo & Conditioner Included",
    desc: "Every kit includes colour cream, developer, gentle stain remover, shampoo, and conditioner.",
    pantone: "375C",
    hex: "#7AC142",
  },
];

export function PigmentSwatches() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          SYSTEM DETAILS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          PRODUCT SPECIFICATIONS
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEXTURE_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="group relative rounded-md bg-white border border-ash/30 p-8 h-[340px] flex flex-col justify-between overflow-hidden hover:border-obsidian hover:shadow-lg transition-all duration-300"
          >
            {/* Top accent stripe */}
            <div
              className="absolute top-0 inset-x-0 h-1 sm:h-1.5 transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: card.hex }}
            />

            {/* Background Texture Pattern */}
            <div className="absolute inset-0 brand-snout-pattern opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-center z-10 pt-1">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border"
                style={{
                  backgroundColor: `${card.hex}15`,
                  color: card.hex,
                  borderColor: `${card.hex}40`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.hex }} />
                SPEC 0{idx + 1} • {card.pantone}
              </span>
              <SnoutIcon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" color={card.hex} />
            </div>

            <div className="space-y-2 z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-graphite font-semibold">
                {card.subtitle}
              </span>
              <h3 className="font-headline font-bold text-lg text-obsidian">
                {card.title}
              </h3>
              <p className="text-xs font-normal text-graphite leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
