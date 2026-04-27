export type ShopPaymentMethod = "cash" | "mpesa" | "equity";

export type StorefrontOrderLine = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

export type StorefrontOrder = {
  id: string;
  createdAtIso: string;
  lines: StorefrontOrderLine[];
  subtotal: number;
  total: number;
  paymentMethod: ShopPaymentMethod;
  customerName: string;
  customerPhone: string;
};

const BRAND = "Junior Plumbers Ltd";
const PIN = "P051234567X";
const OUTLET = "Web · Kiserian fulfilment";

export function generateWebOrderId(): string {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `JP-WEB-${t}-${r}`;
}

export function paymentMethodLabel(m: ShopPaymentMethod): string {
  switch (m) {
    case "cash":
      return "Cash (counter / on delivery)";
    case "mpesa":
      return "M-Pesa";
    case "equity":
      return "Equity (EazzyPay / bank transfer)";
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function kes(n: number): string {
  return `KES ${n.toLocaleString("en-KE")}`;
}

function rowsHtml(lines: StorefrontOrderLine[]): string {
  return lines
    .map(
      (l) => `
    <tr>
      <td>${escapeHtml(l.sku)}</td>
      <td>${escapeHtml(l.name)}</td>
      <td class="num">${l.qty}</td>
      <td class="num">${kes(l.price)}</td>
      <td class="num">${kes(l.price * l.qty)}</td>
    </tr>`
    )
    .join("");
}

function docShell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: system-ui, sans-serif; color: #0A0A0A; background: #FAF8F4; margin: 0; padding: 24px; }
    .sheet { max-width: 720px; margin: 0 auto; background: #fff; border: 2px solid #0A0A0A; padding: 28px; }
    h1 { font-size: 1.35rem; margin: 0 0 8px; }
    .meta { font-size: 12px; color: #6B6B6B; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0; }
    th, td { border-bottom: 1px solid #E5E2DA; padding: 8px 6px; text-align: left; }
    th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #6B6B6B; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    .totals { margin-top: 16px; font-size: 14px; }
    .totals div { display: flex; justify-content: space-between; padding: 4px 0; }
    .grand { font-weight: 700; font-size: 1.1rem; border-top: 2px solid #0A0A0A; margin-top: 8px; padding-top: 10px; }
    .foot { margin-top: 24px; font-size: 11px; color: #6B6B6B; }
    .chip { display: inline-block; background: #FFD200; color: #0A0A0A; padding: 2px 8px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
  </style>
</head>
<body>
  <div class="sheet">
    ${inner}
  </div>
</body>
</html>`;
}

export function buildInvoiceHtml(order: StorefrontOrder): string {
  const when = new Date(order.createdAtIso);
  const inner = `
    <span class="chip">Tax invoice</span>
    <h1>${escapeHtml(BRAND)}</h1>
    <div class="meta">
      Invoice no. <strong>${escapeHtml(order.id)}</strong><br/>
      Date: ${when.toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}<br/>
      KRA PIN (demo): ${PIN}<br/>
      Fulfilment: ${escapeHtml(OUTLET)}<br/>
      Payment: ${escapeHtml(paymentMethodLabel(order.paymentMethod))}
    </div>
    <p><strong>Bill to</strong><br/>
    ${escapeHtml(order.customerName || "Walk-in / web customer")}<br/>
    ${order.customerPhone ? escapeHtml(order.customerPhone) : "—"}
    </p>
    <table>
      <thead><tr><th>SKU</th><th>Description</th><th class="num">Qty</th><th class="num">Unit</th><th class="num">Line</th></tr></thead>
      <tbody>${rowsHtml(order.lines)}</tbody>
    </table>
    <div class="totals">
      <div><span>Subtotal</span><span>${kes(order.subtotal)}</span></div>
      <div class="grand"><span>Total due (incl. taxes as applicable)</span><span>${kes(order.total)}</span></div>
    </div>
    <div class="foot">This document is a demo invoice for the Junior Plumbers storefront prototype.</div>
  `;
  return docShell(`Invoice ${order.id}`, inner);
}

export function buildReceiptHtml(order: StorefrontOrder): string {
  const when = new Date(order.createdAtIso);
  const inner = `
    <span class="chip">Payment receipt</span>
    <h1>Thank you</h1>
    <div class="meta">
      Receipt ref. <strong>${escapeHtml(order.id)}</strong><br/>
      ${when.toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}<br/>
      ${escapeHtml(BRAND)} · ${escapeHtml(OUTLET)}
    </div>
    <p>Paid with <strong>${escapeHtml(paymentMethodLabel(order.paymentMethod))}</strong></p>
    <table>
      <thead><tr><th>SKU</th><th>Item</th><th class="num">Qty</th><th class="num">Unit</th><th class="num">Amount</th></tr></thead>
      <tbody>${rowsHtml(order.lines)}</tbody>
    </table>
    <div class="totals">
      <div class="grand"><span>Total paid</span><span>${kes(order.total)}</span></div>
    </div>
    <div class="foot">Keep this receipt for returns and warranty. Questions: shop@juniorplumbers.example · +254 700 000 000 (demo).</div>
  `;
  return docShell(`Receipt ${order.id}`, inner);
}

export function triggerHtmlDownload(filename: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
