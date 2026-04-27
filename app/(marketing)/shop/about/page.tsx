import Image from "next/image";
import Link from "next/link";
import { Award, MapPin, Truck, Users } from "lucide-react";
import { StorefrontShell } from "@/components/marketing/StorefrontShell";
import { StorefrontImageHero } from "@/components/marketing/StorefrontImageHero";
import { StorefrontImageBand } from "@/components/marketing/StorefrontImageBand";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { marketingImagery } from "@/lib/marketing-imagery";

const pillars = [
  {
    title: "Counter truth",
    body: "We stock what tradespeople actually reach for — Ingco power tools, honest PVC and copper, and staff who have swung a hammer on the same roads you work.",
    icon: Award,
  },
  {
    title: "Same-day Nairobi",
    body: "Fleet and riders on Magadi, Ngong, and Karen corridors. Paid orders before cut-off go out the same day, with proof of delivery you can reconcile.",
    icon: Truck,
  },
  {
    title: "Six yards, one ledger",
    body: "Kiserian flagship through Magadi Road Stop — shared promotions, loyalty, and stock visibility so you are never guessing which branch has your SKU.",
    icon: MapPin,
  },
  {
    title: "People first",
    body: "Family-run since 2019. Managers are on the floor, not only in the back office — training, trade days, and credit reviews face to face.",
    icon: Users,
  },
];

export default function ShopAboutPage() {
  return (
    <StorefrontShell>
      <StorefrontImageHero
        src={marketingImagery.aboutHero}
        alt="Team member organizing tools in a hardware yard"
        priority
      >
        <div className="max-w-[720px] text-paper">
          <BracketLabel className="!border-brand-yellow !text-brand-yellow">About Junior Plumbers</BracketLabel>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight">
            The yard where <em className="font-medium not-italic text-brand-yellow">Nairobi trades</em> restock with confidence.
          </h1>
          <p className="mt-5 max-w-[560px] font-serif text-[1.125rem] leading-relaxed text-border md:text-[1.2rem]">
            From a single counter in Kiserian to six outlets and a growing delivery map — we built this business on stock depth,
            fair pricing, and showing up when the job site is waiting.
          </p>
          <Link href="/shop#categories" className="btn btn-primary btn-lg mt-8 inline-flex no-underline">
            Browse categories
          </Link>
        </div>
      </StorefrontImageHero>

      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/5] max-h-[560px] overflow-hidden border-2 border-brand-black shadow-2">
            <Image
              src={marketingImagery.aboutValues}
              alt="Close-up of quality hardware and fittings"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-black/55 via-transparent to-transparent" aria-hidden />
            <p className="absolute bottom-6 left-6 right-6 z-10 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-paper">
              Ingco-class SKUs · inspected receipts · warranty you can walk back to the counter
            </p>
          </div>
          <div>
            <h2 className="m-0 font-serif text-[clamp(1.85rem,3.5vw,2.5rem)] font-semibold leading-tight">
              Why buyers choose us over a faceless marketplace
            </h2>
            <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-ink-2">
              Marketplaces optimize for clicks. We optimize for the Monday when your pipe wrench strips mid-job — that is when
              a real yard, a real returns desk, and a real phone number matter.
            </p>
            <ul className="mt-8 space-y-5 border-l-2 border-brand-yellow pl-6">
              <li className="font-serif text-[1.02rem] leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Authorized Ingco dealer</span> for Kajiado County — genuine tools,
                not grey imports.
              </li>
              <li className="font-serif text-[1.02rem] leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Trade and walk-in</span> — Net-30 for approved accounts; loyalty
                points on every channel.
              </li>
              <li className="font-serif text-[1.02rem] leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">Growing with the corridor</span> — new Magadi Road Stop (2025) and
                more yards on the drawing board.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-rule bg-paper-2 px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mx-auto mb-12 max-w-[640px] text-center">
            <BracketLabel>How we operate</BracketLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold">Four promises on every receipt</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ title, body, icon: Icon }) => (
              <div
                key={title}
                className="border border-border bg-surface p-6 shadow-1 transition-shadow hover:border-brand-black hover:shadow-2"
              >
                <div className="flex h-11 w-11 items-center justify-center border-2 border-brand-black bg-brand-yellow text-brand-black">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-serif text-[1.15rem] font-semibold">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StorefrontImageBand
        src={marketingImagery.shopHero}
        alt="Store interior with shelves of hardware"
        minHeight="min-h-[360px]"
      >
        <div className="flex max-w-[720px] flex-col gap-4 text-paper md:flex-row md:items-center md:justify-between md:gap-12">
          <div>
            <h2 className="m-0 font-serif text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight">Visit a yard this week</h2>
            <p className="mt-2 font-serif text-border">Kiserian Main opens at 7:30 · late trade counter on request.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-primary btn-lg no-underline">
              Shop online
            </Link>
            <Link
              href="/shop#categories"
              className="btn btn-outline btn-lg border-paper text-paper no-underline hover:bg-paper/10"
            >
              Browse categories
            </Link>
          </div>
        </div>
      </StorefrontImageBand>
    </StorefrontShell>
  );
}
