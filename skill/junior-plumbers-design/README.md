# Junior Plumbers Kiserian — Design System

> A multi-outlet hardware retail operations platform: dashboard, POS, e-commerce, delivery, loyalty and social-media lead gen — wrapped in an editorial, document-grade aesthetic with Ingco-inspired hardware yellow and black.

---

## 1. Company & product context

**Junior Plumbers Kiserian** is a Kenyan hardware retailer based in Kiserian (Kajiado County) with multiple outlets. They are an authorized seller of **Ingco** ([ingco.com/ke](https://www.ingco.com/ke/)) tools and accessories among other hardware lines. Their core operational pain is that performance across outlets, deliveries, promos, and loyalty is fragmented — they want one branded operations platform.

### Products represented in this design system

| Product | Audience | Surface |
|---|---|---|
| **Admin Dashboard** | Owner / exec | Multi-outlet KPIs, sales rollups, stock alerts |
| **POS** | Cashiers (touch-friendly) | In-store checkout, barcode scan, loyalty lookup |
| **E-commerce + Marketing** | Customers | Storefront, PDP, cart, checkout, marketing pages |
| **Delivery Management** | Dispatcher / rider | Order assignment, route tracking, proof of delivery |
| **Loyalty & Promotions Admin** | Marketing / store manager | Promo builder, points rules, referral tracking |
| **Social & Lead Gen** | Marketing | Cross-channel scheduler, inbox, lead capture |

### Sources used to build this system

- **User-provided design reference** — `uploads/pasted-1777307126573-0.png` ("KRA Academy" credential screen). Drove the editorial / bracketed-label / serif-display aesthetic.
- **Brand color direction** — Ingco's signature yellow/black, adapted for a software platform.
- **No codebase or Figma file was provided.** A Figma link was offered but did not arrive — components and screens were built fresh against the reference. **If you have one, attach it and we'll re-base.**

---

## 2. Index — what's in this folder

```
README.md                  — this file
SKILL.md                   — agent-skill manifest (cross-compatible with Claude Code)
colors_and_type.css        — CSS variables + typography classes (single source of truth)

assets/                    — logo lockups, brand marks
  logo-wordmark.svg        — primary lockup (light backgrounds)
  logo-wordmark-dark.svg   — lockup for dark backgrounds
  logo-mark.svg            — square mark only

preview/                   — small cards for the Design System tab
  type-*, color-*, spacing-*, components-*, brand-*

ui_kits/
  admin-dashboard/         — multi-outlet KPI dashboard
  pos/                     — in-store checkout
  ecommerce/               — storefront + cart + checkout + marketing
  delivery/                — dispatch + tracking
  loyalty/                 — promotions + points + referrals
  social/                  — scheduler + inbox + leads
```

Every UI kit folder contains its own `README.md`, `index.html` (interactive preview), and JSX component files.

---

## 3. Content fundamentals

The voice is **document-grade, plainspoken, and direct** — like a credential or a parts manifest, not marketing fluff. Borrows the editorial gravity of the user's reference design.

### Tone

- **Direct, factual, second-person ("you"/"your")** for transactional copy. *"Your delivery is 3 stops away."*
- **Third-person impersonal** for headers and labels. *"Outlets reporting today: 6 of 7"*
- **No marketing puffery.** Avoid "amazing", "powerful", "revolutionary".
- **Confident understatement.** *"Stock low at Kiserian Main"* not *"⚠️ Critical stock alert!"*

### Casing

- **UPPERCASE** for eyebrows, status labels, section dividers, button labels in editorial contexts. *RELATED MILESTONES*, *CREDENTIAL DETAILS*, *SEND TO WHATSAPP*.
- **Title Case** for page titles and primary headlines when serif. *Academic Achievement*, *Outlet Performance*.
- **Sentence case** for body copy and helper text.

### Bracketed labels — the signature device

Use `[ LABEL // QUALIFIER ]` in mono caps for status, breadcrumbs, document-style headers. Examples:

```
[ INVOICE // PAID ]
[ POS // KISERIAN MAIN ]
[ DELIVERY #4821 // EN ROUTE ]
[ PROMO // ACTIVE ]
```

The CSS class `.t-bracket` adds the brackets automatically — write only the inner text.

### "I" vs "you"

- Operator-facing surfaces (admin, POS, dispatch): **"you"** for actions ("Refund this order"), **"we"** is avoided.
- Customer-facing (e-commerce): **"you"** for accounts ("Your orders"), **"we"** for the company ("We deliver Mon–Sat").

### Numbers and units

- Currency is **KES** (Kenyan Shilling). Format `KES 12,450` — always with the symbol prefix and thousand separators. Display in serif for hero numbers, mono for tabular.
- Phone numbers in international format: `+254 712 345 678`.
- Dates: editorial format `OCTOBER 24, 2025` (uppercase mono) for documents; `24 Oct 2025` (sans) for tables.

### Emoji

**Never.** The aesthetic is editorial and document-like; emoji breaks the tone. Use Lucide icons or unicode glyphs (•, →, ※, §) sparingly.

### Copy examples

| Don't | Do |
|---|---|
| "🎉 Great news! Your order is on the way!" | "Order #4821 is en route. ETA 14:32." |
| "Awesome rewards await!" | "You have 1,240 points. Redeem at any outlet." |
| "Oops, that didn't work." | "Payment failed. Try again, or use a different method." |

---

## 4. Visual foundations

The core visual idea is **"hardware-grade document"**: the structural seriousness of a parts catalogue or a credential certificate, rendered with Ingco's hardware-yellow accent.

### Color

- **Primary** — `--brand-yellow #FFD200` on `--brand-black #0A0A0A`. High-contrast pairing used for primary CTAs (yellow fill, black text), key accents, and the logo tile.
- **Surface** — `--paper #FAF8F4` (warm off-white, document-like) for page backgrounds. `--surface #FFFFFF` for cards and inputs.
- **Ink** — Pure-ish blacks for type. Three steps: `--ink`, `--ink-2`, `--ink-3`.
- **Semantic** — Muted, document-style success/warn/danger (no neon).
- **Imagery vibe** — Warm, daylit, slightly desaturated. Product photography on plain backgrounds. No filters or gradients on photos.

### Typography

| Family | Usage |
|---|---|
| **EB Garamond** (serif) | Display headlines, hero numbers, italic body emphasis, certificate-style document headers |
| **Inter** (sans) | All UI: buttons, fields, table data, navigation, body copy |
| **JetBrains Mono** | Bracketed labels, metadata, codes (SKUs, order #), key/value document rows |

> ⚠️ **Font substitution flag:** The reference image's display serif looks like a Caslon/Garamond cut; we substituted **EB Garamond** from Google Fonts. The mono looks like JetBrains Mono or IBM Plex Mono — we used **JetBrains Mono**. Inter is a safe industrial sans default. **If you have specific licensed fonts, drop them in `fonts/` and I'll swap.**

### Spacing

4-pt base scale (`--sp-1` … `--sp-9`). Generous whitespace — pages breathe like a document, not a dashboard.

### Backgrounds

- **No gradients** on UI surfaces. Flat colors only.
- **No purple-blue gradient backgrounds, no glassmorphism, no glow effects.**
- Hero/marketing pages may use **full-bleed product photography on `--paper`** with the yellow tile as a graphic anchor.
- Tinted blocks use solid `--brand-yellow` or `--brand-black` — no fades.

### Animation

- **Restrained.** `120–260ms` durations, `ease-out` (`cubic-bezier(0.2, 0.8, 0.2, 1)`).
- **Fades and slides only.** No bounces, no spring physics.
- Hovers: subtle background-tint shift, never scale.
- Page transitions: simple opacity fade.

### Hover & press states

- **Hover (yellow button):** background → `--brand-yellow-deep #E6BC00`, no shadow change.
- **Hover (black button):** background → `--brand-black-soft #1F1F1F`.
- **Hover (ghost / outline button):** background → `--paper-2 #F2EFE8`.
- **Hover (link):** underline appears (the underline never persists by default — too noisy).
- **Press:** `inset 0 2px 0 rgba(0,0,0,0.10)` (an "ink" press), no scale transform.
- **Focus:** 2px solid `--brand-black` outline with 2px offset. Never blue.

### Borders

- **`1px solid --border #DAD6CC`** — default component border, hairline.
- **`2px solid --rule #1A1A1A`** — heavy editorial divider, used for section breaks and emphasis.
- **`3px`** — only on the logo tile and hero document frames.

### Shadows

Three steps, all subtle and paper-like:

- `--shadow-1` — resting cards (1px hairline + soft 4px blur)
- `--shadow-2` — popovers, dropdowns
- `--shadow-3` — modals (still restrained)

Never colored shadows. Never glow.

### Transparency / blur

Used sparingly:

- Sticky headers may use `backdrop-filter: saturate(180%) blur(8px)` over `rgba(250,248,244,0.8)`.
- Modal scrims: `rgba(10,10,10,0.5)`.
- Avoid frosted glass on cards — it conflicts with the document aesthetic.

### Corner radii

**Sharp by default.** `--r-0: 0` is the default for buttons, cards, inputs — matching the user's stated preference. `--r-2: 4px` reserved for badges/pills only. `--r-pill` only for circular avatars and notification dots.

### Cards

- White (`--surface`) on `--paper` background.
- `1px solid --border`, **no rounded corners**, `--shadow-1` resting.
- Section header inside the card uses `.t-bracket` style.
- A `2px solid --rule` divider separates the header from the content area when emphasis is needed (the credential pattern).

### Layout rules

- **Containers:** 1280px max width for app screens, 960px for marketing/document content.
- **Fixed elements:** Top app bar fixed at top (`64px`). POS keeps order summary fixed right (`360px`). Otherwise, scrolling is natural.
- **Grid:** 12-column on desktop, generous gutters (`--gutter: 24px`).
- **Editorial documents** (invoice, certificate, receipt) use a centered single column with strong horizontal rules — like the credential reference.

---

## 5. Iconography

- **Primary set: [Lucide](https://lucide.dev) via CDN** — 1.75px stroke, 24px nominal, square line-cap. Lucide's industrial, minimal feel matches the editorial aesthetic. Loaded via `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` in each UI-kit `index.html`.
- **Status dots:** A solid circle (8–10px) in the appropriate semantic color, paired with mono uppercase label.
- **Brand mark:** the yellow tile + black wrench (`assets/logo-mark.svg`) is the only brand icon.
- **Custom illustrations:** None included by default. If we need a hero illustration, we'd commission flat, ink-line drawings on the warm paper background — never fluffy/3D.
- **Emoji:** **Not used.** Removed from all copy.
- **Unicode glyphs:** Sparingly — `•` for separators, `→` for next/CTA inline, `§` for section markers in document layouts.

If you want a different icon set (Heroicons, Tabler, custom SVG), say so — Lucide is the default substitution since no specific icon system was given.

---

## 6. Caveats and substitutions

- **Fonts** are Google Fonts substitutions. Real licensed fonts welcome — drop in `fonts/`.
- **Icons** are Lucide via CDN as a default. Swap to your preferred set on request.
- **Product photography** is placeholder boxes/shapes; real product shots will significantly elevate the e-commerce kit.
- **Figma file was offered but not received** — if you paste the link I'll re-base the components against it.

