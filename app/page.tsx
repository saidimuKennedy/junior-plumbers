import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  LayoutDashboard,
  MonitorSmartphone,
  Package,
  Truck,
  HeartHandshake,
  Share2,
  MessageCircle,
  ShoppingBag,
  TrendingUp,
  Users,
  MapPin,
} from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";

export const metadata: Metadata = {
  title: "Junior Plumbers · Multi-outlet hardware operations",
  description:
    "Investor overview: retail + trade platform for Ingco-class hardware — POS, inventory, delivery, loyalty, and e-commerce across greater Nairobi.",
};

const surfaces = [
  {
    name: "Admin dashboard",
    blurb: "Live KPIs, stock alerts, and outlet roll-ups in one place.",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    name: "Point of sale",
    blurb: "Counter-speed checkout tuned for mixed retail and trade baskets.",
    href: "/pos",
    Icon: MonitorSmartphone,
  },
  {
    name: "Inventory & orders",
    blurb: "SKUs, transfers, and fulfilment hooks across branches.",
    href: "/inventory",
    Icon: Package,
  },
  {
    name: "Delivery ops",
    blurb: "Queue, riders, and live routing for same-day greater Nairobi.",
    href: "/delivery",
    Icon: Truck,
  },
  {
    name: "Loyalty & promos",
    blurb: "Points, tiers, and trade-day mechanics that drive repeat.",
    href: "/loyalty",
    Icon: HeartHandshake,
  },
  {
    name: "Social & e-commerce",
    blurb: "Leads from social plus a branded shopfront for discovery.",
    href: "/social",
    Icon: Share2,
  },
  {
    name: "WhatsApp commerce",
    blurb: "Inventory-backed carousel, M-Pesa STK, and confirmations in chat.",
    href: "/whatsapp",
    Icon: MessageCircle,
  },
] as const;

const traction = [
  { n: "6+", l: "Active outlets · Kajiado & Nairobi corridor", Icon: MapPin },
  { n: "Ingco", l: "Authorized dealer · power tools & hardware", Icon: Package },
  { n: "Same-day", l: "Delivery SLA inside mapped trade zones", Icon: Truck },
  { n: "B2B + B2C", l: "Walk-in retail and trade accounts on one stack", Icon: Users },
] as const;

export default function InvestorLandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b-2 border-rule bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-3 text-inherit no-underline">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-black bg-brand-yellow">
              <Image src="/brand/logo-mark.svg" alt="" width={26} height={26} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-[17px] font-semibold">Junior Plumbers</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-3">Kiserian hardware</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2 md:flex">
            <a href="#problem" className="hover:text-ink">Problem</a>
            <a href="#platform" className="hover:text-ink">Platform</a>
            <a href="#traction" className="hover:text-ink">Traction</a>
            <a href="#ask" className="hover:text-ink">The ask</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 underline-offset-4 hover:text-ink hover:underline sm:inline"
            >
              Ops sign-in
            </Link>
            <a href="#contact" className="btn btn-primary btn-sm !px-4">
              Request deck
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-[1200px] gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <BracketLabel>Design system · multi-outlet ops</BracketLabel>
            <h1 className="mt-4 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
              Junior Plumbers, <em className="font-medium italic">by the book.</em>
            </h1>
            <p className="mt-5 max-w-[520px] font-serif text-[1.125rem] leading-relaxed text-ink-2">
              We are building the operating layer for modern hardware retail in Kenya — the same counter
              trust as the legacy yard, with the software surface area investors expect: POS, stock, delivery,
              loyalty, and omnichannel demand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary btn-lg">
                Schedule a conversation <ArrowRight className="inline" size={18} />
              </a>
              <Link href="/shop" className="btn btn-outline btn-lg">
                View retail shop
              </Link>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
              Editorial systems · Ingco-class yellow · Nairobi trade corridor
            </p>
          </div>
          <div className="relative aspect-square w-full md:aspect-[4/5] md:min-h-[600px] border-[3px] border-brand-black bg-brand-yellow md:mx-0">
            <div className="absolute inset-3 overflow-hidden border border-brand-black/35">
              <Image
                src="/images/kenyan-hardware-hero.png"
                alt="Kenyan hardware store exterior"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="pointer-events-none absolute left-5 top-5 z-10 max-w-[85%] font-mono text-[10px] uppercase tracking-[0.18em] text-paper [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]">
              [ High-velocity retail · Operations hub ]
            </div>
          </div>
        </section>

        <div className="border-t-2 border-rule" />

        {/* Problem */}
        <section id="problem" className="bg-paper-2 px-6 py-20">
          <div className="mx-auto max-w-[1200px]">
            <BracketLabel>The gap</BracketLabel>
            <h2 className="mt-3 font-serif text-[2.25rem] font-semibold leading-tight md:text-[2.75rem]">
              Hardware retail still runs on instinct. We run it on data.
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <div className="border-l-[3px] border-brand-black bg-surface p-6 shadow-1">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Fragmentation</h3>
                <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-2">
                  Independent yards juggle spreadsheets, WhatsApp, and disconnected POS. Multi-branch groups
                  cannot see stock or margin in real time — so they under-order bestsellers and bleed cash on
                  dead SKUs.
                </p>
              </div>
              <div className="border-l-[3px] border-brand-yellow bg-surface p-6 shadow-1">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">Our wedge</h3>
                <p className="mt-3 font-serif text-[1.05rem] leading-relaxed text-ink-2">
                  Junior Plumbers starts with a high-trust, high-SKU Ingco-class footprint, then ships one
                  design system across every customer touchpoint — from till to truck to timeline on
                  Magadi Road.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform */}
        <section id="platform" className="px-6 py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-6 border-b-2 border-rule pb-8 md:flex-row md:items-end">
              <div>
                <BracketLabel>Product surface</BracketLabel>
                <h2 className="mt-3 font-serif text-[2.25rem] font-semibold md:text-[2.75rem]">
                  Six operational kits. One token set.
                </h2>
                <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-ink-2">
                  Every screen shares the same typography, colour, and component language — so training,
                  brand, and investor narrative stay aligned as we open more doors.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-ink-3">
                <TrendingUp size={16} /> Live previews in-repo
              </div>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {surfaces.map(({ name, blurb, href, Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="group border border-border bg-surface p-5 no-underline shadow-1 transition-colors hover:border-brand-black hover:bg-brand-yellow-soft"
                >
                  <div className="flex h-10 w-10 items-center justify-center border-2 border-brand-black bg-brand-yellow text-brand-black">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div className="mt-4 font-sans text-[15px] font-semibold text-ink group-hover:text-brand-black">
                    {name}
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-ink-2">{blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 group-hover:text-ink">
                    Open preview <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 border border-border bg-paper-2 px-5 py-4">
              <ShoppingBag size={20} className="text-ink-3" />
              <p className="text-[14px] text-ink-2">
                <span className="font-semibold text-ink">Consumer shopfront</span> — discovery and promos at{" "}
                <Link href="/shop" className="font-mono text-[12px] uppercase tracking-[0.06em] text-info underline-offset-2 hover:underline">
                  /shop
                </Link>
                , same brand rails as trade counters.
              </p>
            </div>
          </div>
        </section>

        {/* Traction */}
        <section id="traction" className="border-t-2 border-rule bg-brand-black px-6 py-20 text-paper">
          <div className="mx-auto max-w-[1200px]">
            <BracketLabel className="!text-brand-yellow">Why now</BracketLabel>
            <h2 className="mt-3 font-serif text-[2.25rem] font-semibold text-paper md:text-[2.75rem]">
              Proof on the ground — not just in Figma.
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {traction.map(({ n, l, Icon }) => (
                <div key={l} className="border-t-2 border-brand-yellow pt-6">
                  <Icon className="text-brand-yellow" size={22} strokeWidth={1.5} />
                  <div className="mt-3 font-serif text-[2rem] font-semibold leading-none">{n}</div>
                  <div className="mt-2 font-mono text-[11px] uppercase leading-snug tracking-[0.08em] text-border">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 max-w-[720px] font-serif text-[1.05rem] leading-relaxed text-border">
              We are not pitching a slide-deck retailer — we operate outlets, move Ingco-class inventory, and
              ship same-day in corridors where trade buyers expect reliability. Software follows the
              business, not the other way around.
            </p>
          </div>
        </section>

        {/* Ask */}
        <section id="ask" className="px-6 py-20">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <BracketLabel>The round</BracketLabel>
              <h2 className="mt-3 font-serif text-[2.25rem] font-semibold md:text-[2.75rem]">
                Capital to scale outlets, fleet, and the platform team.
              </h2>
              <ul className="mt-8 space-y-4 font-serif text-[1.05rem] leading-relaxed text-ink-2">
                <li className="flex gap-3 border-l-2 border-brand-yellow pl-4">
                  <span className="font-mono text-[12px] text-ink-3">01</span>
                  Open two additional high-velocity yards on the Rongai–Karen arc.
                </li>
                <li className="flex gap-3 border-l-2 border-brand-yellow pl-4">
                  <span className="font-mono text-[12px] text-ink-3">02</span>
                  Harden delivery routing, rider incentives, and proof-of-delivery capture.
                </li>
                <li className="flex gap-3 border-l-2 border-brand-yellow pl-4">
                  <span className="font-mono text-[12px] text-ink-3">03</span>
                  Product &amp; design hires to productise the kits for franchise-style rollout.
                </li>
              </ul>
            </div>
            <div id="contact" className="border-2 border-brand-black bg-surface p-8 shadow-2">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">Investor contact</h3>
              <p className="mt-3 font-serif text-[1.25rem] font-medium">
                Request the data room, financial model, or a half-day yard walk-through.
              </p>
              <a
                href="mailto:investors@juniorplumbers.example?subject=Junior%20Plumbers%20%E2%80%94%20investor%20intro"
                className="btn btn-primary mt-6 w-full"
              >
                Email investors@juniorplumbers.example
              </a>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-ink-3">
                Replace the placeholder address with your live inbox. Deck PDF and calendar link can sit here
                too.
              </p>
              <div className="mt-6 flex gap-2 border-t border-rule-soft pt-6">
                <FileText className="shrink-0 text-ink-3" size={18} />
                <span className="text-[13px] text-ink-2">
                  Standard package: one-pager, 12-slide deck, unit economics worksheet, cap table summary.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-rule bg-paper-2 px-6 py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-wordmark-dark.svg" alt="Junior Plumbers" width={160} height={32} />
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">
            <Link href="/shop" className="hover:text-ink">
              Shop
            </Link>
            <Link href="/dashboard" className="hover:text-ink">
              Dashboard
            </Link>
            <a href="#contact" className="hover:text-ink">
              Contact
            </a>
          </div>
          <p className="font-mono text-[10px] text-ink-4">© {new Date().getFullYear()} Junior Plumbers · Kajiado, Kenya</p>
        </div>
      </footer>
    </div>
  );
}
