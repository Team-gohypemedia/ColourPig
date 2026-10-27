"use client";

import React from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection, ShadeItem } from "@/components/sections/hero-section";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { StoreProvider, useStore } from "@/context/store-context";

// UI Inspiration Sections
import { ColorfulMarquee } from "@/components/home/colorful-marquee";
import { NewDispatches } from "@/components/home/new-dispatches";
import { SystemCategories } from "@/components/home/system-categories";
import { Bestsellers } from "@/components/home/bestsellers";
import { ShadeFinder } from "@/components/home/shade-finder";
import { PressTicker } from "@/components/home/press-ticker";
import { InShowerRitual } from "@/components/home/in-shower-ritual";
import { AirheadsCommunity } from "@/components/home/airheads-community";
import { BehindTheScience } from "@/components/home/behind-the-science";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { EcommFooter } from "@/components/home/ecomm-footer";

import { OFFICIAL_SHADES } from "@/data/shades";
import { StickyUnder } from "@/components/motion/motion-primitives";

function HomeContent() {
  const { addToCart } = useStore();

  const handleAddToCart = (shade: ShadeItem) => {
    const foundShade = OFFICIAL_SHADES.find((s) => s.code === shade.code);
    const imagePath = foundShade?.cardImage || "/Medium Brown/Medium Brown.00000.png";

    const shadeId = foundShade?.id || `shade-${shade.code.toLowerCase().replace(/^(no\.?|#)/, "").replace("/", "-")}`;

    addToCart({
      id: `${shadeId}-starter-system`,
      name: `Colourpig Starter System | ${shade.name}`,
      variant: `${shade.undertone} • Complete Starter System`,
      price: 2499,
      originalPrice: 3499,
      image: imagePath,
      shadeCode: shade.code,
      shadeHex: shade.hex,
    });
  };

  return (
    <div className="min-h-screen w-full bg-white text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side-Page Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* 1. E-Commerce Navbar */}
      <Navbar />

      {/* 2. Video Hero Section */}
      <HeroSection onAddToCart={handleAddToCart} />

      {/* Brand Colorful Infinite Marquee */}
      <ColorfulMarquee />

      {/* 3. EXPLORE YOUR SHADE Product Grid */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <NewDispatches onAddToCart={handleAddToCart} />
      </div>

      {/* 4 + 5: Before & After slides up over The Precision System, which holds still underneath */}
      <div className="relative">
        {/* 4. THE PRECISION SYSTEM */}
        <StickyUnder className="w-full bg-white text-obsidian border-b border-ash/30">
          <SystemCategories />
        </StickyUnder>

        {/* 5. BEFORE & AFTER RESULTS */}
        <div className="relative z-10 w-full bg-white text-obsidian border-b border-ash/30 shadow-[0_-24px_48px_-12px_rgba(13,21,28,0.18)]">
          <ShadeFinder onAddToCart={handleAddToCart} />
        </div>
      </div>

      {/* 6. BESTSELLERS 4-Card Grid */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <Bestsellers onAddToCart={handleAddToCart} />
      </div>

      {/* 7. Press & Editorial Bar */}
      <PressTicker />

      {/* 8. THE IN-SHOWER RITUAL */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <InShowerRitual />
      </div>

      {/* 9. THE SYSTEM (BEHIND THE SCIENCE) */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <BehindTheScience />
      </div>

      {/* 10. COMMUNITY ARCHIVE (#AIRHEADS) */}
      <div className="w-full bg-black text-white border-b border-white/10">
        <AirheadsCommunity />
      </div>

      {/* 11. WHAT OUR CLIENTS SAY */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <CustomerReviews />
      </div>

      {/* 13. Luxury E-Commerce Footer */}
      <EcommFooter />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  );
}
