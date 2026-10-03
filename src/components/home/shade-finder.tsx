"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";

export function ShadeFinder({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(OFFICIAL_SHADES[3]); // Default No.4 Medium Brown
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [added, setAdded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Landing animation: smoothly sweeps 50% -> 25% -> 75% -> 50% on mount
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2200; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth oscillating sine wave
      const offset = Math.sin(progress * Math.PI * 2) * 26;
      setSliderPos(50 + offset);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setSliderPos(50);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Stop auto-animation if user interacts
  const stopAutoAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPos(percentage);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    stopAutoAnimation();
    setIsDragging(true);
    handlePointerMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    stopAutoAnimation();
    setIsDragging(true);
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handlePointerMove(e.clientX);
      }
    };

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleWindowMouseMove);
      window.addEventListener("mouseup", handleWindowMouseUp);
      window.addEventListener("touchmove", handleWindowTouchMove);
      window.addEventListener("touchend", handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
      window.removeEventListener("touchmove", handleWindowTouchMove);
      window.removeEventListener("touchend", handleWindowMouseUp);
    };
  }, [isDragging, handlePointerMove]);

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
      <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          REAL TRANSFORMATION • 100% GREY COVERAGE
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          BEFORE &amp; AFTER COMPARISON
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Main Split Grid: Left = Before/After Slider, Right = 9 Case Shades Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
        {/* Left Column: Interactive Before & After Slider */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={() => setSliderPos(50)}
            className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden border border-black/10 shadow-2xl bg-[#0F141A] select-none cursor-ew-resize group"
            style={{ touchAction: "none" }}
          >
            {/* Ambient Lighting Aura matching active shade */}
            <div
              className="absolute -inset-10 opacity-30 blur-3xl transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: selectedShade.hex }}
            />

            {/* 1. AFTER Image (Base Layer - Flawless ColourPig Shade) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                key={selectedShade.id}
                src={selectedShade.modelImage}
                alt={`${selectedShade.name} After`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center pointer-events-none transition-opacity duration-300"
              />
            </div>

            {/* 2. BEFORE Image (Clipped Overlay Layer - Grey Regrowth / Untreated) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <Image
                src="/images/hologram/model_before_grey.jpg"
                alt="Before - Natural Grey Roots"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center pointer-events-none"
              />
            </div>

            {/* BEFORE Badge (Top Left) */}
            <div className="absolute top-5 left-5 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-md">
                BEFORE
              </span>
            </div>

            {/* AFTER Badge (Top Right) */}
            <div className="absolute top-5 right-5 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white uppercase shadow-md">
                AFTER
              </span>
            </div>

            {/* Vertical Divider Line with Drag Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none transition-transform duration-75"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Orange / Accent Line */}
              <div className="w-[3px] h-full bg-[#E86C3F] shadow-[0_0_10px_rgba(232,108,63,0.8)] -translate-x-1/2" />

              {/* Circular Drag Handle with <> Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E86C3F] border-2 border-white shadow-xl flex items-center justify-center text-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <span className="text-xs font-black tracking-tighter select-none">
                  &lt;&gt;
                </span>
              </div>
            </div>

            {/* Bottom Meta Overlay */}
            <div className="absolute bottom-5 inset-x-5 z-20 flex items-center justify-between pointer-events-none">
              <div className="px-3.5 py-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[9px] font-mono text-white/60 uppercase tracking-widest block">
                  Active Shade
                </span>
                <span className="text-xs font-headline font-bold text-white uppercase tracking-wider">
                  {selectedShade.name} ({selectedShade.code})
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/15">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <span className="text-[10px] font-mono text-white/90 font-medium">
                  Formula {selectedShade.formula}
                </span>
              </div>
            </div>
          </div>

          {/* Under Slider Caption */}
          <div className="w-full flex items-center justify-between mt-3 text-[11px] font-mono text-graphite px-2">
            <span>Drag divider • Double-click to snap 50%</span>
            <span className="text-[#E86C3F] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>100% Verified Coverage</span>
            </span>
          </div>
        </div>

        {/* Right Column: Case 01 to Case 09 Grid (Reference Style) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-sm tracking-wider uppercase text-obsidian">
                SELECT SHADE CASE
              </h3>
              <span className="text-xs font-mono text-graphite">
                9 Formulations
              </span>
            </div>

            {/* 3x3 Grid of Case Shades */}
            <div className="grid grid-cols-3 gap-3">
              {OFFICIAL_SHADES.map((shade, idx) => {
                const isSelected = selectedShade.id === shade.id;
                const caseNumber = `Case 0${idx + 1}`;
                return (
                  <div
                    key={shade.id}
                    onClick={() => {
                      setSelectedShade(shade);
                      stopAutoAnimation();
                    }}
                    className={`p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col items-center text-center space-y-1.5 group/card ${
                      isSelected
                        ? "bg-white border-[#E86C3F] shadow-lg ring-2 ring-[#E86C3F]/20 scale-102"
                        : "bg-white/80 border-ash/30 hover:border-obsidian/40 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    {/* Swatch circular element */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/10 relative shadow-inner bg-[#EAECEB]">
                      <Image
                        src={shade.swatchImage}
                        alt={shade.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <span className="text-[10px] font-mono text-[#E86C3F] font-bold block">
                        {caseNumber}
                      </span>
                      <h4 className="font-headline font-bold text-[11px] text-obsidian line-clamp-1">
                        {shade.name.replace(/No\.\S+\s*/, "")}
                      </h4>
                      <span className="text-[9px] font-mono text-graphite block">
                        {shade.code}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Shade Order Drawer */}
          <div className="p-5 rounded-2xl bg-white border border-ash/30 shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full border border-black/10 shadow-xs shrink-0"
                style={{ backgroundColor: selectedShade.hex }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-headline font-bold text-sm text-obsidian uppercase truncate">
                  {selectedShade.name} System
                </h4>
                <p className="text-[11px] font-mono text-graphite">
                  Formula {selectedShade.formula} • Reusable Air-Driven Kit
                </p>
              </div>
              <span className="font-mono text-sm font-bold text-obsidian">
                ${selectedShade.price} USD
              </span>
            </div>

            <p className="text-xs text-graphite leading-relaxed line-clamp-2">
              {selectedShade.description}
            </p>

            <button
              type="button"
              onClick={handleAddCurrentShade}
              className="w-full py-3 px-6 rounded-full bg-obsidian hover:bg-black text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{added ? "Added to Bag" : `Add ${selectedShade.code} to Bag — $${selectedShade.price}`}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
