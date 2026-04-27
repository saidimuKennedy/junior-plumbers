"use client";

import { useState } from "react";
import { DeliveryMap } from "@/components/delivery/DeliveryMap";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import { deliveries, deliveryDetail, type DeliveryStatus } from "@/lib/data";

const statusVariant: Record<DeliveryStatus, "info" | "warn" | "success" | "warn"> = {
  "EN ROUTE":  "info",
  "DELAYED":   "warn",
  "DELIVERED": "success",
  "UNASSIGNED":"warn",
};

export default function DeliveryPage() {
  const [selectedId, setSelectedId] = useState("#4822");

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)", margin: "-32px" }}>
      {/* Delivery-specific topbar override */}
      <div className="grid grid-cols-[360px_1fr_380px] flex-1 min-h-0" style={{ minHeight: "calc(100vh - 64px)" }}>
        {/* Left pane: queue */}
        <div className="bg-surface border-r border-border flex flex-col">
          <div className="px-5 py-4 border-b-2 border-rule flex justify-between items-center">
            <BracketLabel>QUEUE // TODAY</BracketLabel>
            <span className="t-meta">12 OPEN</span>
          </div>
          {deliveries.map((d) => {
            const variant = statusVariant[d.status];
            const isActive = selectedId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`px-5 py-3.5 border-b border-rule-soft cursor-pointer text-left transition-colors
                            ${isActive ? "bg-brand-yellow" : "hover:bg-paper-2"}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[11px] tracking-[0.06em]">{d.id}</span>
                  <Badge variant={variant} dot>{d.status}</Badge>
                </div>
                <div className="font-semibold text-[14px] mt-1">{d.customer}</div>
                <div className="text-[12px] text-ink-3 mt-0.5">{d.address}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3 mt-1.5">{d.meta}</div>
              </button>
            );
          })}
        </div>

        <DeliveryMap
          stops={deliveries}
          selectedId={selectedId}
          onSelectStop={setSelectedId}
        />

        {/* Right pane: detail */}
        <div className="bg-surface border-l border-border flex flex-col">
          <div className="px-5 py-4 border-b-2 border-rule">
            <BracketLabel>DELIVERY {deliveryDetail.id} // DETAIL</BracketLabel>
          </div>
          <div className="px-5 py-4 border-b border-rule-soft">
            <div className="flex gap-3 items-center">
              <div className="avatar" style={{ width: 44, height: 44, fontSize: 14 }}>PO</div>
              <div>
                <div className="font-semibold text-[15px]">{deliveryDetail.customer}</div>
                <div className="font-mono text-[11px] text-ink-3">{deliveryDetail.phone} · {deliveryDetail.type}</div>
              </div>
            </div>
            <div className="mt-3.5 p-3 bg-paper border-l-[3px] border-brand-black">
              <BracketLabel>DROP ADDRESS</BracketLabel>
              <div className="font-serif text-[16px] mt-1">{deliveryDetail.address}</div>
              <div className="text-[13px] text-ink-2">{deliveryDetail.addressSub}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3.5">
              {[
                { label: "RIDER",   value: deliveryDetail.rider   },
                { label: "VEHICLE", value: deliveryDetail.vehicle  },
                { label: "VALUE",   value: deliveryDetail.value, serif: true },
                { label: "PAYMENT", value: deliveryDetail.payment, success: true },
              ].map((f) => (
                <div key={f.label}>
                  <BracketLabel>{f.label}</BracketLabel>
                  <div className={`font-semibold text-[14px] mt-1 ${f.serif ? "font-serif text-[20px]" : ""} ${f.success ? "text-success" : ""}`}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 relative">
            {deliveryDetail.timeline.map((step, i) => (
              <div key={i} className="grid grid-cols-[24px_1fr] gap-3 px-5 py-3.5 border-b border-rule-soft relative">
                {i < deliveryDetail.timeline.length - 1 && (
                  <div className="absolute left-[30px] top-0 bottom-0 w-0.5 bg-rule-soft" style={{ top: i === 0 ? "50%" : 0 }} />
                )}
                <div className={`w-3.5 h-3.5 rounded-full border-2 border-brand-black mt-1 z-10 justify-self-center shrink-0
                                ${step.done ? "bg-brand-black" : step.active ? "bg-brand-yellow" : "bg-surface"}`} />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">{step.time}</div>
                  <div className="font-semibold text-[14px] mt-0.5">{step.title}</div>
                  {step.meta && <div className="font-mono text-[11px] text-ink-3 mt-1">{step.meta}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 flex gap-2 border-t-2 border-rule">
            <button className="btn btn-outline flex-1">CALL RIDER</button>
            <button className="btn btn-primary flex-1">REASSIGN</button>
          </div>
        </div>
      </div>
    </div>
  );
}
