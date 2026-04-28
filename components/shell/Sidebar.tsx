"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3, Store, Package, Receipt, Truck,
  Megaphone, Users, MessageSquare, Settings, Share2, MessageCircle,
} from "lucide-react";

const ops = [
  { label: "Overview",      href: "/dashboard",  Icon: BarChart3     },
  { label: "Outlets",       href: "/outlets",    Icon: Store         },
  { label: "Inventory",     href: "/inventory",  Icon: Package       },
  { label: "Orders",        href: "/orders",     Icon: Receipt       },
  { label: "Deliveries",    href: "/delivery",   Icon: Truck         },
];

const growth = [
  { label: "Promotions",    href: "/loyalty",    Icon: Megaphone     },
  { label: "Loyalty",       href: "/loyalty",    Icon: Users         },
  { label: "Social & Leads",href: "/social",     Icon: MessageSquare },
  { label: "WhatsApp",      href: "/whatsapp",   Icon: MessageCircle },
  { label: "Online Shop",   href: "/shop",       Icon: Share2        },
];

const admin = [
  { label: "Settings",      href: "/settings",   Icon: Settings      },
];

function Group({ label }: { label: string }) {
  return (
    <div className="px-[18px] pt-3.5 pb-1.5 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-3">
      {label}
    </div>
  );
}

function NavItem({ href, Icon, label }: { href: string; Icon: React.ElementType; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`flex gap-2.5 items-center px-[18px] py-[9px] font-sans text-[14px] cursor-pointer transition-colors duration-100
                  ${active ? "bg-brand-black text-paper [&_svg]:text-brand-yellow" : "text-ink-2 hover:bg-paper-2 hover:text-ink"}`}
    >
      <Icon size={16} strokeWidth={1.75} />
      {label}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="w-60 bg-surface border-r border-border py-4 shrink-0">
      <Group label="Operations" />
      {ops.map((i) => <NavItem key={i.href + i.label} {...i} />)}
      <Group label="Growth" />
      {growth.map((i) => <NavItem key={i.href + i.label} {...i} />)}
      <Group label="Admin" />
      {admin.map((i) => <NavItem key={i.href + i.label} {...i} />)}
    </aside>
  );
}
