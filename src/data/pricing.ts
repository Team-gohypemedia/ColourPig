/**
 * Kit definitions and fallback prices (AUD, dollars with cents).
 *
 * When Shopify is connected, kit names, prices and availability come from
 * Shopify (see src/lib/shopify/catalog.ts); the prices below are only used
 * when the site runs without a Shopify connection. The subtitle and tag of
 * each kit are site copy and always come from here.
 */

export type KitId = "starter-system" | "refill-single" | "refill-3-pack" | "annual-pass";

export interface KitOption {
  id: KitId;
  name: string;
  subtitle: string;
  /** Full (one-off) price in AUD */
  price: number;
  /** Subscribe & save price in AUD, when the kit can be subscribed to */
  subscribePrice?: number;
  tag?: string;
}

export const KIT_OPTIONS: KitOption[] = [
  {
    id: "starter-system",
    name: "Starter Kit",
    subtitle: "Includes Ergonomic Dispenser + 50ml Precision Pod",
    price: 69.95,
    tag: "MOST POPULAR",
  },
  {
    id: "refill-single",
    name: "Refill (Single)",
    subtitle: "For returning users — 1x 50ml refill",
    price: 43.95,
    subscribePrice: 39.55,
  },
  {
    id: "refill-3-pack",
    name: "Refill 3-Pack",
    subtitle: "For returning users — 3x 50ml refills",
    price: 131.85,
    subscribePrice: 118.65,
    tag: "SUBSCRIBE & SAVE",
  },
  {
    id: "annual-pass",
    name: "Annual Ritual Pack (3 Starter Kits)",
    subtitle: "Three complete Starter Kits for a full year of root care",
    price: 118.0,
    tag: "BEST VALUE",
  },
];

export const STARTER_KIT_PRICE = 69.95;

/** Shades that are sold as a Starter Kit only (no refills or ritual pack). */
const STARTER_ONLY_SHADE_IDS = new Set(["shade-0-0"]);

export function getKitOptionsForShade(shadeId: string): KitOption[] {
  return STARTER_ONLY_SHADE_IDS.has(shadeId)
    ? KIT_OPTIONS.filter((k) => k.id === "starter-system")
    : KIT_OPTIONS;
}

export function getKitOption(kitId: KitId): KitOption {
  return KIT_OPTIONS.find((k) => k.id === kitId) ?? KIT_OPTIONS[0];
}

/** Price in AUD for a kit, using the subscribe & save price when requested and available. */
export function getKitPrice(kitId: KitId, subscribe = false): number {
  const kit = getKitOption(kitId);
  return subscribe && kit.subscribePrice !== undefined ? kit.subscribePrice : kit.price;
}
