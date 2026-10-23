"use client";

import React from "react";
import InteractiveBentoGallery, {
  MediaItemType,
} from "@/components/blocks/interactive-bento-gallery";

// Same pattern as the original bento demo: P L P L P L P.
// Portraits (images + vertical bottle videos) fill the two side columns, landscapes stack in the centre.
const mediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    orientation: "portrait",
    title: "Stacked & Ready",
    desc: "Pallets of Grey Touch Up systems waiting to ship.",
    url: "/gallary/web/warehouse-portrait-1.jpg",
  },
  {
    id: 2,
    type: "image",
    orientation: "landscape",
    title: "Launch Day at the Warehouse",
    desc: "The first full run of Colourpig systems, stacked and ready.",
    url: "/gallary/web/warehouse-wide-1.jpg",
  },
  {
    id: 3,
    type: "video",
    orientation: "portrait",
    title: "Inside the Warehouse",
    desc: "Behind the scenes with the first Colourpig shipment.",
    url: "/gallary/web/warehouse-walkthrough.mp4",
    poster: "/gallary/web/warehouse-walkthrough-poster.jpg",
  },
  {
    id: 4,
    type: "image",
    orientation: "landscape",
    title: "Pallets Ready to Ship",
    desc: "Grey Touch Up Air Driven Systems on the warehouse floor.",
    url: "/gallary/web/warehouse-wide-2.jpg",
  },
  {
    id: 5,
    type: "image",
    orientation: "portrait",
    title: "Fresh Off the Line",
    desc: "Every shade, boxed and wrapped for dispatch.",
    url: "/gallary/web/warehouse-portrait-2.jpg",
  },
  {
    id: 6,
    type: "image",
    orientation: "landscape",
    title: "The First Run",
    desc: "Thousands of systems heading out to Airheads everywhere.",
    url: "/gallary/web/warehouse-wide-3.jpg",
  },
  {
    id: 7,
    type: "video",
    orientation: "portrait",
    title: "No.4 Medium Brown System",
    desc: "The air-driven canister, up close.",
    url: "/Medium Brown/Medium Brown.mp4",
    poster: "/Medium Brown/MediumBrown.jpg",
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
