import Link from "next/link";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import { outletDirectoryCards } from "@/lib/data";

export default function OutletsPage() {
  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-rule pb-3.5">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>OPS // OUTLETS</BracketLabel>
          <h1 className="m-0 font-serif text-[36px] font-semibold leading-[1.05]">All outlets</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            EXPORT
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            + NEW OUTLET
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {outletDirectoryCards.map((o) => (
          <Link
            key={o.slug}
            href={`/outlets/${o.slug}`}
            className="grid grid-rows-[auto_1fr_auto] gap-3.5 border border-border bg-surface p-5 no-underline transition-colors hover:border-brand-black"
          >
            <div className="flex items-start justify-between gap-2">
              <BracketLabel className="!text-[10px] leading-snug">{o.codeBracket}</BracketLabel>
              <Badge variant={o.status === "OPEN" ? "success" : "warn"} dot>
                {o.status}
              </Badge>
            </div>
            <div>
              <div className="font-serif text-[28px] font-semibold leading-tight text-ink">{o.name}</div>
              <div className="mt-1 font-mono text-[11px] text-ink-3">{o.meta}</div>
              <div className="mt-3.5">
                <div className="relative h-1.5 bg-paper-2">
                  <span
                    className={`absolute inset-y-0 left-0 ${o.progressWarn ? "bg-warn" : "bg-brand-black"}`}
                    style={{ width: `${Math.min(100, o.progress)}%` }}
                  />
                </div>
                <div className="mt-1 font-mono text-[11px] text-ink-3">{o.revenueLine}</div>
              </div>
            </div>
            <div className="flex gap-6 border-t border-rule-soft pt-3">
              {o.footer.kind === "metrics" ? (
                <>
                  <div>
                    <BracketLabel className="!text-[9px]">ORDERS</BracketLabel>
                    <div className="font-serif text-[18px] font-semibold">{o.footer.orders}</div>
                  </div>
                  <div>
                    <BracketLabel className="!text-[9px]">AVG BASKET</BracketLabel>
                    <div className="font-serif text-[18px] font-semibold">{o.footer.avgBasket}</div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <BracketLabel className="!text-[9px]">ORDERS</BracketLabel>
                    <div className="font-serif text-[18px] font-semibold">{o.footer.orders}</div>
                  </div>
                  <div>
                    <BracketLabel className="!text-[9px]">DOWN</BracketLabel>
                    <div className="font-serif text-[18px] font-semibold text-warn">{o.footer.down}</div>
                  </div>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
