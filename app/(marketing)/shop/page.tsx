import Image from "next/image";
import Link from "next/link";
import {
  Search, User, ShoppingBag,
  Drill, Wrench, Pipette, Zap, HardHat, Paintbrush,
} from "lucide-react";
import { shopCategories, featuredProducts, loyaltyStats } from "@/lib/data";

const catIcons: Record<string, React.ElementType> = {
  drill: Drill, wrench: Wrench, pipette: Pipette,
  zap: Zap, "hard-hat": HardHat, paintbrush: Paintbrush,
};

const prodIcons: Record<string, React.ElementType> = {
  drill: Drill, hammer: Drill, zap: Zap, "hard-hat": HardHat,
};

function fmt(n: number) {
  return "KES " + n.toLocaleString("en-KE");
}

export default function StorefrontPage() {
  return (
    <div className="min-h-screen bg-paper font-sans">
      {/* Promo strip */}
      <div className="bg-brand-black text-brand-yellow text-center font-mono text-[11px] tracking-[0.16em] uppercase py-2">
        FREE DELIVERY OVER KES 5,000 // KISERIAN · RONGAI · ONGATA · KAREN · NGONG
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-surface border-b-2 border-rule grid grid-cols-[auto_1fr_auto] items-center gap-6 px-8 py-4">
        <Link
          href="/shop"
          className="flex items-center gap-3 text-inherit no-underline hover:opacity-90 transition-opacity
                     focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black rounded-sm"
        >
          <div className="w-10 h-10 bg-brand-yellow border-2 border-brand-black flex items-center justify-center">
            <Image src="/brand/logo-mark.svg" alt="Junior Plumbers" width={28} height={28} />
          </div>
          <div>
            <div className="font-serif font-semibold text-[20px] leading-none">Junior Plumbers</div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">KISERIAN HARDWARE</div>
          </div>
        </Link>
        <nav className="flex gap-7 justify-center">
          {["Power tools", "Hand tools", "Plumbing", "Electrical", "Promotions", "About"].map((l) => (
            <a key={l} className="font-sans font-medium text-[13px] uppercase tracking-[0.06em] cursor-pointer hover:text-ink-2 transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3.5">
          <button className="p-2 cursor-pointer hover:bg-paper-2 transition-colors"><Search size={18} /></button>
          <button className="p-2 cursor-pointer hover:bg-paper-2 transition-colors"><User size={18} /></button>
          <button className="btn btn-secondary btn-sm flex items-center gap-2">
            <ShoppingBag size={16} strokeWidth={1.75} /> CART · 3
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="grid grid-cols-2 gap-8 px-8 py-16 max-w-[1280px] mx-auto items-center">
        <div>
          <BracketLabel>HARDWARE // SINCE 2019</BracketLabel>
          <h1 className="font-serif font-semibold text-[64px] leading-[1.02] tracking-[-0.01em] my-3">
            Tools that <em className="italic font-medium">work as hard</em> as the people who use them.
          </h1>
          <p className="font-serif text-[18px] leading-relaxed max-w-[480px] text-ink-2">
            Authorized Ingco dealer for Kajiado County. Six outlets, same-day delivery across greater Nairobi, and a workbench&apos;s worth of know-how at every counter.
          </p>
          <div className="flex gap-3 mt-7">
            <button className="btn btn-primary btn-lg">SHOP THE CATALOGUE →</button>
            <button className="btn btn-outline btn-lg">FIND AN OUTLET</button>
          </div>
        </div>
        <div className="bg-brand-yellow border-[3px] border-brand-black aspect-[4/5] flex items-center justify-center relative">
          <div className="absolute inset-[14px] border border-brand-black/40" />
          <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.18em] uppercase">[ FEATURED // INGCO ]</div>
          <Drill size="60%" strokeWidth={0.8} className="text-brand-black" />
        </div>
      </section>

      {/* Shop by category */}
      <section className="px-8 py-12 max-w-[1280px] mx-auto">
        <h2 className="font-serif font-semibold text-[36px] m-0 pb-3 mb-6 border-b-2 border-rule">Shop by category</h2>
        <div className="grid grid-cols-6 gap-3">
          {shopCategories.map((cat) => {
            const Icon = catIcons[cat.icon] ?? Drill;
            return (
              <button key={cat.name} className="bg-surface border border-border p-[22px_14px] text-center cursor-pointer hover:bg-brand-yellow transition-colors">
                <Icon size={28} strokeWidth={1.5} className="mx-auto" />
                <div className="font-sans font-semibold text-[13px] uppercase tracking-[0.06em] mt-2.5">{cat.name}</div>
                <div className="font-mono text-[10px] text-ink-3 mt-1">{cat.count} ITEMS</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="px-8 py-12 max-w-[1280px] mx-auto">
        <div className="flex justify-between items-baseline pb-3 mb-6 border-b-2 border-rule">
          <h2 className="font-serif font-semibold text-[32px] m-0">Tools Tuesday · this week</h2>
          <a className="font-mono text-[11px] tracking-[0.1em] uppercase cursor-pointer">VIEW ALL PROMOS →</a>
        </div>
        <div className="grid grid-cols-4 gap-[18px]">
          {featuredProducts.map((p) => {
            const Icon = prodIcons[p.icon] ?? Drill;
            return (
              <div key={p.sku} className="bg-surface border border-border">
                <div className="aspect-square bg-paper-2 flex items-center justify-center border-b border-border relative">
                  {p.badge && (
                    <span className={`badge ${p.badgeType} absolute top-2.5 left-2.5`}>{p.badge}</span>
                  )}
                  <Icon size="50%" strokeWidth={1} className="text-ink-2" />
                </div>
                <div className="p-4">
                  <div className="font-sans font-semibold text-[14px] leading-snug min-h-9">{p.name}</div>
                  <div className="font-mono text-[10px] text-ink-3 tracking-[0.06em] mt-1">{p.sku}</div>
                  <div className="font-serif font-semibold text-[22px] mt-2.5">
                    {p.originalPrice && <s className="text-ink-3 text-[14px] font-normal mr-1.5">{fmt(p.originalPrice)}</s>}
                    {fmt(p.price)}
                  </div>
                  <button className="btn btn-secondary w-full mt-3 py-2.5 h-auto">ADD TO CART</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Loyalty band */}
      <section className="bg-brand-black text-paper py-14 px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-12 items-center">
          <div>
            <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brand-yellow">[ LOYALTY // PARTS &amp; LABOUR CLUB ]</div>
            <h2 className="font-serif font-semibold text-[48px] leading-[1.05] my-3">Earn back on every shilling spent.</h2>
            <p className="font-serif text-[18px] leading-relaxed text-border max-w-[480px]">
              Join our loyalty programme — earn 1 point per KES 100, redeem at any outlet, and get exclusive access to bulk pricing and trade events.
            </p>
            <button className="btn btn-primary btn-lg mt-6">JOIN FREE →</button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {loyaltyStats.map((s) => (
              <div key={s.l} className="pt-[18px] border-t-2 border-brand-yellow">
                <div className="font-serif font-semibold text-[48px] leading-none">{s.n}</div>
                <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-brand-yellow mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-paper-2 border-t-2 border-rule px-8 pt-12 pb-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-[2fr_1fr_1fr_1fr] gap-8">
          <div>
            <Image src="/brand/logo-wordmark.svg" alt="Junior Plumbers" width={240} height={48} />
            <p className="font-serif text-[15px] text-ink-2 max-w-[320px] mt-3.5">
              Authorized Ingco dealer for Kajiado County. Family-run since 2019, six outlets across greater Nairobi.
            </p>
          </div>
          {[
            { title: "Shop",    items: ["Power tools", "Plumbing", "Electrical", "Safety"] },
            { title: "Service", items: ["Delivery", "Returns", "Track order", "Trade accounts"] },
            { title: "Outlets", items: ["Kiserian Main", "Rongai Plaza", "Ngong Road", "Karen Yard"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[11px] tracking-[0.1em] uppercase m-0 mb-3.5">{col.title}</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2 text-[14px]">
                {col.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1280px] mx-auto flex justify-between mt-8 pt-4 border-t border-rule-soft font-mono text-[11px] text-ink-3 tracking-[0.06em] uppercase">
          <span>© 2025 JUNIOR PLUMBERS LTD · KAJIADO, KENYA</span>
          <span>VAT P051234567X</span>
        </div>
      </footer>
    </div>
  );
}

function BracketLabel({ children }: { children: React.ReactNode }) {
  return <span className="t-bracket">{children}</span>;
}
