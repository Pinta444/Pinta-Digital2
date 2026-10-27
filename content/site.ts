// All copy, prices and contact details for the site live in this file.
// Edit text here; no component needs to change.

export type PacketId = "start" | "growth" | "partner";

export const site = {
  name: "Pinta Digital",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pinta444.github.io/Pinta-Digital2",
  title: "Pinta Digital · SEO, analytics, conversion and web design",
  description:
    "Pinta Digital builds the rankings, tracking and pages that turn search into enquiries. One monthly plan, a named lead, and a report you can read in five minutes.",
  email: "hello@pintadigital.com",
  linkedin: "",
  // Web3Forms access key. Public by design, so it is safe to commit.
  // Create one at https://web3forms.com with the inbox that should receive enquiries.
  web3formsAccessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};

export const nav = [
  { href: "#services", label: "Services" },
  { href: "#ranking", label: "How it works" },
  { href: "#reporting", label: "Reporting", mobileOnly: true },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact", mobileOnly: true },
];

export const hero = {
  label: "SEO · Analytics · Conversion · Web design",
  titleLead: "Search rewards the sites people trust.",
  titleAccent: "We help you earn it.",
  lede: "Pinta Digital builds the rankings, tracking and pages that turn search into enquiries. One monthly plan, a named lead, and a report you can read in five minutes.",
  primaryCta: { href: "#pricing", label: "See packets & pricing" },
  secondaryCta: { href: "#contact", label: "Book a 20-minute call" },
  measures: ["Rankings", "Clicks", "Enquiries", "Cost per enquiry"],
};

export const services = {
  label: "Services",
  title: "Four services, run as one plan.",
  intro: "Rankings bring visitors in, tracking shows what they do, and the site turns them into enquiries.",
  items: [
    {
      label: "SEO",
      title: "Be found for the right searches",
      body: "Technical fixes, content and links that earn you the searches your customers already make.",
      tags: ["Audits", "Content", "Links", "Local"],
    },
    {
      label: "Analytics",
      title: "Know what every visit is worth",
      body: "Tracking you can trust, one dashboard, and a monthly conversation in plain language.",
      tags: ["GA4", "Search Console", "Dashboard"],
    },
    {
      label: "Conversion",
      title: "Turn more visits into enquiries",
      body: "We find where visitors drop off, test the fixes, and keep what wins.",
      tags: ["Funnels", "A/B tests", "Forms"],
    },
    {
      label: "Web design",
      title: "Pages that load fast and read clearly",
      body: "New pages and redesigns that pass Core Web Vitals before they launch.",
      tags: ["Landing pages", "Speed", "Schema"],
    },
  ],
};

export const ranking = {
  label: "How it works",
  title: "Search asks three questions about every page.",
  intro: "We work on all three at once, because ranking well and getting enquiries depend on the same things.",
  factors: [
    {
      question: "Is it relevant?",
      title: "Answer the search",
      body: "Pages that match what people type, written for them first and search engines second.",
      tags: "Content · structure · local",
    },
    {
      question: "Is it trusted?",
      title: "Earn the vote",
      body: "Links and reviews from real sites and real customers. We never buy links.",
      tags: "Links · reviews · mentions",
    },
    {
      question: "Does it work?",
      title: "Make it easy",
      body: "Fast pages, clear next steps and forms that don't get in the way.",
      tags: "Speed · UX · conversion",
    },
  ],
};

export const reporting = {
  label: "Reporting",
  title: "One page a month. No jargon.",
  intro: "The numbers that matter for your business, what we changed, and what we do next.",
  cardTitle: "Monthly report · Organic search",
  cardTag: "SAMPLE · OCT 2026",
  kpis: [
    { label: "Organic clicks", value: "3,790", change: "▲ 25%" },
    { label: "Enquiries", value: "63", change: "▲ 14" },
    { label: "Avg. position", value: "9.4", change: "▲ from 13.1" },
    { label: "New linking sites", value: "18", change: "▲ 7" },
  ],
  chartCaption: "Weekly organic clicks, last 12 weeks",
  chartLatest: "1,040 this week",
};

export const packets = {
  label: "Pricing",
  title: "Three packets. Prices on the page.",
  intro: "Fixed monthly scope. Move up or down at the start of any month.",
  note: "Prices exclude VAT. Ad spend and paid tools are billed at cost, with your approval first.",
  items: [
    {
      id: "start" as PacketId,
      name: "Start",
      pitch: "One discipline, done properly.",
      price: "$1,800",
      unit: "/ month",
      formPrice: "$1,800 / mo",
      features: ["Site and tracking audit", "One service, end to end", "Monthly report and call", "Three-month minimum"],
      cta: "Choose Start",
      featured: false,
    },
    {
      id: "growth" as PacketId,
      name: "Growth",
      pitch: "Several services as one plan.",
      price: "$2,500",
      unit: "/ month",
      formPrice: "$2,500 / mo",
      features: [
        "Everything in Start",
        "Up to three services",
        "Ongoing A/B tests",
        "Strategy call every two weeks",
        "Shared live dashboard",
      ],
      cta: "Choose Growth",
      featured: true,
    },
    {
      id: "partner" as PacketId,
      name: "Partner",
      pitch: "A team embedded in yours.",
      price: "Custom",
      unit: "scoped with you",
      formPrice: "Custom",
      features: ["Dedicated lead and specialists", "All four services", "Quarterly planning", "Contract and SLA on your terms"],
      cta: "Talk to us",
      featured: false,
    },
  ],
};

export const onboarding = {
  label: "Onboarding",
  title: "Your first 30 days.",
  steps: [
    {
      when: "Week 1",
      title: "Audit",
      body: "We review your site, rankings, links and analytics, then show you where visitors are lost.",
    },
    {
      when: "Weeks 2–3",
      title: "Build",
      body: "You approve the plan. We fix tracking and prepare the first pages and tests.",
    },
    {
      when: "Week 4",
      title: "Launch and report",
      body: "Changes go live and you get your first report and a plan for month two.",
    },
  ],
};

export const faq = {
  label: "FAQ",
  title: "Questions, answered.",
  items: [
    {
      q: "How soon will I see results?",
      a: "Tracking and site fixes show within the first month. Ranking gains usually take three to six months, depending on your market. We tell you upfront what is realistic.",
    },
    {
      q: "Do you buy links?",
      a: "No. Bought links put your site at risk. We earn links through useful content, local partners and real relationships.",
    },
    {
      q: "How long is the commitment?",
      a: "Start has a three-month minimum. Growth and Partner run month to month after onboarding.",
    },
    {
      q: "Who owns the accounts and data?",
      a: "You do. Everything is created in your name and we are added as users.",
    },
  ],
};

export const contact = {
  label: "Contact",
  title: "Tell us about your site.",
  intro: "Two minutes to fill in. A real person reads every request.",
  steps: [
    { title: "Reply within one working day", body: "With a few questions about your goals." },
    { title: "20-minute intro call", body: "We say what we would fix first." },
    { title: "Fixed proposal", body: "Nothing is billed until you sign." },
  ],
  privacyNote: "We only use your details to reply.",
};
