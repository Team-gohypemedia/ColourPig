"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const BANNERS = [
  {
    id: "atelier",
    badge: "01 • NORMAN & BROWN",
    titlePrimary: "Salon color.",
    titleSecondary: "Made in Sydney, Australia.",
    description:
      "Formulated by Norman Brown for professional salon results at home. Gentle on roots with natural shine and zero brassiness.",
    cta: "Learn About The Formula",
    link: "/product",
    image: "/images/behind-scenes-lab.jpg",
    alt: "Norman & Brown Formulation Laboratory",
    gradientBorder: "from-[#FFC72C] via-[#F08EAB] to-[#00A3E0]",
    ctaColor: "text-[#FFC72C]",
  },
  {
    id: "hardware",
    badge: "02 • REUSABLE DISPENSER",
    titlePrimary: "Ready to use.",
    titleSecondary: "No mixing. No mess.",
    description:
      "Air-driven canister dispenses the exact ratio of color and developer at the touch of a button. Multiple applications in one system.",
    cta: "See The Dispenser",
    link: "/product?shade=shade-1",
    image: "/images/product-dispenser.jpg",
    alt: "Reusable Air-Driven Canister Dispenser",
    gradientBorder: "from-[#FF671F] via-[#7AC142] to-[#B584C4]",
    ctaColor: "text-[#00A3E0]",
  },
];

export function BehindTheScience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left
      setActiveIndex((prev) => Math.min(prev + 1, BANNERS.length - 1));
    } else if (diff < -45) {
      // Swiped right
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    setTouchStartX(null);
  };

  return (
    <section id="engineering" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto select-none">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          THE SYSTEM
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Dual Split Full-Bleed Editorial Banners (Slider on Mobile, 2-Col Grid on Desktop) */}
      <div className="relative overflow-hidden">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: isMobile ? `translateX(-${activeIndex * 100}%)` : "none",
          }}
        >
          {BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="w-full shrink-0 md:shrink md:w-auto relative rounded-lg overflow-hidden border border-brand/60 bg-toc min-h-[460px] sm:min-h-[520px] md:min-h-[540px] flex flex-col justify-end p-6 sm:p-10 md:p-12 group shadow-xl"
            >
              <Link href={banner.link} className="absolute inset-0 z-0">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142431] via-[#142431]/90 to-black/25" />

                {/* Color accent top border */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${banner.gradientBorder}`} />
              </Link>

              {/* Foreground Content */}
              <div className="relative z-10 space-y-3 sm:space-y-4 pointer-events-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/20 text-[10px] font-mono tracking-wider uppercase text-platinum">
                  {banner.badge}
                </span>
                <h3 className="font-headline font-bold text-xl sm:text-2xl md:text-3xl text-white leading-tight">
                  {banner.titlePrimary} <br />
                  <span className="font-light text-ash">{banner.titleSecondary}</span>
                </h3>
                <p className="text-xs sm:text-sm font-light text-ash leading-relaxed max-w-md">
                  {banner.description}
                </p>
                <Link
                  href={banner.link}
                  className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${banner.ctaColor} group-hover:text-white transition-colors pt-1`}
                >
                  <span>{banner.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Slider Navigation Controls */}
      <div className="flex md:hidden items-center justify-between mt-5 px-2">
        <span className="text-[10px] font-mono tracking-wider text-ash uppercase">
          STEP {activeIndex + 1} OF {BANNERS.length}
        </span>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="p-1 cursor-pointer focus:outline-none"
              aria-label={`Slide ${i + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-8 bg-[#FFC72C]" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Prev / Next Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
            disabled={activeIndex === 0}
            className="p-1.5 rounded-md bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveIndex((prev) => Math.min(prev + 1, BANNERS.length - 1))}
            disabled={activeIndex === BANNERS.length - 1}
            className="p-1.5 rounded-md bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default BehindTheScience;
