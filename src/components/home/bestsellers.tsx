"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, Star } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";

const BESTSELLER_ITEMS = [
  {
    id: "best-shade-3",
    name: "No.3 Brown Kit",
    category: "Dark Espresso • Reusable System",
    price: 89,
    shadeHex: "#241E1C",
    shadeCode: "No.3",
    rating: 4.9,
    reviews: 195,
    image: "/images/products/cards/shade_card_3.jpg",
  },
  {
    id: "best-shade-5",
    name: "No.5 Light Brown Kit",
    category: "Warm Amber • Reusable System",
    price: 89,
    shadeHex: "#624F44",
    shadeCode: "No.5",
    rating: 4.8,
    reviews: 167,
    image: "/images/products/cards/shade_card_5.jpg",
  },
  {
    id: "best-shade-6",
    name: "No.6 Dark Blonde Kit",
    category: "Deep Honey Blonde • Reusable System",
    price: 89,
    shadeHex: "#755A42",
    shadeCode: "No.6",
    rating: 4.9,
    reviews: 182,
    image: "/images/products/cards/shade_card_6.jpg",
  },
  {
    id: "best-shade-8",
    name: "No.8 Light Blonde Kit",
    category: "Luminous Sunlit • Reusable System",
    price: 89,
    shadeHex: "#D2A982",
    shadeCode: "No.8",
    rating: 4.9,
    reviews: 149,
    image: "/images/products/cards/shade_card_8.jpg",
  },
];

export function Bestsellers({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const store = useStore();

  const handleToggleWishlist = (item: (typeof BESTSELLER_ITEMS)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      shadeCode: item.shadeCode,
    });
  };

  return (
    <section id="bestsellers" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          CLIENT FAVORITES
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          BESTSELLERS
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {BESTSELLER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col"
          >
            {/* Portrait Image Container with Minimal Corners */}
            <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#E2E5E4] shadow-xs group-hover:shadow-md transition-all duration-300">
              <Link
                href={`/product?shade=${item.id.replace("best-", "")}`}
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

              {/* Reviews rating pill on top left */}
              <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 backdrop-blur text-obsidian text-[9px] sm:text-[10px] font-mono shadow-xs pointer-events-none">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-500 text-amber-500" />
                <span className="font-bold">{item.rating}</span>
                <span className="text-graphite hidden xs:inline sm:inline">({item.reviews})</span>
              </div>

              {/* Top-Right Circular Wishlist Button */}
              <button
                type="button"
                onClick={(e) => handleToggleWishlist(item, e)}
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
                <Link
                  href={`/product?shade=${item.id.replace("best-", "")}`}
                  className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="truncate">VIEW PRODUCT</span>
                </Link>
              </div>
            </div>

            {/* Left-Aligned Product Typography below Image */}
            <Link
              href={`/product?shade=${item.id.replace("best-", "")}`}
              className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block group/link"
            >
              <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                {item.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                ${item.price} USD
              </p>
            </Link>

            {/* Mobile-Only: Add to Bag button directly on mobile card */}
            <button
              onClick={() =>
                store.addToCart({
                  id: item.id,
                  name: item.name,
                  variant: item.category,
                  price: item.price,
                  image: item.image,
                  shadeCode: item.shadeCode,
                })
              }
              className="sm:hidden mt-2.5 w-full py-2 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>ADD TO BAG</span>
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 sm:mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
        >
          <span>VIEW ALL BESTSELLERS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
