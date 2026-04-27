"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Search } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import {
  ordersKpis,
  ordersTabs,
  ordersTableRows,
  type OrderListRow,
} from "@/lib/data";

type TabId = (typeof ordersTabs)[number]["id"];

function filterRows(tab: TabId, rows: OrderListRow[]) {
  switch (tab) {
    case "all":
      return rows;
    case "pos":
      return rows.filter((r) => r.channel === "POS");
    case "online":
      return rows.filter((r) => r.channel === "ONLINE");
    case "trade":
      return rows.filter(
        (r) => r.payment.label === "NET-30" || r.customerMeta?.toUpperCase().includes("TRADE")
      );
    case "pending":
      return rows.filter((r) =>
        ["PROCESSING", "EN ROUTE", "HOLD · CREDIT"].includes(r.status.label)
      );
    case "refunded":
      return rows.filter((r) => r.status.label === "REFUNDED");
    default:
      return rows;
  }
}

export default function OrdersPage() {
  const [tab, setTab] = useState<TabId>("all");
  const rows = useMemo(() => filterRows(tab, ordersTableRows), [tab]);

  return (
    <>
      <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-rule pb-3.5">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>OPS // ORDERS // ALL CHANNELS</BracketLabel>
          <h1 className="m-0 font-serif text-[36px] font-semibold leading-[1.05]">Orders</h1>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            EXPORT
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            + MANUAL ORDER
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        {ordersKpis.map((k) => (
          <KpiCard
            key={k.label}
            label={k.label}
            value={k.value}
            delta={k.delta}
            down={"down" in k ? k.down : undefined}
          />
        ))}
      </div>

      <div className="mb-4 flex gap-1 border-b-2 border-rule">
        {ordersTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`cursor-pointer border-b-2 px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.06em] transition-colors
              ${tab === t.id
                ? "-mb-0.5 border-brand-yellow text-ink"
                : "mb-[-2px] border-transparent text-ink-3 hover:text-ink-2"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-rule-soft pb-3.5">
        <div className="flex min-w-[200px] flex-1 items-center gap-2.5 border border-border bg-surface px-3.5 py-2.5">
          <Search size={14} className="shrink-0 text-ink-3" />
          <input
            type="search"
            placeholder="Search by order #, customer, phone…"
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[13px] outline-none placeholder:text-ink-4"
          />
        </div>
        <button type="button" className="btn btn-outline btn-sm inline-flex items-center gap-2">
          <Calendar size={14} /> TODAY
        </button>
        <button type="button" className="btn btn-outline btn-sm">
          OUTLET · ALL
        </button>
        <button type="button" className="btn btn-outline btn-sm">
          STATUS · ALL
        </button>
      </div>

      <div className="card overflow-hidden border border-border p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Outlet</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-rule-soft last:border-0 hover:bg-paper-2">
                  <td className="px-4 py-3 font-mono">
                    <Link href={`/orders/${r.id}`} className="font-bold text-ink no-underline hover:underline">
                      #{r.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={r.channel === "ONLINE" ? "yellow" : "outline"}>
                      {r.channel}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{r.outlet}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{r.customer}</div>
                    {r.customerMeta && (
                      <div className="mt-0.5 font-mono text-[11px] text-ink-3">{r.customerMeta}</div>
                    )}
                  </td>
                  <td className="px-4 py-3">{r.items}</td>
                  <td className="px-4 py-3 font-serif text-[18px] font-semibold">{r.total}</td>
                  <td className="px-4 py-3">
                    <Badge variant={r.payment.variant}>{r.payment.label}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status.variant} dot={r.status.dot}>
                      {r.status.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-mono text-[13px]">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3">
        <span className="t-meta">
          SHOWING {rows.length} OF {ordersTableRows.length}
        </span>
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
