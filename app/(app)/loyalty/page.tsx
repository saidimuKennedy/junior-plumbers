import Image from "next/image";
import { TierCollage, tierBgToVariant } from "@/components/loyalty/TierCollage";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { marketingImagery } from "@/lib/marketing-imagery";
import { loyaltyKpis, promos, referrals, loyaltyTiers } from "@/lib/data";

type StatusType = "success" | "warn" | "outline";

export default function LoyaltyPage() {
  return (
    <>
      <section className="relative -mx-8 -mt-8 mb-10 flex min-h-[440px] w-[calc(100%+4rem)] items-end overflow-hidden">
        <Image
          src={marketingImagery.loyaltyHero}
          alt="Workshop tools and materials — loyalty programme hero"
          fill
          className="object-cover object-[center_40%]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/75 to-brand-black/35" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-black/92 via-brand-black/45 to-brand-yellow/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(255,210,0,0.18),transparent_55%)]"
          aria-hidden
        />
        <div className="absolute right-6 top-6 z-20 flex flex-wrap justify-end gap-2 md:right-8">
          <button type="button" className="btn btn-outline btn-sm border-paper bg-black/30 text-paper backdrop-blur-sm hover:bg-paper/10">
            Export
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            Rules
          </button>
        </div>
        <div className="relative z-10 w-full p-6 pb-10 pt-24 text-paper md:p-8 md:pb-12 md:pt-28">
          <BracketLabel className="!border-brand-yellow !bg-black/45 !text-brand-yellow backdrop-blur-sm">
            Growth · promos &amp; loyalty
          </BracketLabel>
          <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-[1.06] tracking-tight">
            Parts &amp; Labour Club
          </h1>
          <p className="mt-3 max-w-[52ch] font-serif text-[1.05rem] leading-relaxed text-border md:text-[1.125rem]">
            Points on every channel — POS, delivery, and trade desk. Tiers unlock delivery, pricing, and the Foreman net-30
            line.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {loyaltyKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
        <div className="card">
          <div className="card-head">
            <BracketLabel>Promotions · active &amp; scheduled</BracketLabel>
            <span className="t-meta">8 total</span>
          </div>
          <div className="px-5 pb-4">
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_100px] gap-3 pb-2 border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              <span>Promotion</span>
              <span>Discount</span>
              <span>Window</span>
              <span>Redemptions</span>
              <span className="text-right">Status</span>
            </div>
            {promos.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-[1.6fr_1fr_1fr_1fr_100px] gap-3 py-4 border-b border-rule-soft last:border-none items-center"
              >
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="font-mono text-[11px] text-ink-3 mt-0.5">{p.sub}</div>
                </div>
                <div className="font-serif font-semibold text-[18px]">{p.discount}</div>
                <div>
                  <div className="text-[13px]">{p.window}</div>
                  <div className="font-mono text-[11px] text-ink-3">{p.windowSub}</div>
                </div>
                <div>
                  <div className="font-serif font-semibold text-[18px]">{p.redemptions}</div>
                  <div className="font-mono text-[11px] text-ink-3">{p.rdSub}</div>
                </div>
                <div className="flex justify-end">
                  <Badge variant={p.statusType as StatusType} dot={p.statusType !== "outline"}>
                    {p.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <BracketLabel>Referrals · recent</BracketLabel>
            <span className="t-meta">7d</span>
          </div>
          <div className="px-5 pb-4">
            {referrals.map((r) => (
              <div key={r.from} className="flex gap-3 items-center py-3 border-b border-rule-soft last:border-none">
                <div className="avatar">{r.initials}</div>
                <div className="flex-1">
                  <div className="font-semibold text-[14px]">
                    {r.from} <span className="text-ink-3">→</span> {r.to}
                  </div>
                  <div className="font-mono text-[11px] text-ink-3">{r.meta}</div>
                </div>
                <div className="font-serif font-semibold text-[18px]">{r.pts}</div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3.5 mt-2 border-t-2 border-rule">
              <div>
                <BracketLabel>7-day total</BracketLabel>
                <div className="font-serif font-semibold text-[24px] mt-1">+3,840 PTS · 12 signups</div>
              </div>
              <button type="button" className="btn btn-outline btn-sm">
                See all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <BracketLabel>Reward tiers · Parts &amp; Labour Club</BracketLabel>
        </div>
        <div className="mx-5 mb-5 grid grid-cols-4 border border-border">
          {loyaltyTiers.map((tier, i) => (
            <div
              key={tier.tier}
              className={`relative min-h-[240px] overflow-hidden p-[18px] ${i < loyaltyTiers.length - 1 ? "border-r border-border" : ""} ${tier.bg}`}
            >
              <TierCollage
                images={tier.collage}
                dark={tier.dark}
                variant={tierBgToVariant(tier.bg)}
              />
              <div className="relative z-10">
                <BracketLabel className={tier.dark ? "!text-brand-yellow" : ""}>{`TIER 0${tier.tier}`}</BracketLabel>
                <div className={`mt-1.5 font-serif text-[24px] font-semibold ${tier.dark ? "text-paper" : ""}`}>{tier.name}</div>
                <div className={`mt-1 font-mono text-[11px] ${tier.dark ? "text-border" : "text-ink-3"}`}>{tier.pts}</div>
                <div className={`mt-3.5 text-[13px] leading-relaxed ${tier.dark ? "text-border" : "text-ink-2"}`}>{tier.perks}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
