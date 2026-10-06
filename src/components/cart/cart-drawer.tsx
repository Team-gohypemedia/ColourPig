"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowLeft, Lock, ShoppingBag, Sparkles } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";
import { useStore } from "@/context/store-context";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateCartQuantity,
    addToCart,
    recommendations,
    formatPrice,
  } = useStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
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
            onClick={closeCart}
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

            {/* 1. Sticky Header */}
            <div className="px-6 py-4 sm:py-5 border-b border-ash/20 flex items-center justify-between bg-white flex-shrink-0 z-20">
              <div className="flex items-center gap-2.5">
                <SnoutIcon className="w-4 h-4 text-obsidian" color="#0D151C" />
                <h2 className="text-base sm:text-lg font-headline font-bold tracking-wider text-obsidian uppercase">
                  YOUR CART
                </h2>
                <span className="text-xs font-mono text-graphite font-semibold px-2 py-0.5 rounded-full bg-platinum/50 border border-ash/30">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full border border-ash/30 flex items-center justify-center text-graphite hover:text-obsidian hover:border-obsidian transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* 2. Free Shipping Progress Bar (Brand Accent) */}
            <div className="px-6 py-2.5 bg-platinum/30 border-b border-ash/20 text-[10px] sm:text-[11px] font-mono text-graphite flex items-center justify-between flex-shrink-0">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#FFC72C]" />
                <span>COMPLIMENTARY SHIPPING OVER ₹2,499</span>
              </span>
              <span className="font-semibold text-obsidian">UNLOCKED</span>
            </div>

            {/* 3. Fully Scrollable Body with Native Smooth Scrolling */}
            <div
              ref={scrollContainerRef}
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-drawer-scrollbar px-5 sm:px-6 py-4 space-y-6"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-platinum/40 flex items-center justify-center text-graphite">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-headline font-bold text-obsidian text-sm tracking-wide uppercase">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-graphite max-w-[220px] mx-auto font-mono">
                      Explore our root touch-up systems and refill pods.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-obsidian text-white text-xs font-mono font-semibold tracking-wider uppercase hover:bg-black transition-colors"
                  >
                    Explore Shades
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-xl border border-ash/25 bg-white shadow-2xs hover:border-ash/50 transition-all flex gap-3.5 sm:gap-4 items-start"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 sm:w-22 sm:h-26 rounded-lg overflow-hidden bg-platinum/30 border border-ash/20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[96px] sm:min-h-[104px]">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <Link
                              href="/product"
                              onClick={closeCart}
                              className="text-xs sm:text-[13px] font-headline font-bold text-obsidian leading-snug line-clamp-2 hover:underline"
                            >
                              {item.name}
                            </Link>

                            {/* Delete Item Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 -mr-1 text-ash hover:text-red-500 transition-colors flex-shrink-0"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-4 h-4 stroke-[1.5]" />
                            </button>
                          </div>

                          <p className="text-[11px] text-graphite font-mono mt-1 truncate">
                            {item.variant}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7AC142]" />
                            <span className="text-[10px] text-graphite font-mono">
                              In stock: {item.inStock}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Pill & Price Row */}
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-ash/15">
                          {/* [- 1 +] Pill selector */}
                          <div className="inline-flex items-center gap-2 border border-ash/30 rounded-full px-2 py-0.5 bg-platinum/20">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="text-graphite hover:text-obsidian transition-colors p-1"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-obsidian min-w-[14px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="text-graphite hover:text-obsidian transition-colors p-1"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <span className="text-xs sm:text-sm font-bold text-obsidian font-mono tracking-tight">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. Cross-sell: "You may also like" */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-headline font-bold tracking-wider uppercase text-obsidian">
                    You may also like
                  </h3>
                  <span className="text-[10px] font-mono text-graphite">
                    PRECISION ESSENTIALS
                  </span>
                </div>

                <div className="space-y-2.5">
                  {recommendations.slice(0, 3).map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-ash/20 bg-platinum/15 hover:bg-platinum/30 transition-colors"
                    >
                      {/* Rec Thumbnail */}
                      <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden bg-white border border-ash/20 flex-shrink-0">
                        <Image
                          src={rec.image}
                          alt={rec.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Rec Info */}
                      <div className="flex-1 min-w-0 pr-1">
                        <h4 className="text-xs font-headline font-semibold text-obsidian line-clamp-1">
                          {rec.name}
                        </h4>
                        <p className="text-[10px] text-graphite font-mono truncate mt-0.5">
                          {rec.variant}
                        </p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-bold font-mono text-obsidian">
                            {formatPrice(rec.price)}
                          </span>
                          {rec.originalPrice && (
                            <span className="text-[10px] font-mono text-ash line-through">
                              {formatPrice(rec.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add Button in Brand Theme */}
                      <button
                        onClick={() =>
                          addToCart({
                            id: `rec-added-${rec.id}`,
                            name: rec.name,
                            variant: rec.variant,
                            price: rec.price,
                            originalPrice: rec.originalPrice,
                            image: rec.image,
                            inStock: rec.inStock,
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-obsidian hover:bg-black text-white text-[11px] font-mono font-semibold tracking-wider uppercase transition-all flex-shrink-0 shadow-2xs"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom spacing buffer for seamless scroll clearance */}
              <div className="h-4" />
            </div>

            {/* 5. Sticky Bottom Summary & Checkout in ColourPig Brand Theme */}
            {cart.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-ash/25 bg-white space-y-3.5 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-20">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-graphite">
                    SUBTOTAL
                  </span>
                  <span className="text-lg font-bold font-mono text-obsidian tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-[10px] sm:text-[11px] text-graphite font-mono">
                  Taxes &amp; shipping calculated at checkout.
                </p>

                {/* Two buttons side-by-side */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Left: Continue Shopping (Light Platinum) */}
                  <button
                    onClick={closeCart}
                    className="w-full py-3.5 px-3 rounded-xl border border-ash/30 bg-platinum/30 hover:bg-platinum/60 text-obsidian text-[11px] font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>CONTINUE</span>
                  </button>

                  {/* Right: Checkout in ColourPig Theme Color (Obsidian Black) */}
                  <button
                    onClick={() => {
                      alert("Proceeding to secure checkout...");
                    }}
                    className="w-full py-3.5 px-3 rounded-xl bg-obsidian hover:bg-black text-white text-[11px] font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>CHECKOUT</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
