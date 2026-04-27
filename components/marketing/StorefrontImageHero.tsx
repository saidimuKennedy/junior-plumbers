import Image from "next/image";

export function StorefrontImageHero({
  src,
  alt,
  children,
  className = "",
  priority = true,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
}) {
  return (
    <section
      className={`relative flex min-h-[78vh] items-end overflow-hidden md:min-h-[85vh] md:items-center ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center"
        sizes="100vw"
        quality={88}
      />
      {/* Warm cinematic stack: depth + brand yellow lift */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/25" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/55 to-transparent md:from-brand-black/90 md:via-brand-black/35"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_70%_40%,rgba(255,210,0,0.12),transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 w-full px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </section>
  );
}
