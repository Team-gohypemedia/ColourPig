"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight, Star } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";

const BESTSELLER_ITEMS = [
  {
    id: "best-ash-blond",
    name: "Ash Blond #1903 Duo",
    category: "Cool Nordic • 100% Gray Coverage",
    price: 89,
    shadeHex: "#C9A77D",
    shadeCode: "#1903",
    rating: 4.9,
    reviews: 142,
    image: "/images/model-ash-blond.jpg",
  },
  {
    id: "best-natural-brunette",
    name: "Natural Brunette #2401 Kit",
    category: "Neutral Espresso • In-Shower",
    price: 89,
    shadeHex: "#432E20",
    shadeCode: "#2401",
    rating: 5.0,
    reviews: 218,
    image: "/images/model-brunette.jpg",
  },
  {
    id: "best-dispenser-hardware",
    name: "Aerospace MK-1 Dispenser",
    category: "Chrome Cylinder • 0 Aerosols",
    price: 58,
    shadeHex: "#949FA3",
    shadeCode: "#TOOL",
    rating: 4.9,
    reviews: 96,
    image: "/images/product-dispenser.jpg",
  },
  {
    id: "best-platinum-silver",
    name: "Platinum Silver #1105 Kit",
    category: "Ultra Pure Gray Integration",
    price: 89,
    shadeHex: "#D2D6DC",
    shadeCode: "#1105",
    rating: 4.9,
    reviews: 164,
    image: "/images/model-silver.jpg",
  },
];

export function Bestsellers({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  return (
    <section id="bestsellers" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          BESTSELLERS
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* Grid with Image 3 (#CED1D0) Light Platinum Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {BESTSELLER_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-platinum text-obsidian border border-platinum/90 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Image Portrait Box */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Reviews rating pill */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian text-platinum text-[10px] font-mono shadow-md">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-bold">{item.rating}</span>
                <span className="text-ash/70">({item.reviews})</span>
              </div>
            </div>

            {/* Meta on Light Platinum Background */}
            <div className="p-5 space-y-3 bg-platinum text-obsidian">
              <div className="space-y-1 text-center">
                <span className="text-[10px] font-mono text-graphite uppercase tracking-widest block font-semibold">
                  {item.category}
                </span>
                <h3 className="font-headline font-bold text-sm text-obsidian leading-snug">
                  {item.name}
                </h3>
              </div>

              {/* Price and Add button */}
              <div className="pt-2 border-t border-obsidian/15 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-obsidian">
                  ${item.price} USD
                </span>
                <button
                  onClick={() =>
                    onAddToCart?.({
                      code: item.shadeCode,
                      name: item.name,
                      hex: item.shadeHex,
                      undertone: item.category,
                    })
                  }
                  className="py-1.5 px-3 rounded-lg bg-obsidian text-platinum hover:bg-black text-[10px] font-headline font-bold uppercase tracking-wider transition-colors flex items-center gap-1 shadow-sm active:scale-95"
                >
                  <Plus className="w-3 h-3" />
                  <span>Quick Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-platinum border-b border-platinum/60 pb-1 hover:border-white hover:text-white transition-all"
        >
          <span>VIEW ALL BESTSELLERS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
