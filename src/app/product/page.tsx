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
  const shadeParam = searchParams.get("shade") || "shade-4";

  return (
    <div className="min-h-screen w-full bg-[#F5F6F6] text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
      {/* Side-Page Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <HamburgerMenu />

      {/* Navigation */}
      <Navbar />

      {/* Main PDP Content */}
      <main className="flex-1 pt-24 sm:pt-28">
        <ProductDetailView initialShadeId={shadeParam} />
      </main>

      {/* Luxury Brand Footer */}
      <EcommFooter />
    </div>
  );
}

export default function ProductPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#F5F6F6]" />}>
        <ProductPageInner />
      </Suspense>
    </StoreProvider>
  );
}
