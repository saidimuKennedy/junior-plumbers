"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Gift, Search, ShoppingBag, User } from "lucide-react";
import { LoyaltyModalProvider } from "@/components/marketing/LoyaltyModalContext";
import { LoyaltySignupModal } from "@/components/marketing/LoyaltySignupModal";
import {
  StorefrontCartProvider,
  useStorefrontCart,
} from "@/components/marketing/StorefrontCartContext";
import { LOYALTY_STORAGE_ONBOARDED } from "@/lib/loyalty-public";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop#categories" },
  { label: "Promotions", href: "/shop#promos" },
  { label: "About", href: "/shop/about" },
] as const;

function StorefrontShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);
  const [clubMember, setClubMember] = useState(false);
  const { totalQty, hydrated } = useStorefrontCart();
  const openLoyaltyModal = useCallback(() => setLoyaltyOpen(true), []);

  const refreshClubStatus = useCallback(() => {
    try {
      setClubMember(localStorage.getItem(LOYALTY_STORAGE_ONBOARDED) === "1");
    } catch {
      setClubMember(false);
    }
  }, []);

  useEffect(() => {
    refreshClubStatus();
  }, [refreshClubStatus, loyaltyOpen]);

  const cartLabel = hydrated && totalQty > 0 ? `Cart · ${totalQty}` : "Cart";

  return (
    <LoyaltyModalProvider onOpen={openLoyaltyModal}>
      <div className="min-h-screen bg-paper font-sans text-ink">
        <div className="bg-brand-black py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-brand-yellow">
          Free delivery over KES 5,000 · Kiserian · Rongai · Ongata · Karen ·
          Ngong
        </div>

        <header className="sticky top-0 z-50 border-b-2 border-rule bg-surface/95 px-4 backdrop-blur-md md:px-8">
          <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 py-3 md:grid md:grid-cols-[auto_1fr_auto] md:py-4">
            <Link
              href="/shop"
              className="flex min-w-0 items-center gap-3 rounded-sm text-inherit no-underline transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-brand-black bg-brand-yellow">
                <Image
                  src="/brand/logo-mark.svg"
                  alt="Junior Plumbers"
                  width={28}
                  height={28}
                />
              </div>
              <div className="min-w-0">
                <div className="truncate font-serif text-[18px] font-semibold leading-none md:text-[20px]">
                  Junior Plumbers
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                  Kiserian hardware
                </div>
              </div>
            </Link>
            <nav className="order-3 flex w-full justify-start gap-5 overflow-x-auto border-t border-rule-soft py-2.5 md:order-none md:w-auto md:justify-center md:gap-8 md:border-t-0 md:py-0">
              {NAV.map((item) => {
                const active =
                  item.href === "/shop"
                    ? pathname === "/shop" || pathname === "/shop/checkout"
                    : item.href === "/shop/about"
                      ? pathname === "/shop/about"
                      : false;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`shrink-0 font-sans text-[12px] font-medium uppercase tracking-[0.06em] no-underline transition-colors md:text-[13px] ${
                      active ? "text-brand-black" : "text-ink-2 hover:text-ink"
                    } ${active ? "underline decoration-brand-yellow decoration-2 underline-offset-8" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-1 md:gap-3.5">
              <button
                type="button"
                onClick={() => setLoyaltyOpen(true)}
                className={`cursor-pointer border-2 p-2 transition-colors sm:hidden ${
                  clubMember
                    ? "border-rule-soft bg-paper-2 text-ink-2 hover:bg-paper"
                    : "border-brand-black bg-brand-yellow text-brand-black hover:bg-brand-yellow-deep"
                }`}
                aria-label={
                  clubMember
                    ? "Rewards club — member"
                    : "Join rewards club — 60 welcome points"
                }
              >
                <Gift size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => setLoyaltyOpen(true)}
                className={`hidden cursor-pointer items-center gap-1.5 border-2 px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] transition-colors sm:inline-flex ${
                  clubMember
                    ? "border-rule-soft bg-paper-2 text-ink-2 hover:bg-paper"
                    : "border-brand-black bg-brand-yellow text-brand-black hover:bg-brand-yellow-deep"
                }`}
                aria-label={
                  clubMember
                    ? "Rewards club — member"
                    : "Join rewards club — 60 welcome points"
                }
              >
                <Gift size={14} strokeWidth={2} className="shrink-0" />
                <span>{clubMember ? "Club" : "Join · 60"}</span>
              </button>
              <button
                type="button"
                className="cursor-pointer p-2 transition-colors hover:bg-paper-2"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                type="button"
                className="hidden cursor-pointer p-2 transition-colors hover:bg-paper-2 sm:block"
                aria-label="Account"
              >
                <User size={18} />
              </button>
              <Link
                href="/shop/checkout"
                className="btn btn-secondary btn-sm flex items-center gap-2 no-underline"
                aria-label={
                  hydrated && totalQty > 0
                    ? `Shopping cart, ${totalQty} items`
                    : "Shopping cart"
                }
              >
                <ShoppingBag size={16} strokeWidth={1.75} />
                <span className="hidden sm:inline">{cartLabel}</span>
                {hydrated && totalQty > 0 ? (
                  <span className="font-mono text-[11px] tabular-nums sm:hidden">
                    {totalQty}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>
        </header>

        {children}

        <LoyaltySignupModal
          open={loyaltyOpen}
          onOpenChange={setLoyaltyOpen}
          onJoined={refreshClubStatus}
        />

        <footer className="border-t-2 border-rule bg-paper-2 px-6 pb-8 pt-12 md:px-8">
          <div className="mx-auto grid max-w-[1280px] gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <Image
                src="/brand/logo-wordmark.svg"
                alt="Junior Plumbers"
                width={240}
                height={48}
              />
              <p className="mt-3.5 max-w-[320px] font-serif text-[15px] text-ink-2">
                Authorized Ingco dealer for Kajiado County. Family-run since
                2019, six outlets across greater Nairobi.
              </p>
            </div>
            {[
              {
                title: "Shop",
                items: ["Power tools", "Plumbing", "Electrical", "Safety"],
              },
              {
                title: "Service",
                items: ["Delivery", "Returns", "Track order", "Trade accounts"],
              },
              {
                title: "Outlets",
                items: [
                  "Kiserian Main",
                  "Rongai Plaza",
                  "Ngong Road",
                  "Karen Yard",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="m-0 mb-3.5 font-mono text-[11px] uppercase tracking-[0.1em]">
                  {col.title}
                </h4>
                <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[14px]">
                  {col.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-[1280px] flex-wrap justify-between gap-2 border-t border-rule-soft pt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-3">
            <span>© 2025 Junior Plumbers Ltd · Kajiado, Kenya</span>
            <Link
              href="/shop/about"
              className="text-ink-3 no-underline hover:text-ink"
            >
              About us
            </Link>
          </div>
        </footer>
      </div>
    </LoyaltyModalProvider>
  );
}

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  return (
    <StorefrontCartProvider>
      <StorefrontShellInner>{children}</StorefrontShellInner>
    </StorefrontCartProvider>
  );
}
