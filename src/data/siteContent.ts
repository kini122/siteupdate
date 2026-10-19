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

export const caseStudy: CaseStudy = {
  id: "CS-AI-001",
  slug: "multilingual-ai-equine-health-assistant",
  client: "Leading Animal Welfare & Equine Healthcare NGO in India",
  category: "AI ASSISTANTS & KNOWLEDGE SYSTEMS",
  title: "24/7 Multilingual AI Voice & Chat Assistant for Community Equine Welfare",
  image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80",
  description: "An automated 24/7 multilingual conversational assistant processing text and voice notes over WhatsApp to triage animal health issues and route urgent cases to clinics.",
  industry: "Animal Welfare & Non-Profit Healthcare",
  timeline: "6 Weeks",
  overview: "A major national animal welfare NGO needed to make vital equine healthcare advisory accessible to rural and semi-urban horse, mule, and donkey owners across multiple Indian states, overcoming illiteracy and regional language barriers.",
  challenge: "Rural equine owners frequently face limited access to qualified veterinarians. When health emergencies occur, language barriers and lack of typing proficiency prevent timely guidance. The client’s helpline staff was overwhelmed handling repetitive inquiries manually, lacking a unified system to triage clinical urgency, transcribe voice notes, and coordinate clinic locations.",
  solution: "Kozker designed and deployed an event-driven automation engine connecting Meta’s Cloud API to an AI agent orchestrator. The solution intelligently routes typed text and voice messages: incoming audio is downloaded and transcribed into native text using multimodal speech models. An orchestrator powered by advanced LLMs accesses a vetted veterinary knowledge base alongside dynamic location lookups to provide preliminary triage, guidance, and clinic contact cards, logging every case into Supabase and reporting spreadsheets.",
  deliverables: [
    { title: "Multimodal Voice & Text Processing", desc: "Automatic download, speech-to-text transcription, and regional voice-reply generation for non-literate community members." },
    { title: "Clinical Knowledge Base & Triage Engine", desc: "Guardrailed conversational reasoning that provides tentative first-aid assessment while strictly forbidding dangerous diagnoses or dosage prescriptions." },
    { title: "Geo-Location & Clinic Dispatch", desc: "Automated extraction and routing of nearest certified veterinary facilities and emergency contact details." },
    { title: "Structured Case Logging", desc: "Automated extraction of structured animal health cases, timestamps, and symptoms into a relational database." },
  ],
  techStack: ["n8n Workflow Engine", "Meta WhatsApp Business API", "Google Gemini Flash", "Sarvam AI (STT & TTS)", "Supabase", "PostgreSQL", "Google Sheets API", "REST APIs"],
  stats: [
    { value: "< 3s", label: "Instant Response Time" },
    { value: "5", label: "Indian Languages Supported" },
    { value: "99.9%", label: "Cloud Uptime" },
    { value: "100%", label: "Automated Triage & Routing" },
  ],
  quote: {
    text: "Deploying an AI assistant that seamlessly understands regional voice notes has fundamentally bridged the healthcare access gap for thousands of animal caretakers across rural districts.",
    author: "— Head of Digital Outreach & Veterinary Operations",
  },
  ctaText: "Build Your Conversational AI Assistant",
  ctaHref: "/contact?service=ai-assistants",
  branchKey: "ai-assistants",
  prefilledSubject: "Inquiry: Multilingual AI Voice & Chat Automation",
  prefilledMessage: "Hi Kozker team, I would like to explore building a voice- and chat-enabled conversational assistant for our community/service operations.",
  sortOrder: 1,
  isPublished: true,
}

export const caseStudiesList: CaseStudy[] = [
  // 1. Equine Health Assistant (AI ASSISTANTS)
  caseStudy,

  // 2. Enterprise Recruitment OS (WORKFLOW AUTOMATION)
  {
    id: "CS-AUTO-002",
    slug: "enterprise-recruitment-operating-system-ai-matching",
    client: "Pan-India Recruitment & Human Resources Consulting Firm",
    category: "WORKFLOW AUTOMATION",
    title: "End-to-End Recruitment Operating System with Human-in-the-Loop AI Matching",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    description: "A complete HR operating platform uniting requirement intake, automated deduplication, human-approved AI candidate scoring, and multi-tier role dashboards.",
    industry: "Human Resources & Staffing",
    timeline: "8–10 Weeks",
    overview: "An established recruitment agency managing enterprise hiring across multiple verticals required a single operating framework to streamline sourcing workflows, enforce stringent client SLAs, and replace fragmented tracking mechanisms.",
    challenge: "Recruitment operations were plagued by manual MIS tracking, slow profile screening cycles, redundant sourcing of existing candidates, and lack of accountability across handovers. The agency needed strict SLA clocks, role-based visibility, and AI-assisted candidate evaluation that eliminated algorithmic bias without stripping human recruiters of final authority.",
    solution: "Kozker engineered a unified recruitment platform integrating real-time priority dashboards, candidate deduplication engines, and an AI scoring pipeline. The system strips demographic details to guarantee neutral evaluation, scores candidates based on recruiter-approved skill weights, drafts tailored screening questions, and manages structured interview handoffs. Configurable role hierarchies (Admin, Manager, Recruiter, Interviewer, Client) ensure complete data governance and end-to-end auditability.",
    deliverables: [
      { title: "Live Sourcing & SLA Command Center", desc: "Real-time visibility into requisition ageing, time-in-stage metrics, and automated escalation flags for impending SLA breaches." },
      { title: "Human-in-the-Loop AI Matching Engine", desc: "Objective candidate scoring against recruiter-weighted criteria, citing exact evidence from resumes while scrubbing demographic data." },
      { title: "Role-Based Workspaces & Zero-Trust Access", desc: "Tailored dashboards and granular permission controls for Administrators, Managers, Recruiters, Interviewers, and External Clients." },
      { title: "Collaborative Request-Driven Workflows", desc: "Formally acknowledged requirement assignments, candidate handoffs, and client job-mandate approvals with continuous audit trails." },
    ],
    techStack: ["PostgreSQL", "Next.js", "Node.js", "REST APIs", "OpenAI API", "Calendar Sync (Google Workspace / MS Teams)", "Webhooks", "Redis"],
    stats: [
      { value: "65%", label: "Profile TAT Reduction" },
      { value: "100%", label: "SLA Transparency" },
      { value: "40%", label: "Database Reuse Increase" },
      { value: "0", label: "Unvetted AI Decisions" },
    ],
    quote: {
      text: "The platform completely replaced our disconnected spreadsheets with a unified operational engine, giving our leadership real-time visibility into hiring pipelines and SLA performance.",
      author: "— Chief Operating Officer, Human Resource Consulting Services",
    },
    ctaText: "Modernize Your Recruitment Operations",
    ctaHref: "/contact?service=workflow-automation",
    branchKey: "automation",
    prefilledSubject: "Inquiry: Enterprise Recruitment & Sourcing Automation",
    prefilledMessage: "Hi Kozker team, we are looking to streamline our recruitment workflows and implement structured, AI-assisted screening and SLA management.",
    sortOrder: 2,
    isPublished: true,
  },

  // 3. AI Recruiter Copilot (AI ASSISTANTS)
  {
    id: "CS-AI-003",
    slug: "erp-integrated-ai-recruiter-copilot",
    client: "Specialized Technology Staffing & Executive Search Agency",
    category: "AI ASSISTANTS & KNOWLEDGE SYSTEMS",
    title: "Native ERP-Integrated AI Copilot for Automated Talent Sourcing & Screening",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    description: "A conversational AI assistant embedded directly within an open-source ERP framework, automating job description conversion, CV parsing, and candidate assessments.",
    industry: "Talent Acquisition & IT Staffing",
    timeline: "4 Weeks",
    overview: "An executive search firm sought to eliminate repetitive, manual administration across their talent acquisition pipeline by embedding conversational AI workflows straight into their core ERP application.",
    challenge: "Recruiters lost considerable time manually breaking down lengthy job descriptions into structured Job Role Skill Summaries (JRSS), manually formatting job portal boolean search strings, formulating technical screening questions, and drafting evaluation notes from interview transcripts. Button-heavy UI navigation created friction and slowed cycle times.",
    solution: "Kozker designed and deployed the Recruiter Copilot, a two-layer automation architecture consisting of an automated background generation engine paired with an in-form conversational chat interface inside the Frappe framework. Backed by n8n workflow orchestration and advanced LLMs, the system automatically parses uploaded job descriptions into structured skill matrices, synthesizes portal search booleans, auto-populates candidate records from incoming CVs, and permits recruiters to alter parameters using simple natural language commands.",
    deliverables: [
      { title: "Automated JRSS & Search String Generation", desc: "Instant extraction of mandatory and optional skills, weightages, and optimized job board search strings directly from uploaded job descriptions." },
      { title: "Conversational ERP Copilot", desc: "An embedded chat widget allowing recruiters to adjust skill weightings, add criteria, or regenerate questions using natural English instructions." },
      { title: "Instant CV Matrix Evaluation", desc: "Instant parsing of candidate profiles against job requirements, assessing pros, cons, and interview suitability." },
      { title: "Transcript-Based Candidate Evaluation", desc: "Automated synthesis of screening call transcripts into structured evaluation reports with clear recommendations." },
    ],
    techStack: ["Frappe Framework (MariaDB, Python, JS)", "n8n Workflow Automation", "OpenAI API", "PyPDF2 / Python-docx", "REST APIs", "Webhooks"],
    stats: [
      { value: "80%", label: "Setup Time Saved" },
      { value: "20–30s", label: "CV Matrix Analysis" },
      { value: "45m+", label: "Saved per Vacancy Cycle" },
      { value: "~₹800", label: "Monthly Token Cost" },
    ],
    quote: {
      text: "Recruiters no longer waste hours tweaking portal search strings and drafting assessment summaries. The copilot handles the heavy lifting directly within our core business software.",
      author: "— Managing Partner & Head of Talent Acquisition",
    },
    ctaText: "Deploy an In-App AI Copilot",
    ctaHref: "/contact?service=ai-assistants",
    branchKey: "ai-assistants",
    prefilledSubject: "Inquiry: Custom ERP & CRM AI Copilot Integration",
    prefilledMessage: "Hi Kozker team, we want to integrate a conversational AI copilot into our existing internal software to automate repetitive workflows.",
    sortOrder: 3,
    isPublished: true,
  },

  // 4. Automated Recruitment BI & Executive Analytics (DATA & BI)
  {
    id: "CS-BI-004",
    slug: "automated-recruitment-bi-client-reporting",
    client: "Mid-Market IT Staffing & Talent Solutions Agency",
    category: "DATA ANALYTICS & BI",
    title: "Scalable Recruitment Business Intelligence & Automated Client Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    description: "A centralized business intelligence platform replacing manual spreadsheet reporting with automated pipeline dashboards, aging alerts, and branded client reports.",
    industry: "IT Recruitment & Professional Services",
    timeline: "4 Weeks",
    overview: "An IT recruitment firm required an automated reporting and business intelligence infrastructure to provide real-time operational metrics across candidate pipelines and eliminate repetitive spreadsheet generation for client accounts.",
    challenge: "The agency relied heavily on manual data exports from their operational system into complex spreadsheets. This manual workflow led to data inconsistencies, lost analyst hours, delayed executive decision-making, and an inability to track critical operational bottlenecks like CV aging, interview feedback delays, and recruitment funnel leakages.",
    solution: "Kozker designed and implemented a full-scale recruitment reporting solution. Raw system exports were ingested into a centralized staging relational database (MariaDB). Data pipelines and transformation logic standardized status milestones, aging buckets (0–7, 8–14, >14 days), and conversion ratios. Interactive role-based dashboards were deployed on Power BI Service, featuring automated scheduled refreshes and dynamic client-level filtering for instant white-labeled report distribution.",
    deliverables: [
      { title: "Centralized Data Ingestion & Staging Engine", desc: "Elimination of scattered spreadsheets through an automated database staging pipeline." },
      { title: "Full Funnel & Velocity Analytics", desc: "Interactive funnel visualization tracking conversion through Sourcing, Screening, Interviews, Selection, and Onboarding." },
      { title: "Operational Bottleneck & Aging Buckets", desc: "Automated alert tracking highlighting overdue resumes, pending client feedback, and requirement aging." },
      { title: "Self-Service Branded Client Reporting", desc: "One-click client filtering enabling recruiters to share professional, white-labeled performance dashboards instantly." },
    ],
    techStack: ["Power BI (Desktop & Service)", "MariaDB", "Power Query / M Engine", "DAX", "ERP System Extract Pipelines", "SQL"],
    stats: [
      { value: "85%", label: "Reporting Cycle Reduction" },
      { value: "80%", label: "Internal Reporting Cost Cut" },
      { value: "200%", label: "Client Upsell Opportunities" },
      { value: "~0%", label: "Data Discrepancy" },
    ],
    quote: {
      text: "Transforming our reporting from error-prone spreadsheets to an automated BI suite not only gave us instant visibility over our pipelines, but turned analytics into a premium revenue-generating service for our clients.",
      author: "— Director of Recruitment Operations & Client Delivery",
    },
    ctaText: "Upgrade Your Reporting to Automated BI",
    ctaHref: "/contact?service=data-analytics",
    branchKey: "data-bi",
    prefilledSubject: "Inquiry: Automated Business Intelligence & Reporting Solutions",
    prefilledMessage: "Hi Kozker team, we want to replace our manual spreadsheet reports with automated dashboards and real-time business intelligence pipelines.",
    sortOrder: 4,
    isPublished: true,
  },

  // 5. CA Practice Management & Automation (WORKFLOW AUTOMATION)
  {
    id: "CS-AUTO-005",
    slug: "chartered-accountancy-practice-management-automation",
    client: "Multi-Partner Chartered Accountancy & Tax Advisory Practice",
    category: "WORKFLOW AUTOMATION",
    title: "End-to-End Practice Management & Automated Document Verification System",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    description: "A unified practice management platform automating client intake, checklist-based document validation, multi-tier staff reviews, and payment-gated delivery.",
    industry: "Accounting, Tax Compliance & Professional Services",
    timeline: "6–8 Weeks",
    overview: "A growing accounting and corporate compliance firm needed to replace fragmented manual communications (calls, email, WhatsApp) with a structured workflow system that tracks work orders, compliance documentation, and billing stages.",
    challenge: "Practice staff spent significant time chasing clients for mandatory compliance records (PAN, identity cards, trade licenses), verifying documents against unstandardized checklists, and manually tracking task statuses. Delays in peer review and unauthorized delivery of final reports prior to invoice clearance led to billing bottlenecks and audit friction.",
    solution: "Kozker designed a multi-stage workflow automation system covering the complete service lifecycle. The platform automates mobile-number-based lead lookup, dynamic service checklist generation, intelligent document upload tracking with automated deficiency alerts, time-tracked staff processing, structured reviewer sign-offs, and payment-gated deliverable access.",
    deliverables: [
      { title: "Automated Client Intake & Lead Matching", desc: "Instant recognition of existing accounts versus new inquiries with automated task dispatching and follow-up schedules." },
      { title: "Checklist-Driven Document Verification Engine", desc: "Automated tracking of submitted compliance files against regulatory document lists with automated missing-document reminders." },
      { title: "Time-Tracked Processing & Review Gates", desc: "Automated work timers and structured approval gates that return rejected tasks for revision before reaching financial sign-off." },
      { title: "Payment-Gated Deliverable Distribution", desc: "Seamless handoff to finance with system-locked download links that automatically unlock only upon payment verification." },
    ],
    techStack: ["PostgreSQL", "Next.js", "Node.js REST API", "Cloud Storage Buckets", "Notification Engine (SMS, WhatsApp, Email)", "Automated Invoicing"],
    stats: [
      { value: "70%", label: "Document Verification TAT Cut" },
      { value: "100%", label: "Lifecycle Traceability" },
      { value: "100%", label: "Revenue Protection via Gate" },
      { value: "0", label: "Missed Compliance Deadlines" },
    ],
    quote: {
      text: "Automating our document collection and tying report releases directly to verified payments completely eliminated operational leakage and transformed how our firm manages compliance delivery.",
      author: "— Managing Partner, Chartered Accountancy & Advisory Firm",
    },
    ctaText: "Streamline Your Professional Practice Workflows",
    ctaHref: "/contact?service=workflow-automation",
    branchKey: "automation",
    prefilledSubject: "Inquiry: Professional Services Practice Management Automation",
    prefilledMessage: "Hi Kozker team, we want to implement an automated workflow and document verification platform for our accounting/consulting firm.",
    sortOrder: 5,
    isPublished: true,
  },

  // 6. Hospital Communications & Smart Telecalling (AI ASSISTANTS)
  {
    id: "CS-AI-006",
    slug: "autonomous-hospital-voice-whatsapp-scheduling-system",
    client: "Multi-Specialty Hospital & Healthcare Network",
    category: "AI ASSISTANTS & KNOWLEDGE SYSTEMS",
    title: "Autonomous Voice & WhatsApp AI System for Hospital Operations and Patient Scheduling",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    description: "A doctor-specific autonomous voice calling and WhatsApp platform handling patient scheduling, emergency doctor unavailability routing, and automated lab report dispatch.",
    industry: "Healthcare & Hospital Management",
    timeline: "12 Weeks",
    overview: "A multi-specialty healthcare provider with high patient footfall required an intelligent voice and messaging management layer to automate inbound patient queries, coordinate doctor appointments, and resolve schedule conflicts without burdening reception desks.",
    challenge: "Hospital front-desk operations experienced heavy inbound telephone volume during peak morning and evening hours. When attending physicians faced unexpected surgical emergencies or leaves, staff struggled to contact affected patients in time, creating long waiting hall queues, dissatisfaction, and lost clinical revenue. Additionally, manual physical delivery of scan reports led to administrative overhead.",
    solution: "Kozker structured an autonomous, adaptive healthcare communication system. Each clinical department and physician is represented by a specialized AI calling agent integrated with hospital scheduling systems. The platform autonomously handles inbound voice inquiries, manages bookings via WhatsApp, detects doctor schedule changes to proactively reschedule affected patients to available specialists, integrates with hospital billing, and automatically dispatches verified diagnostic scan links.",
    deliverables: [
      { title: "Doctor-Specific Autonomous Telecalling Agents", desc: "Voice AI agents handling high-volume inbound inquiries, screening patient requests, and routing complex calls to human teams during peak surges." },
      { title: "Intelligent Emergency Rescheduling Engine", desc: "Autonomous detection of physician unavailability with instant departmental alerting and proactive patient slot reassignments." },
      { title: "Conversational WhatsApp Booking & Diagnostic Report Delivery", desc: "Instant self-service appointment scheduling paired with automated, secure link delivery for radiology and lab results." },
      { title: "Healthcare Analytics & Attendance Optimization", desc: "Real-time dashboards monitoring call resolution rates, AI vs. human agent ratios, patient attendance rates, and booking turnaround times." },
    ],
    techStack: ["Conversational AI & LLM Engine", "Telephony API / SIP Trunking", "WhatsApp Business Cloud API", "HMIS Integrations", "Secure Cloud Storage", "PostgreSQL", "Operational Analytics Engine"],
    stats: [
      { value: "60%", label: "Switchboard Congestion Drop" },
      { value: "90%+", "label": "Auto-Rescheduled Emergencies" },
      { value: "75%", label: "Faster Lab Report Delivery" },
      { value: "100%", label: "Operational Visibility" },
    ],
    quote: {
      text: "Automating our inbound triage and emergency schedule adjustments has smoothed our peak-hour clinic operations and drastically improved patient satisfaction across our outpatient departments.",
      author: "— Chief Medical Officer & Head of Hospital Administration",
    },
    ctaText: "Modernize Your Healthcare Patient Experience",
    ctaHref: "/contact?service=ai-assistants",
    branchKey: "ai-assistants",
    prefilledSubject: "Inquiry: AI Telecalling & Patient Scheduling Automation",
    prefilledMessage: "Hi Kozker team, we are interested in deploying an AI telecalling and WhatsApp appointment management platform for our hospital/clinics network.",
    sortOrder: 6,
    isPublished: true,
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


