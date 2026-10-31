"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { OFFICIAL_SHADES } from "@/data/shades";

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
  shadeHex?: string;
}

export interface RecommendationItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  image: string;
  inStock: number;
  shadeCode?: string;
  shadeHex?: string;
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
  clearCart: () => void;

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
  clearWishlist: () => void;

  // Hamburger Menu
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;

  // Recommendations
  recommendations: RecommendationItem[];

  // Currency
  currency: "AUD" | "USD" | "INR";
  setCurrency: (c: "AUD" | "USD" | "INR") => void;
  formatPrice: (amountInInr: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial items: starts empty so only user-added items are displayed without demo data
const INITIAL_CART_ITEMS: CartItem[] = [];
const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [];

const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "rec-item-1",
    name: "Colourpig Refill Pod No.0/0 Clear Gloss",
    variant: "Universal Gloss & Translucent Blending",
    price: 2499,
    originalPrice: 3499,
    image: "/images/products/cards/shade_card_1.jpg",
    inStock: 5,
    shadeCode: "No.0/0",
    shadeHex: "#F2EFF0",
  },
  {
    id: "rec-item-2",
    name: "Colourpig Starter System | No.1 Jet Black",
    variant: "Pure Mineral Jet • Full Root Coverage",
    price: 2499,
    originalPrice: 3499,
    image: "/Black/Black.jpg",
    inStock: 4,
    shadeCode: "No.1",
    shadeHex: "#2D2C2D",
  },
  {
    id: "rec-item-3",
    name: "Colourpig Refill Pod No.3 Dark Brown",
    variant: "Dark Espresso Brown Formula",
    price: 2499,
    originalPrice: 3499,
    image: "/Brown/Brown.jpg",
    inStock: 3,
    shadeCode: "No.3",
    shadeHex: "#241E1C",
  },
];

const CART_STORAGE_KEY = "colourpig_cart_items_v1";
const WISHLIST_STORAGE_KEY = "colourpig_favorites_items_v1";

/**
 * Resolves a uniform canonical cart product ID (e.g. shade-7-starter-system, shade-1-refill-duo)
 * to guarantee that the same shade and kit option added from any page or section
 * resolves to the exact same item and increments quantity (+1) rather than duplicating.
 */
export function getCanonicalCartId(item: {
  id?: string;
  name?: string;
  variant?: string;
  shadeCode?: string;
  price?: number;
}): string {
  let shadeId: string | null = null;

  const rawCode = (item.shadeCode || "").toLowerCase().replace(/^(no\.?|#)/, "").trim();
  if (rawCode) {
    const match = OFFICIAL_SHADES.find(
      (s) =>
        s.code.toLowerCase().replace(/^(no\.?|#)/, "").trim() === rawCode ||
        s.id.toLowerCase().replace("shade-", "") === rawCode ||
        s.id.toLowerCase() === rawCode
    );
    if (match) shadeId = match.id;
  }

  if (!shadeId && item.id) {
    const rawId = item.id.toLowerCase();
    const match = OFFICIAL_SHADES.find(
      (s) =>
        rawId.includes(s.id) ||
        rawId.includes(`shade-${s.code.toLowerCase().replace(/^(no\.?|#)/, "")}`) ||
        rawId === `system-${s.code.toLowerCase().replace(/^(no\.?|#)/, "")}` ||
        rawId === `prod-${s.id}` ||
        rawId === `best-${s.id}` ||
        rawId.includes(s.code.toLowerCase())
    );
    if (match) shadeId = match.id;
  }

  if (!shadeId && item.name) {
    const rawName = item.name.toLowerCase();
    const match = OFFICIAL_SHADES.find(
      (s) =>
        rawName.includes(s.name.toLowerCase()) ||
        rawName.includes(s.code.toLowerCase()) ||
        rawName.includes(s.id)
    );
    if (match) shadeId = match.id;
  }

  const combined = `${item.id || ""} ${item.name || ""} ${item.variant || ""}`.toLowerCase();
  let kitType = "starter-system";
  if (combined.includes("refill") || combined.includes("pod") || item.price === 1899) {
    kitType = "refill-duo";
  } else if (combined.includes("annual") || combined.includes("pass") || item.price === 4499) {
    kitType = "annual-pass";
  }

  if (shadeId) {
    return `${shadeId}-${kitType}`;
  }

  return (
    item.id ||
    `item-${(item.name || "unknown").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  );
}

/**
 * Deduplicates an array of cart items by combining matching items into a single entry with summed quantity.
 */
function deduplicateCartItems(items: CartItem[]): CartItem[] {
  const merged = new Map<string, CartItem>();

  for (const item of items) {
    if (!item || !item.name) continue;
    const cid = getCanonicalCartId(item);
    const existing = merged.get(cid);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (item.quantity || 1);
    } else {
      merged.set(cid, {
        ...item,
        id: cid,
        quantity: item.quantity || 1,
      });
    }
  }

  return Array.from(merged.values());
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isHydrated, setIsHydrated] = useState(false);
  const isInitialMount = useRef(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS);
  const isWishlistInitialMount = useRef(true);
  const [recommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);

  // Helper to safely write cart to localStorage
  const saveCartToStorage = (items: CartItem[]) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (err) {
      console.warn("Could not save cart to localStorage", err);
    }
  };

  // Helper to safely write favorites to localStorage
  const saveWishlistToStorage = (items: WishlistItem[]) => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (err) {
      console.warn("Could not save favorites to localStorage", err);
    }
  };

  // 1. Retrieve saved cart & favorites from localStorage on initial mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Load cart
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          const parsed = JSON.parse(storedCart);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(
              (item) => item && typeof item === "object" && item.name
            );
            const deduped = deduplicateCartItems(valid);
            setCart(deduped);
            saveCartToStorage(deduped);
          }
        }

        // Load favorites
        const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (storedWishlist) {
          const parsed = JSON.parse(storedWishlist);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(
              (item) => item && typeof item === "object" && item.id && item.name
            );
            setWishlist(valid);
          }
        }
      }
    } catch (err) {
      console.warn("Could not load cart/favorites from localStorage", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Persist cart to localStorage whenever state updates after initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isHydrated) {
      saveCartToStorage(cart);
    }
  }, [cart, isHydrated]);

  // 3. Persist favorites to localStorage whenever state updates after initial mount
  useEffect(() => {
    if (isWishlistInitialMount.current) {
      isWishlistInitialMount.current = false;
      return;
    }
    saveWishlistToStorage(wishlist);
  }, [wishlist]);

  // 4. Listen to cross-tab storage events to keep open tabs in sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (Array.isArray(parsed)) {
              setCart(parsed);
            }
          } catch {
            // ignore
          }
        } else {
          setCart([]);
        }
      }

      if (e.key === WISHLIST_STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (Array.isArray(parsed)) {
              setWishlist(parsed);
            }
          } catch {
            // ignore
          }
        } else {
          setWishlist([]);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currency, setCurrency] = useState<"AUD" | "USD" | "INR">("AUD");

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
    if (currency === "AUD") {
      const audAmount = Math.round(amountInInr / 28);
      return `$${audAmount} AUD`;
    }
    if (currency === "USD") {
      const usdAmount = Math.round(amountInInr / 28);
      return `$${usdAmount} USD`;
    }
    return `₹${amountInInr.toLocaleString("en-IN")}`;
  };

  const addToCart = (
    item: Partial<CartItem> & { name: string; price: number; image: string }
  ) => {
    // Standardize price: if < 200 (was 89 USD) -> 2499 INR
    const standardPrice =
      item.price && item.price > 200 ? item.price : 2499;

    const canonicalId = getCanonicalCartId(item);

    // Resolve shade details if not provided
    let resolvedShadeHex = item.shadeHex;
    let resolvedShadeCode = item.shadeCode;

    const match = OFFICIAL_SHADES.find(
      (s) =>
        canonicalId.startsWith(s.id) ||
        (resolvedShadeCode && s.code.toLowerCase() === resolvedShadeCode.toLowerCase()) ||
        item.name.toLowerCase().includes(s.name.toLowerCase())
    );
    if (match) {
      if (!resolvedShadeHex) resolvedShadeHex = match.hex;
      if (!resolvedShadeCode) resolvedShadeCode = match.code;
    }

    const addQty = item.quantity && item.quantity > 0 ? item.quantity : 1;

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (p) =>
          p.id === canonicalId ||
          p.id === item.id ||
          getCanonicalCartId(p) === canonicalId
      );

      let updated: CartItem[];
      if (existingIndex >= 0) {
        // Product already in cart -> increase quantity!
        updated = prev.map((p, idx) => {
          if (idx === existingIndex) {
            return {
              ...p,
              id: canonicalId,
              quantity: p.quantity + addQty,
            };
          }
          return p;
        });
      } else {
        // New product -> add with canonical ID
        const newItem: CartItem = {
          id: canonicalId,
          name: item.name,
          variant: item.variant || "Standard Kit • 50ml",
          price: standardPrice,
          originalPrice: item.originalPrice,
          inStock: item.inStock || 4,
          image: item.image,
          quantity: addQty,
          shadeCode: resolvedShadeCode,
          shadeHex: resolvedShadeHex,
        };
        updated = [...prev, newItem];
      }

      saveCartToStorage(updated);
      return updated;
    });

    openCart();
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = prev.filter(
        (item) => item.id !== id && getCanonicalCartId(item) !== id
      );
      saveCartToStorage(updated);
      return updated;
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id === id || getCanonicalCartId(item) === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, id: getCanonicalCartId(item), quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      saveCartToStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
  };

  const addToWishlist = (item: WishlistItem) => {
    // Standardize price: if < 200 (was 89 USD) -> 2499 INR
    const standardPrice = item.price && item.price > 200 ? item.price : 2499;

    let resolvedShadeHex = item.shadeHex;
    if (!resolvedShadeHex && (item.shadeCode || item.id)) {
      const match = OFFICIAL_SHADES.find(
        (s) =>
          (item.shadeCode && s.code.toLowerCase() === item.shadeCode.toLowerCase()) ||
          s.id === item.id ||
          (item.shadeCode && s.id === item.shadeCode.toLowerCase())
      );
      if (match) {
        resolvedShadeHex = match.hex;
      }
    }

    setWishlist((prev) => {
      if (prev.some((w) => w.id === item.id)) return prev;
      const newItem: WishlistItem = {
        ...item,
        price: standardPrice,
        shadeHex: resolvedShadeHex,
      };
      const updated = [newItem, ...prev];
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  const clearWishlist = () => {
    setWishlist([]);
    saveWishlistToStorage([]);
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
        shadeHex: item.shadeHex,
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
        clearCart,

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
        clearWishlist,

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
