import Image from "next/image";
import Link from "next/link";
import { TopBarNav, type TopBarNavLink } from "./TopBarNav";

interface TopBarProps {
  sub: string;
  links: TopBarNavLink[];
  rightSlot?: React.ReactNode;
}

export function TopBar({ sub, links, rightSlot }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b-2 border-rule h-16
                        grid grid-cols-[auto_1fr_auto] items-center gap-6 px-6">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 text-inherit no-underline hover:opacity-90 transition-opacity shrink-0
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black rounded-sm"
      >
        <div className="w-9 h-9 bg-brand-yellow border-2 border-brand-black flex items-center justify-center shrink-0">
          <Image src="/brand/logo-mark.svg" alt="Junior Plumbers" width={24} height={24} />
        </div>
        <div>
          <div className="font-serif font-semibold text-[18px] leading-none">Junior Plumbers</div>
          <div className="font-mono text-[10px] tracking-[0.18em] text-ink-3 uppercase">{sub}</div>
        </div>
      </Link>

      <TopBarNav links={links} />

      <div className="flex items-center gap-3">{rightSlot}</div>
    </header>
  );
}
