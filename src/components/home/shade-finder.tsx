"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { CORE_SHADES, ShadeItem } from "@/components/sections/hero-section";
import { SnoutIcon } from "@/components/brand/logo";

const EXTENDED_LOOKS = [
  ...CORE_SHADES,
  {
    code: "#2712",
    name: "Mochaccino",
    hex: "#5C4433",
    undertone: "Rich Cocoa Depth",
  },
];

export function ShadeFinder({
  onSelectShade,
}: {
  onSelectShade?: (shade: ShadeItem) => void;
}) {
  const [selectedCode, setSelectedCode] = useState(EXTENDED_LOOKS[0].code);

  return (
    <section id="shades" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          PIGMENT MATCHING
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          DISCOVER YOUR SHADE
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Swatch Grid with Ash Grey and Platinum Light Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {EXTENDED_LOOKS.map((shade) => {
          const isSelected = selectedCode === shade.code;
          return (
            <div
              key={shade.code}
              onClick={() => {
                setSelectedCode(shade.code);
                onSelectShade?.(shade);
              }}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-3 ${
                isSelected
                  ? "bg-platinum/50 border-obsidian shadow-lg scale-102"
                  : "bg-white border-ash/30 hover:border-obsidian/60 hover:shadow-md"
              }`}
            >
              {/* Swatch circular element */}
              <div
                className="w-16 h-16 rounded-full border-2 border-white shadow-md flex items-center justify-center relative transition-transform hover:scale-105"
                style={{ backgroundColor: shade.hex }}
              >
                {isSelected ? (
                  <Check className="w-5 h-5 text-white drop-shadow" />
                ) : (
                  <SnoutIcon className="w-5 h-5 opacity-25" color="#FFFFFF" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono text-graphite uppercase tracking-wider block font-semibold">
                  {shade.code}
                </span>
                <h4 className="font-headline font-bold text-xs text-obsidian">
                  {shade.name}
                </h4>
                <p className="text-[9px] font-mono text-graphite/80 mt-1 line-clamp-1">
                  {shade.undertone}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
