"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ColourpigWordmark, SnoutEmblem } from "@/components/brand/brand-logo";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Menu, X } from "lucide-react";

export function Header() {
  const { openCart, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Technical Announcement Bar */}
      <div className="bg-obsidian border-b border-brand/40 text-[11px] font-mono text-ash tracking-widest uppercase py-2 px-4 text-center">
        <span className="hidden sm:inline">Norman &amp; Brown Precision Labs • </span>
        <span>Single-use is over • World&apos;s first air-driven system</span>
        <span className="hidden md:inline"> • 90% Less Waste</span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-obsidian/90 backdrop-blur-md border-b border-brand py-3.5 shadow-xl shadow-black/50"
            : "bg-obsidian/60 backdrop-blur-sm border-b border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link href="/" className="group flex items-center gap-3">
            <ColourpigWordmark color="#CED1D0" className="h-6" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-ash">
            <a href="#system" className="hover:text-platinum transition-colors">
              The System
            </a>
            <a href="#shades" className="hover:text-platinum transition-colors">
              Shade Lab
            </a>
            <a href="#technology" className="hover:text-platinum transition-colors">
              Engineering
            </a>
            <a href="#impact" className="hover:text-platinum transition-colors">
              Zero-Waste Data
            </a>
            <a href="#heritage" className="hover:text-platinum transition-colors">
              Norman &amp; Brown
            </a>
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-mono text-ash tracking-wider px-2.5 py-1 rounded border border-brand/40">
              USD ($)
            </span>

            {/* Bag Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-lg bg-steel/40 border border-brand/50 hover:bg-steel/70 text-platinum transition-all flex items-center gap-2 group"
              aria-label="Open dispatch bag"
            >
              <ShoppingBag className="w-4 h-4 text-platinum group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs font-semibold">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ash hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-brand bg-obsidian/95 backdrop-blur-xl px-6 py-6 space-y-4 text-sm font-mono uppercase tracking-wider">
            <a
              href="#system"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ash hover:text-platinum"
            >
              The System
            </a>
            <a
              href="#shades"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ash hover:text-platinum"
            >
              Shade Lab
            </a>
            <a
              href="#technology"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ash hover:text-platinum"
            >
              Engineering
            </a>
            <a
              href="#impact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ash hover:text-platinum"
            >
              Zero-Waste Data
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-ash hover:text-platinum"
            >
              Norman &amp; Brown
            </a>
          </div>
        )}
      </header>
    </>
  );
}
