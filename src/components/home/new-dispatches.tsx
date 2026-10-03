"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ArrowRight } from "lucide-react";
import { ShadeItem } from "@/components/sections/hero-section";

const NEW_ARRIVALS = [
  {
    id: "prod-starter-nordic",
    name: "Ash Blond #1903 System",
    category: "Complete Starter Kit",
    shadeCode: "#1903",
    shadeName: "Ash Blond",
    shadeHex: "#C9A77D",
    price: 89,
    tag: "New Formulation",
    image: "/images/model-ash-blond.jpg",
  },
  {
    id: "prod-refill-espresso",
    name: "Natural Brunette #2401 System",
    category: "Complete Starter Kit",
    shadeCode: "#2401",
    shadeName: "Natural Brunette",
    shadeHex: "#432E20",
    price: 89,
    tag: "High Demand",
    image: "/images/model-brunette.jpg",
  },
  {
    id: "prod-dispenser-hardware",
    name: "The Permanent MK-1 Dispenser",
    category: "Aerospace Chrome Hardware",
    shadeCode: "#TOOL",
    shadeName: "Hardware Only",
    shadeHex: "#949FA3",
    price: 58,
    tag: "Lifetime Warranty",
    image: "/images/product-dispenser.jpg",
  },
  {
    id: "prod-starter-russet",
    name: "Auburn Russet #3204 System",
    category: "Complete Starter Kit",
    shadeCode: "#3204",
    shadeName: "Auburn Russet",
    shadeHex: "#823824",
    price: 89,
    tag: "Curated Batch",
    image: "/images/model-auburn.jpg",
  },
];

export function NewDispatches({
  onAddToCart,
}: {
  onAddToCart?: (shade: ShadeItem) => void;
}) {
  return (
    <section id="system" className="py-24 px-6 sm:px-10 lg:px-14 max-w-[1600px] mx-auto border-t border-brand/40">
      {/* Editorial Heading */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
        <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-platinum tracking-wider uppercase">
          NEW IN
        </h2>
        <div className="w-10 h-[1.5px] bg-platinum/40 mx-auto mt-3" />
      </div>

      {/* 4-Card Luxury Photo Grid using Image 3 (#CED1D0) Light Platinum Background */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {NEW_ARRIVALS.map((item) => (
          <div
            key={item.id}
            className="group rounded-2xl bg-platinum text-obsidian border border-platinum/90 overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-200">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Badge */}
              {item.tag && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-obsidian text-platinum text-[9px] font-mono tracking-wider uppercase shadow-md">
                    {item.tag}
                  </span>
                </div>
              )}
            </div>

            {/* Product Meta on Image 3 (#CED1D0) Light Platinum Background */}
            <div className="p-5 space-y-3 bg-platinum text-obsidian">
              <div className="space-y-1 text-center">
                <span className="text-[10px] font-mono text-graphite tracking-widest uppercase block font-semibold">
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
                      name: item.shadeName,
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

      {/* View All Button */}
      <div className="text-center mt-14">
        <Link
          href="#shades"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-platinum border-b border-platinum/60 pb-1 hover:border-white hover:text-white transition-all"
        >
          <span>VIEW ALL PRODUCTS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
