"use client";

import React, { Suspense } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { EcommFooter } from "@/components/home/ecomm-footer";
import { StoreProvider } from "@/context/store-context";
import { GalleryView } from "@/components/gallery/gallery-view";

function GalleryPageInner() {
  // Reset scroll to top on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: true });
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side-Page Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* Navigation */}
      <Navbar />

      {/* Main Gallery Content */}
      <main className="flex-1 pt-[88px] sm:pt-[104px]">
        <GalleryView />
      </main>

      {/* Luxury Brand Footer */}
      <EcommFooter />
    </div>
  );
}

export default function GalleryPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <GalleryPageInner />
      </Suspense>
    </StoreProvider>
  );
}

