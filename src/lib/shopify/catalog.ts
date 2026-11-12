import "server-only";
import { cache } from "react";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { KIT_OPTIONS, KitId } from "@/data/pricing";
import { Catalog, CatalogKit, CatalogShade, GalleryItem, SellingPlanOption, buildLocalCatalog } from "@/data/catalog";
import { isShopifyConfigured, shopifyFetch } from "./client";

/** How long (seconds) Shopify catalog data is cached before it is refreshed. */
const CATALOG_REVALIDATE_SECONDS = 60;

const CATALOG_QUERY = /* GraphQL */ `
  query Catalog {
    shop {
      paymentSettings { currencyCode }
    }
    products(first: 25) {
      nodes {
        id
        handle
        title
        descriptionHtml
        featuredImage { url altText }
        options { name optionValues { name swatch { color } } }
        media(first: 30) {
          nodes {
            mediaContentType
            alt
            previewImage { url }
            ... on MediaImage { image { url altText width height } }
            ... on Video { sources { url mimeType width height } }
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            price { amount currencyCode }
            image { url altText }
            selectedOptions { name value }
            sellingPlanAllocations(first: 4) {
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

interface ShopifyMedia {
  mediaContentType: "IMAGE" | "VIDEO" | "EXTERNAL_VIDEO" | "MODEL_3D";
  alt: string | null;
  previewImage: { url: string } | null;
  image?: (ShopifyImage & { width: number | null; height: number | null }) | null;
  sources?: { url: string; mimeType: string; width: number; height: number }[];
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
  featuredImage: ShopifyImage | null;
  options: { name: string; optionValues: { name: string; swatch: { color: string | null } | null }[] }[];
  media: { nodes: ShopifyMedia[] };
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

const COLOUR_OPTION = /colou?r|shade/i;
const PACK_OPTION = /pack|kit|format|type|size/i;

const optionValue = (variant: ShopifyVariant, pattern: RegExp) =>
  variant.selectedOptions.find((o) => pattern.test(o.name))?.value;

/** File name of a Shopify CDN URL, without query string ("01HeroNo.1_kit.jpg"). */
const fileName = (url: string) => decodeURIComponent(url.split("?")[0].split("/").pop() ?? "");

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
  const code = name.match(/no\.?\s*[\d/]+/i)?.[0].replace(/\s+/g, "") ?? name;
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

/** Photos and videos of a product, in the order they are arranged in Shopify. */
function toGallery(product: ShopifyProduct): GalleryItem[] {
  return product.media.nodes.flatMap((m): GalleryItem[] => {
    const alt = m.alt || product.title;
    if (m.mediaContentType === "IMAGE") {
      const url = m.image?.url ?? m.previewImage?.url;
      return url
        ? [{ type: "image", src: url, alt: m.image?.altText || alt, width: m.image?.width ?? undefined, height: m.image?.height ?? undefined }]
        : [];
    }
    if (m.mediaContentType === "VIDEO") {
      // Browsers play MP4 directly; prefer 720p to keep the page light
      const mp4s = (m.sources ?? [])
        .filter((s) => s.mimeType === "video/mp4")
        .sort((a, b) => Math.abs(a.height - 720) - Math.abs(b.height - 720));
      const best = mp4s[0];
      return best
        ? [{ type: "video", src: best.url, alt, poster: m.previewImage?.url, width: best.width, height: best.height }]
        : [];
    }
    return [];
  });
}

/** Shade-specific content from a product dedicated to one shade. */
interface ShadeContent {
  title: string;
  handle: string;
  descriptionHtml: string;
  gallery: GalleryItem[];
  featuredImage?: string;
  hex?: string;
}

interface ShadeDraft {
  name: string;
  image?: string;
  content?: ShadeContent;
  kits: Map<KitId, CatalogKit>;
}

/**
 * A product dedicated to one shade ("No.1 Black") as opposed to one product
 * that lists every shade as a variant option.
 */
function singleShadeOf(product: ShopifyProduct): string | null {
  const colours = new Set(
    product.variants.nodes.map((v) => optionValue(v, COLOUR_OPTION)).filter((c): c is string => Boolean(c))
  );
  if (colours.size > 1) return null;
  return resolveShadeId([...colours][0] ?? product.title);
}

function buildCatalog(data: CatalogQueryResult): Catalog {
  const drafts = new Map<string, ShadeDraft>();
  let mainProduct: ShopifyProduct | undefined;
  const draftFor = (shadeId: string, name: string) => {
    const draft: ShadeDraft = drafts.get(shadeId) ?? { name, kits: new Map() };
    drafts.set(shadeId, draft);
    return draft;
  };

  // Products dedicated to one shade come first so their price, photos and
  // stock win over a combined all-shades product that sells the same kit.
  const products = [...data.products.nodes].sort(
    (a, b) => Number(singleShadeOf(b) !== null) - Number(singleShadeOf(a) !== null)
  );

  for (const product of products) {
    const ownShade = singleShadeOf(product);

    if (ownShade) {
      const draft = draftFor(ownShade, product.title);
      draft.name = product.title;
      draft.content ??= {
        title: product.title,
        handle: product.handle,
        descriptionHtml: product.descriptionHtml,
        gallery: toGallery(product),
        featuredImage: product.featuredImage?.url,
        hex:
          product.options
            .find((o) => COLOUR_OPTION.test(o.name))
            ?.optionValues.find((v) => v.swatch?.color)?.swatch?.color ?? undefined,
      };
    }

    for (const variant of product.variants.nodes) {
      const colour = optionValue(variant, COLOUR_OPTION);
      const pack = optionValue(variant, PACK_OPTION);
      const shadeId = ownShade ?? resolveShadeId(colour ?? variant.title);
      // A single-shade product with no pack option is that shade's Starter Kit
      const kitId = resolveKitId(`${pack ?? ""} ${product.title}`) ?? (ownShade ? "starter-system" : null);
      if (!shadeId || !kitId) continue;

      mainProduct ??= product;

      const draft = draftFor(shadeId, colour ?? variant.title);
      draft.image ??= variant.image?.url;
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

  // Product photos shared by every shade of a combined product (matched on alt text or file name)
  const sharedImage = (pattern: RegExp) =>
    mainProduct?.media.nodes
      .map((m) => ({ url: m.image?.url, alt: m.alt ?? "" }))
      .find((img) => img.url && pattern.test(`${img.alt} ${fileName(img.url)}`))?.url;
  const sharedSide = sharedImage(/\bside\b/i);
  const sharedBack = sharedImage(/\bback\b/i);

  const toShade = (id: string, draft: ShadeDraft): CatalogShade | null => {
    const local = OFFICIAL_SHADES.find((s) => s.id === id);
    const content = draft.content;
    const gallery = content?.gallery ?? [];
    // Shade photos are recognised by their file names ("01HeroNo.1_kit.jpg", "02SwatchNo.1.jpg", …)
    const photo = (pattern: RegExp) =>
      gallery.find((g) => g.type === "image" && pattern.test(fileName(g.src)))?.src;

    // Product cards show the first image in Shopify (the product's featured image)
    const cardImage = content?.featuredImage ?? photo(/hero/i) ?? draft.image;
    const base = local ?? defaultShade(id, draft.name, cardImage ?? "");

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
    if (kits.length === 0) return null;
    const starter = kits.find((k) => k.id === "starter-system") ?? kits[0];

    return {
      ...base,
      name: draft.name,
      hex: content?.hex ?? base.hex,
      price: starter.price,
      cardImage: cardImage ?? base.cardImage,
      swatchImage: photo(/swatch/i) ?? base.swatchImage,
      sideImage: photo(/side/i) ?? sharedSide ?? base.sideImage,
      backImage: photo(/back/i) ?? sharedBack ?? base.backImage,
      video: gallery.find((g) => g.type === "video")?.src ?? base.video,
      available: kits.some((k) => k.available),
      kits,
      gallery: gallery.length > 0 ? gallery : undefined,
      productTitle: content?.title,
      descriptionHtml: content?.descriptionHtml || undefined,
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
    shades: orderedIds
      .map((id) => toShade(id, drafts.get(id)!))
      .filter((s): s is CatalogShade => s !== null),
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
