"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";
import { STARTER_KIT_PRICE } from "@/data/pricing";
import { useLiveCards } from "@/context/catalog-context";
import { ShadeExplorer } from "@/components/home/shade-explorer";
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

const NEW_ARRIVALS = [
  {
    id: "prod-shade-3",
    name: "NO.3 BROWN SYSTEM",
    category: "Dark Espresso • Air-Driven Touch Up",
    shadeCode: "No.3",
    shadeName: "Brown",
    shadeHex: "#241E1C",
    price: STARTER_KIT_PRICE,
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
    price: STARTER_KIT_PRICE,
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
    price: STARTER_KIT_PRICE,
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
    price: STARTER_KIT_PRICE,
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
  // The 2nd card autoplays its shade's video; the rest show photos
  const newArrivals = useLiveCards(NEW_ARRIVALS, { videoAt: 1 });

  const handleToggleWishlistProduct = (item: (typeof NEW_ARRIVALS)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
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

      {/* Banner + shade slider band (shared with the product page) */}
      <ShadeExplorer />


      {/* 2. Header for the 4 Product Cards Grid (Target for Shades nav button) */}
      <div id="shades" className="mt-12 sm:mt-16 lg:mt-20 scroll-mt-[120px]">
        <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-10 lg:mb-12">
          <h3 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
            NEW ARRIVALS
          </h3>
        </Reveal>

        {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid (Full Width End-to-End on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6 xl:gap-8 items-start w-full max-w-[1720px] mx-auto">
          {newArrivals.map((item, idx) => (
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
                    {item.video ? (
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
                      {store.formatPrice(item.price)}
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
                        price: item.price,
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
    </section>
  );
}
