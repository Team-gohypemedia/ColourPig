export interface ShadeProduct {
  id: string;
  code: string;
  formula: string;
  name: string;
  category: string;
  hex: string;
  price: number;
  swatchImage: string;
  cardImage: string;
  sideImage?: string;
  backImage?: string;
  video?: string;
  modelImage: string;
  description: string;
  undertone: string;
  colorFamily?: "black" | "brown" | "blonde" | "clear";
  rating: number;
  reviews: number;
}

export interface ColorFamily {
  id: "black" | "brown" | "blonde" | "clear";
  name: string;
  hex: string;
  description: string;
  shadeIds: string[];
}

export const COLOR_FAMILIES: ColorFamily[] = [
  {
    id: "black",
    name: "Black",
    hex: "#2D2C2D",
    description: "Deep mineral jet black with resistant root coverage",
    shadeIds: ["shade-1"],
  },
  {
    id: "brown",
    name: "Brown",
    hex: "#4E4136",
    description: "Rich espresso, chestnut, and amber brown tones",
    shadeIds: ["shade-3", "shade-4", "shade-5"],
  },
  {
    id: "blonde",
    name: "Blonde",
    hex: "#BE966C",
    description: "Honey, golden, sunlit, and champagne blonde tones",
    shadeIds: ["shade-6", "shade-7", "shade-8", "shade-9"],
  },
  {
    id: "clear",
    name: "Clear",
    hex: "#F2EFF0",
    description: "Universal gloss and translucent gray blending",
    shadeIds: ["shade-0-0"],
  },
];

export function getColorFamilyForShade(shadeIdOrCode: string): ColorFamily {
  const normalized = shadeIdOrCode.trim().toLowerCase();

  if (
    normalized === "shade-1" ||
    normalized === "no.1" ||
    normalized === "1" ||
    normalized.includes("black")
  ) {
    return COLOR_FAMILIES[0];
  }

  if (
    normalized === "shade-3" ||
    normalized === "shade-4" ||
    normalized === "shade-5" ||
    normalized === "no.3" ||
    normalized === "no.4" ||
    normalized === "no.5" ||
    normalized === "3" ||
    normalized === "4" ||
    normalized === "5" ||
    normalized.includes("brown")
  ) {
    return COLOR_FAMILIES[1];
  }

  if (
    normalized === "shade-6" ||
    normalized === "shade-7" ||
    normalized === "shade-8" ||
    normalized === "shade-9" ||
    normalized === "no.6" ||
    normalized === "no.7" ||
    normalized === "no.8" ||
    normalized === "no.9" ||
    normalized === "6" ||
    normalized === "7" ||
    normalized === "8" ||
    normalized === "9" ||
    normalized.includes("blonde")
  ) {
    return COLOR_FAMILIES[2];
  }

  if (
    normalized === "shade-0-0" ||
    normalized === "no.0/0" ||
    normalized === "0/0" ||
    normalized === "0-0" ||
    normalized.includes("clear")
  ) {
    return COLOR_FAMILIES[3];
  }

  const found = OFFICIAL_SHADES.find(
    (s) => s.id === shadeIdOrCode || s.code === shadeIdOrCode || s.code === `No.${shadeIdOrCode}`
  );
  if (found) {
    return getColorFamilyForShade(found.id);
  }

  return COLOR_FAMILIES[1];
}

export const OFFICIAL_SHADES: ShadeProduct[] = [
  {
    id: "shade-0-0",
    code: "No.0/0",
    formula: "0.0",
    name: "No.0/0 Clear",
    category: "Universal Gloss & Gray Blending",
    hex: "#F2EFF0",
    price: 89,
    swatchImage: "/images/products/swatches/shade_1_swatch.png",
    cardImage: "/images/products/cards/shade_card_1.jpg",
    video: "/system-exploded-hd.mp4",
    modelImage: "/images/results/model_shade_1.jpg",
    description: "Air-driven permanent clear formula for multi-dimensional shine and gray translucency.",
    undertone: "Neutral Translucent",
    rating: 4.9,
    reviews: 118,
  },
  {
    id: "shade-1",
    code: "No.1",
    formula: "2.0",
    name: "No.1 Black",
    category: "Deep Mineral Jet Black",
    hex: "#2D2C2D",
    price: 89,
    swatchImage: "/images/products/swatches/shade_2_swatch.png",
    cardImage: "/Black/Black.jpg",
    sideImage: "/Black/Side.jpg",
    backImage: "/Black/BackSide.jpg",
    video: "/Black/Black.mp4",
    modelImage: "/images/results/model_shade_2.jpg",
    description: "Ultra-pigmented pure black with 100% resistant grey root coverage.",
    undertone: "Deep Cool Mineral",
    rating: 5.0,
    reviews: 242,
  },
  {
    id: "shade-3",
    code: "No.3",
    formula: "3.0",
    name: "No.3 Brown",
    category: "Dark Espresso Brown",
    hex: "#241E1C",
    price: 89,
    swatchImage: "/images/products/swatches/shade_3_swatch.png",
    cardImage: "/Brown/Brown.jpg",
    sideImage: "/Brown/Side.jpg",
    backImage: "/Brown/BackSide.jpg",
    video: "/Brown/Brown.mp4",
    modelImage: "/images/results/model_shade_3.jpg",
    description: "Intense deep espresso brown with natural velvet depth and zero brassiness.",
    undertone: "Cool Espresso",
    rating: 4.9,
    reviews: 195,
  },
  {
    id: "shade-4",
    code: "No.4",
    formula: "4.0",
    name: "No.4 Medium Brown",
    category: "Natural Chestnut Brown",
    hex: "#4E4136",
    price: 89,
    swatchImage: "/images/products/swatches/shade_4_swatch.png",
    cardImage: "/Medium Brown/Medium Brown.00000.png",
    sideImage: "/Medium Brown/Side.jpg",
    backImage: "/Medium Brown/BackSide.jpg",
    video: "/Medium Brown/Medium Brown.mp4",
    modelImage: "/images/results/model_shade_4.jpg",
    description: "Balanced natural medium brown offering seamless root touch-up blending.",
    undertone: "Neutral Brown",
    rating: 4.9,
    reviews: 310,
  },
  {
    id: "shade-5",
    code: "No.5",
    formula: "5.0",
    name: "No.5 Light Brown",
    category: "Warm Amber Light Brown",
    hex: "#624F44",
    price: 89,
    swatchImage: "/images/products/swatches/shade_5_swatch.png",
    cardImage: "/Light Brown/LightBrown01.jpg",
    sideImage: "/Light Brown/Side.jpg",
    backImage: "/Light Brown/BackSide.jpg",
    video: "/Light Brown/Light Brown.mp4",
    modelImage: "/images/results/model_shade_5.jpg",
    description: "Luminous light brown with delicate warm undertones for effortless regrowth coverage.",
    undertone: "Warm Amber",
    rating: 4.8,
    reviews: 167,
  },
  {
    id: "shade-6",
    code: "No.6",
    formula: "6.0",
    name: "No.6 Dark Blonde",
    category: "Deep Honey Dark Blonde",
    hex: "#755A42",
    price: 89,
    swatchImage: "/images/products/swatches/shade_6_swatch.png",
    cardImage: "/Dark Blonde/DarkBlonde.jpg",
    sideImage: "/Dark Blonde/Side.jpg",
    backImage: "/Dark Blonde/BackSide.jpg",
    video: "/Dark Blonde/Dark Blonde.mp4",
    modelImage: "/images/results/model_shade_6.jpg",
    description: "Sophisticated dark blonde sitting perfectly between light brunette and rich caramel.",
    undertone: "Honey Neutral",
    rating: 4.9,
    reviews: 182,
  },
  {
    id: "shade-7",
    code: "No.7",
    formula: "7.0",
    name: "No.7 Medium Blonde",
    category: "Warm Golden Medium Blonde",
    hex: "#BE966C",
    price: 89,
    swatchImage: "/images/products/swatches/shade_7_swatch.png",
    cardImage: "/Medium Blonde/MediumBlonde.jpg",
    sideImage: "/Medium Blonde/Side.jpg",
    backImage: "/Medium Blonde/BackSide.jpg",
    video: "/Medium Blonde/Medium Blonde.mp4",
    modelImage: "/images/results/model_shade_7.jpg",
    description: "Radiant golden medium blonde designed for natural multi-tonal highlights.",
    undertone: "Warm Golden",
    rating: 4.9,
    reviews: 215,
  },
  {
    id: "shade-8",
    code: "No.8",
    formula: "8.0",
    name: "No.8 Light Blonde",
    category: "Luminous Sunlit Blonde",
    hex: "#D2A982",
    price: 89,
    swatchImage: "/images/products/swatches/shade_8_swatch.png",
    cardImage: "/Light Blonde/LightBlonde.jpg",
    sideImage: "/Light Blonde/Side.jpg",
    backImage: "/Light Blonde/BackSide.jpg",
    video: "/Light Blonde/Nob Light blonde.mp4",
    modelImage: "/images/results/model_shade_8.jpg",
    description: "Bright sunlit blonde delivering pristine clarity without yellow undertones.",
    undertone: "Sunlit Neutral",
    rating: 4.8,
    reviews: 149,
  },
  {
    id: "shade-9",
    code: "No.9",
    formula: "9.0",
    name: "No.9 Very Light Blonde",
    category: "Champagne Platinum Blonde",
    hex: "#E3C8AD",
    price: 89,
    swatchImage: "/images/products/swatches/shade_9_swatch.png",
    cardImage: "/Very Light Brown/Very Light Blonde.00000.png",
    sideImage: "/Very Light Brown/Side.jpg",
    backImage: "/Very Light Brown/BackSide.jpg",
    video: "/Very Light Brown/Very Light Brown.mp4",
    modelImage: "/images/results/model_shade_9.jpg",
    description: "Ultra-light champagne blonde with maximum luminescence and zero damage.",
    undertone: "Pale Champagne",
    rating: 5.0,
    reviews: 188,
  },
];

export const PACKAGING_SYSTEM_DETAILS = {
  brand: "COLOURPIG™",
  parentCompany: "A Norman Brown Product",
  headOffice: "Norman Brown Pty Ltd, 46 Oxford Street, Paddington NSW 2021, Sydney, Australia",
  manufacturing: "Designed in Australia • Made in P.R.C",
  systemName: "GREY TOUCH UP AIR DRIVEN SYSTEM",
  keyFeatures: [
    "MULTIPLE USE (Reusable dual-chamber dispenser)",
    "NO MIXING (Pre-measured automatic dual-chamber delivery)",
    "NEW TECHNOLOGY AIR DRIVEN PERMANENT HAIR COLOUR",
    "30-MINUTE RAPID DEVELOPMENT",
  ],
  boxContents: [
    { item: "Colour Base Cream", volume: "50 ml NET" },
    { item: "Colour Developer", volume: "50 ml NET" },
    { item: "Stain Remover", volume: "10 ml NET" },
    { item: "Shampoo", volume: "10 ml NET" },
    { item: "Hair Conditioner", volume: "10 ml NET" },
  ],
  usageSteps: [
    { step: 1, label: "USE ME", description: "Depress canister top to dispense dual formulas evenly" },
    { step: 2, label: "IN ME", description: "Collect dual components directly in mixing tray" },
    { step: 3, label: "WITH ME", description: "Apply to roots using precision root brush" },
    { step: 4, label: "DEVELOP ME", description: "Leave for 30 minutes to develop" },
    { step: 5, label: "RINSE WITH ME", description: "Wash out with Colourpig Shampoo & Conditioner" },
    { step: 6, label: "WIPE WITH ME", description: "Gently wipe skin hairline with Stain Remover" },
  ],
};
