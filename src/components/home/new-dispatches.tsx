"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { HairSuitabilityModal } from "@/components/modals/hair-suitability-modal";

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

// Clean, transparent circular swatches without white square backgrounds
const SHADE_CLEAN_CIRCLES: Record<string, string> = {
  "shade-0-0": "/images/products/swatches/clean/circle_shade_1.png",
  "shade-1": "/images/products/swatches/clean/circle_shade_2.png",
  "shade-3": "/images/products/swatches/clean/circle_shade_3.png",
  "shade-4": "/images/products/swatches/clean/circle_shade_4.png",
  "shade-5": "/images/products/swatches/clean/circle_shade_5.png",
  "shade-6": "/images/products/swatches/clean/circle_shade_6.png",
  "shade-7": "/images/products/swatches/clean/circle_shade_7.png",
  "shade-8": "/images/products/swatches/clean/circle_shade_8.png",
  "shade-9": "/images/products/swatches/clean/circle_shade_9.png",
};

const NEW_ARRIVALS = [
  {
    id: "prod-shade-4",
    name: "No.4 Medium Brown System",
    category: "Natural Chestnut • Air-Driven Touch Up",
    shadeCode: "No.4",
    shadeName: "Medium Brown",
    shadeHex: "#4E4136",
    price: 89,
    tag: "Most Popular",
    pantoneColor: "#FFC72C",
    pantoneCode: "123C",
    image: "/images/products/cards/shade_card_4.jpg",
  },
  {
    id: "prod-shade-7",
    name: "No.7 Medium Blonde System",
    category: "Warm Golden • Air-Driven Touch Up",
    shadeCode: "No.7",
    shadeName: "Medium Blonde",
    shadeHex: "#BE966C",
    price: 89,
    tag: "High Demand",
    pantoneColor: "#FF671F",
    pantoneCode: "165C",
    image: "/images/products/cards/shade_card_7.jpg",
  },
  {
    id: "prod-shade-2",
    name: "No.1 Black System",
    category: "Pure Mineral Jet • 100% Coverage",
    shadeCode: "No.1",
    shadeName: "Black",
    shadeHex: "#2D2C2D",
    price: 89,
    tag: "Intense Pigment",
    pantoneColor: "#00A3E0",
    pantoneCode: "299C",
    image: "/images/products/cards/shade_card_2.jpg",
  },
  {
    id: "prod-shade-1",
    name: "No.0/0 Clear Gloss System",
    category: "Universal Gloss • Translucent Blending",
    shadeCode: "No.0/0",
    shadeName: "Clear",
    shadeHex: "#F2EFF0",
    price: 89,
    tag: "Multi-Use",
    pantoneColor: "#B584C4",
    pantoneCode: "2572C",
    image: "/images/products/cards/shade_card_1.jpg",
  },
];

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const store = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSuitabilityOpen, setIsSuitabilityOpen] = useState(false);
  const [suitabilityShade, setSuitabilityShade] = useState<ShadeProduct | null>(null);

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

  const handleToggleWishlistProduct = (item: (typeof NEW_ARRIVALS)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      shadeCode: item.shadeCode,
    });
  };

  const activeShade = OFFICIAL_SHADES[activeIndex] || OFFICIAL_SHADES[0];

  return (
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto select-none">
      {/* Editorial Heading */}
      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION • ALL 9 SHADES
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          NEW IN
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Hair Color Suitability Confirmation Banner */}
      <div className="flex items-center justify-center mb-8 sm:mb-10">
        <button
          type="button"
          onClick={() => {
            setSuitabilityShade(activeShade);
            setIsSuitabilityOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-obsidian text-obsidian hover:text-white border border-black/10 shadow-xs text-xs font-mono font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-95 group/btn cursor-pointer"
        >
          <span>Unsure if this shade matches your hair? <strong className="font-bold underline decoration-obsidian/30 underline-offset-2">Check Match</strong></span>
          <ArrowRight className="w-3 h-3 text-graphite group-hover/btn:text-white transition-colors" />
        </button>
      </div>

      {/* 1. Pure Circle Shades Slider (No card containers, no white background circles) */}
      <div className="relative">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 sm:gap-10 overflow-x-auto scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar snap-x snap-mandatory items-start"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {OFFICIAL_SHADES.map((item, idx) => {
            const pantone = SHADE_PANTONE_TAGS[item.id] || { tag: "Permanent", pantoneColor: "#FFC72C" };
            const circleSrc = SHADE_CLEAN_CIRCLES[item.id] || item.swatchImage;
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                className={`group flex-none w-[180px] sm:w-[220px] lg:w-[240px] snap-center flex flex-col items-center text-center transition-all duration-300 cursor-pointer py-2 ${
                  isActive ? "scale-105 opacity-100" : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                {/* Floating Pantone Tag Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-obsidian border border-black/10 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: pantone.pantoneColor }}
                    />
                    <span className="text-obsidian font-bold">{pantone.tag}</span>
                  </span>
                </div>

                {/* Pure Circular Hair Shade Swatch - Clean Transparent Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="relative block w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 my-2 rounded-full overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_20px_36px_rgba(0,0,0,0.22)]"
                >
                  <Image
                    src={circleSrc}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 200px"
                    className="object-cover scale-[1.02]"
                    priority={idx < 4}
                  />
                </Link>

                {/* Typography below Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="mt-4 space-y-1 block group/link"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-black/10"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-[11px] font-mono font-bold text-graphite uppercase">
                      {item.code} • {item.formula}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors truncate">
                    {item.name} System
                  </h3>
                  <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                    ${item.price} USD
                  </p>
                </Link>

                {/* Actions: Suitability Check & View Product */}
                <div className="mt-3 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSuitabilityShade(item);
                      setIsSuitabilityOpen(true);
                    }}
                    className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>CHECK MATCH</span>
                  </button>

                  <Link
                    href={`/product?shade=${item.id.replace("shade-", "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] font-mono font-bold tracking-wider uppercase text-graphite hover:text-obsidian border-b border-graphite/30 hover:border-obsidian transition-colors pb-0.5"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
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

      {/* 2. Divider & Header for the 4 Product Cards Grid */}
      <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-ash/30">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-1.5">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
            FEATURED DISPATCHES
          </span>
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-obsidian tracking-wider uppercase">
            STARTER SYSTEMS
          </h3>
          <div className="w-8 h-[2px] bg-obsidian/30 mx-auto mt-2" />
        </div>

        {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {NEW_ARRIVALS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col"
            >
              {/* Portrait Image Container with Minimal Corners */}
              <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#E2E5E4] shadow-xs group-hover:shadow-md transition-all duration-300">
                <Link
                  href={`/product?shade=${item.id.replace("prod-", "")}`}
                  className="block w-full h-full relative"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                  />
                </Link>

                {/* Top-Left Pantone Tag Badge (High contrast solid pill) */}
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-obsidian backdrop-blur-md border border-black/10 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: item.pantoneColor }}
                    />
                    <span className="text-obsidian font-bold">{item.tag}</span>
                  </span>
                </div>

                {/* Top-Right Circular Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlistProduct(item, e)}
                  className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                    store.isInWishlist(item.id)
                      ? "opacity-100 text-rose-600"
                      : "opacity-80 sm:opacity-0 sm:group-hover:opacity-100 text-obsidian hover:text-black"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5] ${
                      store.isInWishlist(item.id) ? "fill-rose-600 text-rose-600" : ""
                    }`}
                  />
                </button>

                {/* Floating Pill Action Button (Desktop hover only) */}
                <div className="hidden sm:flex absolute bottom-4 inset-x-0 mx-auto z-20 justify-center px-4 pointer-events-none group-hover:pointer-events-auto">
                  <Link
                    href={`/product?shade=${item.id.replace("prod-", "")}`}
                    className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="truncate">VIEW PRODUCT</span>
                  </Link>
                </div>
              </div>

              {/* Left-Aligned Product Typography below Image */}
              <Link
                href={`/product?shade=${item.id.replace("prod-", "")}`}
                className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block group/link"
              >
                <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                  {item.name}
                </h3>
                <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                  ${item.price} USD
                </p>
              </Link>

              {/* Mobile-Only: Add to Bag button directly on mobile card */}
              <button
                onClick={() =>
                  store.addToCart({
                    id: item.id,
                    name: item.name,
                    variant: item.category,
                    price: item.price,
                    image: item.image,
                    shadeCode: item.shadeCode,
                  })
                }
                className="sm:hidden mt-2.5 w-full py-2 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO BAG</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer link to shade finder */}
      <div className="text-center mt-10 sm:mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
        >
          <span>VIEW FULL AIR-DRIVEN SPECS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      {/* Hair Suitability Confirmation Modal */}
      <HairSuitabilityModal
        isOpen={isSuitabilityOpen}
        onClose={() => setIsSuitabilityOpen(false)}
        initialShade={suitabilityShade}
      />
    </section>
  );
}
