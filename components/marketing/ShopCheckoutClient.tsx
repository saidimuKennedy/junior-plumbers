"use client";

import confetti from "canvas-confetti";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Banknote, Building2, Check, Smartphone, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
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
        <div className="mt-12 border-2 border-dashed border-border bg-paper-2 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-brand-black bg-brand-yellow flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-brand-black" strokeWidth={2} />
          </div>
          <h2 className="font-serif text-[1.5rem] font-semibold m-0">Your cart is empty</h2>
          <p className="mt-2 font-serif text-[1rem] text-ink-2">Add some tools and supplies to get started</p>
          <Link href="/shop#promos" className="btn btn-primary btn-lg mt-6 inline-flex no-underline">
            Browse promos
          </Link>
        </div>
      ) : (
        <>
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-5 h-5 text-brand-black" strokeWidth={2} />
              <BracketLabel>CART // {lines.length} ITEM{lines.length > 1 ? 'S' : ''}</BracketLabel>
            </div>

            <div className="border-2 border-rule bg-surface">
              {lines.map((l, idx) => (
                <div
                  key={l.sku}
                  className={`grid grid-cols-[80px_1fr_auto] gap-4 p-4 ${idx > 0 ? 'border-t border-rule-soft' : ''}`}
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 border-2 border-rule bg-paper-2 flex items-center justify-center overflow-hidden">
                    {l.image ? (
                      <Image
                        src={l.image}
                        alt={l.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-yellow/20 flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-brand-black/40" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="min-w-0 flex flex-col justify-center">
                    <div className="font-sans text-[15px] font-semibold leading-tight">{l.name}</div>
                    <div className="font-mono text-[10px] text-ink-3 mt-1">{l.sku}</div>
                    <div className="mt-2 font-serif text-[16px] font-medium text-ink-2">{fmtKes(l.price)} each</div>
                  </div>

                  {/* Controls & Price */}
                  <div className="flex flex-col items-end justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => removeLine(l.sku)}
                      className="p-1.5 text-ink-3 hover:text-danger hover:bg-danger-bg transition-colors"
                      aria-label={`Remove ${l.name}`}
                    >
                      <Trash2 size={16} strokeWidth={2} />
                    </button>

                    {/* Quantity Stepper */}
                    <div className="flex items-center border-2 border-brand-black">
                      <button
                        type="button"
                        onClick={() => setLineQty(l.sku, l.qty - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-paper hover:bg-paper-2 transition-colors"
                        disabled={l.qty <= 1}
                      >
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center font-mono text-[13px] font-semibold tabular-nums bg-paper border-x-2 border-brand-black">
                        {l.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLineQty(l.sku, l.qty + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-paper hover:bg-paper-2 transition-colors"
                      >
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="font-serif text-[1.1rem] font-semibold text-brand-black">
                      {fmtKes(l.price * l.qty)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="mt-4 flex justify-between items-center border-t-2 border-brand-black pt-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">Subtotal</span>
              <div className="font-serif text-[1.5rem] font-semibold">{fmtKes(subtotal)}</div>
            </div>
          </section>

          <section className="mt-12">
            <BracketLabel>DETAILS // CONTACT</BracketLabel>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">Full name <span className="text-ink-4">(optional)</span></span>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow transition-shadow"
                  placeholder="e.g. Mary Wanjiku"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                  Mobile <span className={paymentMethod === "mpesa" ? "text-brand-black font-semibold" : "text-ink-4"}>{paymentMethod === "mpesa" ? "(required for M-Pesa)" : "(optional)"}</span>
                </span>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1.5 w-full border-2 border-brand-black bg-surface px-3 py-2.5 text-[15px] outline-none focus:ring-2 focus:ring-brand-yellow transition-shadow"
                  placeholder="07XX XXX XXX"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>
            </div>
          </section>

          <section className="mt-12">
            <BracketLabel>PAYMENT // METHOD</BracketLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((p) => {
                const Icon = p.icon;
                const active = paymentMethod === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPaymentMethod(p.id)}
                    className={`flex flex-col items-start gap-2 border-2 p-4 text-left transition-all ${
                      active
                        ? "border-brand-black bg-brand-yellow shadow-1"
                        : "border-border bg-surface hover:border-brand-black hover:shadow-1"
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center ${active ? 'bg-brand-black' : 'bg-paper-2'}`}>
                      <Icon size={20} strokeWidth={2} className={active ? "text-brand-yellow" : "text-brand-black"} aria-hidden />
                    </div>
                    <span className="font-sans text-[13px] font-semibold uppercase tracking-[0.05em] mt-1">{p.label}</span>
                    <span className="font-mono text-[10px] leading-snug text-ink-3">{p.sub}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {payError && (
            <div className="mt-6 border-2 border-danger bg-danger-bg px-4 py-3 flex items-start gap-3" role="alert">
              <div className="w-6 h-6 bg-danger text-white flex items-center justify-center shrink-0 font-mono text-[12px] font-bold">!</div>
              <p className="font-sans text-[13px] text-danger m-0">{payError}</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3 pt-6 border-t-2 border-rule">
            <button type="button" className="btn btn-primary btn-lg shadow-1" onClick={placeOrder}>
              <span className="font-serif">Pay {fmtKes(subtotal)}</span>
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
