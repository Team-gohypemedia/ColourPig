import { isShopifyConfigured } from "@/lib/shopify/client";
import { CheckoutLine, createCheckout } from "@/lib/shopify/checkout";

const VARIANT_ID = /^gid:\/\/shopify\/ProductVariant\/\d+$/;
const SELLING_PLAN_ID = /^gid:\/\/shopify\/SellingPlan\/\d+$/;
const MAX_LINES = 50;
const MAX_QUANTITY = 999;

function parseLines(body: unknown): CheckoutLine[] | null {
  const lines = (body as { lines?: unknown })?.lines;
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > MAX_LINES) return null;

  const parsed: CheckoutLine[] = [];
  for (const line of lines) {
    const { variantId, quantity, sellingPlanId } = (line ?? {}) as Record<string, unknown>;
    if (typeof variantId !== "string" || !VARIANT_ID.test(variantId)) return null;
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
      return null;
    }
    if (sellingPlanId !== undefined && (typeof sellingPlanId !== "string" || !SELLING_PLAN_ID.test(sellingPlanId))) {
      return null;
    }
    parsed.push({ variantId, quantity, sellingPlanId });
  }
  return parsed;
}

/** POST /api/checkout — turns the bag into a Shopify cart and returns its checkout URL. */
export async function POST(request: Request) {
  if (!isShopifyConfigured) {
    return Response.json({ error: "Checkout is not connected to Shopify yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const lines = parseLines(body);
  if (!lines) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const result = await createCheckout(lines);
    return Response.json(result, { status: "error" in result ? 409 : 200 });
  } catch (error) {
    console.error("[shopify] Checkout failed.", error);
    return Response.json({ error: "Checkout is unavailable right now. Please try again." }, { status: 502 });
  }
}
