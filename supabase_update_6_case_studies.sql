-- ==============================================================================
-- KOZKER TECH: UPDATE 6 CASE STUDIES TO CANONICAL CONTENT WITH DYNAMIC SEO SCHEMA
-- Run this script in your Supabase SQL Editor (Dashboard > SQL Editor > New query > Paste & Run)
-- ==============================================================================

-- 1. Ensure dynamic SEO columns exist in the case_studies table
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.case_studies ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- 2. Upsert the 6 Canonical Case Studies with Natural Keyword Injection & Dynamic SEO Schema
INSERT INTO public.case_studies (
  id, slug, client, category, title, image, description, industry, timeline,
  overview, challenge, solution, stats, quote, deliverables, tech_stack,
  branch_key, cta_text, cta_href, prefilled_subject, prefilled_message, sort_order, is_published,
  keywords, seo_title, seo_description
)
VALUES
-- Case Study 1: Brooke India WhatsApp Equine Helpline
(
  'CS-AI-001',
  'brooke-india-whatsapp-equine-helpline',
  'Brooke India',
  'WORKFLOW AUTOMATION & AI',
  'Building an AI-Powered WhatsApp Voice & Health Helpline for Brooke India',
  'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80',
  'A custom AI layer for Brooke India (+91 99711 93955) to augment existing software with AI, transcribing regional voice notes, checking a veterinary knowledge base, and texting back local vet contacts.',
  'Animal Welfare & Veterinary Care',
  '6 Weeks',
  'Brooke India works across multiple states to protect working horses, donkeys, and mules. Many handlers in rural communities and brick kilns rely on voice notes because typing in local languages during an emergency isn''t practical. We delivered custom AI solutions development to engineer intelligent systems built around yours, building AI-powered systems that handle incoming triage questions without overloading staff.',
  'Rural equine owners frequently send voice notes in regional dialects describing sudden symptoms like colic, lameness, or open wounds. Standard text-only chatbots were ineffective here. The system needed to process incoming audio files from WhatsApp webhooks, transcribe them accurately, query an internal veterinary knowledge base, locate registered vets nearby, and return clear text guidance and voice notes—all while strictly avoiding definitive medical diagnoses or drug dosage prescriptions.',
  'We built an AI integration layer and n8n workflow triggered by Meta’s WhatsApp API to augment existing software with AI. When a message arrives, the system routes it based on input type. Voice notes are downloaded and transcribed using Gemini 2.5 Flash and Sarvam Bulbul models, keeping regional phrasing intact. An orchestrator agent reads the text, queries a dedicated vector knowledge base for basic first-aid steps, and runs a location tool if the user asks for a clinic. If the original input was a voice note, the reply is converted back into speech using Sarvam TTS and sent as a WhatsApp audio note alongside a quick text summary of clinic numbers. Every case is assigned a tracking reference and saved to Supabase and Google Sheets, delivering reliable AI automation.',
  '[
    {"value": "Instant", "label": "Typed text & native voice notes (5 languages)"},
    {"value": "Auto", "label": "Translation & transcription for rural accents"},
    {"value": "Direct", "label": "Location extraction to text nearest vet clinics"},
    {"value": "100%", "label": "Real-time case audit trail in Supabase & Sheets"}
  ]'::jsonb,
  '{"text": "Having a bot that understands panicked local voice notes and texts back vet numbers stopped our team from monitoring emergency calls round the clock.", "author": "Senior Operations Manager, Field Veterinary Services (Brooke India)"}'::jsonb,
  '[
    {"title": "Voice-to-Voice WhatsApp Engine", "desc": "Receives WhatsApp voice notes, downloads media tokens, transcribes speech, and responds with audio voice notes for low-literacy users."},
    {"title": "Veterinary Knowledge Base Integration", "desc": "A guardrailed AI agent trained on Brooke’s healthcare docs to provide immediate, safe first-aid tips while clearly directing severe cases to professional vets."},
    {"title": "Clinic & Vet Location Finder", "desc": "Parses user locations or landmark names and retrieves exact contact numbers and addresses for nearby equine clinics."},
    {"title": "Automatic Case Data Extraction", "desc": "Converts raw user conversations into structured database records (Case ID, animal type, location, symptoms, triage decision) stored in Supabase."}
  ]'::jsonb,
  ARRAY['n8n Workflows', 'Meta WhatsApp Business Cloud API', 'Google Gemini 2.5 Flash', 'Sarvam Bulbul v3 (STT/TTS)', 'LangChain', 'Supabase', 'PostgreSQL', 'Google Sheets API'],
  'ai-assistants',
  'Build a WhatsApp Voice Assistant',
  '/contact?service=ai-assistants',
  'Inquiry: WhatsApp Voice Note & AI Integration',
  'Hi Kozker team, we want to build a WhatsApp system that can process incoming voice notes and connect to custom database tools.',
  1,
  true,
  ARRAY['Augment existing software with AI', 'AI systems development', 'custom AI solutions development', 'Build AI-powered systems', 'Custom AI layer', 'AI automation', 'intelligent systems for business', 'Intelligent systems built around yours', 'AI integration layer'],
  'Brooke India AI WhatsApp Helpline Case Study | Kozker Tech',
  'How Kozker built an AI integration layer and custom AI layer for Brooke India, engineering intelligent systems for business that process regional voice triage 24/7.'
),

-- Case Study 2: Custom Recruitment Platform & AI Matcher
(
  'CS-AUTO-002',
  'custom-recruitment-platform-ai-matching',
  'Pan-India Recruitment & Executive Search Firm',
  'WORKFLOW AUTOMATION',
  'Replacing Spreadsheets with a Custom Recruitment Platform & AI Matcher',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'Custom AI systems for business managing candidate sourcing, skill-weight approvals, resume parsing, and scheduling with automated reporting and zero black-box decisions.',
  'HR & Recruitment Services',
  '5 Weeks',
  'A staffing agency with a growing team of recruiters was tracking active job openings, candidate resumes, and interview updates through WhatsApp chats and manual Excel files. They engaged Kozker for custom AI solutions development to build AI-powered systems that extend existing systems with AI, managing mandates and candidate workflows from a single workspace.',
  'The firm was losing time re-sourcing candidates already present in their database. Recruiters were also hesitant to use generic AI tools because automated screening often rejected good candidates without clear reasons. Additionally, tracking how long a mandate sat open or who approved a candidate for a client interview relied entirely on manual updates.',
  'We engineered tailored AI systems for service companies featuring a role-based recruitment dashboard covering five distinct user roles (Admin, Manager, Recruiter, Sourcer, Interviewer). The system automatically searches the existing candidate database before accepting new resumes. When a job mandate is created, the recruiter reviews and approves the AI-suggested skill weightings. Resumes are parsed, stripped of demographic identifiers, and scored against job skills using direct quotes from the resume as evidence, paired with automated reporting on pipeline status and time-in-stage metrics.',
  '[
    {"value": "0", "label": "Duplicate candidates added via auto-matching"},
    {"value": "100%", "label": "Evidence-based ranking from resume quotes & weights"},
    {"value": "Full", "label": "Time-in-stage tracking with delayed mandate indicators"},
    {"value": "Automated", "label": "Accept/reject approval alerts across all workflows"}
  ]'::jsonb,
  '{"text": "Recruiters love that it pulls line-by-line quotes directly from resumes—when clients ask why we recommended someone, we point to exact proof, not guesswork.", "author": "Lead Delivery Manager, Tech Staffing Operations"}'::jsonb,
  '[
    {"title": "Automatic Database Lookup & Deduplication", "desc": "Checks incoming candidate details against existing records by phone, email, and name to prevent duplicate entries."},
    {"title": "Evidence-Based AI Candidate Matching", "desc": "Ranks candidates against approved job skills and outputs exact quotes from the resume to justify every score."},
    {"title": "Request-Based Assignment & Handovers", "desc": "System notifications where team members actively click Accept or Reject when handed a job requirement or candidate."},
    {"title": "Client Job Approval & Status Link", "desc": "Generates preview links so end clients can approve job post drafts and view candidate stage movements without accessing internal recruiter notes."}
  ]'::jsonb,
  ARRAY['Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Google Calendar API', 'MS Teams API', 'Webhooks'],
  'automation',
  'Discuss Custom HR Software',
  '/contact?service=workflow-automation',
  'Inquiry: Recruitment & Sourcing Platform Development',
  'Hi Kozker team, we are looking to build a custom internal portal for tracking candidates, job requirements, and interview workflows.',
  2,
  true,
  ARRAY['custom AI solutions development', 'Build AI-powered systems', 'Custom AI systems for business', 'AI automation', 'intelligent systems for business', 'Tailored AI systems for service companies', 'Extend existing systems with AI', 'Automated Reporting'],
  'Custom Recruitment Platform & AI Matching Case Study | Kozker Tech',
  'Discover how Kozker engineered custom AI systems for business and tailored AI systems for service companies to eliminate recruitment spreadsheet chaos.'
),

-- Case Study 3: Open-Source ERP AI Copilot for Recruitment
(
  'CS-AI-003',
  'frappe-erp-ai-recruiter-copilot',
  'Specialized IT Staffing Agency',
  'AI ASSISTANTS & KNOWLEDGE SYSTEMS',
  'Adding an In-App AI Chat Copilot to a Frappe ERP Recruitment System',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'An AI extension for business software embedded as a Frappe ERP sidebar, allowing recruiters to tweak skill matrices, search booleans, and evaluations via plain English commands.',
  'Executive Search & Technical Staffing',
  '4 Weeks',
  'An IT recruitment agency using Frappe ERP was spending considerable time manually converting client Job Descriptions (JDs) into structured skill tables, crafting boolean strings for job portals like Naukri, and typing up candidate evaluation summaries after screening calls. They needed to augment existing software with AI without replacing their existing database.',
  'The agency wanted to automate these tasks, but jumping between external AI chat windows and their ERP was clunky. Copy-pasting data back and forth led to formatting errors. Furthermore, clicking static buttons like "Generate Skills" or "Analyse CV" felt rigid whenever a recruiter wanted to make a minor adjustment (like changing a skill from optional to mandatory).',
  'We engineered an AI extension for business software and custom AI layer directly inside Frappe. When a user uploads a JD document to a Job Opening record, background workflows extract text and generate a structured skill table (with mandatory/optional tags and weightings), 5 technical interview questions, and a short Naukri search boolean. Recruiters open an embedded chat widget to command agentic-AI systems for your existing systems—typing instructions like "Make Python mandatory and increase its weight to 0.95"—which updates child tables and fields in real time.',
  '[
    {"value": "Auto", "label": "JD conversion into skill tables & search booleans"},
    {"value": "20–30s", "label": "Candidate CV vs. job matrix evaluations"},
    {"value": "In-App", "label": "Natural language chat edits to child tables & fields"},
    {"value": "~₹800", "label": "Average monthly token cost per agency"}
  ]'::jsonb,
  '{"text": "Instead of digging into database tables to tweak requirements, recruiters just type their changes into the sidebar, update the records, and get back to sourcing.", "author": "Lead Developer & ERP Administrator"}'::jsonb,
  '[
    {"title": "Background Document Parsing", "desc": "Listens for PDF/Word uploads on Job Opening forms, converts files to text, and populates ERP custom fields automatically."},
    {"title": "Interactive In-Form Chat Widget", "desc": "A custom sidebar rendered directly inside Frappe forms that accepts natural language edit requests from team members."},
    {"title": "Dynamic Field Modification Engine", "desc": "Translates user chat messages into API update calls that adjust child tables, text fields, and dropdown selections in real time."},
    {"title": "Transcript Evaluation Generator", "desc": "Processes uploaded screening call transcripts to compile structured Pros, Cons, and recommended next steps directly into candidate records."}
  ]'::jsonb,
  ARRAY['Frappe Framework (Python, JavaScript, MariaDB)', 'n8n Workflow Automation', 'OpenAI GPT-4o API', 'Python-docx', 'PyPDF2', 'Webhooks'],
  'ai-assistants',
  'Integrate AI into Your ERP',
  '/contact?service=ai-assistants',
  'Inquiry: Custom ERP Chatbot & Automation Extensions',
  'Hi Kozker team, we want to integrate a conversational AI copilot into our existing internal software to automate repetitive workflows.',
  3,
  true,
  ARRAY['Augment existing software with AI', 'AI for your existing software', 'AI extension for business software', 'Custom AI layer', 'AI integration layer', 'Intelligent systems built around yours', 'Agentic-AI Systems For Your Existing Systems'],
  'ERP AI Copilot & AI Integration Layer Case Study | Kozker Tech',
  'How Kozker engineered an AI extension for business software and AI integration layer inside Frappe ERP to augment existing software with AI.'
),

-- Case Study 4: Recruitment BI Dashboards & Data Pipeline
(
  'CS-BI-004',
  'recruitment-power-bi-dashboards',
  'Mid-Market IT Staffing Agency',
  'DATA ANALYTICS & BI',
  'Centralizing Recruitment Data & Building Automated Power BI Dashboards',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'An automated reporting pipeline moving a staffing agency from manual spreadsheet exports to a centralized MariaDB database and live Power BI business intelligence.',
  'IT Recruitment & Professional Services',
  '4 Weeks',
  'An IT staffing firm was managing high volumes of candidate submissions, interview rounds, and client feedback. To track performance and report progress back to their corporate clients, analysts spent hours every week manually exporting system CSVs, cleaning them in Excel, and rebuilding reports from scratch. They needed automated reporting and intelligent systems for business.',
  'Every client requested a slightly different report format, which meant analysts spent more time working in Excel than analyzing candidate bottlenecks. Key operational problems—like candidates dropping out during late interview stages or client feedback sitting pending for over two weeks—were buried inside scattered files and discovered too late.',
  'We built an AI & Analytics Layer and data pipeline that pulls raw system exports into a central MariaDB staging database. Using Power Query and structured SQL models, we standardized key milestones across the hiring pipeline (Screened, Interviewed, Selected, Onboarded) and established fixed calculations for metrics like selection ratios and turn-around times. We then delivered automated reporting dashboards in Power BI tailored for recruiters, team leads, and management, along with clean, filtered views that can be safely exported for client updates.',
  '[
    {"value": "100%", "label": "Elimination of manual weekly Excel MIS reporting"},
    {"value": "0–14d+", "label": "Automated candidate & feedback aging tracking"},
    {"value": "Live", "label": "Data refresh pipeline from MariaDB staging to Power BI"},
    {"value": "1-Click", "label": "Client filtering to export clean branded summaries"}
  ]'::jsonb,
  '{"text": "Our Mondays went from manual spreadsheet scrambles across client accounts to opening clean dashboards with candidate aging data ready from minute one.", "author": "Head of Operations & Client Reporting"}'::jsonb,
  '[
    {"title": "Central Staging Database", "desc": "Consolidated scattered operational exports into an organized MariaDB instance to establish a reliable source of truth."},
    {"title": "Standardized Transformation Logic", "desc": "Built Power Query logic to clean messy text inputs, unify status labels, and automatically calculate candidate aging buckets (0–7, 8–14, >14 days)."},
    {"title": "Role-Based Dashboard Views", "desc": "Created distinct operational views—high-level funnel metrics for management and detailed candidate aging lists for recruiters."},
    {"title": "Client-Filtered Reporting Views", "desc": "Configured clean report pages that allow account managers to isolate data for a single client and generate progress summaries without manual editing."}
  ]'::jsonb,
  ARRAY['Power BI (Desktop & Service)', 'MariaDB', 'Power Query (M)', 'DAX', 'SQL Data Modeling'],
  'data-bi',
  'Build Custom Power BI Dashboards',
  '/contact?service=data-analytics',
  'Inquiry: Power BI & Data Pipeline Setup',
  'Hi Kozker team, we want to consolidate our operational data and automate our internal and client reporting using Power BI.',
  4,
  true,
  ARRAY['Automated Reporting', 'AI & Analytics Layer', 'intelligent systems for business', 'Custom AI systems for business', 'Extend existing systems with AI', 'Integrated AI Platform'],
  'Automated Reporting & Recruitment BI Dashboards Case Study | Kozker Tech',
  'See how Kozker built an AI & Analytics Layer and automated reporting pipeline in Power BI, replacing weekly Excel scrambles with live intelligence.'
),

-- Case Study 5: CA Practice Workflow & Document Portal
(
  'CS-AUTO-005',
  'chartered-accountancy-workflow-automation',
  'Chartered Accountancy & Tax Advisory Practice',
  'WORKFLOW AUTOMATION',
  'Streamlining Client Intake, Document Collection & Approval Workflows for a CA Firm',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'Tailored AI systems for service companies covering client intake, checklist document verification, partner reviews, and payment-locked deliverables.',
  'Accounting & Legal Compliance',
  '6 Weeks',
  'A busy Chartered Accountancy firm handling tax filings, audits, and business registrations was managing client inquiries and document handoffs across phone calls, physical paper drops, and WhatsApp messages. They engaged Kozker to extend existing systems with AI and deploy custom AI systems for business to eliminate document chasing.',
  'When clients submitted incomplete sets of documents (for example, sending identity cards but forgetting address proofs or photos for registration), work sat idle until an employee noticed. Senior CAs had no central view of what work was pending review, and completed reports were sometimes sent out before final invoices were paid.',
  'We engineered tailored AI systems for service companies featuring an 8-stage automated workflow system. When a client gets in touch, the system looks up their phone number to check if they are an existing client or a new lead. Once work is created, a predefined document checklist is auto-assigned based on the service type. The system tracks submitted files against the checklist, automatically flagging missing items and sending reminders. Staff start work using an integrated timer, submit completed files to senior CAs for review, and once approved, finance generates the invoice, providing automated reporting for firm leadership.',
  '[
    {"value": "Instant", "label": "Mobile lookup separating new leads from existing clients"},
    {"value": "100%", "label": "Checklist document tracking flagging missing files"},
    {"value": "Live", "label": "Work timers recording staff processing on ''Start Work''"},
    {"value": "Locked", "label": "Report downloads gated until payment verification"}
  ]'::jsonb,
  '{"text": "Automating document checklists stops endless follow-ups for missing records, and holding downloads until payment confirmation completely fixed our overdue invoice problems.", "author": "Partner, Audit & Corporate Compliance"}'::jsonb,
  '[
    {"title": "Phone-Based Client Intake Engine", "desc": "Instantly recognizes returning clients by mobile number or automatically generates lead tracking numbers for new inquiries."},
    {"title": "Checklist-Based Document Verification", "desc": "Automatically cross-references uploaded files against required compliance checklists and sends automated reminders for pending items."},
    {"title": "Review & Approval Workflow", "desc": "Routes completed staff assignments to reviewing CAs with one-click approve/reject actions and mandatory modification notes."},
    {"title": "Payment-Gated Report Delivery", "desc": "Keeps downloadable deliverables locked behind invoice confirmation, automatically notifying clients and unlocking access once payment is logged."}
  ]'::jsonb,
  ARRAY['Node.js', 'PostgreSQL', 'Webhook Messaging Engine', 'Cloud File Storage', 'Invoicing Integrations'],
  'automation',
  'Automate Your Practice Workflows',
  '/contact?service=workflow-automation',
  'Inquiry: Accounting & Professional Services Practice Management',
  'Hi Kozker team, we operate a professional services firm and want to build an automated workflow for client intake, document verification, and task tracking.',
  5,
  true,
  ARRAY['Tailored AI systems for service companies', 'AI automation', 'intelligent systems for business', 'Custom AI systems for business', 'Extend existing systems with AI', 'Automated Reporting'],
  'CA Practice Workflow Automation & Intake Case Study | Kozker Tech',
  'How Kozker built tailored AI systems for service companies and workflow automation for a Chartered Accountancy practice to eliminate manual document chasing.'
),

-- Case Study 6: AI Telecalling & Patient Scheduling Platform
(
  'CS-AI-006',
  'hospital-ai-telecalling-appointment-system',
  'Multi-Specialty Hospital Network',
  'AI ASSISTANTS & KNOWLEDGE SYSTEMS',
  'Designing an AI Telecalling & Appointment Rescheduling System for Hospitals',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  'Integrated voice and WhatsApp AI systems answering patient inquiries, managing consultation slots, and handling emergency rescheduling.',
  'Healthcare & Hospital Management',
  '10 Weeks',
  'A multi-specialty hospital was facing heavy phone call volumes at their reception desks during morning registration hours. Staff struggled to handle simple appointment inquiries while simultaneously managing walk-in patients and emergency updates. They needed AI systems development to engineer intelligent systems built around yours.',
  'When a doctor was suddenly called into emergency surgery or fell ill, hospital staff had to manually call dozens of scheduled patients one by one to inform them and rebook their slots. This led to long waiting room delays, missed notifications, and frustrated patients. Additionally, patients frequently called just to check if their lab or radiology reports were ready.',
  'We engineered agentic-AI systems for your existing systems connected directly to the hospital’s scheduling software. Each doctor’s slot availability is mapped to an AI telecalling and WhatsApp bot. When a patient calls, the system answers routine questions about doctor availability and books open slots into the HMIS. If a doctor flags an emergency unavailability in the portal, the system automatically alerts affected departments and contacts patients via WhatsApp/voice to offer alternative times or reassign them to available doctors on duty, building an integrated AI platform for clinical communications.',
  '[
    {"value": "Dedicated", "label": "AI voice agents for doctor schedules & consultation slots"},
    {"value": "Auto", "label": "Notification & slot reassignment on doctor leave"},
    {"value": "Direct", "label": "Messaging pipeline texting lab reports to WhatsApp"},
    {"value": "Real-time", "label": "Dashboard for call volume, transfers & confirmation"}
  ]'::jsonb,
  '{"text": "When a surgeon gets called into emergency duty, the bot automatically messages patients with open slots, which completely eliminated reception chaos and waiting-room arguments.", "author": "Outpatient Operations Lead, Multi-Specialty Hospital Network"}'::jsonb,
  '[
    {"title": "Doctor Slot Voice Assistant", "desc": "Answers inbound patient telephone calls, checks live doctor schedule availability, and books consultation slots into the hospital system."},
    {"title": "Dynamic Emergency Rescheduling", "desc": "Automatically triggers rescheduling notifications when a doctor marks emergency unavailability, offering patients new slots without staff intervention."},
    {"title": "Diagnostic Report Delivery", "desc": "Connects to lab management systems to auto-generate secure download links and dispatch them to patients via WhatsApp."},
    {"title": "Call & Booking Analytics", "desc": "Tracks total inbound call volume, AI resolution versus human receptionist transfers, booking success rates, and patient attendance metrics."}
  ]'::jsonb,
  ARRAY['Conversational Voice AI Platform', 'WhatsApp Business Cloud API', 'HMIS & Hospital Scheduling Integrations', 'PostgreSQL', 'Operational Analytics Engine'],
  'ai-assistants',
  'Explore Healthcare Automation',
  '/contact?service=ai-assistants',
  'Inquiry: AI Telecalling & Patient Booking Automation',
  'Hi Kozker team, we want to build an automated telecalling and WhatsApp appointment management system for our healthcare facility.',
  6,
  true,
  ARRAY['AI systems development', 'Build AI-powered systems', 'intelligent systems for business', 'Intelligent systems built around yours', 'AI for your existing software', 'Integrated AI Platform', 'Agentic-AI Systems For Your Existing Systems'],
  'Hospital AI Telecalling & Scheduling Case Study | Kozker Tech',
  'Discover how Kozker engineered intelligent systems built around yours and agentic-AI systems for your existing systems in hospital patient scheduling.'
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
  keywords = EXCLUDED.keywords,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  updated_at = NOW();
