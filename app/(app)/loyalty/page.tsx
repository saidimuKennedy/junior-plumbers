import { TierCollage, tierBgToVariant } from "@/components/loyalty/TierCollage";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { loyaltyKpis, promos, referrals, loyaltyTiers } from "@/lib/data";

type StatusType = "success" | "warn" | "outline";

export default function LoyaltyPage() {
  return (
    <>
      {/* Page header */}
      <div className="flex justify-between items-end gap-4 pb-3.5 border-b-2 border-rule mb-6">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>GROWTH // PROMOS &amp; LOYALTY</BracketLabel>
          <h1 className="font-serif font-semibold text-[36px] leading-[1.05] m-0">Parts &amp; Labour Club</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">EXPORT</button>
          <button className="btn btn-secondary btn-sm">RULES</button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {loyaltyKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} />
        ))}
      </div>

      {/* Promos + Referrals */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
        {/* Promotions */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>PROMOTIONS // ACTIVE &amp; SCHEDULED</BracketLabel>
            <span className="t-meta">8 TOTAL</span>
          </div>
          <div className="px-5 pb-4">
            <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_100px] gap-3 pb-2 border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              <span>Promotion</span><span>Discount</span><span>Window</span><span>Redemptions</span><span className="text-right">Status</span>
            </div>
            {promos.map((p) => (
              <div key={p.name} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_100px] gap-3 py-4 border-b border-rule-soft last:border-none items-center">
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
                  <Badge variant={p.statusType as StatusType} dot={p.statusType !== "outline"}>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referrals */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>REFERRALS // RECENT</BracketLabel>
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
                <BracketLabel>7-DAY TOTAL</BracketLabel>
                <div className="font-serif font-semibold text-[24px] mt-1">+3,840 PTS · 12 SIGNUPS</div>
              </div>
              <button className="btn btn-outline btn-sm">SEE ALL</button>
            </div>
          </div>
        </div>
      </div>

      {/* Reward tiers */}
      <div className="card">
        <div className="card-head">
          <BracketLabel>REWARD TIERS // PARTS &amp; LABOUR CLUB</BracketLabel>
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
                <BracketLabel
                  accent={tier.dark ? "light" : tier.bg === "bg-brand-yellow" ? "black" : "default"}
                  className={tier.dark ? "!text-brand-yellow" : ""}
                >{`TIER 0${tier.tier}`}</BracketLabel>
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
