"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";

// Mapping Pantone accent styling for each shade in the collection
const SHADE_PANTONE_TAGS: Record<string, { tag: string; pantoneColor: string }> = {
  "shade-0-0": { tag: "Multi-Use Gloss", pantoneColor: "#B584C4" },
  "shade-1": { tag: "100% Resistant", pantoneColor: "#00A3E0" },
  "shade-3": { tag: "Deep Velvet", pantoneColor: "#7A431D" },
  "shade-4": { tag: "Most Popular", pantoneColor: "#FFC72C" },
  "shade-5": { tag: "Warm Luminous", pantoneColor: "#E05A47" },
  "shade-6": { tag: "Caramel Depth", pantoneColor: "#C59B27" },
  "shade-7": { tag: "High Demand", pantoneColor: "#FF671F" },
  "shade-8": { tag: "Sunlit Clarity", pantoneColor: "#F4C430" },
  "shade-9": { tag: "Platinum Shine", pantoneColor: "#D8C0B0" },
};

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const store = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      targetCard.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  }, []);

  const scrollPrev = () => {
    const prevIndex = activeIndex === 0 ? OFFICIAL_SHADES.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  };

  const scrollNext = () => {
    const nextIndex = activeIndex >= OFFICIAL_SHADES.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIndex);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    const targetCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const diff = Math.abs(cardCenter - targetCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const handleToggleWishlist = (item: ShadeProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist({
      id: `prod-${item.id}`,
      name: `${item.name} System`,
      category: `${item.undertone} • Air-Driven Touch Up`,
      price: item.price,
      image: item.cardImage,
      shadeCode: item.code,
    });
  };

  const activeShade = OFFICIAL_SHADES[activeIndex] || OFFICIAL_SHADES[0];

  return (
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto select-none">
      {/* Header with Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION • ALL 9 SHADES
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          NEW IN
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Horizontal Slider for all 9 Products */}
      <div className="relative">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {OFFICIAL_SHADES.map((item, idx) => {
            const pantone = SHADE_PANTONE_TAGS[item.id] || { tag: "Permanent", pantoneColor: "#FFC72C" };
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                className={`group flex-none w-[230px] sm:w-[280px] lg:w-[310px] snap-center flex flex-col transition-all duration-300 cursor-pointer ${
                  isActive ? "scale-[1.01]" : "opacity-95"
                }`}
              >
                {/* Portrait Image Container */}
                <div
                  className={`relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-[#E2E5E4] transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-obsidian/30 shadow-md"
                      : "shadow-xs group-hover:shadow-md"
                  }`}
                >
                  <Link
                    href={`/product?shade=${item.id.replace("shade-", "")}`}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={item.cardImage}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 230px, (max-width: 1024px) 280px, 310px"
                      className="object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                    />
                  </Link>

                  {/* Top-Left Pantone Tag Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-obsidian backdrop-blur-md border border-black/10 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                      <span
                        className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: pantone.pantoneColor }}
                      />
                      <span className="text-obsidian font-bold">{pantone.tag}</span>
                    </span>
                  </div>

                  {/* Top-Right Circular Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(item, e)}
                    className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                      store.isInWishlist(`prod-${item.id}`)
                        ? "opacity-100 text-rose-600"
                        : "opacity-80 sm:opacity-0 sm:group-hover:opacity-100 text-obsidian hover:text-black"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5] ${
                        store.isInWishlist(`prod-${item.id}`) ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                  </button>

                  {/* Floating Pill Action Button */}
                  <div className="hidden sm:flex absolute bottom-4 inset-x-0 mx-auto z-20 justify-center px-4 pointer-events-none group-hover:pointer-events-auto">
                    <Link
                      href={`/product?shade=${item.id.replace("shade-", "")}`}
                      className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span className="truncate">VIEW PRODUCT</span>
                    </Link>
                  </div>
                </div>

                {/* Product Info below image */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="mt-3 space-y-1 text-left block group/link"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-[11px] font-mono font-bold text-graphite uppercase">
                      {item.code} • {item.formula}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                    {item.name} System
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                    ${item.price} USD
                  </p>
                </Link>

                {/* Mobile Add to Bag */}
                <button
                  onClick={() =>
                    store.addToCart({
                      id: `prod-${item.id}`,
                      name: `${item.name} System`,
                      variant: `${item.undertone} • Air-Driven Touch Up`,
                      price: item.price,
                      image: item.cardImage,
                      shadeCode: item.code,
                      shadeHex: item.hex,
                    })
                  }
                  className="sm:hidden mt-2.5 w-full py-2 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bar Line Indicator */}
      <div className="w-full max-w-lg mx-auto h-[2px] bg-black/10 rounded-full overflow-hidden mt-6 sm:mt-8">
        <div
          className="h-full transition-all duration-500 ease-out rounded-full"
          style={{
            width: `${((activeIndex + 1) / OFFICIAL_SHADES.length) * 100}%`,
            backgroundColor: activeShade.hex || "#111827",
          }}
        />
      </div>

      {/* Slider Footer Navigation Bar (Step Counter + Dots + Arrow Controls) */}
      <div className="flex items-center justify-between mt-5 px-1 max-w-4xl mx-auto">
        {/* Step Indicator */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-graphite font-semibold">
          SHADE {activeIndex + 1} OF {OFFICIAL_SHADES.length}
        </span>

        {/* Dynamic Pagination Pill Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {OFFICIAL_SHADES.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "24px" : "7px",
                  backgroundColor: item.hex || "#111827",
                  opacity: isActive ? 1 : 0.35,
                }}
                aria-label={`Jump to shade ${item.code}`}
              />
            );
          })}
        </div>

        {/* Prev / Next Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={scrollPrev}
            className="h-8 w-8 rounded-md bg-white border border-ash/80 hover:bg-obsidian hover:text-white text-obsidian flex items-center justify-center active:scale-95 transition-all shadow-2xs cursor-pointer"
            aria-label="Previous shade"
          >
            <ChevronLeft className="w-4 h-4 pointer-events-none" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="h-8 w-8 rounded-md bg-white border border-ash/80 hover:bg-obsidian hover:text-white text-obsidian flex items-center justify-center active:scale-95 transition-all shadow-2xs cursor-pointer"
            aria-label="Next shade"
          >
            <ChevronRight className="w-4 h-4 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Footer link to shade finder */}
      <div className="text-center mt-10 sm:mt-12">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
        >
          <span>VIEW FULL AIR-DRIVEN SPECS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
