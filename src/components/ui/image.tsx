"use client";

import NextImage, { type ImageLoader, type ImageProps } from "next/image";

/*
 * Drop-in replacement for next/image.
 * - Shopify images are resized by Shopify's own CDN (?width=…), so they never
 *   pass through Vercel Image Optimization and don't use its quota. Shopify
 *   also serves WebP/AVIF automatically to browsers that support them.
 * - Images bundled with the site (/images/…) still use Vercel's optimizer.
 * - An empty src renders nothing instead of a broken <img src="">.
 */

const shopifyLoader: ImageLoader = ({ src, width }) => {
  const url = new URL(src);
  url.searchParams.set("width", String(width));
  return url.toString();
};

function isShopifyImage(src: ImageProps["src"]): src is string {
  return typeof src === "string" && /^https:\/\/cdn\.shopify\.com\//i.test(src);
}

export default function Image(props: ImageProps) {
  if (!props.src) return null;
  if (isShopifyImage(props.src)) {
    return <NextImage loader={shopifyLoader} {...props} />;
  }
  return <NextImage {...props} />;
}
