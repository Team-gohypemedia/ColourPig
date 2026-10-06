"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";
import { useStore } from "@/context/store-context";

const NEW_ARRIVALS = [
  {
    id: "prod-shade-4",
    name: "No.4 Medium Brown System",
    category: "Natural Chestnut • Air-Driven Touch Up",
    shadeCode: "No.4",
    shadeName: "Medium Brown",
    shadeHex: "#4E4136",
    price: 89,
    tag: "Most Popular",
    pantoneColor: "#FFC72C",
    pantoneCode: "123C",
    image: "/images/products/cards/shade_card_4.jpg",
  },
  {
    id: "prod-shade-7",
    name: "No.7 Medium Blonde System",
    category: "Warm Golden • Air-Driven Touch Up",
    shadeCode: "No.7",
    shadeName: "Medium Blonde",
    shadeHex: "#BE966C",
    price: 89,
    tag: "High Demand",
    pantoneColor: "#FF671F",
    pantoneCode: "165C",
    image: "/images/products/cards/shade_card_7.jpg",
  },
  {
    id: "prod-shade-2",
    name: "No.1 Black System",
    category: "Pure Mineral Jet • 100% Coverage",
    shadeCode: "No.1",
    shadeName: "Black",
    shadeHex: "#2D2C2D",
    price: 89,
    tag: "Intense Pigment",
    pantoneColor: "#00A3E0",
    pantoneCode: "299C",
    image: "/images/products/cards/shade_card_2.jpg",
  },
  {
    id: "prod-shade-1",
    name: "No.0/0 Clear Gloss System",
    category: "Universal Gloss • Translucent Blending",
    shadeCode: "No.0/0",
    shadeName: "Clear",
    shadeHex: "#F2EFF0",
    price: 89,
    tag: "Multi-Use",
    pantoneColor: "#B584C4",
    pantoneCode: "2572C",
    image: "/images/products/cards/shade_card_1.jpg",
  },
];

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  const store = useStore();

  const handleToggleWishlist = (item: (typeof NEW_ARRIVALS)[0], e: React.MouseEvent) => {
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
    <section id="system" className="py-14 sm:py-24 px-4 sm:px-10 lg:px-14 max-w-[1600px] mx-auto">
      {/* Editorial Heading */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16 space-y-2">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
          COLLECTION
        </span>
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
          NEW IN
        </h2>
        <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-3" />
      </div>

      {/* 2-Card on Mobile, 4-Card on Desktop Editorial Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        {NEW_ARRIVALS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col cursor-pointer"
            onClick={() =>
              onAddToCart?.({
                code: item.shadeCode,
                name: item.shadeName,
                hex: item.shadeHex,
                undertone: item.category,
              })
            }
          >
            {/* Portrait Image Container with Minimal Corners */}
            <div className="relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#E2E5E4] shadow-xs group-hover:shadow-md transition-all duration-300">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
              />

              {/* Top-Left Pantone Tag Badge (High contrast solid pill) */}
              <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-20">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-obsidian backdrop-blur-md border border-black/10 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: item.pantoneColor }}
                  />
                  <span className="text-obsidian font-bold">{item.tag}</span>
                </span>
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart?.({
                      code: item.shadeCode,
                      name: item.shadeName,
                      hex: item.shadeHex,
                      undertone: item.category,
                    });
                  }}
                  className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-[#EAECEB]/95 hover:bg-obsidian text-obsidian hover:text-white backdrop-blur-md shadow-md border border-black/5 text-[11px] font-mono font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span className="truncate">SELECT OPTIONS</span>
                </button>
              </div>
            </div>

            {/* Left-Aligned Product Typography below Image */}
            <div className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left">
              <h3 className="font-headline font-bold text-xs sm:text-sm tracking-wider uppercase text-obsidian group-hover:text-black transition-colors truncate">
                {item.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm font-semibold text-obsidian">
                ${item.price} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-10 sm:mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-obsidian border-b border-obsidian/40 pb-1 hover:border-obsidian hover:text-black transition-all font-semibold"
        >
          <span>VIEW ALL PRODUCTS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
