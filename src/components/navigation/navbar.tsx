"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ColourpigLogo } from "@/components/brand/logo";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
}

export function Navbar({
  cartCount = 2,
  wishlistCount = 1,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="w-full relative z-50">
      {/* 1. Top 3-Column Black Announcement Bar */}
      <div className="bg-black text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-platinum border-b border-white/10 px-4 sm:px-8 py-2 whitespace-nowrap overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="hidden lg:block text-left whitespace-nowrap flex-1">
            <span>INTERNATIONAL SHIPPING AVAILABLE</span>
          </div>
          <div className="text-center whitespace-nowrap flex-shrink-0 mx-auto lg:mx-0">
            <span>FREE SHIPPING ON ORDERS ABOVE $75 | LAUNCH ALLOCATION OPEN</span>
          </div>
          <div className="hidden lg:block text-right whitespace-nowrap flex-1">
            <span>30-DAY IN-SHOWER TRIAL &amp; EASY RETURNS</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Left Links, Center Logo, Right Icons */}
      <header className="w-full bg-obsidian/80 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 lg:px-14">
        <div className="max-w-[1600px] mx-auto h-20 flex items-center justify-between">
          
          {/* Left Navigation Links */}
          <div className="flex items-center gap-6 w-1/3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-platinum hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-mono font-medium tracking-[0.16em] uppercase text-platinum/90">
              <Link
                href="#system"
                className="hover:text-white transition-opacity duration-200"
              >
                The System
              </Link>
              <Link
                href="#shades"
                className="hover:text-white transition-opacity duration-200"
              >
                Shades
              </Link>
              <Link
                href="#bestsellers"
                className="hover:text-white transition-opacity duration-200"
              >
                Bestsellers
              </Link>
            </nav>
          </div>

          {/* Center Brand Wordmark */}
          <div className="flex items-center justify-center w-1/3">
            <Link href="/" className="inline-flex items-center group">
              <ColourpigLogo color="#FFFFFF" className="h-7 sm:h-8" />
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-5 sm:gap-6 text-platinum w-1/3">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:text-white transition-transform active:scale-95"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Account Icon */}
            <button
              className="p-1 hover:text-white transition-transform active:scale-95 hidden sm:block"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist Heart with Pill Badge */}
            <button
              className="p-1 hover:text-white transition-transform active:scale-95 relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-white text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag with Pill Badge */}
            <button
              onClick={onOpenCart}
              className="p-1 hover:text-white transition-transform active:scale-95 relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-white text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Flyout */}
        {searchOpen && (
          <div className="border-t border-white/10 py-3 transition-all">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-ash" />
              <input
                type="text"
                placeholder="Search shades, refill pods, or precision tools..."
                className="w-full bg-transparent border-none text-xs font-mono text-white placeholder:text-ash/60 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[10px] font-mono text-ash hover:text-white"
              >
                ESC
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-5 space-y-4 text-xs font-mono tracking-widest uppercase text-platinum">
            <Link
              href="#system"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-white py-1"
            >
              The System
            </Link>
            <Link
              href="#shades"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-white py-1"
            >
              Shades
            </Link>
            <Link
              href="#bestsellers"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-white py-1"
            >
              Bestsellers
            </Link>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-ash">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> Account
              </span>
              <span>USD ($)</span>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
