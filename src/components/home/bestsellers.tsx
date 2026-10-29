"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useStore } from "@/context/store-context";
import { Reveal, RevealCard, RevealImage, RevealLabel } from "@/components/motion/motion-primitives";

const BESTSELLER_ITEMS = [
  {
    id: "prod-shade-4",
    shadeId: "shade-4",
    name: "NO.4 MEDIUM BROWN SYSTEM",
    category: "Natural Chestnut • Air-Driven Touch Up",
    shadeCode: "No.4",
    shadeName: "Medium Brown",
    shadeHex: "#4E4136",
    price: 89,
    tag: "MOST POPULAR",
    pantoneColor: "#374151",
    image: "/Medium Brown/MediumBrown.jpg",
  },
  {
    id: "prod-shade-7",
    shadeId: "shade-7",
    name: "NO.7 MEDIUM BLONDE SYSTEM",
    category: "Warm Golden • Air-Driven Touch Up",
    shadeCode: "No.7",
    shadeName: "Medium Blonde",
    shadeHex: "#BE966C",
    price: 89,
    tag: "HIGH DEMAND",
    pantoneColor: "#374151",
    image: "/Medium Blonde/MediumBlonde.jpg",
    video: "/Medium Blonde/Medium Blonde.mp4",
  },
  {
    id: "prod-shade-1",
    shadeId: "shade-1",
    name: "NO.1 BLACK SYSTEM",
    category: "Pure Mineral Jet • 100% Coverage",
    shadeCode: "No.1",
    shadeName: "Black",
    shadeHex: "#2D2C2D",
    price: 89,
    tag: "INTENSE PIGMENT",
    pantoneColor: "#374151",
    image: "/Black/Black.jpg",
  },
  {
    id: "prod-shade-0-0",
    shadeId: "shade-0-0",
    name: "NO.0/0 CLEAR GLOSS SYSTEM",
    category: "Universal Sheen • Multi-Use",
    shadeCode: "No.0/0",
    shadeName: "Clear",
    shadeHex: "#F2EFF0",
    price: 89,
    tag: "MULTI-USE",
    pantoneColor: "#374151",
    image: "/Clear/Clear.jpg",
  },
];

interface BestsellersProps {
  onAddToCart?: (shade: any) => void;
}

export function Bestsellers({ onAddToCart }: BestsellersProps = {}) {
  const store = useStore();

  const handleToggleWishlist = (item: (typeof BESTSELLER_ITEMS)[0], e: React.MouseEvent) => {
    e.preventDefault();
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
    <section id="bestsellers" className="py-14 sm:py-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full select-none">
      {/* Title */}
      <Reveal className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
          BESTSELLERS
        </h2>
      </Reveal>

      {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid (Full-width End-to-End on Desktop) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6 xl:gap-8 w-full max-w-[1720px] mx-auto">
        {BESTSELLER_ITEMS.map((item, idx) => (
          <RevealCard
            key={item.id}
            index={idx}
            className="group flex flex-col"
          >
            {/* Portrait Container with Rounded Corners (Transparent background, no fill behind image/video) */}
            <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300">
              <RevealImage>
                <Link
                  href={`/product?shade=${item.shadeId}&image=${encodeURIComponent(item.image)}`}
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

              {/* Top-Right Circular Wishlist Button (Always visible, no hover effect needed) */}
              <button
                type="button"
                onClick={(e) => handleToggleWishlist(item, e)}
                className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-transform active:scale-95 ${
                  store.isInWishlist(item.id)
                    ? "text-rose-600"
                    : "text-obsidian hover:text-black"
                }`}
                aria-label={`Wishlist ${item.name}`}
              >
                <Heart
                  className={`w-4 h-4 stroke-[1.5] ${
                    store.isInWishlist(item.id) ? "fill-rose-600 text-rose-600" : ""
                  }`}
                />
              </button>
            </div>

            {/* Bottom Row: Product Title & Price on Left, Cart Icon Button on Right */}
            <RevealLabel>
              <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-2">
                <Link
                  href={`/product?shade=${item.shadeId}&image=${encodeURIComponent(item.image)}`}
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
                      id: `${item.id}-system`,
                      name: item.name,
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
          </RevealCard>
        ))}
      </div>

      <div className="text-center mt-10 sm:mt-14">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-xs font-montserrat tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
        >
          <span>VIEW FULL ARCHIVE COLLECTION</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}

export default Bestsellers;
