"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from "react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { CatalogKit, CatalogShade, findShade } from "@/data/catalog";
import { useCatalog } from "@/context/catalog-context";
import {
  KitId,
  STARTER_KIT_PRICE,
  getKitOption,
  getKitPrice,
} from "@/data/pricing";

export interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number; // unit price in the store currency (e.g. 69.95)
  originalPrice?: number;
  inStock: number;
  image: string;
  quantity: number;
  shadeCode?: string;
  shadeHex?: string;
  /** Chosen subscribe & save delivery plan (Shopify selling plan id) */
  sellingPlanId?: string;
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
  originalPrice?: number;
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

  // Checkout (Shopify)
  checkout: () => Promise<void>;
  isCheckingOut: boolean;
  /** Message shown in the bag, e.g. a sold-out item or a checkout problem */
  cartNotice: string | null;
  dismissCartNotice: () => void;

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

  // Price display (store currency)
  formatPrice: (amount: number) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial items: starts empty so only user-added items are displayed without demo data
const INITIAL_CART_ITEMS: CartItem[] = [];
const INITIAL_WISHLIST_ITEMS: WishlistItem[] = [];

const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: "rec-item-1",
    name: "Colourpig Starter Kit | No.0/0 Clear Gloss",
    variant: "Universal Gloss & Translucent Blending",
    price: STARTER_KIT_PRICE,
    image: "/images/products/cards/shade_card_1.jpg",
    inStock: 5,
    shadeCode: "No.0/0",
    shadeHex: "#F2EFF0",
  },
  {
    id: "rec-item-2",
    name: "Colourpig Starter System | No.1 Jet Black",
    variant: "Pure Mineral Jet • Full Root Coverage",
    price: STARTER_KIT_PRICE,
    image: "/Black/Black.jpg",
    inStock: 4,
    shadeCode: "No.1",
    shadeHex: "#2D2C2D",
  },
  {
    id: "rec-item-3",
    name: "Colourpig Refill (Single) | No.3 Dark Brown",
    variant: "Dark Espresso Brown Formula",
    price: getKitPrice("refill-single"),
    image: "/Brown/Brown.jpg",
    inStock: 3,
    shadeCode: "No.3",
    shadeHex: "#241E1C",
  },
];

const CART_STORAGE_KEY = "colourpig_cart_items_v1";
const WISHLIST_STORAGE_KEY = "colourpig_favorites_items_v1";

// Checked in this order so "refill-3-pack" wins over a looser "refill" match
const KIT_IDS: KitId[] = ["refill-3-pack", "refill-single", "annual-pass", "starter-system"];

/**
 * Works out which kit (and whether it is a subscribe & save purchase) an item refers to.
 * Prefers an explicit kit id inside the item id, then falls back to the item's wording.
 */
export function resolveKit(item: {
  id?: string;
  name?: string;
  variant?: string;
}): { kitId: KitId; subscribe: boolean } {
  const id = (item.id || "").toLowerCase();
  const text = `${item.name || ""} ${item.variant || ""}`.toLowerCase();
  const subscribe = id.endsWith("-subscribe") || text.includes("subscribe");

  let kitId = KIT_IDS.find((k) => id.includes(k));
  if (!kitId) {
    const combined = `${id} ${text}`;
    if (combined.includes("annual") || combined.includes("ritual pack")) {
      kitId = "annual-pass";
    } else if (combined.includes("refill")) {
      kitId = /3-pack|3 pack|3x/.test(combined) ? "refill-3-pack" : "refill-single";
    } else {
      kitId = "starter-system";
    }
  }

  // Only refills can be subscribed to
  return { kitId, subscribe: subscribe && getKitOption(kitId).subscribePrice !== undefined };
}

/** Authoritative AUD unit price for a cart item, derived from its kit. */
function getItemPrice(item: { id?: string; name?: string; variant?: string }): number {
  const { kitId, subscribe } = resolveKit(item);
  return getKitPrice(kitId, subscribe);
}

/**
 * Resolves a uniform canonical cart product ID (e.g. shade-7-starter-system, shade-1-refill-duo)
 * to guarantee that the same shade and kit option added from any page or section
 * resolves to the exact same item and increments quantity (+1) rather than duplicating.
 */
export function getCanonicalCartId(
  item: {
    id?: string;
    name?: string;
    variant?: string;
    shadeCode?: string;
    price?: number;
  },
  shades: ShadeProduct[] = OFFICIAL_SHADES
): string {
  let shadeId: string | null = null;

  const rawCode = (item.shadeCode || "").toLowerCase().replace(/^(no\.?|#)/, "").trim();
  if (rawCode) {
    const match = shades.find(
      (s) =>
        s.code.toLowerCase().replace(/^(no\.?|#)/, "").trim() === rawCode ||
        s.id.toLowerCase().replace("shade-", "") === rawCode ||
        s.id.toLowerCase() === rawCode
    );
    if (match) shadeId = match.id;
  }

  if (!shadeId && item.id) {
    const rawId = item.id.toLowerCase();
    const match = shades.find(
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
    const match = shades.find(
      (s) =>
        rawName.includes(s.name.toLowerCase()) ||
        rawName.includes(s.code.toLowerCase()) ||
        rawName.includes(s.id)
    );
    if (match) shadeId = match.id;
  }

  const { kitId, subscribe } = resolveKit(item);

  if (shadeId) {
    return `${shadeId}-${kitId}${subscribe ? "-subscribe" : ""}`;
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
      // Re-price from the current price list (also migrates legacy INR-priced carts)
      const price = getItemPrice(item);
      const fullPrice = getKitOption(resolveKit(item).kitId).price;
      merged.set(cid, {
        ...item,
        id: cid,
        price,
        originalPrice: price < fullPrice ? fullPrice : undefined,
        quantity: item.quantity || 1,
      });
    }
  }

  return Array.from(merged.values());
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const catalog = useCatalog();
  const isShopify = catalog.source === "shopify";

  /** The catalog shade and kit a cart-like item refers to, if the catalog sells it. */
  const lookupKit = (item: {
    id?: string;
    name?: string;
    variant?: string;
    shadeCode?: string;
  }): { shade: CatalogShade; kit: CatalogKit; subscribe: boolean } | null => {
    const canonicalId = getCanonicalCartId(item, catalog.shades);
    const shade = catalog.shades.find((s) => canonicalId.startsWith(`${s.id}-`));
    if (!shade) return null;
    const { kitId, subscribe } = resolveKit(item);
    const kit = shade.kits.find((k) => k.id === kitId);
    if (!kit) return null;
    return { shade, kit, subscribe: subscribe && kit.subscribePrice !== undefined };
  };

  /** Current unit price (and full price, for subscriptions) of a cart item. */
  const priceItem = (item: CartItem): { price: number; fullPrice: number } => {
    const info = lookupKit(item);
    if (!info) {
      return { price: getItemPrice(item), fullPrice: getKitOption(resolveKit(item).kitId).price };
    }
    const { kit, subscribe } = info;
    const planPrice = kit.sellingPlans.find((p) => p.id === item.sellingPlanId)?.price ?? kit.subscribePrice;
    return { price: subscribe && planPrice !== undefined ? planPrice : kit.price, fullPrice: kit.price };
  };

  /** Starter Kit price of the shade a favourite refers to. */
  const starterPriceFor = (item: { id: string; shadeCode?: string }) =>
    (findShade(catalog.shades, item.shadeCode) ?? findShade(catalog.shades, item.id))?.price ?? STARTER_KIT_PRICE;

  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const isInitialMount = useRef(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST_ITEMS);
  const isWishlistInitialMount = useRef(true);

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
            const valid = parsed
              .filter((item) => item && typeof item === "object" && item.id && item.name)
              .map((item: WishlistItem) => ({
                ...item,
                price: STARTER_KIT_PRICE,
                originalPrice: undefined,
              }));
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

  const formatPrice = (amount: number) => `$${amount.toFixed(2)} ${catalog.currencyCode}`;

  const addToCart = (
    item: Partial<CartItem> & { name: string; price: number; image: string }
  ) => {
    // When connected to Shopify, only add what Shopify will actually sell
    const info = lookupKit(item);
    if (isShopify && !info?.kit.available) {
      setCartNotice(
        info ? `${item.name} is sold out right now.` : `${item.name} is not available right now.`
      );
      openCart();
      return;
    }
    setCartNotice(null);

    const canonicalId = getCanonicalCartId(item, catalog.shades);
    // Price always comes from the catalog, never from the caller.
    // fullPrice is shown struck through for subscribe & save items.
    const { price: standardPrice, fullPrice } = priceItem({ ...item, id: canonicalId } as CartItem);

    // Resolve shade details if not provided
    let resolvedShadeHex = item.shadeHex;
    let resolvedShadeCode = item.shadeCode;

    const match = catalog.shades.find(
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
              sellingPlanId: item.sellingPlanId ?? p.sellingPlanId,
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
          originalPrice: standardPrice < fullPrice ? fullPrice : undefined,
          inStock: item.inStock || 4,
          image: item.image,
          quantity: addQty,
          shadeCode: resolvedShadeCode,
          shadeHex: resolvedShadeHex,
          sellingPlanId: item.sellingPlanId,
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

  const dismissCartNotice = () => setCartNotice(null);

  /** Sends the bag to Shopify and redirects to its secure checkout. */
  const checkout = async () => {
    if (isCheckingOut || cart.length === 0) return;
    if (!isShopify) {
      setCartNotice("Checkout is not connected to Shopify yet.");
      return;
    }

    const lines: { variantId: string; quantity: number; sellingPlanId?: string }[] = [];
    for (const item of cart) {
      const info = lookupKit(item);
      if (!info?.kit.variantId) {
        setCartNotice(`${item.name} is no longer available. Remove it to continue.`);
        return;
      }
      const { kit, subscribe } = info;
      const plan = kit.sellingPlans.find((p) => p.id === item.sellingPlanId) ?? kit.sellingPlans[0];
      lines.push({
        variantId: info.kit.variantId,
        quantity: item.quantity * kit.unitsPerKit,
        sellingPlanId: subscribe ? plan?.id : undefined,
      });
    }

    setIsCheckingOut(true);
    setCartNotice(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data: { checkoutUrl?: string; error?: string } = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return; // keep the button busy while the browser navigates
      }
      setCartNotice(data.error || "Checkout is unavailable right now. Please try again.");
    } catch {
      setCartNotice("Checkout is unavailable right now. Please try again.");
    }
    setIsCheckingOut(false);
  };

  const addToWishlist = (item: WishlistItem) => {
    // Favourites are always Starter Kits
    const standardPrice = starterPriceFor(item);

    let resolvedShadeHex = item.shadeHex;
    if (!resolvedShadeHex && (item.shadeCode || item.id)) {
      const match = catalog.shades.find(
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

  // What the UI sees: saved items with today's catalog prices
  const pricedCart = useMemo(
    () =>
      cart.map((item) => {
        const { price, fullPrice } = priceItem(item);
        return { ...item, price, originalPrice: price < fullPrice ? fullPrice : undefined };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cart, catalog]
  );

  const pricedWishlist = useMemo(
    () => wishlist.map((item) => ({ ...item, price: starterPriceFor(item), originalPrice: undefined })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlist, catalog]
  );

  // Suggested add-ons, limited to what can be bought right now
  const recommendations = useMemo(
    () =>
      INITIAL_RECOMMENDATIONS.flatMap((rec) => {
        const info = lookupKit(rec);
        if (!info) return isShopify ? [] : [rec];
        return info.kit.available ? [{ ...rec, price: info.kit.price, image: info.shade.cardImage }] : [];
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [catalog]
  );

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
        cart: pricedCart,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        checkout,
        isCheckingOut,
        cartNotice,
        dismissCartNotice,

        wishlist: pricedWishlist,
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
