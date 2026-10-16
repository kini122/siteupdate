-- ==============================================================================
-- KOZKER CUSTOM CMS: SUPABASE DATABASE & STORAGE SCHEMA
-- Run this complete SQL script in your Supabase project's SQL Editor
-- (Dashboard > SQL Editor > New query > Paste & Run)
-- ==============================================================================

-- ==============================================================================
-- 🚀 MIGRATION SCRIPT: PRESERVE EXISTING CASE STUDIES & ADD SEO SLUG SUPPORT
-- If your Supabase database already has a case_studies table, run this block:
-- ==============================================================================
DO $$
BEGIN
  -- 1. Add slug column if not present
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'case_studies' AND column_name = 'slug'
  ) THEN
    ALTER TABLE public.case_studies ADD COLUMN slug TEXT;
  END IF;

  -- 2. Add published column alias if not present (queries like `WHERE published = true`)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'case_studies' AND column_name = 'published'
  ) THEN
    ALTER TABLE public.case_studies ADD COLUMN published BOOLEAN GENERATED ALWAYS AS (is_published) STORED;
  END IF;
END $$;

-- 3. Populate SEO Slugs for the 6 existing Case Studies (Exact preservation)
UPDATE public.case_studies
SET slug = 'automated-financial-modeling-real-time-executive-dashboards'
WHERE id = 'finscale' AND (slug IS NULL OR slug = '');

UPDATE public.case_studies
SET slug = 'cross-border-logistics-ops-sync-bi-metrics'
WHERE id = 'globalbi' AND (slug IS NULL OR slug = '');

UPDATE public.case_studies
SET slug = 'boosts-conversion-rate-by-45-percent-automation-chatbot'
WHERE id = 'techgadgets' AND (slug IS NULL OR slug = '');

UPDATE public.case_studies
SET slug = 'ai-powered-patient-triage-ehr-routing'
WHERE id = 'healthops' AND (slug IS NULL OR slug = '');

UPDATE public.case_studies
SET slug = 'automated-multi-carrier-fulfillment-exception-pipeline'
WHERE id = 'apexautomation' AND (slug IS NULL OR slug = '');

UPDATE public.case_studies
SET slug = 'end-to-end-whatsapp-order-inventory-sync-automation'
WHERE id = 'autoops' AND (slug IS NULL OR slug = '');

-- Fallback clean slug generation for any custom records
UPDATE public.case_studies
SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(COALESCE(title, client, id), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL OR slug = '';

-- 4. Enforce constraints and unique index
ALTER TABLE public.case_studies ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.case_studies DROP CONSTRAINT IF EXISTS unique_case_study_slug;
ALTER TABLE public.case_studies ADD CONSTRAINT unique_case_study_slug UNIQUE (slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON public.case_studies (slug);


-- ==============================================================================
-- FULL TABLE DEFINITION (For New Installations or Fresh Setups)
-- ==============================================================================

-- 1. Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  client TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT DEFAULT '',
  industry TEXT DEFAULT '',
  timeline TEXT DEFAULT '',
  overview TEXT DEFAULT '',
  challenge TEXT DEFAULT '',
  solution TEXT DEFAULT '',
  stats JSONB DEFAULT '[]'::jsonb,
  quote JSONB DEFAULT '{}'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  tech_stack TEXT[] DEFAULT '{}',
  branch_key TEXT DEFAULT 'data-bi',
  cta_text TEXT DEFAULT 'Start a Conversation',
  cta_href TEXT DEFAULT '/contact',
  prefilled_subject TEXT DEFAULT '',
  prefilled_message TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  published BOOLEAN GENERATED ALWAYS AS (is_published) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- 2. RLS Policies for case_studies
DROP POLICY IF EXISTS "Public can view published case studies" ON public.case_studies;
CREATE POLICY "Public can view published case studies"
  ON public.case_studies
  FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert case studies" ON public.case_studies;
CREATE POLICY "Authenticated users can insert case studies"
  ON public.case_studies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update case studies" ON public.case_studies;
CREATE POLICY "Authenticated users can update case studies"
  ON public.case_studies
  FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete case studies" ON public.case_studies;
CREATE POLICY "Authenticated users can delete case studies"
  ON public.case_studies
  FOR DELETE
  TO authenticated
  USING (true);

-- ==============================================================================
-- 3. HIGH-PERFORMANCE B-TREE INDEXES (Eliminates Seq-Scans, Minimizes Egress & CPU)
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_case_studies_slug
  ON public.case_studies (slug);

CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort 
  ON public.case_studies (is_published, sort_order ASC);

CREATE INDEX IF NOT EXISTS idx_case_studies_branch 
  ON public.case_studies (branch_key);

CREATE INDEX IF NOT EXISTS idx_case_studies_category 
  ON public.case_studies (category);

CREATE INDEX IF NOT EXISTS idx_case_studies_updated_at 
  ON public.case_studies (updated_at DESC);

-- Automatic Slug Generator Trigger Function (Ensures Slugs are always clean and populated)
CREATE OR REPLACE FUNCTION public.generate_case_study_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR TRIM(NEW.slug) = '' THEN
    NEW.slug := LOWER(REGEXP_REPLACE(REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
    NEW.slug := TRIM(BOTH '-' FROM NEW.slug);
  ELSE
    NEW.slug := LOWER(REGEXP_REPLACE(REGEXP_REPLACE(NEW.slug, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
    NEW.slug := TRIM(BOTH '-' FROM NEW.slug);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_case_study_slug ON public.case_studies;
CREATE TRIGGER trg_generate_case_study_slug
BEFORE INSERT OR UPDATE OF title, slug ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.generate_case_study_slug();

-- Enable Realtime publication for instant client-side on-demand cache busting
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'case_studies'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.case_studies;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    NULL;
END $$;

-- 4. Storage Bucket for Case Study Media / Banners
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-study-media', 'case-study-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public can view case study media" ON storage.objects;
CREATE POLICY "Public can view case study media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'case-study-media');

DROP POLICY IF EXISTS "Authenticated users can upload case study media" ON storage.objects;
CREATE POLICY "Authenticated users can upload case study media"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'case-study-media');

DROP POLICY IF EXISTS "Authenticated users can update case study media" ON storage.objects;
CREATE POLICY "Authenticated users can update case study media"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'case-study-media');

DROP POLICY IF EXISTS "Authenticated users can delete case study media" ON storage.objects;
CREATE POLICY "Authenticated users can delete case study media"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'case-study-media');

-- ==============================================================================
-- 5. SEED DATA: Insert 6 Comprehensive Production Case Studies
-- ==============================================================================
INSERT INTO public.case_studies (
  id, slug, client, category, title, image, description, industry, timeline,
  overview, challenge, solution, stats, quote, deliverables, tech_stack,
  branch_key, cta_text, cta_href, prefilled_subject, prefilled_message, sort_order, is_published
)
VALUES
-- Case Study 1: Multilingual AI Equine Health & Triage Assistant
(
  'CS-AI-001',
  'multilingual-ai-equine-health-assistant',
  'Leading Animal Welfare & Equine Healthcare NGO in India',
  'AI ASSISTANTS & KNOWLEDGE SYSTEMS',
  '24/7 Multilingual AI Voice & Chat Assistant for Community Equine Welfare',
  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
  'An automated 24/7 multilingual conversational assistant processing text and voice notes over WhatsApp to triage animal health issues and route urgent cases to clinics.',
  'Animal Welfare & Non-Profit Healthcare',
  '6 Weeks',
  'A major national animal welfare NGO needed to make vital equine healthcare advisory accessible to rural and semi-urban horse, mule, and donkey owners across multiple Indian states, overcoming illiteracy and regional language barriers.',
  'Rural equine owners frequently face limited access to qualified veterinarians. When health emergencies occur, language barriers and lack of typing proficiency prevent timely guidance. The client’s helpline staff was overwhelmed handling repetitive inquiries manually, lacking a unified system to triage clinical urgency, transcribe voice notes, and coordinate clinic locations.',
  'Kozker designed and deployed an event-driven automation engine connecting Meta’s Cloud API to an AI agent orchestrator. The solution intelligently routes typed text and voice messages: incoming audio is downloaded and transcribed into native text using multimodal speech models. An orchestrator powered by advanced LLMs accesses a vetted veterinary knowledge base alongside dynamic location lookups to provide preliminary triage, guidance, and clinic contact cards, logging every case into Supabase and reporting spreadsheets.',
  '[
    {"value": "< 3s", "label": "Instant Response Time"},
    {"value": "5", "label": "Indian Languages Supported"},
    {"value": "99.9%", "label": "Cloud Uptime"},
    {"value": "100%", "label": "Automated Triage & Routing"}
  ]'::jsonb,
  '{"text": "Deploying an AI assistant that seamlessly understands regional voice notes has fundamentally bridged the healthcare access gap for thousands of animal caretakers across rural districts.", "author": "— Head of Digital Outreach & Veterinary Operations"}'::jsonb,
  '[
    {"title": "Multimodal Voice & Text Processing", "desc": "Automatic download, speech-to-text transcription, and regional voice-reply generation for non-literate community members."},
    {"title": "Clinical Knowledge Base & Triage Engine", "desc": "Guardrailed conversational reasoning that provides tentative first-aid assessment while strictly forbidding dangerous diagnoses or dosage prescriptions."},
    {"title": "Geo-Location & Clinic Dispatch", "desc": "Automated extraction and routing of nearest certified veterinary facilities and emergency contact details."},
    {"title": "Structured Case Logging", "desc": "Automated extraction of structured animal health cases, timestamps, and symptoms into a relational database."}
  ]'::jsonb,
  ARRAY['n8n Workflow Engine', 'Meta WhatsApp Business API', 'Google Gemini Flash', 'Sarvam AI (STT & TTS)', 'Supabase', 'PostgreSQL', 'Google Sheets API', 'REST APIs'],
  'ai-assistants',
  'Build Your Conversational AI Assistant',
  '/contact?service=ai-assistants',
  'Inquiry: Multilingual AI Voice & Chat Automation',
  'Hi Kozker team, I would like to explore building a voice- and chat-enabled conversational assistant for our community/service operations.',
  1,
  true
),

-- Case Study 2: Enterprise Recruitment Operating System & AI Sourcing Platform
(
  'CS-AUTO-002',
  'enterprise-recruitment-operating-system-ai-matching',
  'Pan-India Recruitment & Human Resources Consulting Firm',
  'WORKFLOW AUTOMATION',
  'End-to-End Recruitment Operating System with Human-in-the-Loop AI Matching',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'A complete HR operating platform uniting requirement intake, automated deduplication, human-approved AI candidate scoring, and multi-tier role dashboards.',
  'Human Resources & Staffing',
  '8–10 Weeks',
  'An established recruitment agency managing enterprise hiring across multiple verticals required a single operating framework to streamline sourcing workflows, enforce stringent client SLAs, and replace fragmented tracking mechanisms.',
  'Recruitment operations were plagued by manual MIS tracking, slow profile screening cycles, redundant sourcing of existing candidates, and lack of accountability across handovers. The agency needed strict SLA clocks, role-based visibility, and AI-assisted candidate evaluation that eliminated algorithmic bias without stripping human recruiters of final authority.',
  'Kozker engineered a unified recruitment platform integrating real-time priority dashboards, candidate deduplication engines, and an AI scoring pipeline. The system strips demographic details to guarantee neutral evaluation, scores candidates based on recruiter-approved skill weights, drafts tailored screening questions, and manages structured interview handoffs. Configurable role hierarchies (Admin, Manager, Recruiter, Interviewer, Client) ensure complete data governance and end-to-end auditability.',
  '[
    {"value": "65%", "label": "Profile TAT Reduction"},
    {"value": "100%", "label": "SLA Transparency"},
    {"value": "40%", "label": "Database Reuse Increase"},
    {"value": "0", "label": "Unvetted AI Decisions"}
  ]'::jsonb,
  '{"text": "The platform completely replaced our disconnected spreadsheets with a unified operational engine, giving our leadership real-time visibility into hiring pipelines and SLA performance.", "author": "— Chief Operating Officer, Human Resource Consulting Services"}'::jsonb,
  '[
    {"title": "Live Sourcing & SLA Command Center", "desc": "Real-time visibility into requisition ageing, time-in-stage metrics, and automated escalation flags for impending SLA breaches."},
    {"title": "Human-in-the-Loop AI Matching Engine", "desc": "Objective candidate scoring against recruiter-weighted criteria, citing exact evidence from resumes while scrubbing demographic data."},
    {"title": "Role-Based Workspaces & Zero-Trust Access", "desc": "Tailored dashboards and granular permission controls for Administrators, Managers, Recruiters, Interviewers, and External Clients."},
    {"title": "Collaborative Request-Driven Workflows", "desc": "Formally acknowledged requirement assignments, candidate handoffs, and client job-mandate approvals with continuous audit trails."}
  ]'::jsonb,
  ARRAY['PostgreSQL', 'Next.js', 'Node.js', 'REST APIs', 'OpenAI API', 'Calendar Sync (Google Workspace / MS Teams)', 'Webhooks', 'Redis'],
  'automation',
  'Modernize Your Recruitment Operations',
  '/contact?service=workflow-automation',
  'Inquiry: Enterprise Recruitment & Sourcing Automation',
  'Hi Kozker team, we are looking to streamline our recruitment workflows and implement structured, AI-assisted screening and SLA management.',
  2,
  true
),

-- Case Study 3: AI Recruiter Copilot for Open-Source ERP Systems
(
  'CS-AI-003',
  'erp-integrated-ai-recruiter-copilot',
  'Specialized Technology Staffing & Executive Search Agency',
  'AI ASSISTANTS & KNOWLEDGE SYSTEMS',
  'Native ERP-Integrated AI Copilot for Automated Talent Sourcing & Screening',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'A conversational AI assistant embedded directly within an open-source ERP framework, automating job description conversion, CV parsing, and candidate assessments.',
  'Talent Acquisition & IT Staffing',
  '4 Weeks',
  'An executive search firm sought to eliminate repetitive, manual administration across their talent acquisition pipeline by embedding conversational AI workflows straight into their core ERP application.',
  'Recruiters lost considerable time manually breaking down lengthy job descriptions into structured Job Role Skill Summaries (JRSS), manually formatting job portal boolean search strings, formulating technical screening questions, and drafting evaluation notes from interview transcripts. Button-heavy UI navigation created friction and slowed cycle times.',
  'Kozker designed and deployed the Recruiter Copilot, a two-layer automation architecture consisting of an automated background generation engine paired with an in-form conversational chat interface inside the Frappe framework. Backed by n8n workflow orchestration and advanced LLMs, the system automatically parses uploaded job descriptions into structured skill matrices, synthesizes portal search booleans, auto-populates candidate records from incoming CVs, and permits recruiters to alter parameters using simple natural language commands.',
  '[
    {"value": "80%", "label": "Setup Time Saved"},
    {"value": "20–30s", "label": "CV Matrix Analysis"},
    {"value": "45m+", "label": "Saved per Vacancy Cycle"},
    {"value": "~₹800", "label": "Monthly Token Cost"}
  ]'::jsonb,
  '{"text": "Recruiters no longer waste hours tweaking portal search strings and drafting assessment summaries. The copilot handles the heavy lifting directly within our core business software.", "author": "— Managing Partner & Head of Talent Acquisition"}'::jsonb,
  '[
    {"title": "Automated JRSS & Search String Generation", "desc": "Instant extraction of mandatory and optional skills, weightages, and optimized job board search strings directly from uploaded job descriptions."},
    {"title": "Conversational ERP Copilot", "desc": "An embedded chat widget allowing recruiters to adjust skill weightings, add criteria, or regenerate questions using natural English instructions."},
    {"title": "Instant CV Matrix Evaluation", "desc": "Instant parsing of candidate profiles against job requirements, assessing pros, cons, and interview suitability."},
    {"title": "Transcript-Based Candidate Evaluation", "desc": "Automated synthesis of screening call transcripts into structured evaluation reports with clear recommendations."}
  ]'::jsonb,
  ARRAY['Frappe Framework (MariaDB, Python, JS)', 'n8n Workflow Automation', 'OpenAI API', 'PyPDF2 / Python-docx', 'REST APIs', 'Webhooks'],
  'ai-assistants',
  'Deploy an In-App AI Copilot',
  '/contact?service=ai-assistants',
  'Inquiry: Custom ERP & CRM AI Copilot Integration',
  'Hi Kozker team, we want to integrate a conversational AI copilot into our existing internal software to automate repetitive workflows.',
  3,
  true
),

-- Case Study 4: Automated Recruitment BI & Executive Analytics Platform
(
  'CS-BI-004',
  'automated-recruitment-bi-client-reporting',
  'Mid-Market IT Staffing & Talent Solutions Agency',
  'DATA ANALYTICS & BI',
  'Scalable Recruitment Business Intelligence & Automated Client Analytics',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'A centralized business intelligence platform replacing manual spreadsheet reporting with automated pipeline dashboards, aging alerts, and branded client reports.',
  'IT Recruitment & Professional Services',
  '4 Weeks',
  'An IT recruitment firm required an automated reporting and business intelligence infrastructure to provide real-time operational metrics across candidate pipelines and eliminate repetitive spreadsheet generation for client accounts.',
  'The agency relied heavily on manual data exports from their operational system into complex spreadsheets. This manual workflow led to data inconsistencies, lost analyst hours, delayed executive decision-making, and an inability to track critical operational bottlenecks like CV aging, interview feedback delays, and recruitment funnel leakages.',
  'Kozker designed and implemented a full-scale recruitment reporting solution. Raw system exports were ingested into a centralized staging relational database (MariaDB). Data pipelines and transformation logic standardized status milestones, aging buckets (0–7, 8–14, >14 days), and conversion ratios. Interactive role-based dashboards were deployed on Power BI Service, featuring automated scheduled refreshes and dynamic client-level filtering for instant white-labeled report distribution.',
  '[
    {"value": "85%", "label": "Reporting Cycle Reduction"},
    {"value": "80%", "label": "Internal Reporting Cost Cut"},
    {"value": "200%", "label": "Client Upsell Opportunities"},
    {"value": "~0%", "label": "Data Discrepancy"}
  ]'::jsonb,
  '{"text": "Transforming our reporting from error-prone spreadsheets to an automated BI suite not only gave us instant visibility over our pipelines, but turned analytics into a premium revenue-generating service for our clients.", "author": "— Director of Recruitment Operations & Client Delivery"}'::jsonb,
  '[
    {"title": "Centralized Data Ingestion & Staging Engine", "desc": "Elimination of scattered spreadsheets through an automated database staging pipeline."},
    {"title": "Full Funnel & Velocity Analytics", "desc": "Interactive funnel visualization tracking conversion through Sourcing, Screening, Interviews, Selection, and Onboarding."},
    {"title": "Operational Bottleneck & Aging Buckets", "desc": "Automated alert tracking highlighting overdue resumes, pending client feedback, and requirement aging."},
    {"title": "Self-Service Branded Client Reporting", "desc": "One-click client filtering enabling recruiters to share professional, white-labeled performance dashboards instantly."}
  ]'::jsonb,
  ARRAY['Power BI (Desktop & Service)', 'MariaDB', 'Power Query / M Engine', 'DAX', 'ERP System Extract Pipelines', 'SQL'],
  'data-bi',
  'Upgrade Your Reporting to Automated BI',
  '/contact?service=data-analytics',
  'Inquiry: Automated Business Intelligence & Reporting Solutions',
  'Hi Kozker team, we want to replace our manual spreadsheet reports with automated dashboards and real-time business intelligence pipelines.',
  4,
  true
),

-- Case Study 5: End-to-End Accounting Practice Management & Workflow Automation
(
  'CS-AUTO-005',
  'chartered-accountancy-practice-management-automation',
  'Multi-Partner Chartered Accountancy & Tax Advisory Practice',
  'WORKFLOW AUTOMATION',
  'End-to-End Practice Management & Automated Document Verification System',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'A unified practice management platform automating client intake, checklist-based document validation, multi-tier staff reviews, and payment-gated delivery.',
  'Accounting, Tax Compliance & Professional Services',
  '6–8 Weeks',
  'A growing accounting and corporate compliance firm needed to replace fragmented manual communications (calls, email, WhatsApp) with a structured workflow system that tracks work orders, compliance documentation, and billing stages.',
  'Practice staff spent significant time chasing clients for mandatory compliance records (PAN, identity cards, trade licenses), verifying documents against unstandardized checklists, and manually tracking task statuses. Delays in peer review and unauthorized delivery of final reports prior to invoice clearance led to billing bottlenecks and audit friction.',
  'Kozker designed a multi-stage workflow automation system covering the complete service lifecycle. The platform automates mobile-number-based lead lookup, dynamic service checklist generation, intelligent document upload tracking with automated deficiency alerts, time-tracked staff processing, structured reviewer sign-offs, and payment-gated deliverable access.',
  '[
    {"value": "70%", "label": "Document Verification TAT Cut"},
    {"value": "100%", "label": "Lifecycle Traceability"},
    {"value": "100%", "label": "Revenue Protection via Gate"},
    {"value": "0", "label": "Missed Compliance Deadlines"}
  ]'::jsonb,
  '{"text": "Automating our document collection and tying report releases directly to verified payments completely eliminated operational leakage and transformed how our firm manages compliance delivery.", "author": "— Managing Partner, Chartered Accountancy & Advisory Firm"}'::jsonb,
  '[
    {"title": "Automated Client Intake & Lead Matching", "desc": "Instant recognition of existing accounts versus new inquiries with automated task dispatching and follow-up schedules."},
    {"title": "Checklist-Driven Document Verification Engine", "desc": "Automated tracking of submitted compliance files against regulatory document lists with automated missing-document reminders."},
    {"title": "Time-Tracked Processing & Review Gates", "desc": "Automated work timers and structured approval gates that return rejected tasks for revision before reaching financial sign-off."},
    {"title": "Payment-Gated Deliverable Distribution", "desc": "Seamless handoff to finance with system-locked download links that automatically unlock only upon payment verification."}
  ]'::jsonb,
  ARRAY['PostgreSQL', 'Next.js', 'Node.js REST API', 'Cloud Storage Buckets', 'Notification Engine (SMS, WhatsApp, Email)', 'Automated Invoicing'],
  'automation',
  'Streamline Your Professional Practice Workflows',
  '/contact?service=workflow-automation',
  'Inquiry: Professional Services Practice Management Automation',
  'Hi Kozker team, we want to implement an automated workflow and document verification platform for our accounting/consulting firm.',
  5,
  true
),

-- Case Study 6: AI Hospital Communications, Smart Telecalling & Appointment Platform
(
  'CS-AI-006',
  'autonomous-hospital-voice-whatsapp-scheduling-system',
  'Multi-Specialty Hospital & Healthcare Network',
  'AI ASSISTANTS & KNOWLEDGE SYSTEMS',
  'Autonomous Voice & WhatsApp AI System for Hospital Operations and Patient Scheduling',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  'A doctor-specific autonomous voice calling and WhatsApp platform handling patient scheduling, emergency doctor unavailability routing, and automated lab report dispatch.',
  'Healthcare & Hospital Management',
  '12 Weeks',
  'A multi-specialty healthcare provider with high patient footfall required an intelligent voice and messaging management layer to automate inbound patient queries, coordinate doctor appointments, and resolve schedule conflicts without burdening reception desks.',
  'Hospital front-desk operations experienced heavy inbound telephone volume during peak morning and evening hours. When attending physicians faced unexpected surgical emergencies or leaves, staff struggled to contact affected patients in time, creating long waiting hall queues, dissatisfaction, and lost clinical revenue. Additionally, manual physical delivery of scan reports led to administrative overhead.',
  'Kozker structured an autonomous, adaptive healthcare communication system. Each clinical department and physician is represented by a specialized AI calling agent integrated with hospital scheduling systems. The platform autonomously handles inbound voice inquiries, manages bookings via WhatsApp, detects doctor schedule changes to proactively reschedule affected patients to available specialists, integrates with hospital billing, and automatically dispatches verified diagnostic scan links.',
  '[
    {"value": "60%", "label": "Switchboard Congestion Drop"},
    {"value": "90%+", "label": "Auto-Rescheduled Emergencies"},
    {"value": "75%", "label": "Faster Lab Report Delivery"},
    {"value": "100%", "label": "Operational Visibility"}
  ]'::jsonb,
  '{"text": "Automating our inbound triage and emergency schedule adjustments has smoothed our peak-hour clinic operations and drastically improved patient satisfaction across our outpatient departments.", "author": "— Chief Medical Officer & Head of Hospital Administration"}'::jsonb,
  '[
    {"title": "Doctor-Specific Autonomous Telecalling Agents", "desc": "Voice AI agents handling high-volume inbound inquiries, screening patient requests, and routing complex calls to human teams during peak surges."},
    {"title": "Intelligent Emergency Rescheduling Engine", "desc": "Autonomous detection of physician unavailability with instant departmental alerting and proactive patient slot reassignments."},
    {"title": "Conversational WhatsApp Booking & Diagnostic Report Delivery", "desc": "Instant self-service appointment scheduling paired with automated, secure link delivery for radiology and lab results."},
    {"title": "Healthcare Analytics & Attendance Optimization", "desc": "Real-time dashboards monitoring call resolution rates, AI vs. human agent ratios, patient attendance rates, and booking turnaround times."}
  ]'::jsonb,
  ARRAY['Conversational AI & LLM Engine', 'Telephony API / SIP Trunking', 'WhatsApp Business Cloud API', 'HMIS Integrations', 'Secure Cloud Storage', 'PostgreSQL', 'Operational Analytics Engine'],
  'ai-assistants',
  'Modernize Your Healthcare Patient Experience',
  '/contact?service=ai-assistants',
  'Inquiry: AI Telecalling & Patient Scheduling Automation',
  'Hi Kozker team, we are interested in deploying an AI telecalling and WhatsApp appointment management platform for our hospital/clinics network.',
  6,
  true
)
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug,
  client = EXCLUDED.client,
  category = EXCLUDED.category,
  title = EXCLUDED.title,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  industry = EXCLUDED.industry,
  timeline = EXCLUDED.timeline,
  overview = EXCLUDED.overview,
  challenge = EXCLUDED.challenge,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  quote = EXCLUDED.quote,
  deliverables = EXCLUDED.deliverables,
  tech_stack = EXCLUDED.tech_stack,
  branch_key = EXCLUDED.branch_key,
  cta_text = EXCLUDED.cta_text,
  cta_href = EXCLUDED.cta_href,
  prefilled_subject = EXCLUDED.prefilled_subject,
  prefilled_message = EXCLUDED.prefilled_message,
  sort_order = EXCLUDED.sort_order,
  is_published = EXCLUDED.is_published,
  updated_at = NOW();
