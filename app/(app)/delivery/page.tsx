"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, PanelRightClose } from "lucide-react";
import { DeliveryMap } from "@/components/delivery/DeliveryMap";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import { deliveries, getDeliveryDetail, type DeliveryStatus } from "@/lib/data";

const statusVariant: Record<DeliveryStatus, "info" | "warn" | "success" | "warn"> = {
  "EN ROUTE":  "info",
  "DELAYED":   "warn",
  "DELIVERED": "success",
  "UNASSIGNED":"warn",
};

const DETAIL_OPEN_W = 380;
const DETAIL_COLLAPSED_W = 44;

export default function DeliveryPage() {
  const [selectedId, setSelectedId] = useState("#4822");
  const [detailOpen, setDetailOpen] = useState(true);

  const detail = useMemo(() => getDeliveryDetail(selectedId), [selectedId]);

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 64px)", margin: "-32px" }}>
      <div
        className="flex min-h-0 flex-1"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* Queue */}
        <div
          className="flex w-[360px] shrink-0 flex-col border-r border-border bg-surface"
        >
          <div className="flex items-center justify-between border-b-2 border-rule px-5 py-4">
            <BracketLabel>QUEUE // TODAY</BracketLabel>
            <span className="t-meta">12 OPEN</span>
          </div>
          {deliveries.map((d) => {
            const variant = statusVariant[d.status];
            const isActive = selectedId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => {
                  setSelectedId(d.id);
                  setDetailOpen(true);
                }}
                className={`cursor-pointer border-b border-rule-soft px-5 py-3.5 text-left transition-colors
                            ${isActive ? "bg-brand-yellow" : "hover:bg-paper-2"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.06em]">{d.id}</span>
                  <Badge variant={variant} dot>{d.status}</Badge>
                </div>
                <div className="mt-1 text-[14px] font-semibold">{d.customer}</div>
                <div className="mt-0.5 text-[12px] text-ink-3">{d.address}</div>
                <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{d.meta}</div>
              </button>
            );
          })}
        </div>

        {/* Map — grows when detail is collapsed */}
        <div className="min-h-0 min-w-0 flex-1">
          <DeliveryMap
            stops={deliveries}
            selectedId={selectedId}
            onSelectStop={(id) => {
              setSelectedId(id);
              setDetailOpen(true);
            }}
          />
        </div>

        {/* Detail — retractable */}
        <div
          className="relative flex shrink-0 flex-col border-l border-border bg-surface transition-[width] duration-200 ease-out"
          style={{ width: detailOpen ? DETAIL_OPEN_W : DETAIL_COLLAPSED_W }}
        >
          {detailOpen ? (
            <>
              <div className="flex items-start justify-between gap-2 border-b-2 border-rule px-5 py-4">
                <BracketLabel className="min-w-0 flex-1 leading-snug">
                  DELIVERY {detail.id} // DETAIL
                </BracketLabel>
                <button
                  type="button"
                  onClick={() => setDetailOpen(false)}
                  className="btn btn-ghost btn-sm shrink-0 gap-1 !px-2 !py-1.5 text-ink-2 hover:text-ink"
                  title="Hide detail panel"
                  aria-expanded
                >
                  <PanelRightClose size={18} strokeWidth={1.75} />
                  <span className="sr-only">Collapse detail panel</span>
                </button>
              </div>
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="shrink-0 border-b border-rule-soft px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar h-11 w-11 shrink-0 text-[14px]">
                      {detail.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold">{detail.customer}</div>
                      <div className="font-mono text-[11px] text-ink-3">
                        {detail.phone} · {detail.type}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3.5 border-l-[3px] border-brand-black bg-paper p-3">
                    <BracketLabel>DROP ADDRESS</BracketLabel>
                    <div className="mt-1 font-serif text-[16px]">{detail.address}</div>
                    <div className="text-[13px] text-ink-2">{detail.addressSub}</div>
                  </div>
                  <div className="mt-3.5 grid grid-cols-2 gap-3">
                    {[
                      { label: "RIDER", value: detail.rider },
                      { label: "VEHICLE", value: detail.vehicle },
                      { label: "VALUE", value: detail.value, serif: true },
                      {
                        label: "PAYMENT",
                        value: detail.payment,
                        success: /\bPAID\b/i.test(detail.payment),
                      },
                    ].map((f) => (
                      <div key={f.label}>
                        <BracketLabel>{f.label}</BracketLabel>
                        <div
                          className={`mt-1 text-[14px] font-semibold ${f.serif ? "font-serif text-[20px]" : ""} ${f.success ? "text-success" : ""}`}
                        >
                          {f.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto">
                  {detail.timeline.map((step, i) => (
                    <div
                      key={i}
                      className="relative grid grid-cols-[24px_1fr] gap-3 border-b border-rule-soft px-5 py-3.5"
                    >
                      {i < detail.timeline.length - 1 && (
                        <div
                          className="absolute bottom-0 left-[30px] top-0 w-0.5 bg-rule-soft"
                          style={{ top: i === 0 ? "50%" : 0 }}
                        />
                      )}
                      <div
                        className={`z-10 mt-1 h-3.5 w-3.5 shrink-0 justify-self-center rounded-full border-2 border-brand-black
                                    ${step.done ? "bg-brand-black" : step.active ? "bg-brand-yellow" : "bg-surface"}`}
                      />
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                          {step.time}
                        </div>
                        <div className="mt-0.5 text-[14px] font-semibold">{step.title}</div>
                        {step.meta && (
                          <div className="mt-1 font-mono text-[11px] text-ink-3">{step.meta}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex shrink-0 gap-2 border-t-2 border-rule px-5 py-4">
                  <button type="button" className="btn btn-outline flex-1">
                    CALL RIDER
                  </button>
                  <button type="button" className="btn btn-primary flex-1">
                    REASSIGN
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full min-h-0 flex-col items-center border-b-2 border-rule bg-paper-2 py-3">
              <button
                type="button"
                onClick={() => setDetailOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-brand-black bg-surface text-brand-black hover:bg-brand-yellow"
                title={`Show delivery ${detail.id}`}
                aria-expanded={false}
              >
                <ChevronLeft size={20} strokeWidth={1.75} />
                <span className="sr-only">Expand detail panel</span>
              </button>
              <span
                className="mt-4 max-h-[min(60vh,420px)] select-none break-all text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3 [writing-mode:vertical-rl] [text-orientation:mixed]"
              >
                {detail.id.replace("#", "")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
