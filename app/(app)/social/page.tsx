import Link from "next/link";
import { AtSign, Globe, MessageCircle, Music } from "lucide-react";
import { BracketLabel } from "@/components/ui/BracketLabel";
import { KpiCard } from "@/components/ui/KpiCard";
import { Badge } from "@/components/ui/Badge";
import { SocialComposerWithPreview } from "@/components/social/SocialComposerWithPreview";
import { socialKpis, scheduledPosts, leads } from "@/lib/data";

const channelIcon: Record<string, { Icon: React.ElementType; bg: string; fg: string }> = {
  ig: { Icon: AtSign,         bg: "bg-brand-black", fg: "text-brand-yellow" },
  fb: { Icon: Globe,          bg: "bg-info",        fg: "text-white"        },
  wa: { Icon: MessageCircle,  bg: "bg-success",     fg: "text-white"        },
  tt: { Icon: Music,          bg: "bg-brand-black", fg: "text-white"        },
};

type StatusType = "success" | "warn" | "outline" | "info" | "danger";

export default function SocialPage() {
  return (
    <>
      {/* Page header */}
      <div className="flex justify-between items-end gap-4 pb-3.5 border-b-2 border-rule mb-6">
        <div className="flex flex-col gap-1.5">
          <BracketLabel>SOCIAL // 4 CHANNELS // OCT 24</BracketLabel>
          <h1 className="font-serif font-semibold text-[36px] leading-[1.05] m-0">This week's calendar</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/whatsapp" className="btn btn-outline btn-sm no-underline">
            WhatsApp commerce
          </Link>
          <button type="button" className="btn btn-outline btn-sm">
            WEEK
          </button>
          <button type="button" className="btn btn-secondary btn-sm">
            MONTH
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {socialKpis.map((k) => (
          <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} down={k.down} />
        ))}
      </div>

      {/* Calendar + Leads */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
        {/* Scheduled posts */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>SCHEDULED // THIS WEEK</BracketLabel>
            <span className="t-meta">11 POSTS · 4 CHANNELS</span>
          </div>
          <div className="px-5 pb-4">
            {scheduledPosts.map((post, i) => {
              const ch = channelIcon[post.channel] ?? channelIcon.ig;
              return (
                <div key={i} className="grid grid-cols-[56px_1fr_auto] gap-3.5 py-4 border-b border-rule-soft last:border-none items-start">
                  <div className={`w-11 h-11 border-2 border-brand-black flex items-center justify-center shrink-0 ${ch.bg} ${ch.fg}`}>
                    <ch.Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="font-semibold text-[14px]">{post.title}</div>
                    <div className="font-serif italic text-[14px] text-ink-2 mt-1 leading-snug">{post.caption}</div>
                    <div className="font-mono text-[11px] text-ink-3 mt-2">{post.channelLabel} · {post.meta}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <BracketLabel>{post.time}</BracketLabel>
                    <div className="mt-1.5">
                      <Badge variant={post.statusType as StatusType} dot={post.statusType !== "outline"}>{post.status}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leads */}
        <div className="card">
          <div className="card-head">
            <BracketLabel>LEADS // RECENT</BracketLabel>
            <span className="t-meta">62 · 7d</span>
          </div>
          <div className="px-5 pb-4">
            {leads.map((lead) => (
              <div key={lead.name} className="grid grid-cols-[32px_1fr_auto] gap-3 py-3 border-b border-rule-soft last:border-none items-center">
                <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{lead.initials}</div>
                <div>
                  <div className="font-semibold text-[14px]">{lead.name}</div>
                  <div className="font-mono text-[11px] text-ink-3">{lead.meta}</div>
                </div>
                <Badge variant={lead.statusType as StatusType} dot>{lead.status}</Badge>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3.5 mt-2 border-t-2 border-rule">
              <div>
                <BracketLabel>CONVERSION · 7D</BracketLabel>
                <div className="font-serif font-semibold text-[24px] mt-1">19.4% · KES 184k</div>
              </div>
              <button className="btn btn-outline btn-sm">OPEN INBOX</button>
            </div>
          </div>
        </div>
      </div>

      <SocialComposerWithPreview />
    </>
  );
}
