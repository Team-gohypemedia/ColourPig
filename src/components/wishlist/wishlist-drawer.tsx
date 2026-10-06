"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, MessageCircle } from "lucide-react";
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

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative w-full max-w-[440px] h-full bg-white text-neutral-900 shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* 1. Header */}
            <div className="px-6 py-5 border-b border-neutral-100 flex items-start justify-between bg-white flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                  My Favorites
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  Products you’ve hearted recently
                </p>
              </div>

              {/* Circular close button matching screenshot */}
              <button
                onClick={closeWishlist}
                className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
                aria-label="Close favorites"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* 2. Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-3.5 relative">
              {wishlist.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-neutral-800 text-sm">
                      No favorites saved yet
                    </h3>
                    <p className="text-xs text-neutral-500 max-w-[240px] mx-auto">
                      Tap the heart icon on any shade or applicator to save it for later.
                    </p>
                  </div>
                  <button
                    onClick={closeWishlist}
                    className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#581F33] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#451626] transition-colors"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 sm:p-4 rounded-2xl border border-neutral-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex gap-4 items-center group transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.06)]"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Content & Actions */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-24 sm:h-28 py-0.5">
                      <div>
                        <h3 className="text-xs sm:text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold font-mono text-neutral-900 mt-1.5">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold tracking-wide text-center transition-colors"
                        >
                          Remove
                        </button>

                        {/* View / Add Button in Deep Plum */}
                        <button
                          onClick={() => moveFromWishlistToCart(item.id)}
                          className="py-2 px-3 rounded-xl bg-[#581F33] hover:bg-[#451626] text-white text-xs font-semibold tracking-wide text-center transition-colors shadow-2xs"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Floating WhatsApp Concierge Button matching the screenshot */}
            <div className="absolute bottom-6 right-6 z-20">
              <a
                href="https://wa.me/?text=Hello%20ColourPig%20Concierge,%20I%20have%20a%20question%20about%20hair%20shades%20and%20kits."
                target="_blank"
                rel="noopener noreferrer"
                className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all p-3"
                title="Chat on WhatsApp with Shade Specialist"
                aria-label="WhatsApp Concierge"
              >
                <MessageCircle className="w-7 h-7 fill-white stroke-none" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
