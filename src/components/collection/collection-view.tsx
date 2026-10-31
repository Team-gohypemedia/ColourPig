"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useStore } from "@/context/store-context";

export interface CollectionItem {
  id: string;
  shadeId: string;
  name: string;
  description: string;
  category: string;
  colorFamily: "brown" | "blonde" | "black" | "clear";
  shadeCode: string;
  shadeHex: string;
  priceUsd: number;
  priceInr: number;
  image: string;
  rating: number;
  reviews: number;
}

// Exactly the 9 official products that exist on ColourPig website (no extra or demo items)
// Ordered to match the reference screenshot (Shade 4, Shade 7, Shade 1, Shade 0/0, followed by 3, 5, 6, 8, 9)
const COLLECTION_ITEMS: CollectionItem[] = [
  {
    id: "prod-shade-4",
    shadeId: "shade-4",
    name: "NO.4 MEDIUM BROWN SYSTEM",
    description: "Natural Chestnut Brown • Air-Driven Touch Up",
    category: "Natural Chestnut • Air-Driven Touch Up",
    colorFamily: "brown",
    shadeCode: "No.4",
    shadeHex: "#4E4136",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Medium Brown/MediumBrown.jpg",
    rating: 4.9,
    reviews: 310,
  },
  {
    id: "prod-shade-7",
    shadeId: "shade-7",
    name: "NO.7 MEDIUM BLONDE SYSTEM",
    description: "Warm Golden Blonde • Air-Driven Touch Up",
    category: "Warm Golden • Air-Driven Touch Up",
    colorFamily: "blonde",
    shadeCode: "No.7",
    shadeHex: "#BE966C",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Medium Blonde/MediumBlonde.jpg",
    rating: 4.9,
    reviews: 215,
  },
  {
    id: "prod-shade-1",
    shadeId: "shade-1",
    name: "NO.1 BLACK SYSTEM",
    description: "Pure Mineral Jet • 100% Coverage",
    category: "Pure Mineral Jet • 100% Coverage",
    colorFamily: "black",
    shadeCode: "No.1",
    shadeHex: "#2D2C2D",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Black/Black.jpg",
    rating: 5.0,
    reviews: 242,
  },
  {
    id: "prod-shade-0-0",
    shadeId: "shade-0-0",
    name: "NO.0/0 CLEAR GLOSS SYSTEM",
    description: "Universal Sheen • Multi-Use Gloss",
    category: "Universal Sheen • Multi-Use",
    colorFamily: "clear",
    shadeCode: "No.0/0",
    shadeHex: "#F2EFF0",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Clear/Clear.jpg",
    rating: 4.9,
    reviews: 118,
  },
  {
    id: "prod-shade-3",
    shadeId: "shade-3",
    name: "NO.3 DARK BROWN SYSTEM",
    description: "Dark Espresso • Velvet Depth",
    category: "Dark Espresso • Velvet Depth",
    colorFamily: "brown",
    shadeCode: "No.3",
    shadeHex: "#241E1C",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Brown/Brown.jpg",
    rating: 4.9,
    reviews: 195,
  },
  {
    id: "prod-shade-5",
    shadeId: "shade-5",
    name: "NO.5 LIGHT BROWN SYSTEM",
    description: "Warm Amber • Luminous Regrowth",
    category: "Warm Amber • Luminous Regrowth",
    colorFamily: "brown",
    shadeCode: "No.5",
    shadeHex: "#624F44",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Light Brown/LightBrown01.jpg",
    rating: 4.8,
    reviews: 167,
  },
  {
    id: "prod-shade-6",
    shadeId: "shade-6",
    name: "NO.6 DARK BLONDE SYSTEM",
    description: "Deep Honey • Caramel Depth",
    category: "Deep Honey • Caramel Depth",
    colorFamily: "blonde",
    shadeCode: "No.6",
    shadeHex: "#755A42",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Dark Blonde/DarkBlonde.jpg",
    rating: 4.9,
    reviews: 182,
  },
  {
    id: "prod-shade-8",
    shadeId: "shade-8",
    name: "NO.8 LIGHT BLONDE SYSTEM",
    description: "Sunlit Blonde • Pristine Clarity",
    category: "Sunlit Blonde • Pristine Clarity",
    colorFamily: "blonde",
    shadeCode: "No.8",
    shadeHex: "#D2A982",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Light Blonde/LightBlonde.jpg",
    rating: 4.8,
    reviews: 149,
  },
  {
    id: "prod-shade-9",
    shadeId: "shade-9",
    name: "NO.9 VERY LIGHT BLONDE SYSTEM",
    description: "Champagne Platinum • Maximum Luminescence",
    category: "Champagne Platinum • Zero Damage",
    colorFamily: "blonde",
    shadeCode: "No.9",
    shadeHex: "#E3C8AD",
    priceUsd: 89,
    priceInr: 2499,
    image: "/Very Light Brown/Very Light Blonde.00000.png",
    rating: 5.0,
    reviews: 188,
  },
];

const YOU_MIGHT_ALSO_LIKE_ITEMS = [
  {
    id: "shade-3",
    name: "COLOURPIG SYSTEM NO.3 DARK BROWN",
    category: "Dark Espresso • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    priceUsd: 89,
    image: "/Brown/Brown.jpg",
    shadeCode: "No.3",
    shadeHex: "#241E1C",
  },
  {
    id: "shade-5",
    name: "COLOURPIG SYSTEM NO.5 LIGHT BROWN",
    category: "Warm Amber • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    priceUsd: 89,
    image: "/Light Brown/LightBrown01.jpg",
    shadeCode: "No.5",
    shadeHex: "#624F44",
  },
  {
    id: "shade-7",
    name: "COLOURPIG SYSTEM NO.7 MEDIUM BLONDE",
    category: "Warm Golden • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    priceUsd: 89,
    image: "/Medium Blonde/MediumBlonde.jpg",
    shadeCode: "No.7",
    shadeHex: "#BE966C",
  },
  {
    id: "shade-1",
    name: "COLOURPIG SYSTEM NO.1 PURE BLACK",
    category: "Deep Mineral Jet • Full Coverage",
    priceInr: 2499,
    originalInr: 3499,
    priceUsd: 89,
    image: "/Black/Black.jpg",
    shadeCode: "No.1",
    shadeHex: "#2D2C2D",
  },
];

export function CollectionView() {
  const store = useStore();
  const [selectedColour, setSelectedColour] = useState<string>("all");
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Filter products by hair colour
  const filteredItems = useMemo(() => {
    if (selectedColour === "all") return COLLECTION_ITEMS;
    return COLLECTION_ITEMS.filter((item) => item.colorFamily === selectedColour);
  }, [selectedColour]);

  const handleQuickAdd = (item: CollectionItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    store.addToCart({
      id: `${item.id}-system`,
      name: item.name,
      variant: item.category,
      price: item.priceInr,
      image: item.image,
      shadeCode: item.shadeCode,
      shadeHex: item.shadeHex,
    });

    setAddedItemNotice(item.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleToggleWishlist = (item: CollectionItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    store.toggleWishlist({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.priceInr,
      image: item.image,
      shadeCode: item.shadeCode,
      shadeHex: item.shadeHex,
    });
  };

  const getProductHref = (item: CollectionItem) => {
    return `/product?shade=${item.shadeId}&image=${encodeURIComponent(item.image)}`;
  };

  return (
    <div className="w-full pb-20 select-none">
      {/* 1. Breadcrumb & Collection Main Heading (Compact refined vertical gap) */}
      <section className="pt-6 sm:pt-8 pb-4 sm:pb-5 px-4 sm:px-8 lg:px-14 max-w-[1600px] mx-auto text-center space-y-1 sm:space-y-1.5">
        {/* Breadcrumb Navigation: Home / Colourpig */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs font-montserrat text-obsidian tracking-wide">
          <Link
            href="/"
            className="hover:text-obsidian transition-colors underline-offset-4 hover:underline"
          >
            Home
          </Link>
          <span className="text-black/30 font-normal">/</span>
          <span className="text-obsidian font-medium">Colourpig</span>
        </nav>

        {/* Main Heading */}
        <h1 className="font-headline font-semibold text-[26px] sm:text-[30px] md:text-[32px] uppercase tracking-wider text-obsidian leading-tight">
          COLLECTION
        </h1>

        {/* Sub Heading */}
        <p className="font-montserrat text-xs sm:text-[13px] text-obsidian tracking-wide max-w-xl mx-auto">
          World&apos;s First Reusable Precision Hair Colour Systems
        </p>
      </section>

      {/* 2. Horizontal Divider Line below Heading Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 mb-6">
        <div className="w-full border-b border-black/10" />
      </div>

      {/* 3. Hair Colour Filter Bar */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Hair Colour Filter Options */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-montserrat font-semibold tracking-wider uppercase text-obsidian mr-1">
              Hair Colour:
            </span>

            {[
              { id: "all", label: "All Colours", count: 9 },
              { id: "black", label: "Black", colorHex: "#2D2C2D", count: 1 },
              { id: "brown", label: "Brown", colorHex: "#4E4136", count: 3 },
              { id: "blonde", label: "Blonde", colorHex: "#BE966C", count: 4 },
              { id: "clear", label: "Clear Gloss", colorHex: "#F2EFF0", count: 1 },
            ].map((filter) => {
              const isSelected = selectedColour === filter.id;

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setSelectedColour(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-montserrat font-medium tracking-wide transition-all cursor-pointer ${
                    isSelected
                      ? "bg-obsidian text-white shadow-xs scale-105"
                      : "bg-white text-obsidian hover:text-obsidian hover:bg-black/5 border border-black/10"
                  }`}
                >
                  {filter.colorHex && (
                    <span
                      className={`w-2 h-2 rounded-full border shrink-0 ${
                        isSelected ? "border-white/50" : "border-black/20"
                      }`}
                      style={{ backgroundColor: filter.colorHex }}
                    />
                  )}
                  <span>{filter.label}</span>
                  <span className={`text-[10px] ${isSelected ? "text-white/70" : "text-obsidian/70"}`}>
                    ({filter.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Count & Reset */}
          <div className="flex items-center gap-3 text-xs font-montserrat text-obsidian">
            <span>
              Showing <strong className="font-semibold text-obsidian">{filteredItems.length}</strong> of 9 products
            </span>
            {selectedColour !== "all" && (
              <button
                type="button"
                onClick={() => setSelectedColour("all")}
                className="text-xs font-montserrat text-obsidian underline underline-offset-2 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Product Grid (4-Column Layout exactly like the Reference Screenshot) */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredItems.map((item, index) => {
            const inWishlist = store.isInWishlist(item.id);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25) }}
                className="group flex flex-col"
              >
                {/* Portrait Image Container with Rounded Corners matching Reference Screenshot */}
                <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300">
                  <Link
                    href={getProductHref(item)}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                    />
                  </Link>

                  {/* Top-Right Circular Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleWishlist(item, e)}
                    className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-transform active:scale-95 ${
                      inWishlist
                        ? "text-rose-600"
                        : "text-obsidian hover:text-black"
                    }`}
                    aria-label={`Wishlist ${item.name}`}
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        inWishlist ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Row: Product Title & Price on Left, Cart Icon Button on Right */}
                <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-2">
                  <Link
                    href={getProductHref(item)}
                    className="space-y-0.5 sm:space-y-1 text-left block group/link min-w-0 flex-1"
                  >
                    {/* Line 1: Product Name */}
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors truncate">
                      {item.name}
                    </p>

                    {/* Line 2: Price */}
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] text-obsidian">
                      ${item.priceUsd} AUD
                    </p>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(item, e)}
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAECEB] hover:bg-obsidian text-obsidian hover:text-white transition-colors flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    aria-label={`Add ${item.name} to cart`}
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile-Only: Add to Cart button removed in favor of inline cart button */}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 5. Companion Essentials: YOU MIGHT ALSO LIKE (Matching reference screenshot) */}
      <section className="w-full mt-16 sm:mt-24 pt-14 sm:pt-20 pb-12 sm:pb-16 border-t border-black/10 bg-[#ECEEEF]/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14">
          {/* Section Heading */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          {/* 4 Cards Editorial Grid matching reference screenshot */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {YOU_MIGHT_ALSO_LIKE_ITEMS.map((item) => {
              const inWishlist = store.isInWishlist(item.id);

              return (
                <div key={item.id} className="group flex flex-col">
                  {/* Portrait Image Container */}
                  <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300">
                    <Link
                      href={`/product?shade=${item.id}&image=${encodeURIComponent(item.image)}`}
                      className="block w-full h-full relative"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                      />
                    </Link>

                    {/* Top-Right Circular Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        store.toggleWishlist({
                          id: item.id,
                          name: item.name,
                          category: item.category,
                          price: item.priceInr,
                          image: item.image,
                          shadeCode: item.shadeCode,
                          shadeHex: item.shadeHex,
                        });
                      }}
                      className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-transform active:scale-95 ${
                        inWishlist
                          ? "text-rose-600"
                          : "text-obsidian hover:text-black"
                      }`}
                      aria-label={`Wishlist ${item.name}`}
                    >
                      <Heart
                        className={`w-4 h-4 stroke-[1.5] ${
                          inWishlist ? "fill-rose-600 text-rose-600" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Left-Aligned Product Typography below Image */}
                  <Link
                    href={`/product?shade=${item.id}&image=${encodeURIComponent(item.image)}`}
                    className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1 text-left block group/link"
                  >
                    {/* Line 1: Product Name */}
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-obsidian group-hover/link:underline transition-colors truncate">
                      {item.name}
                    </p>

                    {/* Line 2: Category / Subtitle */}
                    <p className="font-montserrat text-[11px] sm:text-xs text-obsidian truncate">
                      {item.category}
                    </p>

                    {/* Line 3: Price with Strikethrough (matching reference screenshot) */}
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-xs sm:text-sm font-montserrat font-semibold text-obsidian">
                        {store.formatPrice(item.priceInr)}
                      </span>
                      <span className="text-[10px] font-montserrat text-ash line-through">
                        {store.formatPrice(item.originalInr)}
                      </span>
                    </div>
                  </Link>

                  {/* Mobile-Only: Add to Cart button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      store.addToCart({
                        id: `${item.id}-system`,
                        name: item.name,
                        variant: item.category,
                        price: item.priceInr,
                        image: item.image,
                        shadeCode: item.shadeCode,
                        shadeHex: item.shadeHex,
                      });
                      setAddedItemNotice(item.name);
                      setTimeout(() => setAddedItemNotice(null), 2500);
                    }}
                    className="sm:hidden mt-2.5 w-full py-2 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-montserrat font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating Notification when an item is added to cart */}
      <AnimatePresence>
        {addedItemNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 py-3 px-4 rounded-xl bg-obsidian text-white text-xs font-montserrat shadow-2xl flex items-center gap-2.5 border border-white/20"
          >
            <div className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>
              Added <strong className="font-bold">{addedItemNotice}</strong> to cart
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CollectionView;
