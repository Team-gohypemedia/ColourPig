"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColourpigLogo, SnoutIcon } from "@/components/brand/logo";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { StoryModal } from "@/components/navigation/story-modal";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenMenu?: () => void;
  solidBackground?: boolean;
}

export function Navbar({
  cartCount: propCartCount,
  wishlistCount: propWishlistCount,
  onOpenCart: propOpenCart,
  onOpenWishlist: propOpenWishlist,
  onOpenMenu: propOpenMenu,
  solidBackground,
}: NavbarProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const store = useStore();
  const cartCount = propCartCount ?? store.cartCount;
  const wishlistCount = propWishlistCount ?? store.wishlistCount;
  const handleOpenCart = propOpenCart ?? store.openCart;
  const handleOpenWishlist = propOpenWishlist ?? store.openWishlist;
  const handleOpenMenu = propOpenMenu ?? store.openMenu;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);

  // Stay transparent while hero section is visible on homepage; turn solid once it's fully scrolled past
  useEffect(() => {
    if (!isHomePage) return;

    const hero = document.getElementById("hero-section");
    if (!hero) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting = hero is still (at least partially) in viewport → keep transparent
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 } // fires as soon as ANY pixel of hero leaves/enters viewport
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomePage]);

  // Show solid background on other pages or when scrolled on homepage
  const showSolidBg = solidBackground ?? (!isHomePage || isScrolled);

  const navBg = showSolidBg
    ? "bg-obsidian/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    : "bg-transparent border-b border-transparent";

  const announcementBg = "bg-black border-b border-white/10";

  return (
    <div className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Spectrum Ribbon Line */}
      <div className="w-full h-[2.5px] bg-gradient-to-r from-[#FFC72C] via-[#F08EAB] via-[#00A3E0] via-[#FF671F] via-[#7AC142] to-[#B584C4]" />

      {/* 1. Top Announcement Bar - Solid Black */}
      <div
        className={`text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-platinum px-4 sm:px-8 py-2 whitespace-nowrap overflow-hidden ${announcementBg}`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          <div className="hidden lg:flex items-center gap-2 text-left whitespace-nowrap flex-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7AC142] animate-pulse" />
            <span>INTERNATIONAL SHIPPING AVAILABLE</span>
          </div>
          <div className="text-center whitespace-nowrap flex-shrink-0 mx-auto lg:mx-0 truncate max-w-full flex items-center justify-center gap-2">
            <span>FREE SHIPPING OVER $75</span>
            <span className="text-[#FFC72C] text-xs">◆</span>
            <span className="text-[#F08EAB]">PANTONE SYSTEM LAUNCH</span>
            <span className="text-[#00A3E0] text-xs">◆</span>
            <span>30-DAY TRIAL</span>
          </div>
          <div className="hidden lg:flex items-center justify-end gap-2 text-right whitespace-nowrap flex-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A3E0]" />
            <span>AIR-DRIVEN DISPENSER ALLOCATION OPEN</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header
        className={`w-full px-4 sm:px-10 lg:px-14 ${isHomePage ? "transition-all duration-500" : ""} ${navBg}`}
      >
        <div className="max-w-[1600px] mx-auto h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left Navigation Links / Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-6 lg:w-1/3">
            <button
              onClick={handleOpenMenu}
              className="lg:hidden p-2 -ml-2 text-platinum hover:text-white transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-8 text-[12px] font-mono font-medium tracking-[0.16em] uppercase text-platinum/90">
              <Link
                href="/product"
                className="hover:text-white transition-opacity duration-200 text-white font-bold"
              >
                Shop System
              </Link>
              <Link
                href="/#shades"
                className="hover:text-white transition-opacity duration-200"
              >
                Shades
              </Link>
              <Link
                href="/#bestsellers"
                className="hover:text-white transition-opacity duration-200"
              >
                Bestsellers
              </Link>
            </nav>
          </div>

          {/* Center Brand Wordmark */}
          <div className="flex items-center justify-center flex-1 lg:w-1/3 min-w-0 px-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center group max-w-[145px] xs:max-w-[170px] sm:max-w-none"
            >
              <ColourpigLogo
                color="#FFFFFF"
                className="h-4 xs:h-[18px] sm:h-7 lg:h-8 w-auto max-w-full"
              />
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 text-platinum lg:w-1/3">
            {/* Story Ring Avatar Trigger with Pig Snout Icon (Moved to Right Side) */}
            <button
              type="button"
              onClick={() => setStoryModalOpen(true)}
              className="relative flex items-center gap-2 group cursor-pointer focus:outline-none"
              aria-label="View Brand Stories"
              title="View ColourPig Stories"
            >
              {/* Ring Container with Moving Circular Gradient */}
              <div className="relative p-[2px] sm:p-[2.5px] rounded-full group-hover:scale-105 active:scale-95 transition-transform duration-300">
                {/* Moving Conic Gradient Spinning in a Circle */}
                <div
                  className="absolute inset-0 rounded-full animate-spin [animation-duration:5s] [animation-timing-function:linear]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #D4AF37, #F6E27A, #C59B27, #FFF2A6, #AA771C, #D4AF37)",
                  }}
                />

                {/* Soft Radial Gold Glow */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_18px_rgba(246,226,122,0.7)] pointer-events-none transition-shadow duration-300" />

                {/* Inner Disc (Version 1: Black when transparent; Version 2: White when solid navbar) */}
                <div
                  className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center p-1 transition-colors duration-300 ${
                    showSolidBg ? "bg-white" : "bg-black"
                  }`}
                >
                  <SnoutIcon
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-300 ${
                      showSolidBg ? "text-[#0A0A0A]" : "text-white"
                    }`}
                    color={showSolidBg ? "#0A0A0A" : "#FFFFFF"}
                  />
                </div>
              </div>
            </button>

            {/* Search Icon (Desktop/Tablet only) */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:text-white transition-transform active:scale-95 hidden sm:block"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Account Icon (Desktop/Tablet only) */}
            <button
              onClick={handleOpenMenu}
              className="p-1 hover:text-white transition-transform active:scale-95 hidden sm:block"
              aria-label="Account"
            >
              <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
            </button>

            {/* Wishlist Heart - Accessible on desktop & mobile */}
            <button
              onClick={handleOpenWishlist}
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

            {/* Shopping Bag - Always visible */}
            <button
              onClick={handleOpenCart}
              className="p-1.5 hover:text-white transition-transform active:scale-95 relative -mr-1 sm:mr-0"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 sm:w-[18px] sm:h-[18px] stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-1 rounded-full bg-white text-black text-[9px] font-mono font-bold flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Search Flyout on Desktop */}
        {searchOpen && (
          <div className="hidden sm:block border-t border-white/10 py-3 transition-all">
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

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-5 px-1 space-y-4 text-xs font-mono tracking-widest uppercase text-platinum bg-obsidian/95 backdrop-blur-md">
            {/* Search Input inside mobile menu */}
            <div className="relative pb-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ash" />
              <input
                type="text"
                placeholder="SEARCH SHADES OR KITS..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-ash/50 focus:outline-none focus:border-white/30"
              />
            </div>

            {/* Primary Nav Links */}
            <div className="space-y-1">
              <Link
                href="/#system"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 rounded-lg transition-colors"
              >
                The System
              </Link>
              <Link
                href="/#shades"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 rounded-lg transition-colors"
              >
                Shades
              </Link>
              <Link
                href="/#bestsellers"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 rounded-lg transition-colors"
              >
                Bestsellers
              </Link>
              <Link
                href="/#shade-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-2 rounded-lg transition-colors"
              >
                Before &amp; After
              </Link>
            </div>

            {/* Items moved under hamburger: Stories, Wishlist, Account, Region */}
            <div className="pt-3 border-t border-white/10 space-y-2.5 text-[11px] text-ash">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStoryModalOpen(true);
                }}
                className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <div className="relative p-[1.5px] rounded-full overflow-hidden">
                    <div
                      className="absolute inset-0 rounded-full animate-spin [animation-duration:5s] [animation-timing-function:linear]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #D4AF37, #F6E27A, #C59B27, #FFF2A6, #AA771C, #D4AF37)",
                      }}
                    />
                    <div className="relative z-10 w-5 h-5 rounded-full bg-black flex items-center justify-center p-0.5 text-white">
                      <SnoutIcon className="w-3.5 h-3.5 text-white" color="#FFFFFF" />
                    </div>
                  </div>
                  <span className="text-white font-medium">Brand Stories</span>
                </span>
                <span className="text-[10px] font-mono text-[#F3E5AB]">Watch</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                  <span>Saved Wishlist</span>
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">
                  {wishlistCount} saved
                </span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-ash" />
                  <span>Account &amp; Orders</span>
                </span>
                <span className="text-[10px] text-ash/80 font-mono">Sign In</span>
              </button>

              <div className="flex items-center justify-between py-1.5 px-2 pt-2 border-t border-white/5 text-[10px] text-ash/60">
                <span>REGION / CURRENCY</span>
                <span className="text-platinum font-mono">USD ($)</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Instagram-Style Story Modal */}
      <StoryModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
      />
    </div>
  );
}
