"use client";

import React from "react";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Header } from "@/components/navigation/header";
import { EcommHero } from "@/components/sections/ecomm-hero";
import { SystemBreakdown } from "@/components/sections/system-breakdown";
import { ShadeLab } from "@/components/sections/shade-lab";
import { EngineeringSection } from "@/components/sections/engineering-section";
import { HeritageReviews } from "@/components/sections/heritage-reviews";
import { ImpactBanner } from "@/components/sections/impact-banner";
import { Footer } from "@/components/navigation/footer";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-obsidian text-platinum selection:bg-steel selection:text-white flex flex-col justify-between">
        <CartDrawer />
        <Header />

        <main className="flex-1">
          <EcommHero />
          <SystemBreakdown />
          <ShadeLab />
          <EngineeringSection />
          <HeritageReviews />
          <ImpactBanner />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
