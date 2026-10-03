"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "hardware",
    title: "PERMANENT HARDWARE",
    tagline: "Aerospace Chrome Engineering",
    desc: "Built to endure a lifetime. Air-driven compression delivers 10-20ml without aerosols.",
    badge: "Hardware Only • $58",
    image: "/images/behind-scenes-lab.jpg",
  },
  {
    id: "starter",
    title: "THE STARTER SYSTEM",
    tagline: "World's First Air-Driven Kit",
    desc: "Includes permanent MK-1 dispenser, 2x 50ml unoxidized pigment pods, and root touch wand.",
    badge: "Complete System • $89",
    image: "/images/product-dispenser.jpg",
  },
  {
    id: "refills",
    title: "RECYCLABLE PODS",
    tagline: "75% Less Plastic Per Session",
    desc: "Hermetically sealed 50ml + 50ml dual cartridges. 8-week unoxidized freshness in shower.",
    badge: "Refill Duo • $32",
    image: "/images/model-silver.jpg",
  },
];

export function SystemCategories() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? CATEGORIES.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === CATEGORIES.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          SHOP BY CATEGORY
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 3-Card Carousel Container with Arrow Navigation */}
      <div className="relative flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-2 sm:left-2 z-20 w-11 h-11 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-2xl"
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
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col justify-end p-8 text-center group cursor-pointer shadow-2xl bg-toc ${
                  isCenter
                    ? "md:scale-105 border-platinum h-[520px] z-10"
                    : "border-white/10 h-[440px] opacity-90 hover:opacity-100 hover:border-platinum/60"
                }`}
              >
                {/* Real Photographic Background */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette / Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 group-hover:via-black/30 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-3">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
                    {cat.badge}
                  </span>

                  <h3
                    className={`font-headline font-bold uppercase tracking-tight text-white drop-shadow-md ${
                      isCenter ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {cat.title}
                  </h3>

                  <p className="text-xs font-mono text-platinum/90 tracking-wide">
                    {cat.tagline}
                  </p>

                  <p className="text-xs font-light text-ash max-w-xs mx-auto line-clamp-2">
                    {cat.desc}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-headline font-semibold text-white group-hover:underline">
                      <span>Explore Category</span>
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
          className="absolute -right-2 sm:right-2 z-20 w-11 h-11 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center shadow-2xl"
          aria-label="Next Category"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
