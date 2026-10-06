"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Heart,
  ShoppingBag,
  ChevronRight,
  Sparkles,
  MessageCircle,
  User,
  Globe,
} from "lucide-react";
import { ColourpigLogo, SnoutIcon } from "@/components/brand/logo";
import { useStore } from "@/context/store-context";

export function HamburgerMenu() {
  const {
    isMenuOpen,
    closeMenu,
    openCart,
    openWishlist,
    cartCount,
    wishlistCount,
    currency,
    setCurrency,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const NAV_ITEMS = [
    { label: "Shop Product Details", href: "/product", badge: "PDP" },
    { label: "The System", href: "/#system", badge: "Patented" },
    { label: "Shades & Formulas", href: "/#shades", badge: "9 Shades" },
    { label: "Bestsellers", href: "/#bestsellers", badge: "Top Picks" },
    { label: "Before & After Results", href: "/#shade-finder", badge: "Real Results" },
    { label: "In-Shower Ritual", href: "/#ritual", badge: "4 Steps" },
    { label: "Behind the Science", href: "/#science", badge: "Clean Formula" },
    { label: "Customer Reviews", href: "/#reviews", badge: "4.9 ★" },
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex justify-start"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-obsidian/75 backdrop-blur-sm"
          />

          {/* Side Drawer Panel */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="relative w-full max-w-[380px] sm:max-w-[420px] h-full bg-white text-obsidian shadow-2xl flex flex-col z-10 overflow-hidden"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Top Spectrum Ribbon Line (Brand Theme) */}
            <div className="w-full h-[3px] bg-gradient-to-r from-[#FFC72C] via-[#F08EAB] via-[#00A3E0] via-[#FF671F] via-[#7AC142] to-[#B584C4] flex-shrink-0" />

            {/* 1. Header with Logo & Close */}
            <div className="px-6 py-4 sm:py-5 border-b border-ash/20 flex items-center justify-between bg-white flex-shrink-0 z-20">
              <Link href="/" onClick={closeMenu} className="inline-block">
                <ColourpigLogo color="#0D151C" className="h-5 sm:h-6 w-auto" />
              </Link>

              <button
                onClick={closeMenu}
                className="w-8 h-8 rounded-full border border-ash/30 flex items-center justify-center text-graphite hover:text-obsidian hover:border-obsidian transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="w-4 h-4 stroke-[2]" />
              </button>
            </div>

            {/* 2. Search Box */}
            <div className="px-6 pt-4 pb-2 flex-shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ash" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH SHADES, PODS, KITS..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-platinum/25 border border-ash/30 text-xs font-mono text-obsidian placeholder:text-graphite/60 focus:outline-none focus:border-obsidian focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* 3. Quick Action Cards (Favorites & Cart) */}
            <div className="px-6 py-2.5 grid grid-cols-2 gap-2.5 flex-shrink-0">
              {/* My Favorites Card */}
              <button
                onClick={openWishlist}
                className="p-3 rounded-xl border border-ash/25 bg-platinum/20 hover:bg-platinum/40 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 fill-rose-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-headline font-bold text-obsidian truncate">
                      Favorites
                    </div>
                    <div className="text-[10px] text-graphite font-mono">
                      {wishlistCount} saved
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-ash group-hover:text-obsidian transition-colors" />
              </button>

              {/* Your Cart Card */}
              <button
                onClick={openCart}
                className="p-3 rounded-xl border border-ash/25 bg-platinum/20 hover:bg-platinum/40 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-obsidian text-white flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-headline font-bold text-obsidian truncate">
                      Your Cart
                    </div>
                    <div className="text-[10px] text-graphite font-mono">
                      {cartCount} items
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-ash group-hover:text-obsidian transition-colors" />
              </button>
            </div>

            {/* 4. Native Smooth Scrollable Navigation List */}
            <div
              ref={scrollRef}
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain custom-drawer-scrollbar px-6 py-2 space-y-1"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y",
              }}
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="text-[10px] font-mono tracking-widest uppercase text-graphite font-semibold px-2 py-1.5">
                DISCOVER &amp; EXPLORE
              </div>

              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-platinum/30 text-obsidian transition-colors group"
                >
                  <span className="text-xs font-mono font-medium tracking-wider uppercase">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-platinum/50 border border-ash/25 text-graphite transition-colors">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-ash group-hover:text-obsidian transition-colors" />
                  </div>
                </Link>
              ))}

              {/* Brand Technology Highlight Box */}
              <div className="mt-4 p-4 rounded-xl bg-obsidian text-platinum space-y-2 relative overflow-hidden border border-white/10">
                <div className="flex items-center gap-2">
                  <SnoutIcon className="w-4 h-4" color="#CED1D0" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-platinum font-semibold">
                    COLOURPIG AIR-DRIVEN SYSTEM
                  </span>
                </div>
                <p className="text-xs text-ash font-mono leading-relaxed">
                  Permanent salon-grade pigment micro-dispensed in 60 seconds with 100% root coverage.
                </p>
                <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-[#FFC72C]">
                  <Sparkles className="w-3 h-3" />
                  <span>30-Day Happiness Guarantee</span>
                </div>
              </div>

              <div className="h-4" />
            </div>

            {/* 5. Footer: Currency & Concierge Actions */}
            <div className="p-5 sm:p-6 border-t border-ash/25 bg-white flex-shrink-0 space-y-3 z-20">
              {/* Currency Selector */}
              <div className="flex items-center justify-between text-xs font-mono text-graphite">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-ash" />
                  <span>CURRENCY</span>
                </span>
                <div className="inline-flex rounded-lg border border-ash/30 p-0.5 bg-platinum/25">
                  <button
                    onClick={() => setCurrency("INR")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition-colors ${
                      currency === "INR"
                        ? "bg-white text-obsidian shadow-2xs"
                        : "text-graphite hover:text-obsidian"
                    }`}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono transition-colors ${
                      currency === "USD"
                        ? "bg-white text-obsidian shadow-2xs"
                        : "text-graphite hover:text-obsidian"
                    }`}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* WhatsApp Shade Specialist Chat */}
              <a
                href="https://wa.me/?text=Hello%20ColourPig%20Concierge,%20I%20need%20help%20choosing%20my%20hair%20shade."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Shade Specialist</span>
              </a>

              {/* User Account */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-graphite font-mono">
                <span className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  <span>Account &amp; Orders</span>
                </span>
                <span className="text-obsidian font-semibold cursor-pointer hover:underline">
                  Sign In
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
