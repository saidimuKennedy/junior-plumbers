"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueChart } from "@/lib/data";

const BAR_BLACK = "#0A0A0A";
const BAR_YELLOW = "#FFD200";
const GRID_LINE = "#E5E2DA";

/** Oct 11–24 (14 days) aligned with mock dashboard. */
const DAY_LABELS = [
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
] as const;

function kesFromRelative(v: number) {
  return Math.round((v / 100) * 320_000);
}

type Row = { day: string; value: number; kes: number };

type RevenueTipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: Row }>;
  label?: string;
};

function RevenueTooltip({ active, payload, label }: RevenueTipProps) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload as Row;
  return (
    <div className="border-2 border-brand-black bg-surface px-3 py-2 shadow-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
        Oct {label}, 2025
      </div>
      <div className="mt-1 font-sans text-[13px] font-semibold">
        KES {row.kes.toLocaleString("en-KE")}
      </div>
      <div className="font-mono text-[10px] text-ink-3">Relative load {row.value}%</div>
    </div>
  );
}

export function RevenueBarChart() {
  const data: Row[] = useMemo(
    () =>
      revenueChart.map((value, i) => ({
        day: DAY_LABELS[i] ?? String(i + 1),
        value,
        kes: kesFromRelative(value),
      })),
    []
  );

  return (
    <div className="h-[240px] w-full min-w-0 px-1">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          barCategoryGap="10%"
        >
          <CartesianGrid stroke={GRID_LINE} strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{
              fontSize: 10,
              fill: "#6B6B6B",
              fontFamily: "var(--font-mono), ui-monospace, monospace",
            }}
            tickLine={false}
            axisLine={{ stroke: "#DAD6CC" }}
          />
          <YAxis domain={[0, 100]} hide />
          <Tooltip
            cursor={{ fill: "rgba(242, 239, 232, 0.85)" }}
            content={<RevenueTooltip />}
          />
          <Bar dataKey="value" radius={[0, 0, 0, 0]} maxBarSize={56}>
            {data.map((_, index) => (
              <Cell key={index} fill={index % 2 === 0 ? BAR_BLACK : BAR_YELLOW} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
