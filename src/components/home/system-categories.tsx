"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    id: "starter",
    title: "THE STARTER SYSTEM",
    subtitle: "Complete Reusable Kit • $89",
    image: "/images/product-dispenser.jpg",
    link: "/product?shade=shade-4",
    pantone: "123C",
    hex: "#FFC72C",
    badge: "COMPLETE STARTER",
  },
  {
    id: "hardware",
    title: "REUSABLE DISPENSER",
    subtitle: "Permanent Canister Hardware • $58",
    image: "/images/behind-scenes-lab.jpg",
    link: "/product?shade=shade-1",
    pantone: "299C",
    hex: "#00A3E0",
    badge: "PERMANENT HARDWARE",
  },
  {
    id: "refills",
    title: "COLOUR REFILLS",
    subtitle: "Dual-Chamber Cartridge • $32",
    image: "/images/model-silver.jpg",
    link: "/product?shade=shade-7",
    pantone: "1905C",
    hex: "#F08EAB",
    badge: "DUAL-CHAMBER",
  },
  {
    id: "aftercare",
    title: "SALON PRECISION KIT",
    subtitle: "5-Part Application & Care • $28",
    image: "/images/spec_full_aftercare.jpg",
    link: "/product?shade=shade-4",
    pantone: "375C",
    hex: "#7AC142",
    badge: "PRECISION KIT",
  },
  {
    id: "atelier",
    title: "ATELIER FORMULATION",
    subtitle: "Norman & Brown Sydney • Custom Pigments",
    image: "/images/model-brunette.jpg",
    link: "/product?shade=shade-2",
    pantone: "165C",
    hex: "#FF671F",
    badge: "SYDNEY ATELIER",
  },
];

const AUTOPLAY_DURATION_MS = 5000; // 5 seconds per slide phase

export function SystemCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Maximum scroll index
  // Desktop shows 3 items side-by-side, so max index is COLLECTIONS.length - 2
  const totalSlides = isMobile ? COLLECTIONS.length : Math.max(1, COLLECTIONS.length - 2);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  // Continuous accurate loading phase indicator
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / AUTOPLAY_DURATION_MS) * 100);

      if (pct >= 100) {
        clearInterval(interval);
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      } else {
        setProgress(pct);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [activeIndex, totalSlides]);

  return (
    <section
      id="system"
      className="py-12 sm:py-16 md:py-20 w-full select-none overflow-hidden"
    >
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 px-4 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Main Banner Slider Container (100% Full-Bleed End-to-End) */}
      <div className="relative w-full overflow-hidden">
        {/* Sliding Track */}
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: isMobile
              ? `translateX(-${activeIndex * 100}%)`
              : `translateX(-${activeIndex * (100 / 3)}%)`,
            gap: "4px", // Hairline 4px gap matching Image 1
          }}
        >
          {COLLECTIONS.map((cat, idx) => (
            <div
              key={cat.id}
              className="relative shrink-0 overflow-hidden group bg-toc h-[440px] sm:h-[500px] md:h-[540px] lg:h-[600px] xl:h-[640px]"
              style={{
                width: isMobile
                  ? "100%"
                  : "calc(33.33333% - 2.67px)", // Exactly 3 equal cards filling the width with 4px gap
              }}
            >
              <Link href={cat.link} className="block w-full h-full relative">
                {/* Full-Bleed High-Res Editorial Photography */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={idx < 3}
                />

                {/* Bottom Luxury Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Top Subtle Pantone Accent Line */}
                <div
                  className="absolute top-0 inset-x-0 h-1 z-20 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: cat.hex }}
                />

                {/* Bottom Text Matching Image 1 */}
                <div className="absolute bottom-10 sm:bottom-12 inset-x-5 sm:inset-x-7 z-20 space-y-1 sm:space-y-1.5">
                  <h3 className="font-headline font-bold text-lg sm:text-xl md:text-2xl text-white tracking-wider uppercase drop-shadow-sm">
                    {cat.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-white/80 tracking-widest uppercase">
                    <span>{cat.subtitle}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1 text-[#FFC72C]">
                      <span>• EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Floating Indicator Loading Phase (Transparent, No Overlap) */}
        <div className="absolute bottom-3 sm:bottom-3.5 inset-x-0 z-30 flex items-center justify-center pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 bg-transparent p-1">
            {Array.from({ length: totalSlides }).map((_, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="relative flex items-center justify-center transition-all duration-300 cursor-pointer p-0.5"
                >
                  {isActive ? (
                    /* Active indicator: elongated pill with filling loading progress line */
                    <div className="w-10 sm:w-14 h-1 sm:h-1.5 rounded-full bg-white/30 overflow-hidden relative shadow-sm">
                      <div
                        className="h-full bg-[#FFC72C] rounded-full transition-all duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : (
                    /* Inactive indicator: small circle dot */
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/50 hover:bg-white/90 transition-colors shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SystemCategories;
