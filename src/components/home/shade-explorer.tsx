"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "@/components/ui/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useStore } from "@/context/store-context";
import { useCatalog } from "@/context/catalog-context";
import { FindShadeBanner } from "@/components/home/find-shade-banner";
import { Reveal } from "@/components/motion/motion-primitives";

/* ==========================================================================
   "Not sure of your number?" band: the cycling-bottle banner beside a slider
   of every shade, with a progress strip underneath. Used on the home page and
   the product page. It is full-bleed: its negative side margins cancel the
   parent's px-4 sm:px-8 lg:px-12 xl:px-16 padding.
   ========================================================================== */

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

/** How often the shade slider moves on by one shade */
const AUTO_ADVANCE_MS = 1500;

export function ShadeExplorer() {
  const store = useStore();
  // Shades and prices come from the catalog (Shopify when connected)
  const { shades } = useCatalog();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Slider position: starts at the first shade; arrows show only when there is somewhere to go
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false, progress: 0 });

  const handleScroll = useCallback(() => {
    const c = sliderRef.current;
    if (!c) return;
    const max = c.scrollWidth - c.clientWidth;
    setScrollState({
      atStart: c.scrollLeft <= 4,
      atEnd: c.scrollLeft >= max - 4,
      // Fraction of the row that has been revealed (e.g. 3 of 9 visible at the start ≈ 33%)
      progress: c.scrollWidth > 0 ? Math.min(1, (c.clientWidth + c.scrollLeft) / c.scrollWidth) : 0,
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Move exactly one card (card width + gap) per click
  const scrollByCard = (dir: 1 | -1) => {
    const c = sliderRef.current;
    if (!c) return;
    const cards = c.children;
    const step =
      cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : c.clientWidth;
    c.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const scrollPrev = () => scrollByCard(-1);
  const scrollNext = () => scrollByCard(1);

  // Auto-advance one shade every 1.5s, looping back to the first after the last.
  // Pauses while the visitor hovers, touches or tabs into the slider, and is off
  // for visitors who prefer reduced motion.
  const reduceMotion = useReducedMotion();
  const pausedRef = useRef(false);
  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      const c = sliderRef.current;
      if (!c || pausedRef.current || document.hidden) return;
      if (c.scrollLeft >= c.scrollWidth - c.clientWidth - 4) {
        c.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByCard(1);
      }
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <>
      {/* Banner (left) + Shades slider (right) from 768px up (tablets & every laptop); stacked on phones */}
      {/* One continuous full-bleed band: negative margins cancel the section's side padding */}
      <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 bg-[#F6F6F6] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch">
        {/* "Not sure of your number?" banner: square artwork whose bottle cycles through the shades;
            its printed "Find your colour" button links to the shade finder. */}
        <Reveal amount={0.2} className="h-full">
          <div className="w-full h-full flex flex-col justify-end bg-[#F6F6F6]">
            {/* "Not sure of your number?" artwork; only the bottle cycles through the shades */}
            <FindShadeBanner />
          </div>
        </Reveal>

        {/* Slider side — shares the band's background; side padding is just wide enough for the arrows */}
        <div className="group/slider min-w-0 flex flex-col justify-center px-9 md:px-10 pt-2 pb-0 md:py-8">
      {/* 1. Pure Circle Shades Slider - 5 items on tablet, 3 beside the banner on desktop */}
      <Reveal className="relative w-full max-w-[1720px] mx-auto group [--arrow-y:50%] sm:[--arrow-y:50%] md:[--arrow-y:76px] xl:[--arrow-y:92px] 2xl:[--arrow-y:calc(28px+clamp(150px,10.5vw,210px)/2)]" amount={0.2} delay={0.15}>
        {/* Left arrow — only appears once the slider has moved away from the first shade */}
        <button
          type="button"
          onClick={scrollPrev}
          tabIndex={scrollState.atStart ? -1 : 0}
          aria-hidden={scrollState.atStart}
          className={`absolute -left-0.5 -translate-x-full top-[var(--arrow-y)] -translate-y-1/2 z-30 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/95 text-obsidian border border-ash/40 hover:bg-obsidian hover:text-white hover:border-obsidian flex items-center justify-center active:scale-95 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.15)] cursor-pointer ${
            scrollState.atStart ? "opacity-0 pointer-events-none" : "opacity-100 lg:opacity-0 lg:pointer-events-none lg:group-hover/slider:opacity-100 lg:group-hover/slider:pointer-events-auto lg:focus-visible:opacity-100 lg:focus-visible:pointer-events-auto"
          }`}
          aria-label="Previous shade"
        >
          <ChevronLeft className="w-4 h-4 pointer-events-none" />
        </button>

        {/* Right arrow — hidden once the last shade is in view */}
        <button
          type="button"
          onClick={scrollNext}
          tabIndex={scrollState.atEnd ? -1 : 0}
          aria-hidden={scrollState.atEnd}
          className={`absolute -right-0.5 translate-x-full top-[var(--arrow-y)] -translate-y-1/2 z-30 h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/95 text-obsidian border border-ash/40 hover:bg-obsidian hover:text-white hover:border-obsidian flex items-center justify-center active:scale-95 transition-all duration-300 shadow-[0_6px_20px_rgba(0,0,0,0.15)] cursor-pointer ${
            scrollState.atEnd ? "opacity-0 pointer-events-none" : "opacity-100 lg:opacity-0 lg:pointer-events-none lg:group-hover/slider:opacity-100 lg:group-hover/slider:pointer-events-auto lg:focus-visible:opacity-100 lg:focus-visible:pointer-events-auto"
          }`}
          aria-label="Next shade"
        >
          <ChevronRight className="w-4 h-4 pointer-events-none" />
        </button>

        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
          onFocus={pause}
          onBlur={resume}
          className="flex gap-3 sm:gap-4 md:gap-4 lg:gap-3 xl:gap-6 overflow-x-auto scroll-smooth pb-3 md:pb-0 pt-3 no-scrollbar snap-x snap-mandatory items-stretch"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {shades.map((item, idx) => {
            const circleSrc = SHADE_CLEAN_CIRCLES[item.id] || item.swatchImage;

            return (
              <div
                key={item.id}
                className="group flex-none w-[calc((100%-1.5rem)/3)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-2.25rem)/4)] xl:w-[calc((100%-4.5rem)/4)] snap-start flex flex-col items-center text-center transition-all duration-300 py-2 md:pb-0 px-1"
              >

                {/* Pure Circular Hair Shade Swatch - Clean Transparent Circle */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="relative block w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-32 xl:h-32 2xl:w-[clamp(150px,10.5vw,210px)] 2xl:h-[clamp(150px,10.5vw,210px)] my-2 rounded-full overflow-hidden transition-all duration-500 ease-out group-hover:scale-105 shadow-[0_18px_24px_-14px_rgba(0,0,0,0.35)] group-hover:shadow-[0_24px_30px_-16px_rgba(0,0,0,0.42)]"
                  style={circleSrc ? undefined : { backgroundColor: item.hex }}
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

                {/* Typography below Circle — name takes only the lines it needs; the price is pushed
                    down (mt-auto) so prices and buttons still line up across cards */}
                <Link
                  href={`/product?shade=${item.id.replace("shade-", "")}`}
                  className="mt-3 flex-1 flex flex-col group/link w-full px-1"
                >
                  <h3 className="font-montserrat font-semibold text-[10px] sm:text-[11px] md:text-xs lg:text-[11px] xl:text-xs 2xl:text-[13px] tracking-wide sm:tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors whitespace-normal leading-tight text-center">
                    {item.name}
                  </h3>
                  <p className="font-montserrat font-semibold text-xs 2xl:text-sm text-obsidian mt-auto pt-1.5">
                    {store.formatPrice(item.price)}
                  </p>
                </Link>

                {/* Action: View Product */}
                <div className="mt-3 flex flex-col items-center gap-2">
                  <Link
                    href={`/product?shade=${item.id.replace("shade-", "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[9px] sm:text-[10px] 2xl:text-[11px] font-mono font-medium tracking-wider sm:tracking-widest uppercase text-obsidian/45 hover:text-obsidian border-b border-obsidian/20 hover:border-obsidian transition-colors pb-0.5"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

        </div>
      </div>

      {/* Progress indicator — its own full-bleed strip under the band, same #F6F6F6, centred on the page */}
      <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 bg-[#F6F6F6] px-6 pt-3 pb-5 md:pt-6 md:pb-8">
        <div
          role="progressbar"
          aria-label="Shade slider position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scrollState.progress * 100)}
          className="w-full max-w-xs sm:max-w-sm mx-auto h-[2px] bg-obsidian/10 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-obsidian rounded-full transition-[width] duration-300 ease-out"
            style={{ width: `${scrollState.progress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}

export default ShadeExplorer;
