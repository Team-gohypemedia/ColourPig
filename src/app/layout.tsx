import type { Metadata } from "next";
import { Intel_One_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ScrollToTop } from "@/components/navigation/scroll-to-top";

// Helping font (Brand Guide p. 26). PP Agrandir & PP Neue Montreal are
// loaded via @font-face in globals.css.
const intelOneMono = Intel_One_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-intel-mono",
  display: "swap",
  adjustFontFallback: false,
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${intelOneMono.variable} antialiased`}>
      <body className="bg-obsidian text-platinum font-body selection:bg-steel selection:text-white">
        <SmoothScrollProvider>
          {children}
          <ScrollToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
