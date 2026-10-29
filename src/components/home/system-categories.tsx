"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ParallaxLayer, Reveal } from "@/components/motion/motion-primitives";

// Shade families, dark to light, each shown with its product box
const COLLECTIONS = [
  {
    id: "darks",
    title: "DEEP DARKS",
    shadeId: "shade-1",
    image: "/images/products/cards/shade_card_2.jpg",
    link: "/product?shade=shade-1&image=%2Fimages%2Fproducts%2Fcards%2Fshade_card_2.jpg",
    pantone: "123C",
    hex: "#FFFFFF",
    badge: "DEEP DARKS",
  },
  {
    id: "browns",
    title: "RICH BROWNS",
    shadeId: "shade-4",
    image: "/images/products/cards/shade_card_4.jpg",
    link: "/product?shade=shade-4&image=%2Fimages%2Fproducts%2Fcards%2Fshade_card_4.jpg",
    pantone: "299C",
    hex: "#FFFFFF",
    badge: "RICH BROWNS",
  },
  {
    id: "golden-blondes",
    title: "GOLDEN BLONDES",
    shadeId: "shade-7",
    image: "/images/products/cards/shade_card_7.jpg",
    link: "/product?shade=shade-7&image=%2Fimages%2Fproducts%2Fcards%2Fshade_card_7.jpg",
    pantone: "1905C",
    hex: "#FFFFFF",
    badge: "GOLDEN BLONDES",
  },
  {
    id: "light-blondes",
    title: "LIGHT BLONDES",
    shadeId: "shade-9",
    image: "/images/products/cards/shade_card_9.jpg",
    link: "/product?shade=shade-9&image=%2Fimages%2Fproducts%2Fcards%2Fshade_card_9.jpg",
    pantone: "375C",
    hex: "#FFFFFF",
    badge: "LIGHT BLONDES",
  },
  {
    id: "clear",
    title: "CLEAR GLOSS",
    shadeId: "shade-0-0",
    image: "/images/products/cards/shade_card_1.jpg",
    link: "/product?shade=shade-0-0&image=%2Fimages%2Fproducts%2Fcards%2Fshade_card_1.jpg",
    pantone: "165C",
    hex: "#FFFFFF",
    badge: "CLEAR GLOSS",
  },
];

const AUTOPLAY_DURATION_MS = 5000; // 5 seconds per slide phase

export function SystemCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
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
  }, []);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        setActiveIndex((prev) => (prev + 1) % totalSlides);
      } else {
        setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Autoplay is driven by the indicator's own fill animation (one continuous animation per slide,
  // no 25ms state ticks): when the fill completes, advance. Keyed by activeIndex, so any slide change restarts it.
  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  return (
    <section
      id="system"
      className="py-12 sm:py-16 md:py-20 w-full select-none overflow-hidden"
    >
      {/* Title */}
      <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-12 px-4 space-y-1 sm:space-y-1.5">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-obsidian font-semibold">
          SHADE FAMILIES
        </span>
        <h2 className="font-headline font-bold text-[24px] text-obsidian tracking-wider uppercase leading-tight">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-2" />
      </Reveal>

      {/* Main Banner Slider Container (100% Full-Bleed End-to-End) */}
      <div
        className="relative w-full overflow-hidden touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding Track */}
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
              className="relative shrink-0 overflow-hidden group bg-obsidian h-[440px] sm:h-[500px] md:h-[540px] lg:h-[600px] xl:h-[640px]"
              style={{
                width: isMobile
                  ? "100%"
                  : "calc(33.33333% - 2.67px)", // Exactly 3 equal cards filling the width with 4px gap
              }}
            >
              <Link href={cat.link} className="block w-full h-full relative">
                {/* Full-Bleed High-Res Editorial Photography (drifts with the scroll) */}
                <ParallaxLayer>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-105"
                    priority={idx < 3}
                  />
                </ParallaxLayer>


                {/* Top Subtle Pantone Accent Line */}
                <div
                  className="absolute top-0 inset-x-0 h-1 z-20 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: cat.hex }}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Floating Indicator Loading Phase (Transparent, No Overlap) */}
        <div className="absolute bottom-3 sm:bottom-3.5 inset-x-0 z-30 flex items-center justify-center pointer-events-auto">
          <div className="inline-flex items-center gap-2.5 bg-transparent p-1">
            {Array.from({ length: totalSlides }).map((_, i) => {
              const isActive = activeIndex === i;
              // Each indicator carries its banner's Pantone colour
              const hex = COLLECTIONS[i].hex;
              return (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={isActive}
                  className="relative flex items-center justify-center cursor-pointer p-0.5 group/dot"
                >
                  {/* One element morphs between dot and pill, so switching slides glides instead of popping */}
                  <span
                    className={`relative block rounded-full overflow-hidden shadow-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "w-10 sm:w-14 h-1 sm:h-1.5 bg-white/25"
                        : "w-1.5 h-1.5 sm:w-2 sm:h-2 opacity-60 group-hover/dot:opacity-100 group-hover/dot:scale-125"
                    }`}
                    style={isActive ? undefined : { backgroundColor: hex }}
                  >
                    {isActive && (
                      /* Loading fill in the slide's colour; finishing it advances the slider */
                      <motion.span
                        key={activeIndex}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ backgroundColor: hex, boxShadow: `0 0 8px ${hex}` }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: AUTOPLAY_DURATION_MS / 1000, ease: "linear" }}
                        onAnimationComplete={advance}
                      />
                    )}
                  </span>
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
