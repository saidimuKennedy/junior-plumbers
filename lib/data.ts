// ── Dashboard ───────────────────────────────────────────────
export const dashboardKpis = [
  { label: "Revenue · today", value: "KES 248,140", delta: "+12.4% vs LAST WEEK" },
  { label: "Orders", value: "182", delta: "+8 vs YESTERDAY" },
  { label: "Avg basket", value: "KES 1,363", delta: "−3.1% vs LAST WEEK", down: true },
  { label: "Outlets reporting", value: "6 / 7", delta: "NGONG OFFLINE 14 MIN", down: true },
];

export const outlets = [
  { name: "Kiserian Main",    staff: 17, mgr: "Jane M.",    revenue: "KES 78,420", progress: 88,  target: "KES 90,000", status: "OPEN"    },
  { name: "Rongai Plaza",     staff: 11, mgr: "Peter O.",   revenue: "KES 54,120", progress: 72,  target: "KES 75,000", status: "OPEN"    },
  { name: "Ongata Hardware",  staff: 8,  mgr: "Mary W.",    revenue: "KES 41,880", progress: 60,  target: "KES 70,000", status: "OPEN"    },
  { name: "Ngong Road Branch",staff: 9,  mgr: "Samuel N.",  revenue: "KES 32,440", progress: 46,  target: "KES 70,000", status: "OFFLINE", progressWarn: true },
  { name: "Karen Yard",       staff: 6,  mgr: "Angela K.",  revenue: "KES 28,710", progress: 51,  target: "KES 56,000", status: "OPEN"    },
  { name: "Magadi Road Stop", staff: 4,  mgr: "Dennis M.",  revenue: "KES 12,570", progress: 31,  target: "KES 40,000", status: "OPEN"    },
];

export const dashboardAlerts = [
  { type: "danger",  title: "Stock low · INGCO CD-12V",    meta: "KISERIAN MAIN · 3 LEFT",           badge: "CRITICAL", badgeType: "danger"  },
  { type: "warn",    title: "Ngong outlet offline",         meta: "SINCE 09:42 · 14 MIN",             badge: "PENDING",  badgeType: "warn"    },
  { type: "warn",    title: "Delivery #4818 delayed",       meta: "RIDER · TRAFFIC ON MAGADI RD",     badge: "+18 MIN",  badgeType: "warn"    },
  { type: "success", title: "Promo \"Tools Tuesday\" launched", meta: "ACTIVE TILL 18:00",            badge: "LIVE",     badgeType: "success" },
];

export const revenueChart = [40, 55, 42, 68, 58, 72, 80, 52, 64, 78, 86, 70, 90, 95];

// ── Reports ─────────────────────────────────────────────────
export const reportsKpis = [
  { label: "Revenue · MTD", value: "KES 6.82M", delta: "+9.1% vs PRIOR MTD" },
  { label: "Gross margin · est.", value: "31.2%", delta: "+0.6 pts vs TARGET" },
  { label: "Orders · MTD", value: "4,286", delta: "+214 vs PRIOR MTD" },
  { label: "Scheduled exports", value: "12", delta: "3 DUE THIS WEEK", down: true },
] as const;

export type ReportsOutletRow = {
  slug: string;
  outlet: string;
  /** Share of company MTD revenue, for contribution column */
  shareOfMtdPct: number;
  revenueMtd: string;
  orders: number;
  targetPct: number;
  avgBasket: string;
  trend: string;
  trendDown?: boolean;
};

/** Outlet roll-up for reporting (Oct 1–24 window, aligned with ops mocks). */
export const reportsOutletRows: ReportsOutletRow[] = [
  { slug: "kiserian-main", outlet: "Kiserian Main", shareOfMtdPct: 33, revenueMtd: "KES 1.89M", orders: 1182, targetPct: 94, avgBasket: "KES 1,598", trend: "+11% WoW" },
  { slug: "rongai-plaza", outlet: "Rongai Plaza", shareOfMtdPct: 22, revenueMtd: "KES 1.24M", orders: 842, targetPct: 81, avgBasket: "KES 1,472", trend: "+6% WoW" },
  { slug: "ongata-hardware", outlet: "Ongata Hardware", shareOfMtdPct: 18, revenueMtd: "KES 982K", orders: 651, targetPct: 72, avgBasket: "KES 1,508", trend: "−2% WoW", trendDown: true },
  { slug: "ngong-road-branch", outlet: "Ngong Road Branch", shareOfMtdPct: 12, revenueMtd: "KES 714K", orders: 498, targetPct: 58, avgBasket: "KES 1,434", trend: "OFFLINE DRAG", trendDown: true },
  { slug: "karen-yard", outlet: "Karen Yard", shareOfMtdPct: 10, revenueMtd: "KES 628K", orders: 412, targetPct: 69, avgBasket: "KES 1,524", trend: "+4% WoW" },
  { slug: "magadi-road-stop", outlet: "Magadi Road Stop", shareOfMtdPct: 5, revenueMtd: "KES 286K", orders: 201, targetPct: 44, avgBasket: "KES 1,422", trend: "NEW · RAMP" },
];

/** Cumulative indexed revenue through Oct (current MTD vs prior-year same calendar days). For line chart only — not cash totals. */
export type ReportsMtdCumulativePoint = { day: string; current: number; prior: number };

export const reportsMtdCumulative: ReportsMtdCumulativePoint[] = [
  { day: "2", current: 11, prior: 10 },
  { day: "4", current: 22, prior: 20 },
  { day: "6", current: 31, prior: 30 },
  { day: "8", current: 40, prior: 39 },
  { day: "10", current: 48, prior: 46 },
  { day: "12", current: 55, prior: 52 },
  { day: "14", current: 62, prior: 58 },
  { day: "16", current: 69, prior: 64 },
  { day: "18", current: 76, prior: 70 },
  { day: "20", current: 83, prior: 76 },
  { day: "22", current: 91, prior: 82 },
  { day: "24", current: 100, prior: 88 },
];

export type ReportsCategoryMixRow = {
  category: string;
  pct: number;
  revenue: string;
  delta: string;
  down?: boolean;
};

export const reportsCategoryMix: ReportsCategoryMixRow[] = [
  { category: "Power tools", pct: 28, revenue: "KES 1.91M", delta: "+14% vs LY" },
  { category: "Plumbing", pct: 24, revenue: "KES 1.64M", delta: "+8% vs LY" },
  { category: "Hand tools", pct: 19, revenue: "KES 1.30M", delta: "+3% vs LY" },
  { category: "Building", pct: 14, revenue: "KES 955K", delta: "−1% vs LY", down: true },
  { category: "Electrical", pct: 9, revenue: "KES 614K", delta: "+11% vs LY" },
  { category: "Other", pct: 6, revenue: "KES 409K", delta: "FLAT" },
];

export type ReportsExportRow = {
  name: string;
  format: "CSV" | "PDF" | "XLSX";
  scope: string;
  status: { label: string; variant: "success" | "warn" | "info" | "outline"; dot?: boolean };
  when: string;
};

export const reportsRecentExports: ReportsExportRow[] = [
  { name: "Outlet P&L · October", format: "CSV", scope: "ALL OUTLETS", status: { label: "READY", variant: "success", dot: true }, when: "TODAY · 14:32" },
  { name: "SKU velocity · slow movers", format: "XLSX", scope: "INVENTORY", status: { label: "QUEUED", variant: "warn", dot: true }, when: "TODAY · 16:00" },
  { name: "Trade AR aging", format: "PDF", scope: "FINANCE", status: { label: "READY", variant: "success", dot: true }, when: "YESTERDAY · 09:05" },
  { name: "Delivery SLA · weekly", format: "CSV", scope: "OPS", status: { label: "SCHEDULED", variant: "info", dot: true }, when: "MON · 07:00" },
];

// ── POS ─────────────────────────────────────────────────────
export const posProducts = [
  { id: "ING-CD45-12V", name: "Ingco Cordless Drill 12V",  icon: "drill",      price: 4850, sku: "ING-CD45-12V" },
  { id: "JP-PW-14",     name: 'Pipe Wrench 14"',           icon: "wrench",     price: 1250, sku: "JP-PW-14"     },
  { id: "JP-HM-16",     name: "Claw Hammer 16oz",          icon: "hammer",     price: 680,  sku: "JP-HM-16"     },
  { id: "ING-TM-5",     name: "Tape Measure 5m",           icon: "ruler",      price: 320,  sku: "ING-TM-5"     },
  { id: "JP-PVC-12-3",  name: 'PVC Pipe 1/2" · 3m',       icon: "zap",        price: 215,  sku: "JP-PVC-12-3"  },
  { id: "ING-HH-Y",     name: "Safety Helmet · Yellow",    icon: "hard-hat",   price: 890,  sku: "ING-HH-Y"     },
  { id: "JP-PB-5",      name: "Paint Brush Set · 5pc",     icon: "paintbrush", price: 540,  sku: "JP-PB-5"      },
  { id: "JP-EW-25",     name: "Electrical Wire · 2.5mm",   icon: "cable",      price: 4200, sku: "JP-EW-25"     },
];

export const posCategories = ["All", "Power tools", "Hand tools", "Plumbing", "Electrical", "Safety", "Paints"];

export const posCartInitial = [
  { id: "ING-CD45-12V", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, price: 4850 },
  { id: "JP-PW-14",     name: 'Pipe Wrench 14"',          sku: "JP-PW-14",     qty: 2, price: 1250 },
  { id: "JP-PVC-12-3",  name: 'PVC Pipe 1/2" · 3m',      sku: "JP-PVC-12-3",  qty: 6, price: 215  },
  { id: "ING-HH-Y",     name: "Safety Helmet · Yellow",   sku: "ING-HH-Y",     qty: 1, price: 890  },
];

// ── Delivery ─────────────────────────────────────────────────
export type DeliveryStatus = "EN ROUTE" | "DELAYED" | "DELIVERED" | "UNASSIGNED";

export const deliveries = [
  { id: "#4821", customer: "Mary Wanjiku",        address: "Plot 14, Kiserian Town",      meta: "RIDER · JOHN W. · ETA 14:32",       status: "EN ROUTE"  as DeliveryStatus },
  { id: "#4822", customer: "Peter Otieno · Trade",address: "Bins Hardware, Magadi Rd",    meta: "RIDER · DENNIS K. · +18 MIN",       status: "DELAYED"   as DeliveryStatus },
  { id: "#4823", customer: "Angela Kerubo",        address: "Karen, Bogani East",          meta: "RIDER · STEPHEN N. · 14:08",        status: "DELIVERED" as DeliveryStatus },
  { id: "#4824", customer: "Samuel Njoroge",       address: "Ngong Town, Stage 2",         meta: "SCHEDULED · 15:00",                 status: "UNASSIGNED"as DeliveryStatus },
  { id: "#4825", customer: "Faith Akoth",          address: "Rongai, Tuskys Lane",         meta: "SCHEDULED · 15:30",                 status: "UNASSIGNED"as DeliveryStatus },
  { id: "#4826", customer: "George Kimani",        address: "Ongata Rongai Plaza",         meta: "RIDER · MARTIN O. · ETA 14:55",     status: "EN ROUTE"  as DeliveryStatus },
];

export type DeliveryTimelineStep = {
  time: string;
  title: string;
  meta?: string;
  done: boolean;
  active: boolean;
};

export type DeliveryDetailModel = {
  id: string;
  customer: string;
  phone: string;
  type: string;
  address: string;
  addressSub: string;
  rider: string;
  vehicle: string;
  value: string;
  payment: string;
  avatarInitials: string;
  timeline: DeliveryTimelineStep[];
};

const DELIVERY_DETAILS: Record<string, DeliveryDetailModel> = {
  "#4821": {
    id: "#4821",
    customer: "Mary Wanjiku",
    phone: "+254 711 203 441",
    type: "RETAIL",
    address: "Plot 14, Kiserian Town",
    addressSub: "Behind Naivas · ground floor",
    rider: "John Waweru",
    vehicle: "KDB 118M · Motorcycle",
    value: "KES 3,420",
    payment: "COD · ON DELIVERY",
    avatarInitials: "MW",
    timeline: [
      { time: "13:05", title: "Order placed", meta: "APP · PICKUP", done: true, active: false },
      { time: "13:18", title: "Picked from depot", meta: "3 ITEMS · JOHN W.", done: true, active: false },
      { time: "14:12 · NOW", title: "En route · Kiserian", meta: "ETA 14:32", done: false, active: true },
      { time: "— ETA 14:32", title: "Arrive at drop", meta: "", done: false, active: false },
      { time: "— PENDING", title: "Proof of delivery", meta: "", done: false, active: false },
    ],
  },
  "#4822": {
    id: "#4822",
    customer: "Peter Otieno",
    phone: "+254 722 456 891",
    type: "TRADE",
    address: "Bins Hardware Supply",
    addressSub: "Magadi Rd, opposite Total · Kiserian",
    rider: "Dennis Kamau",
    vehicle: "KDC 421J · Tuk-tuk",
    value: "KES 24,800",
    payment: "PAID · M-PESA",
    avatarInitials: "PO",
    timeline: [
      { time: "13:14", title: "Order placed", meta: "VIA POS · KISERIAN MAIN", done: true, active: false },
      { time: "13:22", title: "Picked from depot", meta: "8 ITEMS · DENNIS K.", done: true, active: false },
      { time: "13:48 · NOW", title: "Delayed on Magadi Rd", meta: "TRAFFIC · ETA 14:50 (+18 MIN)", done: false, active: true },
      { time: "— ETA 14:50", title: "Arrive at drop", meta: "", done: false, active: false },
      { time: "— PENDING", title: "Proof of delivery", meta: "", done: false, active: false },
    ],
  },
  "#4823": {
    id: "#4823",
    customer: "Angela Kerubo",
    phone: "+254 733 881 002",
    type: "RETAIL",
    address: "Karen · Bogani East",
    addressSub: "Gate code 4721",
    rider: "Stephen Njuguna",
    vehicle: "KDC 902K · Van",
    value: "KES 18,200",
    payment: "PAID · CARD",
    avatarInitials: "AK",
    timeline: [
      { time: "12:40", title: "Order placed", meta: "POS · KAREN YARD", done: true, active: false },
      { time: "12:55", title: "Picked from depot", meta: "6 ITEMS", done: true, active: false },
      { time: "13:40", title: "Arrived at drop", meta: "SIGNED · STEPHEN N.", done: true, active: false },
      { time: "14:08", title: "Delivered", meta: "POD UPLOADED", done: true, active: false },
    ],
  },
  "#4824": {
    id: "#4824",
    customer: "Samuel Njoroge",
    phone: "+254 700 112 903",
    type: "RETAIL",
    address: "Ngong Town, Stage 2",
    addressSub: "Scheduled window · 15:00",
    rider: "—",
    vehicle: "—",
    value: "KES 5,100",
    payment: "PENDING",
    avatarInitials: "SN",
    timeline: [
      { time: "11:02", title: "Order placed", meta: "ONLINE", done: true, active: false },
      { time: "— 15:00", title: "Assign rider", meta: "UNASSIGNED", done: false, active: true },
      { time: "— PENDING", title: "Pickup & delivery", meta: "", done: false, active: false },
    ],
  },
  "#4825": {
    id: "#4825",
    customer: "Faith Akoth",
    phone: "+254 722 009 771",
    type: "RETAIL",
    address: "Rongai, Tuskys Lane",
    addressSub: "Scheduled window · 15:30",
    rider: "—",
    vehicle: "—",
    value: "KES 2,890",
    payment: "M-PESA · ON DISPATCH",
    avatarInitials: "FA",
    timeline: [
      { time: "11:48", title: "Order placed", meta: "WHATSAPP", done: true, active: false },
      { time: "— 15:30", title: "Assign rider", meta: "UNASSIGNED", done: false, active: true },
      { time: "— PENDING", title: "Pickup & delivery", meta: "", done: false, active: false },
    ],
  },
  "#4826": {
    id: "#4826",
    customer: "George Kimani",
    phone: "+254 745 334 120",
    type: "RETAIL",
    address: "Ongata Rongai Plaza",
    addressSub: "Shop 12 · rear entrance",
    rider: "Martin Ochieng",
    vehicle: "KDB 445N · Motorcycle",
    value: "KES 7,650",
    payment: "COD",
    avatarInitials: "GK",
    timeline: [
      { time: "13:28", title: "Order placed", meta: "POS · RONGAI PLAZA", done: true, active: false },
      { time: "13:45", title: "Picked from depot", meta: "5 ITEMS · MARTIN O.", done: true, active: false },
      { time: "14:20 · NOW", title: "En route · Ongata", meta: "ETA 14:55", done: false, active: true },
      { time: "— ETA 14:55", title: "Arrive at drop", meta: "", done: false, active: false },
      { time: "— PENDING", title: "Proof of delivery", meta: "", done: false, active: false },
    ],
  },
};

export function getDeliveryDetail(id: string): DeliveryDetailModel {
  return DELIVERY_DETAILS[id] ?? DELIVERY_DETAILS["#4822"];
}

/** @deprecated Prefer getDeliveryDetail(id) */
export const deliveryDetail = DELIVERY_DETAILS["#4822"];

// ── Loyalty ──────────────────────────────────────────────────
export const loyaltyKpis = [
  { label: "Active members",      value: "2,418",     delta: "+124 THIS MONTH" },
  { label: "Points outstanding",  value: "1.84M",     delta: "KES 92,000 LIABILITY" },
  { label: "Active promos",       value: "4",         delta: "2 ENDING THIS WEEK" },
  { label: "Referral revenue · 30d", value: "KES 184k", delta: "+22.1% vs LAST MONTH" },
];

export const promos = [
  { name: "Tools Tuesday",       sub: "SELECT INGCO POWER TOOLS",  discount: "−15%", window: "Tue 09:00 – 18:00",   windowSub: "WEEKLY · ALL OUTLETS", redemptions: "142", rdSub: "THIS WEEK",  status: "LIVE",      statusType: "success" },
  { name: "Bulk PVC Pipes",      sub: "10+ UNITS",                 discount: "−8%",  window: "Oct 1 – Oct 31",       windowSub: "ALL OUTLETS",          redemptions: "68",  rdSub: "THIS MONTH", status: "LIVE",      statusType: "success" },
  { name: "Trade Day · Karen",   sub: "TRADE MEMBERS · KAREN ONLY",discount: "−12%", window: "Oct 26 (Sat)",         windowSub: "ENDS IN 2 DAYS",       redemptions: "—",   rdSub: "SCHEDULED",  status: "SOON",      statusType: "warn"    },
  { name: "First-time Customer", sub: "ONLINE ONLY",               discount: "KES 500", window: "Always on",         windowSub: "EVERGREEN",            redemptions: "94",  rdSub: "THIS MONTH", status: "LIVE",      statusType: "success" },
  { name: "Mason's Mid-Week",    sub: "CEMENT & STEEL",            discount: "−5%",  window: "Wed only",             windowSub: "DRAFT",                redemptions: "—",   rdSub: "UNPUBLISHED", status: "DRAFT",    statusType: "outline" },
];

export const referrals = [
  { initials: "MW", from: "Mary Wanjiku",  to: "Faith Akoth",    meta: "JOINED · 22 OCT · 1 ORDER",          pts: "+200" },
  { initials: "PO", from: "Peter Otieno", to: "Bins Hardware",   meta: "TRADE · 21 OCT · KES 24K",           pts: "+500" },
  { initials: "AK", from: "Angela Kerubo",to: "3 friends",       meta: "RETAIL · 19–21 OCT",                  pts: "+600" },
  { initials: "SN", from: "Samuel Njoroge",to: "George Kimani",  meta: "RETAIL · 18 OCT · KES 4K",           pts: "+200" },
];

/** Shared asset URLs for loyalty tier collages (Pexels + iStock). */
export const loyaltyTierCollageImages = {
  drill:
    "https://images.pexels.com/photos/8811529/pexels-photo-8811529.jpeg",
  hammer:
    "https://images.pexels.com/photos/7348593/pexels-photo-7348593.jpeg",
  cable:
    "https://images.pexels.com/photos/17264228/pexels-photo-17264228.jpeg",
  helmet:
    "https://media.istockphoto.com/id/171326814/photo/yellow-hard-hat-on-white-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=C9pzsxV4V_P4YmEG4Iml6KUVROjqFYEgf8SMhESB3vs=",
} as const;

export const loyaltyTiers = [
  {
    tier: "01",
    name: "Apprentice",
    pts: "0 – 999 PTS",
    perks: "1 pt / KES 100 · Birthday voucher · Members-only promos",
    bg: "bg-surface",
    dark: false,
    collage: [loyaltyTierCollageImages.cable, loyaltyTierCollageImages.hammer],
  },
  {
    tier: "02",
    name: "Journeyman",
    pts: "1,000 – 4,999 PTS",
    perks: "1.25 pts / KES 100 · Free delivery within Kiserian · Early promo access",
    bg: "bg-paper-2",
    dark: false,
    collage: [loyaltyTierCollageImages.hammer, loyaltyTierCollageImages.cable],
  },
  {
    tier: "03",
    name: "Master",
    pts: "5,000 – 14,999 PTS",
    perks: "1.5 pts / KES 100 · Free greater-Nairobi delivery · Trade pricing",
    bg: "bg-brand-yellow",
    dark: false,
    collage: [loyaltyTierCollageImages.drill, loyaltyTierCollageImages.hammer],
  },
  {
    tier: "04",
    name: "Foreman",
    pts: "15,000+ PTS",
    perks: "2 pts / KES 100 · Dedicated rep · Net-30 trade account",
    bg: "bg-brand-black",
    dark: true,
    collage: [
      loyaltyTierCollageImages.drill,
      loyaltyTierCollageImages.helmet,
      loyaltyTierCollageImages.cable,
    ],
  },
] as const;

// ── Social ───────────────────────────────────────────────────
export const socialKpis = [
  { label: "Reach · 7d",      value: "38,420", delta: "+18.6% vs LAST WEEK" },
  { label: "Engagement",      value: "4.8%",   delta: "+0.6 pts" },
  { label: "Leads captured",  value: "62",     delta: "+12 vs LAST WEEK" },
  { label: "Inbox · pending", value: "14",     delta: "3 OVERDUE", down: true },
];

export const scheduledPosts = [
  { channel: "ig", channelLabel: "INSTAGRAM",    title: "Tools Tuesday · Ingco Drill carousel", caption: '"Drilling through brick or hanging a frame — the 12V handles both. KES 4,850 today only."', meta: "3 SLIDES · LINK IN BIO",  time: "TODAY · 09:00", status: "QUEUED",       statusType: "success" },
  { channel: "fb", channelLabel: "FACEBOOK",     title: "Trade Day Karen · event invite",        caption: '"This Saturday, our Karen yard opens early for trade members. Coffee, cement, and 12% off everything."',      meta: "EVENT POST · CTA: RSVP",  time: "TUE · 14:00",  status: "NEEDS REVIEW", statusType: "warn"    },
  { channel: "wa", channelLabel: "WHATSAPP BIZ", title: "Loyalty broadcast · 240 members",       caption: '"You\'re 320 points away from Master tier. Save 1.5x on every shilling spent."',     meta: "SEGMENTED · TIER 02",     time: "WED · 10:00",  status: "QUEUED",       statusType: "success" },
  { channel: "tt", channelLabel: "TIKTOK",       title: "Mason hack · cement mixing reel",       caption: '"30-second mason hack from our Ngong yard. Tag a builder who needs to see this."',    meta: "32s VIDEO · DRAFT",       time: "THU · 17:00",  status: "DRAFT",        statusType: "outline" },
  { channel: "ig", channelLabel: "INSTAGRAM",    title: "Customer wall · Mary's bathroom",       caption: '"Mary picked up everything for her bathroom reno from one shelf. Receipts, not regrets."', meta: "1 IMAGE · UGC PERMISSION ✓", time: "FRI · 12:00", status: "QUEUED",      statusType: "success" },
];

export const leads = [
  { initials: "FA", name: "Faith Akoth",   meta: "INSTAGRAM DM · TILE PRICING · 22 OCT",       status: "NEW",     statusType: "info"    },
  { initials: "GK", name: "George Kimani", meta: "WHATSAPP · BULK CEMENT · 22 OCT",            status: "QUOTED",  statusType: "warn"    },
  { initials: "JK", name: "Jane Kamene",   meta: "FACEBOOK COMMENT · 21 OCT",                  status: "NEW",     statusType: "info"    },
  { initials: "DM", name: "Daniel Maina",  meta: "WHATSAPP · TRADE A/C INQUIRY · 21 OCT",      status: "WON · KES 18K", statusType: "success" },
  { initials: "RW", name: "Rose Wairimu",  meta: "INSTAGRAM · 20 OCT · NO REPLY",              status: "OVERDUE", statusType: "danger"  },
];

// ── E-commerce ───────────────────────────────────────────────
export const shopCategories = [
  { icon: "drill",      name: "Power tools", count: 412 },
  { icon: "wrench",     name: "Hand tools",  count: 680 },
  { icon: "pipette",    name: "Plumbing",    count: 274 },
  { icon: "zap",        name: "Electrical",  count: 198 },
  { icon: "hard-hat",   name: "Safety",      count: 112 },
  { icon: "paintbrush", name: "Paints",      count: 86  },
];

/** Full-bleed shop marquee — promotional cards (e-commerce carousel). */
export type ShopPromoCarouselItem = {
  image: string;
  title: string;
  sub: string;
  badge?: string;
};

export const shopPromoCarousel: ShopPromoCarouselItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80",
    title: "Ingco 12V drill",
    sub: "Tools Tuesday · while stocks last",
    badge: "−15%",
  },
  {
    image: "https://images.pexels.com/photos/7348593/pexels-photo-7348593.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    title: "Demolition hammer",
    sub: "Trade counter pricing",
    badge: "NEW",
  },
  {
    image: "https://images.pexels.com/photos/162553/pexels-photo-162553.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    title: "Hand tools bundle",
    sub: "Buy 3+ save 10%",
    badge: "BUNDLE",
  },
  {
    image: "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    title: "Plumbing week",
    sub: "PVC & fittings",
    badge: "8% OFF",
  },
  {
    image: "https://images.pexels.com/photos/17264228/pexels-photo-17264228.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    title: "Cable reel 25m",
    sub: "Low stock alert price",
    badge: "DEAL",
  },
  {
    image: "https://images.pexels.com/photos/8960865/pexels-photo-8960865.jpeg?auto=compress&cs=tinysrgb&w=900&q=80",
    title: "Loyalty double points",
    sub: "Sat–Sun only",
    badge: "2× PTS",
  },
];

/** Promo tiles — `image` is a hotlinked product-style photo (Unsplash). */
export const featuredProducts = [
  {
    name: "Ingco Cordless Drill 12V",
    sku: "ING-CD45-12V",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    price: 4850,
    originalPrice: 5700,
    badge: "−15%",
    badgeType: "b-yellow",
  },
  {
    name: "Ingco Demolition Hammer",
    sku: "ING-DH-1500",
    image:
      "https://images.pexels.com/photos/7348593/pexels-photo-7348593.jpeg",
    price: 18400,
    originalPrice: null,
    badge: "NEW",
    badgeType: "b-yellow",
  },
  {
    name: "Cable Reel · 25m · 2.5mm",
    sku: "JP-CR-25",
    image:
      "https://images.pexels.com/photos/17264228/pexels-photo-17264228.jpeg",
    price: 4200,
    originalPrice: null,
    badge: "3 LEFT",
    badgeType: "b-danger",
  },
  {
    name: "Ingco Safety Helmet",
    sku: "ING-HH-Y",
    image:
      "https://media.istockphoto.com/id/171326814/photo/yellow-hard-hat-on-white-with-clipping-path.jpg?s=1024x1024&w=is&k=20&c=C9pzsxV4V_P4YmEG4Iml6KUVROjqFYEgf8SMhESB3vs=",
    price: 890,
    originalPrice: null,
    badge: null,
    badgeType: "",
  },
] as const;

export const loyaltyStats = [
  { n: "2,400+", l: "Members" },
  { n: "5%",     l: "Avg. saving / order" },
  { n: "6",      l: "Outlets to redeem" },
  { n: "24h",    l: "Same-day delivery" },
];

// ── Orders list (wire: skill/orders.html) ───────────────────
export const ordersKpis = [
  { label: "Today", value: "182", delta: "+8 vs YESTERDAY" },
  { label: "Revenue · today", value: "KES 248,140", delta: "+12.4%" },
  { label: "Pending", value: "7", delta: "2 OVERDUE", down: true },
  { label: "Refunds · 7d", value: "KES 4,820", delta: "3 ORDERS" },
] as const;

export const ordersTabs = [
  { id: "all", label: "All · 182" },
  { id: "pos", label: "POS · 138" },
  { id: "online", label: "Online · 38" },
  { id: "trade", label: "Trade · 6" },
  { id: "pending", label: "Pending · 7" },
  { id: "refunded", label: "Refunded · 3" },
] as const;

export type OrderListRow = {
  id: string;
  channel: "POS" | "ONLINE";
  outlet: string;
  customer: string;
  customerMeta?: string;
  items: number;
  total: string;
  payment: { label: string; variant: "success" | "warn" | "outline" };
  status: { label: string; variant: "success" | "warn" | "danger" | "info"; dot?: boolean };
  time: string;
};

export const ordersTableRows: OrderListRow[] = [
  { id: "02-1247", channel: "POS", outlet: "Kiserian", customer: "Mary Wanjiku", customerMeta: "+254 722 ··· 882 · LOYALTY", items: 4, total: "KES 10,503", payment: { label: "M-PESA", variant: "success" }, status: { label: "PAID", variant: "success", dot: true }, time: "14:08" },
  { id: "02-1245", channel: "POS", outlet: "Kiserian", customer: "Bins Hardware", customerMeta: "P. OTIENO · TRADE", items: 12, total: "KES 24,800", payment: { label: "M-PESA", variant: "success" }, status: { label: "EN ROUTE", variant: "info", dot: true }, time: "13:14" },
  { id: "03-0884", channel: "POS", outlet: "Rongai", customer: "Walk-in", items: 2, total: "KES 5,540", payment: { label: "CASH", variant: "success" }, status: { label: "PAID", variant: "success", dot: true }, time: "12:48" },
  { id: "W-4821", channel: "ONLINE", outlet: "—", customer: "Faith Akoth", customerMeta: "+254 720 ··· 116", items: 3, total: "KES 4,180", payment: { label: "M-PESA", variant: "success" }, status: { label: "PROCESSING", variant: "info", dot: true }, time: "12:22" },
  { id: "04-0612", channel: "POS", outlet: "Ongata", customer: "Walk-in", items: 6, total: "KES 3,140", payment: { label: "CASH", variant: "success" }, status: { label: "PAID", variant: "success", dot: true }, time: "11:51" },
  { id: "W-4820", channel: "ONLINE", outlet: "—", customer: "Daniel Maina", customerMeta: "TRADE A/C · NET-30", items: 14, total: "KES 18,400", payment: { label: "NET-30", variant: "warn" }, status: { label: "HOLD · CREDIT", variant: "warn", dot: true }, time: "11:20" },
  { id: "02-1242", channel: "POS", outlet: "Kiserian", customer: "George Kimani", items: 1, total: "KES 4,850", payment: { label: "CARD", variant: "success" }, status: { label: "PAID", variant: "success", dot: true }, time: "10:48" },
  { id: "05-0214", channel: "POS", outlet: "Karen", customer: "Angela Kerubo", items: 3, total: "KES 1,820", payment: { label: "CASH", variant: "success" }, status: { label: "DELIVERED", variant: "success", dot: true }, time: "10:14" },
  { id: "W-4819", channel: "ONLINE", outlet: "—", customer: "Rose Wairimu", items: 2, total: "KES 1,290", payment: { label: "M-PESA", variant: "success" }, status: { label: "REFUNDED", variant: "danger", dot: true }, time: "09:42" },
  { id: "02-1240", channel: "POS", outlet: "Kiserian", customer: "Walk-in", items: 5, total: "KES 8,420", payment: { label: "M-PESA", variant: "success" }, status: { label: "PAID", variant: "success", dot: true }, time: "09:18" },
];

// ── Order receipt (wire: skill/order-detail.html) ───────────
export type OrderReceiptLine = {
  icon: "drill" | "wrench" | "zap" | "hard-hat";
  name: string;
  sku: string;
  qty: number;
  unit: string;
  subtotal: string;
};

export type OrderReceiptTimelineStep = {
  title: string;
  meta: string;
  time: string;
  done: boolean;
  active: boolean;
};

export type OrderReceipt = {
  id: string;
  displayId: string;
  /** Header bracket, e.g. RECEIPT // PAID */
  receiptBracket?: string;
  issued: string;
  outlet: string;
  cashier: string;
  customer: string;
  customerMeta: string;
  payment: string;
  paymentMeta: string;
  lines: OrderReceiptLine[];
  subtotal: string;
  /** Omit to hide the loyalty row on the receipt page */
  loyaltyDiscount?: string;
  vat: string;
  total: string;
  /** Footer label for the total line (default: Total paid) */
  totalLabel?: string;
  verifyCode: string;
  timeline: OrderReceiptTimelineStep[];
};

function kesNetVatFromInclVat(totalInclVat: number): Pick<OrderReceipt, "subtotal" | "vat" | "total"> {
  const net = Math.round(totalInclVat / 1.16);
  const vat = totalInclVat - net;
  const f = (n: number) => `KES ${n.toLocaleString("en-KE")}`;
  return { subtotal: f(net), vat: f(vat), total: f(totalInclVat) };
}

function verifyForOrderId(id: string): string {
  const k = id.replace(/^#/, "").replace(/[^A-Z0-9-]/gi, "");
  return `${k}-JP-VERIFY`;
}

const ORDER_RECEIPTS: Record<string, OrderReceipt> = {
  "02-1247": {
    id: "02-1247",
    displayId: "Order #02-1247",
    issued: "ISSUED OCT 24, 2025 · 14:08 EAT",
    outlet: "Kiserian Main · Till 02",
    cashier: "John Mwangi",
    customer: "Mary Wanjiku",
    customerMeta: "+254 722 ··· 882 · LOYALTY · 1,240 PTS",
    payment: "M-Pesa · QYZ7H4M",
    paymentMeta: "SETTLED 14:08 · TILL 174432",
    lines: [
      { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, unit: "KES 4,850", subtotal: "KES 4,850" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 2, unit: "KES 1,250", subtotal: "KES 2,500" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 6, unit: "KES 215", subtotal: "KES 1,290" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 890", subtotal: "KES 890" },
    ],
    subtotal: "KES 9,530",
    loyaltyDiscount: "−KES 476",
    vat: "KES 1,449",
    total: "KES 10,503",
    verifyCode: "02-1247-QYZ7H4M",
    timeline: [
      { title: "Sale opened at POS", meta: "CASHIER J. MWANGI · TILL 02", time: "14:02", done: true, active: false },
      { title: "Loyalty applied · 5% discount", meta: "MARY WANJIKU · TIER 02", time: "14:06", done: true, active: false },
      { title: "Payment settled · M-Pesa", meta: "QYZ7H4M · KES 10,503", time: "14:08", done: true, active: false },
      { title: "Receipt issued · WhatsApp + SMS", meta: "+254 722 ··· 882", time: "14:08", done: true, active: false },
      { title: "+10 loyalty points credited", meta: "NEW BALANCE: 1,250 PTS · 320 TO MASTER", time: "14:09", done: false, active: true },
    ],
  },
  "02-1246": {
    id: "02-1246",
    displayId: "Order #02-1246",
    issued: "ISSUED OCT 24, 2025 · 13:52 EAT",
    outlet: "Kiserian Main · Till 02",
    cashier: "John Mwangi",
    customer: "Walk-in",
    customerMeta: "COUNTER SALE · NO ACCOUNT",
    payment: "Cash",
    paymentMeta: "SETTLED 13:52 · TILL 174432",
    lines: [{ icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 983", subtotal: "KES 983" }],
    ...kesNetVatFromInclVat(1140),
    verifyCode: verifyForOrderId("02-1246"),
    timeline: [
      { title: "Sale opened at POS", meta: "CASHIER J. MWANGI · TILL 02", time: "13:50", done: true, active: false },
      { title: "Payment settled · Cash", meta: "KES 1,140", time: "13:52", done: true, active: false },
      { title: "Receipt printed", meta: "TILL 02", time: "13:52", done: true, active: true },
    ],
  },
  "02-1245": {
    id: "02-1245",
    displayId: "Order #02-1245",
    issued: "ISSUED OCT 24, 2025 · 13:14 EAT",
    outlet: "Kiserian Main · Till 02",
    cashier: "Sarah Kamau",
    customer: "Bins Hardware",
    customerMeta: "P. OTIENO · TRADE · EN ROUTE",
    payment: "M-Pesa · TRD-8821",
    paymentMeta: "AUTHORISED · DISPATCH PENDING",
    lines: [
      { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 2, unit: "KES 4,850", subtotal: "KES 9,700" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 4, unit: "KES 1,250", subtotal: "KES 5,000" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 13, unit: "KES 215", subtotal: "KES 2,795" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 2, unit: "KES 890", subtotal: "KES 1,780" },
      { icon: "zap", name: "Trade adjustments · bundle", sku: "JP-ADJ-02-1245", qty: 1, unit: "KES 2,104", subtotal: "KES 2,104" },
    ],
    ...kesNetVatFromInclVat(24800),
    verifyCode: verifyForOrderId("02-1245"),
    timeline: [
      { title: "Trade sale opened", meta: "BINS HARDWARE · TILL 01", time: "13:05", done: true, active: false },
      { title: "Payment authorised · M-Pesa", meta: "TRD-8821", time: "13:14", done: true, active: false },
      { title: "Dispatch · EN ROUTE", meta: "YARD PICK · RIDER ASSIGNED", time: "13:20", done: false, active: true },
    ],
  },
  "W-4821": {
    id: "W-4821",
    displayId: "Web order W-4821",
    receiptBracket: "RECEIPT // ONLINE",
    issued: "PLACED OCT 24, 2025 · 12:22 EAT",
    outlet: "Web checkout · Kiserian fulfilment",
    cashier: "System · auto",
    customer: "Faith Akoth",
    customerMeta: "+254 720 ··· 116 · LOYALTY",
    payment: "M-Pesa · pending capture",
    paymentMeta: "PROCESSING · PICK AT TILL",
    lines: [
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,250", subtotal: "KES 1,250" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 890", subtotal: "KES 890" },
      { icon: "zap", name: "Mixed fulfilment line", sku: "JP-MIX-W4821", qty: 1, unit: "KES 1,463", subtotal: "KES 1,463" },
    ],
    ...kesNetVatFromInclVat(4180),
    verifyCode: verifyForOrderId("W-4821"),
    timeline: [
      { title: "Order placed · web", meta: "FAITH AKOTH", time: "12:22", done: true, active: false },
      { title: "Payment · M-Pesa", meta: "AWAITING CONFIRMATION", time: "12:23", done: false, active: true },
      { title: "Fulfilment", meta: "KISERIAN MAIN", time: "—", done: false, active: false },
    ],
  },
  "02-1243": {
    id: "02-1243",
    displayId: "Order #02-1243",
    issued: "ISSUED OCT 24, 2025 · 12:05 EAT",
    outlet: "Kiserian Main · Till 01",
    cashier: "Sarah Kamau",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "M-Pesa · K9L2M1",
    paymentMeta: "SETTLED 12:05",
    lines: [{ icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 767", subtotal: "KES 767" }],
    ...kesNetVatFromInclVat(890),
    verifyCode: verifyForOrderId("02-1243"),
    timeline: [
      { title: "Sale opened", meta: "TILL 01", time: "12:04", done: true, active: false },
      { title: "Payment settled", meta: "M-PESA K9L2M1", time: "12:05", done: true, active: true },
    ],
  },
  "W-4820": {
    id: "W-4820",
    displayId: "Web order W-4820",
    receiptBracket: "ORDER // CREDIT HOLD",
    issued: "PLACED OCT 24, 2025 · 11:20 EAT",
    outlet: "Web checkout · Trade desk",
    cashier: "Accounts · review",
    customer: "Daniel Maina",
    customerMeta: "TRADE A/C · NET-30 · HOLD · CREDIT",
    payment: "NET-30 · not settled",
    paymentMeta: "CREDIT LIMIT CHECK · PENDING",
    lines: [
      { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, unit: "KES 4,850", subtotal: "KES 4,850" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 4, unit: "KES 1,250", subtotal: "KES 5,000" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 15, unit: "KES 215", subtotal: "KES 3,225" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 2, unit: "KES 890", subtotal: "KES 1,780" },
      { icon: "zap", name: "Trade line · mixed SKUs", sku: "JP-ADJ-W4820", qty: 1, unit: "KES 1,007", subtotal: "KES 1,007" },
    ],
    ...kesNetVatFromInclVat(18400),
    totalLabel: "Total due (NET-30)",
    verifyCode: verifyForOrderId("W-4820"),
    timeline: [
      { title: "Web order submitted", meta: "DANIEL MAINA · TRADE", time: "11:20", done: true, active: false },
      { title: "Credit hold", meta: "NET-30 · APPROVAL QUEUE", time: "11:21", done: false, active: true },
      { title: "Dispatch", meta: "BLOCKED UNTIL APPROVED", time: "—", done: false, active: false },
    ],
  },
  "02-1242": {
    id: "02-1242",
    displayId: "Order #02-1242",
    issued: "ISSUED OCT 24, 2025 · 10:48 EAT",
    outlet: "Kiserian Main · Till 02",
    cashier: "John Mwangi",
    customer: "George Kimani",
    customerMeta: "CARD · CHIP",
    payment: "Card · Visa ·••• 4412",
    paymentMeta: "SETTLED 10:48 · AUTH 883921",
    lines: [{ icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, unit: "KES 4,181", subtotal: "KES 4,181" }],
    ...kesNetVatFromInclVat(4850),
    verifyCode: verifyForOrderId("02-1242"),
    timeline: [
      { title: "Sale opened", meta: "TILL 02", time: "10:46", done: true, active: false },
      { title: "Card payment", meta: "VISA · APPROVED", time: "10:48", done: true, active: true },
    ],
  },
  "03-0884": {
    id: "03-0884",
    displayId: "Order #03-0884",
    issued: "ISSUED OCT 24, 2025 · 12:48 EAT",
    outlet: "Rongai Plaza · Till 01",
    cashier: "Alice Kiprop",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "Cash",
    paymentMeta: "SETTLED 12:48",
    lines: [
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,250", subtotal: "KES 1,250" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 16, unit: "KES 215", subtotal: "KES 3,440" },
      { icon: "zap", name: "Line rounding", sku: "JP-ADJ-03-0884", qty: 1, unit: "KES 86", subtotal: "KES 86" },
    ],
    ...kesNetVatFromInclVat(5540),
    verifyCode: verifyForOrderId("03-0884"),
    timeline: [
      { title: "Sale opened · Rongai", meta: "TILL 01", time: "12:46", done: true, active: false },
      { title: "Cash tender", meta: "KES 5,540", time: "12:48", done: true, active: true },
    ],
  },
  "04-0612": {
    id: "04-0612",
    displayId: "Order #04-0612",
    issued: "ISSUED OCT 24, 2025 · 11:51 EAT",
    outlet: "Ongata Hardware · Till 01",
    cashier: "Chris Kim",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "Cash",
    paymentMeta: "SETTLED 11:51",
    lines: [
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 4, unit: "KES 215", subtotal: "KES 860" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,250", subtotal: "KES 1,250" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 597", subtotal: "KES 597" },
    ],
    ...kesNetVatFromInclVat(3140),
    verifyCode: verifyForOrderId("04-0612"),
    timeline: [
      { title: "Sale opened", meta: "ONGATA · TILL 01", time: "11:49", done: true, active: false },
      { title: "Cash settled", meta: "KES 3,140", time: "11:51", done: true, active: true },
    ],
  },
  "W-4819": {
    id: "W-4819",
    displayId: "Web order W-4819",
    receiptBracket: "RECEIPT // REFUNDED",
    issued: "REFUNDED OCT 24, 2025 · 09:42 EAT",
    outlet: "Web checkout",
    cashier: "Support · L4",
    customer: "Rose Wairimu",
    customerMeta: "+254 711 ··· 009",
    payment: "M-Pesa · reversed R-9921",
    paymentMeta: "FULL REFUND ISSUED",
    lines: [
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 2, unit: "KES 215", subtotal: "KES 430" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 682", subtotal: "KES 682" },
    ],
    ...kesNetVatFromInclVat(1290),
    totalLabel: "Refund total",
    verifyCode: verifyForOrderId("W-4819"),
    timeline: [
      { title: "Original order", meta: "W-4819 · M-PESA", time: "09:10", done: true, active: false },
      { title: "Refund requested", meta: "CUSTOMER SUPPORT", time: "09:35", done: true, active: false },
      { title: "Refund settled", meta: "R-9921 · KES 1,290", time: "09:42", done: true, active: true },
    ],
  },
  "02-1240": {
    id: "02-1240",
    displayId: "Order #02-1240",
    issued: "ISSUED OCT 24, 2025 · 09:18 EAT",
    outlet: "Kiserian Main · Till 02",
    cashier: "John Mwangi",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "M-Pesa · P9X3TT",
    paymentMeta: "SETTLED 09:18",
    lines: [
      { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, unit: "KES 4,850", subtotal: "KES 4,850" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,250", subtotal: "KES 1,250" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 5, unit: "KES 215", subtotal: "KES 1,075" },
      { icon: "zap", name: "Rounding · bundle", sku: "JP-ADJ-02-1240", qty: 1, unit: "KES 75", subtotal: "KES 75" },
    ],
    ...kesNetVatFromInclVat(8420),
    verifyCode: verifyForOrderId("02-1240"),
    timeline: [
      { title: "Sale opened", meta: "TILL 02", time: "09:15", done: true, active: false },
      { title: "M-Pesa settled", meta: "P9X3TT", time: "09:18", done: true, active: true },
    ],
  },
  "03-0901": {
    id: "03-0901",
    displayId: "Order #03-0901",
    issued: "ISSUED OCT 24, 2025 · 10:12 EAT",
    outlet: "Rongai Plaza · Till 01",
    cashier: "Alice Kiprop",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "Cash",
    paymentMeta: "SETTLED 10:12",
    lines: [
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 4, unit: "KES 215", subtotal: "KES 860" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 950", subtotal: "KES 950" },
    ],
    ...kesNetVatFromInclVat(2100),
    verifyCode: verifyForOrderId("03-0901"),
    timeline: [
      { title: "Sale opened", meta: "RONGAI", time: "10:10", done: true, active: false },
      { title: "Cash", meta: "KES 2,100", time: "10:12", done: true, active: true },
    ],
  },
  "03-0900": {
    id: "03-0900",
    displayId: "Order #03-0900",
    issued: "ISSUED OCT 24, 2025 · 09:55 EAT",
    outlet: "Rongai Plaza · Till 01",
    cashier: "Alice Kiprop",
    customer: "George Kimani",
    customerMeta: "WALK-IN",
    payment: "M-Pesa · G7K2LL",
    paymentMeta: "SETTLED 09:55",
    lines: [
      { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", qty: 1, unit: "KES 4,850", subtotal: "KES 4,850" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 11, unit: "KES 215", subtotal: "KES 2,365" },
      { icon: "zap", name: "Line rounding", sku: "JP-ADJ-03-0900", qty: 1, unit: "KES 35", subtotal: "KES 35" },
    ],
    ...kesNetVatFromInclVat(8420),
    verifyCode: verifyForOrderId("03-0900"),
    timeline: [
      { title: "Sale opened", meta: "RONGAI · TILL 01", time: "09:52", done: true, active: false },
      { title: "M-Pesa", meta: "G7K2LL", time: "09:55", done: true, active: true },
    ],
  },
  "03-0899": {
    id: "03-0899",
    displayId: "Order #03-0899",
    issued: "ISSUED OCT 24, 2025 · 09:30 EAT",
    outlet: "Rongai Plaza · Trade counter",
    cashier: "Brian Njoroge",
    customer: "Trade counter",
    customerMeta: "WHOLESALE · NET-7",
    payment: "M-Pesa · TC-7712",
    paymentMeta: "SETTLED 09:30",
    lines: [
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 6, unit: "KES 1,250", subtotal: "KES 7,500" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 20, unit: "KES 215", subtotal: "KES 4,300" },
      { icon: "zap", name: "Trade adjustments", sku: "JP-ADJ-03-0899", qty: 1, unit: "KES 441", subtotal: "KES 441" },
    ],
    ...kesNetVatFromInclVat(14200),
    verifyCode: verifyForOrderId("03-0899"),
    timeline: [
      { title: "Trade sale", meta: "RONGAI COUNTER", time: "09:22", done: true, active: false },
      { title: "Payment", meta: "M-PESA TC-7712", time: "09:30", done: true, active: true },
    ],
  },
  "04-0611": {
    id: "04-0611",
    displayId: "Order #04-0611",
    issued: "ISSUED OCT 24, 2025 · 11:20 EAT",
    outlet: "Ongata Hardware · Till 01",
    cashier: "Chris Kim",
    customer: "Mary W.",
    customerMeta: "ACCOUNT",
    payment: "M-Pesa · MW-2210",
    paymentMeta: "SETTLED 11:20",
    lines: [
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,250", subtotal: "KES 1,250" },
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 379", subtotal: "KES 379" },
    ],
    ...kesNetVatFromInclVat(1890),
    verifyCode: verifyForOrderId("04-0611"),
    timeline: [
      { title: "Sale opened", meta: "ONGATA", time: "11:18", done: true, active: false },
      { title: "M-Pesa", meta: "MW-2210", time: "11:20", done: true, active: true },
    ],
  },
  "05-0301": {
    id: "05-0301",
    displayId: "Order #05-0301",
    issued: "ISSUED OCT 24, 2025 · 08:40 EAT (cached)",
    outlet: "Ngong Road Branch · Till 01",
    cashier: "Lydia W.",
    customer: "Walk-in",
    customerMeta: "OUTLET OFFLINE · LOCAL CACHE",
    payment: "Cash",
    paymentMeta: "SETTLED 08:40",
    lines: [{ icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 2, unit: "KES 276", subtotal: "KES 552" }],
    ...kesNetVatFromInclVat(640),
    verifyCode: verifyForOrderId("05-0301"),
    timeline: [
      { title: "Offline sale · queued sync", meta: "NGONG", time: "08:40", done: true, active: true },
    ],
  },
  "05-0300": {
    id: "05-0300",
    displayId: "Order #05-0300",
    issued: "ISSUED OCT 24, 2025 · 08:05 EAT (cached)",
    outlet: "Ngong Road Branch · Till 01",
    cashier: "Samuel Njoroge",
    customer: "Samuel N.",
    customerMeta: "STAFF PURCHASE",
    payment: "M-Pesa · SN-8831",
    paymentMeta: "SETTLED 08:05",
    lines: [
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 2, unit: "KES 1,250", subtotal: "KES 2,500" },
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 1, unit: "KES 259", subtotal: "KES 259" },
    ],
    ...kesNetVatFromInclVat(3200),
    verifyCode: verifyForOrderId("05-0300"),
    timeline: [
      { title: "Sale · Ngong", meta: "TILL 01", time: "08:03", done: true, active: false },
      { title: "M-Pesa", meta: "SN-8831", time: "08:05", done: true, active: true },
    ],
  },
  "05-0214": {
    id: "05-0214",
    displayId: "Order #05-0214",
    issued: "ISSUED OCT 24, 2025 · 10:14 EAT",
    outlet: "Karen Yard · Till 01",
    cashier: "Tom M.",
    customer: "Angela Kerubo",
    customerMeta: "DELIVERED · LOCAL",
    payment: "Cash",
    paymentMeta: "SETTLED 10:14",
    lines: [
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 5, unit: "KES 215", subtotal: "KES 1,075" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 494", subtotal: "KES 494" },
    ],
    ...kesNetVatFromInclVat(1820),
    verifyCode: verifyForOrderId("05-0214"),
    timeline: [
      { title: "Karen sale", meta: "TILL 01", time: "10:12", done: true, active: false },
      { title: "Delivered · signed", meta: "A. KERUBO", time: "10:14", done: true, active: true },
    ],
  },
  "05-0213": {
    id: "05-0213",
    displayId: "Order #05-0213",
    issued: "ISSUED OCT 24, 2025 · 09:50 EAT",
    outlet: "Karen Yard · Till 01",
    cashier: "Tom M.",
    customer: "Walk-in",
    customerMeta: "COUNTER",
    payment: "M-Pesa · KR-1102",
    paymentMeta: "SETTLED 09:50",
    lines: [
      { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", qty: 1, unit: "KES 890", subtotal: "KES 890" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 1,179", subtotal: "KES 1,179" },
    ],
    ...kesNetVatFromInclVat(2400),
    verifyCode: verifyForOrderId("05-0213"),
    timeline: [
      { title: "Sale", meta: "KAREN", time: "09:48", done: true, active: false },
      { title: "M-Pesa", meta: "KR-1102", time: "09:50", done: true, active: true },
    ],
  },
  "06-0008": {
    id: "06-0008",
    displayId: "Order #06-0008",
    issued: "ISSUED OCT 24, 2025 · 08:22 EAT",
    outlet: "Magadi Road Stop · Till 01",
    cashier: "Leah S.",
    customer: "Walk-in",
    customerMeta: "NEW OUTLET",
    payment: "Cash",
    paymentMeta: "SETTLED 08:22",
    lines: [
      { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 2, unit: "KES 215", subtotal: "KES 430" },
      { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", qty: 1, unit: "KES 415", subtotal: "KES 415" },
    ],
    ...kesNetVatFromInclVat(980),
    verifyCode: verifyForOrderId("06-0008"),
    timeline: [
      { title: "Magadi sale", meta: "TILL 01", time: "08:20", done: true, active: false },
      { title: "Cash", meta: "KES 980", time: "08:22", done: true, active: true },
    ],
  },
  "06-0007": {
    id: "06-0007",
    displayId: "Order #06-0007",
    issued: "ISSUED OCT 24, 2025 · 08:05 EAT",
    outlet: "Magadi Road Stop · Till 01",
    cashier: "Dennis M.",
    customer: "Dennis M.",
    customerMeta: "MANAGER TEST RING",
    payment: "Cash",
    paymentMeta: "SETTLED 08:05",
    lines: [{ icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", qty: 1, unit: "KES 362", subtotal: "KES 362" }],
    ...kesNetVatFromInclVat(420),
    verifyCode: verifyForOrderId("06-0007"),
    timeline: [
      { title: "Test sale", meta: "MAGADI", time: "08:05", done: true, active: true },
    ],
  },
};

export function getOrderReceipt(orderId: string): OrderReceipt | undefined {
  const key = orderId.replace(/^#/, "").trim();
  return ORDER_RECEIPTS[key];
}

// ── Inventory catalogue (wire: skill/inventory.html) ────────
export const inventoryCatalogueKpis = [
  { label: "SKUs", value: "1,762", delta: "+24 THIS MONTH" },
  { label: "Stock value", value: "KES 18.4M", delta: "ALL OUTLETS" },
  { label: "Low stock", value: "42", delta: "8 CRITICAL", down: true },
  { label: "Out of stock", value: "11", delta: "REORDER PENDING", down: true },
] as const;

export const inventoryOutletLabels = ["Kiserian", "Rongai", "Ongata", "Ngong", "Karen", "Magadi"] as const;

export type InventoryCatalogueIcon =
  | "drill" | "hammer" | "wrench" | "ruler" | "zap" | "hard-hat" | "paintbrush" | "cable" | "package";

export type InventoryCatalogueRow = {
  icon: InventoryCatalogueIcon;
  name: string;
  sku: string;
  category: string;
  price: string;
  /** Per-outlet qty + display tone (ok | low | out) */
  stocks: ReadonlyArray<[number, "ok" | "low" | "out"]>;
  total: number;
  status: { label: string; variant: "success" | "warn" | "danger"; dot: boolean };
};

export const inventoryCatalogueRows: InventoryCatalogueRow[] = [
  { icon: "drill", name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", category: "Power tools", price: "KES 4,850", stocks: [[3, "out"], [14, "ok"], [8, "ok"], [11, "ok"], [6, "ok"], [4, "ok"]], total: 46, status: { label: "LOW", variant: "danger", dot: true } },
  { icon: "hammer", name: "Ingco Demolition Hammer", sku: "ING-DH-1500", category: "Power tools", price: "KES 18,400", stocks: [[7, "ok"], [4, "ok"], [2, "ok"], [3, "ok"], [1, "ok"], [0, "out"]], total: 17, status: { label: "OK", variant: "success", dot: true } },
  { icon: "wrench", name: 'Pipe Wrench 14"', sku: "JP-PW-14", category: "Hand tools", price: "KES 1,250", stocks: [[28, "ok"], [22, "ok"], [14, "ok"], [19, "ok"], [8, "ok"], [12, "ok"]], total: 103, status: { label: "OK", variant: "success", dot: true } },
  { icon: "hammer", name: "Claw Hammer 16oz", sku: "JP-HM-16", category: "Hand tools", price: "KES 680", stocks: [[42, "ok"], [38, "ok"], [21, "ok"], [28, "ok"], [14, "ok"], [11, "ok"]], total: 154, status: { label: "OK", variant: "success", dot: true } },
  { icon: "ruler", name: "Tape Measure 5m", sku: "ING-TM-5", category: "Hand tools", price: "KES 320", stocks: [[68, "ok"], [52, "ok"], [31, "ok"], [44, "ok"], [22, "ok"], [18, "ok"]], total: 235, status: { label: "OK", variant: "success", dot: true } },
  { icon: "zap", name: 'PVC Pipe 1/2" · 3m', sku: "JP-PVC-12-3", category: "Plumbing", price: "KES 215", stocks: [[142, "ok"], [98, "ok"], [76, "ok"], [88, "ok"], [42, "ok"], [36, "ok"]], total: 482, status: { label: "OK", variant: "success", dot: true } },
  { icon: "hard-hat", name: "Safety Helmet · Yellow", sku: "ING-HH-Y", category: "Safety", price: "KES 890", stocks: [[8, "low"], [14, "ok"], [9, "ok"], [6, "ok"], [4, "ok"], [3, "ok"]], total: 44, status: { label: "LOW", variant: "warn", dot: true } },
  { icon: "paintbrush", name: "Paint Brush Set · 5pc", sku: "JP-PB-5", category: "Paints", price: "KES 540", stocks: [[22, "ok"], [18, "ok"], [14, "ok"], [12, "ok"], [7, "ok"], [5, "ok"]], total: 78, status: { label: "OK", variant: "success", dot: true } },
  { icon: "cable", name: "Electrical Wire · 2.5mm", sku: "JP-EW-25", category: "Electrical", price: "KES 4,200", stocks: [[12, "ok"], [8, "ok"], [3, "low"], [7, "ok"], [4, "ok"], [0, "out"]], total: 34, status: { label: "LOW", variant: "warn", dot: true } },
  { icon: "package", name: "Cement 50kg · Bamburi", sku: "JP-CM-50", category: "Building", price: "KES 880", stocks: [[12, "low"], [28, "ok"], [22, "ok"], [18, "ok"], [9, "ok"], [14, "ok"]], total: 103, status: { label: "LOW", variant: "warn", dot: true } },
];

// ── Outlets (wire: skill/outlets.html, outlet-detail.html) ──
export type OutletDirectoryCard = {
  slug: string;
  codeBracket: string;
  name: string;
  meta: string;
  status: "OPEN" | "OFFLINE";
  progress: number;
  progressWarn?: boolean;
  revenueLine: string;
  footer:
    | { kind: "metrics"; orders: number; avgBasket: string }
    | { kind: "offline"; orders: number; down: string };
};

export const outletDirectoryCards: OutletDirectoryCard[] = [
  {
    slug: "kiserian-main",
    codeBracket: "OUTLET 01 // FLAGSHIP",
    name: "Kiserian Main",
    meta: "17 STAFF · MGR. JANE M. · OPENED 2019",
    status: "OPEN",
    progress: 88,
    revenueLine: "KES 78,420 / 90,000 TODAY · 88%",
    footer: { kind: "metrics", orders: 42, avgBasket: "KES 1,867" },
  },
  {
    slug: "rongai-plaza",
    codeBracket: "OUTLET 02",
    name: "Rongai Plaza",
    meta: "11 STAFF · MGR. PETER O. · OPENED 2021",
    status: "OPEN",
    progress: 72,
    revenueLine: "KES 54,120 / 75,000 TODAY · 72%",
    footer: { kind: "metrics", orders: 31, avgBasket: "KES 1,745" },
  },
  {
    slug: "ongata-hardware",
    codeBracket: "OUTLET 03",
    name: "Ongata Hardware",
    meta: "8 STAFF · MGR. MARY W. · OPENED 2022",
    status: "OPEN",
    progress: 60,
    revenueLine: "KES 41,880 / 70,000 TODAY · 60%",
    footer: { kind: "metrics", orders: 28, avgBasket: "KES 1,495" },
  },
  {
    slug: "ngong-road-branch",
    codeBracket: "OUTLET 04",
    name: "Ngong Road Branch",
    meta: "9 STAFF · MGR. SAMUEL N. · OPENED 2022",
    status: "OFFLINE",
    progress: 46,
    progressWarn: true,
    revenueLine: "KES 32,440 / 70,000 TODAY · 46%",
    footer: { kind: "offline", orders: 22, down: "14 MIN" },
  },
  {
    slug: "karen-yard",
    codeBracket: "OUTLET 05",
    name: "Karen Yard",
    meta: "6 STAFF · MGR. ANGELA K. · OPENED 2023",
    status: "OPEN",
    progress: 51,
    revenueLine: "KES 28,710 / 56,000 TODAY · 51%",
    footer: { kind: "metrics", orders: 18, avgBasket: "KES 1,595" },
  },
  {
    slug: "magadi-road-stop",
    codeBracket: "OUTLET 06 // NEW",
    name: "Magadi Road Stop",
    meta: "4 STAFF · MGR. DENNIS M. · OPENED 2025",
    status: "OPEN",
    progress: 31,
    revenueLine: "KES 12,570 / 40,000 TODAY · 31%",
    footer: { kind: "metrics", orders: 11, avgBasket: "KES 1,143" },
  },
];

type OutletBadgeVariant = "success" | "warn" | "danger" | "info" | "yellow" | "black" | "outline";

export type OutletDetailModel = {
  slug: string;
  crumb: string;
  title: string;
  subtitle: string;
  /** Full-width hero photo (e.g. storefront / yard) for outlet detail header */
  heroImage: string;
  heroImageAlt: string;
  /** Softer, desaturated treatment (e.g. offline outlet) */
  heroMuted?: boolean;
  kpis: { label: string; value: string; delta: string; down?: boolean }[];
  recentOrders: {
    id: string;
    customer: string;
    items: string;
    total: string;
    status: { label: string; variant: OutletBadgeVariant; dot?: boolean };
  }[];
  recentOrdersMeta: string;
  stockAlerts: {
    tone: "danger" | "warn";
    title: string;
    meta: string;
    badge: string;
    badgeVariant: OutletBadgeVariant;
  }[];
  stockAlertsMeta: string;
  staff: {
    initials: string;
    name: string;
    meta: string;
    badge: { label: string; variant: OutletBadgeVariant; dot?: boolean };
  }[];
  staffMeta: string;
};

const OUTLET_DETAILS: Record<string, OutletDetailModel> = {
  "kiserian-main": {
    slug: "kiserian-main",
    crumb: "OPS // OUTLETS // KISERIAN MAIN",
    title: "Kiserian Main",
    subtitle:
      "FLAGSHIP · MAGADI ROAD, KISERIAN TOWN · +254 712 000 100 · OPENED MAR 2019",
    heroImage:
      "https://images.pexels.com/photos/5692742/pexels-photo-5692742.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Hardware store interior — shelves and building supplies",
    kpis: [
      { label: "Today's revenue", value: "KES 78,420", delta: "88% OF TARGET" },
      { label: "Orders", value: "42", delta: "+6 vs YESTERDAY" },
      { label: "Avg basket", value: "KES 1,867", delta: "+4.2%" },
      { label: "Stock alerts", value: "3", delta: "1 CRITICAL", down: true },
    ],
    recentOrdersMeta: "42 TOTAL",
    recentOrders: [
      { id: "#02-1247", customer: "Mary Wanjiku", items: "4 items", total: "KES 10,503", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#02-1246", customer: "Walk-in", items: "2 items", total: "KES 1,140", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#02-1245", customer: "Bins Hardware", items: "12 items", total: "KES 24,800", status: { label: "EN ROUTE", variant: "info", dot: true } },
      { id: "#W-4821", customer: "Faith Akoth", items: "3 items", total: "KES 4,180", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#02-1243", customer: "Walk-in", items: "1 item", total: "KES 890", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#W-4820", customer: "Daniel Maina", items: "6 items", total: "KES 18,400", status: { label: "HOLD", variant: "warn", dot: true } },
    ],
    stockAlertsMeta: "3 ACTIVE",
    stockAlerts: [
      { tone: "danger", title: "Ingco Cordless Drill 12V", meta: "SKU ING-CD45-12V · 3 LEFT", badge: "CRITICAL", badgeVariant: "danger" },
      { tone: "warn", title: "Cement 50kg · Bamburi", meta: "SKU JP-CM-50 · 12 LEFT", badge: "LOW", badgeVariant: "warn" },
      { tone: "warn", title: "Safety Helmet · Yellow", meta: "SKU ING-HH-Y · 8 LEFT", badge: "LOW", badgeVariant: "warn" },
    ],
    staffMeta: "17 ACTIVE · 1 ON LEAVE",
    staff: [
      { initials: "JM", name: "Jane Mwangi", meta: "MANAGER · SINCE 2019 · +254 712 ··· 100", badge: { label: "MGR", variant: "yellow" } },
      { initials: "JO", name: "John Mwangi", meta: "SR. CASHIER · TILL 02 · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
      { initials: "SK", name: "Sarah Kamau", meta: "CASHIER · TILL 01 · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
      { initials: "DK", name: "Dennis Kamau", meta: "RIDER · KDC 421J · ON ROUTE", badge: { label: "ON ROUTE", variant: "info", dot: true } },
      { initials: "PK", name: "Patrick Kibet", meta: "FLOOR · POWER TOOLS · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
      { initials: "RW", name: "Rose Wambui", meta: "FLOOR · PLUMBING · ON LEAVE TILL OCT 28", badge: { label: "ON LEAVE", variant: "warn", dot: true } },
    ],
  },
  "rongai-plaza": {
    slug: "rongai-plaza",
    crumb: "OPS // OUTLETS // RONGAI PLAZA",
    title: "Rongai Plaza",
    subtitle: "RONGAI TOWN CENTRE · +254 712 000 201 · OPENED JUN 2021",
    heroImage:
      "https://images.pexels.com/photos/3807288/pexels-photo-3807288.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Retail hardware counter and tools display",
    kpis: [
      { label: "Today's revenue", value: "KES 54,120", delta: "72% OF TARGET" },
      { label: "Orders", value: "31", delta: "+3 vs YESTERDAY" },
      { label: "Avg basket", value: "KES 1,745", delta: "+2.1%" },
      { label: "Stock alerts", value: "2", delta: "0 CRITICAL" },
    ],
    recentOrdersMeta: "31 TOTAL",
    recentOrders: [
      { id: "#03-0901", customer: "Walk-in", items: "3 items", total: "KES 2,100", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#03-0900", customer: "George Kimani", items: "5 items", total: "KES 8,420", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#03-0899", customer: "Trade counter", items: "8 items", total: "KES 14,200", status: { label: "PAID", variant: "success", dot: true } },
    ],
    stockAlertsMeta: "2 ACTIVE",
    stockAlerts: [
      { tone: "warn", title: "Ingco Demolition Hammer", meta: "SKU ING-DH-1500 · 4 LEFT", badge: "LOW", badgeVariant: "warn" },
      { tone: "warn", title: "Electrical Wire · 2.5mm", meta: "SKU JP-EW-25 · 8 LEFT", badge: "LOW", badgeVariant: "warn" },
    ],
    staffMeta: "11 ACTIVE",
    staff: [
      { initials: "PO", name: "Peter Otieno", meta: "MANAGER · SINCE 2021", badge: { label: "MGR", variant: "yellow" } },
      { initials: "AK", name: "Alice Kiprop", meta: "CASHIER · TILL 01 · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
      { initials: "BN", name: "Brian Njoroge", meta: "FLOOR · HAND TOOLS", badge: { label: "ON SHIFT", variant: "success", dot: true } },
    ],
  },
  "ongata-hardware": {
    slug: "ongata-hardware",
    crumb: "OPS // OUTLETS // ONGATA HARDWARE",
    title: "Ongata Hardware",
    subtitle: "PLAZA LEVEL 1 · ONGATA · +254 712 000 302 · OPENED MAR 2022",
    heroImage:
      "https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Plumbing and hardware supplies in a store aisle",
    kpis: [
      { label: "Today's revenue", value: "KES 41,880", delta: "60% OF TARGET" },
      { label: "Orders", value: "28", delta: "−2 vs YESTERDAY" },
      { label: "Avg basket", value: "KES 1,495", delta: "−1.0%", down: true },
      { label: "Stock alerts", value: "1", delta: "PIPELINE OK" },
    ],
    recentOrdersMeta: "28 TOTAL",
    recentOrders: [
      { id: "#04-0612", customer: "Walk-in", items: "6 items", total: "KES 3,140", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#04-0611", customer: "Mary W.", items: "2 items", total: "KES 1,890", status: { label: "PAID", variant: "success", dot: true } },
    ],
    stockAlertsMeta: "1 ACTIVE",
    stockAlerts: [
      { tone: "warn", title: "Paint Brush Set · 5pc", meta: "SKU JP-PB-5 · 14 LEFT", badge: "LOW", badgeVariant: "warn" },
    ],
    staffMeta: "8 ACTIVE",
    staff: [
      { initials: "MW", name: "Mary Waweru", meta: "MANAGER · SINCE 2022", badge: { label: "MGR", variant: "yellow" } },
      { initials: "CK", name: "Chris Kim", meta: "CASHIER · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
    ],
  },
  "ngong-road-branch": {
    slug: "ngong-road-branch",
    crumb: "OPS // OUTLETS // NGONG ROAD BRANCH",
    title: "Ngong Road Branch",
    subtitle: "NGONG RD · OFFLINE SINCE 09:42 · +254 712 000 404 · OPENED 2022",
    heroImage:
      "https://images.pexels.com/photos/4940756/pexels-photo-4940756.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Storefront with closed shutters — branch offline",
    heroMuted: true,
    kpis: [
      { label: "Today's revenue", value: "KES 32,440", delta: "46% OF TARGET", down: true },
      { label: "Orders", value: "22", delta: "SYNC PAUSED" },
      { label: "Avg basket", value: "KES 1,475", delta: "LAST ONLINE WINDOW" },
      { label: "Stock alerts", value: "—", delta: "CHECK WHEN LIVE" },
    ],
    recentOrdersMeta: "22 TOTAL · CACHED",
    recentOrders: [
      { id: "#05-0301", customer: "Walk-in", items: "1 item", total: "KES 640", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#05-0300", customer: "Samuel N.", items: "4 items", total: "KES 3,200", status: { label: "PAID", variant: "success", dot: true } },
    ],
    stockAlertsMeta: "0 ACTIVE",
    stockAlerts: [],
    staffMeta: "9 ROSTER · OUTLET OFFLINE",
    staff: [
      { initials: "SN", name: "Samuel Njoroge", meta: "MANAGER", badge: { label: "MGR", variant: "yellow" } },
      { initials: "LW", name: "Lydia W.", meta: "CASHIER · STANDBY", badge: { label: "STANDBY", variant: "warn", dot: true } },
    ],
  },
  "karen-yard": {
    slug: "karen-yard",
    crumb: "OPS // OUTLETS // KAREN YARD",
    title: "Karen Yard",
    subtitle: "BOGANI EAST · KAREN · +254 712 000 505 · OPENED JAN 2023",
    heroImage:
      "https://images.pexels.com/photos/7213298/pexels-photo-7213298.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Bright hardware shop with tools and equipment",
    kpis: [
      { label: "Today's revenue", value: "KES 28,710", delta: "51% OF TARGET" },
      { label: "Orders", value: "18", delta: "+1 vs YESTERDAY" },
      { label: "Avg basket", value: "KES 1,595", delta: "+3.4%" },
      { label: "Stock alerts", value: "1", delta: "MONITOR" },
    ],
    recentOrdersMeta: "18 TOTAL",
    recentOrders: [
      { id: "#05-0214", customer: "Angela Kerubo", items: "3 items", total: "KES 1,820", status: { label: "DELIVERED", variant: "success", dot: true } },
      { id: "#05-0213", customer: "Walk-in", items: "2 items", total: "KES 2,400", status: { label: "PAID", variant: "success", dot: true } },
    ],
    stockAlertsMeta: "1 ACTIVE",
    stockAlerts: [
      { tone: "warn", title: "PVC Pipe 1/2\" · 3m", meta: "SKU JP-PVC-12-3 · 42 LEFT GROUP", badge: "LOW", badgeVariant: "warn" },
    ],
    staffMeta: "6 ACTIVE",
    staff: [
      { initials: "AK", name: "Angela Kerubo", meta: "MANAGER · SINCE 2023", badge: { label: "MGR", variant: "yellow" } },
      { initials: "TM", name: "Tom M.", meta: "CASHIER · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
    ],
  },
  "magadi-road-stop": {
    slug: "magadi-road-stop",
    crumb: "OPS // OUTLETS // MAGADI ROAD STOP",
    title: "Magadi Road Stop",
    subtitle: "MAGADI CORRIDOR · +254 712 000 606 · OPENED JAN 2025",
    heroImage:
      "https://images.pexels.com/photos/162553/pexels-photo-162553.jpeg?auto=compress&cs=tinysrgb&w=1920&q=80",
    heroImageAlt: "Workbench with hand tools and measuring tape",
    kpis: [
      { label: "Today's revenue", value: "KES 12,570", delta: "31% OF TARGET" },
      { label: "Orders", value: "11", delta: "NEW OUTLET RAMP" },
      { label: "Avg basket", value: "KES 1,143", delta: "+0.8%" },
      { label: "Stock alerts", value: "4", delta: "2 LOW", down: true },
    ],
    recentOrdersMeta: "11 TOTAL",
    recentOrders: [
      { id: "#06-0008", customer: "Walk-in", items: "2 items", total: "KES 980", status: { label: "PAID", variant: "success", dot: true } },
      { id: "#06-0007", customer: "Dennis M.", items: "1 item", total: "KES 420", status: { label: "PAID", variant: "success", dot: true } },
    ],
    stockAlertsMeta: "4 ACTIVE",
    stockAlerts: [
      { tone: "danger", title: "Tape Measure 5m", meta: "SKU ING-TM-5 · 2 LEFT", badge: "CRITICAL", badgeVariant: "danger" },
      { tone: "warn", title: "Claw Hammer 16oz", meta: "SKU JP-HM-16 · 11 LEFT", badge: "LOW", badgeVariant: "warn" },
    ],
    staffMeta: "4 ACTIVE",
    staff: [
      { initials: "DM", name: "Dennis M.", meta: "MANAGER · SINCE 2025", badge: { label: "MGR", variant: "yellow" } },
      { initials: "LS", name: "Leah S.", meta: "CASHIER · ON SHIFT", badge: { label: "ON SHIFT", variant: "success", dot: true } },
    ],
  },
};

export function getOutletDetail(slug: string): OutletDetailModel | undefined {
  return OUTLET_DETAILS[slug];
}
