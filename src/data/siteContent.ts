import type { CaseStudy, FaqItem, FeatureCardData, ProductItem, ServiceTab, SolutionPanel, TeamMember } from "@/types/site"

export const asset = (name: string) => `/assets/${name}`

export const faqItems: FaqItem[] = [
  {
    id: "businesses",
    question: "What kind of businesses do you work with?",
    answer: "We work with growing teams, service providers, and operators who want clearer systems and less manual work.",
  },
  {
    id: "project",
    question: "How does a typical project work?",
    answer: "We start with a focused conversation, map the opportunity, then design and ship a useful first system before refining it with your team.",
  },
  {
    id: "custom-ai",
    question: "Can you build a custom AI solution?",
    answer: "Yes. We combine your data, processes, and existing tools to build practical AI workflows that are easy to adopt.",
  },
  {
    id: "started",
    question: "How do I get started?",
    answer: "Send us a note about the problem you are trying to solve. We will respond with a simple next step.",
  },
  {
    id: "build",
    question: "What can Kozker build for my business?",
    answer: "From business intelligence and assistants to internal tools and automation, we build around the systems your business already needs.",
  },
]

export const products: ProductItem[] = [
  {
    id: "recruitment",
    title: "RECRUITMENT MANAGEMENT TOOL",
    image: asset("3132a8.jpg"),
    description: "A recruitment management platform that helps teams organize candidates, streamline hiring workflows, and manage recruitment in one place.",
    bullets: ["Candidate pipeline management", "Interview workflow coordination", "Hiring team visibility"],
    category: "Recruitment",
  },
  {
    id: "notebook",
    title: "KNOWLEDGE RESEARCH ASSISTANT",
    image: asset("0c83b9.jpg"),
    description: "A focused AI research workspace that helps teams organize source material and turn scattered information into useful answers.",
    bullets: ["Source-aware research", "Internal knowledge search", "Shareable answer briefs"],
    category: "AI intelligence",
  },
]

export const caseStudy: CaseStudy = {
  id: "techgadgets",
  client: "TechGadgets Pro",
  category: "E-commerce",
  title: "E-commerce Store Boosts Conversion Rate by 45%",
  image: asset("33108f.jpg"),
  description: "Boosts Conversion Rate by 45% with out Automation and Chatbot Conversion Rate by 45% with",
  stats: [
    { value: "45%", label: "Conversion rate" },
    { value: "40%", label: "Orders increase" },
  ],
}

export const caseStudiesList: CaseStudy[] = [
  caseStudy,
  {
    id: "globalops",
    client: "Global Logistics Network",
    category: "AI intelligence",
    title: "Cross-Border Logistics Ops Sync & Automation",
    image: asset("3132a8.jpg"),
    description: "Automated real-time inventory and shipment reconciliations cutting manual tracking time by 60%.",
    stats: [
      { value: "60%", label: "Time saved" },
      { value: "99.8%", label: "Sync accuracy" },
    ],
  },
]

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
    stackIcons: [asset("0c5d97.png"), asset("e8263c.png"), asset("57de97.png"), asset("53cb26.png")],
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
    stackIcons: [asset("e8263c.png"), asset("57de97.png"), asset("53cb26.png"), asset("0c5d97.png")],
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

export const servicesFaqItems: FaqItem[] = faqItems
export const partnershipFaqItems: FaqItem[] = faqItems

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
  collageItems: { image: string; title: string; description: string; projectTag: string; category: string }[]
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
      { image: asset("4a80c6.jpg"), title: "Executive Decision Hub", description: "Unified revenue and pipeline dashboards.", projectTag: "Service 01", category: "Analytics & BI" },
      { image: asset("3132a8.jpg"), title: "Cross-Border Tax & VAT BI", description: "Real-time ledger and regional reconciliation.", projectTag: "Service 02", category: "Intelligence" },
      { image: asset("9fa5e8.png"), title: "Real-Time KPI Stream", description: "Live metrics delivered to Slack & web.", projectTag: "Service 03", category: "Data Engine" },
      { image: asset("d5b56b.jpg"), title: "Automated Reporting", description: "Daily automated exports and alerts.", projectTag: "Service 04", category: "Reporting" },
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
      { image: asset("e467dd.jpg"), title: "AI Customer Copilot", description: "Automate responses & save 15+ hrs/week.", projectTag: "Service 01", category: "AI Assistants" },
      { image: asset("0c83b9.jpg"), title: "Knowledge Research AI", description: "Semantic search across internal docs.", projectTag: "Service 02", category: "Enterprise AI" },
      { image: asset("671883.jpg"), title: "WhatsApp Support Bot", description: "Instant multi-language client answers.", projectTag: "Service 03", category: "Conversational" },
      { image: asset("33108f.jpg"), title: "Lead Qualification Agent", description: "Auto-qualifies incoming buyers in minutes.", projectTag: "Service 04", category: "Growth AI" },
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
      { image: asset("671883.jpg"), title: "Ops Workflow Automation", description: "Eliminate error-prone spreadsheets with sync.", projectTag: "Service 01", category: "Automation" },
      { image: asset("d5b56b.jpg"), title: "Inventory Sync Engine", description: "Real-time stock balancing across channels.", projectTag: "Service 02", category: "Operations" },
      { image: asset("4a80c6.jpg"), title: "Automated Billing & Invoices", description: "Stripe, QuickBooks and tax automation.", projectTag: "Service 03", category: "Finance Ops" },
      { image: asset("3132a8.jpg"), title: "CRM Lead Router", description: "Instant routing and follow-up notifications.", projectTag: "Service 04", category: "Pipelines" },
    ],
  },
}

