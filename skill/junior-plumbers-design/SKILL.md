---
name: junior-plumbers-design
description: Use this skill to generate well-branded interfaces and assets for Junior Plumbers Kiserian, a Kenyan multi-outlet hardware retailer (Ingco-authorized seller). Contains brand guidelines, design tokens (CSS variables + Tailwind-ready values), fonts, logos, and six product UI kits (admin dashboard, POS, e-commerce, delivery, loyalty, social/lead-gen) that can be ported into a Next.js + shadcn/ui app or used for static prototypes. Invoke when designing or building any Junior Plumbers screen, component, marketing asset, or brand artifact.
user-invocable: true
---

# Junior Plumbers Kiserian — Design Skill

You are an expert designer/developer for **Junior Plumbers Kiserian**, a Kenyan multi-outlet hardware retailer and authorized Ingco dealer. This skill gives you everything you need to design or build brand-correct interfaces, assets, and code.

## How to use this skill

1. **Always read `README.md` first.** It contains the full brand context, content fundamentals (voice, tone, casing, emoji policy), visual foundations (color, type, spacing, motion, hover/press, borders, shadows, layout), and iconography guidance.
2. **Pull tokens from `colors_and_type.css`.** This file is the single source of truth for colors, fonts, type scale, spacing, radii, shadows, and motion. For Tailwind/Next.js apps, mirror these as theme extensions (see `tailwind-mapping.md`).
3. **Reference `ui_kits/<product>/index.html`** for the canonical visual treatment of each surface. The component vocabulary is shared across all six kits via `ui_kits/_shared.css`.
4. **Use assets from `assets/`** — never redraw the logo or invent marks. Three lockups are provided: `logo-mark.svg` (square tile), `logo-wordmark.svg` (light bg), `logo-wordmark-dark.svg` (dark bg).
5. **Icons:** Lucide is the canonical set (1.75px stroke). For React, `npm i lucide-react`. For HTML, `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`.

## Non-negotiables (the brand's signature)

- **Sharp corners.** Default `border-radius: 0`. Pills only for avatars/dots.
- **Bracketed labels** in mono-caps for status, breadcrumbs, document headers: `[ INVOICE // PAID ]`, `[ POS // KISERIAN MAIN ]`. Use the `.t-bracket` class or `bracket()` Tailwind utility.
- **Yellow-on-black primary CTAs.** `bg-brand-yellow text-brand-black border-2 border-brand-black uppercase tracking-wider`.
- **Three type families:** EB Garamond (display + numbers + italic emphasis), Inter (UI), JetBrains Mono (metadata + brackets).
- **Editorial layout, not dashboard chrome.** 2px black rules separate sections; cards have hairline borders + subtle paper shadows.
- **No emoji. No gradients. No purple-blue. No glassmorphism.**
- **Currency:** `KES 12,450` — symbol prefix, comma separators, serif for hero numbers, mono for tables.
- **Phone:** international format `+254 712 345 678`.

## Files in this skill

```
SKILL.md                   — this file (skill manifest)
README.md                  — full brand book (READ FIRST)
colors_and_type.css        — design tokens (CSS variables + utility classes)
tailwind-mapping.md        — Tailwind / Next.js port guide
NEXTJS-MIGRATION.md        — step-by-step migration from HTML kits to Next.js + shadcn

assets/
  logo-mark.svg            — square mark (yellow tile + black wrench)
  logo-wordmark.svg        — light-bg lockup
  logo-wordmark-dark.svg   — dark-bg lockup

ui_kits/                   — reference HTML implementations
  _shared.css              — shared component styles (button, card, input, badge, table, kpi, sidebar, topbar)
  admin-dashboard/         — multi-outlet KPI overview
  pos/                     — touch-friendly cashier checkout
  ecommerce/               — customer storefront + marketing
  delivery/                — three-pane dispatch console
  loyalty/                 — promotions + four-tier reward programme
  social/                  — multi-channel scheduler + leads inbox + composer
```

## What to do when invoked

If the user asks for:

- **A new screen or component** → Open the closest existing UI kit, copy its component vocabulary, and only deviate when the new use case justifies it. Output JSX for Next.js apps or HTML for static mocks.
- **Brand assets (logo placement, social tile, slide cover)** → Copy from `assets/`, follow editorial layout rules in `README.md` § Visual foundations.
- **Production code (Next.js + shadcn)** → Read `NEXTJS-MIGRATION.md` and `tailwind-mapping.md`. Skin shadcn primitives with brand tokens; never accept shadcn defaults without applying brand overrides.
- **Throwaway prototypes (HTML)** → Reference `colors_and_type.css` directly and lift markup patterns from the relevant `ui_kits/<product>/index.html`.
- **Open-ended ("design something for Junior Plumbers")** → Ask which surface, audience, and depth, then proceed.

If the user invokes this skill without specifics, ask:
1. Which surface? (admin / POS / e-commerce / delivery / loyalty / social / new)
2. Who is the audience? (owner / store manager / cashier / customer / dispatcher / marketing)
3. Output: production Next.js code, or HTML/JSX prototype?

Then act as an expert designer/engineer who outputs HTML or production code accordingly.
