/** WGS84 coordinates for OSM (approximate) */

export const DELIVERY_DEPOT: [number, number] = [-1.4242, 36.6878];

export const DELIVERY_STOP_GEO: Record<
  string,
  { pos: [number, number]; caption: string; riderBadge?: string }
> = {
  "#4821": { pos: [-1.4268, 36.6819], caption: "KISERIAN · EN ROUTE", riderBadge: "1" },
  "#4822": { pos: [-1.4102, 36.7145], caption: "MAGADI RD · +18 MIN" },
  "#4823": { pos: [-1.3224, 36.6988], caption: "KAREN" },
  "#4824": { pos: [-1.384, 36.756], caption: "NGONG · SCHED" },
  "#4825": { pos: [-1.3965, 36.7585], caption: "RONGAI · SCHED" },
  "#4826": { pos: [-1.3992, 36.7512], caption: "ONGATA · EN ROUTE", riderBadge: "2" },
};

/** Polylines from depot (visual only) */
export const DELIVERY_ROUTE_LEGS: { toId: string; dashed?: boolean; faint?: boolean }[] = [
  { toId: "#4821" },
  { toId: "#4822", dashed: true },
  { toId: "#4826" },
  { toId: "#4823", dashed: true, faint: true },
  { toId: "#4824", dashed: true, faint: true },
  { toId: "#4825", dashed: true, faint: true },
];
