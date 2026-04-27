# Migrating the HTML UI kits to Next.js + shadcn/ui

Step-by-step playbook for porting the six HTML kits into a production Next.js 15 (App Router) codebase. Read `tailwind-mapping.md` first — it has the token wiring you'll reference here.

## 0. Prerequisites

- Node 20+
- A fresh repo, or empty Next.js project

## 1. Scaffold

```bash
npx create-next-app@latest junior-plumbers \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd junior-plumbers
npx shadcn@latest init       # base color: Neutral · CSS variables: Yes
npm i lucide-react
```

## 2. Install this skill

Drop the entire `skill/junior-plumbers-design/` folder into `.claude/skills/` of the new repo:

```bash
mkdir -p .claude/skills
cp -R /path/to/skill/junior-plumbers-design .claude/skills/
```

When you open the project in Claude Code, this skill is auto-discovered and Claude will follow its rules.

## 3. Wire up the design tokens

Replace the generated `tailwind.config.ts` with the one in `tailwind-mapping.md` § 1.

Replace `src/app/globals.css` with the snippet in `tailwind-mapping.md` § 3.

Add the font variables to `src/app/layout.tsx` per § 2.

Quick sanity check:
```tsx
// src/app/page.tsx
export default function Home() {
  return (
    <main className="p-12">
      <span className="t-bracket">DESIGN SYSTEM // BOOT CHECK</span>
      <h1 className="t-display mt-3">Hello, <em>Junior Plumbers</em>.</h1>
      <button className="mt-6 bg-brand-yellow text-brand-black border-2 border-brand-black px-5 py-3 uppercase tracking-wider font-semibold">
        Primary CTA
      </button>
    </main>
  );
}
```

If the headline is serif, the button is yellow-on-black with sharp corners, and the bracketed label has square brackets — tokens are wired.

## 4. Add shadcn primitives, brand-skinned

```bash
npx shadcn@latest add button card badge input label table sheet dialog dropdown-menu select textarea checkbox tabs avatar separator
```

For every primitive you add, replace the variant definitions per `tailwind-mapping.md` § 4. **Do not skip this step** — accepting shadcn defaults will give you rounded, neutral components that fight the brand.

## 5. Copy assets

```bash
mkdir -p public/brand
cp .claude/skills/junior-plumbers-design/assets/* public/brand/
```

Reference in JSX:
```tsx
import Image from "next/image";
<Image src="/brand/logo-mark.svg" alt="Junior Plumbers" width={40} height={40} />
```

## 6. Build the app shell

Create `src/components/shell/`:

- `TopBar.tsx` — based on `.topbar` in `ui_kits/_shared.css`
- `Sidebar.tsx` — based on `.sidebar`
- `PageHead.tsx` — based on `.page-head`
- `Kpi.tsx` — based on `.kpi`
- `BracketLabel.tsx` — `<span className="t-bracket">{children}</span>`

Then a layout that uses them:

```tsx
// src/app/(app)/layout.tsx
import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[64px_1fr]">
      <TopBar />
      <div className="grid grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
}
```

## 7. Port each kit, in this order

| # | Kit | Route | Why this order |
|---|---|---|---|
| 1 | **Admin Dashboard** | `/dashboard` | Establishes the shell + KPI + table patterns most other kits reuse |
| 2 | **POS** | `/pos` | Self-contained, no shell — proves the component library works in a different layout |
| 3 | **Delivery** | `/delivery` | Three-pane layout, swap the schematic map for a real Mapbox/Leaflet integration |
| 4 | **Loyalty** | `/loyalty` | Reuses dashboard table patterns + adds the tier-card component |
| 5 | **Social** | `/social` | Reuses sidebar; adds composer + scheduler patterns |
| 6 | **E-commerce + Marketing** | `/(marketing)/page.tsx` and `/shop/*` | Different shell (marketing nav), so port last |

For each kit:

1. Open `ui_kits/<kit>/index.html`.
2. Create `src/app/(app)/<kit>/page.tsx`.
3. Copy markup, swap `class` → `className`.
4. Replace inline icons (`<i data-lucide="drill"></i>`) with `<Drill strokeWidth={1.75} className="size-4" />`.
5. Extract repeating chunks into `src/components/<kit>/`. Aim for ≤80-line components.
6. Where a button/card/input appears, replace the raw element with the brand-skinned shadcn primitive.

## 8. Data layer (when you're ready)

Recommended stack for this product:

- **Database:** PostgreSQL (Supabase or Neon)
- **ORM:** Prisma or Drizzle
- **Auth:** NextAuth.js for staff (email + password); separate flow for customers (e-commerce)
- **API:** Server Actions + Route Handlers; tRPC if you want end-to-end type safety
- **M-Pesa Daraja API:** for POS payment integration (Kenya — search `daraja sdk node`)
- **Maps (delivery kit):** Mapbox GL or Leaflet + OpenStreetMap

Prisma schema starting points:

```prisma
model Outlet { id String @id @default(cuid()) name String managerName String? createdAt DateTime @default(now()) }
model Product { id String @id @default(cuid()) sku String @unique name String priceKes Int category String stock StockLevel[] }
model StockLevel { id String @id @default(cuid()) productId String outletId String quantity Int product Product @relation(fields:[productId], references:[id]) outlet Outlet @relation(fields:[outletId], references:[id]) }
model Order { id String @id @default(cuid()) outletId String customerId String? totalKes Int status String createdAt DateTime @default(now()) }
model Customer { id String @id @default(cuid()) name String phone String @unique loyaltyPoints Int @default(0) tier String @default("APPRENTICE") }
```

## 9. Deploy

- **Vercel** is the path of least resistance for Next.js
- Set env vars: `DATABASE_URL`, `NEXTAUTH_SECRET`, `MPESA_*`
- Add `public/brand/*` to your repo (don't `.gitignore` it)

## 10. Working with Claude Code

In your new Next.js repo, when you ask Claude Code to build a screen:

> "Build the Outlet Detail page using the Junior Plumbers skill."

Claude Code will read `.claude/skills/junior-plumbers-design/SKILL.md`, follow the design rules, pull tokens from the README, and reference the relevant UI kit's `index.html` for the visual treatment. The skill is the bridge between your design system and your codebase — keep it updated as the system evolves.
