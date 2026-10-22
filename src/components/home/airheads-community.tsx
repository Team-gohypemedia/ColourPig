"use client";

import React from "react";
import InteractiveBentoGallery, {
  MediaItemType,
} from "@/components/blocks/interactive-bento-gallery";

const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "video",
    title: "Air-Driven In-Action Application",
    desc: "Proprietary dual-chamber automated delivery.",
    url: "/gallary/WhatsApp Video 2026-10-13 at 7.38.29 PM.mp4",
    span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Root Regrowth Coverage",
    desc: "Seamless tone gradient on resistant silver roots.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.28 PM.jpeg",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    type: "image",
    title: "Velvet Depth & Micro-Shine",
    desc: "100% cuticle preservation with natural dimensional undertones.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.28 PM (1).jpeg",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    type: "image",
    title: "Precision Hairline Edge",
    desc: "Clean demarcation with zero scalp staining.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.28 PM (2).jpeg",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Honey Blonde Depth",
    desc: "Calibrated micro-pigments eliminating brassiness.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.28 PM (3).jpeg",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    id: 6,
    type: "image",
    title: "Golden Highlights Transition",
    desc: "Sunlit clarity and seamless salon blending.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.28 PM (4).jpeg",
    span: "col-span-1 row-span-1 md:col-span-1 md:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    id: 7,
    type: "image",
    title: "Champagne Platinum Clarity",
    desc: "Luminous clarity with zero damage and maximum shine.",
    url: "/gallary/WhatsApp Image 2026-10-13 at 7.38.29 PM.jpeg",
    span: "col-span-1 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2",
  },
];

export function AirheadsCommunity() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-14 sm:py-20 border-t border-white/10 select-none">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Gallery Shots Collection"
        description="Drag and explore our curated collection of shots"
      />
    </section>
  );
}

export default AirheadsCommunity;
