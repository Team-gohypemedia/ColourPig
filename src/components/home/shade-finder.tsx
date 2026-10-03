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
    <section id="shades" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash">
          PIGMENT MATCHING
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-tight uppercase">
          DISCOVER YOUR SHADE
        </h2>
        <div className="w-8 h-[1px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Swatch Carousel Row with 5 items */}
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
                  ? "bg-steel/60 border-platinum shadow-xl scale-102"
                  : "bg-midnight/60 border-brand/40 hover:border-ash"
              }`}
            >
              {/* Swatch circular element */}
              <div
                className="w-16 h-16 rounded-full border border-white/20 shadow-inner flex items-center justify-center relative transition-transform hover:scale-105"
                style={{ backgroundColor: shade.hex }}
              >
                {isSelected ? (
                  <Check className="w-5 h-5 text-white drop-shadow" />
                ) : (
                  <SnoutIcon className="w-5 h-5 opacity-20" color="#FFFFFF" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono text-ash uppercase tracking-wider block">
                  {shade.code}
                </span>
                <h4 className="font-headline font-semibold text-xs text-platinum">
                  {shade.name}
                </h4>
                <p className="text-[9px] font-mono text-ash/80 mt-1 line-clamp-1">
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
