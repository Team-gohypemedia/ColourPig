"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";
import { useStore } from "@/context/store-context";

export function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    closeWishlist,
    removeFromWishlist,
    moveFromWishlistToCart,
    formatPrice,
  } = useStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex justify-end"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-obsidian/75 backdrop-blur-sm"
          />

          {/* Side Drawer Panel */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative w-full max-w-[440px] h-full bg-white text-obsidian shadow-2xl flex flex-col z-10 overflow-hidden"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Top Spectrum Ribbon Line (Brand Theme) */}
            <div className="w-full h-[3px] bg-gradient-to-r from-[#FFC72C] via-[#F08EAB] via-[#00A3E0] via-[#FF671F] via-[#7AC142] to-[#B584C4] flex-shrink-0" />

            {/* 1. Header */}
            <div className="px-6 py-4 sm:py-5 border-b border-ash/20 flex items-start justify-between bg-white flex-shrink-0 z-20">
              <div>
                <div className="flex items-center gap-2">
                  <SnoutIcon className="w-4 h-4 text-obsidian" color="#0D151C" />
                  <h2 className="text-base sm:text-lg font-headline font-bold tracking-wider text-obsidian uppercase">
                    My Favorites
                  </h2>
                  <span className="text-xs font-mono text-graphite font-semibold px-2 py-0.5 rounded-full bg-platinum/50 border border-ash/30">
                    {wishlist.length}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-graphite mt-1">
                  Products you’ve hearted recently
                </p>
              </div>

              {/* Circular close button */}
              <button
                onClick={closeWishlist}
                className="w-8 h-8 rounded-full border border-ash/30 flex items-center justify-center text-graphite hover:text-obsidian hover:border-obsidian transition-colors"
                aria-label="Close favorites"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* 2. Scrollable Body with Native Smooth Scrolling */}
            <div
              ref={scrollRef}
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-drawer-scrollbar px-5 sm:px-6 py-4 space-y-3.5"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              {wishlist.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-platinum/40 flex items-center justify-center text-graphite">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline font-bold text-obsidian text-sm tracking-wide uppercase">
                      No favorites saved yet
                    </h3>
                    <p className="text-xs text-graphite max-w-[240px] mx-auto font-mono">
                      Tap the heart icon on any shade or applicator to save it for later.
                    </p>
                  </div>
                  <button
                    onClick={closeWishlist}
                    className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-obsidian text-white text-xs font-mono font-semibold tracking-wider uppercase hover:bg-black transition-colors"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-ash/25 bg-white shadow-2xs flex gap-3.5 sm:gap-4 items-center group transition-all hover:border-ash/50"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-24 sm:w-22 sm:h-26 rounded-lg overflow-hidden bg-platinum/30 border border-ash/20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Content & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[96px] sm:min-h-[104px] py-0.5">
                      <div>
                        <h3 className="text-xs sm:text-[13px] font-headline font-bold text-obsidian leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        {item.category && (
                          <p className="text-[10px] text-graphite font-mono mt-0.5 truncate">
                            {item.category}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm font-bold font-mono text-obsidian mt-1.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="py-2 px-3 rounded-xl border border-ash/30 bg-platinum/30 hover:bg-platinum/60 text-obsidian text-[11px] font-mono font-bold tracking-wider uppercase text-center transition-colors"
                        >
                          Remove
                        </button>

                        {/* View / Add Button in ColourPig Theme Color */}
                        <button
                          onClick={() => moveFromWishlistToCart(item.id)}
                          className="py-2 px-3 rounded-xl bg-obsidian hover:bg-black text-white text-[11px] font-mono font-bold tracking-wider uppercase text-center transition-colors shadow-2xs"
                        >
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Bottom clearance */}
              <div className="h-6" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
