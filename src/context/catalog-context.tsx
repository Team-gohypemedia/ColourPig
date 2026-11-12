"use client";

import React, { createContext, useContext } from "react";
import { Catalog, buildLocalCatalog, findShade } from "@/data/catalog";

const CatalogContext = createContext<Catalog | null>(null);

// Used only if a component renders outside the provider (e.g. in isolation)
const LOCAL_CATALOG = buildLocalCatalog();

/** Makes the server-fetched catalog (Shopify or local fallback) available to client components. */
export function CatalogProvider({ catalog, children }: { catalog: Catalog; children: React.ReactNode }) {
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Catalog {
  return useContext(CatalogContext) ?? LOCAL_CATALOG;
}

interface ShadeCard {
  id: string;
  shadeId?: string;
  shadeCode?: string;
  price: number;
  image: string;
}

/**
 * Overlays the catalog's current Starter Kit price onto hand-curated product
 * cards. When connected to Shopify the card photo also comes from Shopify,
 * and cards for shades Shopify no longer lists are dropped.
 */
export function useLiveCards<T extends ShadeCard>(cards: T[]): T[] {
  const { shades, source } = useCatalog();
  return cards.flatMap((card) => {
    const shade =
      findShade(shades, card.shadeId) ?? findShade(shades, card.id) ?? findShade(shades, card.shadeCode);
    if (!shade) return source === "shopify" ? [] : [card];
    return [{ ...card, price: shade.price, image: source === "shopify" ? shade.cardImage : card.image }];
  });
}
