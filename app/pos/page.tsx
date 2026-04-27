"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ScanLine, Drill, Wrench, Hammer, Ruler, Zap, HardHat, Paintbrush, Cable,
} from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { Badge } from "@/components/ui/Badge";
import { posProducts, posCategories, posCartInitial } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  drill: Drill, wrench: Wrench, hammer: Hammer, ruler: Ruler,
  zap: Zap, "hard-hat": HardHat, paintbrush: Paintbrush, cable: Cable,
};

interface CartItem { id: string; name: string; sku: string; qty: number; price: number }

function fmt(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

export default function PosPage() {
  const [cart, setCart] = useState<CartItem[]>(posCartInitial);
  const [activeCategory, setActiveCategory] = useState("All");

  function addToCart(product: (typeof posProducts)[0]) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, sku: product.sku, qty: 1, price: product.price }];
    });
  }

  function clearCart() { setCart([]); }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const loyaltyDiscount = Math.round(subtotal * 0.05);
  const vat = Math.round((subtotal - loyaltyDiscount) * 0.16);
  const total = subtotal - loyaltyDiscount + vat;

  return (
    <div className="min-h-screen grid grid-rows-[64px_1fr]" style={{ background: "#F2EFE8" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b-2 border-rule h-16
                          grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-yellow border-2 border-brand-black flex items-center justify-center shrink-0">
            <Image src="/brand/logo-mark.svg" alt="Junior Plumbers" width={24} height={24} />
          </div>
          <div>
            <div className="font-serif font-semibold text-[18px] leading-none">Junior Plumbers</div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">POS</div>
          </div>
        </div>
        <div className="flex flex-col">
          <BracketLabel>POS // KISERIAN MAIN // TILL 02</BracketLabel>
          <div className="font-serif text-[24px] font-semibold leading-tight">Cashier · J. Mwangi</div>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline btn-sm">HOLD SALE</button>
          <button className="btn btn-outline btn-sm">+ NEW CUSTOMER</button>
          <button className="btn btn-secondary btn-sm">END SHIFT</button>
        </div>
      </header>

      <div className="grid grid-cols-[1fr_380px] min-h-0">
        {/* Left: product browser */}
        <section className="flex flex-col gap-4 p-6 overflow-y-auto">
          {/* Scan bar */}
          <div className="bg-surface border border-border px-4.5 py-3.5 flex gap-3 items-center">
            <ScanLine size={20} className="text-brand-black shrink-0" />
            <input
              className="flex-1 border-none outline-none font-mono text-[16px] bg-transparent"
              placeholder="Scan barcode or search SKU…"
            />
            <span className="font-mono text-[11px] text-ink-3 uppercase tracking-[0.08em]">F2 · KEYBOARD</span>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 border-b-2 border-rule">
            {posCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2.5 font-sans font-semibold text-[12px] uppercase tracking-[0.06em] cursor-pointer transition-colors
                            ${activeCategory === c
                              ? "text-ink border-b-2 border-brand-yellow -mb-0.5"
                              : "text-ink-3 hover:text-ink"}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-3">
            {posProducts.map((p) => {
              const Icon = iconMap[p.icon] ?? Drill;
              return (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="bg-surface border border-border p-3 text-left cursor-pointer hover:border-brand-black transition-colors"
                >
                  <div className="aspect-square bg-paper-2 border border-rule-soft flex items-center justify-center mb-2.5">
                    <Icon size={48} strokeWidth={1.25} className="text-ink-3" />
                  </div>
                  <div className="text-[13px] font-semibold leading-snug min-h-8">{p.name}</div>
                  <div className="font-mono text-[10px] text-ink-3 tracking-[0.06em] mt-0.5">{p.sku}</div>
                  <div className="font-serif font-semibold text-[18px] mt-2">{fmt(p.price)}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Right: order summary */}
        <aside className="bg-surface border-l-2 border-rule flex flex-col">
          {/* Sale header */}
          <div className="px-5 py-4.5 border-b-2 border-rule flex justify-between items-end">
            <div>
              <BracketLabel>SALE // OPEN</BracketLabel>
              <h2 className="font-serif font-semibold text-[22px] m-0 mt-0.5">Sale #02-1247</h2>
            </div>
            <button onClick={clearCart} className="font-sans font-semibold text-[11px] uppercase tracking-[0.06em] text-danger cursor-pointer">
              CLEAR
            </button>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-rule-soft bg-paper">
            <div className="avatar">MW</div>
            <div className="flex-1">
              <div className="font-semibold">Mary Wanjiku</div>
              <div className="font-mono text-[11px] text-ink-3">+254 722 ··· 882 · 1,240 PTS</div>
            </div>
            <Badge variant="yellow">LOYALTY</Badge>
          </div>

          {/* Line items */}
          <div className="flex-1 overflow-y-auto px-5">
            {cart.length === 0 && (
              <p className="text-ink-3 text-[13px] py-8 text-center">No items. Tap a product to add.</p>
            )}
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_auto] gap-2 py-3 border-b border-rule-soft last:border-none">
                <div>
                  <div className="font-medium text-[14px]">{item.name}</div>
                  <div className="font-mono text-[11px] text-ink-3 mt-0.5">SKU {item.sku} · QTY {item.qty}</div>
                </div>
                <div className="font-serif text-[16px] font-semibold text-right">{fmt(item.price * item.qty)}</div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="px-5 py-4 border-t-2 border-rule bg-paper">
            <div className="flex justify-between py-1 text-[14px]">
              <span className="text-ink-3">Subtotal</span>
              <span className="font-mono">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1 text-[14px]">
              <span className="text-ink-3">Loyalty discount · 5%</span>
              <span className="font-mono text-success">−{fmt(loyaltyDiscount)}</span>
            </div>
            <div className="flex justify-between py-1 text-[14px]">
              <span className="text-ink-3">VAT 16%</span>
              <span className="font-mono">{fmt(vat)}</span>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-rule-soft font-serif text-[28px] font-semibold">
              <span>Total due</span>
              <span>{fmt(total)}</span>
            </div>
          </div>

          {/* Payment buttons */}
          <div className="px-5 py-4 flex gap-2">
            <button className="btn btn-outline flex-1">CASH</button>
            <button className="btn btn-outline flex-1">M-PESA</button>
            <button className="btn btn-primary" style={{ flex: 1.5 }}>CHARGE →</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
