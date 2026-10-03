"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";

import { SketchfabHairModel } from "@/components/home/sketchfab-hair-model";

export function ShadeFinder({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(OFFICIAL_SHADES[3]); // Default No.4 Medium Brown
  const [added, setAdded] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "hologram">("3d");

  const handleAddCurrentShade = () => {
    if (onAddToCart) {
      onAddToCart({
        code: selectedShade.code,
        name: selectedShade.name,
        hex: selectedShade.hex,
        undertone: selectedShade.category,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 1800);
    }
  };

  return (
    <section id="shades" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          9-SHADE PRECISION SYSTEM
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          DISCOVER YOUR SHADE
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Interactive Model Viewport Container */}
      <div className="mb-14 flex flex-col items-center">
        {/* View Mode Toggle: 3D Model vs Studio Hologram */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-platinum/60 border border-ash/30 mb-6 shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              viewMode === "3d"
                ? "bg-obsidian text-white shadow-sm"
                : "text-graphite hover:text-obsidian"
            }`}
          >
            3D Hair Model (Orbit)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("hologram")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
              viewMode === "hologram"
                ? "bg-obsidian text-white shadow-sm"
                : "text-graphite hover:text-obsidian"
            }`}
          >
            Studio Hologram
          </button>
        </div>

        <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-3xl overflow-hidden border border-black/10 bg-[#0F141A] shadow-2xl group">
          {viewMode === "3d" ? (
            /* 3D Sketchfab Model with Live Hair Material Tinting */
            <SketchfabHairModel selectedShade={selectedShade} />
          ) : (
            /* Photorealistic Hologram Model Face */
            <>
              {/* Ambient Lighting Aura matching active shade */}
              <div
                className="absolute -inset-10 opacity-35 blur-3xl transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: selectedShade.hex }}
              />

              {/* Model Portrait with Smooth Transition */}
              <div className="relative w-full h-full">
                <Image
                  key={selectedShade.id}
                  src={selectedShade.modelImage}
                  alt={`${selectedShade.name} on Model`}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 440px"
                  className="object-cover object-center transition-all duration-500 ease-out"
                />
              </div>

              {/* Corner Viewfinder Reticles */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none" />

              {/* Top HUD Bar */}
              <div className="absolute top-4 inset-x-5 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE SHADE HOLOGRAM</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/90 font-semibold tracking-wider uppercase">
                  {selectedShade.code}
                </div>
              </div>

              {/* Animated Holographic Laser Scan Line */}
              <div
                key={selectedShade.id}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-75 shadow-[0_0_12px_#38bdf8] pointer-events-none"
                style={{
                  animation: "hologramScan 2.4s ease-in-out infinite",
                }}
              />

              {/* Bottom HUD Bar */}
              <div className="absolute bottom-4 inset-x-5 z-20 flex items-center justify-between pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-left">
                  <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest block">
                    Hair Tone Simulation
                  </span>
                  <span className="text-xs font-headline font-bold text-white uppercase tracking-wider">
                    {selectedShade.name}
                  </span>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
                    style={{ backgroundColor: selectedShade.hex }}
                  />
                  <span className="text-[10px] font-mono text-white/90 font-medium">
                    {selectedShade.hex}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Minimal subtitle under model */}
        <p className="mt-4 text-xs font-mono text-graphite uppercase tracking-widest text-center">
          Select any shade below to update the hair color in real-time
        </p>
      </div>

      {/* 9-Swatch Grid with High-Res Hair Texture Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
        {OFFICIAL_SHADES.map((shade) => {
          const isSelected = selectedShade.id === shade.id;
          return (
            <div
              key={shade.id}
              onClick={() => setSelectedShade(shade)}
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
          onClick={handleAddCurrentShade}
          className="shrink-0 px-6 py-3 rounded-full bg-obsidian hover:bg-black text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <span>{added ? "Added to Bag" : `Add to Bag — $${selectedShade.price}`}</span>
        </button>
      </div>
    </section>
  );
}
