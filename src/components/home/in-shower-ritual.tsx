"use client";

import React from "react";
import { SnoutIcon } from "@/components/brand/logo";

const RITUAL_STEPS = [
  {
    step: "01",
    title: "MAGNETIC DOCK",
    desc: "Permanently lives in your shower. Always dry, always ready.",
    accent: "#CED1D0",
  },
  {
    step: "02",
    title: "AIR COMPRESSION",
    desc: "Zero propellants. Delivers exact 10-20ml dosing with a single press.",
    accent: "#949FA3",
  },
  {
    step: "03",
    title: "ROOT PRECISION",
    desc: "Targeted wand partitions follicles without messy skin staining.",
    accent: "#495B69",
  },
  {
    step: "04",
    title: "8-WEEK FRESHNESS",
    desc: "Dual chamber prevents oxidation until the exact millisecond of use.",
    accent: "#253744",
  },
];

export function InShowerRitual() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          APPLICATION ARCHITECTURE
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          THE IN-SHOWER RITUAL
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RITUAL_STEPS.map((item) => (
          <div
            key={item.step}
            className="group relative rounded-2xl bg-midnight border border-brand/50 p-6 flex flex-col justify-between h-[360px] overflow-hidden hover:border-platinum/60 transition-all duration-300"
          >
            {/* Step Number Top */}
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-2xl font-black text-platinum/40 group-hover:text-platinum transition-colors">
                {item.step}
              </span>
              <SnoutIcon className="w-4 h-4 opacity-30 group-hover:opacity-80 transition-opacity" color="#CED1D0" />
            </div>

            {/* Central Graphic Element */}
            <div className="w-full flex items-center justify-center my-auto">
              <div
                className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-2xl"
                style={{
                  background: `radial-gradient(circle, ${item.accent}22 0%, transparent 70%)`,
                }}
              >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-platinum/60" />
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="space-y-1.5 z-10 text-center">
              <h3 className="font-headline font-bold text-sm tracking-wider uppercase text-platinum">
                {item.title}
              </h3>
              <p className="text-xs font-light text-ash leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
