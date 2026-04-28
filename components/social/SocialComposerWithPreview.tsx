"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, Globe, Heart, MessageCircle, MoreHorizontal, Music, Send, Share2 } from "lucide-react";
import { useState } from "react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { WhatsAppPhoneMock } from "@/components/whatsapp/WhatsAppPhoneMock";
import { featuredProducts } from "@/lib/data";

const DEFAULT_CAPTION =
  "Drilling through brick or hanging a frame — the 12V handles both. KES 4,850 today only at any of our six outlets. Tag a friend who's been talking about that DIY project for months.";

type PreviewTab = "ig" | "fb" | "wa" | "tt";

const previewTabs: { id: PreviewTab; label: string }[] = [
  { id: "ig", label: "Instagram" },
  { id: "fb", label: "Facebook" },
  { id: "wa", label: "WhatsApp" },
  { id: "tt", label: "TikTok" },
];

export function SocialComposerWithPreview() {
  const [caption, setCaption] = useState(DEFAULT_CAPTION);
  const [previewTab, setPreviewTab] = useState<PreviewTab>("ig");
  const [dest, setDest] = useState({ ig: true, fb: true, wa: false, tt: false });

  const hero = featuredProducts[0];
  const captionSnippet = caption.length > 120 ? `${caption.slice(0, 120).trim()}…` : caption;

  const toggleDest = (key: keyof typeof dest) => {
    setDest((d) => ({ ...d, [key]: !d[key] }));
  };

  return (
    <div className="card">
      <div className="card-head">
        <BracketLabel>COMPOSER // QUICK POST</BracketLabel>
        <span className="t-meta">DRAFTING</span>
      </div>

      <div
        className={`grid gap-6 px-5 pb-5 items-start ${
          previewTab === "wa"
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)]"
            : "lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)]"
        }`}
      >
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
              Caption · serif italic preview
            </span>
            <textarea
              className="input font-serif italic text-[16px]"
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
            {(
              [
                ["ig", "Instagram"],
                ["fb", "Facebook"],
                ["wa", "WhatsApp"],
                ["tt", "TikTok"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={dest[key]}
                  onChange={() => toggleDest(key)}
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-outline btn-sm">
              SAVE DRAFT
            </button>
            <button type="button" className="btn btn-secondary btn-sm">
              SCHEDULE
            </button>
            <button type="button" className="btn btn-primary btn-sm">
              PUBLISH NOW →
            </button>
          </div>
        </div>

        {/* Preview column */}
        <div className="flex min-w-0 flex-col gap-2 border border-border bg-paper-2/50 p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <BracketLabel className="!text-[10px]">PREVIEW · CHANNEL</BracketLabel>
            <Link
              href="/whatsapp"
              className="font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3 underline-offset-2 hover:text-ink hover:underline"
            >
              Full commerce demo →
            </Link>
          </div>

          <div className="flex flex-wrap gap-1 border border-border bg-surface p-1">
            {previewTabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPreviewTab(id)}
                className={`flex-1 min-w-[72px] px-2 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors ${
                  previewTab === id
                    ? "bg-brand-black text-brand-yellow"
                    : "bg-transparent text-ink-2 hover:bg-paper-2"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {previewTab === "ig" ? (
            <div className="border-2 border-brand-black bg-surface shadow-1">
              <div className="flex items-center gap-2 border-b border-rule-soft px-3 py-2">
                <div className="avatar !h-9 !w-9 text-[11px]">JP</div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[13px] leading-tight">juniorplumbers_ke</div>
                  <div className="font-mono text-[10px] text-ink-3">Sponsored · Nairobi</div>
                </div>
                <MoreHorizontal size={18} className="shrink-0 text-ink-3" aria-hidden />
              </div>
              <div className="relative aspect-square w-full bg-paper-2">
                <Image
                  src={hero.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 90vw, 320px"
                  unoptimized={hero.image.includes("istockphoto")}
                />
              </div>
              <div className="flex items-center justify-between border-b border-rule-soft px-3 py-2">
                <div className="flex gap-3 text-ink">
                  <Heart size={22} strokeWidth={1.5} aria-hidden />
                  <MessageCircle size={22} strokeWidth={1.5} aria-hidden />
                  <Send size={22} strokeWidth={1.5} className="-rotate-12" aria-hidden />
                </div>
                <Share2 size={20} strokeWidth={1.5} aria-hidden />
              </div>
              <div className="px-3 pb-3 pt-2">
                <p className="mb-0 font-serif text-[13px] italic leading-snug text-ink-2">
                  <span className="font-sans font-semibold not-italic text-ink">juniorplumbers_ke </span>
                  {captionSnippet}
                </p>
                <p className="mb-0 mt-1.5 font-mono text-[10px] text-ink-3">ING-CD45-12V · KES 4,850</p>
              </div>
            </div>
          ) : null}

          {previewTab === "fb" ? (
            <div className="border border-border bg-surface shadow-1">
              <div className="flex items-start gap-2.5 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-brand-black bg-info text-white">
                  <Globe size={20} strokeWidth={1.5} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-[14px]">Junior Plumbers</span>
                    <span className="font-mono text-[11px] text-ink-3">· 2h · 🌍</span>
                  </div>
                  <p className="mb-0 mt-1 font-serif text-[14px] italic leading-snug text-ink-2">{captionSnippet}</p>
                </div>
              </div>
              <div className="relative aspect-[1.91/1] w-full bg-paper-2">
                <Image
                  src={hero.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 90vw, 360px"
                  unoptimized={hero.image.includes("istockphoto")}
                />
              </div>
              <div className="flex items-center justify-between border-t border-rule-soft px-3 py-2 font-mono text-[11px] text-ink-3">
                <span>Like · Comment · Share</span>
                <span>124 reactions</span>
              </div>
            </div>
          ) : null}

          {previewTab === "tt" ? (
            <div className="mx-auto w-full max-w-[220px]">
              <div className="relative aspect-[9/16] w-full overflow-hidden border-2 border-brand-black bg-brand-black shadow-2">
                <Image
                  src={hero.image}
                  alt=""
                  fill
                  className="object-cover opacity-90"
                  sizes="220px"
                  unoptimized={hero.image.includes("istockphoto")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />
                <div className="absolute right-2 bottom-24 flex flex-col items-center gap-3 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/25">
                    <Music size={18} aria-hidden />
                  </div>
                  <AtSign size={18} aria-hidden />
                  <Heart size={20} aria-hidden />
                </div>
                <div className="absolute right-2 bottom-4 left-2">
                  <p className="mb-0 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/90">
                    @juniorplumbers_ke
                  </p>
                  <p className="mb-0 mt-1 line-clamp-4 font-sans text-[12px] leading-snug text-white">
                    {captionSnippet}
                  </p>
                </div>
                <div className="absolute top-2 left-2 font-mono text-[10px] text-white/80">LIVE PREVIEW</div>
              </div>
            </div>
          ) : null}

          {previewTab === "wa" ? (
            <div className="flex justify-center pt-1">
              <WhatsAppPhoneMock />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
