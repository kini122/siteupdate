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
    answer: "We work with growing companies, regional enterprises, and lean operations teams across retail, logistics, healthcare, and professional services that need clearer visibility and less manual overhead.",
  },
  {
    id: "home-engagement",
    question: "How does a typical engagement work from start to finish?",
    answer: "We start with a focused mapping session to understand your current tools and bottlenecks. Next, we architect and deliver a working version in about 4 weeks, followed by iterative refinement alongside your operators.",
  },
  {
    id: "home-stack",
    question: "Do we need to replace our current software stack?",
    answer: "No. We build connected layers and automations that integrate directly with your existing CRM, ERP, spreadsheets, and databases—protecting your current investments while making them dramatically more useful.",
  },
  {
    id: "home-roi",
    question: "How do you measure the ROI of a Kozker build?",
    answer: "Every build is anchored to clear operational KPIs—such as hours saved per week, reporting latency reduced from days to minutes, error rate cuts, or lead response times—with transparent before-and-after tracking.",
  },
  {
    id: "home-support",
    question: "What happens after the system goes live?",
    answer: "We don't hand off code and disappear. We provide comprehensive team onboarding, continuous monitoring, and ongoing support to ensure your workflows evolve smoothly as your business scales.",
  },
]

export const faqItems: FaqItem[] = homeFaqItems

export const products: ProductItem[] = [
  {
    id: "recruitment",
    title: "RECRUITMENT MANAGEMENT TOOL",
    image: asset("recruiter-ai.jpg"),
    description: "AI recruitment operations platform built for high-speed hiring. Converts client briefs into job descriptions, parses resumes, ranks talent using weighted skills, and tracks hiring stages from one workspace.",
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
    description: "Discover powerful AI tools designed to help you create content, generate images, write code, automate workflows, and make smarter business decisions — all in minutes.",
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
  { id: "dashboards", title: "Performance Dashboards", description: "Track the metrics that matter.", icon: asset("906f3a.svg") },
  { id: "assistants", title: "AI Assistants", description: "Make useful answers available to your team.", icon: asset("906f3a.svg") },
  { id: "automation", title: "Workflow Automation", description: "Reduce repetitive work across your day.", icon: asset("906f3a.svg") },
  { id: "systems", title: "Connected Systems", description: "Bring the tools you already use together.", icon: asset("906f3a.svg") },
]

export const partnerFeatureCards: FeatureCardData[] = [
  { id: "partner-clarity", title: "Practical Systems", description: "Clear tools that fit how your partners already work.", icon: asset("f48e66.svg") },
  { id: "partner-growth", title: "Shared Growth", description: "A product direction shaped around useful outcomes.", icon: asset("f48e66.svg") },
  { id: "partner-support", title: "Built Together", description: "A responsive team from first idea to steady adoption.", icon: asset("f48e66.svg") },
]

export const solutionPanels: Record<ServiceTab, SolutionPanel> = {
  "Data & BI": {
    id: "Data & BI",
    label: "DATA ANALYTICS & BUSINESS INTELLIGENCE",
    title: "SCATTERED DATA",
    lead: "CLEAR INSIGHTS",
    copy: "Bring data from across your business into one clear view, so teams spend less time searching and more time deciding.",
    builds: ["Performance dashboards", "Automated reporting", "Connected data models"],
    heroImage: asset("9fa5e8.png"),
    stackIcons: [asset("53cb26.png"), asset("0c5d97.png"), asset("57de97.png"), asset("e8263c.png")],
    comparisons: [
      { from: "Fragmented Data", to: "Unified Insights", copy: "Connect scattered business information into one clearer view." },
      { from: "Manual Reporting", to: "Automated Reporting", copy: "Reduce repetitive reporting and get critical information faster." },
      { from: "Limited Visibility", to: "Clear Decisions", copy: "Turn complex data into insights your team can act on." },
      { from: "Disconnected Systems", to: "Connected Data", copy: "Bring relevant sources together for more reliable analysis." },
    ],
    actionLabel: "Explore Data & BI",
  },
  "AI Assistants": {
    id: "AI Assistants",
    label: "AI ASSISTANTS & KNOWLEDGE SYSTEMS",
    title: "SCATTERED KNOWLEDGE",
    lead: "USEFUL ANSWERS",
    copy: "Make the best knowledge in your business available to the people who need it, when they need it.",
    builds: ["Customer support assistants", "Internal knowledge assistants", "Lead qualification interfaces"],
    heroImage: asset("e467dd.jpg"),
    stackIcons: [asset("openai.svg"), asset("anthropic.svg"), asset("langchain.svg"), asset("huggingface.svg")],
    comparisons: [
      { from: "Scattered Knowledge", to: "Useful Answers", copy: "Give every team a faster path to trusted internal information." },
      { from: "Slow Support", to: "Helpful Assistants", copy: "Automate first answers without losing your team’s voice." },
      { from: "Repeated Questions", to: "Shared Context", copy: "Turn common questions into a reusable knowledge system." },
      { from: "Manual Qualification", to: "Better Leads", copy: "Let your team spend more time on conversations that matter." },
    ],
    actionLabel: "Explore AI Assistants",
  },
  Automation: {
    id: "Automation",
    label: "WORKFLOW AUTOMATION",
    title: "REPETITIVE WORK",
    lead: "SIMPLE FLOWS",
    copy: "Connect the tools your team already uses and give routine work a clearer, faster path.",
    builds: ["Workflow automation", "System integrations", "Operational alerts"],
    heroImage: asset("671883.jpg"),
    stackIcons: [asset("make.svg"), asset("zapier.svg"), asset("n8n.svg"), asset("airtable.svg")],
    comparisons: [
      { from: "Repetitive Work", to: "Simple Flows", copy: "Remove handoffs and give recurring work a reliable path." },
      { from: "Disconnected Tools", to: "Connected Actions", copy: "Move information between the tools your team already trusts." },
      { from: "Missed Follow-ups", to: "Timely Signals", copy: "Keep important actions visible without adding more admin." },
      { from: "Manual Operations", to: "Calmer Days", copy: "Build a system that supports people instead of slowing them down." },
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
    answer: "Yes. We engineer unified data pipelines that pull from SQL databases, REST APIs, Google Sheets, ERPs, and warehouse logs, reconciling messy schemas into a clean, automated single source of truth.",
  },
  {
    id: "services-rag-assistants",
    question: "How do AI assistants handle complex or multi-step questions from our team?",
    answer: "We build Retrieval-Augmented Generation (RAG) and agentic workflows that cite your exact verified internal sources, SOPs, and historical tickets, providing accurate answers with source attribution and human fallback mechanisms.",
  },
  {
    id: "services-maintenance",
    question: "What level of technical maintenance is required from our internal team?",
    answer: "Near zero. We construct self-healing automated pipelines with automated exception alerts, rate-limit protection, and robust logging so your non-technical staff can operate them with total peace of mind.",
  },
  {
    id: "services-timeline",
    question: "How long does it take to deploy a custom service solution?",
    answer: "Most focused solutions—such as an automated reporting engine or an intelligent triage assistant—launch in 3 to 4 weeks, allowing your team to realize operational gains immediately without multi-quarter roadmaps.",
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
    answer: "It integrates bidirectionally with platforms like LinkedIn, WhatsApp, email, and Google Workspace, automatically scoring candidate submissions, updating pipeline status, and scheduling interviews without manual data entry.",
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
    answer: "We excel at high-impact operational systems—whether that’s automating an end-to-end multi-carrier logistics pipeline or turning scattered company knowledge into an intelligent support system.",
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
    answer: "We handle all underlying architecture, API connections, maintenance, and technical troubleshooting, letting your team focus on client relationships, strategy, and business growth.",
  },
  {
    id: "partners-ideal-profile",
    question: "What type of partner profiles see the highest success with Kozker?",
    answer: "HR consultancies looking to offer automated candidate screening, fractional COOs seeking modern operational toolkits, and niche digital agencies wanting to offer enterprise AI without hiring expensive in-house ML teams.",
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
    name: "DATA ANALYTICS & BUSINESS INTELLIGENCE",
    heroTitle: "Data Analytics & Business Intelligence",
    heroSubtitle: "Turn your data into decisions.",
    heroDescription: "Your business already has data. We help you bring it together, make sense of it, and turn it into clear insights that support better decisions.",
    shiftHeading: "Turn your Data into Decisions.",
    comparisons: [
      { from: "Fragmented Data", to: "Unified Insights", copy: "Connect scattered business information into one clearer view." },
      { from: "Manual Reporting", to: "Automated Reporting", copy: "Reduce repetitive reporting and get critical information faster." },
      { from: "Limited Visibility", to: "Clear Decisions", copy: "Turn complex data into insights your team can act on." },
      { from: "Disconnected Systems", to: "Connected Data", copy: "Bring relevant sources together for more reliable analysis." },
    ],
    solutionHeading: "We build the systems that make your data useful.",
    solutionCards: [
      { title: "Performance Dashboards", description: "Track the metrics that matter." },
      { title: "Automated Reporting", description: "Reports delivered without manual work." },
      { title: "Connected Data Models", description: "Single source of truth across tools." },
      { title: "Operational Analytics", description: "Real-time signals for fast decision-making." },
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
    name: "AI CHATBOTS & KNOWLEDGE SYSTEMS",
    heroTitle: "AI Chatbots & Knowledge Systems",
    heroSubtitle: "Turn scattered knowledge into instant answers.",
    heroDescription: "Make the best knowledge in your business available to the people who need it, when they need it, with custom AI assistants built on your data.",
    shiftHeading: "Turn Scattered Knowledge into Useful Answers.",
    comparisons: [
      { from: "Scattered Knowledge", to: "Useful Answers", copy: "Give every team a faster path to trusted internal information." },
      { from: "Slow Support", to: "Helpful Assistants", copy: "Automate first answers without losing your team’s voice." },
      { from: "Repeated Questions", to: "Shared Context", copy: "Turn common questions into a reusable knowledge system." },
      { from: "Manual Qualification", to: "Better Leads", copy: "Let your team spend more time on conversations that matter." },
    ],
    solutionHeading: "We build the AI systems that empower your team.",
    solutionCards: [
      { title: "Customer Support AI", description: "24/7 intelligent tier-1 ticket resolution." },
      { title: "Internal Knowledge Copilots", description: "Instant semantic search over company docs." },
      { title: "Lead Qualification Bots", description: "Convert website traffic into booked meetings." },
      { title: "Multi-Channel AI", description: "Deploy seamlessly on WhatsApp, Slack & web." },
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
    name: "WORKFLOW AUTOMATION",
    heroTitle: "Workflow Automation",
    heroSubtitle: "Connect tools, remove friction, save hours.",
    heroDescription: "Connect the tools your team already uses and give routine work a clearer, faster path, eliminating manual data entry and errors.",
    shiftHeading: "Turn Repetitive Work into Simple Flows.",
    comparisons: [
      { from: "Repetitive Work", to: "Simple Flows", copy: "Remove handoffs and give recurring work a reliable path." },
      { from: "Disconnected Tools", to: "Connected Actions", copy: "Move information between the tools your team already trusts." },
      { from: "Missed Follow-ups", to: "Timely Signals", copy: "Keep important actions visible without adding more admin." },
      { from: "Manual Operations", to: "Calmer Days", copy: "Build a system that supports people instead of slowing them down." },
    ],
    solutionHeading: "We build the automations that save your team hours.",
    solutionCards: [
      { title: "Workflow Automation", description: "Trigger end-to-end actions without manual input." },
      { title: "System Integrations", description: "Sync CRM, ERP, and databases automatically." },
      { title: "Operational Alerts", description: "Get notified before bottlenecks become problems." },
      { title: "Custom API Pipelines", description: "Bespoke data movement tailored to your stack." },
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
      "A senior systems engineer reviews your operational requirements, challenges, and goals. We then schedule a focused 30-minute discovery call to map out a concrete architecture and high-impact timeline for your build.",
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
      "We provide predictable, milestone-based fixed pricing with transparent delivery deliverables. Every engagement includes clear timelines (typically 3 to 4 weeks to v1 live launch) and defined ROI metrics.",
  },
]


