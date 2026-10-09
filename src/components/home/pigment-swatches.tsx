"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";

const SPECIFICATION_CARDS = [
  {
    title: "AIR-DRIVEN DISPENSER",
    subtitle: "PATENTED COMPRESSION ENGINE",
    desc: "Proprietary zero-propellant air-compression pump simultaneously delivers fresh colour cream and developer in an exact 1:1 synchronized ratio. Eliminates bowls, shaking, and mess.",
    pantone: "299C",
    hex: "#00A3E0",
    image: "/images/spec_full_dispenser.jpg",
    specs: [
      "Zero Propellants · Zero Air-Oxidation",
      "1:1 Synchronized Dual Chamber Actuator",
      "Ergonomic Chrome Pump Mechanism",
    ],
  },
  {
    title: "50ML + 50ML DUAL POD",
    subtitle: "204MM × 74MM CYLINDRICAL TUBE",
    desc: "Pre-calibrated dual delivery engineered for 4–6 precision root touch-ups (10–20ml per application). Keeps fresh for up to 8 weeks, eliminating 90% of waste and 75% of single-use plastic.",
    pantone: "165C",
    hex: "#FF671F",
    image: "/images/spec_full_packaging.jpg",
    specs: [
      "Dimensions: 204mm (H) × 74mm (Ø)",
      "100ml Net Capacity (50ml Base + 50ml Dev)",
      "Integrated Dual-Level Viewing Gauge",
    ],
  },
  {
    title: "COMPLETE AFTERCARE RITUAL",
    subtitle: "5-PART PRECISION SALON KIT",
    desc: "Every system arrives equipped with salon-grade aftercare and application tools engineered for in-shower root touch-up with zero dripping and complete grey coverage.",
    pantone: "375C",
    hex: "#7AC142",
    image: "/images/spec_full_aftercare.jpg",
    specs: [
      "Stain Remover (10ml) & Salon Gloves",
      "Salon Shampoo (10ml) & Conditioner (10ml)",
      "30-Minute Development Time",
    ],
  },
];

export function PigmentSwatches() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide based on scroll position
    const cardWidth = sliderRef.current.children[0]?.clientWidth || clientWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(newIndex, 0), SPECIFICATION_CARDS.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const handlePrev = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth * 0.85, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth * 0.85, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-12 max-w-[1600px] mx-auto overflow-hidden">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-14 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          SYSTEM DETAILS
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          PRODUCT SPECIFICATIONS
        </h2>
        <p className="text-xs sm:text-sm font-mono text-graphite">
          Engineered by Norman &amp; Brown • Designed in Australia
        </p>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* Pill Selector (Quick Jump Tabs) - Mobile only */}
      <div className="flex md:hidden items-center justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 [scrollbar-width:none]">
        {SPECIFICATION_CARDS.map((card, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 border shrink-0"
              style={{
                backgroundColor: isActive ? `${card.hex}20` : "transparent",
                borderColor: isActive ? card.hex : "rgba(148, 159, 163, 0.4)",
                color: isActive ? card.hex : "#495B69",
              }}
            >
              <span
                className="w-2 h-2 rounded-full transition-transform"
                style={{
                  backgroundColor: card.hex,
                  transform: isActive ? "scale(1.2)" : "scale(0.8)",
                }}
              />
              SPEC 0{idx + 1}
              <span className="hidden sm:inline opacity-70">• {card.pantone}</span>
            </button>
          );
        })}
      </div>

      {/* Cards Container: Slider on mobile, 3-Column Grid on Desktop/Laptop */}
      <div className="relative">
        <div
          ref={sliderRef}
          className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory md:snap-none gap-4 sm:gap-6 md:gap-6 lg:gap-8 pb-4 pt-1 [scrollbar-width:none] -mx-4 sm:mx-0 px-4 sm:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SPECIFICATION_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="w-[86vw] max-w-[380px] md:w-full md:max-w-none shrink-0 md:shrink snap-center md:snap-align-none group relative rounded-2xl bg-white border border-ash/30 p-5 sm:p-7 flex flex-col justify-between overflow-hidden hover:border-obsidian hover:shadow-xl transition-all duration-300"
            >
              {/* Top accent stripe */}
              <div
                className="absolute top-0 inset-x-0 h-1.5 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: card.hex }}
              />

              {/* Background Texture Pattern */}
              <div className="absolute inset-0 brand-snout-pattern opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none" />

              {/* Top Header Badge & Snout Emblem */}
              <div className="flex justify-between items-center z-10 pt-1">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border"
                  style={{
                    backgroundColor: `${card.hex}15`,
                    color: card.hex,
                    borderColor: `${card.hex}40`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: card.hex }} />
                  SPEC 0{idx + 1} • {card.pantone}
                </span>
                <SnoutIcon
                  className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity"
                  color={card.hex}
                />
              </div>

              {/* Full-Bleed Product Image from PDF */}
              <div className="relative w-full aspect-[4/3] my-4 rounded-xl overflow-hidden border border-ash/20 shadow-xs z-10 group-hover:border-obsidian/30 transition-all bg-[#EAECEB]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 85vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Typography & Description */}
              <div className="space-y-1.5 z-10">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-graphite font-semibold block">
                  {card.subtitle}
                </span>
                <h3 className="font-headline font-bold text-lg sm:text-xl text-obsidian tracking-wide">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-[13px] font-normal text-graphite leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Engineering Specifications Bullets from PDF */}
              <div className="pt-4 mt-4 border-t border-ash/20 space-y-1.5 z-10">
                {card.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-[11px] font-mono text-obsidian/80">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: card.hex }}
                    />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls (Arrows + Dot Indicators) - Only shown on Mobile */}
      <div className="flex md:hidden items-center justify-between mt-4 sm:mt-6 px-1">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {SPECIFICATION_CARDS.map((card, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to specification slide ${idx + 1}`}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: isActive ? "28px" : "8px",
                  backgroundColor: isActive ? card.hex : "#CED1D0",
                }}
              />
            );
          })}
        </div>

        {/* Left & Right Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            aria-label="Previous specification"
            className="h-9 w-9 rounded-full bg-white border border-ash/30 text-obsidian flex items-center justify-center hover:bg-platinum/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            aria-label="Next specification"
            className="h-9 w-9 rounded-full bg-white border border-ash/30 text-obsidian flex items-center justify-center hover:bg-platinum/40 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PigmentSwatches;
