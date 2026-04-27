"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BracketLabel } from "@/components/ui/BracketLabel";
import {
  DELIVERY_DEPOT,
  DELIVERY_ROUTE_LEGS,
  DELIVERY_STOP_GEO,
} from "@/lib/delivery-geo";
import type { DeliveryStatus } from "@/lib/data";

export interface DeliveryMapLeafletProps {
  stops: { id: string; status: DeliveryStatus }[];
  selectedId: string;
  onSelectStop?: (id: string) => void;
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    const b = L.latLngBounds(points);
    map.fitBounds(b, { padding: [48, 48], maxZoom: 12 });
  }, [map, points]);
  return null;
}

const DEPOT_SVG = `
<div class="relative flex h-8 w-8 items-center justify-center border-2 border-brand-black bg-brand-black text-brand-yellow shadow-md">
  <span class="absolute -top-1.5 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9px] border-b-[7px] border-x-transparent border-b-brand-yellow" aria-hidden="true"></span>
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative mt-0.5"><path d="m2 7 4.41-4.41a2 2 0 0 1 2.83 0L18 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.42 2.42 0 0 1-2.17-2c0-1.2.71-2.17 1.6-2.4"/></svg>
</div>`;

function depotIcon() {
  return L.divIcon({
    className: "jp-leaflet-div-icon",
    html: DEPOT_SVG,
    iconSize: [32, 36],
    iconAnchor: [16, 32],
  });
}

function stopDivIcon(
  id: string,
  status: DeliveryStatus,
  meta: { caption: string; riderBadge?: string },
  selected: boolean
) {
  let inner: string;
  let box =
    "flex h-7 w-7 shrink-0 items-center justify-center border-2 font-mono text-[11px] font-bold shadow-md ";

  if (status === "DELIVERED") {
    inner = "✓";
    box += "bg-success text-white border-success";
  } else if (status === "DELAYED") {
    inner = "!";
    box += "bg-danger text-white border-danger";
  } else if (status === "UNASSIGNED") {
    inner = "○";
    box += "bg-[#E5D0C0] text-ink border-[#C4A894]";
  } else {
    inner = meta.riderBadge ?? "•";
    box += "bg-brand-yellow border-brand-black text-brand-black";
  }

  if (selected) box += " ring-2 ring-brand-black ring-offset-2 ring-offset-paper-2";

  const labelCls = selected
    ? "bg-brand-yellow border-brand-black"
    : "bg-surface border-border";

  const html = `
    <div class="jp-stop-marker flex w-max max-w-[min(240px,70vw)] flex-col items-center">
      <div class="${box}">${inner}</div>
      <div class="jp-stop-label font-mono text-[10px] border px-1.5 py-0.5 mt-1 shadow-sm ${labelCls}">
        ${id} · ${meta.caption}
      </div>
    </div>`;

  return L.divIcon({
    className: "jp-leaflet-div-icon",
    html,
    iconSize: [240, 56],
    iconAnchor: [120, 14],
  });
}

export function DeliveryMapLeaflet({
  stops,
  selectedId,
  onSelectStop,
}: DeliveryMapLeafletProps) {
  const boundsPoints = useMemo(() => {
    const pts: [number, number][] = [[DELIVERY_DEPOT[0], DELIVERY_DEPOT[1]]];
    for (const s of stops) {
      const g = DELIVERY_STOP_GEO[s.id];
      if (g) pts.push([g.pos[0], g.pos[1]]);
    }
    return pts;
  }, [stops]);

  const depotIc = useMemo(() => depotIcon(), []);

  return (
    <main className="relative h-full min-h-0 overflow-hidden bg-paper-2">
      <MapContainer
        center={[-1.39, 36.72]}
        zoom={11}
        className="jp-leaflet-map z-0 h-full w-full [&_.leaflet-control-attribution]:text-[10px]"
        scrollWheelZoom
        aria-label="Delivery operations map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={boundsPoints} />

        {DELIVERY_ROUTE_LEGS.map(({ toId, dashed, faint }) => {
          const end = DELIVERY_STOP_GEO[toId];
          if (!end) return null;
          return (
            <Polyline
              key={toId}
              positions={[DELIVERY_DEPOT, end.pos]}
              pathOptions={{
                color: faint ? "rgba(10,10,10,0.25)" : "rgba(10,10,10,0.45)",
                weight: faint ? 2 : 3,
                dashArray: dashed ? "10 8" : undefined,
              }}
            />
          );
        })}

        <Marker position={DELIVERY_DEPOT} icon={depotIc} interactive={false} />

        {stops.map((stop) => {
          const meta = DELIVERY_STOP_GEO[stop.id];
          if (!meta) return null;
          const sel = selectedId === stop.id;
          const icon = stopDivIcon(stop.id, stop.status, meta, sel);
          return (
            <Marker
              key={`${stop.id}-${sel}`}
              position={meta.pos}
              icon={icon}
              eventHandlers={{
                click: () => onSelectStop?.(stop.id),
              }}
            />
          );
        })}
      </MapContainer>

      <div className="pointer-events-none absolute top-5 left-5 z-[500] max-w-[240px]">
        <div className="pointer-events-auto bg-surface border border-border p-4 shadow-2">
          <BracketLabel>LIVE OPS · 4 RIDERS</BracketLabel>
          <div className="font-serif text-[32px] font-semibold leading-none mt-2">12 deliveries</div>
          <div className="font-mono text-[11px] text-ink-3 mt-1.5">
            3 EN ROUTE · 1 DELAYED · 6 SCHEDULED · 2 DONE
          </div>
        </div>
      </div>
    </main>
  );
}
