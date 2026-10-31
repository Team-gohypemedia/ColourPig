"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Play,
  Maximize2,
} from "lucide-react";
import { SnoutIcon, ColourpigLogo } from "@/components/brand/logo";
import {
  OFFICIAL_SHADES,
  ShadeProduct,
} from "@/data/shades";
import { useStore } from "@/context/store-context";

interface ProductDetailViewProps {
  initialShadeId?: string;
  initialImage?: string;
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
    image: "/Brown/Brown.jpg",
    shadeCode: "No.3",
    shadeHex: "#241E1C",
  },
  {
    id: "shade-5",
    name: "Colourpig System No.5 Light Brown",
    category: "Warm Amber • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    image: "/Light Brown/LightBrown01.jpg",
    shadeCode: "No.5",
    shadeHex: "#624F44",
  },
  {
    id: "shade-7",
    name: "Colourpig System No.7 Medium Blonde",
    category: "Warm Golden • Reusable System",
    priceInr: 2499,
    originalInr: 3499,
    image: "/Medium Blonde/MediumBlonde.jpg",
    shadeCode: "No.7",
    shadeHex: "#BE966C",
  },
  {
    id: "shade-1",
    name: "Colourpig System No.1 Pure Black",
    category: "Deep Mineral Jet • Full Coverage",
    priceInr: 2499,
    originalInr: 3499,
    image: "/Black/Black.jpg",
    shadeCode: "No.1",
    shadeHex: "#2D2C2D",
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

function resolveShadeFromParam(param: string): ShadeProduct {
  const clean = (param || "shade-4").trim().toLowerCase();

  // Color aliases
  if (clean === "black" || clean === "1" || clean === "shade-1" || clean === "no.1" || clean === "shade-2" || clean === "2") {
    return OFFICIAL_SHADES.find((s) => s.id === "shade-1") || OFFICIAL_SHADES[1];
  }
  if (clean === "brown" || clean === "4" || clean === "shade-4" || clean === "no.4") {
    return OFFICIAL_SHADES.find((s) => s.id === "shade-4") || OFFICIAL_SHADES[3];
  }
  if (clean === "blonde" || clean === "7" || clean === "shade-7" || clean === "no.7") {
    return OFFICIAL_SHADES.find((s) => s.id === "shade-7") || OFFICIAL_SHADES[6];
  }
  if (clean === "clear" || clean === "0/0" || clean === "0-0" || clean === "shade-0-0" || clean === "no.0/0") {
    return OFFICIAL_SHADES.find((s) => s.id === "shade-0-0") || OFFICIAL_SHADES[0];
  }

  return (
    OFFICIAL_SHADES.find((s) => s.id === clean) ||
    OFFICIAL_SHADES.find((s) => s.id === `shade-${clean}`) ||
    OFFICIAL_SHADES.find((s) => s.code.toLowerCase() === clean) ||
    OFFICIAL_SHADES.find((s) => s.code.toLowerCase() === `no.${clean}`) ||
    OFFICIAL_SHADES.find((s) => s.name.toLowerCase().includes(clean)) ||
    OFFICIAL_SHADES[3]
  );
}

export function ProductDetailView({
  initialShadeId = "shade-4",
  initialImage,
}: ProductDetailViewProps) {
  const store = useStore();

  // Selected Shade state
  const [selectedShade, setSelectedShade] = useState<ShadeProduct>(() => {
    const base = resolveShadeFromParam(initialShadeId);
    if (initialImage) {
      return { ...base, cardImage: initialImage };
    }
    return base;
  });

  // Sync state when initialShadeId or initialImage prop changes
  useEffect(() => {
    const target = resolveShadeFromParam(initialShadeId);
    if (target) {
      setSelectedShade(initialImage ? { ...target, cardImage: initialImage } : target);
      setActiveImageIdx(0);
    }
  }, [initialShadeId, initialImage]);

  // Smooth scroll directly to Customer Reviews section
  const scrollToReviews = (e: React.MouseEvent) => {
    e.preventDefault();
    const reviewsEl = document.getElementById("reviews");
    if (!reviewsEl) return;

    const lenis = typeof window !== "undefined" ? (window as any).lenis : null;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(reviewsEl, { offset: -90, duration: 1.2 });
    } else {
      reviewsEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  // Video element ref
  const videoRef = useRef<HTMLVideoElement>(null);

  // Gallery media items dynamically constructed from shade & brand assets
  const galleryImages = [
    {
      type: "image" as const,
      src: selectedShade.cardImage,
      alt: `${selectedShade.name} Front Packaging`,
      tag: "FRONT CANISTER",
    },
    ...(selectedShade.video
      ? [
          {
            type: "video" as const,
            src: selectedShade.video,
            poster: selectedShade.cardImage,
            alt: `${selectedShade.name} 360° Product Video`,
            tag: "PRODUCT VIDEO",
          },
        ]
      : []),
    ...(selectedShade.sideImage
      ? [
          {
            type: "image" as const,
            src: selectedShade.sideImage,
            alt: `${selectedShade.name} Side Packaging Profile`,
            tag: "SIDE PROFILE",
          },
        ]
      : []),
  ];

  const activeItem = galleryImages[Math.min(activeImageIdx, galleryImages.length - 1)] || galleryImages[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText("COLOUR10");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleAddToCart = () => {
    store.addToCart({
      id: `${selectedShade.id}-${selectedKit.id}`,
      name:
        selectedKit.id === "starter-system"
          ? `Colourpig Starter System | ${selectedShade.name}`
          : `Colourpig ${selectedKit.name} | ${selectedShade.name}`,
      variant: `Shade ${selectedShade.code} • ${selectedKit.subtitle}`,
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
    <div className="w-full bg-white text-obsidian min-h-screen">
      {/* 1. Breadcrumbs Bar */}
      <div className="w-full border-b border-ash/25 bg-white/80 backdrop-blur-sm px-4 sm:px-10 lg:px-14 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-obsidian overflow-x-auto whitespace-nowrap">
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
              {galleryImages.map((img, idx) => {
                const isSelected = activeImageIdx === idx;
                const isVid = img.type === "video";
                const thumbSrc = isVid ? (img.poster || selectedShade.cardImage) : img.src;
                const isCardImg = thumbSrc.includes("shade_card_");

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white shadow-2xs group cursor-pointer ${
                      isSelected
                        ? "border-obsidian shadow-sm scale-102"
                        : "border-ash/30 hover:border-ash/70 opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <Image
                      src={thumbSrc}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className={"object-cover object-center"}
                    />
                    {isVid ? (
                      <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white p-1 transition-colors group-hover:bg-black/30">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/95 text-obsidian flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                        <span className="text-[8px] font-mono font-bold tracking-wider uppercase mt-1 drop-shadow">
                          VIDEO
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main High-Resolution Showcase Frame */}
            <div className={`flex-1 relative aspect-[3/4] sm:aspect-[4/5] max-h-[720px] rounded-2xl overflow-hidden bg-white border border-ash/30 shadow-sm flex items-center justify-center group`}>
              {activeItem.type === "video" ? (
                <div className="relative w-full h-full flex items-center justify-center bg-[#070D12] p-2 sm:p-4">
                  <video
                    ref={videoRef}
                    key={activeItem.src}
                    src={encodeURI(activeItem.src)}
                    poster={activeItem.poster ? encodeURI(activeItem.poster) : undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-contain object-center"
                  />
                </div>
              ) : (
                <Image
                  key={activeItem.src}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className={
                    "object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  }
                />
              )}


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
            </div>
          </div>

          {/* RIGHT COLUMN: Product Specifications & Purchasing Controls */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header: Title, Category & Reviews */}
            <div className="space-y-2 border-b border-ash/25 pb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-obsidian font-semibold">
                  FORMULA {selectedShade.formula} • {selectedShade.category}
                </span>
              </div>

              <h1 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian uppercase tracking-wider leading-tight">
                COLOURPIG PERMANENT ROOT SYSTEM — {selectedShade.name}
              </h1>

              {/* Rating & Review Counter Row */}
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#reviews"
                  onClick={scrollToReviews}
                  className="inline-flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
                  aria-label={`Scroll to customer reviews (${selectedShade.reviews} verified reviews, rated 4.9 out of 5 stars)`}
                >
                  <div className="flex items-center gap-1 text-[#374151] transition-transform group-hover:scale-105">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#374151] stroke-[#374151]" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-obsidian group-hover:text-black">
                    4.9
                  </span>
                  <span className="text-ash text-xs">•</span>
                  <span className="text-xs font-mono text-obsidian underline group-hover:text-obsidian transition-colors">
                    {selectedShade.reviews} Verified Reviews
                  </span>
                </a>
              </div>
            </div>

            {/* Pricing Row */}
            <div className="space-y-1.5 border-b border-ash/25 pb-5">
              <div className="flex items-baseline gap-3">
                <span
                  className="text-2xl sm:text-3xl font-mono !font-normal font-[400] text-obsidian"
                  style={{ fontWeight: 400 }}
                >
                  {store.formatPrice(selectedKit.priceInr)}
                </span>
                <span className="text-sm sm:text-base font-mono text-ash line-through">
                  {store.formatPrice(selectedKit.originalInr)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#374151]/20 border border-[#374151]/40 text-[#4e8721] font-mono text-xs font-normal">
                  Save {store.formatPrice(selectedKit.originalInr - selectedKit.priceInr)} (28% OFF)
                </span>
              </div>
              <p className="text-[11px] font-mono text-obsidian">
                Inclusive of all taxes • Free express climate-controlled delivery
              </p>
            </div>

            {/* 1. Shade Swatch Selector (Only shades for the selected product color) */}
            <div className="space-y-3 border-b border-ash/25 pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian">
                    SELECT SHADE:
                  </span>
                  <span className="text-xs font-mono text-obsidian font-semibold">
                    {selectedShade.code} {selectedShade.name.replace(/No\.\S+\s*/, "")}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#374151] font-semibold">
                  100% BLEND MATCH
                </span>
              </div>

              {/* Swatch Pill - ONLY the exact selected product color/shade */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div
                  className="relative flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-[14px] border-[2px] border-obsidian bg-black/[0.03] shadow-xs scale-102"
                  title={`${selectedShade.code} - ${selectedShade.name}`}
                >
                  <span
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/10 shadow-xs flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: selectedShade.hex }}
                  >
                    <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono font-medium text-obsidian tracking-tight">
                    {selectedShade.code}
                  </span>
                </div>
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
                  className="text-[10px] font-mono text-[#374151] hover:underline font-semibold"
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
                          : "border-ash/30 bg-white hover:bg-white/80"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-montserrat font-bold text-obsidian uppercase">
                            {kit.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-platinum/60 text-obsidian border border-ash/20">
                            {kit.tag}
                          </span>
                        </div>
                        <p className="text-[11px] font-mono text-obsidian">
                          {kit.subtitle}
                        </p>
                      </div>

                      <div className="text-right shrink-0 ml-3">
                        <span
                          className="text-xs sm:text-sm font-mono !font-normal font-[400] text-obsidian block"
                          style={{ fontWeight: 400 }}
                        >
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
            <div className="flex items-center justify-between text-xs font-mono text-obsidian pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#374151] animate-pulse" />
                <span className="text-obsidian font-semibold">
                  In Stock: Ready for immediate dispatch
                </span>
              </div>
              <span className="text-[10px] text-obsidian">Ships in 24 hrs</span>
            </div>

            {/* 4. Quantity Pill & Primary Call To Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity Pill */}
                <div className="inline-flex items-center gap-3 border border-ash/30 rounded-xl px-3 py-3 bg-white shadow-2xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-obsidian hover:text-obsidian transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-mono font-bold text-obsidian min-w-[16px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-obsidian hover:text-obsidian transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add To Bag (Light Platinum) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-ash/30 bg-white hover:bg-black/5 text-obsidian font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </button>
              </div>

              {/* Buy Now & Favorite Button Row */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 sm:py-4 px-3 sm:px-6 rounded-xl bg-obsidian hover:bg-black text-white font-mono text-[11px] sm:text-xs md:text-sm font-bold tracking-wider sm:tracking-widest uppercase flex items-center justify-center gap-1.5 sm:gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">BUY IT NOW — {store.formatPrice(selectedKit.priceInr * quantity)}</span>
                </button>

                {/* Favorite / Wishlist Button next to Buy It Now */}
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
                      shadeHex: selectedShade.hex,
                    })
                  }
                  className={`h-[52px] w-[52px] sm:h-[56px] sm:w-[56px] rounded-xl border border-ash/30 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer shrink-0 ${
                    store.isInWishlist(selectedShade.id)
                      ? "bg-rose-50 border-rose-300 text-rose-600"
                      : "bg-white hover:bg-platinum/50 text-obsidian"
                  }`}
                  aria-label={store.isInWishlist(selectedShade.id) ? "Remove from Favorites" : "Save to Favorites"}
                  title={store.isInWishlist(selectedShade.id) ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart
                    className={`w-5 h-5 stroke-[2] transition-colors ${
                      store.isInWishlist(selectedShade.id)
                        ? "fill-rose-600 text-rose-600"
                        : "text-obsidian"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 5. Four Core Trust Guarantee Badges Row (Matching Inspiration Screenshot) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 pt-4 border-t border-ash/25 text-center">
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <CheckCircle2 className="w-4 h-4 mx-auto text-[#374151]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  100% GREY COVER
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <Droplets className="w-4 h-4 mx-auto text-[#374151]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  AMMONIA FREE
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <Truck className="w-4 h-4 mx-auto text-[#374151]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  FREE DISPATCH
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-ash/25 space-y-1">
                <RotateCcw className="w-4 h-4 mx-auto text-[#374151]" />
                <span className="text-[9px] font-mono font-bold text-obsidian block uppercase">
                  30-DAY TRIAL
                </span>
              </div>
            </div>

            {/* 6. Promotional Discount Card with Copyable Code */}
            <div className="p-3.5 rounded-xl border border-dashed border-obsidian/40 bg-white flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-obsidian">
                  <Sparkles className="w-3.5 h-3.5 text-[#374151]" />
                  <span>EXTRA 10% OFF PREPAID ORDERS</span>
                </div>
                <p className="text-[10px] font-mono text-obsidian">
                  Use coupon code at final dispatch checkout
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="py-1.5 px-3 rounded-lg bg-obsidian hover:bg-black text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
              >
                {copiedCode ? <Check className="w-3 h-3 text-[#374151]" /> : <Copy className="w-3 h-3" />}
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
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-obsidian space-y-2 border-t border-ash/15">
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
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-obsidian space-y-2 border-t border-ash/15">
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
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-obsidian space-y-2 border-t border-ash/15">
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
                  <div className="px-4 pb-4 pt-1 text-xs font-mono text-obsidian space-y-2 border-t border-ash/15">
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

      {/* 4. "DESIGNED FOR YOUR TRUE SHADE" — Editorial Lookbook Section */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="text-center max-w-4xl mx-auto mb-10 overflow-hidden px-2">
          <h2 className="font-headline font-bold text-xs xs:text-sm sm:text-2xl md:text-3xl lg:text-4xl text-obsidian tracking-wide sm:tracking-wider uppercase whitespace-nowrap">
            DESIGNED FOR YOUR TRUE SHADE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOOKBOOK_STYLES.map((look) => (
            <div
              key={look.id}
              className="group relative rounded-2xl overflow-hidden bg-white border border-ash/30 shadow-sm flex flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white">
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-headline font-bold text-base sm:text-lg uppercase">
                    {look.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. "YOU MIGHT ALSO LIKE" (Related 4-Card Grid matching Reference) */}
      <section className="w-full bg-white border-y border-ash/30 py-14 sm:py-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
              YOU MIGHT ALSO LIKE
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {RECENTLY_VIEWED.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col"
              >
                {/* Portrait Image Container matching Home Product Cards */}
                <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-transparent transition-all duration-300">
                  <Link
                    href={`/product?shade=${prod.id.replace("shade-", "shade-")}`}
                    className="block w-full h-full relative"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out sm:group-hover:scale-105"
                    />
                  </Link>

                  {/* Top-Right Circular Wishlist Button */}
                  <button
                    type="button"
                    onClick={() =>
                      store.toggleWishlist({
                        id: prod.id,
                        name: prod.name,
                        category: prod.category,
                        price: prod.priceInr,
                        image: prod.image,
                        shadeCode: prod.shadeCode,
                        shadeHex: prod.shadeHex,
                      })
                    }
                    className={`absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center transition-transform active:scale-95 ${
                      store.isInWishlist(prod.id)
                        ? "text-rose-600"
                        : "text-obsidian hover:text-black"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 stroke-[1.5] ${
                        store.isInWishlist(prod.id) ? "fill-rose-600 text-rose-600" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Row: Product Title & Price on Left, Cart Icon Button on Right */}
                <div className="mt-2.5 sm:mt-3.5 flex items-center justify-between gap-2">
                  <Link
                    href={`/product?shade=${prod.id.replace("shade-", "shade-")}`}
                    className="space-y-0.5 sm:space-y-1 text-left block group/link min-w-0 flex-1"
                  >
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] tracking-wider uppercase text-obsidian group-hover/link:text-black group-hover/link:underline transition-colors truncate">
                      {prod.name}
                    </p>
                    <p className="font-montserrat font-semibold text-xs sm:text-[13px] text-obsidian">
                      $89 AUD
                    </p>
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      store.addToCart({
                        id: `${prod.id}-starter-system`,
                        name: `Colourpig Starter System | ${prod.name}`,
                        variant: prod.category,
                        price: prod.priceInr,
                        image: prod.image,
                        shadeCode: prod.shadeCode,
                        shadeHex: prod.shadeHex,
                      });
                    }}
                    className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EAECEB] hover:bg-obsidian text-obsidian hover:text-white transition-colors flex items-center justify-center shadow-2xs active:scale-95 cursor-pointer"
                    aria-label={`Add ${prod.name} to cart`}
                    title="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "WHAT OUR CUSTOMERS SAY" Testimonial Section with Breakdown */}
      <section
        id="reviews"
        className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 py-14 sm:py-20 scroll-mt-24 sm:scroll-mt-32"
      >
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-headline font-bold text-2xl lg:text-[36px] text-obsidian tracking-wider uppercase leading-tight">
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        {/* Rating Breakdown Bar & Overall Score Box */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-ash/30 shadow-2xs mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-ash/20 pb-4">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-3xl font-headline font-bold text-obsidian">4.9</span>
                <div className="flex text-[#374151]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#374151] stroke-[#374151]" />
                  ))}
                </div>
              </div>
              <p className="text-xs font-mono text-obsidian mt-1">
                Based on 310 verified root touch-up reviews
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white border border-ash/30 text-center">
              <span className="text-xs font-mono font-bold text-obsidian block">
                98% RECOMMEND RATE
              </span>
              <span className="text-[10px] font-mono text-obsidian">
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
                <span className="w-14 text-obsidian text-[11px] shrink-0">{bar.stars}</span>
                <div className="flex-1 h-2 rounded-full bg-white overflow-hidden">
                  <div
                    className="h-full bg-obsidian rounded-full"
                    style={{ width: `${bar.pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-obsidian text-[10px] shrink-0">
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
                  <div className="flex text-[#374151]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#374151] stroke-[#374151]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-obsidian">{t.date}</span>
                </div>
                <h4 className="font-headline font-bold text-sm text-obsidian">
                  &ldquo;{t.title}&rdquo;
                </h4>
                <p className="text-xs font-mono text-obsidian leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="pt-3 border-t border-ash/20 flex items-center justify-between">
                <div>
                  <h5 className="font-headline font-bold text-xs text-obsidian">{t.name}</h5>
                  <span className="text-[10px] font-mono text-ash">{t.location}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#374151]/20 text-[#4e8721] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
