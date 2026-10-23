import type { CaseStudy, FaqItem, FeatureCardData, ProductItem, ServiceTab, SolutionPanel, TeamMember } from "@/types/site"

const WEBP_ASSETS = new Set([
  "9fa5e8.png",
  "53cb26.png",
  "0c5d97.png",
  "57de97.png",
  "e8263c.png",
  "4a80c6.jpg",
  "e467dd.jpg",
  "3132a8.jpg",
  "671883.jpg",
  "d5b56b.jpg",
  "0c83b9.jpg",
  "33108f.jpg",
  "60ed30.jpg",
  "fd345e.jpg",
  "642e0f.png",
  "887522.png",
  "ai-tools-platform.jpg",
  "recruiter-ai.jpg",
])

export const asset = (name: string) => {
  if (WEBP_ASSETS.has(name)) {
    return `/assets/${name.replace(/\.(png|jpe?g)$/, ".webp")}`
  }
  return `/assets/${name}`
}

export const homeFaqItems: FaqItem[] = [
  {
    id: "home-businesses",
    question: "What kind of businesses do you work with?",
    answer: "We work with growing companies, regional enterprises, and lean teams across retail, logistics, healthcare, and professional services that need tailored AI systems for service companies and intelligent systems for business.",
  },
  {
    id: "home-engagement",
    question: "How does a typical engagement work from start to finish?",
    answer: "We start with a focused mapping session to understand your current tools and bottlenecks. Next, we architect and deliver custom AI solutions development in about 4 weeks, creating intelligent systems built around yours.",
  },
  {
    id: "home-stack",
    question: "Do we need to replace our current software stack?",
    answer: "No. We augment existing software with AI, building a custom AI layer and AI integration layer that connects directly with your existing CRM, ERP, and databases—providing AI for your existing software.",
  },
  {
    id: "home-roi",
    question: "How do you measure the ROI of a Kozker build?",
    answer: "Every build is anchored to clear operational KPIs—such as hours saved per week via automated reporting, latency reduced from days to minutes, and error cuts—with transparent before-and-after tracking.",
  },
  {
    id: "home-support",
    question: "What happens after the system goes live?",
    answer: "We don't hand off code and disappear. We provide comprehensive team onboarding, continuous monitoring, and ongoing support to ensure your intelligent systems for business evolve smoothly as you scale.",
  },
]

export const faqItems: FaqItem[] = homeFaqItems

export const products: ProductItem[] = [
  {
    id: "recruitment",
    title: "RECRUITMENT MANAGEMENT TOOL",
    image: asset("recruiter-ai.jpg"),
    description: "An integrated AI platform and AI extension for business software built for high-speed hiring. Converts client briefs into job descriptions, parses resumes, ranks talent using weighted skills, and tracks hiring stages from one workspace.",
    bullets: [
      "AI Job Description & personalized screening question generation",
      "Weighted skills approval & semantic candidate scoring (0–100)",
      "Automated resume ingestion, parsing & pipeline stage tracking",
    ],
    category: "Recruitment",
    demoUrl: "https://www.loom.com/share/a0e96cbbd64e46188561d0eb22c3d0ea",
    exploreUrl: "https://recruiter-landing-page-olive.vercel.app/",
  },
  {
    id: "ai-tools",
    title: "AI-POWERED BUSINESS TOOLS",
    image: asset("ai-tools-platform.jpg"),
    description: "Build AI-powered systems with specialized web utilities designed to extend existing systems with AI, automate repetitive workflows, and make smarter business decisions in minutes.",
    bullets: [
      "12+ free generative tools for branding, copy & business launch",
      "Domain Name Genie, proposal generator & landing page copy",
      "Automated Power BI DAX measures & schema mapping helpers",
    ],
    category: "AI Tools",
    exploreUrl: "https://tools.kozker.com/tools",
    detailsUrl: "https://tools.kozker.com/",
  },
]

export const caseStudiesList: CaseStudy[] = []

export const featureCards: FeatureCardData[] = [
  { id: "dashboards", title: "Automated Reporting", description: "AI & Analytics Layer for live visibility.", icon: asset("906f3a.svg") },
  { id: "assistants", title: "Custom AI Layer", description: "AI for your existing software & team.", icon: asset("906f3a.svg") },
  { id: "automation", title: "AI Automation", description: "Agentic-AI systems for your existing systems.", icon: asset("906f3a.svg") },
  { id: "systems", title: "AI Integration Layer", description: "Extend existing systems with AI.", icon: asset("906f3a.svg") },
]

export const partnerFeatureCards: FeatureCardData[] = [
  { id: "partner-clarity", title: "Practical Systems", description: "Clear tools that fit how your partners already work.", icon: asset("f48e66.svg") },
  { id: "partner-growth", title: "Shared Growth", description: "A product direction shaped around useful outcomes.", icon: asset("f48e66.svg") },
  { id: "partner-support", title: "Built Together", description: "A responsive team from first idea to steady adoption.", icon: asset("f48e66.svg") },
]

export const solutionPanels: Record<ServiceTab, SolutionPanel> = {
  "Data & BI": {
    id: "Data & BI",
    label: "AI & ANALYTICS LAYER & REPORTING",
    title: "SCATTERED DATA",
    lead: "CLEAR INSIGHTS",
    copy: "Bring data across your business into an AI & Analytics Layer with automated reporting, so teams spend less time searching and more time deciding.",
    builds: ["AI & Analytics Layer", "Automated Reporting", "Connected data models"],
    heroImage: asset("9fa5e8.png"),
    stackIcons: [asset("53cb26.png"), asset("0c5d97.png"), asset("57de97.png"), asset("e8263c.png")],
    comparisons: [
      { from: "Fragmented Data", to: "AI & Analytics Layer", copy: "Connect scattered business information into an intelligent systems for business view." },
      { from: "Manual Reporting", to: "Automated Reporting", copy: "Eliminate repetitive tasks with automated reporting built into your pipeline." },
      { from: "Limited Visibility", to: "Clear Decisions", copy: "Turn complex data into insights your team can act on with real-time clarity." },
      { from: "Disconnected Systems", to: "Connected Data", copy: "Bring relevant sources together for reliable, single-source operational analysis." },
    ],
    actionLabel: "Explore Data & BI",
  },
  "AI Assistants": {
    id: "AI Assistants",
    label: "AI FOR YOUR EXISTING SOFTWARE",
    title: "SCATTERED KNOWLEDGE",
    lead: "CUSTOM AI LAYER",
    copy: "We engineer a custom AI layer and agentic-AI systems for your existing systems, making vital company knowledge available to operators instantly.",
    builds: ["Custom AI layer", "AI for your existing software", "Agentic-AI systems"],
    heroImage: asset("e467dd.jpg"),
    stackIcons: [asset("openai.svg"), asset("anthropic.svg"), asset("langchain.svg"), asset("huggingface.svg")],
    comparisons: [
      { from: "Scattered Knowledge", to: "Custom AI Layer", copy: "Augment existing software with AI for instant, verified knowledge retrieval." },
      { from: "Slow Support", to: "Helpful Assistants", copy: "Intelligent systems built around yours that resolve queries without losing voice." },
      { from: "Repeated Questions", to: "Shared Context", copy: "Turn common questions into a reusable custom AI systems for business knowledge base." },
      { from: "Manual Qualification", to: "Better Leads", copy: "Let your team spend more time on conversations that matter with automated qualification." },
    ],
    actionLabel: "Explore AI Assistants",
  },
  Automation: {
    id: "Automation",
    label: "AI AUTOMATION & INTEGRATION",
    title: "REPETITIVE WORK",
    lead: "SIMPLE FLOWS",
    copy: "Deploy AI automation to extend existing systems with AI, connecting your current tools and giving routine work a faster, reliable path.",
    builds: ["AI automation", "AI integration layer", "AI extension for business software"],
    heroImage: asset("671883.jpg"),
    stackIcons: [asset("make.svg"), asset("zapier.svg"), asset("n8n.svg"), asset("airtable.svg")],
    comparisons: [
      { from: "Repetitive Work", to: "AI Automation", copy: "Custom AI solutions development to automate daily administrative handoffs." },
      { from: "Disconnected Tools", to: "AI Integration Layer", copy: "An AI integration layer moving information between the tools your team already trusts." },
      { from: "Missed Follow-ups", to: "Timely Signals", copy: "Keep important actions visible without adding more admin overhead." },
      { from: "Manual Operations", to: "Calmer Days", copy: "Build tailored AI systems for service companies that support operators instead of slowing them down." },
    ],
    actionLabel: "Explore Automation",
  },
}

export const teamMembers: TeamMember[] = [
  { id: "govind-1", name: "Govind Bhat", role: "Founder of Kozker", image: asset("642e0f.png") },
  { id: "govind-2", name: "Govind Bhat", role: "Founder of Kozker", image: asset("642e0f.png") },
  { id: "govind-3", name: "Govind Bhat", role: "Founder of Kozker", image: asset("642e0f.png") },
]

export const servicesFaqItems: FaqItem[] = [
  {
    id: "services-security",
    question: "How do you ensure our internal company data remains private and secure with AI?",
    answer: "We implement enterprise-grade data isolation, role-based access control, and private LLM routing. Your internal documents, customer records, and proprietary operational data are never used to train public models.",
  },
  {
    id: "services-bi-integration",
    question: "Can our disparate databases and cloud tools connect into one real-time BI dashboard?",
    answer: "Yes. We engineer an AI & Analytics Layer that pulls from SQL databases, REST APIs, Google Sheets, and ERPs, reconciling messy schemas into automated reporting and a single source of truth.",
  },
  {
    id: "services-rag-assistants",
    question: "How do AI assistants handle complex or multi-step questions from our team?",
    answer: "We specialize in AI systems development, engineering agentic-AI systems for your existing systems and RAG workflows that cite your verified internal documents, SOPs, and tickets with source attribution.",
  },
  {
    id: "services-maintenance",
    question: "What level of technical maintenance is required from our internal team?",
    answer: "Near zero. We construct self-healing automated pipelines with automated exception alerts, rate-limit protection, and robust logging so your non-technical staff can operate them with total peace of mind.",
  },
  {
    id: "services-timeline",
    question: "How long does it take to deploy a custom service solution?",
    answer: "Most focused solutions—such as an automated reporting pipeline, an AI integration layer, or a custom AI layer—launch in 3 to 4 weeks, delivering operational gains immediately without multi-quarter roadmaps.",
  },
]

export const productsFaqItems: FaqItem[] = [
  {
    id: "products-customization",
    question: "Are Kozker products off-the-shelf SaaS, or can they be customized for our workflows?",
    answer: "Our products are modular and built to be customized. While they come with battle-tested core functionality out of the box, we tailor custom intake forms, pipeline stages, and integration points to match your team’s exact process.",
  },
  {
    id: "products-recruitment-integrations",
    question: "How does the Recruitment Management Tool connect with existing job boards and communication channels?",
    answer: "It operates as an AI extension for business software, integrating bidirectionally with platforms like LinkedIn, WhatsApp, email, and Google Workspace to score candidates and track stages without manual data entry.",
  },
  {
    id: "products-deployment",
    question: "Can we host Kozker products in our own private cloud infrastructure?",
    answer: "Yes. We support both fully-managed cloud deployment and dedicated private cloud/on-premise installations for organizations with strict data residency and compliance guidelines.",
  },
  {
    id: "products-updates",
    question: "How are software updates and feature improvements handled?",
    answer: "All product users receive automated security patches and regular feature upgrades without downtime. Custom operational logic and bespoke integrations are preserved across all release cycles.",
  },
  {
    id: "products-pricing",
    question: "What is the pricing model for Kozker products?",
    answer: "We prioritize transparent, predictable pricing based on actual operational usage rather than per-seat penalties that disincentivize team-wide adoption. Contact us for a tailored breakdown for your organization.",
  },
]

export const workFaqItems: FaqItem[] = [
  {
    id: "work-metrics-verification",
    question: "Are the case study metrics like '60% time saved' and '99.8% sync accuracy' verified?",
    answer: "Yes. All metrics reflect audited operational outcomes measured over 90-day post-launch evaluation windows compared directly against the client’s historical baseline data.",
  },
  {
    id: "work-confidentiality",
    question: "How do you handle client confidentiality and intellectual property?",
    answer: "We execute comprehensive bilateral NDAs before touching any project data. Your workflows, data architectures, custom codebases, and operational logic remain 100% your exclusive intellectual property.",
  },
  {
    id: "work-compliance",
    question: "Our industry has very specific compliance regulations. Have you built under strict requirements?",
    answer: "We have engineered systems complying with HIPAA in healthcare triage, SOC 2 protocols, and cross-border VAT/ledger compliance across international freight and financial technology platforms.",
  },
  {
    id: "work-walkthrough",
    question: "Can we speak with past clients or review an interactive walkthrough?",
    answer: "Yes. During our initial consultation, we can demonstrate live architecture flows, anonymized production sandboxes, and connect qualified enterprise buyers with relevant client reference contacts.",
  },
  {
    id: "work-scope",
    question: "What size project is best suited for Kozker?",
    answer: "We deliver tailored AI systems for service companies and high-impact operational systems—whether that's an AI extension for business software or intelligent systems built around yours.",
  },
]

export const partnershipFaqItems: FaqItem[] = [
  {
    id: "partners-revenue-share",
    question: "How does the agency referral and revenue-share model work?",
    answer: "We provide flexible partnership tiers—including recurring revenue share for warm client introductions, joint pitch support, and co-branded service packages tailored to agency retainers.",
  },
  {
    id: "partners-white-label",
    question: "Can we white-label Kozker tools and systems under our own brand?",
    answer: "Yes. Qualified agency partners can white-label our automated client portals, executive dashboards, and AI workflows under their own brand identity, domain, and styling.",
  },
  {
    id: "partners-tech-support",
    question: "What technical support does Kozker provide to partner organizations?",
    answer: "We handle the underlying AI integration layer, API connections, maintenance, and AI systems development, letting your team focus on client relationships, strategy, and business growth.",
  },
  {
    id: "partners-ideal-profile",
    question: "What type of partner profiles see the highest success with Kozker?",
    answer: "HR consultancies looking to offer automated candidate screening, fractional COOs seeking modern operational toolkits, and niche digital agencies wanting to extend existing systems with AI without hiring in-house ML teams.",
  },
  {
    id: "partners-get-started",
    question: "How do we initiate a partnership and explore mutual opportunities?",
    answer: "Reach out via the 'Become a Partner' button. We schedule a 30-minute alignment call to review your current client base, identify high-value integration opportunities, and establish partnership terms.",
  },
]

export interface ServiceDetail {
  id: string
  num: string
  tabKey: ServiceTab
  name: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  shiftHeading: string
  comparisons: { from: string; to: string; copy: string }[]
  solutionHeading: string
  solutionCards: { title: string; description: string }[]
  processSteps: { num: string; label: string; copy: string }[]
  collageItems: { image: string; title: string; description: string; label?: string; projectTag?: string; category: string }[]
}

export const servicesDetails: Record<string, ServiceDetail> = {
  "data-bi": {
    id: "data-bi",
    num: "01",
    tabKey: "Data & BI",
    name: "AI & ANALYTICS LAYER & AUTOMATED REPORTING",
    heroTitle: "AI & Analytics Layer & Automated Reporting",
    heroSubtitle: "Turn your data into decisions with automated reporting.",
    heroDescription: "Your business already has data. We build your AI & Analytics Layer with automated reporting, giving you clear insights that support confident decisions.",
    shiftHeading: "Turn your Data into Decisions.",
    comparisons: [
      { from: "Fragmented Data", to: "AI & Analytics Layer", copy: "Connect scattered business information into an intelligent systems for business view." },
      { from: "Manual Reporting", to: "Automated Reporting", copy: "Eliminate repetitive reporting and get critical information faster." },
      { from: "Limited Visibility", to: "Clear Decisions", copy: "Turn complex data into insights your team can act on." },
      { from: "Disconnected Systems", to: "Connected Data", copy: "Bring relevant sources together for more reliable analysis." },
    ],
    solutionHeading: "We build the AI & Analytics Layer that makes your data useful.",
    solutionCards: [
      { title: "Automated Reporting", description: "Audit-ready operational reports delivered automatically." },
      { title: "AI & Analytics Layer", description: "Consolidated business intelligence built on live data." },
      { title: "Custom AI Systems for Business", description: "Predictive signals and KPIs tailored to service companies." },
      { title: "Connected Data Models", description: "Single source of truth across all tools and databases." },
    ],
    processSteps: [
      { num: "01", label: "THE VISION", copy: "Turn complex data into insights your team can act on." },
      { num: "02", label: "THE SYSTEM", copy: "Design the right system around how your team operates." },
      { num: "03", label: "THE BUILD", copy: "Build a useful first version and make it part of the day-to-day." },
      { num: "04", label: "THE EVOLVE", copy: "Improve the system with real feedback and better data." },
    ],
    collageItems: [
      { image: asset("4a80c6.jpg"), title: "Executive Decision Hub", description: "Unified revenue and pipeline dashboards.", label: "01 ANALYTICS & BI", projectTag: "01 ANALYTICS & BI", category: "Analytics & BI" },
      { image: asset("3132a8.jpg"), title: "Cross-Border Tax & VAT BI", description: "Real-time ledger and regional reconciliation.", label: "02 INTELLIGENCE", projectTag: "02 INTELLIGENCE", category: "Intelligence" },
      { image: asset("9fa5e8.png"), title: "Real-Time KPI Stream", description: "Live metrics delivered to Slack & web.", label: "03 DATA ENGINE", projectTag: "03 DATA ENGINE", category: "Data Engine" },
      { image: asset("d5b56b.jpg"), title: "Automated Reporting", description: "Daily automated exports and alerts.", label: "04 REPORTING", projectTag: "04 REPORTING", category: "Reporting" },
      { image: asset("671883.jpg"), title: "Operations Metrics Hub", description: "End-to-end departmental performance metrics.", label: "05 OPS DASHBOARD", projectTag: "05 OPS DASHBOARD", category: "Operations" },
    ],
  },
  "ai-assistants": {
    id: "ai-assistants",
    num: "02",
    tabKey: "AI Assistants",
    name: "AI SYSTEMS DEVELOPMENT & COPILOTS",
    heroTitle: "AI Systems Development & Knowledge Copilots",
    heroSubtitle: "Augment existing software with AI.",
    heroDescription: "Make company knowledge available when needed. We provide custom AI solutions development, creating an AI for your existing software that fits daily operations.",
    shiftHeading: "Turn Scattered Knowledge into Useful Answers.",
    comparisons: [
      { from: "Scattered Knowledge", to: "Custom AI Layer", copy: "Augment existing software with AI for instant, verified knowledge retrieval." },
      { from: "Slow Support", to: "Helpful Assistants", copy: "Intelligent systems built around yours that resolve queries without losing voice." },
      { from: "Repeated Questions", to: "Shared Context", copy: "Turn common questions into a reusable custom AI systems for business knowledge base." },
      { from: "Manual Qualification", to: "Better Leads", copy: "Let your team spend more time on conversations that matter." },
    ],
    solutionHeading: "We deliver AI systems development that empowers your team.",
    solutionCards: [
      { title: "Custom AI Layer", description: "Private models grounded securely in your SOPs and docs." },
      { title: "Agentic-AI Systems", description: "Agentic-AI systems for your existing systems performing workflows." },
      { title: "AI Integration Layer", description: "Deploy seamlessly on WhatsApp, Slack & internal web apps." },
      { title: "Intelligent Systems Built Around Yours", description: "Tailored AI systems for service companies that fit daily tools." },
    ],
    processSteps: [
      { num: "01", label: "THE KNOWLEDGE", copy: "Audit documentation, manuals, and customer FAQs for AI indexing." },
      { num: "02", label: "THE ARCHITECTURE", copy: "Design prompt guardrails, embeddings, and context retrieval." },
      { num: "03", label: "THE COPILOT", copy: "Deploy conversational interfaces for internal and customer use." },
      { num: "04", label: "THE ACCURACY", copy: "Refine precision using real interaction logs and human validation." },
    ],
    collageItems: [
      { image: asset("e467dd.jpg"), title: "AI Customer Copilot", description: "Automate responses & save 15+ hrs/week.", label: "01 AI ASSISTANTS", projectTag: "01 AI ASSISTANTS", category: "AI Assistants" },
      { image: asset("0c83b9.jpg"), title: "Knowledge Research AI", description: "Semantic search across internal docs.", label: "02 ENTERPRISE AI", projectTag: "02 ENTERPRISE AI", category: "Enterprise AI" },
      { image: asset("671883.jpg"), title: "WhatsApp Support Bot", description: "Instant multi-language client answers.", label: "03 CONVERSATIONAL", projectTag: "03 CONVERSATIONAL", category: "Conversational" },
      { image: asset("33108f.jpg"), title: "Lead Qualification Agent", description: "Auto-qualifies incoming buyers in minutes.", label: "04 GROWTH AI", projectTag: "04 GROWTH AI", category: "Growth AI" },
      { image: asset("4a80c6.jpg"), title: "Multi-Channel Copilots", description: "Omnichannel AI across Slack, web and messaging.", label: "05 INTEGRATED AI", projectTag: "05 INTEGRATED AI", category: "Copilots" },
    ],
  },
  "automation": {
    id: "automation",
    num: "03",
    tabKey: "Automation",
    name: "AI AUTOMATION & WORKFLOW EXTENSIONS",
    heroTitle: "AI Automation & Workflow Extensions",
    heroSubtitle: "Extend existing systems with AI.",
    heroDescription: "Connect the tools your team already uses. We engineer AI extensions for business software and AI automation flows that eliminate repetitive manual tasks.",
    shiftHeading: "Turn Repetitive Work into Simple Flows.",
    comparisons: [
      { from: "Repetitive Work", to: "AI Automation", copy: "Custom AI solutions development to automate daily administrative handoffs." },
      { from: "Disconnected Tools", to: "AI Integration Layer", copy: "An AI integration layer moving information between the tools your team already trusts." },
      { from: "Missed Follow-ups", to: "Timely Signals", copy: "Keep important actions visible without adding more admin overhead." },
      { from: "Manual Operations", to: "Calmer Days", copy: "Build tailored AI systems for service companies that support operators instead of slowing them down." },
    ],
    solutionHeading: "We build the AI automation that saves your team hours.",
    solutionCards: [
      { title: "AI Automation", description: "Trigger intelligent workflows and syncs without manual input." },
      { title: "AI Extension for Business Software", description: "Bridge ERPs, CRMs, and accounting portals with custom APIs." },
      { title: "Build AI-Powered Systems", description: "Custom AI solutions development tailored to your operational scale." },
      { title: "Intelligent Systems for Business", description: "Resilient data movement with real-time operational alerts." },
    ],
    processSteps: [
      { num: "01", label: "THE BOTTLENECK", copy: "Identify manual handoffs and repetitive steps in your daily ops." },
      { num: "02", label: "THE BLUEPRINT", copy: "Map seamless integrations across your CRM, database, and messaging tools." },
      { num: "03", label: "THE AUTOMATION", copy: "Build resilient webhook flows with fail-safes and instant sync." },
      { num: "04", label: "THE SCALE", copy: "Monitor speed, error rates, and time saved as business expands." },
    ],
    collageItems: [
      { image: asset("671883.jpg"), title: "Ops Workflow Automation", description: "Eliminate error-prone spreadsheets with sync.", label: "01 AUTOMATION", projectTag: "01 AUTOMATION", category: "Automation" },
      { image: asset("d5b56b.jpg"), title: "Inventory Sync Engine", description: "Real-time stock balancing across channels.", label: "02 OPERATIONS", projectTag: "02 OPERATIONS", category: "Operations" },
      { image: asset("4a80c6.jpg"), title: "Automated Billing & Invoices", description: "Stripe, QuickBooks and tax automation.", label: "03 FINANCE OPS", projectTag: "03 FINANCE OPS", category: "Finance Ops" },
      { image: asset("3132a8.jpg"), title: "CRM Lead Router", description: "Instant routing and follow-up notifications.", label: "04 PIPELINES", projectTag: "04 PIPELINES", category: "Pipelines" },
      { image: asset("0c83b9.jpg"), title: "Instant Notification Relay", description: "Proactive alerting for mission-critical events.", label: "05 REALTIME SYNC", projectTag: "05 REALTIME SYNC", category: "Alerts" },
    ],
  },
}

export const contactDetails = {
  phone: "+91-73062-61147",
  phoneRaw: "+917306261147",
  phoneSecondary: "+91 98467 00327",
  phoneSecondaryRaw: "+919846700327",
  hours: "Mon-Fri, 9am-6pm IST",
  emails: {
    contact: "contact@kozker.com",
    support: "support@kozker.com",
  },
  hq: {
    address: "1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005",
    country: "India",
    googleMapsUrl: "https://maps.google.com/?q=Adithya+Shopping+Complex,+Thoppumpady,+Kochi,+Kerala+682005",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/kozker-tech",
    instagram: "https://www.instagram.com/kozkertech/",
  },
}

export const contactFaqItems: FaqItem[] = [
  {
    id: "contact-response-time",
    question: "How quickly does the Kozker team respond to inquiries?",
    answer:
      "We respond to all inbound inquiries within 24 hours during standard business days (Mon-Fri, 9am-6pm IST). For urgent enterprise support requests, our team responds within 2 to 4 hours.",
  },
  {
    id: "contact-consultation-process",
    question: "What happens after I send a message?",
    answer:
      "A senior systems engineer reviews your operational requirements. We then schedule a focused 30-minute discovery call to map how to augment existing software with AI and architect intelligent systems built around yours.",
  },
  {
    id: "contact-nda",
    question: "Can we sign a mutual Non-Disclosure Agreement (NDA) first?",
    answer:
      "Absolutely. We treat your proprietary operational workflows, internal data, and customer privacy with strict enterprise-grade confidentiality. We are happy to execute standard bilateral NDAs prior to in-depth technical discussions.",
  },
  {
    id: "contact-global-support",
    question: "Do you work with international clients outside of India?",
    answer:
      "Yes. While our headquarters is in Kochi, Kerala, India, Kozker engineers systems and delivers products for clients across North America, Europe, the Middle East, and Southeast Asia with flexible timezone alignment.",
  },
  {
    id: "contact-pricing-scoping",
    question: "How does Kozker price custom projects and products?",
    answer:
      "We provide predictable, milestone-based fixed pricing for custom AI solutions development and intelligent systems for business. Every engagement includes clear timelines (typically 3 to 4 weeks to v1 live launch) and defined ROI metrics.",
  },
]


