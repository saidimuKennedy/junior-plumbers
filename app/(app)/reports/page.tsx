import Link from "next/link";
import { MtdCompareLineChart } from "@/components/reports/MtdCompareLineChart";
import { ReportsCategoryStrip } from "@/components/reports/ReportsCategoryStrip";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import {
  reportsCategoryMix,
  reportsKpis,
  reportsMtdCumulative,
  reportsOutletRows,
  reportsRecentExports,
} from "@/lib/data";

export default function ReportsPage() {
  return (
    <div className="max-w-[1200px]">
      <header className="mb-8 border-b-2 border-brand-black pb-6">
        <BracketLabel>FINANCE // REPORTING · OCT 2025</BracketLabel>
        <h1 className="mt-2 font-serif text-[38px] font-semibold leading-[1.05] tracking-tight">
          Analytics workspace
        </h1>
        <p className="mt-2 max-w-[52ch] font-mono text-[13px] leading-relaxed text-ink-3">
          Comparative MTD curves, category economics, and outlet contribution — built for exports and
          leadership review, not live floor ops.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            SCHEDULE
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            EXPORT PDF
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            BUILD CUSTOM
          </button>
        </div>
      </header>

      {/* Dense metric rail — different from dashboard KPI tiles */}
      <section
        aria-label="Summary metrics"
        className="mb-8 border-2 border-rule bg-paper-2"
      >
        <div className="grid divide-y divide-rule sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {reportsKpis.map((k) => (
            <div key={k.label} className="px-5 py-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">{k.label}</div>
              <div className="mt-2 font-serif text-[28px] font-semibold leading-none tabular-nums">{k.value}</div>
              <div
                className={`mt-2 font-mono text-[11px] leading-snug ${"down" in k && k.down ? "text-danger" : "text-success"}`}
              >
                {k.delta}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section className="border-2 border-brand-black bg-surface shadow-1">
          <div className="border-b-2 border-rule bg-brand-black px-5 py-3 text-paper">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/80">
              CUMULATIVE INDEX · MTD VS PRIOR YEAR
            </div>
            <p className="mt-1 font-serif text-[15px] font-medium leading-snug">
              Same calendar window · rebased to 100% at Oct 24
            </p>
          </div>
          <div className="px-3 pb-3 pt-4">
            <MtdCompareLineChart data={reportsMtdCumulative} />
          </div>
        </section>

        <section className="flex flex-col border border-border bg-surface">
          <div className="border-b border-rule px-5 py-3">
            <BracketLabel className="!text-[10px]">CATEGORY COMPOSITION · MTD</BracketLabel>
            <p className="mt-1 font-mono text-[11px] text-ink-3">Revenue mix · share of total</p>
          </div>
          <div className="flex flex-1 flex-col px-5 py-4">
            <ReportsCategoryStrip />
            <div className="mt-5 border-t border-rule-soft pt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">YoY note</div>
              <ul className="mt-2 space-y-1.5 font-mono text-[11px]">
                {reportsCategoryMix.slice(0, 4).map((row) => (
                  <li key={row.category} className="flex justify-between gap-2 text-ink-2">
                    <span>{row.category}</span>
                    <span className={row.down ? "text-danger" : "text-success"}>{row.delta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <section className="mb-8 overflow-hidden border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3">
          <div>
            <BracketLabel className="!text-[10px]">OUTLET CONTRIBUTION · MTD</BracketLabel>
            <p className="mt-0.5 font-mono text-[11px] text-ink-3">Ranked by revenue · % of company</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-outline btn-sm">
              OCT 1–24
            </button>
            <button type="button" className="btn btn-outline btn-sm">
              YoY
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b-2 border-rule bg-paper-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                <th className="px-5 py-3 font-medium">Outlet</th>
                <th className="px-5 py-3 font-medium">% co.</th>
                <th className="px-5 py-3 text-right font-medium">Revenue MTD</th>
                <th className="px-5 py-3 text-right font-medium">Orders</th>
                <th className="px-5 py-3 font-medium">Target</th>
                <th className="px-5 py-3 text-right font-medium">Avg basket</th>
                <th className="px-5 py-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {reportsOutletRows.map((r, i) => (
                <tr
                  key={r.slug}
                  className={`border-b border-rule-soft last:border-0 hover:bg-paper-2 ${i % 2 === 1 ? "bg-paper-2/40" : ""}`}
                >
                  <td className="px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.04em] text-ink">
                    <Link href={`/outlets/${r.slug}`} className="text-ink no-underline hover:underline">
                      {r.outlet}
                    </Link>
                  </td>
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative h-2 w-16 shrink-0 bg-paper-2">
                        <span
                          className="absolute inset-y-0 left-0 bg-brand-yellow"
                          style={{ width: `${Math.min(100, r.shareOfMtdPct * 2.5)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] tabular-nums text-ink-3">{r.shareOfMtdPct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right font-serif text-[17px] font-semibold tabular-nums">
                    {r.revenueMtd}
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono tabular-nums text-[12px]">{r.orders.toLocaleString()}</td>
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="relative h-1.5 min-w-[64px] flex-1 bg-paper-2">
                        <span
                          className={`absolute inset-y-0 left-0 ${r.targetPct < 60 ? "bg-warn" : "bg-brand-black"}`}
                          style={{ width: `${Math.min(100, r.targetPct)}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-ink-3">{r.targetPct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono text-[12px] tabular-nums">{r.avgBasket}</td>
                  <td className="px-5 py-2.5 font-mono text-[11px]">
                    <span className={r.trendDown ? "text-danger" : "text-success"}>{r.trend}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-l-4 border-brand-yellow bg-surface shadow-1">
        <div className="border-b border-rule px-5 py-3 pl-6">
          <BracketLabel className="!text-[10px]">EXPORT QUEUE</BracketLabel>
          <p className="mt-0.5 font-mono text-[11px] text-ink-3">Generated artefacts · audit trail</p>
        </div>
        <div className="overflow-x-auto px-5 pb-4 pl-6">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                <th className="py-3 pr-4">Report</th>
                <th className="py-3 pr-4">Format</th>
                <th className="py-3 pr-4">Scope</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 text-right">When</th>
              </tr>
            </thead>
            <tbody>
              {reportsRecentExports.map((ex) => (
                <tr key={ex.name} className="border-b border-dashed border-rule-soft last:border-0">
                  <td className="py-3 pr-4 font-semibold">{ex.name}</td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline">{ex.format}</Badge>
                  </td>
                  <td className="py-3 pr-4 font-mono text-[12px] text-ink-3">{ex.scope}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={ex.status.variant} dot={ex.status.dot}>
                      {ex.status.label}
                    </Badge>
                  </td>
                  <td className="py-3 text-right font-mono text-[12px] text-ink-3">{ex.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
