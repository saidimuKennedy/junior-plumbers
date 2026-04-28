import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, MessageCircle, Radio, ShoppingBag, Smartphone } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { WhatsAppPhoneMock } from "@/components/whatsapp/WhatsAppPhoneMock";

export const metadata: Metadata = {
  title: "WhatsApp commerce · Junior Plumbers",
  description:
    "Preview: inventory-backed catalogue in WhatsApp — browse, M-Pesa STK, and sale confirmation on one stack.",
};

const flow = [
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

export default function WhatsAppPreviewPage() {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4 border-b-2 border-rule pb-3.5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>GROWTH // WHATSAPP // COMMERCE PREVIEW</BracketLabel>
          <h1 className="m-0 font-serif text-[32px] font-semibold leading-[1.05] sm:text-[36px]">
            Same inventory. In their pocket.
          </h1>
          <p className="m-0 max-w-xl text-[14px] leading-snug text-ink-2">
            Illustration-only preview: how a trade customer moves from catalogue carousel to M-Pesa STK and a
            confirmed sale — wired to the same SKUs as{" "}
            <Link href="/inventory" className="font-medium text-ink underline-offset-2 hover:underline">
              inventory
            </Link>{" "}
            and{" "}
            <Link href="/social" className="font-medium text-ink underline-offset-2 hover:underline">
              CRM surfaces
            </Link>
            .
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 underline-offset-4 hover:text-ink hover:underline"
        >
          Back to deck <ArrowRight size={12} />
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(260px,340px)] lg:items-start lg:gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border border-border bg-paper-2 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-brand-black bg-brand-yellow text-brand-black">
              <Smartphone size={20} strokeWidth={1.6} />
            </div>
            <p className="m-0 text-[14px] leading-snug text-ink-2">
              <span className="font-semibold text-ink">One spine.</span> Items you load or adjust in inventory
              stay consistent across outlets, CRM campaigns, and this WhatsApp experience.
            </p>
          </div>

          <div className="space-y-3">
            {flow.map(({ step, title, body, Icon }) => (
              <div
                key={step}
                className="grid grid-cols-[auto_1fr] gap-3 border border-border bg-surface p-4 shadow-1"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-black bg-brand-yellow text-brand-black">
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
        </div>

        <div className="flex flex-col items-center lg:sticky lg:top-24">
          <WhatsAppPhoneMock />
        </div>
      </div>
    </>
  );
}
