"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection, CORE_SHADES, ShadeItem } from "@/components/sections/hero-section";
import { CartMini, CartProduct } from "@/components/cart/cart-mini";

// UI Inspiration Sections
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

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: "starter-system-1903",
      name: "Colourpig Starter System",
      shade: CORE_SHADES[0],
      price: 89,
      quantity: 1,
    },
  ]);

  const handleAddToCart = (shade: ShadeItem) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.shade.code === shade.code
    );

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: `starter-system-${shade.code.replace("#", "")}-${Date.now()}`,
          name: `Colourpig System (${shade.name})`,
          shade,
          price: 89,
          quantity: 1,
        },
      ]);
    }
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartProduct[]
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-obsidian text-platinum flex flex-col overflow-x-hidden selection:bg-steel selection:text-white">
      {/* Slide-out Cart Drawer */}
      <CartMini
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      {/* 1. E-Commerce Navbar (Preserved exact style) */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={1}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 2. 100vh Hero Section with Image 1 Luminous Spotlight Background */}
      <div className="w-full bg-hero-spotlight border-b border-brand/40">
        <HeroSection onAddToCart={handleAddToCart} />
      </div>

      {/* 3. NEW IN Product Grid (Image 3: #CED1D0 Light Platinum Section Background) */}
      <div className="w-full bg-platinum text-obsidian border-b border-obsidian/10">
        <NewDispatches onAddToCart={handleAddToCart} />
      </div>

      {/* 4. THE PRECISION SYSTEM (Image 2: #142431 Table of Contents Deep Petrol Navy Section Background) */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <SystemCategories />
      </div>

      {/* 5. BESTSELLERS 4-Card Grid (Image 3: #CED1D0 Light Platinum Section Background) */}
      <div className="w-full bg-platinum text-obsidian border-b border-obsidian/10">
        <Bestsellers onAddToCart={handleAddToCart} />
      </div>

      {/* 6. DISCOVER YOUR SHADE Lookbook Carousel */}
      <div className="w-full bg-obsidian text-platinum border-b border-brand/40">
        <ShadeFinder onSelectShade={handleAddToCart} />
      </div>

      {/* 7. Press & Editorial Bar */}
      <PressTicker />

      {/* 8. THE IN-SHOWER RITUAL Editorial Steps */}
      <div className="w-full bg-midnight text-platinum border-b border-brand/40">
        <InShowerRitual />
      </div>

      {/* 9. COMMUNITY ARCHIVE (#AIRHEADS) */}
      <div className="w-full bg-obsidian text-platinum border-b border-brand/40">
        <AirheadsCommunity />
      </div>

      {/* 10. BEHIND THE SCIENCE (Image 2: #142431 Table of Contents Deep Petrol Navy Section Background) */}
      <div className="w-full bg-toc text-platinum border-b border-white/10">
        <BehindTheScience />
      </div>

      {/* 11. A CLOSER LOOK (Material Swatches) */}
      <div className="w-full bg-midnight text-platinum border-b border-brand/40">
        <PigmentSwatches />
      </div>

      {/* 12. WHAT OUR CLIENTS SAY (Image 3: #CED1D0 Light Platinum Section Background) */}
      <div className="w-full bg-platinum text-obsidian border-b border-obsidian/10">
        <CustomerReviews />
      </div>

      {/* 13. Luxury E-Commerce Footer */}
      <EcommFooter />
    </div>
  );
}
