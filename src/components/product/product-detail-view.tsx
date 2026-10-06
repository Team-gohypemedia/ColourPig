"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  Copy,
  Share2,
  Lock,
  Minus,
  Plus,
  Eye,
  Info,
  CheckCircle2,
  Droplets,
  Wind,
} from "lucide-react";
import { SnoutIcon, ColourpigLogo } from "@/components/brand/logo";
import { OFFICIAL_SHADES, ShadeProduct } from "@/data/shades";
import { useStore } from "@/context/store-context";

interface ProductDetailViewProps {
  initialShadeId?: string;
}

const KIT_OPTIONS = [
  {
    id: "starter-system",
    name: "Complete Starter System",
    subtitle: "Includes Ergonomic Dispenser + 50ml Precision Pod",
    priceInr: 2499,
    originalInr: 3499,
    tag: "MOST POPULAR",
  },
  {
    id: "refill-duo",
    name: "Refill Pod Duo (2x 50ml)",
    subtitle: "For returning users — Pods only",
    priceInr: 1899,
    originalInr: 2499,
    tag: "SUBSCRIBE & SAVE",
  },
  {
    id: "deluxe-ritual-set",
    name: "Annual Ritual Set (3x Pods + Dispenser)",
    subtitle: "Full year root care + complimentary applicator tool",
    priceInr: 3299,
    originalInr: 4699,
    tag: "BEST VALUE",
  },
];

const LOOKBOOK_STYLES = [
  {
    id: "look-1",
    title: "Deep Brunette Velvet",
    shade: "Shade No.4 • Medium Brown",
    image: "/images/model-brunette.jpg",
    description: "Multi-dimensional depth with zero brassy fade.",
  },
  {
    id: "look-2",
    title: "Luminous Sunlit Blonde",
    shade: "Shade No.7 • Medium Blonde",
    image: "/images/model-ash-blond.jpg",
    description: "Seamless blend between natural root and lightened ends.",
  },
  {
    id: "look-3",
    title: "Dimensional Auburn Depth",
    shade: "Shade No.5 • Light Brown",
    image: "/images/model-auburn.jpg",
    description: "High-shine warmth with 100% resistant grey coverage.",
  },
];

const RECENTLY_VIEWED = [
  {
    id: "shade-3",
    name: "Colourpig System No.3 Dark Brown",
    category: "Dark Espresso • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    image: "/images/products/cards/shade_card_3.jpg",
    shadeCode: "No.3",
  },
  {
    id: "shade-5",
    name: "Colourpig System No.5 Light Brown",
    category: "Warm Amber • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    image: "/images/products/cards/shade_card_5.jpg",
    shadeCode: "No.5",
  },
  {
    id: "shade-7",
    name: "Colourpig System No.7 Medium Blonde",
    category: "Warm Golden • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    image: "/images/products/cards/shade_card_7.jpg",
    shadeCode: "No.7",
  },
  {
    id: "shade-1",
    name: "Colourpig System No.1 Pure Black",
    category: "Deep Mineral Jet • Full Coverage",
    priceInr: 2499,
    originalInr: 3499,
    image: "/images/products/cards/shade_card_2.jpg",
    shadeCode: "No.1",
  },
];

const TESTIMONIALS = [
  {
    id: "rev-1",
    name: "Priyanka Verma",
    location: "Mumbai, MH",
    rating: 5,
    date: "Verified Buyer • 3 days ago",
    title: "Life-changing between salon visits",
    comment:
      "The precision nozzle makes applying this directly to root regrowth ridiculously clean. No stains on the scalp or towels, and the color matches my dark espresso hair seamlessly.",
  },
  {
    id: "rev-2",
    name: "Devi Agarwal",
    location: "Bengaluru, KA",
    rating: 5,
    date: "Verified Buyer • 1 week ago",
    title: "100% grey coverage without dry straw texture",
    comment:
      "Most drugstore root touch-ups make my hair feel like sandpaper. This formula left my roots soft, shiny, and fully blended. The air-driven dispenser is brilliant engineering.",
  },
  {
    id: "rev-3",
    name: "Saloni Sharma",
    location: "New Delhi, DL",
    rating: 5,
    date: "Verified Buyer • 2 weeks ago",
    title: "Takes only 4 minutes in the shower",
    comment:
      "I dispense it, brush it in while waiting, and wash it out. It's completely odorless and doesn't itch or drip at all. Reordering the refill duo right now.",
  },
];

export function ProductDetailView({ initialShadeId = "shade-4" }: ProductDetailViewProps) {
  const store = useStore();

  // Selected Shade state
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(() => {
    return (
      OFFICIAL_SHADES.find((s) => s.id === initialShadeId) ||
      OFFICIAL_SHADES.find((s) => s.code === "No.4") ||
      OFFICIAL_SHADES[3]
    );
  });

  // Selected Kit Option
  const [selectedKit, setSelectedKit] = useState(KIT_OPTIONS[0]);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Active Gallery Image index
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Copied Promo Code state
  const [copiedCode, setCopiedCode] = useState(false);

  // Open Accordion tabs
  const [openAccordion, setOpenAccordion] = useState<string | null>("how-it-works");

  // Gallery images array dynamically constructed from shade & brand assets
  const galleryImages = [
    {
      src: selectedShade.cardImage,
      alt: `${selectedShade.name} Packaging Artboard`,
      tag: "PACKAGING",
    },
    {
      src: "/images/product-dispenser.jpg",
      alt: "ColourPig In-Shower Precision Dispenser",
      tag: "DISPENSER",
    },
    {
      src: selectedShade.modelImage,
      alt: `${selectedShade.name} Salon Result`,
      tag: "RESULT",
    },
    {
      src: "/images/ritual/step_1_dispense_clean_bg.jpg",
      alt: "60-Second Air-Driven Dual Chamber Dispense",
      tag: "HOW IT DISPENSES",
    },
    {
      src: "/images/ritual/step_2_apply.jpg",
      alt: "No-Drip In-Shower Applicator",
      tag: "IN-SHOWER RITUAL",
    },
    {
      src: "/images/behind-scenes-lab.jpg",
      alt: "Pantone-Calibrated Micro-Pigments Lab",
      tag: "LAB SCIENCE",
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText("COLOUR10");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleAddToCart = () => {
    store.addToCart({
      id: `${selectedShade.id}-${selectedKit.id}`,
      name: `${selectedShade.name} — ${selectedKit.name}`,
      variant: `${selectedShade.undertone} • ${selectedKit.subtitle}`,
      price: selectedKit.priceInr,
      originalPrice: selectedKit.originalInr,
      image: selectedShade.cardImage,
      quantity,
      shadeCode: selectedShade.code,
      shadeHex: selectedShade.hex,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    store.openCart();
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#F5F6F6] text-obsidian min-h-screen">
      {/* 1. Breadcrumbs Bar */}
      <div className="w-full border-b border-ash/25 bg-white/80 backdrop-blur-sm px-4 sm:px-10 lg:px-14 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-graphite overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-obsidian transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3 h-3 text-ash shrink-0" />
          <Link href="#shades" className="hover:text-obsidian transition-colors">
            PERMANENT COLOR
          </Link>
          <ChevronRight className="w-3 h-3 text-ash shrink-0" />
          <span className="text-obsidian font-semibold truncate">
            {selectedShade.name} ({selectedShade.code})
          </span>
        </div>
      </div>

      {/* 2. Main Product Hero Section (Desktop Split Grid / Mobile Stack) */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-6 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Gallery Showcase */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 lg:sticky lg:top-24">
            
            {/* Vertical Thumbnail Rail (Desktop) / Horizontal Rail (Mobile) */}
            <div className="flex sm:flex-col gap-2.5 sm:gap-3 overflow-x-auto sm:overflow-y-auto sm:max-h-[620px] custom-drawer-scrollbar py-1 shrink-0">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white shadow-2xs group ${
                    activeImageIdx === idx
                      ? "border-obsidian shadow-sm scale-102"
                      : "border-ash/30 hover:border-ash/70 opacity-80 hover:opacity-100"
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </button>
              ))}
            </div>

            {/* Main High-Resolution Showcase Frame */}
            <div className="flex-1 relative aspect-[3/4] sm:aspect-[4/5] max-h-[720px] rounded-2xl overflow-hidden bg-white border border-ash/30 shadow-sm flex items-center justify-center group">
              <Image
                key={galleryImages[activeImageIdx].src}
                src={galleryImages[activeImageIdx].src}
                alt={galleryImages[activeImageIdx].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />

              {/* Top Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-obsidian/90 text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-md">
                  PATENTED AIR-DRIVEN
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#7AC142] text-obsidian font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shadow-md">
                  SAVE 28%
                </span>
              </div>

              {/* Wishlist Heart on Top Right */}
              <button
                type="button"
                onClick={() =>
                  store.toggleWishlist({
                    id: selectedShade.id,
                    name: `Colourpig Starter System (${selectedShade.name})`,
                    category: selectedShade.category,
                    price: selectedKit.priceInr,
                    originalPrice: selectedKit.originalInr,
                    image: selectedShade.cardImage,
                    shadeCode: selectedShade.code,
                  })
                }
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-ash/30 flex items-center justify-center text-obsidian hover:scale-110 active:scale-95 transition-all shadow-md"
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 stroke-[2] ${
                    store.isInWishlist(selectedShade.id)
                      ? "fill-rose-600 text-rose-600"
                      : "text-obsidian"
                  }`}
                />
              </button>

              {/* Gallery Arrow Controls */}
              <button
                onClick={() =>
                  setActiveImageIdx((prev) =>
                    prev === 0 ? galleryImages.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-obsidian border border-ash/30 flex items-center justify-center shadow-md opacity-80 hover:opacity-100 transition-all hover:scale-105 active:scale-95"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveImageIdx((prev) =>
                    prev === galleryImages.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-obsidian border border-ash/30 flex items-center justify-center shadow-md opacity-80 hover:opacity-100 transition-all hover:scale-105 active:scale-95"
                aria-label="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Bottom Tag Preview */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 pointer-events-none">
                <span>VIEW: {galleryImages[activeImageIdx].tag}</span>
                <span>
                  {activeImageIdx + 1} / {galleryImages.length}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Product Specifications & Purchasing Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header: Title, Category & Reviews */}
            <div className="space-y-2 border-b border-ash/25 pb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-graphite font-semibold">
                  FORMULA {selectedShade.formula} • {selectedShade.category}
                </span>
              </div>

              <h1 className="font-headline font-bold text-2xl sm:text-3xl text-obsidian uppercase tracking-tight leading-snug">
                COLOURPIG PERMANENT ROOT SYSTEM — {selectedShade.name}
              </h1>

              {/* Rating & Review Counter Row */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1 text-[#FFC72C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FFC72C] stroke-[#FFC72C]" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-obsidian">
                  4.9
                </span>
                <span className="text-ash text-xs">•</span>
                <span className="text-xs font-mono text-graphite underline cursor-pointer">
                  {selectedShade.reviews} Verified Reviews
                </span>
              </div>
            </div>

            {/* Pricing Row */}
            <div className="space-y-1.5 border-b border-ash/25 pb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-obsidian">
                  {store.formatPrice(selectedKit.priceInr)}
                </span>
                <span className="text-sm sm:text-base font-mono text-ash line-through">
                  {store.formatPrice(selectedKit.originalInr)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#7AC142]/20 border border-[#7AC142]/40 text-[#4e8721] font-mono text-xs font-bold">
                  Save {store.formatPrice(selectedKit.originalInr - selectedKit.priceInr)} (28% OFF)
                </span>
              </div>
              <p className="text-[11px] font-mono text-graphite">
                Inclusive of all taxes • Free express climate-controlled delivery
              </p>
            </div>

            {/* 1. Shade Swatch Selector (All 9 Shades) */}
            <div className="space-y-3 border-b border-ash/25 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian">
                    SELECT SHADE:
                  </span>
                  <span className="text-xs font-mono text-graphite font-semibold">
                    {selectedShade.code} {selectedShade.name.replace(/No\.\S+\s*/, "")}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#00A3E0] font-semibold">
                  100% BLEND MATCH
                </span>
              </div>

              {/* Swatch Pill Buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                {OFFICIAL_SHADES.map((shade) => {
                  const isSelected = selectedShade.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => {
                        setSelectedShade(shade);
                        setActiveImageIdx(0);
                      }}
                      className={`relative flex flex-col items-center gap-1 p-1 rounded-xl transition-all group ${
                        isSelected
                          ? "ring-2 ring-obsidian ring-offset-2 scale-105"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      title={`${shade.code} - ${shade.name}`}
                    >
                      <span
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/10 shadow-xs flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: shade.hex }}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />
                        )}
                      </span>
                      <span className="text-[9px] font-mono font-semibold text-obsidian truncate max-w-full">
                        {shade.code}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-white border border-ash/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs shrink-0"
                    style={{ backgroundColor: selectedShade.hex }}
                  />
                  <span className="text-xs font-mono text-obsidian font-medium">
                    Undertone: <strong className="font-bold">{selectedShade.undertone}</strong>
                  </span>
                </div>
                <Link
                  href="#shade-finder"
                  className="text-[10px] font-mono text-[#00A3E0] hover:underline font-semibold"
                >
                  View Before &amp; After →
                </Link>
              </div>
            </div>

            {/* 2. System Kit / Size Selector */}
            <div className="space-y-2.5 border-b border-ash/25 pb-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian block">
                SELECT SYSTEM FORMAT:
              </span>

              <div className="space-y-2">
                {KIT_OPTIONS.map((kit) => {
                  const isSelected = selectedKit.id === kit.id;
                  return (
                    <button
                      key={kit.id}
                      onClick={() => setSelectedKit(kit)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-obsidian bg-white shadow-xs"
                          : "border-ash/30 bg-platinum/20 hover:bg-white/80"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-headline font-bold text-obsidian uppercase">
                            {kit.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-platinum/60 text-obsidian border border-ash/20">
                            {kit.tag}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-graphite">
                          {kit.subtitle}
                        </p>
                      </div>

                      <div className="text-right shrink-0 ml-3">
                        <span className="text-xs sm:text-sm font-mono font-bold text-obsidian block">
                          {store.formatPrice(kit.priceInr)}
                        </span>
                        <span className="text-[10px] font-mono text-ash line-through">
                          {store.formatPrice(kit.originalInr)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. In-Stock Indicator & Live Urgency */}
            <div className="flex items-center justify-between text-xs font-mono text-graphite pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7AC142] animate-pulse" />
                <span className="text-obsidian font-semibold">
                  In Stock: Ready for immediate dispatch
                </span>
              </div>
              <span className="text-[10px] text-graphite">Ships in 24 hrs</span>
            </div>

            {/* 4. Quantity Pill & Primary Call To Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Pill */}
                <div className="inline-flex items-center gap-3 border border-ash/30 rounded-xl px-3 py-3 bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-graphite hover:text-obsidian transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-obsidian min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-graphite hover:text-obsidian transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Bag (Light Platinum) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-ash/30 bg-platinum/30 hover:bg-platinum/60 text-obsidian font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              {/* Buy Now (ColourPig Signature Obsidian Black) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 px-6 rounded-xl bg-obsidian hover:bg-black text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Lock className="w-4 h-4" />
                <span>BUY IT NOW — {store.formatPrice(selectedKit.priceInr * quantity)}</span>
              </button>
            </div>

            {/* 5. Four Core Trust Guarantee Badges Row (Matching Inspiration Screenshot) */}
            <div className="grid grid-cols-4 gap-2 pt-4 border-t border-ash/25 text-center">
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <CheckCircle2 className="w-4 h-4 mx-auto text-[#7AC142]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  100% GREY COVER
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <Droplets className="w-4 h-4 mx-auto text-[#00A3E0]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  AMMONIA FREE
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <Truck className="w-4 h-4 mx-auto text-[#FF671F]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  FREE DISPATCH
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-[#B584C4]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  30-DAY TRIAL
                </span>
              </div>
            </div>

            {/* 6. Promotional Discount Card with Copyable Code */}
            <div className="p-3.5 rounded-xl border border-dashed border-obsidian/40 bg-platinum/25 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-obsidian">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC72C]" />
                  <span>EXTRA 10% OFF PREPAID ORDERS</span>
                </div>
                <p className="text-[10px] font-mono text-graphite">
                  Use coupon code at final dispatch checkout
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="py-1.5 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
              >
                {copiedCode ? <Check className="w-3 h-3 text-[#7AC142]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? "COPIED!" : "COLOUR10"}</span>
              </button>
            </div>

            {/* 7. Accordion Breakdown Tabs (How it works, Ritual, Ingredients, Shipping) */}
            <div className="border-t border-ash/25 pt-4 space-y-2">
              {/* Tab 1 */}
              <div className="border border-ash/30 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("how-it-works")}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-headline font-bold text-obsidian uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Wind className="w-3.5 h-3.5 text-obsidian" />
                    <span>How The Air-Driven System Works</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "how-it-works" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "how-it-works" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-graphite space-y-2 border-t border-ash/15">
                    <p>
                      Unlike traditional hair dye bottles that expose developer and pigment to oxygen the moment they are mixed, ColourPig keeps both components isolated in separate vacuum chambers.
                    </p>
                    <p>
                      When pressed, the patented dispenser micro-emulsifies the active formula at a precise 1:1 ratio instantaneously at room temperature. Zero dripping, zero bowl mixing, zero oxidation waste.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 2 */}
              <div className="border border-ash/30 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("ritual")}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-headline font-bold text-obsidian uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5 text-obsidian" />
                    <span>The 4-Step In-Shower Ritual</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "ritual" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "ritual" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-graphite space-y-2 border-t border-ash/15">
                    <ul className="list-disc pl-4 space-y-1.5">
                      <li><strong>Step 1: Dispense</strong> — Press nozzle once directly onto the ergonomic precision applicator comb.</li>
                      <li><strong>Step 2: Trace Regrowth</strong> — Part dry hair along the root line and gently brush through.</li>
                      <li><strong>Step 3: Develop</strong> — Wait 10 minutes while doing your regular shower routine.</li>
                      <li><strong>Step 4: Rinse</strong> — Rinse with warm water until clear. No shampoo needed.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 3 */}
              <div className="border border-ash/30 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("ingredients")}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-headline font-bold text-obsidian uppercase"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-obsidian" />
                    <span>Clean Salon Formulation &amp; Safety</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "ingredients" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "ingredients" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-graphite space-y-2 border-t border-ash/15">
                    <p>
                      Formulated without Ammonia, Parabens, PPD, Resorcinol, Phthalates, or synthetic fragrance.
                    </p>
                    <p>
                      Infused with <strong>Meadowfoam Seed Oil</strong> and <strong>Hydrolyzed Pea Peptides</strong> to seal the hair cuticle, lock in moisture, and reflect mirror shine across high-porosity grey strands.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 4 */}
              <div className="border border-ash/30 rounded-xl bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-headline font-bold text-obsidian uppercase"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-obsidian" />
                    <span>Shipping, Allocation &amp; 30-Day Guarantee</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-graphite space-y-2 border-t border-ash/15">
                    <p>
                      Orders dispatched within 24 hours in insulated, carbon-neutral protective packaging.
                    </p>
                    <p>
                      Backed by our 30-day Color Happiness Guarantee: if your shade match is not 100% seamless, our colorists will exchange your kit for free or provide a full refund.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars Full-Width Dark Ribbon Bar (Matching Reference) */}
      <section className="w-full bg-obsidian text-platinum py-8 sm:py-10 border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1.5">
            <SnoutIcon className="w-5 h-5 mx-auto text-[#FFC72C]" color="#FFC72C" />
            <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
              100% ROOT COVERAGE
            </h4>
            <p className="text-[11px] font-mono text-ash">
              Penetrates coarse, resistant white and grey hair shafts effortlessly.
            </p>
          </div>

          <div className="space-y-1.5">
            <Wind className="w-5 h-5 mx-auto text-[#00A3E0]" />
            <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
              PATENTED DUAL-CHAMBER
            </h4>
            <p className="text-[11px] font-mono text-ash">
              Isolated vacuum preservation ensures maximum pigment potency.
            </p>
          </div>

          <div className="space-y-1.5">
            <Droplets className="w-5 h-5 mx-auto text-[#7AC142]" />
            <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
              NO-DRIP IN-SHOWER FOAM
            </h4>
            <p className="text-[11px] font-mono text-ash">
              Adheres directly to roots without running onto forehead or clothing.
            </p>
          </div>

          <div className="space-y-1.5">
            <Sparkles className="w-5 h-5 mx-auto text-[#B584C4]" />
            <h4 className="font-headline font-bold text-xs sm:text-sm text-white uppercase tracking-wider">
              PANTONE PRECISION
            </h4>
            <p className="text-[11px] font-mono text-ash">
              9 calibrated salon tones formulate seamless transitions.
            </p>
          </div>
        </div>
      </section>

      {/* 4. "DESIGNED FOR YOUR TRUE SHADE" — Editorial Lookbook Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
            EDITORIAL ARCHIVE
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl text-obsidian tracking-wider uppercase">
            DESIGNED FOR YOUR TRUE SHADE
          </h2>
          <p className="text-xs sm:text-sm font-mono text-graphite">
            Explore true-to-tone pigment results across different regrowth textures.
          </p>
          <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_STYLES.map((look) => (
            <div
              key={look.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-ash/30 shadow-sm flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-platinum/30">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                    {look.shade}
                  </span>
                  <h3 className="font-headline font-bold text-base sm:text-lg uppercase">
                    {look.title}
                  </h3>
                  <p className="text-[11px] font-mono text-platinum/90 line-clamp-2">
                    {look.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "YOU MIGHT ALSO LIKE" (Related 4-Card Grid matching Reference) */}
      <section className="w-full bg-platinum/30 border-y border-ash/30 py-14 sm:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
              COMPANION ESSENTIALS
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-3xl text-obsidian tracking-wider uppercase">
              YOU MIGHT ALSO LIKE
            </h2>
            <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {RECENTLY_VIEWED.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col bg-white rounded-2xl border border-ash/30 p-3 sm:p-4 shadow-2xs hover:shadow-sm transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-platinum/20 mb-3">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Top Wishlist Button */}
                  <button
                    onClick={() =>
                      store.toggleWishlist({
                        id: prod.id,
                        name: prod.name,
                        category: prod.category,
                        price: prod.priceInr,
                        image: prod.image,
                        shadeCode: prod.shadeCode,
                      })
                    }
                    className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center text-obsidian hover:scale-110 active:scale-95 transition-all"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        store.isInWishlist(prod.id)
                          ? "fill-rose-600 text-rose-600"
                          : "text-obsidian"
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-headline font-bold text-xs sm:text-sm text-obsidian uppercase truncate">
                      {prod.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] font-mono text-graphite truncate">
                      {prod.category}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xs sm:text-sm font-mono font-bold text-obsidian">
                        {store.formatPrice(prod.priceInr)}
                      </span>
                      <span className="text-[10px] font-mono text-ash line-through">
                        {store.formatPrice(prod.originalInr)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      store.addToCart({
                        id: `cart-${prod.id}`,
                        name: prod.name,
                        variant: prod.category,
                        price: prod.priceInr,
                        image: prod.image,
                        shadeCode: prod.shadeCode,
                      })
                    }
                    className="w-full py-2 px-3 rounded-xl bg-obsidian hover:bg-black text-white text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "WHAT OUR CUSTOMERS SAY" Testimonial Section with Breakdown */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-graphite font-semibold">
            REAL CLIENT RESULTS
          </span>
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-obsidian tracking-wider uppercase">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-xs sm:text-sm font-mono text-graphite">
            Over 2,400+ clients trust ColourPig for permanent salon-grade root care.
          </p>
          <div className="w-10 h-[2px] bg-obsidian/30 mx-auto mt-2" />
        </div>

        {/* Rating Breakdown Bar & Overall Score Box */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-ash/30 shadow-2xs mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-ash/20 pb-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-3xl font-headline font-bold text-obsidian">4.9</span>
                <div className="flex text-[#FFC72C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC72C] stroke-[#FFC72C]" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-mono text-graphite mt-1">
                Based on 310 verified root touch-up reviews
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-platinum/30 border border-ash/30 text-center">
              <span className="text-xs font-mono font-bold text-obsidian block">
                98% RECOMMEND RATE
              </span>
              <span className="text-[10px] font-mono text-graphite">
                Would repurchase the refill pod
              </span>
            </div>
          </div>

          {/* Star rating breakdown progress bars */}
          <div className="space-y-2 font-mono text-xs">
            {[
              { stars: "5 Star", pct: 91, count: 282 },
              { stars: "4 Star", pct: 7, count: 21 },
              { stars: "3 Star", pct: 2, count: 6 },
              { stars: "2 Star", pct: 0, count: 1 },
              { stars: "1 Star", pct: 0, count: 0 },
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="w-14 text-graphite text-[11px] shrink-0">{bar.stars}</span>
                <div className="flex-1 h-2 rounded-full bg-platinum/40 overflow-hidden">
                  <div
                    className="h-full bg-obsidian rounded-full"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-graphite text-[10px] shrink-0">
                  {bar.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Detailed Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-white border border-ash/30 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#FFC72C]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC72C] stroke-[#FFC72C]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-graphite">{t.date}</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-obsidian">
                  &ldquo;{t.title}&rdquo;
                </h4>
                <p className="text-xs font-mono text-graphite leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-ash/20 flex items-center justify-between">
                <div>
                  <h5 className="font-headline font-bold text-xs text-obsidian">{t.name}</h5>
                  <span className="text-[10px] font-mono text-ash">{t.location}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#7AC142]/20 text-[#4e8721] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom Brand Banner ("OWN YOUR COLOR #AIRHEADS") */}
      <section className="w-full bg-obsidian text-white py-14 sm:py-20 border-t border-white/10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto px-4 space-y-4 relative z-10">
          <SnoutIcon className="w-7 h-7 mx-auto text-[#FFC72C]" color="#FFC72C" />
          <h2 className="font-headline font-bold text-2xl sm:text-4xl uppercase tracking-wider">
            OWN YOUR COLOR #AIRHEADS
          </h2>
          <p className="text-xs sm:text-sm font-mono text-platinum leading-relaxed">
            Never wait 6 weeks for a root appointment again. Patented salon permanence at your vanity.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="py-3 px-8 rounded-full bg-white text-obsidian hover:bg-platinum font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg active:scale-95"
            >
              SELECT YOUR SHADE NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
