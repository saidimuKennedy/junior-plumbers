"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, MessageCircle, Radio, ShoppingBag, Smartphone, Upload, Package } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { WhatsAppPhoneMock } from "@/components/whatsapp/WhatsAppPhoneMock";
import { WhatsAppInventoryUploadMock } from "@/components/whatsapp/WhatsAppInventoryUploadMock";

const customerFlow = [
  {
    step: "01",
    title: "Catalogue in inventory",
    body: "SKUs, price, and stock signals are mastered in the ops catalogue — same rows your managers edit today.",
    Icon: Database,
  },
  {
    step: "02",
    title: "CRM & channels",
    body: "Social, loyalty, and trade comms read the same product spine — no duplicate spreadsheets.",
    Icon: Radio,
  },
  {
    step: "03",
    title: "WhatsApp bot",
    body: "Customers browse a carousel, build a basket, and pay without leaving chat.",
    Icon: MessageCircle,
  },
  {
    step: "04",
    title: "Confirm & fulfil",
    body: "M-Pesa confirmation closes the loop; ops sees the order alongside POS and e-commerce.",
    Icon: ShoppingBag,
  },
] as const;

const uploadFlow = [
  {
    step: "01",
    title: "Snap a photo",
    body: "Manager takes a picture of any product using WhatsApp camera — no app switching needed.",
    Icon: Upload,
  },
  {
    step: "02",
    title: "Auto-extract details",
    body: "Bot scans image and suggests product name, SKU, category, and pricing using AI vision.",
    Icon: Database,
  },
  {
    step: "03",
    title: "Review & confirm",
    body: "Manager reviews extracted details, adjusts stock levels per outlet, and confirms upload.",
    Icon: Package,
  },
  {
    step: "04",
    title: "Live in inventory",
    body: "Product appears instantly in inventory with pink highlight — synced to POS, e-commerce, and trade desk.",
    Icon: Radio,
  },
] as const;

export default function WhatsAppPreviewPage() {
  const [activeTab, setActiveTab] = useState<"customer" | "upload">("customer");

  const flow = activeTab === "customer" ? customerFlow : uploadFlow;
  const isUpload = activeTab === "upload";

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b-2 border-rule pb-3.5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>GROWTH // WHATSAPP // PREVIEWS</BracketLabel>
          <h1 className="m-0 font-serif text-[32px] font-semibold leading-[1.05] sm:text-[36px]">
            Same inventory. In their pocket.
          </h1>
          <p className="m-0 max-w-xl text-[14px] leading-snug text-ink-2">
            Two-way WhatsApp integration: customers browse and buy, managers snap and upload — all wired to the same{" "}
            <Link href="/inventory" className="font-medium text-ink underline-offset-2 hover:underline">
              inventory spine
            </Link>.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 underline-offset-4 hover:text-ink hover:underline"
        >
          Back to deck <ArrowRight size={12} />
        </Link>
      </div>

      {/* Tab Selection */}
      <div className="mb-6 flex border-2 border-brand-black">
        <button
          type="button"
          onClick={() => setActiveTab("customer")}
          className={`flex-1 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${
            activeTab === "customer"
              ? "bg-brand-yellow text-brand-black"
              : "bg-surface text-ink-3 hover:bg-paper-2"
          }`}
        >
          <ShoppingBag size={14} className="inline mr-2" />
          Customer Commerce
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex-1 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors border-l-2 border-brand-black ${
            activeTab === "upload"
              ? "bg-brand-yellow text-brand-black"
              : "bg-surface text-ink-3 hover:bg-paper-2"
          }`}
        >
          <Upload size={14} className="inline mr-2" />
          Inventory Upload
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-start lg:gap-12">
        <div className="space-y-6">
          <div className={`flex items-center gap-3 border border-border px-4 py-3 ${isUpload ? 'bg-pink-50' : 'bg-paper-2'}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 border-brand-black ${isUpload ? 'bg-brand-black text-brand-yellow' : 'bg-brand-yellow text-brand-black'}`}>
              {isUpload ? <Upload size={20} strokeWidth={1.6} /> : <Smartphone size={20} strokeWidth={1.6} />}
            </div>
            <p className="m-0 text-[14px] leading-snug text-ink-2">
              <span className="font-semibold text-ink">{
                isUpload 
                  ? "Upload via chat." 
                  : "One spine."
              }</span>{" "}
              {isUpload
                ? "Managers add products by snapping photos — new items appear with pink highlight in inventory."
                : "Items you load or adjust in inventory stay consistent across outlets, CRM campaigns, and this WhatsApp experience."}
            </p>
          </div>

          <div className="space-y-3">
            {flow.map(({ step, title, body, Icon }) => (
              <div
                key={step}
                className={`grid grid-cols-[auto_1fr] gap-3 border border-border p-4 shadow-1 ${isUpload && step === "04" ? 'bg-pink-50 border-pink-200' : 'bg-surface'}`}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`flex h-10 w-10 items-center justify-center border-2 border-brand-black ${isUpload && step === "04" ? 'bg-brand-black text-brand-yellow' : 'bg-brand-yellow text-brand-black'}`}>
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">{step}</span>
                </div>
                <div>
                  <h2 className="m-0 font-sans text-[15px] font-semibold text-ink">{title}</h2>
                  <p className="mt-1.5 mb-0 text-[13px] leading-snug text-ink-2">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Link to inventory upload page */}
          {isUpload && (
            <div className="border-2 border-brand-black bg-brand-yellow px-4 py-3 flex items-center justify-between">
              <div>
                <div className="font-semibold text-[14px]">Need to upload multiple items?</div>
                <div className="font-mono text-[11px] text-ink-3">Use the batch upload form for faster entry</div>
              </div>
              <Link href="/inventory/upload" className="btn btn-primary btn-sm no-underline">
                Open Upload Page
              </Link>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center lg:sticky lg:top-24">
          {activeTab === "customer" ? <WhatsAppPhoneMock /> : <WhatsAppInventoryUploadMock />}
        </div>
      </div>
    </>
  );
}
