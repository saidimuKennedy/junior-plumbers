import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import { KpiCard } from "@/components/ui/KpiCard";
import { getOutletDetail } from "@/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export default async function OutletDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const outlet = getOutletDetail(slug);
  if (!outlet) notFound();

  return (
    <>
      <section className="-mx-8 mb-6 w-[calc(100%+4rem)] overflow-hidden border-b-2 border-rule">
        <div className="relative min-h-[280px] md:min-h-[340px]">
          <div className={`absolute inset-0 ${outlet.heroMuted ? "grayscale-[40%]" : ""}`}>
            <Image
              src={outlet.heroImage}
              alt={outlet.heroImageAlt}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={88}
            />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-brand-black/15"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_85%_25%,rgba(255,210,0,0.12),transparent_50%)]"
            aria-hidden
          />
          {outlet.heroMuted && (
            <div className="absolute inset-0 bg-brand-black/25 backdrop-blur-[1px]" aria-hidden />
          )}

          <div className="absolute left-0 right-0 top-0 z-20 flex flex-wrap items-start justify-between gap-3 p-6 md:p-8">
            <Link
              href="/outlets"
              className="inline-flex items-center border-l-[3px] border-brand-yellow bg-transparent py-0.5 pl-3 pr-0 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-paper no-underline [text-shadow:0_2px_14px_rgba(0,0,0,0.85)] hover:text-brand-yellow"
            >
              ← ALL OUTLETS
            </Link>
            <div className="flex flex-wrap justify-end gap-2">
              <Link href="/pos" className="btn btn-secondary btn-sm no-underline">
                OPEN POS
              </Link>
              <button
                type="button"
                className="btn btn-outline btn-sm border-paper bg-black/30 text-paper backdrop-blur-sm hover:bg-paper/10"
              >
                EDIT OUTLET
              </button>
              <button
                type="button"
                className="btn btn-outline btn-sm border-paper bg-black/30 text-paper backdrop-blur-sm hover:bg-paper/10"
              >
                ROSTER
              </button>
            </div>
          </div>

          <header className="relative z-10 flex min-h-[280px] flex-col justify-end p-6 pb-8 pt-24 md:min-h-[340px] md:p-8 md:pb-10 md:pt-28">
            <BracketLabel className="!border-brand-yellow !bg-transparent !py-0.5 !pr-0 !text-brand-yellow [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]">
              {outlet.crumb}
            </BracketLabel>
            <h1 className="mt-4 font-serif text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-paper">
              {outlet.title}
            </h1>
            <p className="mt-2 max-w-[72ch] font-mono text-[11px] leading-relaxed text-border md:text-[12px]">
              {outlet.subtitle}
            </p>
          </header>
        </div>
      </section>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {outlet.kpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            down={"down" in k ? k.down : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <section className="card overflow-hidden border border-border p-0">
          <div className="flex items-center justify-between border-b border-rule-soft px-4 py-3">
            <BracketLabel className="!text-[10px]">RECENT ORDERS</BracketLabel>
            <span className="font-mono text-[11px] text-ink-3">{outlet.recentOrdersMeta}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {outlet.recentOrders.map((row) => {
                  const orderKey = row.id.replace(/^#/, "");
                  return (
                    <tr key={row.id} className="border-b border-rule-soft last:border-0 hover:bg-paper-2">
                      <td className="px-4 py-3 font-mono font-bold">
                        <Link href={`/orders/${encodeURIComponent(orderKey)}`} className="text-ink no-underline hover:underline">
                          {row.id}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-semibold">{row.customer}</td>
                      <td className="px-4 py-3">{row.items}</td>
                      <td className="px-4 py-3 font-serif text-[18px] font-semibold">{row.total}</td>
                      <td className="px-4 py-3">
                        <Badge variant={row.status.variant} dot={row.status.dot}>
                          {row.status.label}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="border border-border bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <BracketLabel className="!text-[10px]">STOCK ALERTS</BracketLabel>
              <span className="font-mono text-[11px] text-ink-3">{outlet.stockAlertsMeta}</span>
            </div>
            {outlet.stockAlerts.length === 0 ? (
              <p className="m-0 font-mono text-[12px] text-ink-3">No active alerts for this outlet.</p>
            ) : (
              <ul className="m-0 list-none space-y-3 p-0">
                {outlet.stockAlerts.map((a) => (
                  <li
                    key={`${a.title}-${a.meta}`}
                    className="flex gap-3 border-b border-rule-soft pb-3 last:border-0 last:pb-0"
                  >
                    {a.tone === "danger" ? (
                      <AlertTriangle className="mt-0.5 shrink-0 text-danger" size={18} strokeWidth={1.5} />
                    ) : (
                      <AlertCircle className="mt-0.5 shrink-0 text-warn" size={18} strokeWidth={1.5} />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold">{a.title}</div>
                      <div className="mt-0.5 font-mono text-[11px] text-ink-3">{a.meta}</div>
                    </div>
                    <Badge variant={a.badgeVariant}>{a.badge}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="border border-border bg-surface p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <BracketLabel className="!text-[10px]">STAFF ON DUTY</BracketLabel>
              <span className="font-mono text-[11px] text-ink-3">{outlet.staffMeta}</span>
            </div>
            <ul className="m-0 list-none space-y-3 p-0">
              {outlet.staff.map((s) => (
                <li key={s.name} className="flex items-center gap-3">
                  <span className="avatar">{s.initials}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold">{s.name}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-ink-3">{s.meta}</div>
                  </div>
                  <Badge variant={s.badge.variant} dot={s.badge.dot}>
                    {s.badge.label}
                  </Badge>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
