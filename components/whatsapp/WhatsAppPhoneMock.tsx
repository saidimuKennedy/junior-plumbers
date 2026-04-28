"use client";

import Image from "next/image";
import {
  CheckCheck,
  ChevronLeft,
  Download,
  MoreVertical,
  Phone,
  Send,
  Video,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { whatsappPreviewCarouselProducts, whatsappPreviewMeta } from "@/lib/data";

function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE")}`;
}

function ChatTime() {
  return <span className="text-[10px] text-black/45">10:42</span>;
}

const USER_FIRST =
  "Hi — do you have cordless drills in stock at Kiserian today? I need something for light masonry.";
const USER_ORDER =
  "I'll take 1× Ingco Cordless Drill 12V (ING-CD45-12V). Deliver to Rongai today if you can.";
const BOT_CAROUSEL_INTRO =
  "Yes — pulled from live inventory. Swipe each card for photo, caption & price — same SKUs as the trade counter.";

const DELAY_AFTER_USER1_MS = 1_400;
const TYPING_1_MS = 1_500;
const DELAY_BEFORE_USER2_MS = 3_200;
const DELAY_AFTER_USER2_MS = 1_200;
const TYPING_2_MS = 1_400;
const STK_AUTO_SUCCESS_MS = 2_800;

type Phase =
  | "intro"
  | "user1"
  | "typing1"
  | "carousel"
  | "user2"
  | "typing2"
  | "summary"
  | "success";

export function WhatsAppPhoneMock() {
  const { businessName, chatSubtitle, orderRef, mpesaMasked, stkAmountKes, productLine, deliveryKes } =
    whatsappPreviewMeta;
  const subtotal = productLine.unitKes * productLine.qty;

  const [phase, setPhase] = useState<Phase>("intro");
  const [stkOpen, setStkOpen] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stkAutoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselIdxRef = useRef(0);

  const pushTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const scrollChatDown = useCallback(() => {
    requestAnimationFrame(() => {
      const el = chatRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollChatDown();
  }, [phase, stkOpen, scrollChatDown]);

  useEffect(() => {
    clearAllTimers();

    if (phase === "user1") {
      pushTimer(() => setPhase("typing1"), DELAY_AFTER_USER1_MS);
    } else if (phase === "typing1") {
      pushTimer(() => setPhase("carousel"), TYPING_1_MS);
    } else if (phase === "carousel") {
      pushTimer(() => setPhase("user2"), DELAY_BEFORE_USER2_MS);
    } else if (phase === "user2") {
      pushTimer(() => setPhase("typing2"), DELAY_AFTER_USER2_MS);
    } else if (phase === "typing2") {
      pushTimer(() => setPhase("summary"), TYPING_2_MS);
    }

    return clearAllTimers;
  }, [phase, pushTimer, clearAllTimers]);

  useLayoutEffect(() => {
    if (phase !== "carousel") return;
    const first = carouselRef.current?.children[0] as HTMLElement | undefined;
    first?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [phase]);

  useEffect(() => {
    if (phase !== "carousel") return;
    const products = whatsappPreviewCarouselProducts;
    carouselIdxRef.current = 0;
    const id = setInterval(() => {
      carouselIdxRef.current = (carouselIdxRef.current + 1) % products.length;
      const card = carouselRef.current?.children[carouselIdxRef.current] as HTMLElement | undefined;
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }, 2_200);
    return () => clearInterval(id);
  }, [phase]);

  const startDemo = () => {
    if (phase !== "intro") return;
    setPhase("user1");
  };

  const replay = () => {
    clearAllTimers();
    if (stkAutoTimerRef.current) {
      clearTimeout(stkAutoTimerRef.current);
      stkAutoTimerRef.current = null;
    }
    setStkOpen(false);
    setPhase("intro");
  };

  const openStk = () => {
    if (phase !== "summary") return;
    setStkOpen(true);
  };

  useEffect(() => {
    if (!stkOpen) return;
    stkAutoTimerRef.current = setTimeout(() => {
      stkAutoTimerRef.current = null;
      setStkOpen(false);
      setPhase("success");
    }, STK_AUTO_SUCCESS_MS);
    return () => {
      if (stkAutoTimerRef.current) {
        clearTimeout(stkAutoTimerRef.current);
        stkAutoTimerRef.current = null;
      }
    };
  }, [stkOpen]);

  const confirmStkDemo = () => {
    if (stkAutoTimerRef.current) {
      clearTimeout(stkAutoTimerRef.current);
      stkAutoTimerRef.current = null;
    }
    setStkOpen(false);
    setPhase("success");
  };

  const downloadReceipt = () => {
    const lines = [
      "JUNIOR PLUMBERS · KISERIAN HARDWARE",
      "─────────────────────────────────",
      `Receipt ref: ${orderRef}`,
      `Date: ${new Date().toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}`,
      "",
      `${productLine.qty}× ${productLine.name}`,
      `SKU ${productLine.sku}     ${formatKes(subtotal)}`,
      `Delivery (greater Nairobi)     ${formatKes(deliveryKes)}`,
      "",
      `TOTAL PAID (M-Pesa)     ${formatKes(stkAmountKes)}`,
      "",
      "Thank you — we'll WhatsApp when your order is on the way.",
      "",
      "Demo receipt · not a legal tax document.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `junior-plumbers-${orderRef}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const products = whatsappPreviewCarouselProducts;
  const showUser1 = phase !== "intro";
  const showTyping1 = phase === "typing1";
  const showCarousel =
    phase === "carousel" ||
    phase === "user2" ||
    phase === "typing2" ||
    phase === "summary" ||
    phase === "success";
  const showUser2 =
    phase === "user2" || phase === "typing2" || phase === "summary" || phase === "success";
  const showTyping2 = phase === "typing2";
  const showSummary = phase === "summary" || phase === "success";
  const showSuccess = phase === "success";

  return (
    <div className="mx-auto w-full max-w-[280px]" aria-label="Animated WhatsApp order preview (demo only)">
      <div className="rounded-[2.35rem] border-[3px] border-zinc-700 bg-zinc-900 p-2 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.35)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-zinc-950">
          <div className="flex h-7 items-end justify-center bg-zinc-950 pb-1">
            <div className="h-5 w-[88px] rounded-full bg-black" />
          </div>

          <div className="relative flex min-h-[520px] flex-col bg-[#ece5dd]">
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

            <div
              ref={chatRef}
              className="scrollbar-thin flex max-h-[min(52vh,420px)] flex-1 flex-col gap-3 overflow-y-auto px-2 py-3"
            >
              <div className="flex justify-center">
                <span className="rounded-lg bg-black/8 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-black/50">
                  Today
                </span>
              </div>

              {showUser1 ? (
                <div className="jp-wa-fade-up flex justify-end">
                  <div className="max-w-[92%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 shadow-sm">
                    <p className="m-0 text-[13px] leading-snug text-black/88">{USER_FIRST}</p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <ChatTime />
                      <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />
                    </div>
                  </div>
                </div>
              ) : null}

              {showTyping1 ? (
                <div className="jp-wa-fade-up max-w-[72px]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-black/35"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ) : null}

              {showCarousel ? (
                <div className="jp-wa-fade-up max-w-[95%]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                    <p className="m-0 text-[13px] leading-snug text-black/88">{BOT_CAROUSEL_INTRO}</p>
                    <div
                      ref={carouselRef}
                      className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      {products.map((p, i) => (
                        <div
                          key={p.sku}
                          className="w-[min(200px,78vw)] max-w-[200px] shrink-0 snap-center overflow-hidden rounded-md border border-black/8 bg-paper"
                          style={{ scrollSnapStop: "always" as const }}
                        >
                          <div className="relative aspect-[4/3] w-full bg-paper-2">
                            <Image
                              src={p.image}
                              alt=""
                              fill
                              sizes="200px"
                              className="object-cover"
                              unoptimized={p.image.includes("istockphoto")}
                            />
                          </div>
                          <div className="px-2 py-1.5">
                            <div className="line-clamp-2 text-[11px] font-semibold leading-tight text-black/90">
                              {p.name}
                            </div>
                            <div className="mt-0.5 font-mono text-[9px] text-black/45">{p.sku}</div>
                            <div className="mt-1 font-serif text-[13px] font-semibold tabular-nums text-black/88">
                              {formatKes(p.price)}
                            </div>
                            {p.badge ? (
                              <span className="mt-1 inline-block rounded bg-brand-yellow px-1 py-px font-mono text-[8px] font-semibold uppercase text-brand-black">
                                {p.badge}
                              </span>
                            ) : null}
                          </div>
                          <div className="border-t border-black/6 px-2 py-1 text-center font-mono text-[8px] text-black/40">
                            {i + 1} / {products.length}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mb-0 mt-1.5 text-[10px] text-black/45">Swipe horizontally to browse</p>
                    <div className="mt-1 flex justify-end">
                      <ChatTime />
                    </div>
                  </div>
                </div>
              ) : null}

              {showUser2 ? (
                <div className="jp-wa-fade-up flex justify-end">
                  <div className="max-w-[92%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 shadow-sm">
                    <p className="m-0 text-[13px] leading-snug text-black/88">{USER_ORDER}</p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <ChatTime />
                      <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />
                    </div>
                  </div>
                </div>
              ) : null}

              {showTyping2 ? (
                <div className="jp-wa-fade-up max-w-[72px]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-3 py-2.5 shadow-sm">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-black/35"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              ) : null}

              {showSummary ? (
                <div className="jp-wa-fade-up max-w-[95%]">
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
                      onClick={openStk}
                      disabled={phase !== "summary" || stkOpen}
                      className="mt-2.5 w-full rounded-md border-0 bg-[#008069] py-2.5 font-sans text-[13px] font-semibold text-white shadow-sm enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      Pay with M-Pesa
                    </button>
                    <div className="mt-1 flex justify-end">
                      <ChatTime />
                    </div>
                  </div>
                </div>
              ) : null}

              {showSuccess ? (
                <div className="jp-wa-fade-up max-w-[95%]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32]">
                        ✓
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[13px] font-semibold text-black/88">Payment received</p>
                        <p className="mt-1 text-[12px] leading-snug text-black/70">
                          You&apos;re set — {formatKes(stkAmountKes)} confirmed. Ref{" "}
                          <span className="font-mono text-[11px] text-black/88">{orderRef}</span>. We&apos;ll
                          WhatsApp you when the rider is on the way.
                        </p>
                        <button
                          type="button"
                          onClick={downloadReceipt}
                          className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-md border-2 border-brand-black bg-brand-yellow py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-brand-black"
                        >
                          <Download size={14} strokeWidth={2} aria-hidden />
                          Download receipt
                        </button>
                      </div>
                    </div>
                    <div className="mt-1 flex justify-end">
                      <ChatTime />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 border-t border-black/6 bg-[#f0f0f0] px-2 py-1.5">
              {phase === "intro" ? (
                <>
                  <div className="h-8 min-w-0 flex-1 truncate rounded-full bg-white px-3 text-[11px] leading-8 text-black/55">
                    {USER_FIRST.slice(0, 42)}…
                  </div>
                  <button
                    type="button"
                    onClick={startDemo}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008069] text-white shadow-sm transition-transform active:scale-95"
                    aria-label="Send message to start demo"
                  >
                    <Send size={16} strokeWidth={2} aria-hidden />
                  </button>
                </>
              ) : (
                <div className="h-8 w-full rounded-full bg-white px-3 text-[12px] leading-8 text-black/35">
                  Message
                </div>
              )}
            </div>

            {/* STK modal — dark overlay inside phone */}
            {stkOpen ? (
              <div
                className="absolute inset-0 z-30 flex flex-col justify-end bg-black/62 backdrop-blur-[1px]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="stk-title"
              >
                <div className="jp-loyalty-modal-inner mx-2 mb-2 rounded-xl bg-white p-3 shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-black/8 pb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e8f5e9] text-xs font-bold text-[#2e7d32]">
                      M-Pesa
                    </div>
                    <div className="min-w-0 flex-1">
                      <div id="stk-title" className="text-[13px] font-semibold text-black/90">
                        STK Push sent
                      </div>
                      <div className="text-[10px] text-black/55">Check your phone · enter PIN to pay</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1.5 font-mono text-[11px] text-black/72">
                    <div className="flex justify-between gap-2">
                      <span>Pay to</span>
                      <span className="text-right text-black/88">{businessName}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Amount</span>
                      <span className="tabular-nums font-semibold text-black">{formatKes(stkAmountKes)}</span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span>Phone</span>
                      <span className="tabular-nums text-black/88">{mpesaMasked}</span>
                    </div>
                  </div>
                  <p className="mb-0 mt-2 rounded bg-paper-2 px-2 py-1.5 text-center text-[9px] leading-snug text-black/50">
                    Demo only — no charge. Auto-confirms in a few seconds, or tap below.
                  </p>
                  <button
                    type="button"
                    onClick={confirmStkDemo}
                    className="mt-2 w-full rounded-lg border-2 border-brand-black bg-brand-yellow py-2.5 font-sans text-[12px] font-semibold text-brand-black"
                  >
                    Simulate PIN entered
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={replay}
          className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3 underline-offset-2 hover:text-ink hover:underline"
        >
          Replay demo
        </button>
        <p className="m-0 max-w-[260px] text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
          Demo UI · tap send to begin
        </p>
      </div>
    </div>
  );
}
