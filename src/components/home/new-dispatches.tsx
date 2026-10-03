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

      {/* 4-Card Luxury Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {NEW_ARRIVALS.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between cursor-pointer space-y-4"
          >
            {/* Image Card Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl bg-midnight border border-brand/60 overflow-hidden group-hover:border-platinum transition-all duration-300 shadow-xl">
              {/* Product Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Scrim for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

              {/* Badge */}
              {item.tag && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-obsidian/85 backdrop-blur border border-white/20 text-[9px] font-mono tracking-wider uppercase text-platinum">
                    {item.tag}
                  </span>
                </div>
              )}

              {/* Hover Quick Add Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.({
                    code: item.shadeCode,
                    name: item.shadeName,
                    hex: item.shadeHex,
                    undertone: item.category,
                  });
                }}
                className="absolute bottom-4 left-4 right-4 py-3.5 rounded-xl bg-platinum text-obsidian text-xs font-headline font-bold uppercase tracking-wider opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:bg-white"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Dispatch • ${item.price}</span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-1 text-center">
              <span className="text-[10px] font-mono text-ash uppercase tracking-widest block">
                {item.category}
              </span>
              <h3 className="font-headline font-semibold text-sm text-platinum group-hover:text-white transition-colors">
                {item.name}
              </h3>
              <p className="font-mono text-xs text-platinum font-bold pt-0.5">
                ${item.price} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Dispatches Button */}
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
