import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Colourpig Brand Guide Palette (Page 27)
        obsidian: "#0D151C", // HEX: #0D151C, RGB: 13, 21, 28
        midnight: "#13212E", // HEX: #13212E, RGB: 19, 33, 46
        steel: "#253744",    // HEX: #253744, RGB: 37, 55, 68
        graphite: "#495B69", // HEX: #495B69, RGB: 73, 91, 105
        ash: "#949FA3",      // HEX: #949FA3, RGB: 148, 159, 163
        platinum: "#CED1D0", // HEX: #CED1D0, RGB: 206, 209, 208
        toc: "#142431",      // Image 2 Table of Contents Petrol Navy

        // Official System Accent Palette (Pantone Brand Swatches)
        pantone: {
          yellow: "#FFC72C", // PANTONE 123C
          pink: "#F08EAB",   // PANTONE 1905C
          blue: "#00A3E0",   // PANTONE 299C
          orange: "#FF671F", // PANTONE 165C
          green: "#7AC142",  // PANTONE 375C
          purple: "#B584C4", // PANTONE 2572C
        },
      },
      fontFamily: {
        // Brand Guide pp. 24–26 — stacks defined as CSS variables in globals.css
        // Primary: PP Agrandir (titles / headlines)
        headline: ["var(--font-primary)"],
        title: ["var(--font-primary)"],
        agrandir: ["var(--font-primary)"],
        // Secondary: PP Neue Montreal (body / UI)
        body: ["var(--font-secondary)"],
        sans: ["var(--font-secondary)"],
        "neue-montreal": ["var(--font-secondary)"],
        // Helping: Intel One Mono (labels / codes / metadata)
        mono: ["var(--font-helping)"],
        "intel-mono": ["var(--font-helping)"],
        // Legacy aliases — kept so existing class names keep working
        serif: ["var(--font-primary)"],
        cormorant: ["var(--font-primary)"],
        montserrat: ["var(--font-secondary)"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        widestBrand: "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
