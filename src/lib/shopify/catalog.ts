import "server-only";
import { cache } from "react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { KIT_OPTIONS, KitId } from "@/data/pricing";
import { Catalog, CatalogKit, CatalogShade, SellingPlanOption, buildLocalCatalog } from "@/data/catalog";
import { isShopifyConfigured, shopifyFetch } from "./client";

/** How long (seconds) Shopify catalog data is cached before it is refreshed. */
const CATALOG_REVALIDATE_SECONDS = 60;

const CATALOG_QUERY = /* GraphQL */ `
  query Catalog {
    shop {
      paymentSettings { currencyCode }
    }
    products(first: 10) {
      nodes {
        id
        handle
        title
        descriptionHtml
        images(first: 30) { nodes { url altText } }
        variants(first: 100) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            image { url altText }
            selectedOptions { name value }
            sellingPlanAllocations(first: 6) {
              nodes {
                sellingPlan { id name options { name value } }
                priceAdjustments { price { amount } }
              }
            }
          }
        }
      }
    }
  }
`;

interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  image: ShopifyImage | null;
  selectedOptions: { name: string; value: string }[];
  sellingPlanAllocations: {
    nodes: {
      sellingPlan: { id: string; name: string; options: { name: string; value: string }[] };
      priceAdjustments: { price: { amount: string } }[];
    }[];
  };
}

interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyVariant[] };
}

interface CatalogQueryResult {
  shop: { paymentSettings: { currencyCode: string } };
  products: { nodes: ShopifyProduct[] };
}

const toAmount = (value: string | undefined) => {
  const n = Number.parseFloat(value ?? "");
  return Number.isFinite(n) ? n : 0;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

const optionValue = (variant: ShopifyVariant, pattern: RegExp) =>
  variant.selectedOptions.find((o) => pattern.test(o.name))?.value;

/** Which kit a Shopify pack ("Starter Kit", "Refill", …) corresponds to on the site. */
function resolveKitId(packText: string): KitId | null {
  const text = packText.toLowerCase();
  if (/annual|ritual/.test(text)) return "annual-pass";
  if (/refill|cartridge/.test(text)) {
    return /\b3\s*[- ]?(pack|x)\b|\bx\s*3\b|\bthree\b/.test(text) ? "refill-3-pack" : "refill-single";
  }
  if (/starter|kit/.test(text)) return "starter-system";
  return null;
}

/** Site shade id for a Shopify colour value such as "No.4 Medium Brown". */
function resolveShadeId(colourText: string): string | null {
  const numbered = colourText.match(/no\.?\s*(\d+)/i);
  if (numbered) {
    const n = Number(numbered[1]);
    return n === 0 ? "shade-0-0" : `shade-${n}`;
  }
  const text = colourText.trim().toLowerCase();
  if (!text) return null;
  const byName = OFFICIAL_SHADES.find((s) => s.name.replace(/No\.\S+\s*/, "").toLowerCase() === text);
  return byName?.id ?? `shade-${text.replace(/[^a-z0-9]+/g, "-")}`;
}

/** Brand details for a shade that exists in Shopify but has no local entry yet. */
function defaultShade(id: string, name: string, image: string): ShadeProduct {
  const code = name.match(/no\.?\s*\d+/i)?.[0].replace(/\s+/g, "") ?? name;
  return {
    id,
    code,
    formula: "",
    name,
    category: "Permanent Hair Colour",
    hex: "#8A7968",
    price: 0,
    swatchImage: image,
    cardImage: image,
    modelImage: image,
    description: "",
    undertone: "",
    rating: 5,
    reviews: 0,
  };
}

interface ShadeDraft {
  name: string;
  image?: string;
  kits: Map<KitId, CatalogKit>;
}

function buildCatalog(data: CatalogQueryResult): Catalog {
  const drafts = new Map<string, ShadeDraft>();
  let mainProduct: ShopifyProduct | undefined;

  for (const product of data.products.nodes) {
    for (const variant of product.variants.nodes) {
      const colour = optionValue(variant, /colou?r|shade/i);
      const pack = optionValue(variant, /pack|kit|format|type|size/i);
      const shadeId = resolveShadeId(colour ?? variant.title);
      const kitId = resolveKitId(`${pack ?? ""} ${product.title}`);
      if (!shadeId || !kitId) continue;

      mainProduct ??= product;

      const draft: ShadeDraft = drafts.get(shadeId) ?? { name: colour ?? variant.title, kits: new Map() };
      draft.image ??= variant.image?.url;
      drafts.set(shadeId, draft);
      if (draft.kits.has(kitId)) continue;

      const meta = KIT_OPTIONS.find((k) => k.id === kitId)!;
      const sellingPlans: SellingPlanOption[] = variant.sellingPlanAllocations.nodes.map((a) => ({
        id: a.sellingPlan.id,
        label: a.sellingPlan.options[0]?.value || a.sellingPlan.name,
        price: toAmount(a.priceAdjustments[0]?.price.amount),
      }));

      draft.kits.set(kitId, {
        id: kitId,
        name: pack ?? meta.name,
        subtitle: meta.subtitle,
        tag: meta.tag,
        price: toAmount(variant.price.amount),
        subscribePrice: sellingPlans[0]?.price,
        available: variant.availableForSale,
        variantId: variant.id,
        unitsPerKit: 1,
        sellingPlans,
      });
    }
  }

  // Product photos shared by every shade (matched on alt text or file name)
  const sharedImage = (pattern: RegExp) =>
    mainProduct?.images.nodes.find((img) => pattern.test(`${img.altText ?? ""} ${img.url.split("?")[0]}`))?.url;
  const sideImage = sharedImage(/\bside\b/i);
  const backImage = sharedImage(/\bback\b/i);

  const toShade = (id: string, draft: ShadeDraft): CatalogShade => {
    const local = OFFICIAL_SHADES.find((s) => s.id === id);
    const base = local ?? defaultShade(id, draft.name, draft.image ?? "");

    // A 3-pack that isn't its own Shopify variant is sold as three single refills
    const single = draft.kits.get("refill-single");
    if (single && !draft.kits.has("refill-3-pack")) {
      const meta = KIT_OPTIONS.find((k) => k.id === "refill-3-pack")!;
      draft.kits.set("refill-3-pack", {
        ...single,
        id: "refill-3-pack",
        name: meta.name,
        subtitle: meta.subtitle,
        tag: meta.tag,
        price: round2(single.price * 3),
        subscribePrice: single.subscribePrice !== undefined ? round2(single.subscribePrice * 3) : undefined,
        unitsPerKit: 3,
        sellingPlans: single.sellingPlans.map((p) => ({ ...p, price: round2(p.price * 3) })),
      });
    }

    const kits = KIT_OPTIONS.map((k) => draft.kits.get(k.id)).filter((k): k is CatalogKit => Boolean(k));
    const starter = kits.find((k) => k.id === "starter-system") ?? kits[0];

    return {
      ...base,
      name: draft.name,
      price: starter.price,
      cardImage: draft.image ?? base.cardImage,
      sideImage: sideImage ?? base.sideImage,
      backImage: backImage ?? base.backImage,
      available: kits.some((k) => k.available),
      kits,
    };
  };

  // Keep the site's shade order; shades that only exist in Shopify go last
  const orderedIds = [
    ...OFFICIAL_SHADES.map((s) => s.id).filter((id) => drafts.has(id)),
    ...[...drafts.keys()].filter((id) => !OFFICIAL_SHADES.some((s) => s.id === id)),
  ];

  return {
    source: "shopify",
    currencyCode: data.shop.paymentSettings.currencyCode,
    shades: orderedIds.map((id) => toShade(id, drafts.get(id)!)),
    product: mainProduct
      ? { title: mainProduct.title, descriptionHtml: mainProduct.descriptionHtml }
      : undefined,
  };
}

/**
 * The storefront catalog. Reads from Shopify (cached and refreshed every
 * minute) and falls back to the local data files if Shopify is not configured
 * or cannot be reached, so the site always renders.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  if (!isShopifyConfigured) return buildLocalCatalog();

  try {
    const data = await shopifyFetch<CatalogQueryResult>(CATALOG_QUERY, {
      revalidate: CATALOG_REVALIDATE_SECONDS,
      tags: ["shopify-catalog"],
    });
    const catalog = buildCatalog(data);
    if (catalog.shades.length === 0) {
      console.warn("[shopify] No shade/kit variants found in Shopify; using local catalog data.");
      return buildLocalCatalog();
    }
    return catalog;
  } catch (error) {
    console.error("[shopify] Could not load the catalog; using local catalog data.", error);
    return buildLocalCatalog();
  }
});
