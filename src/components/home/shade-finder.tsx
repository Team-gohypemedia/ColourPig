"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";

export function ShadeFinder({
  onSelectShade,
}: {
  onSelectShade?: (shade: ShadeItem) => void;
}) {
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(OFFICIAL_SHADES[3]); // Default No.4 Medium Brown

  return (
    <section id="shades" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          9-SHADE PRECISION SYSTEM
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          DISCOVER YOUR SHADE
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 9-Swatch Grid with High-Res Hair Texture Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {OFFICIAL_SHADES.map((shade) => {
          const isSelected = selectedShade.id === shade.id;
          return (
            <div
              key={shade.id}
              onClick={() => {
                setSelectedShade(shade);
                onSelectShade?.({
                  code: shade.code,
                  name: shade.name,
                  hex: shade.hex,
                  undertone: shade.category,
                });
              }}
              className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-3 ${
                isSelected
                  ? "bg-platinum/50 border-obsidian shadow-lg scale-105"
                  : "bg-white border-ash/30 hover:border-obsidian/60 hover:shadow-md"
              }`}
            >
              {/* Swatch circular element with real hair texture */}
              <div className="w-16 h-16 rounded-full border-2 border-white shadow-md relative overflow-hidden transition-transform hover:scale-105 bg-[#EAECEB]">
                <Image
                  src={shade.swatchImage}
                  alt={shade.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white drop-shadow" />
                  </div>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono text-graphite uppercase tracking-wider block font-semibold">
                  {shade.code}
                </span>
                <h4 className="font-headline font-bold text-xs text-obsidian line-clamp-1">
                  {shade.name.replace(/No\.\S+\s*/, '')}
                </h4>
                <div
                  className="w-3 h-3 rounded-full mx-auto mt-1.5 border border-black/10 shadow-xs"
                  style={{ backgroundColor: shade.hex }}
                  title={shade.hex}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Active Shade Details Drawer */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-platinum/40 border border-ash/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white bg-white">
          <Image
            src={selectedShade.cardImage}
            alt={selectedShade.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-obsidian text-white uppercase tracking-wider font-semibold">
              Formula {selectedShade.formula}
            </span>
            <span className="text-[10px] font-mono text-graphite uppercase tracking-wider font-semibold">
              Hex {selectedShade.hex}
            </span>
          </div>
          <h3 className="font-headline font-bold text-lg sm:text-xl text-obsidian uppercase">
            {selectedShade.name}
          </h3>
          <p className="text-xs text-graphite leading-relaxed">
            {selectedShade.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            onSelectShade?.({
              code: selectedShade.code,
              name: selectedShade.name,
              hex: selectedShade.hex,
              undertone: selectedShade.category,
            })
          }
          className="shrink-0 px-6 py-3 rounded-full bg-obsidian hover:bg-black text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
        >
          Select Shade
        </button>
      </div>
    </section>
  );
}
