"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopPromoCarouselItem } from "@/lib/data";

export function ShopPromoCarousel({ items }: { items: readonly ShopPromoCarouselItem[] }) {
  const loop = [...items, ...items];

  return (
    <section className="jp-shop-promo-strip border-y-2 border-rule bg-brand-black py-6 md:py-9" aria-label="Promotional offers">
      <div className="mb-5 flex flex-col items-center gap-1 px-6 text-center md:px-8">
        <p className="jp-shop-promo-eyebrow m-0 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-yellow">
          This week on promotion
        </p>
        <p className="m-0 max-w-[48ch] font-serif text-[15px] text-border">
          Tap a card to jump to the featured deals below — offers scroll automatically (hover to pause).
        </p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="jp-shop-promo-track flex gap-4 md:gap-5">
          {loop.map((item, i) => (
            <Link
              key={`${item.title}-${i}`}
              href="/shop#promos"
              className="group relative h-[200px] w-[min(82vw,300px)] shrink-0 overflow-hidden border-2 border-brand-yellow/35 bg-brand-black shadow-2 no-underline transition-[border-color,transform] duration-200 hover:z-10 hover:border-brand-yellow md:h-[220px] md:w-[320px]"
            >
              <Image
                src={item.image}
                alt={`${item.title} — ${item.sub}`}
                fill
                className="object-cover transition-[transform,opacity] duration-300 group-hover:scale-105 group-hover:opacity-100 opacity-85"
                sizes="320px"
                quality={85}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/35 to-transparent"
                aria-hidden
              />
              {item.badge && (
                <span className="absolute left-3 top-3 border-2 border-brand-black bg-brand-yellow px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-brand-black">
                  {item.badge}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 z-[1] p-3 md:p-4">
                <h3 className="m-0 font-serif text-[1.15rem] font-semibold leading-tight text-paper md:text-[1.25rem]">
                  {item.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-brand-yellow/95">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
