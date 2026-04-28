import Image from "next/image";
import { CheckCheck, ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";
import { whatsappPreviewCarouselProducts, whatsappPreviewMeta } from "@/lib/data";

function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

function ChatTime() {
  return <span className="text-[10px] text-black/45">10:42</span>;
}

export function WhatsAppPhoneMock() {
  const { businessName, chatSubtitle, orderRef, mpesaMasked, stkAmountKes, productLine, deliveryKes } =
    whatsappPreviewMeta;
  const subtotal = productLine.unitKes * productLine.qty;

  return (
    <div
      className="mx-auto w-full max-w-[280px]"
      aria-label="Illustration: WhatsApp order preview (demo only)"
    >
      {/* Bezel */}
      <div className="rounded-[2.35rem] border-[3px] border-zinc-700 bg-zinc-900 p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-zinc-950">
          {/* Status / island */}
          <div className="flex h-7 items-end justify-center bg-zinc-950 pb-1">
            <div className="h-5 w-[88px] rounded-full bg-black" />
          </div>

          <div className="flex min-h-[520px] flex-col bg-[#ece5dd]">
            {/* WhatsApp-style header */}
            <header className="flex shrink-0 items-center gap-2 bg-[#008069] px-2 py-2 text-white">
              <ChevronLeft size={22} strokeWidth={2} className="opacity-90" aria-hidden />
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold">
                JP
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[14px] font-semibold leading-tight">{businessName}</div>
                <div className="truncate text-[11px] text-white/80">{chatSubtitle}</div>
              </div>
              <Video size={18} className="opacity-90" aria-hidden />
              <Phone size={17} className="opacity-90" aria-hidden />
              <MoreVertical size={18} className="opacity-90" aria-hidden />
            </header>

            {/* Chat */}
            <div className="scrollbar-thin flex flex-1 flex-col gap-3 overflow-y-auto px-2 py-3">
              <div className="flex justify-center">
                <span className="rounded-lg bg-black/8 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-black/50">
                  Today
                </span>
              </div>

              {/* Bot: carousel */}
              <div className="max-w-[95%]">
                <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                  <p className="m-0 text-[13px] leading-snug text-black/88">
                    Hi — here are picks live from our inventory today. Swipe to browse, same SKUs as the
                    trade counter.
                  </p>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {whatsappPreviewCarouselProducts.map((p) => (
                      <div
                        key={p.sku}
                        className="w-[112px] shrink-0 overflow-hidden rounded-md border border-black/8 bg-paper"
                      >
                        <div className="relative aspect-square w-full bg-paper-2">
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="112px"
                            className="object-cover"
                            unoptimized={p.image.includes("istockphoto")}
                          />
                        </div>
                        <div className="px-1.5 py-1.5">
                          <div className="line-clamp-2 text-[10px] font-semibold leading-tight text-black/90">
                            {p.name}
                          </div>
                          <div className="mt-0.5 font-mono text-[9px] text-black/45">{p.sku}</div>
                          <div className="mt-1 font-serif text-[12px] font-semibold tabular-nums text-black/88">
                            {formatKes(p.price)}
                          </div>
                          {p.badge ? (
                            <span className="mt-1 inline-block rounded bg-brand-yellow px-1 py-px font-mono text-[8px] font-semibold uppercase text-brand-black">
                              {p.badge}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 flex justify-end gap-1">
                    <ChatTime />
                  </div>
                </div>
              </div>

              {/* User */}
              <div className="flex justify-end">
                <div className="max-w-[88%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 shadow-sm">
                  <p className="m-0 text-[13px] leading-snug text-black/88">
                    {productLine.qty}× {productLine.name} — {productLine.sku}. Deliver Rongai, today if
                    possible.
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <ChatTime />
                    <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />
                  </div>
                </div>
              </div>

              {/* Bot: basket + pay */}
              <div className="max-w-[95%]">
                <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                  <p className="m-0 text-[13px] font-semibold text-black/88">Order summary</p>
                  <div className="mt-2 space-y-1 border-b border-black/10 pb-2 font-mono text-[11px] text-black/70">
                    <div className="flex justify-between gap-2">
                      <span className="min-w-0 truncate">
                        {productLine.name} ×{productLine.qty}
                      </span>
                      <span className="shrink-0 tabular-nums">{formatKes(subtotal)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Delivery (greater Nairobi)</span>
                      <span className="shrink-0 tabular-nums">{formatKes(deliveryKes)}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-black/88">Total</span>
                    <span className="font-serif text-[15px] font-semibold tabular-nums text-black">
                      {formatKes(stkAmountKes)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="mt-2.5 w-full rounded-md border-0 bg-[#008069] py-2.5 font-sans text-[13px] font-semibold text-white shadow-sm"
                    disabled
                  >
                    Pay with M-Pesa
                  </button>
                  <div className="mt-1 flex justify-end">
                    <ChatTime />
                  </div>
                </div>
              </div>

              {/* STK push card */}
              <div className="max-w-[95%]">
                <div className="rounded-lg border border-[#008069]/25 bg-white px-2.5 py-2.5 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-black/8 pb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f5e9] text-[10px] font-bold text-[#2e7d32]">
                      M
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-semibold text-black/88">M-Pesa STK push</div>
                      <div className="text-[10px] text-black/55">Enter PIN on your phone to approve</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 font-mono text-[11px] text-black/70">
                    <div className="flex justify-between gap-2">
                      <span>To</span>
                      <span className="text-right text-black/88">{businessName}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Amount</span>
                      <span className="tabular-nums text-black/88">{formatKes(stkAmountKes)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Phone</span>
                      <span className="tabular-nums text-black/88">{mpesaMasked}</span>
                    </div>
                  </div>
                  <div className="mt-2 rounded bg-paper-2 px-2 py-1.5 text-center text-[10px] text-black/55">
                    Demo preview — no real charge
                  </div>
                </div>
              </div>

              {/* Confirmation */}
              <div className="max-w-[95%]">
                <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                  <div className="flex items-start gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32]">
                      ✓
                    </div>
                    <div className="min-w-0">
                      <p className="m-0 text-[13px] font-semibold text-black/88">Payment received</p>
                      <p className="mt-1 text-[12px] leading-snug text-black/70">
                        You&apos;re set — {formatKes(stkAmountKes)} confirmed. Ref{" "}
                        <span className="font-mono text-[11px] text-black/88">{orderRef}</span>. We&apos;ll
                        WhatsApp you when the rider is on the way.
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-end">
                    <ChatTime />
                  </div>
                </div>
              </div>
            </div>

            {/* Input bar */}
            <div className="flex shrink-0 items-center gap-1.5 border-t border-black/6 bg-[#f0f0f0] px-2 py-1.5">
              <div className="h-8 flex-1 rounded-full bg-white px-3 text-[12px] leading-8 text-black/35">
                Message
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
