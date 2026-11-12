import "server-only";
import { shopifyFetch } from "./client";

export interface CheckoutLine {
  variantId: string;
  quantity: number;
  sellingPlanId?: string;
}

export type CheckoutResult = { checkoutUrl: string } | { error: string };

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { checkoutUrl totalQuantity }
      userErrors { message }
      warnings { code message }
    }
  }
`;

interface CartCreateResult {
  cartCreate: {
    cart: { checkoutUrl: string; totalQuantity: number } | null;
    userErrors: { message: string }[];
    warnings: { code: string; message: string }[];
  };
}

/**
 * Creates a Shopify cart for the given lines and returns its checkout URL.
 * Shopify prices the lines itself, so nothing the browser sends can change
 * what the customer is charged.
 */
export async function createCheckout(lines: CheckoutLine[]): Promise<CheckoutResult> {
  const { cartCreate } = await shopifyFetch<CartCreateResult>(CART_CREATE_MUTATION, {
    variables: {
      input: {
        lines: lines.map((line) => ({
          merchandiseId: line.variantId,
          quantity: line.quantity,
          ...(line.sellingPlanId ? { sellingPlanId: line.sellingPlanId } : {}),
        })),
      },
    },
  });

  // Warnings mean Shopify changed the cart (e.g. removed a sold-out item):
  // tell the customer instead of sending them to a checkout that differs from their bag.
  const problems = [...cartCreate.userErrors, ...cartCreate.warnings].map((p) => p.message);
  if (problems.length > 0) {
    return { error: [...new Set(problems)].join(" ") };
  }
  if (!cartCreate.cart || cartCreate.cart.totalQuantity === 0) {
    return { error: "Your bag could not be sent to checkout. Please try again." };
  }
  return { checkoutUrl: cartCreate.cart.checkoutUrl };
}
