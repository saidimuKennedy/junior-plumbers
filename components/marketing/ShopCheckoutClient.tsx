"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Banknote, Building2, Check, Smartphone } from "lucide-react";
import { useStorefrontCart } from "@/components/marketing/StorefrontCartContext";
import {
  buildInvoiceHtml,
  buildReceiptHtml,
  generateWebOrderId,
  paymentMethodLabel,
  triggerHtmlDownload,
  type ShopPaymentMethod,
  type StorefrontOrder,
} from "@/lib/order-documents";

function fmtKes(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

const PAYMENTS: { id: ShopPaymentMethod; label: string; sub: string; icon: typeof Banknote }[] = [
  { id: "cash", label: "Cash", sub: "Pay at counter or on delivery", icon: Banknote },
  { id: "mpesa", label: "M-Pesa", sub: "STK push or paybill (demo)", icon: Smartphone },
  { id: "equity", label: "Equity", sub: "EazzyPay or bank transfer", icon: Building2 },
];

export function ShopCheckoutClient() {
  const { lines, setLineQty, removeLine, subtotal, clearCart, hydrated } = useStorefrontCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<ShopPaymentMethod>("mpesa");
  const [payError, setPayError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<StorefrontOrder | null>(null);
  const celebratedRef = useRef(false);

  const placeOrder = useCallback(() => {
    setPayError(null);
    if (lines.length === 0) {
      setPayError("Your cart is empty.");
      return;
    }
    if (paymentMethod === "mpesa") {
      const digits = customerPhone.replace(/\D/g, "");
      if (digits.length < 9) {
        setPayError("Enter a valid mobile number for M-Pesa (e.g. 07XX XXX XXX).");
        return;
      }
    }

    const order: StorefrontOrder = {
      id: generateWebOrderId(),
      createdAtIso: new Date().toISOString(),
      lines: lines.map((l) => ({
        sku: l.sku,
        name: l.name,
        price: l.price,
        qty: l.qty,
      })),
      subtotal,
      total: subtotal,
      paymentMethod,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
    };
    setCompletedOrder(order);
    clearCart();
  }, [lines, subtotal, paymentMethod, customerName, customerPhone, clearCart]);

  useEffect(() => {
    if (!completedOrder || celebratedRef.current) return;
    celebratedRef.current = true;
    const gold = ["#FFD200", "#FFF4B8", "#0A0A0A"];
    void confetti({
      particleCount: 120,
      spread: 70,
      origin: { x: 0.5, y: 0.2 },
      colors: gold,
      ticks: 250,
    });
    window.setTimeout(() => {
      void confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.25, y: 0.35 },
        colors: gold,
        scalar: 0.9,
      });
      void confetti({
        particleCount: 60,
        spread: 100,
        origin: { x: 0.75, y: 0.35 },
        colors: gold,
        scalar: 0.9,
      });
    }, 200);
  }, [completedOrder]);

  const downloadInvoice = useCallback(() => {
    if (!completedOrder) return;
    triggerHtmlDownload(
      `Junior-Plumbers-Invoice-${completedOrder.id}.html`,
      buildInvoiceHtml(completedOrder)
    );
  }, [completedOrder]);

  const downloadReceipt = useCallback(() => {
    if (!completedOrder) return;
    triggerHtmlDownload(
      `Junior-Plumbers-Receipt-${completedOrder.id}.html`,
      buildReceiptHtml(completedOrder)
    );
  }, [completedOrder]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-16 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-3">Loading cart…</p>
      </div>
    );
  }

  if (completedOrder) {
    const o = completedOrder;
    return (
      <div className="mx-auto max-w-[960px] px-6 py-12 md:px-8 md:py-16">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b-2 border-rule pb-8">
          <div>
            <p className="m-0 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-success">
              <Check size={16} strokeWidth={2.5} aria-hidden />
              Payment successful
            </p>
            <h1 className="mt-3 font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight">
              Order {o.id}
            </h1>
            <p className="mt-2 max-w-[48ch] font-serif text-[1.05rem] text-ink-2">
              {paymentMethodLabel(o.paymentMethod)} · {fmtKes(o.total)} ·{" "}
              {new Date(o.createdAtIso).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={downloadInvoice}>
              Download invoice
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={downloadReceipt}>
              Download receipt
            </button>
            <Link href="/shop#promos" className="btn btn-outline btn-sm no-underline">
              Continue shopping
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="border-2 border-rule bg-surface p-5 shadow-1">
            <h2 className="mt-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-3">Invoice preview</h2>
            <p className="font-serif text-[15px] font-semibold">Junior Plumbers Ltd</p>
            <p className="mt-1 font-mono text-[11px] text-ink-3">PIN (demo) · P051234567X</p>
            <table className="mt-4 w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-rule-soft font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">
                  <th className="py-2 text-left font-semibold">Item</th>
                  <th className="py-2 text-right font-semibold">Qty</th>
                  <th className="py-2 text-right font-semibold">Line</th>
                </tr>
              </thead>
              <tbody>
                {o.lines.map((l) => (
                  <tr key={l.sku} className="border-b border-rule-soft">
                    <td className="py-2 pr-2">
                      <div className="font-medium">{l.name}</div>
                      <div className="font-mono text-[10px] text-ink-3">{l.sku}</div>
                    </td>
                    <td className="py-2 text-right tabular-nums">{l.qty}</td>
                    <td className="py-2 text-right tabular-nums font-medium">{fmtKes(l.price * l.qty)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between border-t-2 border-brand-black pt-3 font-serif text-[1.1rem] font-semibold">
              <span>Total</span>
              <span>{fmtKes(o.total)}</span>
            </div>
          </article>

          <article className="border-2 border-brand-black bg-brand-black p-5 text-paper shadow-1">
            <h2 className="mt-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-yellow">Receipt preview</h2>
            <p className="font-serif text-[15px] font-semibold text-paper">Thank you</p>
            <p className="mt-2 text-[13px] text-border">Paid with {paymentMethodLabel(o.paymentMethod)}</p>
            <ul className="mt-4 space-y-2 border-t border-brand-black-soft pt-4 text-[13px]">
              {o.lines.map((l) => (
                <li key={l.sku} className="flex justify-between gap-2">
                  <span className="text-border">
                    {l.qty}× {l.name}
                  </span>
                  <span className="shrink-0 tabular-nums text-paper">{fmtKes(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t-2 border-brand-yellow pt-3 font-serif text-[1.15rem] font-semibold text-brand-yellow">
              <span>Total paid</span>
              <span>{fmtKes(o.total)}</span>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 py-12 md:px-8 md:py-16">
      <nav className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
        <Link href="/shop" className="text-ink-2 no-underline hover:text-ink">
          Shop
        </Link>
        <span className="mx-2 text-ink-4">/</span>
        <span className="text-ink">Checkout</span>
      </nav>
      <h1 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.25rem)] font-semibold">Checkout</h1>
      <p className="mt-2 max-w-[52ch] font-serif text-[1.05rem] text-ink-2">
        Review your basket, choose how you&apos;ll pay, then download your invoice and receipt.
      </p>

      {lines.length === 0 ? (
        <div className="mt-10 border-2 border-dashed border-border bg-paper-2 p-8 text-center">
          <p className="m-0 font-serif text-[1.1rem]">Your cart is empty.</p>
          <Link href="/shop#promos" className="btn btn-primary btn-lg mt-6 inline-flex no-underline">
            Browse promos
          </Link>
        </div>
      ) : (
        <>
          <section className="mt-10">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3">Cart</h2>
            <ul className="mt-4 divide-y divide-rule-soft border-2 border-rule bg-surface">
              {lines.map((l) => (
                <li key={l.sku} className="flex flex-wrap items-center gap-4 px-4 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="font-sans text-[14px] font-semibold">{l.name}</div>
                    <div className="font-mono text-[10px] text-ink-3">{l.sku}</div>
                    <div className="mt-1 font-serif text-[15px]">{fmtKes(l.price)} each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="sr-only" htmlFor={`qty-${l.sku}`}>
                      Quantity for {l.name}
                    </label>
                    <input
                      id={`qty-${l.sku}`}
                      type="number"
                      min={1}
                      value={l.qty}
                      onChange={(e) => setLineQty(l.sku, Number(e.target.value))}
                      className="w-16 border-2 border-brand-black bg-paper px-2 py-1.5 font-mono text-[13px] tabular-nums"
                    />
                    <button
                      type="button"
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-danger underline-offset-2 hover:underline"
                      onClick={() => removeLine(l.sku)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="w-full text-right font-serif text-[1.1rem] font-semibold sm:w-28 sm:flex-none">
                    {fmtKes(l.price * l.qty)}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end border-t-2 border-brand-black pt-4">
              <div className="font-serif text-[1.25rem] font-semibold">Subtotal {fmtKes(subtotal)}</div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3">Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Full name (optional)</span>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="e.g. Mary Wanjiku"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                  Mobile {paymentMethod === "mpesa" ? "(required for M-Pesa)" : "(optional)"}
                </span>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow"
                  placeholder="07XX XXX XXX"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink-3">Payment method</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((p) => {
                const Icon = p.icon;
                const active = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id)}
                    className={`flex flex-col items-start gap-2 border-2 p-4 text-left transition-colors ${
                      active
                        ? "border-brand-black bg-brand-yellow shadow-1"
                        : "border-border bg-surface hover:border-brand-black"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.75} className="text-brand-black" aria-hidden />
                    <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.05em]">{p.label}</span>
                    <span className="font-mono text-[10px] leading-snug text-ink-3">{p.sub}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {payError && (
            <p className="mt-6 border-2 border-danger bg-danger-bg px-4 py-3 font-sans text-[13px] text-danger" role="alert">
              {payError}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary btn-lg" onClick={placeOrder}>
              Pay {fmtKes(subtotal)}
            </button>
            <Link href="/shop#promos" className="btn btn-outline btn-lg no-underline">
              Back to shop
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
