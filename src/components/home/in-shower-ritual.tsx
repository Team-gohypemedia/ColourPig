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
    image: "/images/ritual_step_1_icon_dark.png",
  },
  {
    step: "02",
    title: "IN ME",
    subtitle: "APPLICATION TRAY",
    pantone: "299C",
    pantoneName: "Cyan",
    hex: "#C8CDD2",
    desc: "Dispense formulas directly into custom tray and blend evenly with precision brush.",
    image: "/images/ritual_step_2_icon_dark.png",
  },
  {
    step: "03",
    title: "WITH ME",
    subtitle: "PRECISION BRUSH",
    pantone: "375C",
    pantoneName: "Lime",
    hex: "#C8CDD2",
    desc: "Use precision brush to target roots, part line, and resistant grey regrowth.",
    image: "/images/ritual_step_3_icon_dark.png",
  },
  {
    step: "04",
    title: "DEVELOP ME",
    subtitle: "30-MIN TIMER",
    pantone: "123C",
    pantoneName: "Yellow",
    hex: "#C8CDD2",
    desc: "Allow 30 minutes for permanent, salon-grade 100% grey coverage.",
    image: "/images/ritual_step_4_icon_dark.png",
  },
  {
    step: "05",
    title: "RINSE WITH ME",
    subtitle: "SHAMPOO & CARE",
    pantone: "2572C",
    pantoneName: "Lilac",
    hex: "#C8CDD2",
    desc: "Rinse thoroughly with warm water, follow with included shampoo and conditioner.",
    image: "/images/ritual_step_5_icon_dark.png",
  },
  {
    step: "06",
    title: "WIPE WITH ME",
    subtitle: "STAIN REMOVER",
    pantone: "190C",
    pantoneName: "Rose",
    hex: "#C8CDD2",
    desc: "Wipe hairline and skin clean with gentle stain remover sachet for zero residue.",
    image: "/images/ritual_step_6_icon_dark.png",
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
      className="py-8 sm:py-12 lg:py-14 px-4 sm:px-8 lg:px-12 w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        // Resume autoplay after 2.5s of no touch
        setTimeout(() => setIsPaused(false), 2500);
      }}
    >
      {/* Title */}
      <Reveal className="text-center max-w-xl mx-auto mb-4 sm:mb-6">
        <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
          THE RITUAL
        </h2>
      </Reveal>

      {/* Carousel Track */}
      <Reveal className="relative" amount={0.2} delay={0.1}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-3.5 sm:gap-5 pb-2 [scrollbar-width:none] -mx-4 sm:mx-0 px-4 sm:px-0 lg:px-1 lg:grid lg:grid-cols-6 lg:gap-3 xl:gap-5 lg:overflow-visible lg:pb-0 max-w-[1300px] mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {RITUAL_STEPS.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.step}
                onClick={() => scrollToIndex(idx)}
                className={`w-[70vw] max-w-[240px] sm:w-[260px] lg:max-w-none lg:w-auto shrink-0 snap-center lg:snap-align-none group relative rounded-lg bg-transparent border-0 p-1 flex flex-col items-center justify-start cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-105"
                    : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                {/* Clean Step Title (Montserrat bold modern uppercase) */}
                <h3 className="font-montserrat font-bold text-xs sm:text-sm lg:text-[13px] tracking-[0.2em] uppercase text-obsidian mb-2 sm:mb-2.5 text-center">
                  {item.title}
                </h3>

                {/* Packaging Illustration Frame - Clean Transparent */}
                <div className="relative w-full aspect-[4/3] max-w-[130px] sm:max-w-[150px] lg:max-w-[160px] xl:max-w-[180px] mx-auto bg-transparent">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 180px"
                    className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Progress Bar Indicator */}
      <div className="lg:hidden w-full max-w-md mx-auto h-[2px] bg-obsidian/10 rounded-full overflow-hidden mt-6">
        <div
          className="h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full bg-obsidian"
          style={{
            width: `${((activeIndex + 1) / RITUAL_STEPS.length) * 100}%`,
          }}
        />
      </div>

      {/* Footer Navigation Bar (Step Counter + Arrow Controls) */}
      <div className="lg:hidden flex items-center justify-between mt-5 px-1 max-w-4xl mx-auto">
        {/* Step Indicator */}
        <span className="text-[11px] font-mono tracking-widest uppercase text-obsidian/70 font-medium">
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
                  backgroundColor: "#0D151C",
                  opacity: isActive ? 1 : 0.25,
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
            className="h-8 w-8 rounded-md bg-platinum/30 border border-ash/30 hover:bg-platinum/60 text-obsidian flex items-center justify-center active:scale-95 transition-all shadow-xs"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-4 h-4 text-obsidian group-hover:text-black" />
          </button>
          <button
            onClick={scrollNext}
            className="h-8 w-8 rounded-md bg-platinum/30 border border-ash/30 hover:bg-platinum/60 text-obsidian flex items-center justify-center active:scale-95 transition-all shadow-xs"
            aria-label="Next step"
          >
            <ChevronRight className="w-4 h-4 text-obsidian group-hover:text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default InShowerRitual;
