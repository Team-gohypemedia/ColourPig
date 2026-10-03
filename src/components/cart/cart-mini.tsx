"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import { SnoutIcon } from "@/components/brand/logo";
import { ShadeItem } from "@/components/sections/hero-section";

export interface CartProduct {
  id: string;
  name: string;
  shade: ShadeItem;
  price: number;
  quantity: number;
}

interface CartMiniProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartProduct[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export function CartMini({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
}: CartMiniProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShipping = subtotal >= 75;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-midnight border-l border-brand z-50 flex flex-col shadow-2xl text-platinum"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SnoutIcon className="w-6 h-6" color="#CED1D0" />
                <h3 className="font-headline font-semibold text-lg">
                  Dispatch Bag ({items.reduce((s, i) => s + i.quantity, 0)})
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-ash hover:text-white transition-colors"
                aria-label="Close Bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping banner */}
            <div className="px-6 py-2.5 bg-steel/40 border-b border-brand text-[11px] font-mono text-ash">
              {freeShipping
                ? "✓ Complimentary Worldwide Express Unlocked"
                : `Add $${(75 - subtotal).toFixed(2)} more for complimentary express delivery`}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-ash space-y-3">
                  <ShoppingBag className="w-10 h-10 opacity-30" />
                  <p className="text-xs font-mono uppercase tracking-widest">
                    Your bag is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-obsidian/70 border border-brand/40 flex gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: item.shade.hex }}
                    >
                      <SnoutIcon className="w-5 h-5 opacity-40" color="#000" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-headline font-medium text-xs text-platinum truncate">
                          {item.name}
                        </h4>
                        <span className="font-mono text-xs font-semibold ml-2">
                          ${item.price * item.quantity}
                        </span>
                      </div>

                      <p className="text-[11px] text-ash font-mono mt-0.5">
                        {item.shade.name} ({item.shade.code})
                      </p>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 bg-midnight px-2 py-1 rounded border border-brand/30">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-ash hover:text-platinum"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-ash hover:text-platinum"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-[11px] text-ash hover:text-red-400 font-mono transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-brand bg-obsidian space-y-4">
                <div className="flex justify-between font-mono text-sm font-semibold">
                  <span className="text-ash">Estimated Subtotal</span>
                  <span className="text-platinum">${subtotal.toFixed(2)} USD</span>
                </div>

                <button
                  onClick={() => alert("Proceeding to secure checkout...")}
                  className="w-full py-3.5 rounded-xl bg-platinum text-obsidian font-headline font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-ash">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>30-Day Guarantee • Climate Neutral Logistics</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
