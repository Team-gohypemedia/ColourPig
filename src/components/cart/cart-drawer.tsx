"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ArrowLeft, Lock, ShoppingBag } from "lucide-react";
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

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
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
            <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between bg-white flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold tracking-tight text-neutral-900 uppercase">
                  YOUR CART
                </h2>
                <span className="text-xs font-mono text-neutral-400 font-semibold">
                  ({cart.reduce((a, b) => a + b.quantity, 0)})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 divide-y divide-neutral-100">
              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-neutral-800 text-sm">Your cart is empty</h3>
                    <p className="text-xs text-neutral-500">
                      Explore our root touch-up systems and refill pods.
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#581F33] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#451626] transition-colors"
                  >
                    Explore Shades
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-3 group relative items-start"
                    >
                      {/* Product Thumbnail */}
                      <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover object-center"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between h-24 sm:h-28 py-0.5">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 pr-1">
                            <h3 className="text-xs sm:text-[13px] font-semibold text-neutral-900 leading-snug line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-[11px] text-neutral-500 mt-1 truncate">
                              {item.variant}
                            </p>
                            <p className="text-[10px] text-neutral-400 mt-0.5">
                              In stock: {item.inStock}
                            </p>
                          </div>

                          {/* Delete Item Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 -mr-1 text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>

                        {/* Quantity Pill & Price Row */}
                        <div className="flex items-center justify-between mt-auto pt-2">
                          {/* [- 1 +] Pill selector */}
                          <div className="inline-flex items-center gap-2.5 border border-neutral-200 rounded-full px-2.5 py-1 bg-white shadow-2xs">
                            <button
                              onClick={() => updateCartQuantity(item.id, -1)}
                              className="text-neutral-500 hover:text-neutral-900 transition-colors p-0.5"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-semibold text-neutral-900 min-w-[12px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, 1)}
                              className="text-neutral-500 hover:text-neutral-900 transition-colors p-0.5"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Price */}
                          <span className="text-sm font-bold text-neutral-900 font-mono tracking-tight">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. Cross-sell: "You may also like" */}
              <div className="pt-6 space-y-3">
                <h3 className="text-sm font-bold tracking-tight text-neutral-900">
                  You may also like
                </h3>

                <div className="space-y-3">
                  {recommendations.slice(0, 2).map((rec) => (
                    <div
                      key={rec.id}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/60 hover:bg-neutral-50 transition-colors"
                    >
                      {/* Rec Thumbnail */}
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-white border border-neutral-200/60 flex-shrink-0">
                        <Image
                          src={rec.image}
                          alt={rec.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Rec Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-neutral-900 line-clamp-1">
                          {rec.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-bold font-mono text-neutral-900">
                            {formatPrice(rec.price)}
                          </span>
                          {rec.originalPrice && (
                            <span className="text-[11px] font-mono text-neutral-400 line-through">
                              {formatPrice(rec.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add/View Button */}
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
                        className="px-3.5 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-800 hover:border-neutral-900 hover:bg-white transition-all flex-shrink-0 shadow-2xs"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Bottom Sticky Summary & Action Buttons */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-100 bg-white space-y-4 flex-shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
                {/* Subtotal row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest font-semibold text-neutral-500">
                    SUBTOTAL
                  </span>
                  <span className="text-lg font-bold font-mono text-neutral-900 tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400">
                  Taxes &amp; shipping calculated at checkout.
                </p>

                {/* Two buttons side-by-side */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Left: Continue Shopping */}
                  <button
                    onClick={closeCart}
                    className="w-full py-3.5 px-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>CONTINUE</span>
                  </button>

                  {/* Right: Checkout in Deep Plum */}
                  <button
                    onClick={() => {
                      alert("Proceeding to secure SSL encrypted checkout...");
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#581F33] hover:bg-[#451626] text-white text-[11px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.99]"
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
