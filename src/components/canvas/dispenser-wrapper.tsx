"use client";

import dynamic from "next/dynamic";

const DynamicDispenser = dynamic(
  () => import("./dispenser-3d").then((mod) => mod.Dispenser3DCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[480px] lg:h-[600px] flex flex-col items-center justify-center gap-3 text-ash">
        <div className="w-12 h-12 rounded-full border-2 border-ash border-t-transparent animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-ash">
          Rendering 3D System...
        </span>
      </div>
    ),
  }
);

export function DispenserWrapper({
  shadeColor,
  shadeCode,
}: {
  shadeColor: string;
  shadeCode: string;
}) {
  return <DynamicDispenser shadeColor={shadeColor} shadeCode={shadeCode} />;
}
