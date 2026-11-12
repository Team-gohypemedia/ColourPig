import "server-only";

/**
 * Shopify Storefront API client. Server-side only: the access tokens never
 * reach the browser. The private token is preferred; the public token is used
 * when no private token is set.
 */

const domain = (process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "")
  .trim()
  .replace(/^https?:\/\//i, "")
  .replace(/\/+$/, "");

const privateToken =
  process.env.SHOPIFY_STOREFRONT_PRIVATE_ACCESS_TOKEN || process.env.SHOPIFY_PRIVATE_ACCESS_TOKEN || "";

const publicToken =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-10";

export const isShopifyConfigured = Boolean(domain && (privateToken || publicToken));

const endpoint = isShopifyConfigured ? `https://${domain}/api/${apiVersion}/graphql.json` : null;

export class ShopifyError extends Error {}

interface ShopifyFetchOptions {
  variables?: Record<string, unknown>;
  /** Seconds to cache the response for. Omit for uncached requests (mutations, carts). */
  revalidate?: number;
  tags?: string[];
}

export async function shopifyFetch<T>(
  query: string,
  { variables = {}, revalidate, tags }: ShopifyFetchOptions = {}
): Promise<T> {
  if (!endpoint) {
    throw new ShopifyError("Shopify is not configured: set the store domain and a Storefront access token.");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(privateToken
        ? { "Shopify-Storefront-Private-Token": privateToken }
        : { "X-Shopify-Storefront-Access-Token": publicToken }),
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate !== undefined ? { next: { revalidate, tags } } : { cache: "no-store" as const }),
  });

  const text = await res.text();
  let json: { data?: T; errors?: { message: string }[] };
  try {
    json = JSON.parse(text);
  } catch {
    throw new ShopifyError(`Shopify returned a non-JSON response (${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok) {
    throw new ShopifyError(`Shopify request failed (${res.status}): ${text.slice(0, 200)}`);
  }
  if (json.errors?.length) {
    throw new ShopifyError(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new ShopifyError("Shopify returned no data.");
  }
  return json.data;
}
