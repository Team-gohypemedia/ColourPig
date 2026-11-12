import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ScrollToTop } from "@/components/navigation/scroll-to-top";
import { CatalogProvider } from "@/context/catalog-context";
import { getCatalog } from "@/lib/shopify/catalog";

// All brand fonts (PP Agrandir, PP Neue Montreal, Intel One Mono) are self-hosted
// via @font-face in globals.css — files live in public/fonts/.

export const metadata: Metadata = {
  title: "Colourpig by Norman & Brown — World's First Reusable Precision Hair Colour System",
  description:
    "Engineered hair colour system eliminating 90% of waste and 75% of plastic through proprietary air-compression technology. Built to endure.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Shades, prices, images and availability — from Shopify, refreshed every minute
  const catalog = await getCatalog();

  return (
    <html lang="en" className="antialiased">
      <body className="bg-obsidian text-platinum font-body selection:bg-steel selection:text-white">
        <CatalogProvider catalog={catalog}>
          <SmoothScrollProvider>
            {children}
            <ScrollToTop />
          </SmoothScrollProvider>
        </CatalogProvider>
      </body>
    </html>
  );
}
