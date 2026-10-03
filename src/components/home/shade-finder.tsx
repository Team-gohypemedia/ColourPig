"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
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

  // Smooth landing preview sweep: 50% -> 25% -> 75% -> 50%
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const offset = Math.sin(progress * Math.PI * 2) * 24;
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
    <section id="shades" className="py-10 sm:py-14 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-1">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-medium">
          RESULTS
        </span>
        <h2 className="font-headline font-bold text-xl sm:text-2xl lg:text-3xl text-obsidian tracking-wider uppercase">
          BEFORE &amp; AFTER
        </h2>
      </div>

      {/* Main Split Grid: Perfectly sized to fit within laptop viewports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Interactive Before & After Slider */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onDoubleClick={() => setSliderPos(50)}
            className="relative w-full max-w-[360px] aspect-[3/4] max-h-[460px] rounded-2xl overflow-hidden border border-black/10 shadow-lg bg-[#0F141A] select-none cursor-ew-resize group"
            style={{ touchAction: "none" }}
          >
            {/* 1. AFTER Image (Clean Portrait with selected shade) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                key={selectedShade.id}
                src={selectedShade.modelImage}
                alt={`${selectedShade.name} After`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center pointer-events-none transition-opacity duration-300"
              />
            </div>

            {/* 2. BEFORE Image (Clipped Overlay - Natural Grey Roots) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <Image
                src="/images/hologram/model_before_grey.jpg"
                alt="Before - Natural Regrowth"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-center pointer-events-none"
              />
            </div>

            {/* BEFORE Badge */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono font-medium tracking-widest text-white uppercase shadow-sm">
                BEFORE
              </span>
            </div>

            {/* AFTER Badge */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono font-medium tracking-widest text-white uppercase shadow-sm">
                AFTER
              </span>
            </div>

            {/* Vertical Divider Line with Drag Handle */}
            <div
              className="absolute top-0 bottom-0 z-30 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Minimal White Line */}
              <div className="w-[2px] h-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.5)] -translate-x-1/2" />

              {/* Minimal Circular Drag Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-obsidian shadow-lg border border-black/10 flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform">
                <span className="text-[10px] font-mono font-bold tracking-tight select-none">
                  &lt;&gt;
                </span>
              </div>
            </div>
          </div>

          {/* Under Slider Caption */}
          <div className="w-full max-w-[360px] flex items-center justify-between mt-2.5 text-[10px] font-mono text-graphite/80 px-1">
            <span>Drag slider to compare</span>
            <span>Root Regrowth vs. Finish</span>
          </div>
        </div>

        {/* Right Column: 9 Clean Shade Cards */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4 max-w-[420px] mx-auto lg:mx-0 w-full">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-obsidian">
                SELECT SHADE
              </h3>
              <span className="text-[10px] font-mono text-graphite">
                9 Shades
              </span>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {OFFICIAL_SHADES.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <div
                    key={shade.id}
                    onClick={() => {
                      setSelectedShade(shade);
                      stopAutoAnimation();
                    }}
                    className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col items-center text-center space-y-1.5 group/card ${
                      isSelected
                        ? "bg-white border-obsidian shadow-sm ring-1 ring-obsidian"
                        : "bg-white/80 border-ash/40 hover:border-obsidian/40 hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    {/* Swatch circular element */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-black/10 relative shadow-inner bg-[#EAECEB]">
                      <Image
                        src={shade.swatchImage}
                        alt={shade.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white drop-shadow" />
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <span className="text-[9px] font-mono text-graphite block">
                        {shade.code}
                      </span>
                      <h4 className="font-headline font-semibold text-[11px] text-obsidian truncate">
                        {shade.name.replace(/No\.\S+\s*/, "")}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Shade Order Drawer */}
          <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-ash/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
                  style={{ backgroundColor: selectedShade.hex }}
                />
                <div className="truncate">
                  <h4 className="font-headline font-bold text-xs sm:text-sm text-obsidian uppercase truncate">
                    {selectedShade.name}
                  </h4>
                  <span className="text-[10px] font-mono text-graphite">
                    {selectedShade.category}
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm font-semibold text-obsidian shrink-0">
                ${selectedShade.price}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddCurrentShade}
              className="w-full py-2.5 sm:py-3 px-5 rounded-full bg-obsidian hover:bg-black text-white text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-xs active:scale-98 flex items-center justify-center gap-2"
            >
              <span>{added ? "Added to Bag" : `Add to Bag — $${selectedShade.price}`}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
