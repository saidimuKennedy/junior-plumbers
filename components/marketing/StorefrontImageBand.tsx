import Image from "next/image";

export function StorefrontImageBand({
  src,
  alt,
  children,
  className = "",
  minHeight = "min-h-[420px]",
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  minHeight?: string;
}) {
  return (
    <section className={`relative flex items-center overflow-hidden ${minHeight} ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover object-[center_30%]" sizes="100vw" quality={85} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/92 via-brand-black/75 to-brand-black/45" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(255,210,0,0.15),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 w-full px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </section>
  );
}
