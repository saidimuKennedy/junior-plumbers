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

export const loyaltyTiers = [
  { tier: "01", name: "Apprentice",  pts: "0 – 999 PTS",       perks: "1 pt / KES 100 · Birthday voucher · Members-only promos",                        bg: "bg-surface",       dark: false },
  { tier: "02", name: "Journeyman",  pts: "1,000 – 4,999 PTS", perks: "1.25 pts / KES 100 · Free delivery within Kiserian · Early promo access",        bg: "bg-paper-2",       dark: false },
  { tier: "03", name: "Master",      pts: "5,000 – 14,999 PTS",perks: "1.5 pts / KES 100 · Free greater-Nairobi delivery · Trade pricing",              bg: "bg-brand-yellow",  dark: false },
  { tier: "04", name: "Foreman",     pts: "15,000+ PTS",       perks: "2 pts / KES 100 · Dedicated rep · Net-30 trade account",                         bg: "bg-brand-black",   dark: true  },
];

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

export const featuredProducts = [
  { name: "Ingco Cordless Drill 12V", sku: "ING-CD45-12V", icon: "drill",    price: 4850, originalPrice: 5700, badge: "−15%",  badgeType: "b-yellow" },
  { name: "Ingco Demolition Hammer",  sku: "ING-DH-1500",  icon: "hammer",   price: 18400,originalPrice: null,  badge: "NEW",   badgeType: "b-yellow" },
  { name: "Cable Reel · 25m · 2.5mm",sku: "JP-CR-25",      icon: "zap",      price: 4200, originalPrice: null,  badge: "3 LEFT",badgeType: "b-danger" },
  { name: "Ingco Safety Helmet",      sku: "ING-HH-Y",     icon: "hard-hat", price: 890,  originalPrice: null,  badge: null,    badgeType: ""         },
];

export const loyaltyStats = [
  { n: "2,400+", l: "Members" },
  { n: "5%",     l: "Avg. saving / order" },
  { n: "6",      l: "Outlets to redeem" },
  { n: "24h",    l: "Same-day delivery" },
];
