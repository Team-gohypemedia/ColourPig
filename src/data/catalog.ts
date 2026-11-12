/**
 * The storefront catalog: shades, the kits each shade is sold in, prices and
 * availability. It is built on the server (from Shopify when connected, from
 * the local data files otherwise) and handed to the client as plain JSON.
 */

import { OFFICIAL_SHADES, ShadeProduct } from "./shades";
import { KitOption, getKitOptionsForShade } from "./pricing";

export interface SellingPlanOption {
  /** Shopify selling plan id */
  id: string;
  /** e.g. "Deliver every 12 weeks" */
  label: string;
  /** Subscribed price of one kit, in the catalog currency */
  price: number;
}

export interface CatalogKit extends KitOption {
  /** Whether Shopify will currently sell this kit in this shade */
  available: boolean;
  /** Shopify variant sent to checkout (absent when running on local data) */
  variantId?: string;
  /** How many of that variant make up one kit (3 for a 3-pack of single refills) */
  unitsPerKit: number;
  /** Subscribe & save delivery options; empty when the kit can't be subscribed to */
  sellingPlans: SellingPlanOption[];
}

export interface CatalogShade extends ShadeProduct {
  /** True when at least one kit of this shade can be bought */
  available: boolean;
  kits: CatalogKit[];
}

export interface Catalog {
  source: "shopify" | "local";
  currencyCode: string;
  shades: CatalogShade[];
  /** Product copy managed in Shopify */
  product?: { title: string; descriptionHtml: string };
}

/** Catalog built purely from the local data files (no Shopify connection). */
export function buildLocalCatalog(): Catalog {
  return {
    source: "local",
    currencyCode: "AUD",
    shades: OFFICIAL_SHADES.map((shade) => ({
      ...shade,
      available: true,
      kits: getKitOptionsForShade(shade.id).map((kit) => ({
        ...kit,
        available: true,
        unitsPerKit: 1,
        sellingPlans: [],
      })),
    })),
  };
}

const stripCode = (value: string) => value.toLowerCase().replace(/^(no\.?|#)\s*/, "").trim();

/** Finds a shade by id ("shade-4"), code ("No.4", "4") or name. */
export function findShade<T extends ShadeProduct>(shades: T[], idOrCode?: string | null): T | undefined {
  if (!idOrCode) return undefined;
  const raw = idOrCode.trim().toLowerCase();
  const bare = stripCode(raw.replace(/^(prod-|best-|system-)/, "").replace(/^shade-/, ""));
  return (
    shades.find((s) => s.id === raw || s.id === `shade-${bare}`) ||
    shades.find((s) => stripCode(s.code) === bare || stripCode(s.code).replace("/", "-") === bare) ||
    shades.find((s) => s.name.toLowerCase() === raw)
  );
}
