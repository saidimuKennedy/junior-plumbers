import Image from "next/image";
import {
  Drill,
  Wrench,
  Pipette,
  Zap,
  HardHat,
  Paintbrush,
} from "lucide-react";
import { StorefrontShell } from "@/components/marketing/StorefrontShell";
import { StorefrontImageHero } from "@/components/marketing/StorefrontImageHero";
import { StorefrontImageBand } from "@/components/marketing/StorefrontImageBand";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { marketingImagery } from "@/lib/marketing-imagery";
import { shopCategories, featuredProducts, loyaltyStats } from "@/lib/data";

const catIcons: Record<string, React.ElementType> = {
  drill: Drill,
  wrench: Wrench,
  pipette: Pipette,
  zap: Zap,
  "hard-hat": HardHat,
  paintbrush: Paintbrush,
};

function fmt(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

export default function StorefrontPage() {
  return (
    <StorefrontShell>
      <StorefrontImageHero
        src={marketingImagery.shopHero}
        alt="Hardware store aisle with tools and supplies"
      >
        <div className="max-w-[640px] text-paper">
          <BracketLabel className="!border-brand-yellow !text-brand-yellow">Hardware · since 2019</BracketLabel>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.02] tracking-tight">
            Tools that{" "}
            <em className="font-medium not-italic text-brand-yellow">work as hard</em> as the people who use them.
          </h1>
          <p className="mt-5 max-w-[520px] font-serif text-[1.125rem] leading-relaxed text-border md:text-[1.2rem]">
            Authorized Ingco dealer for Kajiado County. Six outlets, same-day delivery across greater Nairobi, and a
            workbench&apos;s worth of know-how at every counter.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#promos" className="btn btn-primary btn-lg no-underline">
              Shop the catalogue
            </a>
            <a
              href="/shop/about"
              className="btn btn-outline btn-lg border-paper bg-transparent text-paper no-underline hover:bg-paper/10"
            >
              Our story
            </a>
          </div>
        </div>
      </StorefrontImageHero>

      <section id="categories" className="scroll-mt-24 px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-rule pb-4">
            <h2 className="m-0 font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-semibold">Shop by category</h2>
            <p className="m-0 max-w-[42ch] font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
              Same catalogue in-store &amp; online
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {shopCategories.map((cat) => {
              const Icon = catIcons[cat.icon] ?? Drill;
              return (
                <button
                  key={cat.name}
                  type="button"
                  className="group border border-border bg-surface p-5 text-center transition-all hover:border-brand-black hover:shadow-1"
                >
                  <Icon size={28} strokeWidth={1.5} className="mx-auto transition-transform group-hover:scale-105" />
                  <div className="mt-2.5 font-sans text-[13px] font-semibold uppercase tracking-[0.06em]">{cat.name}</div>
                  <div className="mt-1 font-mono text-[10px] text-ink-3">{cat.count} items</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="promos" className="scroll-mt-24 bg-gradient-to-b from-paper-2 to-paper px-6 py-14 md:px-8 md:py-16">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-rule pb-4">
            <h2 className="m-0 font-serif text-[clamp(1.6rem,3.5vw,2rem)] font-semibold">Tools Tuesday · this week</h2>
            <span className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 hover:text-ink">
              View all promos →
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <div
                key={p.sku}
                className="group overflow-hidden border border-border bg-surface shadow-1 transition-shadow hover:shadow-2"
              >
                <div className="relative aspect-square overflow-hidden border-b border-border bg-paper-2">
                  {p.badge && (
                    <span className={`badge ${p.badgeType} absolute left-2.5 top-2.5 z-10`}>{p.badge}</span>
                  )}
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 280px"
                  />
                </div>
                <div className="p-4">
                  <div className="min-h-9 font-sans text-[14px] font-semibold leading-snug">{p.name}</div>
                  <div className="mt-1 font-mono text-[10px] tracking-[0.06em] text-ink-3">{p.sku}</div>
                  <div className="mt-2.5 font-serif text-[22px] font-semibold">
                    {p.originalPrice && (
                      <s className="mr-1.5 text-[14px] font-normal text-ink-3">{fmt(p.originalPrice)}</s>
                    )}
                    {fmt(p.price)}
                  </div>
                  <button type="button" className="btn btn-secondary mt-3 h-auto w-full py-2.5">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorefrontImageBand src={marketingImagery.shopLoyaltyBand} alt="Workbench with hand tools and measuring tape">
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="text-paper">
            <BracketLabel className="!border-brand-yellow !text-brand-yellow">Loyalty · Parts &amp; Labour Club</BracketLabel>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.06]">
              Earn back on every shilling spent.
            </h2>
            <p className="mt-4 max-w-[480px] font-serif text-[1.05rem] leading-relaxed text-border md:text-[1.125rem]">
              Join our loyalty programme — earn points on every purchase, redeem at any outlet, and unlock trade events
              and bulk pricing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary btn-lg">
                Join free
              </button>
              <a
                href="/loyalty"
                className="btn btn-outline btn-lg border-paper text-paper no-underline hover:bg-paper/10"
              >
                How it works (ops)
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:gap-6">
            {loyaltyStats.map((s) => (
              <div key={s.l} className="border-t-2 border-brand-yellow pt-5">
                <div className="font-serif text-[clamp(2rem,5vw,3rem)] font-semibold leading-none text-paper">{s.n}</div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-yellow">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </StorefrontImageBand>
    </StorefrontShell>
  );
}
