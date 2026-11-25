import { BRAND } from "@/constants/site";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <img
      src={BRAND.logo.src}
      width={BRAND.logo.width}
      height={BRAND.logo.height}
      alt={BRAND.logo.alt}
      decoding="async"
      className={cn("block h-auto w-[clamp(128px,24vw,172px)] object-contain", className)}
    />
  );
}
