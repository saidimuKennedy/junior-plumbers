import Image from "next/image";

const LAYERS = [
  "absolute -right-1 top-4 z-[1] h-[96px] w-[96px] rotate-[10deg] bg-surface shadow-[4px_4px_0_0_rgba(10,10,10,0.08)]",
  "absolute right-[38px] top-[92px] z-[2] h-[82px] w-[82px] -rotate-[11deg] bg-surface shadow-[3px_5px_0_0_rgba(10,10,10,0.07)]",
  "absolute right-1 bottom-12 z-[3] h-[72px] w-[72px] rotate-[6deg] bg-surface shadow-[2px_3px_0_0_rgba(10,10,10,0.06)]",
] as const;

export type TierCollageVariant = "surface" | "paper" | "yellow" | "black";

function fadeForVariant(v: TierCollageVariant) {
  switch (v) {
    case "surface":
      return "bg-gradient-to-b from-transparent via-white/70 to-white";
    case "paper":
      return "bg-gradient-to-b from-transparent via-[#F2EFE8]/78 to-[#F2EFE8]";
    case "yellow":
      return "bg-gradient-to-b from-transparent via-[#FFD200]/85 to-[#FFD200]";
    case "black":
      return "bg-gradient-to-b from-transparent via-brand-black/50 to-brand-black";
  }
}

export function tierBgToVariant(bg: string): TierCollageVariant {
  if (bg.includes("paper-2")) return "paper";
  if (bg.includes("brand-yellow")) return "yellow";
  if (bg.includes("brand-black")) return "black";
  return "surface";
}

export function TierCollage({
  images,
  dark,
  variant,
}: {
  images: readonly string[];
  dark: boolean;
  variant: TierCollageVariant;
}) {
  const borderTone = dark
    ? "border-2 border-white/35 shadow-[4px_4px_0_0_rgba(255,210,0,0.12)]"
    : "border-2 border-brand-black/40";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className={`absolute inset-0 z-[5] ${fadeForVariant(variant)}`} />
      {images.slice(0, 3).map((src, i) => (
        <div key={`${src}-${i}`} className={`${LAYERS[i]} ${borderTone} overflow-hidden`}>
          <Image src={src} alt="" fill className="object-cover" sizes="100px" />
        </div>
      ))}
    </div>
  );
}
