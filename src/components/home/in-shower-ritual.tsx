"use client";

import React from "react";
import Image from "next/image";
import { SnoutIcon } from "@/components/brand/logo";

const RITUAL_STEPS = [
  {
    step: "01",
    title: "DISPENSE",
    pantone: "165C",
    pantoneName: "Tangerine",
    hex: "#FF671F",
    desc: "Press the canister to release pre-measured dual formulas evenly into the tray.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "02",
    title: "APPLY",
    pantone: "299C",
    pantoneName: "Cyan",
    hex: "#00A3E0",
    desc: "Use the precision brush to target roots and regrowth evenly.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "03",
    title: "DEVELOP",
    pantone: "375C",
    pantoneName: "Lime",
    hex: "#7AC142",
    desc: "Allow 30 minutes for permanent, rich grey coverage.",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "04",
    title: "RINSE & WIPE",
    pantone: "2572C",
    pantoneName: "Lilac",
    hex: "#B584C4",
    desc: "Rinse thoroughly with shampoo and conditioner, then wipe hairline.",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=800&q=80",
  },
];

export function InShowerRitual() {
  return (
    <section className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          HOW IT WORKS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          THE 4-STEP RITUAL
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {RITUAL_STEPS.map((item) => (
          <div
            key={item.step}
            className="group relative rounded-md bg-white border border-ash/30 p-3 sm:p-5 flex flex-col justify-between h-auto min-h-[300px] sm:min-h-[380px] overflow-hidden hover:border-obsidian hover:shadow-lg transition-all duration-300"
          >
            {/* Colored Top Accent Stripe */}
            <div
              className="absolute top-0 inset-x-0 h-1 sm:h-1.5 transition-all duration-300 group-hover:h-2"
              style={{ backgroundColor: item.hex }}
            />

            {/* Step Number & Pantone Tag Top */}
            <div className="flex justify-between items-center z-10 pt-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="font-mono text-base sm:text-lg font-black transition-colors"
                  style={{ color: item.hex }}
                >
                  {item.step}
                </span>
                <span
                  className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${item.hex}15`,
                    color: item.hex,
                    borderColor: `${item.hex}40`,
                  }}
                >
                  {item.pantone}
                </span>
              </div>
              <SnoutIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-30 group-hover:opacity-100 transition-opacity" color={item.hex} />
            </div>

            {/* Photographic Image Frame */}
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden my-2 sm:my-3 shadow-xs bg-[#EAECEB]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Meta */}
            <div className="space-y-1 z-10 text-center">
              <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian truncate">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs font-normal text-graphite leading-relaxed line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
