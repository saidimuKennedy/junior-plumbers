"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TopBarNavLink {
  label: string;
  href: string;
}

export function TopBarNav({ links }: { links: TopBarNavLink[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 items-center">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`px-3 py-2 font-sans font-medium text-[13px] uppercase tracking-[0.04em]
                        transition-colors duration-100
                        ${active ? "text-ink border-b-2 border-brand-yellow" : "text-ink-2 hover:text-ink"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
