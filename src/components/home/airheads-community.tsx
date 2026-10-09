"use client";

import React from "react";
import Image from "next/image";
import { Marquee } from "@/demos/ui/marquee";

interface CommunityMember {
  image: string;
  name: string;
  role: string;
  shade?: string;
}

const COMMUNITY_MEMBERS_ROW_1: CommunityMember[] = [
  {
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    name: "Emma Studio",
    role: "#1903 Blonde • Sydney",
    shade: "#1903 Blonde",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    name: "Sophia Rossi",
    role: "#2401 Brunette • Melbourne",
    shade: "#2401 Brunette",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    name: "Marcus Thorne",
    role: "#0802 Noir • London",
    shade: "#0802 Noir",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    name: "Claire Paris",
    role: "#3204 Auburn • Paris",
    shade: "#3204 Auburn",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    name: "Alena Rosser",
    role: "#1105 Silver • New York",
    shade: "#1105 Silver",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    name: "Norman Brown",
    role: "Founder & Master Colorist",
    shade: "Master Atelier",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    name: "Alexa Vance",
    role: "#1903 Honey • Los Angeles",
    shade: "#1903 Honey",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    name: "David Kim",
    role: "#2401 Espresso • Tokyo",
    shade: "#2401 Espresso",
  },
];

const COMMUNITY_MEMBERS_ROW_2: CommunityMember[] = [
  {
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    name: "Lucas Meyer",
    role: "#0802 Noir • Berlin",
    shade: "#0802 Noir",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    name: "Elena Rostova",
    role: "#1903 Honey • Milan",
    shade: "#1903 Honey",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    name: "Julian Vance",
    role: "#2401 Espresso • London",
    shade: "#2401 Espresso",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    name: "Maya Lin",
    role: "#3204 Auburn • San Francisco",
    shade: "#3204 Auburn",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    name: "Liam O'Connor",
    role: "#1105 Silver • Dublin",
    shade: "#1105 Silver",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    name: "Chloé Laurent",
    role: "#1903 Blonde • Paris",
    shade: "#1903 Blonde",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80",
    name: "Kofi Mensah",
    role: "#0802 Noir • Toronto",
    shade: "#0802 Noir",
  },
  {
    image:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=600&q=80",
    name: "Aaron Miller",
    role: "#2401 Espresso • Chicago",
    shade: "#2401 Espresso",
  },
];

function CommunityCard({ member }: { member: CommunityMember }) {
  return (
    <div
      className="group flex w-44 xs:w-48 sm:w-60 md:w-64 shrink-0 flex-col transition-transform duration-300 active:scale-95 sm:active:scale-100"
      key={member.name}
    >
      <div className="relative h-[270px] sm:h-[330px] md:h-[360px] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100 shadow-sm border border-ash/20 transition-all duration-300 hover:shadow-xl hover:border-obsidian/40">
        <Image
          alt={member.name}
          className="h-full w-full object-cover transition-all duration-500 sm:grayscale sm:group-hover:grayscale-0 group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 192px, 256px"
          src={member.image}
        />

        {/* Gentle Vignette Scrim for Contrast & Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent sm:from-black/70 sm:via-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Card Badge Info with Light Text Color for High Contrast & Legibility */}
        <div className="absolute bottom-2 inset-x-2 sm:bottom-2.5 sm:inset-x-2.5 rounded-lg sm:rounded-xl bg-black/75 backdrop-blur-md p-2 sm:p-2.5 border border-white/15 shadow-lg transition-all group-hover:bg-black/85">
          <div className="flex justify-between items-center mb-0.5 gap-1.5">
            <h3 className="font-headline font-bold text-white text-xs sm:text-sm truncate drop-shadow-xs">
              {member.name}
            </h3>
            {member.shade && (
              <span className="text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-white/20 border border-white/25 text-white font-medium shrink-0">
                {member.shade}
              </span>
            )}
          </div>
          <p className="text-white/80 text-[10px] sm:text-xs truncate font-mono">
            {member.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AirheadsCommunity() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-10 sm:py-16 md:py-24">
      {/* Background corner artistic curve */}
      <div className="pointer-events-none opacity-40 sm:opacity-100">
        <svg
          className="absolute right-0 bottom-0 text-neutral-100 pointer-events-none w-64 sm:w-[460px] h-auto"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="mx-auto mb-8 sm:mb-14 flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-0">
          <div className="mb-3.5 sm:mb-5 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-obsidian text-white shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user-star sm:w-6 sm:h-6"
            >
              <path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z" />
              <path d="M8 15H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
            </svg>
          </div>

          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] sm:tracking-[0.25em] uppercase text-graphite font-semibold mb-2">
            REAL RESULTS • #AIRHEADS
          </span>

          <h2 className="relative mb-3 sm:mb-4 font-headline font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-obsidian tracking-tight">
            Creative Community Archive
            <svg
              className="absolute -top-2 -right-4 sm:-right-8 -z-10 w-16 sm:w-24 text-neutral-200 pointer-events-none"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h2>

          <p className="max-w-xl text-graphite text-xs sm:text-sm md:text-base leading-relaxed">
            ColourPig connects modern clients and top colorists with the most advanced
            salon pigments and air-driven precision hardware.
          </p>
        </div>

        {/* Dual Marquee Carousels (forward and reverse, without corner shadow masks) */}
        <div className="relative w-full flex flex-col gap-3.5 sm:gap-5 md:gap-6">
          <Marquee className="[--gap:0.875rem] sm:[--gap:1.5rem] [--duration:28s] sm:[--duration:35s]" pauseOnHover>
            {COMMUNITY_MEMBERS_ROW_1.map((member) => (
              <CommunityCard key={member.name} member={member} />
            ))}
          </Marquee>

          <Marquee className="[--gap:0.875rem] sm:[--gap:1.5rem] [--duration:32s] sm:[--duration:40s]" pauseOnHover reverse>
            {COMMUNITY_MEMBERS_ROW_2.map((member) => (
              <CommunityCard key={member.name} member={member} />
            ))}
          </Marquee>
        </div>

        {/* Testimonial Quote Block */}
        <div className="mx-auto mt-10 sm:mt-16 md:mt-20 max-w-3xl px-5 text-center sm:px-6 lg:px-0">
          {/* Subtle 5-star rating */}
          <div className="mb-4 flex items-center justify-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className="h-4 w-4 fill-amber-400"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="mb-6 sm:mb-8 font-medium text-base sm:text-lg md:text-xl text-obsidian leading-relaxed">
            &ldquo;The air-driven dual canister completely transformed my touch-up routine.
            Zero mixing, zero scalp staining, and salon-grade permanent coverage in under 30 minutes.&rdquo;
          </p>
          <div className="flex flex-col items-center gap-2.5 sm:gap-3">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden rounded-full ring-2 ring-obsidian/10 shadow-sm">
              <Image
                alt="Natalia Kara"
                className="h-full w-full object-cover"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-obsidian text-sm sm:text-base">
                Natalia Kara
              </p>
              <p className="text-graphite text-xs sm:text-sm">
                Senior Colorist • Sydney Salon Collective
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AirheadsCommunity;
