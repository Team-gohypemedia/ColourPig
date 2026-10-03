"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ColourpigLogo, SnoutIcon } from "@/components/brand/logo";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Globe,
} from "lucide-react";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
}

export function Navbar({
  cartCount = 1,
  wishlistCount = 2,
  onOpenCart,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Top Technical Announcement Bar */}
      <div className="bg-obsidian border-b border-brand text-[11px] font-mono text-ash tracking-widest uppercase py-2 px-4 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>NORMAN &amp; BROWN PRECISION LABS • EST. 2025</span>
        </div>
        <div className="mx-auto md:mx-0 text-center">
          <span>SINGLE-USE IS OVER • COMPLIMENTARY DISPATCH ON ORDERS $75+</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1 text-ash hover:text-platinum cursor-pointer">
            <Globe className="w-3 h-3" />
            <span>GLOBAL / USD ($)</span>
          </span>
        </div>
      </div>

      {/* Main E-Commerce Header */}
      <header className="sticky top-0 z-40 bg-obsidian/90 backdrop-blur-md border-b border-brand">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          {/* Left: Mobile Menu & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ash hover:text-platinum"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-ash">
              <Link href="#shop" className="hover:text-platinum transition-colors">
                Shop System
              </Link>
              <Link href="#shades" className="hover:text-platinum transition-colors">
                Shades
              </Link>
              <Link href="#engineering" className="hover:text-platinum transition-colors">
                Engineering
              </Link>
              <Link href="#about" className="hover:text-platinum transition-colors">
                Our Story
              </Link>
            </nav>
          </div>

          {/* Center: Brand Wordmark */}
          <Link href="/" className="flex items-center justify-center group">
            <ColourpigLogo color="#CED1D0" className="h-6 sm:h-7" />
          </Link>

          {/* Right: E-Commerce Utility Icons */}
          <div className="flex items-center gap-3 sm:gap-4 text-ash">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-platinum transition-colors relative"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account Profile */}
            <button
              className="p-2 hover:text-platinum transition-colors hidden sm:block"
              aria-label="Customer account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Wishlist / Saved */}
            <button
              className="p-2 hover:text-platinum transition-colors relative hidden sm:block"
              aria-label="Saved items"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-steel text-[9px] font-mono text-platinum flex items-center justify-center border border-obsidian">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag with Active Count */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-steel/50 border border-brand text-platinum hover:bg-steel/80 transition-all group"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform" />
              <span className="font-mono text-xs font-semibold">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Search Bar Flyout */}
        {searchOpen && (
          <div className="border-t border-brand bg-midnight px-6 py-3 transition-all">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-ash" />
              <input
                type="text"
                placeholder="Search shades (#1903, Ash Blond), refill pods, or precision tools..."
                className="w-full bg-transparent border-none text-xs font-mono text-platinum placeholder:text-ash/60 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs font-mono text-ash hover:text-platinum"
              >
                ESC
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand bg-obsidian/95 px-6 py-6 space-y-4 text-xs font-mono uppercase tracking-widest text-ash">
            <Link
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-platinum py-1"
            >
              Shop System
            </Link>
            <Link
              href="#shades"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-platinum py-1"
            >
              Shades
            </Link>
            <Link
              href="#engineering"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-platinum py-1"
            >
              Engineering
            </Link>
            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block hover:text-platinum py-1"
            >
              Our Story
            </Link>
            <div className="pt-4 border-t border-brand/40 flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> Account
              </span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> Saved ({wishlistCount})
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
