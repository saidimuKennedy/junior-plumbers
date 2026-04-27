import type { ElementType } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Drill, HardHat, Wrench, Zap } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { getOrderReceipt, type OrderReceiptLine } from "@/lib/data";

const lineIcons: Record<OrderReceiptLine["icon"], ElementType> = {
  drill: Drill,
  wrench: Wrench,
  zap: Zap,
  "hard-hat": HardHat,
};

type PageProps = { params: Promise<{ orderId: string }> };

export default async function OrderDetailPage({ params }: PageProps) {
  const { orderId } = await params;
  const receipt = getOrderReceipt(orderId);
  if (!receipt) notFound();

  return (
    <div className="mx-auto max-w-[880px]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/orders" className="t-bracket text-[11px] no-underline hover:opacity-90">
          ← BACK TO ORDERS
        </Link>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-outline btn-sm">
            PRINT
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            EMAIL
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            VIEW DELIVERY
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            REFUND
          </button>
        </div>
      </div>

      <article className="border border-border bg-surface px-9 py-9 shadow-1">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-6 border-b-2 border-rule pb-3.5">
          <div className="min-w-0 flex-1">
            <BracketLabel>{receipt.receiptBracket ?? "RECEIPT // PAID"}</BracketLabel>
            <h1 className="mt-2 font-serif text-[48px] font-semibold leading-none">{receipt.displayId}</h1>
            <p className="mt-1.5 font-mono text-[11px] text-ink-3">{receipt.issued}</p>
          </div>
          <Image
            src="/brand/logo-mark.svg"
            alt=""
            width={64}
            height={64}
            className="shrink-0 border-2 border-brand-black bg-brand-yellow"
          />
        </header>

        <div className="mb-7 grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Outlet</div>
            <div className="font-serif text-[18px] font-medium">{receipt.outlet}</div>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Cashier</div>
            <div className="font-serif text-[18px] font-medium">{receipt.cashier}</div>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Customer</div>
            <div className="font-serif text-[18px] font-medium">{receipt.customer}</div>
            <div className="mt-0.5 font-mono text-[11px] text-ink-3">{receipt.customerMeta}</div>
          </div>
          <div>
            <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Payment</div>
            <div className="font-serif text-[18px] font-medium">{receipt.payment}</div>
            <div className="mt-0.5 font-mono text-[11px] text-ink-3">{receipt.paymentMeta}</div>
          </div>
        </div>

        <BracketLabel className="!text-[10px]">LINE ITEMS</BracketLabel>

        <div className="mt-2.5">
          <div
            className="grid grid-cols-[64px_1fr_80px_120px_120px] gap-3 border-b-2 border-rule py-3 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3"
          >
            <span />
            <span>Item</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Unit</span>
            <span className="text-right">Subtotal</span>
          </div>
          {receipt.lines.map((line, i) => {
            const Icon = lineIcons[line.icon];
            return (
              <div
                key={`${line.sku}-${i}`}
                className="grid grid-cols-[64px_1fr_80px_120px_120px] items-center gap-3 border-b border-rule-soft py-3 last:border-0"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-rule-soft bg-paper-2">
                  <Icon size={24} strokeWidth={1.25} className="text-ink-2" />
                </div>
                <div>
                  <div className="font-semibold">{line.name}</div>
                  <div className="font-mono text-[11px] text-ink-3">SKU {line.sku}</div>
                </div>
                <div className="text-right font-mono text-[13px]">{line.qty}</div>
                <div className="text-right font-mono text-[13px]">{line.unit}</div>
                <div className="text-right font-serif text-[18px] font-semibold">{line.subtotal}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 border-t-2 border-rule pt-4">
          <div className="flex justify-between py-1.5 text-[14px]">
            <span className="text-ink-3">Subtotal</span>
            <span className="font-mono tabular-nums">{receipt.subtotal}</span>
          </div>
          {receipt.loyaltyDiscount != null && receipt.loyaltyDiscount !== "" && (
            <div className="flex justify-between py-1.5 text-[14px]">
              <span className="text-ink-3">Loyalty discount · 5%</span>
              <span className="font-mono tabular-nums text-success">{receipt.loyaltyDiscount}</span>
            </div>
          )}
          <div className="flex justify-between py-1.5 text-[14px]">
            <span className="text-ink-3">VAT 16%</span>
            <span className="font-mono tabular-nums">{receipt.vat}</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-rule-soft pt-3.5 font-serif text-[32px] font-semibold">
            <span>{receipt.totalLabel ?? "Total paid"}</span>
            <span className="tabular-nums">{receipt.total}</span>
          </div>
        </div>

        <div className="mt-7 border-t-2 border-rule pt-4">
          <span className="t-bracket text-[10px]">STATUS · TIMELINE</span>
          <ul className="mt-3 list-none p-0">
            {receipt.timeline.map((step, i) => (
              <li
                key={i}
                className="relative grid grid-cols-[24px_1fr_auto] gap-3 border-b border-rule-soft py-3.5 last:border-0"
              >
                {i < receipt.timeline.length - 1 && (
                  <div
                    className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-rule-soft"
                    style={{ top: i === 0 ? "14px" : 0 }}
                  />
                )}
                <span
                  className={`z-[1] mt-0.5 h-3.5 w-3.5 justify-self-center rounded-full border-2 border-brand-black
                    ${step.done ? "bg-brand-black" : step.active ? "bg-brand-yellow shadow-[0_0_0_4px_rgba(255,210,0,0.3)]" : "bg-surface"}`}
                />
                <div>
                  <div className="font-semibold">{step.title}</div>
                  <div className="mt-1 font-mono text-[11px] text-ink-3">{step.meta}</div>
                </div>
                <span className="font-mono text-[11px] text-ink-3">{step.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-7 border-t border-rule-soft pt-3.5 text-center font-serif text-[14px] italic text-ink-3">
          This receipt is verifiable. Visit juniorplumbers.co.ke/verify with code{" "}
          <span className="font-mono not-italic text-ink">{receipt.verifyCode}</span>
        </p>
      </article>
    </div>
  );
}
