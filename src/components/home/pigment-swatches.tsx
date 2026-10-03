"use client";

import React from "react";
import { SnoutIcon } from "@/components/brand/logo";

const TEXTURE_CARDS = [
  {
    title: "AIR-DRIVEN DISPERSION",
    subtitle: "Micrometric Viscosity",
    desc: "10-20ml precision droplet formation under 1.4 bar atmospheric pressure.",
  },
  {
    title: "HERMETIC DUO POD",
    subtitle: "50ml + 50ml Isolation",
    desc: "Zero air exposure preserves color molecules without degradation.",
  },
  {
    title: "SIGNATURE SNOUT EMBLEM",
    subtitle: "Brand Geometric Matrix",
    desc: "The universal seal of pigment precision and sustainable care.",
  },
];

export function PigmentSwatches() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          MATERIAL INSPECTION
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          A CLOSER LOOK
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEXTURE_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-midnight border border-brand/50 p-8 h-[340px] flex flex-col justify-between overflow-hidden hover:border-platinum/60 transition-all duration-300"
          >
            {/* Background Texture Pattern */}
            <div className="absolute inset-0 brand-snout-pattern opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" />

            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-xs text-ash tracking-widest uppercase">
                SPEC 0{idx + 1}
              </span>
              <SnoutIcon className="w-5 h-5 opacity-40 group-hover:opacity-90 transition-opacity" color="#CED1D0" />
            </div>

            <div className="space-y-2 z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ash">
                {card.subtitle}
              </span>
              <h3 className="font-headline font-bold text-lg text-platinum">
                {card.title}
              </h3>
              <p className="text-xs font-light text-ash leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
