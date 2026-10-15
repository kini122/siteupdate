-- ==============================================================================
-- KOZKER CUSTOM CMS: SUPABASE DATABASE & STORAGE SCHEMA
-- Run this complete SQL script in your Supabase project's SQL Editor
-- (Dashboard > SQL Editor > New query > Paste & Run)
-- ==============================================================================

-- 1. Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
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
CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort 
  ON public.case_studies (is_published, sort_order ASC);

CREATE INDEX IF NOT EXISTS idx_case_studies_branch 
  ON public.case_studies (branch_key);

CREATE INDEX IF NOT EXISTS idx_case_studies_category 
  ON public.case_studies (category);

CREATE INDEX IF NOT EXISTS idx_case_studies_updated_at 
  ON public.case_studies (updated_at DESC);

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
    -- In environments where supabase_realtime publication is not predefined, ignore
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

-- 4. SEED DATA: Insert Current 6 Rich Case Studies
INSERT INTO public.case_studies (
  id, client, category, title, image, description, industry, timeline,
  overview, challenge, solution, stats, quote, deliverables, tech_stack,
  branch_key, cta_text, cta_href, prefilled_subject, prefilled_message, sort_order, is_published
)
VALUES
-- 1. FinScale Analytics
(
  'finscale',
  'FinScale Analytics',
  'FINTECH & BI',
  'Automated Financial Modeling & Real-Time Executive Dashboards',
  '/assets/60ed30.jpg',
  'Unified reporting pipeline connecting multi-entity ERP and payment gateways into live board-ready insights.',
  'High-Growth FinTech Platform & Payments',
  '4 Weeks Deployment',
  'FinScale operates across multiple currencies and legal entities, processing millions in monthly transaction volume. Leadership lacked real-time visibility into unit economics, net revenue churn, and merchant cash flows across disparate payment processors.',
  'Month-end financial reconciliation required finance managers to manually extract CSVs from Stripe, Adyen, and regional banking portals, taking 5 full business days each cycle with high risk of manual formula errors and late board reports.',
  'Kozker built an enterprise automated ETL data pipeline connecting multi-entity ERPs and payment gateways into a Snowflake data warehouse, powering live executive Power BI dashboards with real-time currency conversions, cohort retention models, and automated anomaly alerts.',
  '[{"value": "75%", "label": "Faster reporting"}, {"value": "3.2x", "label": "ROI in 90 Days"}, {"value": "5d → 20m", "label": "Cycle Reduction"}]'::jsonb,
  '{"text": "The automated executive dashboards reduced our month-end reconciliation and reporting from 5 days to 20 minutes.", "author": "— Head of Finance, FinScale Analytics"}'::jsonb,
  '[
    {"title": "Automated Reconciliation ETL", "desc": "Unified payment gateway and banking ingestion pipeline with discrepancy checks."},
    {"title": "Board-Ready Executive Dashboards", "desc": "Role-tailored KPI views for CEO, CFO, and VP Finance updated every 15 minutes."},
    {"title": "Unit Economics & Churn Engine", "desc": "Granular customer cohort profitability analysis and retention tracking models."},
    {"title": "Automated Audit Alert System", "desc": "Instant Slack and email alerts for payment settlement anomalies and variances."}
  ]'::jsonb,
  ARRAY['Microsoft Power BI', 'Snowflake', 'Python / dbt', 'Stripe API', 'PostgreSQL'],
  'data-bi',
  'Start a Conversation',
  '/contact',
  'Inquiry: Automated Financial Modeling & BI Dashboards',
  'Hi Kozker, I''m interested in the financial modeling and real-time executive dashboard pipeline you developed for FinScale Analytics. We need to streamline multi-source data consolidation and reporting.',
  1,
  true
),
-- 2. Global Logistics Network
(
  'globalbi',
  'Global Logistics Network',
  'LOGISTICS BI',
  'Cross-Border Logistics Ops Sync & BI Metrics',
  '/assets/3132a8.jpg',
  'Automated real-time inventory and shipment reconciliations cutting manual tracking time across regional carriers by 60%.',
  'Cross-Border Freight & Supply Chain Enterprise',
  '5 Weeks Deployment',
  'Coordinating intermodal cargo across 14 regional shipping carriers and air freight partners resulted in data silos, blind spots during hub handoffs, and delayed exception notifications that eroded customer trust and incurred detention fees.',
  'Operations managers spent over 25 hours weekly compiling fragmented carrier manifests into spreadsheets, leading to delayed customs clearance filings, inaccurate ETAs, and expensive late delivery penalty claims.',
  'Kozker unified freight tracking feeds into a centralized operational data lake with automated EDI parsing, live carrier SLA scorecards, and predictive exception routing that flags stalled cargo before customs deadlines occur.',
  '[{"value": "60%", "label": "Time saved"}, {"value": "99.8%", "label": "Sync accuracy"}, {"value": "90%", "label": "Automated Alerts"}]'::jsonb,
  '{"text": "Kozker unified our freight tracking and automated 90% of exception alerts. A total game changer for our operations team.", "author": "— VP of Supply Operations, Global Logistics Network"}'::jsonb,
  '[
    {"title": "Multi-Carrier EDI Telematics Sync", "desc": "Standardized ingestion across air, sea, and road freight carrier manifests."},
    {"title": "Real-Time Freight Ops Dashboard", "desc": "Interactive global heat-maps displaying delayed cargo and port dwell times."},
    {"title": "Predictive Exception Routing", "desc": "Automated proactive alerts for customs hold-ups and weather-induced route stalls."},
    {"title": "Carrier SLA Scorecard Engine", "desc": "Automated vendor performance benchmarks used for quarterly contract negotiations."}
  ]'::jsonb,
  ARRAY['Python Pipelines', 'Power BI', 'SQL Server', 'EDI Integrations', 'AWS S3'],
  'data-bi',
  'Start a Conversation',
  '/contact',
  'Inquiry: Cross-Border Logistics BI & Data Sync',
  'Hi Kozker, we saw your Global Logistics Network case study on cross-border ops sync and BI metrics. We are looking to unify our carrier tracking and automate operational exception handling.',
  2,
  true
),
-- 3. TechGadgets Pro
(
  'techgadgets',
  'TechGadgets Pro',
  'E-COMMERCE & AI',
  'Boosts Conversion Rate by 45% with our Automation and Chatbot Integration',
  '/assets/33108f.jpg',
  'End-to-end multi-channel WhatsApp and web copilot delivering 24/7 lead qualification and instant order tracking.',
  'Consumer Electronics & D2C Scale-Up',
  '3 Weeks Deployment',
  'TechGadgets Pro scaled rapidly across Europe and North America, but their customer support team was inundated with over 2,400 repetitive pre-purchase queries, stock checks, and order tracking tickets weekly, leading to abandoned carts and slow response times.',
  'High cart abandonment during peak evening hours when human agents were offline. Repetitive WISMO (''Where is my order?'') inquiries drained 65% of support bandwidth, while high-value shoppers waited up to 4 hours for simple product compatibility answers.',
  'Kozker architected a unified dual-channel conversational intelligence system integrating WhatsApp Cloud API and an on-site AI shopping copilot directly into Shopify and their 3PL warehouse database. The assistant qualifies buyer intent, suggests complementary accessories, and handles end-to-end tracking lookups in under 3 seconds.',
  '[{"value": "45%", "label": "Conversion rate"}, {"value": "40%", "label": "Orders Increase"}, {"value": "< 3s", "label": "Response Latency"}]'::jsonb,
  '{"text": "The AI chatbot and WhatsApp automation transformed our customer experience. Sales have never been better.", "author": "— Founder & Managing Director, TechGadgets Pro"}'::jsonb,
  '[
    {"title": "Multi-Channel AI Copilot", "desc": "Dual WhatsApp and web-embedded conversational assistant with brand voice tuning."},
    {"title": "Real-Time Shopify & 3PL Sync", "desc": "Sub-second order status and inventory webhook reconciliation across warehouses."},
    {"title": "Contextual Recommender Engine", "desc": "Automated basket building and complementary accessory cross-sell logic."},
    {"title": "Instant Human Escalation", "desc": "Zero-latency desk routing with full customer journey context for VIP inquiries."}
  ]'::jsonb,
  ARRAY['OpenAI GPT-4', 'WhatsApp Cloud API', 'Shopify GraphQL', 'Make.com', 'PostgreSQL'],
  'ai-assistants',
  'Start a Conversation',
  '/contact',
  'Inquiry: E-Commerce AI Chatbot & WhatsApp Automation',
  'Hi Kozker, I was reviewing your TechGadgets Pro case study (+45% conversion rate) and would like to explore an AI shopping copilot and automated multi-channel messaging system for our business.',
  3,
  true
),
-- 4. HealthCore Systems
(
  'healthops',
  'HealthCore Systems',
  'HEALTHCARE & AI',
  'AI-Powered Patient Triage & Secure EHR Workflow Routing',
  '/assets/fd345e.jpg',
  'HIPAA-compliant conversational AI triage assistant handling intake, symptoms assessment, and calendar booking.',
  'Regional Healthcare Network & Outpatient Specialty Clinics',
  '4 Weeks Deployment',
  'HealthCore''s patient access center handled over 18,000 inbound inquiries monthly across 8 regional clinics, facing long call queues, patient frustration, and excessive clinician admin burden that pulled nurses away from care.',
  'Call hold times averaged 14 minutes during morning peak hours. Clinical staff were bogged down answering basic pre-appointment preparation questions and routing routine prescription refill requests instead of focusing on direct clinical care.',
  'Kozker deployed a HIPAA-compliant conversational intake assistant with clinical decision support workflows, symptom pre-assessment, automated insurance eligibility verification prompts, and direct calendar synchronization for specialist visits.',
  '[{"value": "85%", "label": "Response reduction"}, {"value": "100%", "label": "HIPAA Compliance"}, {"value": "14m → 45s", "label": "Patient Wait Time"}]'::jsonb,
  '{"text": "Kozker created an intelligent triage pipeline that reduced clinical admin load without missing a single critical case.", "author": "— Chief Medical Officer, HealthCore Systems"}'::jsonb,
  '[
    {"title": "HIPAA-Secured Triage Interface", "desc": "Encrypted conversational access compliant with healthcare privacy regulations."},
    {"title": "EHR & Scheduling Integration", "desc": "Bi-directional booking sync with clinic calendars, specialty rules, and doctor rosters."},
    {"title": "Automated Eligibility Intake", "desc": "Patient insurance verification and digital pre-visit intake questionnaire builder."},
    {"title": "Clinical Escalation Engine", "desc": "Immediate routing to on-call nursing staff for flagged high-acuity symptom keywords."}
  ]'::jsonb,
  ARRAY['Anthropic Claude / OpenAI', 'HIPAA-Secured Cloud', 'HL7 / FHIR APIs', 'Next.js', 'Twilio'],
  'ai-assistants',
  'Start a Conversation',
  '/contact',
  'Inquiry: Healthcare AI Patient Triage & EHR Routing',
  'Hi Kozker, I''d like to learn more about the HIPAA-compliant patient triage and EHR scheduling assistant you built for HealthCore Systems. We want to reduce administrative burden on our staff.',
  4,
  true
),
-- 5. Apex Supply Chain
(
  'apexautomation',
  'Apex Supply Chain',
  'WORKFLOW AUTOMATION',
  'Automated Multi-Carrier Fulfillment & Exception Pipeline',
  '/assets/4a80c6.jpg',
  'Multi-system shipping automation integrating warehouse scanning, customs clearances, and automated carrier alerts.',
  'Enterprise B2B Supply Chain & Distribution',
  '3 Weeks Deployment',
  'Apex fulfilled over 45,000 commercial shipments monthly, relying on manual data re-entry between warehouse management systems (WMS), enterprise ERPs, and external courier booking portals.',
  'Manual cross-system entry resulted in miskeyed shipping address errors, delayed label generation during peak dispatch hours, and an estimated 14 hours of lost team productivity per week per warehouse facility.',
  'Kozker built an automated multi-system fulfillment engine that ingests bulk orders, verifies destination shipping zones, generates optimized shipping labels in batch, and notifies buyers with real-time milestone updates.',
  '[{"value": "90%", "label": "Fewer manual errors"}, {"value": "14 hrs", "label": "Saved per team/wk"}, {"value": "4x", "label": "Peak Dispatch Speed"}]'::jsonb,
  '{"text": "We eliminated 14 hours of manual cross-checking each week. Orders route straight to fulfillment without a hitch.", "author": "— Director of Logistics, Apex Supply Chain"}'::jsonb,
  '[
    {"title": "WMS-to-Carrier Automation", "desc": "Direct multi-carrier API dispatcher generating labels and customs paperwork in batch."},
    {"title": "Address Verification Engine", "desc": "Automated address cleansing preventing returned freight and costly re-delivery fees."},
    {"title": "Automated Milestone Bot", "desc": "Event-triggered dispatch notifications sent via SMS and email with live tracking."},
    {"title": "Exception Handling Pipeline", "desc": "Auto-routes failed deliveries into a prioritized triage queue for rapid resolution."}
  ]'::jsonb,
  ARRAY['n8n Automation Engine', 'Zapier / Make', 'PostgreSQL', 'REST APIs', 'FedEx/UPS APIs'],
  'automation',
  'Start a Conversation',
  '/contact',
  'Inquiry: Multi-Carrier Fulfillment Automation',
  'Hi Kozker, we want to automate our order fulfillment and multi-carrier shipping workflows similar to what you built for Apex Supply Chain (-90% manual errors).',
  5,
  true
),
-- 6. Nexus Retail Group
(
  'autoops',
  'Nexus Retail Group',
  'PROCESS INTEGRATION',
  'End-to-End WhatsApp Order & Inventory Sync Automation',
  '/assets/671883.jpg',
  'Real-time sync bridging conversational commerce orders directly with inventory databases and payment settlement.',
  'Omnichannel Retail & B2C Brand Portfolio',
  '3 Weeks Deployment',
  'Nexus manages 3 rapid-growth retail apparel brands selling across online storefronts, pop-up locations, and conversational WhatsApp sales channels, resulting in frequent inventory mismatches and overselling.',
  'Inventory levels took up to 6 hours to sync between warehouse ERP and sales channels, causing painful backorders, lost sales, manual refunds, and negative customer social reviews.',
  'Kozker implemented an event-driven inventory synchronization pipeline with sub-second webhook triggers, two-way WhatsApp order placement, and automatic payment link generation that updates stock across all channels instantly.',
  '[{"value": "4.8x", "label": "Speed to dispatch"}, {"value": "99.9%", "label": "Uptime reliability"}, {"value": "0", "label": "Overselling Incidents"}]'::jsonb,
  '{"text": "The automated workflows sync our order data instantly between WhatsApp, Shopify, and our regional warehouse.", "author": "— VP of Technology, Nexus Retail Group"}'::jsonb,
  '[
    {"title": "Omnichannel Inventory Engine", "desc": "Sub-second webhook architecture keeping stock counts synced across all stores."},
    {"title": "Conversational Checkout Flow", "desc": "Automated cart building, tax calculation, and Stripe payment links inside WhatsApp."},
    {"title": "Discrepancy Safety Guardrails", "desc": "Automated safety stock reserve buffering preventing simultaneous checkout clashes."},
    {"title": "Unified Operations Audit Log", "desc": "Real-time ledger tracking every order and stock mutation across all channels."}
  ]'::jsonb,
  ARRAY['Make.com', 'Shopify API', 'WhatsApp Business API', 'Stripe Checkout', 'Airtable'],
  'automation',
  'Start a Conversation',
  '/contact',
  'Inquiry: WhatsApp Order & Omnichannel Inventory Sync',
  'Hi Kozker, I''m reaching out after reading your Nexus Retail Group case study. We need an automated real-time inventory and conversational order sync system.',
  6,
  true
)
ON CONFLICT (id) DO UPDATE SET
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
