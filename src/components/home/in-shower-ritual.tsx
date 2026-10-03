"use client";

import React from "react";
import { SnoutIcon } from "@/components/brand/logo";

const RITUAL_STEPS = [
  {
    step: "01",
    title: "DISPENSE",
    desc: "Press the canister to release pre-measured dual formulas evenly into the tray.",
    accent: "#CED1D0",
  },
  {
    step: "02",
    title: "APPLY",
    desc: "Use the precision brush to target roots and regrowth evenly.",
    accent: "#949FA3",
  },
  {
    step: "03",
    title: "DEVELOP",
    desc: "Allow 30 minutes for permanent, rich grey coverage.",
    accent: "#495B69",
  },
  {
    step: "04",
    title: "RINSE & WIPE",
    desc: "Rinse thoroughly with shampoo and conditioner, then wipe hairline.",
    accent: "#253744",
  },
];

export function InShowerRitual() {
  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          HOW IT WORKS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          THE 4-STEP RITUAL
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {RITUAL_STEPS.map((item) => (
          <div
            key={item.step}
            className="group relative rounded-2xl bg-white border border-ash/30 p-6 flex flex-col justify-between h-[360px] overflow-hidden hover:border-obsidian hover:shadow-xl transition-all duration-300"
          >
            {/* Step Number Top */}
            <div className="flex justify-between items-center z-10">
              <span className="font-mono text-2xl font-black text-obsidian/25 group-hover:text-obsidian transition-colors">
                {item.step}
              </span>
              <SnoutIcon className="w-4 h-4 opacity-30 group-hover:opacity-80 transition-opacity" color="#0D151C" />
            </div>

            {/* Central Graphic Element */}
            <div className="w-full flex items-center justify-center my-auto">
              <div
                className="w-24 h-24 rounded-full border border-black/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-md bg-platinum/30"
              >
                <div className="w-12 h-12 rounded-full border border-ash/40 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-obsidian" />
                </div>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="space-y-1.5 z-10 text-center">
              <h3 className="font-headline font-bold text-sm tracking-wider uppercase text-obsidian">
                {item.title}
              </h3>
              <p className="text-xs font-normal text-graphite leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
