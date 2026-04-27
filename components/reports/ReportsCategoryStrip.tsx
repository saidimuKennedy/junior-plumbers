import { reportsCategoryMix } from "@/lib/data";

const SEGMENT_CLASS = [
  "bg-brand-black",
  "bg-brand-yellow",
  "bg-ink-3",
  "bg-warn",
  "bg-ink-2",
  "bg-rule",
] as const;

export function ReportsCategoryStrip() {
  return (
    <div>
      <div className="flex h-6 w-full overflow-hidden border-2 border-brand-black">
        {reportsCategoryMix.map((row, i) => (
          <div
            key={row.category}
            className={`${SEGMENT_CLASS[i % SEGMENT_CLASS.length]} h-full min-w-0 transition-[filter] hover:brightness-95`}
            style={{ width: `${row.pct}%` }}
            title={`${row.category} · ${row.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {reportsCategoryMix.map((row, i) => (
          <li
            key={row.category}
            className="flex items-baseline justify-between gap-3 border-b border-rule-soft pb-2 font-mono text-[11px] last:border-0 sm:last:border-b"
          >
            <span className="flex min-w-0 items-center gap-2 text-ink-2">
              <span className={`h-2.5 w-2.5 shrink-0 border border-brand-black ${SEGMENT_CLASS[i % SEGMENT_CLASS.length]}`} />
              <span className="truncate">{row.category}</span>
            </span>
            <span className="shrink-0 tabular-nums text-ink">
              {row.pct}% · {row.revenue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
