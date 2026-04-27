# Tailwind / Next.js token mapping

Drop-in mapping from `colors_and_type.css` → `tailwind.config.ts`. This is the source of truth for porting the design system into a Next.js + shadcn/ui codebase.

## 1. `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow:       "#FFD200",
          "yellow-deep":"#E6BC00",
          "yellow-soft":"#FFF4B8",
          black:        "#0A0A0A",
          "black-soft": "#1F1F1F",
        },
        paper:   { DEFAULT: "#FAF8F4", 2: "#F2EFE8" },
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#0A0A0A",
          2: "#3A3A3A",
          3: "#6B6B6B",
          4: "#A1A09B",
        },
        rule:        "#1A1A1A",
        "rule-soft": "#E5E2DA",
        border:      "#DAD6CC",
        "border-strong": "#1A1A1A",

        success: { DEFAULT: "#1F7A3A", bg: "#E8F2EA" },
        warn:    { DEFAULT: "#B8761F", bg: "#FBF1DC" },
        danger:  { DEFAULT: "#B3261E", bg: "#F9E5E3" },
        info:    { DEFAULT: "#1F4FB8", bg: "#E5ECF9" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "EB Garamond", "serif"],
        sans:  ["var(--font-sans)",  "Inter", "system-ui", "sans-serif"],
        mono:  ["var(--font-mono)",  "JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs:   ["11px", { lineHeight: "1.4" }],
        sm:   ["13px", { lineHeight: "1.4" }],
        base: ["15px", { lineHeight: "1.5" }],
        md:   ["17px", { lineHeight: "1.45" }],
        lg:   ["20px", { lineHeight: "1.2" }],
        xl:   ["26px", { lineHeight: "1.15" }],
        "2xl":["34px", { lineHeight: "1.1" }],
        "3xl":["44px", { lineHeight: "1.05" }],
        "4xl":["60px", { lineHeight: "1.02" }],
        "5xl":["80px", { lineHeight: "1" }],
      },
      borderRadius: {
        none: "0",
        DEFAULT: "0",     // sharp by default
        sm: "2px",
        md: "4px",
        full: "9999px",
      },
      boxShadow: {
        1: "0 1px 0 rgba(10,10,10,0.04), 0 1px 2px rgba(10,10,10,0.04)",
        2: "0 2px 4px rgba(10,10,10,0.06), 0 4px 12px rgba(10,10,10,0.04)",
        3: "0 8px 24px rgba(10,10,10,0.10)",
        press: "inset 0 2px 0 rgba(0,0,0,0.10)",
      },
      transitionTimingFunction: {
        "out-soft":   "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "in-out-soft":"cubic-bezier(0.4, 0, 0.2, 1)",
      },
      maxWidth: {
        container:        "1280px",
        "container-narrow":"960px",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

## 2. `src/app/layout.tsx` — fonts

```tsx
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const serif = EB_Garamond({ subsets: ["latin"], weight: ["400","500","600","700"], style: ["normal","italic"], variable: "--font-serif" });
const sans  = Inter({         subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-sans" });
const mono  = JetBrains_Mono({subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
```

## 3. `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { @apply bg-paper text-ink font-sans; }
}

@layer components {
  /* Bracketed label — the signature device */
  .bracket::before { content: "[ "; }
  .bracket::after  { content: " ]"; }

  .t-bracket {
    @apply font-mono text-xs uppercase tracking-[0.1em] text-ink-3;
  }
  .t-bracket::before { content: "[ "; }
  .t-bracket::after  { content: " ]"; }

  .t-display { @apply font-serif font-semibold text-4xl leading-[1.02] tracking-tight; }
  .t-h1      { @apply font-serif font-semibold text-3xl leading-[1.05]; }
  .t-h2      { @apply font-serif font-semibold text-2xl leading-tight; }
  .t-eyebrow { @apply font-mono text-xs uppercase tracking-[0.08em] text-ink-3; }
  .t-meta    { @apply font-mono text-xs tracking-wide text-ink-3; }
}
```

## 4. shadcn skin overrides

When you `npx shadcn@latest add button`, replace the generated variants:

```tsx
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.06em] border-2 transition-colors duration-150 ease-out-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black disabled:bg-paper-2 disabled:text-ink-4 disabled:border-border disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:    "bg-brand-yellow text-brand-black border-brand-black hover:bg-brand-yellow-deep",
        secondary:  "bg-brand-black text-paper border-brand-black hover:bg-brand-black-soft",
        outline:    "bg-transparent text-brand-black border-brand-black hover:bg-paper-2",
        ghost:      "bg-transparent border-transparent hover:bg-paper-2",
        destructive:"bg-danger text-white border-danger hover:bg-danger/90",
      },
      size: {
        sm:      "h-9  px-3 text-xs",
        default: "h-11 px-[18px] text-sm",
        lg:      "h-12 px-6 text-md",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
```

Apply the same brand sharpening to:
- `Card` — `rounded-none border border-border bg-surface shadow-1`
- `Input` — `rounded-none border border-border focus-visible:outline-2 focus-visible:outline-brand-black`
- `Badge` — `rounded-none font-mono uppercase tracking-wider text-xs`
- `Table` — header rows use `border-b-2 border-rule font-mono uppercase`

## 5. Icons

```bash
npm i lucide-react
```

```tsx
import { Drill, Truck, Wrench } from "lucide-react";
<Drill className="size-4" strokeWidth={1.75} />
```

Always pass `strokeWidth={1.75}` — it matches the brand's line weight.
