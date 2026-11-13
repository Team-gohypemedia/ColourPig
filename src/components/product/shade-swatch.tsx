import React from "react";
import Image from "@/components/ui/image";
import { ShadeProduct, swatchThumbnail } from "@/data/shades";

interface ShadeSwatchProps {
  shade: Pick<ShadeProduct, "id" | "name" | "hex" | "swatchImage" | "swatchThumb">;
  /** Size, border and layout classes; the swatch is always round */
  className?: string;
  /** Rendered pixel width, used to pick the image size */
  size?: number;
  /** Overlay, such as a selected tick */
  children?: React.ReactNode;
}

/**
 * Round thumbnail of the real hair swatch, so shoppers see the true colour
 * rather than one flat hex value. The hex shows only while the image loads.
 */
export function ShadeSwatch({ shade, className = "", size = 48, children }: ShadeSwatchProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${className}`}
      style={{ backgroundColor: shade.hex }}
    >
      <Image
        src={swatchThumbnail(shade)}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover scale-[1.06]"
      />
      {children && <span className="relative z-10 flex items-center justify-center">{children}</span>}
    </span>
  );
}
