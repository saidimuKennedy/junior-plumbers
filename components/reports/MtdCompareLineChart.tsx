"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ReportsMtdCumulativePoint } from "@/lib/data";

const GRID = "#E5E2DA";
const CURRENT = "#0A0A0A";
const PRIOR = "#C4A000";

type Row = ReportsMtdCumulativePoint;

type TipProps = {
  active?: boolean;
  payload?: ReadonlyArray<{ dataKey?: string; value?: number; name?: string }>;
  label?: string;
};

function MtdTooltip({ active, payload, label }: TipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border-2 border-brand-black bg-surface px-3 py-2 shadow-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">Oct {label}</div>
      <div className="mt-2 space-y-1 font-mono text-[12px]">
        {payload.map((p) => (
          <div key={String(p.dataKey)} className="flex justify-between gap-6">
            <span className="text-ink-3">{p.name}</span>
            <span className="tabular-nums font-semibold text-ink">{p.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MtdCompareLineChart({ data }: { data: readonly ReportsMtdCumulativePoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[260px] w-full min-w-0" aria-hidden />;
  }

  return (
    <div className="h-[260px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data as Row[]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={GRID} strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "#6B6B6B", fontFamily: "var(--font-mono), ui-monospace, monospace" }}
            tickLine={false}
            axisLine={{ stroke: "#DAD6CC" }}
            label={{ value: "OCT (DAY)", position: "insideBottom", offset: -4, fill: "#6B6B6B", fontSize: 9 }}
          />
          <YAxis
            domain={[0, 100]}
            width={36}
            tick={{ fontSize: 10, fill: "#6B6B6B", fontFamily: "var(--font-mono), ui-monospace, monospace" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}`}
            label={{ value: "INDEX", angle: -90, position: "insideLeft", fill: "#6B6B6B", fontSize: 9 }}
          />
          <Tooltip content={<MtdTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            formatter={(value) => <span className="font-mono text-[11px] text-ink-2">{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="current"
            name="Oct 2025 (MTD run-rate)"
            stroke={CURRENT}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: CURRENT }}
          />
          <Line
            type="monotone"
            dataKey="prior"
            name="Prior year · same window"
            stroke={PRIOR}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
            activeDot={{ r: 4, fill: PRIOR }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
