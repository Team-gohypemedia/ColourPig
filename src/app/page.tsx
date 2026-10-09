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
import { PigmentSwatches } from "@/components/home/pigment-swatches";
import { CustomerReviews } from "@/components/home/customer-reviews";
import { EcommFooter } from "@/components/home/ecomm-footer";

function HomeContent() {
  const { addToCart } = useStore();

  const handleAddToCart = (shade: ShadeItem) => {
    const codeNum = shade.code.replace("No.", "").replace("/0", "1");
    const imagePath = `/images/products/cards/shade_card_${codeNum}.jpg`;

    addToCart({
      id: `system-${shade.code.replace("#", "").replace("/", "-")}`,
      name: `Colourpig Starter System (${shade.name})`,
      variant: `${shade.undertone} • Air-Driven Touch Up`,
      price: 2499,
      originalPrice: 3499,
      image: imagePath,
      shadeCode: shade.code,
      shadeHex: shade.hex,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F6F6] text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
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

      {/* 3. NEW IN Product Grid */}
      <div className="w-full bg-platinum text-obsidian border-b border-ash/30">
        <NewDispatches onAddToCart={handleAddToCart} />
      </div>

      {/* 4. THE PRECISION SYSTEM */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <SystemCategories />
      </div>

      {/* 5. BEFORE & AFTER RESULTS */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <ShadeFinder onAddToCart={handleAddToCart} />
      </div>

      {/* 6. BESTSELLERS 4-Card Grid */}
      <div className="w-full bg-platinum text-obsidian border-b border-ash/30">
        <Bestsellers onAddToCart={handleAddToCart} />
      </div>

      {/* 7. Press & Editorial Bar */}
      <PressTicker />

      {/* 8. THE IN-SHOWER RITUAL */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <InShowerRitual />
      </div>

      {/* 9. COMMUNITY ARCHIVE (#AIRHEADS) */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <AirheadsCommunity />
      </div>

      {/* 10. BEHIND THE SCIENCE */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <BehindTheScience />
      </div>

      {/* 11. A CLOSER LOOK */}
      <div className="w-full bg-white text-obsidian border-b border-ash/30">
        <PigmentSwatches />
      </div>

      {/* 12. WHAT OUR CLIENTS SAY */}
      <div className="w-full bg-platinum text-obsidian border-b border-ash/30">
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
