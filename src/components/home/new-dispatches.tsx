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
    id: "prod-shade-3",
    name: "NO.3 BROWN SYSTEM",
    category: "Dark Espresso • Air-Driven Touch Up",
    shadeCode: "No.3",
    shadeName: "Brown",
    shadeHex: "#241E1C",
    price: 89,
    tag: "Deep Velvet",
    pantoneColor: "#374151",
    pantoneCode: "123C",
    image: "/Brown/Brown.jpg",
    video: "/Brown/Brown.mp4",
  },
  {
    id: "prod-shade-5",
    name: "NO.5 LIGHT BROWN SYSTEM",
    category: "Warm Amber • Air-Driven Touch Up",
    shadeCode: "No.5",
    shadeName: "Light Brown",
    shadeHex: "#624F44",
    price: 89,
    tag: "Warm Luminous",
    pantoneColor: "#374151",
    pantoneCode: "165C",
    image: "/Light Brown/LightBrown01.jpg",
    video: "/Light Brown/Light Brown.mp4",
  },
  {
    id: "prod-shade-6",
    name: "NO.6 DARK BLONDE SYSTEM",
    category: "Deep Honey • Air-Driven Touch Up",
    shadeCode: "No.6",
    shadeName: "Dark Blonde",
    shadeHex: "#755A42",
    price: 89,
    tag: "Caramel Depth",
    pantoneColor: "#374151",
    pantoneCode: "299C",
    image: "/Dark Blonde/DarkBlonde.jpg",
    video: "/Dark Blonde/Dark Blonde.mp4",
  },
  {
    id: "prod-shade-8",
    name: "NO.8 LIGHT BLONDE SYSTEM",
    category: "Luminous Sunlit • Air-Driven Touch Up",
    shadeCode: "No.8",
    shadeName: "Light Blonde",
    shadeHex: "#D2A982",
    price: 89,
    tag: "Sunlit Clarity",
    pantoneColor: "#374151",
    pantoneCode: "2572C",
    image: "/Light Blonde/LightBlonde.jpg",
    video: "/Light Blonde/Nob Light blonde.mp4",
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
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full select-none">
      {/* Editorial Heading - Center Aligned */}
      <Reveal className="text-center max-w-7xl mx-auto mb-6 sm:mb-10">
        <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
          EXPLORE YOUR SHADE
        </h2>
      </Reveal>

      {/* 1. Pure Circle Shades Slider - Exactly 5 items visible on laptop and desktop with zero peek */}
      <Reveal className="relative w-full max-w-[1720px] mx-auto overflow-hidden" amount={0.2} delay={0.15}>
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 md:gap-4 lg:gap-6 xl:gap-8 overflow-x-auto scroll-smooth pb-6 pt-3 no-scrollbar snap-x snap-mandatory items-start px-4 sm:px-6 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {OFFICIAL_SHADES.map((item, idx) => {
            const circleSrc = SHADE_CLEAN_CIRCLES[item.id] || item.swatchImage;
            const isActive = activeIndex === idx;

            return (
              <div
                key={item.id}
                onClick={() => scrollToIndex(idx)}
                className={`group flex-none w-[170px] sm:w-[200px] md:w-[calc((100%-4rem)/5)] lg:w-[calc((100%-6rem)/5)] xl:w-[calc((100%-8rem)/5)] snap-center flex flex-col items-center text-center transition-all duration-300 cursor-pointer py-2 px-1 ${
                  isActive ? "opacity-100" : "opacity-85 hover:opacity-100"
                }`}
              >

                {/* Pure Circular Hair Shade Swatch - Clean Transparent Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className={`relative block w-32 h-32 sm:w-36 sm:h-36 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48 my-2 rounded-full overflow-hidden transition-all duration-500 ease-out group-hover:scale-105 ${
                    isActive ? "scale-105 shadow-[0_20px_36px_rgba(0,0,0,0.22)]" : "shadow-[0_14px_30px_rgba(0,0,0,0.16)]"
                  }`}
                >
                  <Image
                    src={circleSrc}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 240px"
                    className="object-cover scale-[1.02]"
                    priority={idx < 4}
                  />
                </Link>

                {/* Typography below Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="mt-3 space-y-1 block group/link w-full px-1"
                >
                  <h3 className="font-montserrat font-semibold text-[11px] sm:text-xs xl:text-xs tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors whitespace-normal leading-tight">
                    {item.name} System
                  </h3>
                  <p className="font-montserrat font-semibold text-xs text-obsidian">
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
                    className="text-[10px] font-mono font-bold tracking-wider uppercase text-obsidian hover:text-obsidian border-b border-graphite/30 hover:border-obsidian transition-colors pb-0.5"
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
        <span className="text-[11px] font-mono tracking-widest uppercase text-obsidian font-semibold">
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
        <Reveal className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <h3 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
            NEW ARRIVALS
          </h3>
        </Reveal>

        {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid (Full Width End-to-End on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6 xl:gap-8 items-start w-full max-w-[1720px] mx-auto">
          {NEW_ARRIVALS.map((item, idx) => (
            <RevealCard
              key={item.id}
              index={idx}
              className="group flex flex-col"
            >
              {/* Portrait Image Container with Minimal Corners */}
              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300">
                <RevealImage>
                  <Link
                    href={`/product?shade=${item.id.replace("prod-", "")}`}
                    className="block w-full h-full relative"
                  >
                    {idx === 1 && item.video ? (
                      <video
                        src={item.video}
                        poster={item.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                      />
                    )}
                  </Link>
                </RevealImage>

                {/* Top-Right Circular Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlistProduct(item, e)}
                  className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-transform active:scale-95 ${store.isInWishlist(item.id)
                      ? "text-rose-600"
                      : "text-obsidian hover:text-black"
                    }`}
                  aria-label="Wishlist"
                >
                  <Heart
                    className={`w-4 h-4 stroke-[1.5] ${store.isInWishlist(item.id) ? "fill-rose-600 text-rose-600" : ""
                      }`}
                  />
                </button>
              </div>

              {/* Left-Aligned Product Typography below Image with Cart Icon */}
              <RevealLabel>
                <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-2">
                  <Link
                    href={`/product?shade=${item.id.replace("prod-", "")}`}
                    className="space-y-0.5 sm:space-y-1 text-left block group/link min-w-0 flex-1"
                  >
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                      {item.name}
                    </p>
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] text-obsidian">
                      ${item.price} USD
                    </p>
                  </Link>

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
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAECEB] hover:bg-obsidian text-obsidian hover:text-white transition-colors flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    aria-label={`Add ${item.name} to cart`}
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </RevealLabel>

              {/* Mobile-Only: Add to Bag button removed in favor of inline cart icon */}
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
