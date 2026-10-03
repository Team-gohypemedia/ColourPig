"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { X, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { SnoutEmblem } from "@/components/brand/brand-logo";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const freeShippingThreshold = 75;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-midnight border-l border-brand z-50 flex flex-col shadow-2xl text-platinum"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-brand flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SnoutEmblem className="w-6 h-6" color="#CED1D0" />
                <h3 className="font-headline font-semibold text-lg text-platinum">
                  Your Dispatch ({totalItems})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-ash hover:text-white transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3 bg-steel/40 border-b border-brand text-xs font-mono">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-ash">
                  {isFreeShipping
                    ? "Complimentary Worldwide Express Unlocked"
                    : `Add $${(freeShippingThreshold - subtotal).toFixed(2)} for complimentary shipping`}
                </span>
                {isFreeShipping && <Check className="w-3.5 h-3.5 text-platinum" />}
              </div>
              <div className="w-full h-1 bg-obsidian rounded-full overflow-hidden">
                <div
                  className="h-full bg-platinum transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-ash space-y-3">
                  <ShoppingBag className="w-10 h-10 opacity-30" />
                  <p className="text-sm font-mono uppercase tracking-wider">
                    Your dispatch bag is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-obsidian/70 border border-brand/40 flex gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: item.shadeHex }}
                    >
                      <SnoutEmblem className="w-6 h-6 opacity-30" color="#000" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-headline font-medium text-sm text-platinum truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold ml-2">
                          ${item.price * item.quantity}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: item.shadeHex }}
                        />
                        <span className="text-xs text-ash font-mono">
                          {item.shadeName} • {item.shadeCode}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 bg-midnight px-2 py-1 rounded border border-brand/30">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-ash hover:text-platinum transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono px-2 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-ash hover:text-platinum transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-ash hover:text-red-400 font-mono transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand bg-obsidian/80 space-y-4">
                <div className="space-y-1.5 text-sm font-mono">
                  <div className="flex justify-between text-ash">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-ash">
                    <span>Shipping</span>
                    <span>{isFreeShipping ? "FREE" : "$9.00"}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-platinum pt-2 border-t border-brand/40">
                    <span>Estimated Total</span>
                    <span>${(subtotal + (isFreeShipping ? 0 : 9)).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert("Proceeding to Colourpig Secure Checkout...")}
                  className="w-full py-4 rounded-xl bg-platinum text-obsidian font-headline font-bold text-sm tracking-wide uppercase hover:bg-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-ash pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day In-Shower Guarantee • Encrypted Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
