"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "starter",
    title: "The Starter System",
    subtitle: "Complete Reusable Kit",
    price: "$89",
    image: "/images/product-dispenser.jpg",
  },
  {
    id: "hardware",
    title: "Reusable Dispenser",
    subtitle: "Permanent Canister Hardware",
    price: "$58",
    image: "/images/behind-scenes-lab.jpg",
  },
  {
    id: "refills",
    title: "Colour Refills",
    subtitle: "Dual-Chamber Cartridge",
    price: "$32",
    image: "/images/model-silver.jpg",
  },
];

export function SystemCategories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth > 0) {
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveIndex(Math.max(0, Math.min(CATEGORIES.length - 1, index)));
    }
  }, []);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  const prev = () => {
    const newIdx = activeIndex === 0 ? CATEGORIES.length - 1 : activeIndex - 1;
    scrollToCard(newIdx);
  };

  const next = () => {
    const newIdx = activeIndex === CATEGORIES.length - 1 ? 0 : activeIndex + 1;
    scrollToCard(newIdx);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 3-Card Carousel: One-Line Swipeable on Mobile, 3-Col on Desktop */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-1 sm:left-2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur border border-ash/40 text-obsidian hover:bg-obsidian hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-95"
          aria-label="Previous Category"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Horizontal Scroll / Grid Container */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl items-center overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 sm:pb-0 px-2 sm:px-0"
        >
          {CATEGORIES.map((cat, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={cat.id}
                onClick={() => scrollToCard(idx)}
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 text-center group cursor-pointer shadow-lg bg-toc shrink-0 snap-center w-[82vw] max-w-[340px] md:w-auto h-[400px] sm:h-[440px] ${
                  isCenter
                    ? "md:scale-105 border-white/20 md:h-[500px] z-10"
                    : "border-white/10 opacity-95 hover:opacity-100 hover:border-white/30"
                }`}
              >
                {/* Photographic Background */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Luxury Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-300" />

                {/* Clean, Minimal Card Content */}
                <div className="relative z-10 space-y-1.5 sm:space-y-2">
                  <h3 className="font-headline font-bold text-xl sm:text-2xl uppercase tracking-wider text-white">
                    {cat.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs font-mono text-platinum/80 tracking-wider uppercase">
                    {cat.subtitle} • {cat.price}
                  </p>

                  <div className="pt-2 sm:pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/90 group-hover:text-white group-hover:underline">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-1 sm:right-2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur border border-ash/40 text-obsidian hover:bg-obsidian hover:text-white transition-all flex items-center justify-center shadow-lg active:scale-95"
          aria-label="Next Category"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Mobile Dot Indicators */}
      <div className="flex md:hidden items-center justify-center gap-1.5 mt-5">
        {CATEGORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              activeIndex === i ? "w-6 bg-obsidian" : "w-1.5 bg-obsidian/30"
            }`}
            aria-label={`Go to category ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
