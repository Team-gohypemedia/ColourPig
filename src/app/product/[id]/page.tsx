"use client";

import React, { use } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { WishlistDrawer } from "@/components/wishlist/wishlist-drawer";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { EcommFooter } from "@/components/home/ecomm-footer";
import { StoreProvider } from "@/context/store-context";

export default function DynamicProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <StoreProvider>
      <div className="min-h-screen w-full bg-[#F5F6F6] text-obsidian flex flex-col overflow-x-clip selection:bg-steel selection:text-white">
        {/* Side-Page Drawers */}
        <CartDrawer />
        <WishlistDrawer />
        <HamburgerMenu />

        {/* Navigation */}
        <Navbar />

        {/* Main PDP Content */}
        <main className="flex-1 pt-24 sm:pt-28">
          <ProductDetailView initialShadeId={resolvedParams.id} />
        </main>

        {/* Luxury Brand Footer */}
        <EcommFooter />
      </div>
    </StoreProvider>
  );
}
