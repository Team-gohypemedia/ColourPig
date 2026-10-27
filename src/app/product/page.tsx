"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navigation/navbar";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { EcommFooter } from "@/components/home/ecomm-footer";
import { StoreProvider } from "@/context/store-context";

function ProductPageInner() {
  const searchParams = useSearchParams();
  const shadeParam = searchParams.get("shade") || searchParams.get("color") || "shade-4";
  const imageParam = searchParams.get("image") || searchParams.get("img");

  // Automatically scroll to the top whenever opening a product page or changing shades
  React.useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const lenis = (window as any).lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: true });
      }

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        const currentLenis = (window as any).lenis;
        if (currentLenis && typeof currentLenis.scrollTo === "function") {
          currentLenis.scrollTo(0, { immediate: true });
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [shadeParam, imageParam]);

  return (
    <div className="min-h-screen w-full bg-white text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side-Page Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* Navigation */}
      <Navbar />

      {/* Main PDP Content */}
      <main className="flex-1 pt-[104px] sm:pt-[120px]">
        <ProductDetailView initialShadeId={shadeParam} initialImage={imageParam || undefined} />
      </main>

      {/* Luxury Brand Footer */}
      <EcommFooter />
    </div>
  );
}

export default function ProductPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <ProductPageInner />
      </Suspense>
    </StoreProvider>
  );
}
