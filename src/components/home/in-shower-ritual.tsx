"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { SnoutIcon } from "@/components/brand/logo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, SwapText } from "@/components/motion/motion-primitives";

const RITUAL_STEPS = [
  {
    step: "01",
    title: "USE ME",
    subtitle: "AIR-DRIVEN DISPENSER",
    pantone: "165C",
    pantoneName: "Tangerine",
    hex: "#C8CDD2",
    desc: "Press canister to release pre-measured dual formulas evenly into the tray without mess.",
    image: "/images/ritual_step_1_card.png",
  },
  {
    step: "02",
    title: "IN ME",
    subtitle: "APPLICATION TRAY",
    pantone: "299C",
    pantoneName: "Cyan",
    hex: "#C8CDD2",
    desc: "Dispense formulas directly into custom tray and blend evenly with precision brush.",
    image: "/images/ritual_step_2_card.png",
  },
  {
    step: "03",
    title: "WITH ME",
    subtitle: "PRECISION BRUSH",
    pantone: "375C",
    pantoneName: "Lime",
    hex: "#C8CDD2",
    desc: "Use precision brush to target roots, part line, and resistant grey regrowth.",
    image: "/images/ritual_step_3_card.png",
  },
  {
    step: "04",
    title: "DEVELOP ME",
    subtitle: "30-MIN TIMER",
    pantone: "123C",
    pantoneName: "Yellow",
    hex: "#C8CDD2",
    desc: "Allow 30 minutes for permanent, salon-grade 100% grey coverage.",
    image: "/images/ritual_step_4_card.png",
  },
  {
    step: "05",
    title: "RINSE WITH ME",
    subtitle: "SHAMPOO & CARE",
    pantone: "2572C",
    pantoneName: "Lilac",
    hex: "#C8CDD2",
    desc: "Rinse thoroughly with warm water, follow with included shampoo and conditioner.",
    image: "/images/ritual_step_5_card.png",
  },
  {
    step: "06",
    title: "WIPE WITH ME",
    subtitle: "STAIN REMOVER",
    pantone: "190C",
    pantoneName: "Rose",
    hex: "#C8CDD2",
    desc: "Wipe hairline and skin clean with gentle stain remover sachet for zero residue.",
    image: "/images/ritual_step_6_card.png",
  },
];

export function InShowerRitual() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Smooth scroll to target slide
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      // Center card on smaller screens, align smoothly on larger
      const isMobile = window.innerWidth < 1024;
      const scrollPos = isMobile
        ? targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2
        : targetCard.offsetLeft - container.offsetLeft;

      container.scrollTo({
        left: Math.max(0, scrollPos),
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  }, []);

  const scrollPrev = () => {
    const prevIndex = activeIndex === 0 ? RITUAL_STEPS.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  };

  const scrollNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % RITUAL_STEPS.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex]);

  // Track active slide on user manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Mobile cards snap to the center; laptop/desktop cards snap to the left edge
    const isMobile = window.innerWidth < 1024;
    const target = isMobile
      ? container.scrollLeft + container.clientWidth / 2
      : container.scrollLeft;
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardPos = isMobile ? card.offsetLeft + card.clientWidth / 2 : card.offsetLeft;
      const diff = Math.abs(cardPos - target);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  // Autoplay / Auto-move effect every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, scrollNext]);

  return (
    <section
      className="pt-14 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-10 w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Resume autoplay after 2.5s of no touch
        setTimeout(() => setIsPaused(false), 2500);
      }}
    >
      {/* Title */}
      <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-1 sm:space-y-1.5">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-ash font-semibold">
          HOW IT WORKS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider uppercase leading-tight">
          THE 6-STEP RITUAL
        </h2>
        <div className="w-10 h-[2px] bg-white/20 mx-auto mt-2" />
      </Reveal>

      {/* Carousel Track */}
      <Reveal className="relative" amount={0.2} delay={0.1}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3.5 sm:gap-5 pb-2 [scrollbar-width:none] -mx-4 sm:mx-0 px-4 sm:px-0 lg:px-1 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RITUAL_STEPS.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.step}
                onClick={() => scrollToIndex(idx)}
                className={`w-[78vw] max-w-[310px] sm:w-[320px] md:w-[340px] lg:max-w-none lg:w-auto shrink-0 snap-center lg:snap-align-none group relative rounded-lg bg-[#13212E] border p-3.5 sm:p-4 flex flex-col justify-between h-auto min-h-[350px] sm:min-h-[380px] lg:min-h-0 lg:p-0 lg:border-0 lg:bg-transparent lg:shadow-none lg:ring-0 lg:cursor-default overflow-hidden cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "border-white/40 shadow-2xl shadow-black/80 ring-1 ring-white/10"
                    : "border-white/10 hover:border-white/25 hover:shadow-lg"
                }`}
              >
                {/* Colored Top Accent Stripe */}
                <div
                  className="lg:hidden absolute top-0 inset-x-0 h-1 sm:h-1.5 transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: item.hex }}
                />

                {/* Step Number & Pantone Tag Top */}
                <div className="lg:hidden flex justify-between items-center z-10 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="font-mono text-base sm:text-lg font-black transition-colors"
                      style={{ color: item.hex }}
                    >
                      {item.step}
                    </span>
                    <span
                      className="inline-block px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border"
                      style={{
                        backgroundColor: `${item.hex}20`,
                        color: item.hex,
                        borderColor: `${item.hex}40`,
                      }}
                    >
                      {item.pantone}
                    </span>
                  </div>
                  <SnoutIcon
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-40 group-hover:opacity-100 transition-opacity"
                    color={item.hex}
                  />
                </div>

                {/* Packaging Illustration Frame */}
                <div className="relative w-full aspect-[4/3] rounded overflow-hidden my-2.5 sm:my-3 lg:my-0 shadow-xs bg-[#63727D]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 340px, (max-width: 1536px) 25vw, 20vw"
                    className="object-cover object-center lg:group-hover:scale-100 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Meta */}
                <div className="lg:hidden space-y-1.5 z-10 text-center">
                  <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-normal text-ash leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Progress Bar Indicator */}
      <div className="lg:hidden w-full max-w-md mx-auto h-[2px] bg-white/10 rounded-full overflow-hidden mt-6">
        <div
          className="h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
          style={{
            width: `${((activeIndex + 1) / RITUAL_STEPS.length) * 100}%`,
            backgroundColor: RITUAL_STEPS[activeIndex].hex,
          }}
        />
      </div>

      {/* Footer Navigation Bar (Step Counter + Pantone Dots + Arrow Controls) */}
      <div className="lg:hidden flex items-center justify-between mt-5 px-1 max-w-4xl mx-auto">
        {/* Step Indicator */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-ash/90 font-medium">
          STEP <SwapText value={activeIndex + 1} /> OF {RITUAL_STEPS.length}
        </span>

        {/* Dynamic Pantone Pagination Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {RITUAL_STEPS.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.step}
                onClick={() => scrollToIndex(idx)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "24px" : "7px",
                  backgroundColor: item.hex,
                  opacity: isActive ? 1 : 0.35,
                }}
                aria-label={`Jump to step ${item.step}`}
              />
            );
          })}
        </div>

        {/* Prev / Next Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={scrollPrev}
            className="h-8 w-8 rounded-md bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center active:scale-95 transition-all shadow-xs"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4 text-ash group-hover:text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="h-8 w-8 rounded-md bg-white/5 border border-white/10 hover:bg-white/15 text-white flex items-center justify-center active:scale-95 transition-all shadow-xs"
            aria-label="Next step"
          >
            <ChevronRight className="w-4 h-4 text-ash group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default InShowerRitual;
