"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, MoreVertical, Phone, Video, Send, Camera, CheckCheck, Plus } from "lucide-react";

function ChatTime() {
  return <span className="text-[10px] text-black/45">{new Date().toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit", hour12: false })}</span>;
}

const DELAY_AFTER_SNAP_MS = 800;
const DELAY_AFTER_DETAILS_MS = 1_200;
const TYPING_MS = 1_400;
const UPLOAD_SUCCESS_MS = 1_800;

type Phase = "intro" | "photo" | "typing1" | "details" | "confirm" | "typing2" | "success";

const OUTLETS = ["Kiserian", "Rongai", "Ongata", "Ngong", "Karen", "Magadi"];
const NEW_ITEMS_KEY = "jp_inventory_new_items";

export function WhatsAppInventoryUploadMock() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState({
    name: "Ingco Cordless Drill 18V",
    sku: "ING-CD18V-2024",
    price: 6200,
    category: "Power tools",
    stocks: [12, 8, 6, 4, 10, 3],
  });

  const chatRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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

  // Define saveToInventory before useEffect that uses it
  const saveToInventory = useCallback(() => {
    // Save uploaded item to localStorage for inventory page to display
    const newItem = {
      id: `wa-${Date.now()}`,
      name: productDetails.name,
      sku: productDetails.sku,
      category: productDetails.category,
      price: productDetails.price,
      icon: "drill", // Default icon
      stocks: productDetails.stocks,
      isNew: true,
    };

    try {
      const existing = JSON.parse(localStorage.getItem(NEW_ITEMS_KEY) || "[]");
      localStorage.setItem(NEW_ITEMS_KEY, JSON.stringify([newItem, ...existing]));
    } catch {
      // ignore
    }
  }, [productDetails]);

  useEffect(() => {
    scrollChatDown();
  }, [phase, scrollChatDown]);

  useEffect(() => {
    clearAllTimers();

    if (phase === "photo") {
      pushTimer(() => {
        // Simulate camera capture with a product image
        setCapturedImage("https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80");
        pushTimer(() => setPhase("typing1"), DELAY_AFTER_SNAP_MS);
      }, 600);
    } else if (phase === "typing1") {
      pushTimer(() => setPhase("details"), TYPING_MS);
    } else if (phase === "confirm") {
      pushTimer(() => setPhase("typing2"), DELAY_AFTER_DETAILS_MS);
    } else if (phase === "typing2") {
      pushTimer(() => {
        setPhase("success");
        saveToInventory();
      }, TYPING_MS);
    }

    return clearAllTimers;
  }, [phase, pushTimer, clearAllTimers, saveToInventory]);

  const startUpload = () => {
    if (phase !== "intro") return;
    setPhase("photo");
  };

  const confirmDetails = () => {
    if (phase !== "details") return;
    setPhase("confirm");
  };

  const replay = () => {
    clearAllTimers();
    setCapturedImage(null);
    setPhase("intro");
  };

  const showPhoto = phase !== "intro";
  const showTyping1 = phase === "typing1";
  const showDetails = phase === "details" || phase === "confirm" || phase === "typing2" || phase === "success";
  const showConfirm = phase === "confirm" || phase === "typing2" || phase === "success";
  const showTyping2 = phase === "typing2";
  const showSuccess = phase === "success";

  const formatKes = (n: number) => `KES ${n.toLocaleString()}`;

  return (
    <div className="mx-auto w-full max-w-[280px]" aria-label="Animated WhatsApp inventory upload preview (demo only)">
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
                <div className="truncate text-[14px] font-semibold leading-tight">Junior Plumbers Bot</div>
                <div className="truncate text-[11px] text-white/80">Inventory Manager</div>
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

              {/* Bot welcome */}
              <div className="jp-wa-fade-up max-w-[92%]">
                <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                  <p className="m-0 text-[13px] leading-snug text-black/88">
                    👋 Send me a photo of any product to add it to inventory. I&apos;ll extract details and ask you to confirm before saving.
                  </p>
                  <div className="mt-1 flex justify-end">
                    <ChatTime />
                  </div>
                </div>
              </div>

              {showPhoto && capturedImage && (
                <div className="jp-wa-fade-up flex justify-end">
                  <div className="max-w-[70%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-1 py-1 shadow-sm">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                      <Image
                        src={capturedImage}
                        alt="Product photo"
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-1 px-1">
                      <ChatTime />
                      <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />
                    </div>
                  </div>
                </div>
              )}

              {showTyping1 && (
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
              )}

              {showDetails && (
                <div className="jp-wa-fade-up max-w-[95%]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                    <p className="m-0 text-[13px] leading-snug text-black/88">
                      📸 Got it! I&apos;ve scanned the image. Please review and confirm the details:
                    </p>
                    
                    <div className="mt-2 border-t border-black/10 pt-2">
                      <div className="grid grid-cols-2 gap-2 text-[12px]">
                        <div>
                          <span className="text-black/50">Name:</span>
                          <div className="font-semibold text-black/88">{productDetails.name}</div>
                        </div>
                        <div>
                          <span className="text-black/50">SKU:</span>
                          <div className="font-mono text-[11px] text-black/88">{productDetails.sku}</div>
                        </div>
                        <div>
                          <span className="text-black/50">Category:</span>
                          <div className="text-black/88">{productDetails.category}</div>
                        </div>
                        <div>
                          <span className="text-black/50">Price:</span>
                          <div className="font-serif font-semibold text-black/88">{formatKes(productDetails.price)}</div>
                        </div>
                      </div>
                      
                      <div className="mt-2 border-t border-black/10 pt-2">
                        <span className="text-[11px] text-black/50">Stock by outlet:</span>
                        <div className="mt-1 grid grid-cols-3 gap-1 text-[10px]">
                          {OUTLETS.map((outlet, i) => (
                            <div key={outlet} className="flex justify-between px-1 py-0.5 bg-black/5 rounded">
                              <span className="text-black/60">{outlet.slice(0, 3)}</span>
                              <span className="font-mono font-semibold text-black/88">{productDetails.stocks[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {phase === "details" && (
                      <button
                        type="button"
                        onClick={confirmDetails}
                        className="mt-2.5 w-full rounded-md border-0 bg-[#008069] py-2.5 font-sans text-[13px] font-semibold text-white shadow-sm"
                      >
                        ✅ Confirm & Upload to Inventory
                      </button>
                    )}
                    
                    <div className="mt-1 flex justify-end">
                      <ChatTime />
                    </div>
                  </div>
                </div>
              )}

              {showConfirm && !showTyping2 && !showSuccess && (
                <div className="jp-wa-fade-up flex justify-end">
                  <div className="max-w-[92%] rounded-lg rounded-tr-sm bg-[#d9fdd3] px-2.5 py-2 shadow-sm">
                    <p className="m-0 text-[13px] leading-snug text-black/88">✅ Confirm upload</p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <ChatTime />
                      <CheckCheck size={14} className="text-[#53bdeb]" aria-hidden />
                    </div>
                  </div>
                </div>
              )}

              {showTyping2 && (
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
              )}

              {showSuccess && (
                <div className="jp-wa-fade-up max-w-[95%]">
                  <div className="rounded-lg rounded-tl-sm bg-white px-2.5 py-2 shadow-sm">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] text-[#2e7d32]">
                        ✓
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="m-0 text-[13px] font-semibold text-black/88">Uploaded to inventory!</p>
                        <p className="mt-1 text-[12px] leading-snug text-black/70">
                          <span className="font-semibold">{productDetails.name}</span> is now live in the catalogue with SKU{" "}
                          <span className="font-mono text-[11px] text-black/88">{productDetails.sku}</span>.
                          Available across {OUTLETS.length} outlets.
                        </p>
                        <p className="mt-2 text-[11px] text-black/50 bg-pink-100 px-2 py-1 rounded">
                          🎀 Highlighted in pink on inventory table
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 flex justify-end">
                      <ChatTime />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 border-t border-black/6 bg-[#f0f0f0] px-2 py-1.5">
              {phase === "intro" ? (
                <>
                  <div className="h-8 min-w-0 flex-1 truncate rounded-full bg-white px-3 text-[11px] leading-8 text-black/55 flex items-center gap-2">
                    <Camera size={14} className="text-black/40" />
                    Tap camera to snap product...
                  </div>
                  <button
                    type="button"
                    onClick={startUpload}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008069] text-white shadow-sm transition-transform active:scale-95"
                    aria-label="Take photo to start upload"
                  >
                    <Camera size={18} strokeWidth={2} aria-hidden />
                  </button>
                </>
              ) : showSuccess ? (
                <>
                  <div className="h-8 min-w-0 flex-1 truncate rounded-full bg-white px-3 text-[11px] leading-8 text-black/35 flex items-center gap-2">
                    <Plus size={14} className="text-black/40" />
                    Upload another product...
                  </div>
                  <button
                    type="button"
                    onClick={replay}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-black shadow-sm transition-transform active:scale-95"
                    aria-label="Upload another"
                  >
                    <Plus size={18} strokeWidth={2} aria-hidden />
                  </button>
                </>
              ) : (
                <>
                  <div className="h-8 w-full rounded-full bg-white px-3 text-[12px] leading-8 text-black/35 flex items-center gap-2">
                    <Camera size={14} className="text-black/30" />
                    Message
                  </div>
                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008069]/30 text-white/50 cursor-not-allowed"
                    disabled
                  >
                    <Send size={16} strokeWidth={2} aria-hidden />
                  </button>
                </>
              )}
            </div>
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
          Demo UI · tap camera to begin
        </p>
      </div>
    </div>
  );
}
