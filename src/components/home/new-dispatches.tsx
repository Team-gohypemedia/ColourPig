"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { HairSuitabilityModal } from "@/components/modals/hair-suitability-modal";
import { Reveal, RevealCard, RevealImage, RevealLabel } from "@/components/motion/motion-primitives";

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
  const [isSuitabilityOpen, setIsSuitabilityOpen] = useState(false);
  const [suitabilityShade, setSuitabilityShade] = useState<ShadeProduct | null>(null);

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

  return (
    <section id="system" className="pt-0 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full select-none">
      {/* Editorial Heading - Center Aligned */}
      {/* The banner carries the visible title — keep the section heading for screen readers / SEO only */}
      <h2 className="sr-only">Explore your shade</h2>

      {/* Banner (left) + Shades slider (right) from 768px up (tablets & every laptop); stacked on phones */}
      {/* One continuous full-bleed band: negative margins cancel the section's side padding */}
      <div className="-mx-4 sm:-mx-8 lg:-mx-12 xl:-mx-16 bg-[#F6F6F6] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-stretch">
        {/* "Find Your Perfect Shade" brand banner (display only — no link).
            Never cropped: shown at its natural 4:3 size and anchored to the bottom of the cell. If the
            slider side is taller, the extra space appears above the title in the banner's own #F6F6F6,
            so the join stays invisible. */}
        <Reveal amount={0.2} className="h-full">
          <div className="w-full h-full flex flex-col justify-end bg-[#F6F6F6]">
            <Image
              src="/brand-assets/banners/find-your-perfect-shade.jpg"
              alt="Find your perfect shade"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw"
              className="block w-full h-auto"
            />
          </div>
        </Reveal>

        {/* Slider side — shares the band's background; side padding is just wide enough for the arrows */}
        <div className="group/slider min-w-0 flex flex-col justify-center md:justify-end px-9 md:px-10 pt-2 pb-0 md:pt-5 md:pb-0">
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
          className="flex gap-3 sm:gap-4 md:gap-4 lg:gap-3 xl:gap-6 overflow-x-auto scroll-smooth pb-3 md:pb-0 pt-3 no-scrollbar snap-x snap-mandatory items-stretch"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {OFFICIAL_SHADES.map((item, idx) => {
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
                    ${item.price} AUD
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
                    className="inline-flex items-center justify-center px-2.5 py-1 sm:px-3.5 sm:py-1.5 2xl:px-5 2xl:py-2 rounded-full bg-graphite hover:bg-steel text-white text-[9px] sm:text-[10px] 2xl:text-[11px] font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>CHECK MATCH</span>
                  </button>

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

      {/* 2. Header for the 4 Product Cards Grid (Target for Shades nav button) */}
      <div id="shades" className="mt-12 sm:mt-16 lg:mt-20 scroll-mt-[120px]">
        <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-10 lg:mb-12">
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
                      ${item.price} AUD
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
      <div className="text-center mt-12 sm:mt-16 lg:mt-20 mb-4 sm:mb-8">
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
