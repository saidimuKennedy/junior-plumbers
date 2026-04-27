import type { ElementType } from "react";
import { Filter, Search } from "lucide-react";
import {
  Cable,
  Drill,
  Hammer,
  HardHat,
  Package,
  Paintbrush,
  Ruler,
  Wrench,
  Zap,
} from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import {
  inventoryCatalogueKpis,
  inventoryCatalogueRows,
  inventoryOutletLabels,
  type InventoryCatalogueIcon,
} from "@/lib/data";

const invIcons: Record<InventoryCatalogueIcon, ElementType> = {
  drill: Drill,
  hammer: Hammer,
  wrench: Wrench,
  ruler: Ruler,
  zap: Zap,
  "hard-hat": HardHat,
  paintbrush: Paintbrush,
  cable: Cable,
  package: Package,
};

function StockCell({ n, tone }: { n: number; tone: "ok" | "low" | "out" }) {
  const cls =
    tone === "out"
      ? "text-danger font-semibold"
      : tone === "low"
        ? "text-warn font-semibold"
        : "";
  return (
    <span className={`inline-block min-w-[32px] text-right font-mono text-[13px] tabular-nums ${cls}`}>
      {n}
    </span>
  );
}

export default function InventoryPage() {
  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-rule pb-3.5">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>OPS // INVENTORY // CATALOGUE</BracketLabel>
          <h1 className="m-0 font-serif text-[36px] font-semibold leading-[1.05]">Catalogue</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            IMPORT CSV
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            TRANSFER
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            + NEW PRODUCT
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {inventoryCatalogueKpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            down={"down" in k ? k.down : undefined}
          />
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-rule-soft pb-3.5">
        <div className="flex min-w-[200px] flex-1 items-center gap-2.5 border border-border bg-surface px-3.5 py-2.5">
          <Search size={14} className="shrink-0 text-ink-3" />
          <input
            type="search"
            placeholder="Search SKU, name, supplier…"
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[13px] outline-none placeholder:text-ink-4"
          />
        </div>
        <button type="button" className="btn btn-outline btn-sm inline-flex items-center gap-2">
          <Filter size={14} /> CATEGORY · ALL
        </button>
        <button type="button" className="btn btn-outline btn-sm">
          SUPPLIER · ALL
        </button>
        <button type="button" className="btn btn-outline btn-sm">
          STOCK · ALL
        </button>
      </div>

      <div className="card overflow-hidden border border-border p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                <th className="w-9 px-3 py-3">
                  <input type="checkbox" className="border-border" aria-label="Select all" />
                </th>
                <th className="px-3 py-3">Product</th>
                <th className="px-3 py-3">SKU</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Price</th>
                {inventoryOutletLabels.map((lab) => (
                  <th key={lab} className="px-3 py-3 text-right">
                    {lab}
                  </th>
                ))}
                <th className="px-3 py-3 text-right">Total</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryCatalogueRows.map((row) => {
                const Icon = invIcons[row.icon];
                return (
                  <tr key={row.sku} className="border-b border-rule-soft last:border-0 hover:bg-paper-2">
                    <td className="px-3 py-3 align-middle">
                      <input type="checkbox" className="border-border" aria-label={`Select ${row.sku}`} />
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-rule-soft bg-paper-2">
                          <Icon size={18} strokeWidth={1.25} className="text-ink-2" />
                        </span>
                        <span className="font-semibold">{row.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 align-middle font-mono text-[13px]">{row.sku}</td>
                    <td className="px-3 py-3 align-middle">{row.category}</td>
                    <td className="px-3 py-3 align-middle font-serif text-[16px] font-semibold">
                      {row.price}
                    </td>
                    {row.stocks.map(([n, tone], i) => (
                      <td key={i} className="px-3 py-3 text-right align-middle">
                        <StockCell n={n} tone={tone} />
                      </td>
                    ))}
                    <td className="px-3 py-3 text-right align-middle font-mono font-semibold tabular-nums">
                      {row.total}
                    </td>
                    <td className="px-3 py-3 align-middle">
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
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
        <span className="t-meta">SHOWING 10 OF 1,762</span>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            PREV
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            1
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            2
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            3
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            NEXT
          </button>
        </div>
      </div>
    </>
  );
}
