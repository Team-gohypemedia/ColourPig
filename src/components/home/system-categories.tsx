"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "starter",
    title: "The Starter System",
    subtitle: "Complete Reusable Kit",
    price: "$89",
    image: "/images/product-dispenser.jpg",
    link: "/product?shade=shade-4",
    pantone: "123C",
    hex: "#FFC72C",
    badge: "COMPLETE STARTER",
  },
  {
    id: "hardware",
    title: "Reusable Dispenser",
    subtitle: "Permanent Canister Hardware",
    price: "$58",
    image: "/images/behind-scenes-lab.jpg",
    link: "/product?shade=shade-1",
    pantone: "299C",
    hex: "#00A3E0",
    badge: "PERMANENT HARDWARE",
  },
  {
    id: "refills",
    title: "Colour Refills",
    subtitle: "Dual-Chamber Cartridge",
    price: "$32",
    image: "/images/model-silver.jpg",
    link: "/product?shade=shade-7",
    pantone: "1905C",
    hex: "#F08EAB",
    badge: "DUAL-CHAMBER",
  },
];

export function SystemCategories() {
  // Default to index 1 (Reusable Dispenser in the center spotlight)
  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () => {
    setActiveIndex((curr) => (curr === 0 ? CATEGORIES.length - 1 : curr - 1));
  };

  const next = () => {
    setActiveIndex((curr) => (curr === CATEGORIES.length - 1 ? 0 : curr + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 40) {
      next();
    } else if (diff < -40) {
      prev();
    }
    setTouchStart(null);
  };

  // Determine the 3 displayed items: left, center, right
  const leftIdx = (activeIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
  const centerIdx = activeIndex;
  const rightIdx = (activeIndex + 1) % CATEGORIES.length;

  const displayedSlots = [
    { cat: CATEGORIES[leftIdx], slot: "left" },
    { cat: CATEGORIES[centerIdx], slot: "center" },
    { cat: CATEGORIES[rightIdx], slot: "right" },
  ];

  return (
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
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

      {/* Carousel Container with dedicated outer margins for the navigation arrows */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-14 lg:px-16">
        {/* Left Arrow - Positioned in the clean gutter outside the cards */}
        <button
          type="button"
          onClick={prev}
          className="absolute -left-2 sm:left-0 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-obsidian hover:bg-obsidian hover:text-white border border-ash/30 transition-all duration-300 flex items-center justify-center shadow-xl active:scale-95 cursor-pointer"
          aria-label="Previous Category"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Desktop View: 3 Animated Cards (Center is Spotlight) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 items-center justify-items-center">
          {displayedSlots.map(({ cat, slot }) => {
            const isCenter = slot === "center";
            return (
              <div
                key={`${cat.id}-${slot}`}
                onClick={() => {
                  if (slot === "left") prev();
                  else if (slot === "right") next();
                }}
                className={`relative rounded-lg overflow-hidden border transition-all duration-500 flex flex-col justify-end p-7 sm:p-8 text-center group cursor-pointer shadow-lg bg-toc w-full ${
                  isCenter
                    ? "scale-105 border-white/25 h-[500px] z-20 shadow-2xl opacity-100"
                    : "scale-95 border-white/10 h-[430px] z-10 opacity-75 hover:opacity-95 hover:border-white/20"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent transition-all duration-300" />

                {/* Top colored accent stripe */}
                <div
                  className="absolute top-0 inset-x-0 h-1 z-20"
                  style={{ backgroundColor: cat.hex }}
                />

                {/* Card Content */}
                <div className="relative z-10 space-y-2">
                  {/* Category Pantone Badge */}
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-white backdrop-blur-md border border-white/20 text-[9px] font-mono tracking-widest uppercase font-bold shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.hex }} />
                      <span className="text-white font-bold">{cat.badge} • {cat.pantone}</span>
                    </span>
                  </div>

                  <h3 className="font-headline font-bold text-xl sm:text-2xl uppercase tracking-wider text-white">
                    {cat.title}
                  </h3>

                  <p className="text-xs font-mono text-platinum/80 tracking-wider uppercase">
                    {cat.subtitle} • {cat.price}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={cat.link}
                      onClick={(e) => {
                        if (!isCenter) {
                          e.preventDefault();
                          if (slot === "left") prev();
                          else if (slot === "right") next();
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/90 group-hover:text-white group-hover:underline"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Swipeable Single Active Card */}
        <div
          className="md:hidden w-full flex justify-center px-4"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="relative rounded-lg overflow-hidden border border-white/20 transition-all duration-300 flex flex-col justify-end p-6 text-center shadow-xl bg-toc w-[82vw] max-w-[340px] h-[430px]"
          >
            <Image
              src={CATEGORIES[activeIndex].image}
              alt={CATEGORIES[activeIndex].title}
              fill
              sizes="85vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

            {/* Top colored accent stripe */}
            <div
              className="absolute top-0 inset-x-0 h-1 z-20"
              style={{ backgroundColor: CATEGORIES[activeIndex].hex }}
            />

            <div className="relative z-10 space-y-2">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 text-white backdrop-blur-md border border-white/20 text-[9px] font-mono tracking-widest uppercase font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORIES[activeIndex].hex }} />
                  <span className="text-white font-bold">{CATEGORIES[activeIndex].badge} • {CATEGORIES[activeIndex].pantone}</span>
                </span>
              </div>

              <h3 className="font-headline font-bold text-xl uppercase tracking-wider text-white">
                {CATEGORIES[activeIndex].title}
              </h3>

              <p className="text-xs font-mono text-platinum/80 tracking-wider uppercase">
                {CATEGORIES[activeIndex].subtitle} • {CATEGORIES[activeIndex].price}
              </p>

              <div className="pt-2">
                <Link
                  href={CATEGORIES[activeIndex].link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-white/90"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Arrow - Positioned in the clean gutter outside the cards */}
        <button
          type="button"
          onClick={next}
          className="absolute -right-2 sm:right-0 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-obsidian hover:bg-obsidian hover:text-white border border-ash/30 transition-all duration-300 flex items-center justify-center shadow-xl active:scale-95 cursor-pointer"
          aria-label="Next Category"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => setActiveIndex(i)}
            style={{
              backgroundColor: activeIndex === i ? cat.hex : undefined,
            }}
            className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
              activeIndex === i ? "w-8 shadow-sm" : "w-2 bg-obsidian/25 hover:bg-obsidian/50"
            }`}
            aria-label={`Go to category ${cat.title}`}
          />
        ))}
      </div>
    </section>
  );
}
