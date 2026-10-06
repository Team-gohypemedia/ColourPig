"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number; // in INR by default (e.g. 2499)
  originalPrice?: number;
  inStock: number;
  image: string;
  quantity: number;
  shadeCode?: string;
  shadeHex?: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  category?: string;
  price: number;
  originalPrice?: number;
  image: string;
  shadeCode?: string;
}

export interface RecommendationItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: number;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Partial<CartItem> & { name: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, delta: number) => void;

  // Wishlist
  wishlist: WishlistItem[];
  wishlistCount: number;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  moveFromWishlistToCart: (id: string) => void;

  // Hamburger Menu
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  // Recommendations
  recommendations: RecommendationItem[];

  // Currency
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  formatPrice: (amountInInr: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial items inspired by the user's reference screenshots
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "cart-item-1",
    name: "Colourpig Starter System | No.4 Medium Brown",
    variant: "Shade No.4 • 50ml Reusable Dispenser",
    price: 2499,
    originalPrice: 3499,
    inStock: 2,
    image: "/images/products/cards/shade_card_4.jpg",
    quantity: 1,
    shadeCode: "No.4",
    shadeHex: "#4E4136",
  },
];

const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [
  {
    id: "wishlist-item-1",
    name: "Colourpig Starter System | No.4 Medium Brown",
    category: "Natural Chestnut • Air-Driven Touch Up",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/cards/shade_card_4.jpg",
    shadeCode: "No.4",
  },
  {
    id: "wishlist-item-2",
    name: "In-Shower Precision Dispenser Unit",
    category: "Ergonomic Applicator • Chrome Edition",
    price: 2499,
    originalPrice: 2999,
    image: "/images/product-dispenser.jpg",
  },
  {
    id: "wishlist-item-3",
    name: "Colourpig Refill Pod Duo | No.7 Golden Blonde",
    category: "Warm Golden • 100% Resistant Gray Coverage",
    price: 1899,
    originalPrice: 2499,
    image: "/images/products/cards/shade_card_7.jpg",
    shadeCode: "No.7",
  },
];

const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "rec-item-1",
    name: "Colourpig Refill Pod No.0/0 Clear Gloss",
    variant: "Universal Gloss & Translucent Blending",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/cards/shade_card_1.jpg",
    inStock: 5,
  },
  {
    id: "rec-item-2",
    name: "Colourpig Starter System | No.1 Jet Black",
    variant: "Pure Mineral Jet • Full Root Coverage",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/cards/shade_card_2.jpg",
    inStock: 4,
  },
  {
    id: "rec-item-3",
    name: "Colourpig Refill Pod No.3 Dark Brown",
    variant: "Dark Espresso Brown Formula",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/cards/shade_card_3.jpg",
    inStock: 3,
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS);
  const [recommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const openCart = () => {
    setIsCartOpen(true);
    setIsWishlistOpen(false);
    setIsMenuOpen(false);
  };
  const closeCart = () => setIsCartOpen(false);

  const openWishlist = () => {
    setIsWishlistOpen(true);
    setIsCartOpen(false);
    setIsMenuOpen(false);
  };
  const closeWishlist = () => setIsWishlistOpen(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    setIsCartOpen(false);
    setIsWishlistOpen(false);
  };
  const closeMenu = () => setIsMenuOpen(false);

  const formatPrice = (amountInInr: number) => {
    if (currency === "USD") {
      // Approximate 1 USD = 83 INR
      const usdAmount = Math.round(amountInInr / 28);
      return `$${usdAmount}`;
    }
    return `₹${amountInInr.toLocaleString("en-IN")}`;
  };

  const addToCart = (
    item: Partial<CartItem> & { name: string; price: number; image: string }
  ) => {
    setCart((prev) => {
      const existing = prev.find(
        (p) => p.name === item.name || (item.id && p.id === item.id)
      );
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      const newItem: CartItem = {
        id: item.id || `cart-${Date.now()}`,
        name: item.name,
        variant: item.variant || "Standard Kit • 50ml",
        price: item.price || 2499,
        originalPrice: item.originalPrice,
        inStock: item.inStock || 4,
        image: item.image,
        quantity: item.quantity || 1,
        shadeCode: item.shadeCode,
        shadeHex: item.shadeHex,
      };
      return [...prev, newItem];
    });
    openCart();
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((w) => w.id === item.id)) return prev;
      return [item, ...prev];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  const moveFromWishlistToCart = (id: string) => {
    const item = wishlist.find((w) => w.id === id);
    if (item) {
      addToCart({
        id: `cart-${item.id}`,
        name: item.name,
        variant: item.category || "Full Root Kit • 50ml",
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        inStock: 3,
        quantity: 1,
        shadeCode: item.shadeCode,
      });
      removeFromWishlist(id);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  // Prevent body scroll when any drawer is open
  useEffect(() => {
    if (isCartOpen || isWishlistOpen || isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isWishlistOpen, isMenuOpen]);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,

        wishlist,
        wishlistCount,
        isWishlistOpen,
        openWishlist,
        closeWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        moveFromWishlistToCart,

        isMenuOpen,
        openMenu,
        closeMenu,

        recommendations,
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
