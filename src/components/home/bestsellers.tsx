"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart, Star } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";

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
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="bestsellers" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          CLIENT FAVORITES
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          BESTSELLERS
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 4-Card Editorial Product Grid with Reference Hover Interactions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {BESTSELLER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col cursor-pointer"
            onClick={() =>
              onAddToCart?.({
                code: item.shadeCode,
                name: item.name,
                hex: item.shadeHex,
                undertone: item.category,
              })
            }
          >
            {/* Portrait Image Container with Soft Rounded Corners */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#E2E5E4] shadow-sm group-hover:shadow-xl transition-all duration-500">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Reviews rating pill on top left */}
              <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-obsidian text-[10px] font-mono shadow-sm">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="font-bold">{item.rating}</span>
                <span className="text-graphite">({item.reviews})</span>
              </div>

              {/* Top-Right Circular Wishlist Button */}
              <button
                type="button"
                onClick={(e) => toggleWishlist(item.id, e)}
                className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                  wishlist[item.id]
                    ? "opacity-100 text-rose-600"
                    : "opacity-0 group-hover:opacity-100 text-obsidian hover:text-black"
                }`}
                aria-label="Wishlist"
              >
                <Heart
                  className={`w-4 h-4 stroke-[1.5] ${
                    wishlist[item.id] ? "fill-rose-600 text-rose-600" : ""
                  }`}
                />
              </button>

              {/* Floating Pill Action Button on Hover: SELECT OPTIONS */}
              <div className="absolute bottom-4 inset-x-0 mx-auto z-20 flex justify-center px-4 pointer-events-none group-hover:pointer-events-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.({
                      code: item.shadeCode,
                      name: item.name,
                      hex: item.shadeHex,
                      undertone: item.category,
                    });
                  }}
                  className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-lg border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>SELECT OPTIONS</span>
                </button>
              </div>
            </div>

            {/* Left-Aligned Product Typography below Image */}
            <div className="mt-3.5 space-y-1 text-left">
              <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover:text-black transition-colors">
                {item.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                ${item.price} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
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
