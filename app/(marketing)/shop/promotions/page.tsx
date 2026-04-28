import Image from "next/image";
import Link from "next/link";
import { StorefrontShell } from "@/components/marketing/StorefrontShell";
import { StorefrontImageHero } from "@/components/marketing/StorefrontImageHero";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { shopPromoCarousel, featuredProducts } from "@/lib/data";
import { ArrowRight, Tag, Zap } from "lucide-react";

function fmt(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

export default function PromotionsPage() {
  return (
    <StorefrontShell>
      {/* Hero Section */}
      <StorefrontImageHero
        src="/images/promotions-hero.png"
        alt="Premium hardware store promotions and tools showcase"
        priority
      >
        <div className="max-w-[700px] text-paper">
          <BracketLabel className="!border-brand-yellow !text-brand-yellow">
            Current Deals · Updated Weekly
          </BracketLabel>
          <h1 className="mt-5 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight">
            High-velocity <em className="font-medium not-italic text-brand-yellow">promotions</em> for high-velocity trade.
          </h1>
          <p className="mt-6 max-w-[560px] font-serif text-[1.15rem] leading-relaxed text-border md:text-[1.25rem]">
            Whether you&apos;re restocking a site or picking up a single cordless drill, Junior Plumbers delivers market-beating margins on Ingco tools and essential materials.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#active-promos" className="btn btn-primary btn-lg no-underline text-brand-black">
              View this week&apos;s deals
            </a>
          </div>
        </div>
      </StorefrontImageHero>

      {/* Main Promo Grid */}
      <section id="active-promos" className="scroll-mt-24 px-6 py-16 md:px-8 md:py-24 bg-paper-2">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b-2 border-rule pb-6">
            <div>
              <BracketLabel>Featured Offers</BracketLabel>
              <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold">Active Campaigns</h2>
            </div>
            <p className="m-0 max-w-[42ch] font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
              Redeemable online &amp; in-store
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shopPromoCarousel.map((promo, idx) => (
              <div 
                key={idx}
                className="group relative flex flex-col overflow-hidden border-2 border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand-black hover:shadow-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-border">
                  {promo.badge && (
                    <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 bg-brand-yellow px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] font-semibold text-brand-black shadow-1">
                      <Tag size={12} strokeWidth={2} />
                      {promo.badge}
                    </div>
                  )}
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="font-serif text-[1.75rem] font-semibold leading-tight text-ink group-hover:text-brand-black transition-colors">
                      {promo.title}
                    </h3>
                    <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-3">
                      {promo.sub}
                    </p>
                  </div>
                  <button className="mt-6 flex w-full items-center justify-center gap-2 border-2 border-brand-black bg-transparent py-3 font-mono text-[11px] uppercase tracking-[0.1em] font-medium text-ink transition-colors hover:bg-brand-yellow">
                    Shop collection <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Table/List View */}
      <section className="px-6 py-16 md:px-8 md:py-24 bg-paper">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b-2 border-rule pb-6">
            <h2 className="m-0 font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold">Special Pricing</h2>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase text-info">
              <Zap size={14} />
              Fast-moving items
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <div 
                key={p.sku}
                className="group relative border border-border bg-surface p-4 transition-colors hover:border-brand-black"
              >
                <div className="relative aspect-square mb-4 border border-border bg-paper-2 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                  />
                  {p.badge && (
                     <span className={`badge ${p.badgeType} absolute right-2 top-2 z-10 shadow-sm`}>{p.badge}</span>
                  )}
                </div>
                <div className="font-sans text-[14px] font-semibold leading-snug">{p.name}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.06em] text-ink-3">{p.sku}</div>
                <div className="mt-3 flex items-baseline gap-2 font-serif text-[1.25rem] font-semibold">
                  {fmt(p.price)}
                  {p.originalPrice && (
                    <s className="text-[14px] font-normal text-ink-3">{fmt(p.originalPrice)}</s>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loyalty CTA */}
      <section className="border-t-2 border-brand-black bg-brand-black px-6 py-20 text-paper">
        <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 gap-12 items-center">
          <div>
            <BracketLabel className="!text-brand-yellow">Trade Pricing</BracketLabel>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight">
              Unlock the Master Tier.
            </h2>
            <p className="mt-4 font-serif text-[1.125rem] leading-relaxed text-border">
              Join the Junior Plumbers Loyalty Club and gain access to unadvertised bulk discounts, instant cash-back points, and net-30 terms for registered contractors.
            </p>
            <div className="mt-8">
              <Link href="/loyalty" className="btn btn-primary btn-lg inline-flex !px-8">
                Learn more
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 border-l-2 border-brand-yellow pl-8 md:pl-12">
             <div className="border-b-2 border-rule-soft pb-6">
                <div className="font-serif text-[2.5rem] font-semibold leading-none text-brand-yellow">1.5x</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-border">Points Multiplier</div>
             </div>
             <div className="border-b-2 border-rule-soft pb-6">
                <div className="font-serif text-[2.5rem] font-semibold leading-none text-brand-yellow">Free</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-border">Zone 1 Delivery</div>
             </div>
             <div className="pt-2">
                <div className="font-serif text-[2.5rem] font-semibold leading-none text-brand-yellow">VIP</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-border">Early Access</div>
             </div>
          </div>
        </div>
      </section>
    </StorefrontShell>
  );
}
