"use client";

import React, { useState } from "react";
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? CATEGORIES.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === CATEGORIES.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 3-Card Carousel Container with Arrow Navigation */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-2 sm:left-2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur border border-ash/40 text-obsidian hover:bg-obsidian hover:text-white transition-all flex items-center justify-center shadow-xl active:scale-95"
          aria-label="Previous Category"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl items-center">
          {CATEGORIES.map((cat, idx) => {
            const isCenter = idx === 1;
            return (
              <div
                key={cat.id}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-end p-8 text-center group cursor-pointer shadow-xl bg-toc ${
                  isCenter
                    ? "md:scale-105 border-white/20 h-[500px] z-10"
                    : "border-white/10 h-[440px] opacity-95 hover:opacity-100 hover:border-white/30"
                }`}
              >
                {/* Photographic Background */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle Luxury Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-300" />

                {/* Clean, Minimal Card Content */}
                <div className="relative z-10 space-y-2">
                  <h3 className="font-headline font-bold text-2xl uppercase tracking-wider text-white">
                    {cat.title}
                  </h3>

                  <p className="text-xs font-mono text-platinum/80 tracking-wider uppercase">
                    {cat.subtitle} • {cat.price}
                  </p>

                  <div className="pt-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/90 group-hover:text-white group-hover:underline">
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
          className="absolute -right-2 sm:right-2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur border border-ash/40 text-obsidian hover:bg-obsidian hover:text-white transition-all flex items-center justify-center shadow-xl active:scale-95"
          aria-label="Next Category"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
