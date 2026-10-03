"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const DynamicScene = dynamic(() => import("./scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] lg:h-[640px] rounded-3xl glassmorphism flex flex-col items-center justify-center gap-4 text-purple-400">
      <Loader2 className="w-10 h-10 animate-spin text-purple-400" />
      <p className="text-sm font-medium tracking-wide text-slate-400">
        Loading 3D Canvas Experience...
      </p>
    </div>
  ),
});

export function SceneWrapper() {
  return <DynamicScene />;
}
