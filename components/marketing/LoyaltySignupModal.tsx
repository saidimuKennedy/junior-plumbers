"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import confetti from "canvas-confetti";
import { Sparkles, X, Crown, Gift } from "lucide-react";
import {
  LOYALTY_PLATINUM_PACK,
  LOYALTY_STORAGE_DISMISS_SESSION,
  LOYALTY_STORAGE_ONBOARDED,
  LOYALTY_WELCOME_POINTS,
} from "@/lib/loyalty-public";

type Step = "welcome" | "form" | "celebration" | "platinum" | "alreadyMember";

function fireCelebration() {
  const gold = ["#FFD200", "#FFF4B8", "#E6BC00"];
  const burst = (originX: number) => {
    void confetti({
      particleCount: 90,
      spread: 62,
      startVelocity: 38,
      origin: { x: originX, y: 0.55 },
      colors: [...gold, "#0A0A0A", "#FAF8F4"],
      ticks: 220,
      gravity: 0.9,
      scalar: 1.05,
    });
  };
  burst(0.25);
  window.setTimeout(() => burst(0.75), 180);
  window.setTimeout(() => {
    void confetti({
      particleCount: 40,
      spread: 100,
      origin: { x: 0.5, y: 0.35 },
      colors: gold,
      shapes: ["circle"],
      scalar: 0.9,
    });
  }, 320);
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoined?: () => void;
};

export function LoyaltySignupModal({ open, onOpenChange, onJoined }: Props) {
  const pathname = usePathname();
  const [step, setStep] = useState<Step>("welcome");
  const shopAutoScheduled = useRef(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPts, setDisplayPts] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const resetForClose = useCallback(() => {
    setStep("welcome");
    setName("");
    setPhone("");
    setDisplayPts(0);
  }, []);

  const handleClose = useCallback(() => {
    if (step !== "celebration" && step !== "platinum") {
      try {
        sessionStorage.setItem(LOYALTY_STORAGE_DISMISS_SESSION, "1");
      } catch {
        /* ignore */
      }
    }
    resetForClose();
    onOpenChange(false);
  }, [onOpenChange, resetForClose, step]);

  const autoTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (pathname !== "/shop" || typeof window === "undefined") {
      shopAutoScheduled.current = false;
      return;
    }
    if (shopAutoScheduled.current) return;
    try {
      if (localStorage.getItem(LOYALTY_STORAGE_ONBOARDED) === "1") return;
      if (sessionStorage.getItem(LOYALTY_STORAGE_DISMISS_SESSION) === "1") return;
    } catch {
      return;
    }
    shopAutoScheduled.current = true;
    autoTimerRef.current = window.setTimeout(() => onOpenChange(true), 1400);
    return () => {
      if (autoTimerRef.current != null) window.clearTimeout(autoTimerRef.current);
    };
  }, [pathname, onOpenChange]);

  useLayoutEffect(() => {
    if (!open) return;
    try {
      if (localStorage.getItem(LOYALTY_STORAGE_ONBOARDED) === "1") {
        setStep("alreadyMember");
        return;
      }
    } catch {
      /* ignore */
    }
    setStep("welcome");
  }, [open]);

  useEffect(() => {
    if (step !== "celebration" || reducedMotion.current) {
      if (step === "celebration" && reducedMotion.current) setDisplayPts(LOYALTY_WELCOME_POINTS);
      return;
    }
    fireCelebration();
    const duration = 900;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplayPts(Math.round(LOYALTY_WELCOME_POINTS * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const markJoined = () => {
    try {
      localStorage.setItem(LOYALTY_STORAGE_ONBOARDED, "1");
    } catch {
      /* ignore */
    }
    onJoined?.();
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    markJoined();
    setStep("celebration");
  };

  const finishAndSave = () => setStep("platinum");

  const skipPlatinum = () => {
    handleClose();
  };

  const skipCelebrationEarly = () => {
    handleClose();
  };

  const addPlatinumMock = () => {
    void confetti({
      particleCount: 55,
      spread: 55,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#FFD200", "#C0C0C0", "#0A0A0A"],
    });
    handleClose();
  };

  const openPlatinumFromMember = () => setStep("platinum");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 p-4 opacity-100 transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="loyalty-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-brand-black/75 backdrop-blur-sm"
        aria-label="Close"
        onClick={handleClose}
      />
      <div className="jp-loyalty-modal-inner relative max-h-[92vh] w-full max-w-[440px] overflow-y-auto border-[3px] border-brand-yellow bg-paper shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border-2 border-brand-black bg-surface text-ink hover:bg-paper-2"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {step === "alreadyMember" && (
          <div className="relative px-6 pb-8 pt-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-brand-black bg-brand-yellow shadow-1">
              <Sparkles size={28} strokeWidth={1.5} className="text-brand-black" />
            </div>
            <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">You&apos;re in the club</p>
            <h2 id="loyalty-modal-title" className="mt-2 font-serif text-[1.65rem] font-semibold leading-tight">
              Welcome back — your points apply at checkout
            </h2>
            <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-2">
              Stack more with a one-time Platinum boost, or keep shopping with your balance.
            </p>
            <button type="button" className="btn btn-primary btn-lg mt-8 w-full" onClick={openPlatinumFromMember}>
              See Platinum boost
            </button>
            <button type="button" className="mt-3 w-full font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 underline-offset-2 hover:underline" onClick={handleClose}>
              Close
            </button>
          </div>
        )}

        {step === "welcome" && (
          <div className="relative overflow-hidden px-6 pb-8 pt-10 text-center">
            <div className="jp-loyalty-shimmer absolute inset-0 opacity-40" aria-hidden />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-brand-black bg-brand-yellow shadow-1">
                <Gift size={28} strokeWidth={1.5} className="text-brand-black" />
              </div>
              <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3">
                Parts &amp; Labour Club
              </p>
              <h2 id="loyalty-modal-title" className="mt-2 font-serif text-[2rem] font-semibold leading-tight tracking-tight">
                <span className="jp-text-sparkle text-brand-black">60 points</span>
                <span className="text-ink">, on the house</span>
              </h2>
              <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-2">
                New members only — join in one step and your welcome balance posts instantly at checkout.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-lg mt-8 w-full shadow-[0_0_0_4px_rgba(255,210,0,0.35)]"
                onClick={() => setStep("form")}
              >
                Claim my welcome pack
              </button>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                Free forever · redeem at all six outlets
              </p>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={submitForm} className="relative px-6 pb-8 pt-10">
            <div className="mb-6 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-black">
              <Sparkles size={16} className="text-brand-yellow" />
              Almost there
            </div>
            <h2 className="font-serif text-[1.65rem] font-semibold leading-tight">Where should we send rewards?</h2>
            <label className="mt-6 block text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Full name</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 font-sans text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow"
                placeholder="e.g. Mary Wanjiku"
                autoComplete="name"
              />
            </label>
            <label className="mt-4 block text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">Mobile (M-Pesa)</span>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 font-sans text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow"
                placeholder="07XX XXX XXX"
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <label className="mt-4 flex cursor-pointer items-start gap-2 text-left">
              <input type="checkbox" required className="mt-1 h-4 w-4 border-2 border-brand-black" defaultChecked />
              <span className="text-[13px] leading-snug text-ink-2">
                I agree to programme rules &amp; promo SMS (you can opt out anytime).
              </span>
            </label>
            <button type="submit" className="btn btn-secondary btn-lg mt-8 w-full">
              Complete &amp; credit {LOYALTY_WELCOME_POINTS} points
            </button>
          </form>
        )}

        {step === "celebration" && (
          <div className="relative px-6 pb-10 pt-12 text-center">
            <div className="jp-loyalty-burst mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-brand-yellow bg-brand-black font-serif text-[3.25rem] font-bold text-brand-yellow shadow-[0_0_40px_rgba(255,210,0,0.55)]">
              +{displayPts}
            </div>
            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-success">Credited instantly</p>
            <h2 className="mt-2 font-serif text-[1.85rem] font-semibold leading-tight">You&apos;re in, {name.trim().split(/\s+/)[0] || "member"}!</h2>
            <p className="mt-2 font-serif text-[1.05rem] text-ink-2">
              Show this number at the till or online — your balance is live.
            </p>
            <button type="button" className="btn btn-primary btn-lg mt-8 w-full" onClick={finishAndSave}>
              See Platinum boost
            </button>
            <button
              type="button"
              className="mt-3 w-full font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3 underline-offset-2 hover:underline"
              onClick={skipCelebrationEarly}
            >
              Maybe later
            </button>
          </div>
        )}

        {step === "platinum" && (
          <div className="relative bg-brand-black px-6 pb-8 pt-10 text-paper">
            <div className="absolute right-0 top-0 h-32 w-32 bg-[radial-gradient(circle,rgba(255,210,0,0.35),transparent_70%)]" aria-hidden />
            <div className="relative flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brand-yellow">
              <Crown size={18} />
              Platinum boost
            </div>
            <h2 className="relative mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-paper">
              Stack <span className="text-brand-yellow">+{LOYALTY_PLATINUM_PACK.bonusPoints} bonus points</span> today
            </h2>
            <p className="relative mt-3 text-[14px] leading-relaxed text-border">{LOYALTY_PLATINUM_PACK.blurb}</p>
            <ul className="relative mt-4 space-y-2 border-l-2 border-brand-yellow pl-4 text-[13px] text-border">
              <li>Instant ledger credit — no waiting period</li>
              <li>Eligible for trade morning pricing</li>
              <li>One-time add-on · stacks with your {LOYALTY_WELCOME_POINTS} welcome pts</li>
            </ul>
            <div className="relative mt-6 flex items-baseline justify-center gap-2 border-2 border-brand-yellow bg-brand-black-soft px-4 py-3">
              <span className="font-serif text-[2rem] font-semibold text-brand-yellow">
                KES {LOYALTY_PLATINUM_PACK.priceKes.toLocaleString("en-KE")}
              </span>
              <span className="font-mono text-[11px] uppercase text-border">one payment</span>
            </div>
            <button type="button" className="btn btn-primary btn-lg relative mt-6 w-full" onClick={addPlatinumMock}>
              Add Platinum pack to cart
            </button>
            <button
              type="button"
              className="relative mt-3 w-full py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-border hover:text-paper"
              onClick={skipPlatinum}
            >
              No thanks — I&apos;ll shop with my {LOYALTY_WELCOME_POINTS} pts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
