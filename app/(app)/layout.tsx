import { TopBar } from "@/components/shell/TopBar";
import { Sidebar } from "@/components/shell/Sidebar";
import { Badge } from "@/components/ui/Badge";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Outlets",   href: "/outlets"   },
  { label: "Inventory", href: "/inventory" },
  { label: "Orders",    href: "/orders"    },
  { label: "Reports",   href: "/reports"   },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[64px_1fr]">
      <TopBar
        sub="KISERIAN // OPS"
        links={navLinks}
        rightSlot={
          <>
            <Badge variant="yellow">ALL OUTLETS LIVE</Badge>
            <div className="avatar text-[12px]">JM</div>
          </>
        }
      />
      <div className="grid grid-cols-[240px_1fr] min-h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="p-8 max-w-[1280px] w-full">{children}</main>
      </div>
    </div>
  );
}
