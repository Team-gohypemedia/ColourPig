"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection, CORE_SHADES, ShadeItem } from "@/components/sections/hero-section";
import { CartMini, CartProduct } from "@/components/cart/cart-mini";

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
          name: "Colourpig Starter System",
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
    <div className="h-screen w-full bg-obsidian text-platinum flex flex-col overflow-x-hidden selection:bg-steel selection:text-white">
      {/* Slide-out Cart Drawer */}
      <CartMini
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />

      {/* E-Commerce Navbar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={2}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* 100vh Hero Section */}
      <main className="flex-1 flex flex-col justify-center">
        <HeroSection onAddToCart={handleAddToCart} />
      </main>
    </div>
  );
}
