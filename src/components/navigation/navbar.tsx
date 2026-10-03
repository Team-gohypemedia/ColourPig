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
  cartCount = 1,
  wishlistCount = 0,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Sleek Announcement Strip */}
      <div className="bg-obsidian border-b border-brand/50 text-[10px] font-mono text-ash tracking-widest uppercase py-1.5 px-6 text-center select-none">
        <span>WORLD&apos;S FIRST REUSABLE AIR-DRIVEN SYSTEM • 90% LESS WASTE</span>
      </div>

      {/* Main Minimal Header */}
      <header className="sticky top-0 z-40 bg-obsidian/95 backdrop-blur-md border-b border-brand/50 h-14 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link href="/" className="flex items-center group">
            <ColourpigLogo color="#CED1D0" className="h-5 sm:h-6" />
          </Link>

          {/* Clean Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-widest uppercase text-ash">
            <Link href="#shop" className="hover:text-platinum transition-colors">
              The System
            </Link>
            <Link href="#shades" className="hover:text-platinum transition-colors">
              Shade Lab
            </Link>
            <Link href="#engineering" className="hover:text-platinum transition-colors">
              Engineering
            </Link>
            <Link href="#about" className="hover:text-platinum transition-colors">
              Norman &amp; Brown
            </Link>
          </nav>

          {/* Right: Clean E-Commerce Utility Icons */}
          <div className="flex items-center gap-4 text-ash">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-platinum transition-colors p-1"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Profile */}
            <button
              className="hover:text-platinum transition-colors p-1 hidden sm:block"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              className="hover:text-platinum transition-colors p-1 relative hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-steel text-[8px] font-mono text-platinum flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-steel/50 border border-brand/60 text-platinum hover:bg-steel transition-all"
              aria-label="Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono text-xs font-medium">{cartCount}</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-ash hover:text-platinum"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search Flyout */}
        {searchOpen && (
          <div className="absolute top-14 left-0 right-0 border-b border-brand bg-midnight px-6 py-2.5 z-50">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-3.5 h-3.5 text-ash" />
              <input
                type="text"
                placeholder="Search shades (#1903 Ash Blond, #2401 Brunette), refills, tools..."
                className="w-full bg-transparent border-none text-xs font-mono text-platinum placeholder:text-ash/50 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[10px] font-mono text-ash hover:text-platinum"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
