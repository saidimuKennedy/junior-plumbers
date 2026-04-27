import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { dashboardKpis, outlets, dashboardAlerts, revenueChart } from "@/lib/data";

const alertIcon = {
  danger:  <AlertTriangle size={16} className="text-danger shrink-0" />,
  warn:    <AlertCircle   size={16} className="text-warn shrink-0"   />,
  success: <CheckCircle2 size={16} className="text-success shrink-0" />,
};

type AlertType = "danger" | "warn" | "success";
type BadgeType = "danger" | "warn" | "success";

export default function DashboardPage() {
  return (
    <>
      {/* Page header */}
      <div className="flex justify-between items-end gap-4 pb-3.5 border-b-2 border-rule mb-6">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>OPS // ALL OUTLETS // OCT 24, 2025</BracketLabel>
          <h1 className="font-serif font-semibold text-[36px] leading-[1.05] m-0">Outlet performance</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">EXPORT CSV</button>
          <button className="btn btn-primary btn-sm">+ NEW REPORT</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {dashboardKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} down={k.down} />
        ))}
      </div>

      {/* Revenue chart + Alerts */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
        {/* Chart */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>REVENUE // LAST 14 DAYS</BracketLabel>
            <span className="t-meta">KES, ALL OUTLETS</span>
          </div>
          <div className="relative h-[220px] px-4 pb-0"
               style={{ backgroundImage: "linear-gradient(transparent 90%, #E5E2DA 90%) , linear-gradient(to right, transparent 90%, #E5E2DA 90%)", backgroundSize: "100% 25%, 12.5% 100%", backgroundRepeat: "repeat-y, repeat-x" }}>
            <div className="absolute bottom-0 left-4 right-4 flex items-end gap-[2px] h-full pt-4">
              {revenueChart.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 border-t-2 border-brand-black"
                  style={{
                    height: `${h * 0.85}%`,
                    background: i % 2 === 0 && i !== revenueChart.length - 1 ? "#0A0A0A" : "#FFD200",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>ALERTS // LIVE</BracketLabel>
            <span className="t-meta">4 ACTIVE</span>
          </div>
          <div className="px-5 pb-2">
            {dashboardAlerts.map((a, i) => (
              <div key={i} className="grid grid-cols-[16px_1fr_auto] gap-2.5 items-center py-2.5 border-b border-rule-soft last:border-none">
                {alertIcon[a.type as AlertType]}
                <div>
                  <div className="text-[14px] font-medium">{a.title}</div>
                  <div className="font-mono text-[11px] text-ink-3">{a.meta}</div>
                </div>
                <Badge variant={a.badgeType as BadgeType}>{a.badge}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Outlets table */}
      <div className="card">
        <div className="card-head">
          <BracketLabel>OUTLETS // TODAY</BracketLabel>
          <span className="t-meta">SORTED BY REVENUE</span>
        </div>
        <div className="px-5 pb-4">
          {/* Table header */}
          <div className="grid grid-cols-[1.5fr_1fr_1fr_80px] gap-3 pb-2 mb-1 border-b-2 border-rule font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
            <span>Outlet</span><span>Revenue</span><span>Target progress</span><span className="text-right">Status</span>
          </div>
          {outlets.map((o) => (
            <div key={o.name} className="grid grid-cols-[1.5fr_1fr_1fr_80px] gap-3 py-3.5 border-b border-rule-soft last:border-none items-center">
              <div>
                <div className="font-semibold">{o.name}</div>
                <div className="font-mono text-[11px] text-ink-3">{o.staff} STAFF · MGR. {o.mgr}</div>
              </div>
              <div className="font-serif font-semibold text-[22px]">{o.revenue}</div>
              <div>
                <div className="h-1.5 bg-paper-2 relative">
                  <span
                    className="absolute inset-y-0 left-0"
                    style={{ width: `${o.progress}%`, background: o.progressWarn ? "#B8761F" : "#0A0A0A" }}
                  />
                </div>
                <div className="font-mono text-[11px] mt-1">{o.progress}% of {o.target}</div>
              </div>
              <div className="flex justify-end">
                <Badge variant={o.status === "OPEN" ? "success" : "warn"} dot>{o.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
