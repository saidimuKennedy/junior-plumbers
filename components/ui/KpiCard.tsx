interface KpiCardProps {
  label: string;
  value: string;
  delta: string;
  down?: boolean;
}

export function KpiCard({ label, value, delta, down }: KpiCardProps) {
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-num">{value}</div>
      <div className={`kpi-delta ${down ? "kpi-delta-down" : ""}`}>{delta}</div>
    </div>
  );
}
