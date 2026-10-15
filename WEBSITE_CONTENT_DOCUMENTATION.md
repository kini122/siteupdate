# Kozker — Complete Website Content & Architecture Documentation

> **Purpose**: This document serves as the master, exhaustive content repository for the entire Kozker website. It catalogues every single piece of written copy, UI label, badge, heading, description, card, metric, client quote, accordion item, form link, and navigation element across global components and all six individual pages.

---

## Table of Contents
1. [Global Brand & Architecture](#1-global-brand--architecture)
2. [Global Navigation & Header](#2-global-navigation--header)
3. [Global Footer & Signature Band](#3-global-footer--signature-band)
4. [Page 1: Home Page (`/`)](#4-page-1-home-page-)
5. [Page 2: Services Page (`/services`)](#5-page-2-services-page-services)
   - [2.1 Data Analytics & Business Intelligence (`?tab=data-bi`)](#21-data-analytics--business-intelligence-tabdata-bi)
   - [2.2 AI Chatbots & Knowledge Systems (`?tab=ai-assistants`)](#22-ai-chatbots--knowledge-systems-tabai-assistants)
   - [2.3 Workflow Automation (`?tab=automation`)](#23-workflow-automation-tabautomation)
6. [Page 3: Work / Portfolio Page (`/work`)](#6-page-3-work--portfolio-page-work)
7. [Page 4: Products Page (`/products`)](#7-page-4-products-page-products)
8. [Page 5: Partnership Page (`/partners`)](#8-page-5-partnership-page-partners)
9. [Page 6: About Us Page (`/about`)](#9-page-6-about-us-page-about)
10. [Page 7: Contact Us Page (`/contact`)](#10-page-7-contact-us-page-contact)
11. [Global FAQ Repository](#11-global-faq-repository)

---

## 1. Global Brand & Architecture

| Attribute | Specification | Description |
| :--- | :--- | :--- |
| **Brand Name** | Kozker / KozkerTech | Technology and intelligent systems company. |
| **Primary Tagline** | *Data, AI & Automation* | Core service umbrella. |
| **Secondary Tagline** | *Your Business, made easier with Technology.* | Brand value proposition. |
| **Contact Phone** | `+91-73062-61147` (Mon-Fri, 9am-6pm IST) | Inbound phone & WhatsApp channel. |
| **Contact Emails** | `contact@kozker.com`, `support@kozker.com` | Primary inbound and support channels. |
| **HQ Address** | `1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005` | Company headquarters. |
| **Social Links** | LinkedIn (`https://www.linkedin.com/company/kozker-tech`), Instagram (`https://www.instagram.com/kozkertech/`) | Official social channels (strictly Instagram and LinkedIn only). |
| **Typography** | IBM Plex Sans, DM Sans, Inter, JetBrains Mono | Curated editorial typography hierarchy. |
| **Brand Accent Color** | Coral Orange (`#FF6E30`) | Primary CTA, active states, and animated vector strokes. |
| **Brand Dark Color** | Deep Warm Charcoal (`#322D2A`) | Navigation bar, dark cards, and footer background. |
| **Brand Surface Color** | Warm Cream / Off-White (`#F8F7F5` / `#FFFEFB`) | Page background and card surface tokens. |

---

## 2. Global Navigation & Header

### 2.1 Desktop Floating Navbar
* **Brand Logo**: Monogram mark (`/assets/19d5f3.png`), links to `/` (Home).
* **Navigation Links**:
  1. **Services** *(Dropdown Trigger)*:
     - `01` **DATA ANALYTICS & BUSINESS INTELLIGENCE** $\rightarrow$ `/services?tab=data-bi`
     - `02` **AI CHATBOTS** $\rightarrow$ `/services?tab=ai-assistants`
     - `03` **AUTOMATION** $\rightarrow$ `/services?tab=automation`
  2. **Products** $\rightarrow$ `/products`
  3. **Work** $\rightarrow$ `/work`
  4. **About** $\rightarrow$ `/about`
  5. **Partners** $\rightarrow$ `/partners`
* **Contact Action CTA**: `Contact` $\rightarrow$ `/contact` (Active pill indicator on `/contact`)

### 2.2 Mobile Navigation Sheet & Modal
* **Header**: Monogram logo + Close button (`✕`).
* **Menu Items**:
  1. **Services** *(Expandable Accordion)* with sub-links:
     - `01` `DATA ANALYTICS & BUSINESS INTELLIGENCE`
     - `02` `AI CHATBOTS`
     - `03` `AUTOMATION`
  2. **Our Work** $\rightarrow$ `/work`
  3. **Products** $\rightarrow$ `/products`
  4. **About Us** $\rightarrow$ `/about`
  5. **Partners** $\rightarrow$ `/partners`
* **Bottom Action**: `Contact Us` (Full-width Coral button) $\rightarrow$ `/contact`

---

## 3. Global Footer & Signature Band

### 3.1 Signature Band
* **Founder Signature**: Handcrafted cursive signature SVG of Govind Bhat (`/assets/77bd9d.svg`).
* **Footer Marks Cluster**:
  - Left Mark: Decorative accent icon (`/assets/0923b7.svg`).
  - Center Mark: Abstract emblem (`/assets/5d22e6.svg`).
  - Wordmark: Official **Kozker** serif typography (`/assets/ebbc67.svg`).

### 3.2 Main Footer
* **Brand Column**:
  - Logo + Wordmark: `Kozker Tech.`
  - Mission Note: *"Simple systems that save time, reduce manual work, and keep your business moving."*
* **Navigation Column**:
  - Heading: `Navigation`
  - Links: `Services`, `Products`, `Work`, `About`, `Partners`, `Contact`
* **Get in Touch Column**:
  - Heading: `Get in Touch`
  - Phone Numbers: `+91-73062-61147` & `+91 98467 00327`
  - Emails: `contact@kozker.com` & `support@kozker.com` (both styled in orange)
  - Address: `Kozker Tech Pvt Ltd, 1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005`
  - Social Links: `LinkedIn` & `Instagram` (bare monocolor logos)
* **Footer Bottom Meta**:
  - Left: `© 2026 Kozker Tech Pvt Ltd. All rights reserved.`
  - Right: `Data, AI & Automation`

---

## 4. Page 1: Home Page (`/`)

### 4.1 Hero Section
* **Eyebrow Badge**: `DATA, AI & AUTOMATION` (Monospace pill badge).
* **Display Headline**:
  > *"Your Business,*\
  > *made easier with **Technology**."*
* **Supporting Copy**: *"We build intelligent systems and products that help businesses work faster, automate the busywork, and make better decisions."*
* **Primary Action CTA**: `Start a Conversation →` (Links to `#contact`).
* **Secondary Action CTA**: `Explore Products` (Links to `#products`).

### 4.2 Selected Projects & Media Collage
* **Interactive Horizontal Carousel Showcase**:
  1. **Tab 01**: `Business Dashboard` | `Built to cut decision-making time by 20%.` | Tag: `01 ANALYTICS & BI` | Category: `Analytics & BI`
  2. **Tab 02**: `AI Customer Copilot` | `Automate responses & save 15+ hours per week.` | Tag: `02 AI ASSISTANTS` | Category: `AI Assistants`
  3. **Tab 03**: `Executive Decision Engine` | `Unified metrics across operations and sales.` | Tag: `03 BUSINESS INTELLIGENCE` | Category: `Business Intelligence`
  4. **Tab 04**: `Mobile Ops Hub` | `Streamlined workflow and team coordination.` | Tag: `04 AUTOMATION & OPS` | Category: `Automation`
  5. **Tab 05**: `Workflow Automation` | `Automated alerts and instant synchronization.` | Tag: `05 WORKFLOW SYNC` | Category: `Operations`
  6. **Tab 06**: `Knowledge Research AI` | `Turn scattered info into actionable briefs.` | Tag: `06 ENTERPRISE AI` | Category: `Enterprise AI`

### 4.3 Results & Metrics Row
* **Metric 1**: Value: `150+` | Label: `Projects Delivered`
* **Metric 2**: Value: `5,000+` | Label: `Hours of Manual Work Cut`
* **Metric 3**: Value: `100+` | Label: `Live Workflows Built`

### 4.4 Live Client Testimonials Rotator
* **Satisfaction Stat**: Value: `4 Weeks` | Label: `Average Launch Time`
* **Auto-Rotating Testimonials (4 Quotes)**:
  1. *"The WhatsApp automation has revolutionized our customer communication. Highly recommended!"*\
     — **Head of Customer Experience**, `Direct-to-Consumer E-Commerce Brand`
  2. *"The AI chatbot and reporting workflow transformed our customer experience. Sales have never been better."*\
     — **Founder & Managing Director**, `Consumer Hardware & D2C Scale-Up`
  3. *"Kozker unified our logistics data and automated exception tracking, cutting manual hours by 60%."*\
     — **VP of Supply Chain & Operations**, `Global Freight & Logistics Provider`
  4. *"Intuitive AI assistants integrated right into our workflow. Answers that used to take hours now take seconds."*\
     — **Head of Operations & Systems**, `B2B Enterprise SaaS Platform`

### 4.5 Solutions / Shift Section
* **Section Heading**:
  > *"Business moves fast.*\
  > *Your systems **Should Too**."*
* **Section Description**: *"Simple systems that save time, reduce manual work, and keep your business moving."*
* **Tabs Switcher**: `Data & BI` | `AI Assistants` | `Automation`

#### Tab 1: Data & BI
* **Step Number**: `01 / 03`
* **Category Label**: `DATA ANALYTICS & BUSINESS INTELLIGENCE`
* **Transform Headline**: `SCATTERED DATA` *(with animated strike)* $\rightarrow$ *to* **CLEAR INSIGHTS**
* **Body Copy**: *"Bring data from across your business into one clear view, so teams spend less time searching and more time deciding."*
* **We Build List**:
  - `Performance dashboards`
  - `Automated reporting`
  - `Connected data models`
* **Action Link**: `Explore Data & BI →` (Routes to `/services?tab=data-bi`)
* **Hero Image**: System flow architecture diagram (`/assets/9fa5e8.png`).
* **Tool Stack**: Microsoft Power BI, Python Coding Editor & IDE, SQL Playground, API Requester HTTP Client.

#### Tab 2: AI Assistants
* **Step Number**: `02 / 03`
* **Category Label**: `AI ASSISTANTS & KNOWLEDGE SYSTEMS`
* **Transform Headline**: `SCATTERED KNOWLEDGE` *(with animated strike)* $\rightarrow$ *to* **USEFUL ANSWERS**
* **Body Copy**: *"Make the best knowledge in your business available to the people who need it, when they need it."*
* **We Build List**:
  - `Customer support assistants`
  - `Internal knowledge assistants`
  - `Lead qualification interfaces`
* **Action Link**: `Explore AI Assistants →` (Routes to `/services?tab=ai-assistants`)
* **Hero Image**: AI copilot interface preview (`/assets/e467dd.jpg`).
* **Tool Stack**: OpenAI, Anthropic Claude, LangChain, Hugging Face.

#### Tab 3: Automation
* **Step Number**: `03 / 03`
* **Category Label**: `WORKFLOW AUTOMATION`
* **Transform Headline**: `REPETITIVE WORK` *(with animated strike)* $\rightarrow$ *to* **SIMPLE FLOWS**
* **Body Copy**: *"Connect the tools your team already uses and give routine work a clearer, faster path."*
* **We Build List**:
  - `Workflow automation`
  - `System integrations`
  - `Operational alerts`
* **Action Link**: `Explore Automation →` (Routes to `/services?tab=automation`)
* **Hero Image**: Automation pipeline diagram (`/assets/671883.jpg`).
* **Tool Stack**: Make (Integromat), Zapier, n8n, Airtable.

### 4.6 Partner Logo Strip
* **Label**: `Helping businesses build simpler ways`
* **Marquee Partners**: Microsoft Power BI, Python, SQL, REST APIs, WhatsApp, OpenAI.

### 4.7 Featured Case Studies ("See it in Action")
* **Section Title**: *"See it in **Action**."*
* **Section Subtext**: *"Explore the respective featured case studies for specific service."*
* **Interactive Service Selector Pill Dropdown**:
  - `DATA ANALYTICS & BUSINESS INTELLIGENCE`:
    - Card 1: `CloudScale Analytics` — Automated Cross-Border Ledger & Tax Reconciliation Engine (75% Faster reporting | 3.2x ROI)
    - Card 2: `GlobalFreight Logistics` — Real-Time Fleet Telemetry & Predictive Maintenance Intelligence (60% Time saved | 99.8% Sync accuracy)
  - `AI CHATBOTS & KNOWLEDGE SYSTEMS`:
    - Card 1: `FinEdge Wealth` — Context-Aware Compliance Assistant & Client Document Analyzer (92% Faster review | 4.9/5 satisfaction)
    - Card 2: `HealthCore Systems` — AI-Powered Patient Triage & Secure EHR Workflow Routing (85% Response reduction | 100% HIPAA)
  - `WORKFLOW AUTOMATION`:
    - Card 1: `Apex Supply Chain` — Automated Multi-Carrier Fulfillment & Exception Pipeline (90% Fewer manual errors | 14 hrs Saved/wk)
    - Card 2: `Nexus Retail Group` — End-to-End WhatsApp Order & Inventory Sync Automation (4.8x Speed to dispatch | 99.9% Uptime)
* **Bottom Action Button**: `View all Work` $\rightarrow$ `/work`

### 4.8 How We Work / Process Stack
* **Section Title**: *"How we **Work**"*
* **Section Subtext**: *"Simple systems that save time, reduce manual work, and keep your business moving."*
* **4 Progressive Steps**:
  1. `01 DISCOVER` (Progress: 25%):
     - Headline: *"Understand the core problem."*
     - Description: *"Map the workflows, pain points, and opportunities behind your business operations."*
  2. `02 DESIGN` (Progress: 50%):
     - Headline: *"Architect the solution."*
     - Description: *"Shape a practical, intuitive system built around how your team actually works."*
  3. `03 BUILD` (Progress: 75%):
     - Headline: *"Ship fast, iterate often."*
     - Description: *"Ship a useful first version rapidly and make it an effortless part of daily operations."*
  4. `04 EVOLVE` (Progress: 100%):
     - Headline: *"Improve with data."*
     - Description: *"Measure what works, refine the system, and help it evolve with your business."*

### 4.9 Dark Products Showcase
* **Headline**: *"Not everything **We Build** starts with a client."*
* **Description**: *"We explore problems & apply the same thinking we bring to every business we work with."*
* **Link**: `View all Products →`
* **Image**: `/assets/recruiter-ai.jpg` (Kozker Recruiter AI)
* **Metadata Row**: `AI Recruitment Operations` & `v1.0.8-PRO`
* **Featured Product**: `RECRUITMENT MANAGEMENT TOOL`
  - Description: *"A recruitment management platform that helps teams organize candidates, streamline hiring workflows, and manage recruitment in one place."*
  - Demo Button: `▶ Watch 1 Min Demo` (Direct link to Loom: [Recruitment App Admin Console and AI Copilot Tour](https://www.loom.com/share/a0e96cbbd64e46188561d0eb22c3d0ea))
  - Text Link: `Explore Product →` (Direct link to Vercel: [Kozker Recruiter AI | AI Recruitment Operations Platform](https://recruiter-landing-page-olive.vercel.app/))

---

## 5. Page 2: Services Page (`/services`)

The Services page dynamically loads content across three distinct service domains based on the active tab parameter (`?tab=data-bi`, `?tab=ai-assistants`, `?tab=automation`).

---

### 2.1 Data Analytics & Business Intelligence (`?tab=data-bi`)

* **Hero Badge**: `Service`
* **Hero Title**: `Data Analytics & Business Intelligence`
* **Hero Subtitle**: `Turn your data into decisions.`
* **Hero Description**: *"Your business already has data. We help you bring it together, make sense of it, and turn it into clear insights that support better decisions."*
* **Hero CTA**: `Get Consultation →`
* **Hero Media Showcase**:
  1. `Executive Decision Hub` | Unified revenue and pipeline dashboards (`01 ANALYTICS & BI`)
  2. `Cross-Border Tax & VAT BI` | Real-time ledger and regional reconciliation (`02 INTELLIGENCE`)
  3. `Real-Time KPI Stream` | Live metrics delivered to Slack & web (`03 DATA ENGINE`)
  4. `Automated Reporting` | Daily automated exports and alerts (`04 REPORTING`)
  5. `Operations Metrics Hub` | End-to-end departmental performance metrics (`05 OPS DASHBOARD`)
* **Section 1: The Shift**:
  - Eyebrow: `The Shift`
  - Heading: *"Turn your Data into Decisions."*
  - 4 Comparisons (2x2 Grid with strikes):
    1. `Fragmented Data` $\rightarrow$ **Unified Insights**: *"Connect scattered business information into one clearer view."*
    2. `Manual Reporting` $\rightarrow$ **Automated Reporting**: *"Reduce repetitive reporting and get critical information faster."*
    3. `Limited Visibility` $\rightarrow$ **Clear Decisions**: *"Turn complex data into insights your team can act on."*
    4. `Disconnected Systems` $\rightarrow$ **Connected Data**: *"Bring relevant sources together for more reliable analysis."*
* **Section 2: The Solution**:
  - Eyebrow: `The Solution`
  - Heading: *"We build the systems that make your data useful."*
  - 4 Feature Cards:
    1. `Performance Dashboards`: *"Track the metrics that matter."*
    2. `Automated Reporting`: *"Reports delivered without manual work."*
    3. `Connected Data Models`: *"Single source of truth across tools."*
    4. `Operational Analytics`: *"Real-time signals for fast decision-making."*
* **Section 3: The Process**:
  - Eyebrow: `The Process`
  - Heading: *"How we bring your systems to life."*
  - 4 Timeline Steps:
    - `01 THE VISION`: *"Turn complex data into insights your team can act on."*
    - `02 THE SYSTEM`: *"Design the right system around how your team operates."*
    - `03 THE BUILD`: *"Build a useful first version and make it part of the day-to-day."*
    - `04 THE EVOLVE`: *"Improve the system with real feedback and better data."*

---

### 2.2 AI Chatbots & Knowledge Systems (`?tab=ai-assistants`)

* **Hero Badge**: `Service`
* **Hero Title**: `AI Chatbots & Knowledge Systems`
* **Hero Subtitle**: `Turn scattered knowledge into instant answers.`
* **Hero Description**: *"Make the best knowledge in your business available to the people who need it, when they need it, with custom AI assistants built on your data."*
* **Hero CTA**: `Get Consultation →`
* **Hero Media Showcase**:
  1. `AI Customer Copilot` | Automate responses & save 15+ hrs/week (`01 AI ASSISTANTS`)
  2. `Knowledge Research AI` | Semantic search across internal docs (`02 ENTERPRISE AI`)
  3. `WhatsApp Support Bot` | Instant multi-language client answers (`03 CONVERSATIONAL`)
  4. `Lead Qualification Agent` | Auto-qualifies incoming buyers in minutes (`04 GROWTH AI`)
  5. `Multi-Channel Copilots` | Omnichannel AI across Slack, web and messaging (`05 INTEGRATED AI`)
* **Section 1: The Shift**:
  - Eyebrow: `The Shift`
  - Heading: *"Turn Scattered Knowledge into Useful Answers."*
  - 4 Comparisons:
    1. `Scattered Knowledge` $\rightarrow$ **Useful Answers**: *"Give every team a faster path to trusted internal information."*
    2. `Slow Support` $\rightarrow$ **Helpful Assistants**: *"Automate first answers without losing your team’s voice."*
    3. `Repeated Questions` $\rightarrow$ **Shared Context**: *"Turn common questions into a reusable knowledge system."*
    4. `Manual Qualification` $\rightarrow$ **Better Leads**: *"Let your team spend more time on conversations that matter."*
* **Section 2: The Solution**:
  - Eyebrow: `The Solution`
  - Heading: *"We build the AI systems that empower your team."*
  - 4 Feature Cards:
    1. `Customer Support AI`: *"24/7 intelligent tier-1 ticket resolution."*
    2. `Internal Knowledge Copilots`: *"Instant semantic search over company docs."*
    3. `Lead Qualification Bots`: *"Convert website traffic into booked meetings."*
    4. `Multi-Channel AI`: *"Deploy seamlessly on WhatsApp, Slack & web."*
* **Section 3: The Process**:
  - Eyebrow: `The Process`
  - Heading: *"How we bring your systems to life."*
  - 4 Timeline Steps:
    - `01 THE KNOWLEDGE`: *"Audit documentation, manuals, and customer FAQs for AI indexing."*
    - `02 THE ARCHITECTURE`: *"Design prompt guardrails, embeddings, and context retrieval."*
    - `03 THE COPILOT`: *"Deploy conversational interfaces for internal and customer use."*
    - `04 THE ACCURACY`: *"Refine precision using real interaction logs and human validation."*

---

### 2.3 Workflow Automation (`?tab=automation`)

* **Hero Badge**: `Service`
* **Hero Title**: `Workflow Automation`
* **Hero Subtitle**: `Connect tools, remove friction, save hours.`
* **Hero Description**: *"Connect the tools your team already uses and give routine work a clearer, faster path, eliminating manual data entry and errors."*
* **Hero CTA**: `Get Consultation →`
* **Hero Media Showcase**:
  1. `Ops Workflow Automation` | Eliminate error-prone spreadsheets with sync (`01 AUTOMATION`)
  2. `Inventory Sync Engine` | Real-time stock balancing across channels (`02 OPERATIONS`)
  3. `Automated Billing & Invoices` | Stripe, QuickBooks and tax automation (`03 FINANCE OPS`)
  4. `CRM Lead Router` | Instant routing and follow-up notifications (`04 PIPELINES`)
  5. `Instant Notification Relay` | Proactive alerting for mission-critical events (`05 REALTIME SYNC`)
* **Section 1: The Shift**:
  - Eyebrow: `The Shift`
  - Heading: *"Turn Repetitive Work into Simple Flows."*
  - 4 Comparisons:
    1. `Repetitive Work` $\rightarrow$ **Simple Flows**: *"Remove handoffs and give recurring work a reliable path."*
    2. `Disconnected Tools` $\rightarrow$ **Connected Actions**: *"Move information between the tools your team already trusts."*
    3. `Missed Follow-ups` $\rightarrow$ **Timely Signals**: *"Keep important actions visible without adding more admin."*
    4. `Manual Operations` $\rightarrow$ **Calmer Days**: *"Build a system that supports people instead of slowing them down."*
* **Section 2: The Solution**:
  - Eyebrow: `The Solution`
  - Heading: *"We build the automations that save your team hours."*
  - 4 Feature Cards:
    1. `Workflow Automation`: *"Trigger end-to-end actions without manual input."*
    2. `System Integrations`: *"Sync CRM, ERP, and databases automatically."*
    3. `Operational Alerts`: *"Get notified before bottlenecks become problems."*
    4. `Custom API Pipelines`: *"Bespoke data movement tailored to your stack."*
* **Section 3: The Process**:
  - Eyebrow: `The Process`
  - Heading: *"How we bring your systems to life."*
  - 4 Timeline Steps:
    - `01 THE BOTTLENECK`: *"Identify manual handoffs and repetitive steps in your daily ops."*
    - `02 THE BLUEPRINT`: *"Map seamless integrations across your CRM, database, and messaging tools."*
    - `03 THE AUTOMATION`: *"Build resilient webhook flows with fail-safes and instant sync."*
    - `04 THE SCALE`: *"Monitor speed, error rates, and time saved as business expands."*

---

## 6. Page 3: Work / Portfolio Page (`/work`)

### 6.1 Page Intro Header
* **Eyebrow**: `Portfolio`
* **Page Title**: `Our Work`
* **Page Description**: `Tools and systems built around real business problems.`

### 6.2 View Switcher Tabs & Category Filter
* **Switcher Tabs**: `Case Studies` | `Projects`
* **Category Dropdown Filter**:
  - `DATA ANALYTICS & BUSINESS INTELLIGENCE` (`data-bi`)
  - `AI CHATBOTS & KNOWLEDGE SYSTEMS` (`ai-assistants`)
  - `WORKFLOW AUTOMATION` (`automation`)

### 6.3 Complete Case Study Catalog (6 Master Case Studies)

#### 1. FinScale Analytics (`data-bi`)
* **Client**: `FinScale Analytics`
* **Category**: `FINTECH & BI`
* **Title**: *"Automated Financial Modeling & Real-Time Executive Dashboards"*
* **Description**: *"Unified reporting pipeline connecting multi-entity ERP and payment gateways into live board-ready insights."*
* **Metrics**: `75% Faster reporting` | `3.2x ROI in 90 Days`
* **Quote**: *"The automated executive dashboards reduced our month-end reconciliation and reporting from 5 days to 20 minutes."* — Head of Finance, High-Growth FinTech Platform
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

#### 2. Global Logistics Network (`data-bi`)
* **Client**: `Global Logistics Network`
* **Category**: `LOGISTICS BI`
* **Title**: *"Cross-Border Logistics Ops Sync & BI Metrics"*
* **Description**: *"Automated real-time inventory and shipment reconciliations cutting manual tracking time across regional carriers by 60%."*
* **Metrics**: `60% Time saved` | `99.8% Sync accuracy`
* **Quote**: *"Kozker unified our freight tracking and automated 90% of exception alerts. A total game changer for our operations team."* — VP of Supply Operations, Global Cross-Border Logistics Enterprise
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

#### 3. TechGadgets Pro (`ai-assistants`)
* **Client**: `TechGadgets Pro`
* **Category**: `E-COMMERCE & AI`
* **Title**: *"Boosts Conversion Rate by 45% with our Automation and Chatbot Integration"*
* **Description**: *"End-to-end multi-channel WhatsApp and web copilot delivering 24/7 lead qualification and instant order tracking."*
* **Metrics**: `45% Conversion rate` | `40% Orders Increase`
* **Quote**: *"The AI chatbot and WhatsApp automation transformed our customer experience. Sales have never been better."* — Founder & Managing Director, Consumer Electronics & D2C Scale-Up
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

#### 4. HealthCore Systems (`ai-assistants`)
* **Client**: `HealthCore Systems`
* **Category**: `HEALTHCARE & AI`
* **Title**: *"AI-Powered Patient Triage & Secure EHR Workflow Routing"*
* **Description**: *"HIPAA-compliant conversational AI triage assistant handling intake, symptoms assessment, and calendar booking."*
* **Metrics**: `85% Response reduction` | `100% HIPAA Compliance`
* **Quote**: *"Kozker created an intelligent triage pipeline that reduced clinical admin load without missing a single critical case."* — Chief Medical Officer, Regional Healthcare Network
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

#### 5. Apex Supply Chain (`automation`)
* **Client**: `Apex Supply Chain`
* **Category**: `WORKFLOW AUTOMATION`
* **Title**: *"Automated Multi-Carrier Fulfillment & Exception Pipeline"*
* **Description**: *"Multi-system shipping automation integrating warehouse scanning, customs clearances, and automated carrier alerts."*
* **Metrics**: `90% Fewer manual errors` | `14 hrs Saved per team/wk`
* **Quote**: *"We eliminated 14 hours of manual cross-checking each week. Orders route straight to fulfillment without a hitch."* — Director of Logistics, Enterprise Supply Chain Provider
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

#### 6. Nexus Retail Group (`automation`)
* **Client**: `Nexus Retail Group`
* **Category**: `PROCESS INTEGRATION`
* **Title**: *"End-to-End WhatsApp Order & Inventory Sync Automation"*
* **Description**: *"Real-time sync bridging conversational commerce orders directly with inventory databases and payment settlement."*
* **Metrics**: `4.8x Speed to dispatch` | `99.9% Uptime reliability`
* **Quote**: *"The automated workflows sync our order data instantly between WhatsApp, Shopify, and our regional warehouse."* — VP of Technology, Omnichannel Retail Group
* **CTA Button**: `Start a Conversation` $\rightarrow$ `#contact`

---

## 7. Page 4: Products Page (`/products`)

### 7.1 Page Header
* **Eyebrow**: `Products`
* **Page Title**: `Products`
* **Page Description**: `Tools built around real business problems.`

### 7.2 Product Catalog Listings

#### Product 01: Recruitment Management Tool
* **Index**: `01 / 02`
* **Category Badge**: `Recruitment`
* **Title**: `RECRUITMENT MANAGEMENT TOOL`
* **Image**: Kozker Recruiter AI platform (`/assets/recruiter-ai.jpg`)
* **Description**: *"AI recruitment operations platform built for high-speed hiring. Converts client briefs into job descriptions, parses resumes, ranks talent using weighted skills, and tracks hiring stages from one workspace."*
* **What it does Bullet Points**:
  - `AI Job Description & personalized screening question generation`
  - `Weighted skills approval & semantic candidate scoring (0–100)`
  - `Automated resume ingestion, parsing & pipeline stage tracking`
* **Actions**:
  - `Explore Product →` (Direct link to [Kozker Recruiter AI | AI Recruitment Operations Platform](https://recruiter-landing-page-olive.vercel.app/))
  - `Watch Demo` (Direct link to [Recruitment App Admin Console and AI Copilot Tour](https://www.loom.com/share/a0e96cbbd64e46188561d0eb22c3d0ea))
  - `Details` (Opens interactive preview modal).

#### Product 02: AI-Powered Business Tools
* **Index**: `02 / 02`
* **Category Badge**: `AI Tools`
* **Title**: `AI-POWERED BUSINESS TOOLS`
* **Image**: KozkerTech AI Tools Platform cover (`/assets/ai-tools-platform.jpg`)
* **Description**: *"Discover powerful AI tools designed to help you create content, generate images, write code, automate workflows, and make smarter business decisions — all in minutes."*
* **What it does Bullet Points**:
  - `12+ free generative tools for branding, copy & business launch`
  - `Domain Name Genie, proposal generator & landing page copy`
  - `Automated Power BI DAX measures & schema mapping helpers`
* **Actions**:
  - `Try Product →` (Direct link to [Best Free AI Tools for Business 2026 | AI Tools Directory | KozkerTech | Kozker](https://tools.kozker.com/tools))
  - `Details` (Direct link to [AI Tools Platform for Business Growth | Free Generative AI Tools | KozkerTech](https://tools.kozker.com/))

### 7.3 Placeholder Panel
* **Label**: *"More useful tools are on the way."*

---

## 8. Page 5: Partnership Page (`/partners`)

### 8.1 Hero Section
* **Eyebrow**: `Partnerships`
* **Display Headline**:
  > *"Build with **Kozker**."*
* **Supporting Copy**: *"We partner with HR professionals, service providers, and businesses to bring AI-powered systems and automation to more teams."*
* **Primary CTA**: `Become a Partner` $\rightarrow$ `#contact`

### 8.2 Section 1: "Why Us"
* **Badge**: `Why Us`
* **Section Heading**:
  > *"More than a partnership.*\
  > *A way to build and grow together."*
* **3 Feature Cards**:
  1. `Practical Systems`: *"Clear tools that fit how your partners already work."* (Icon: Rocket)
  2. `Shared Growth`: *"A product direction shaped around useful outcomes."* (Icon: Trending Up)
  3. `Built Together`: *"A responsive team from first idea to steady adoption."* (Icon: Users)

### 8.3 Section 2: "Choose your Partnership" (Models)
* **Badge**: `Models`
* **Section Heading**: `Choose your Partnership`
* **Section Subtext**: *"Simple systems that save time, reduce manual work, and keep your business moving."*
* **Model 1: HR & Recruitment Agencies**:
  - Tag: `AI Automation`
  - Title: `HR & Recruitment Agencies`
  - Category: `Agency Partnership`
  - Headline: *"Expand Client Offerings with AI Intelligence"*
  - Description: *"Deliver bespoke candidate scoring, automated initial screening, and seamless workflow integrations for your clients."*
  - CTA Button: `Explore Model →`
* **Model 2: Enterprise Solutions**:
  - Tag: `Enterprise Partner`
  - Title: `Enterprise Solutions`
  - Category: `Co-Development`
  - Headline: *"Custom Knowledge Systems & Automation"*
  - Description: *"Partner with our engineering team to co-build enterprise-grade data intelligence systems tailored to complex operations."*
  - CTA Button: `Explore Model →`
* **Model 3: CA & Accounting Firms**:
  - Tag: `FinTech & Tax`
  - Title: `CA & Accounting Firms`
  - Category: `Practice Partnership`
  - Headline: *"Expand Client Offerings with AI Intelligence"*
  - Description: *"Deploy white-labeled AI agents for Indian compliance, reconciliation, audit workflows, and live client dashboards across your engagements."*
  - CTA Button: `Explore Model →`
* **Model 4: Strategic Alliances**:
  - Tag: `Strategic Partner`
  - Title: `Strategic Alliances`
  - Category: `General Partnership`
  - Headline: *"Co-Innovate, Refer, or Integrate with Kozker"*
  - Description: *"Partner across technology integrations, joint solutions, and referral channels to deliver end-to-end data and AI transformation."*
  - CTA Button: `Explore Model →`

### 8.4 Section 3: "The Process"
* **Badge**: `The Process`
* **Section Heading**:
  > *"More than a partnership.*\
  > *A way to build and grow together."*
* **3 Step Flow Cards (with directional animated coral arrows)**:
  1. `Discovery & Mapping`: *"Audit existing workflows and identify high-leverage automation opportunities."* (Icon: Workflow)
  2. `Co-Build & Integrate`: *"Engineer custom AI solutions and connect seamlessly with your team's tools."* (Icon: Rocket)
  3. `Scale & Ongoing Support`: *"Deploy production-grade systems with operator training and continuous iteration."* (Icon: Users)

---

## 9. Page 6: About Us Page (`/about`)

### 9.1 Editorial Hero Section
* **Eyebrow**: `About Us`
* **Display Headline**:
  > *"Transforming Businesses*\
  > *Through **Technology**."*
* **Hero Copy**: *"We're on a mission to help businesses leverage cutting-edge technology to grow, innovate, and succeed in the digital age."*
* **Hero Working Banner**: Full-width team collaboration photograph (`/assets/887522.png`).

### 9.2 Our Story Section
* **Story Heading**: `Our Story.`
* **Story Copy**:
  - Paragraph 1: *"Founded in 2024, KozkerTech is the technology division of Kozker, a brand established in 2022. We began with a simple vision: to make advanced technology accessible to businesses of all sizes."*
  - Paragraph 2: *"Too many growing companies get caught between off-the-shelf software that doesn't fit their workflows and enterprise systems that cost too much to build and maintain. We bridge that divide—delivering custom, interconnected systems that fit into daily operations from day one."*
  - Highlight: *"Our startup is young, our experience isn't."*
* **Story Accordion** *(both Vision and Mission open simultaneously by default)*:
  - `01 THE VISION`: *"Make advanced technology more accessible and useful to the businesses that need it. We envision an operating standard where data intelligence, private assistants, and workflow automation aren't exclusive to massive tech enterprises, but practical tools that lean teams use every day to outpace operational friction and scale confidently."*
  - `02 OUR MISSION`: *"Build systems that help people spend less time searching and more time deciding. We engineer dependable, low-overhead software layers that integrate directly into existing stacks—eliminating repetitive manual work, reconciling disconnected data, and giving operators clear, reliable visibility that compounds over time."*

### 9.3 Highlight Quote Block
* **Symbol**: Coral double quotation mark icon (`/assets/ff53c8.svg`).
* **Quote**: *“Technology should make business simpler, not more complicated.”*

### 9.4 Founder Spotlight Row
* **Founder Photograph**: Govind Bhat portrait (`/assets/642e0f.png`).
* **Founder Name**: `Govind Bhat`
* **Founder Role**: `Founder of Kozker`
* **Founder Quote**: *“Bring data from across your business into one clear view, so teams spend less time searching and more time deciding.”*

### 9.5 The Team Section
* **Section Heading**: `The Team.`
* **Section Subtext**: *"We're on a mission to help businesses leverage cutting-edge technology to grow, innovate, and succeed in the digital age."*
* **3 Team Member Cards**:
  1. `Govind Bhat` | `Founder of Kozker` | Image: `/assets/642e0f.png`
  2. `Govind Bhat` | `Founder of Kozker` | Image: `/assets/642e0f.png`
  3. `Govind Bhat` | `Founder of Kozker` | Image: `/assets/642e0f.png`

### 9.6 "What We Build" Dark Band
* **Mono Label**: `WHAT WE BUILD`
* **Headline**: *"From business problems to useful technology."*
* **Description**: *"We build intelligent systems and products that help businesses work faster, automate the busywork, and make better decisions."*
* **Interactive Outline Links**:
  - `SYSTEMS` $\rightarrow$ `/services`
  - `PRODUCTS` $\rightarrow$ `/products`
  - `PARTNERS` $\rightarrow$ `/partners`

---

## 10. Page 7: Contact Us Page (`/contact`)

### 10.1 Page Hero Section
* **Eyebrow**: `Contact Us`
* **Display Headline**:
  > *"Contact **Us**."*
* **Hero Copy**: *"Have questions or need assistance? Our team is here to help you."*

### 10.2 Editorial Contact Layout
* **Layout Structure**: 2-Column editorial grid (`story-grid` aligned) with warm paper background and subtle divider rules.

#### Left Column: Direct Inquiries, HQ & Connect
1. **Phone**:
   - Monospace Label: `PHONE`
   - Numbers: `+91-73062-61147` (`tel:+917306261147`) & `+91 98467 00327` (`tel:+919846700327`)
   - Hours Subtext: `Mon-Fri, 9am-6pm IST`
2. **Email**:
   - Monospace Label: `EMAIL`
   - Inquiries: `contact@kozker.com` (`mailto:contact@kozker.com`)
   - Support: `support@kozker.com` (`mailto:support@kozker.com`)
3. **HQ**:
   - Monospace Label: `HQ`
   - Address: `1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005`
   - Country: `India`
   - Action: `Open in Maps →`
4. **Connect With Us**:
   - Monospace Label: `CONNECT WITH US`
   - Monocolor Brand Logos (strictly Instagram & LinkedIn only):
     - `LinkedIn Logo` (`https://www.linkedin.com/company/kozker-tech`)
     - `Instagram Logo` (`https://www.instagram.com/kozkertech/`)

#### Right Column: Minimalist Message Form
* **Heading**: `Send Us a Message.`
* **Fields**:
  1. `Name` *(Required)*
  2. `Email` *(Required)*
  3. `Phone (Optional)`
  4. `Company (Optional)`
  5. `Subject` *(Required dropdown: Web Design, Customer Support, WhatsApp Automation, Power BI Solutions, General Inquiry)*
  6. `Message` *(Required textarea)*
* **Action**: `Send Message` (Coral button with quiet loading indicator and clean inline confirmation)

---

## 11. Page-Specific FAQ Repository

### 11.1 Home Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **What kind of businesses do you work with?** | *"We work with growing companies, regional enterprises, and lean operations teams across retail, logistics, healthcare, and professional services that need clearer visibility and less manual overhead."* |
| **02** | **How does a typical engagement work from start to finish?** | *"We start with a focused mapping session to understand your current tools and bottlenecks. Next, we architect and deliver a working version in about 4 weeks, followed by iterative refinement alongside your operators."* |
| **03** | **Do we need to replace our current software stack?** | *"No. We build connected layers and automations that integrate directly with your existing CRM, ERP, spreadsheets, and databases—protecting your current investments while making them dramatically more useful."* |
| **04** | **How do you measure the ROI of a Kozker build?** | *"Every build is anchored to clear operational KPIs—such as hours saved per week, reporting latency reduced from days to minutes, error rate cuts, or lead response times—with transparent before-and-after tracking."* |
| **05** | **What happens after the system goes live?** | *"We don't hand off code and disappear. We provide comprehensive team onboarding, continuous monitoring, and ongoing support to ensure your workflows evolve smoothly as your business scales."* |

### 11.2 Services Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **How do you ensure our internal company data remains private and secure with AI?** | *"We implement enterprise-grade data isolation, role-based access control, and private LLM routing. Your internal documents, customer records, and proprietary operational data are never used to train public models."* |
| **02** | **Can our disparate databases and cloud tools connect into one real-time BI dashboard?** | *"Yes. We engineer unified data pipelines that pull from SQL databases, REST APIs, Google Sheets, ERPs, and warehouse logs, reconciling messy schemas into a clean, automated single source of truth."* |
| **03** | **How do AI assistants handle complex or multi-step questions from our team?** | *"We build Retrieval-Augmented Generation (RAG) and agentic workflows that cite your exact verified internal sources, SOPs, and historical tickets, providing accurate answers with source attribution and human fallback mechanisms."* |
| **04** | **What level of technical maintenance is required from our internal team?** | *"Near zero. We construct self-healing automated pipelines with automated exception alerts, rate-limit protection, and robust logging so your non-technical staff can operate them with total peace of mind."* |
| **05** | **How long does it take to deploy a custom service solution?** | *"Most focused solutions—such as an automated reporting engine or an intelligent triage assistant—launch in 3 to 4 weeks, allowing your team to realize operational gains immediately without multi-quarter roadmaps."* |

### 11.3 Products Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **Are Kozker products off-the-shelf SaaS, or can they be customized for our workflows?** | *"Our products are modular and built to be customized. While they come with battle-tested core functionality out of the box, we tailor custom intake forms, pipeline stages, and integration points to match your team’s exact process."* |
| **02** | **How does the Recruitment Management Tool connect with existing job boards and communication channels?** | *"It integrates bidirectionally with platforms like LinkedIn, WhatsApp, email, and Google Workspace, automatically scoring candidate submissions, updating pipeline status, and scheduling interviews without manual data entry."* |
| **03** | **Can we host Kozker products in our own private cloud infrastructure?** | *"Yes. We support both fully-managed cloud deployment and dedicated private cloud/on-premise installations for organizations with strict data residency and compliance guidelines."* |
| **04** | **How are software updates and feature improvements handled?** | *"All product users receive automated security patches and regular feature upgrades without downtime. Custom operational logic and bespoke integrations are preserved across all release cycles."* |
| **05** | **What is the pricing model for Kozker products?** | *"We prioritize transparent, predictable pricing based on actual operational usage rather than per-seat penalties that disincentivize team-wide adoption. Contact us for a tailored breakdown for your organization."* |

### 11.4 Work / Portfolio Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **Are the case study metrics like '60% time saved' and '99.8% sync accuracy' verified?** | *"Yes. All metrics reflect audited operational outcomes measured over 90-day post-launch evaluation windows compared directly against the client’s historical baseline data."* |
| **02** | **How do you handle client confidentiality and intellectual property?** | *"We execute comprehensive bilateral NDAs before touching any project data. Your workflows, data architectures, custom codebases, and operational logic remain 100% your exclusive intellectual property."* |
| **03** | **Our industry has very specific compliance regulations. Have you built under strict requirements?** | *"We have engineered systems complying with HIPAA in healthcare triage, SOC 2 protocols, and cross-border VAT/ledger compliance across international freight and financial technology platforms."* |
| **04** | **Can we speak with past clients or review an interactive walkthrough?** | *"Yes. During our initial consultation, we can demonstrate live architecture flows, anonymized production sandboxes, and connect qualified enterprise buyers with relevant client reference contacts."* |
| **05** | **What size project is best suited for Kozker?** | *"We excel at high-impact operational systems—whether that’s automating an end-to-end multi-carrier logistics pipeline or turning scattered company knowledge into an intelligent support system."* |

### 11.5 Partnership Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **How does the agency referral and revenue-share model work?** | *"We provide flexible partnership tiers—including recurring revenue share for warm client introductions, joint pitch support, and co-branded service packages tailored to agency retainers."* |
| **02** | **Can we white-label Kozker tools and systems under our own brand?** | *"Yes. Qualified agency partners can white-label our automated client portals, executive dashboards, and AI workflows under their own brand identity, domain, and styling."* |
| **03** | **What technical support does Kozker provide to partner organizations?** | *"We handle all underlying architecture, API connections, maintenance, and technical troubleshooting, letting your team focus on client relationships, strategy, and business growth."* |
| **04** | **What type of partner profiles see the highest success with Kozker?** | *"HR consultancies looking to offer automated candidate screening, fractional COOs seeking modern operational toolkits, and niche digital agencies wanting to offer enterprise AI without hiring expensive in-house ML teams."* |
| **05** | **How do we initiate a partnership and explore mutual opportunities?** | *"Reach out via the 'Become a Partner' button. We schedule a 30-minute alignment call to review your current client base, identify high-value integration opportunities, and establish partnership terms."* |

### 11.6 Contact Page FAQs
| # | Question | Answer |
| :---: | :--- | :--- |
| **01** | **How quickly does the Kozker team respond to inquiries?** | *"We respond to all inbound inquiries within 24 hours during standard business days (Mon-Fri, 9am-6pm IST). For urgent enterprise support requests, our team responds within 2 to 4 hours."* |
| **02** | **What happens after I send a message?** | *"A senior systems engineer reviews your operational requirements, challenges, and goals. We then schedule a focused 30-minute discovery call to map out a concrete architecture and high-impact timeline for your build."* |
| **03** | **Can we sign a mutual Non-Disclosure Agreement (NDA) first?** | *"Absolutely. We treat your proprietary operational workflows, internal data, and customer privacy with strict enterprise-grade confidentiality. We are happy to execute standard bilateral NDAs prior to in-depth technical discussions."* |
| **04** | **Do you work with international clients outside of India?** | *"Yes. While our headquarters is in Kochi, Kerala, India, Kozker engineers systems and delivers products for clients across North America, Europe, the Middle East, and Southeast Asia with flexible timezone alignment."* |
| **05** | **How does Kozker price custom projects and products?** | *"We provide predictable, milestone-based fixed pricing with transparent delivery deliverables. Every engagement includes clear timelines (typically 3 to 4 weeks to v1 live launch) and defined ROI metrics."* |

---

*Documentation compiled and verified for KozkerTech.*
