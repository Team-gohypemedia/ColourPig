"use client";

import dynamic from "next/dynamic";

const DynamicHeroDispenser = dynamic(
  () => import("./hero-dispenser").then((mod) => mod.HeroDispenserCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-ash">
        <div className="w-10 h-10 rounded-full border-2 border-ash border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-ash">
          Rendering Dispenser...
        </span>
      </div>
    ),
  }
);

export function HeroDispenserWrapper({ shadeHex }: { shadeHex: string }) {
  return <DynamicHeroDispenser shadeHex={shadeHex} />;
}
