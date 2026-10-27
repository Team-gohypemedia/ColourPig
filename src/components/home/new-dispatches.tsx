"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { HairSuitabilityModal } from "@/components/modals/hair-suitability-modal";
import { Reveal, RevealCard, RevealImage, RevealLabel, SwapText } from "@/components/motion/motion-primitives";

// Mapping Pantone accent styling for each shade in the collection
const SHADE_PANTONE_TAGS: Record<string, { tag: string; pantoneColor: string }> = {
  "shade-0-0": { tag: "Multi-Use Gloss", pantoneColor: "#374151" },
  "shade-1": { tag: "100% Resistant", pantoneColor: "#374151" },
  "shade-3": { tag: "Deep Velvet", pantoneColor: "#7A431D" },
  "shade-4": { tag: "Most Popular", pantoneColor: "#374151" },
  "shade-5": { tag: "Warm Luminous", pantoneColor: "#E05A47" },
  "shade-6": { tag: "Caramel Depth", pantoneColor: "#C59B27" },
  "shade-7": { tag: "High Demand", pantoneColor: "#374151" },
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
    pantoneColor: "#374151",
    pantoneCode: "123C",
    image: "/Medium Brown/MediumBrown.jpg",
    video: "/Medium Brown/Medium Brown.mp4",
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
    pantoneColor: "#374151",
    pantoneCode: "165C",
    image: "/Medium Blonde/MediumBlonde.jpg",
    video: "/Medium Blonde/Medium Blonde.mp4",
  },
  {
    id: "prod-shade-1",
    name: "No.1 Black System",
    category: "Pure Mineral Jet • 100% Coverage",
    shadeCode: "No.1",
    shadeName: "Black",
    shadeHex: "#2D2C2D",
    price: 89,
    tag: "Intense Pigment",
    pantoneColor: "#374151",
    pantoneCode: "299C",
    image: "/Black/Black.jpg",
    video: "/Black/Black.mp4",
  },
  {
    id: "prod-shade-0-0",
    name: "No.0/0 Clear Gloss System",
    category: "Universal Gloss • Translucent Blending",
    shadeCode: "No.0/0",
    shadeName: "Clear",
    shadeHex: "#F2EFF0",
    price: 89,
    tag: "Multi-Use",
    pantoneColor: "#374151",
    pantoneCode: "2572C",
    image: "/Clear/Clear.jpg",
    video: "/system-exploded-hd.mp4",
  },
];

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const store = useStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Default to Shade 3 (No.3 Brown System)
  const [isSuitabilityOpen, setIsSuitabilityOpen] = useState(false);
  const [suitabilityShade, setSuitabilityShade] = useState<ShadeProduct | null>(null);

  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Position slider to default active Shade 3 on initial page visit
  useEffect(() => {
    const centerDefault = () => {
      const container = sliderRef.current;
      if (!container) return;
      const cards = container.children;
      if (cards[2]) {
        const targetCard = cards[2] as HTMLElement;
        const cardCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
        const containerHalf = container.clientWidth / 2;
        container.scrollLeft = Math.max(0, cardCenter - containerHalf);
      }
    };

    centerDefault();
    const timer = setTimeout(centerDefault, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      
      // Calculate exact scroll position so the target card is dead center
      const cardCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
      const containerHalf = container.clientWidth / 2;
      const targetScrollLeft = Math.max(0, cardCenter - containerHalf);

      isProgrammaticScroll.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 600);

      setActiveIndex(index);

      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
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
    if (isProgrammaticScroll.current) return;

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
      price: 2499,
      image: item.image,
      shadeCode: item.shadeCode,
      shadeHex: item.shadeHex,
    });
  };

  const activeShade = OFFICIAL_SHADES[activeIndex] || OFFICIAL_SHADES[0];

  return (
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-8 lg:px-10 w-full select-none">
      {/* Editorial Heading - Center Aligned */}
      <Reveal className="text-center max-w-7xl mx-auto mb-6 sm:mb-10">
        <h2 className="font-headline font-bold text-[24px] text-obsidian tracking-wider uppercase">
          EXPLORE YOUR SHADE
        </h2>
      </Reveal>

      {/* 1. Pure Circle Shades Slider (No card containers, no white background circles) */}
      {/* Mobile/tablet: full-viewport bleed with a centered card peeking neighbours.
          Laptop/desktop: contained track showing exactly 5 whole shades, no cut-off previews. */}
      <Reveal className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] lg:mx-auto lg:max-w-7xl" amount={0.2} delay={0.15}>
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 sm:gap-10 lg:gap-6 overflow-x-auto scroll-smooth pb-6 pt-3 no-scrollbar snap-x snap-mandatory items-start px-[calc(50%-90px)] sm:px-[calc(50%-110px)] lg:px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {OFFICIAL_SHADES.map((item, idx) => {
            const circleSrc = SHADE_CLEAN_CIRCLES[item.id] || item.swatchImage;
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                className={`group flex-none w-[180px] sm:w-[220px] lg:w-[calc((100%-6rem)/5)] snap-center flex flex-col items-center text-center transition-all duration-300 cursor-pointer py-2 ${
                  isActive ? "scale-105 opacity-100" : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >

                {/* Pure Circular Hair Shade Swatch - Clean Transparent Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="relative block w-36 h-36 sm:w-44 sm:h-44 lg:w-full lg:max-w-48 lg:h-auto lg:aspect-square my-2 rounded-full overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.16)] transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-[0_20px_36px_rgba(0,0,0,0.22)]"
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
                  <h3 className="font-montserrat font-normal text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors truncate">
                    {item.name} System
                  </h3>
                  <p className="font-montserrat font-normal text-xs sm:text-sm text-obsidian">
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
      </Reveal>

      {/* Progress Bar Line Indicator */}
      <div className="w-full max-w-lg mx-auto h-[2px] bg-black/10 rounded-full overflow-hidden mt-6 sm:mt-8">
        <div
          className="h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
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
          SHADE <SwapText value={activeIndex + 1} /> OF {OFFICIAL_SHADES.length}
        </span>

        {/* Dynamic Pagination Pill Dots (Desktop & Tablets) */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
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

      {/* 2. Divider & Header for the 4 Product Cards Grid (Target for Shades nav button) */}
      <div id="shades" className="mt-8 sm:mt-12 pt-3 sm:pt-4 border-t border-ash/30 scroll-mt-[120px]">
        <Reveal className="text-center max-w-xl mx-auto mb-4 sm:mb-6 space-y-1 sm:space-y-1.5">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
            FEATURED DISPATCHES
          </span>
          <h3 className="font-headline font-bold text-xl sm:text-2xl text-obsidian tracking-wider uppercase">
            NEW ARRIVALS
          </h3>
          <div className="w-8 h-[2px] bg-obsidian/30 mx-auto mt-2" />
        </Reveal>

        {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 items-start">
          {NEW_ARRIVALS.map((item, idx) => (
            <RevealCard
              key={item.id}
              index={idx}
              className="group flex flex-col"
            >
              {/* Portrait Image Container with Minimal Corners */}
              <div className="relative aspect-[2/3] max-h-[46vh] sm:max-h-[48vh] xl:max-h-[52vh] w-full rounded-md overflow-hidden bg-white shadow-xs group-hover:shadow-md transition-all duration-300">
                <RevealImage>
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
                </RevealImage>

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
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      store.addToCart({
                        id: `shade-${item.shadeCode.toLowerCase().replace(/^(no\.?|#)/, "").replace("/", "-")}-starter-system`,
                        name: `Colourpig Starter System | ${item.name.replace(/ System$/i, "")}`,
                        variant: item.category,
                        price: 2499,
                        image: item.image,
                        shadeCode: item.shadeCode,
                        shadeHex: item.shadeHex,
                      });
                    }}
                    className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95 cursor-pointer"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="truncate">ADD TO CART</span>
                  </button>
                </div>
              </div>

              {/* Left-Aligned Product Typography below Image */}
              <RevealLabel>
                <Link
                  href={`/product?shade=${item.id.replace("prod-", "")}`}
                  className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block group/link"
                >
                  <p
                    className="font-montserrat !font-normal font-[400] text-xs sm:text-[13px] tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate"
                    style={{ fontWeight: 400 }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="font-montserrat !font-normal font-[400] text-xs sm:text-[13px] text-obsidian"
                    style={{ fontWeight: 400 }}
                  >
                    ${item.price} USD
                  </p>
                </Link>
              </RevealLabel>

              {/* Mobile-Only: Add to Bag button directly on mobile card */}
              <button
                onClick={() =>
                  store.addToCart({
                    id: `shade-${item.shadeCode.toLowerCase().replace(/^(no\.?|#)/, "").replace("/", "-")}-starter-system`,
                    name: `Colourpig Starter System | ${item.name.replace(/ System$/i, "")}`,
                    variant: item.category,
                    price: 2499,
                    image: item.image,
                    shadeCode: item.shadeCode,
                    shadeHex: item.shadeHex,
                  })
                }
                className="sm:hidden mt-2.5 w-full py-2 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO BAG</span>
              </button>
            </RevealCard>
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
