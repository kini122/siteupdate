-- ==============================================================================
-- KOZKER CUSTOM CMS: PAGE METADATA & SITE SETTINGS SCHEMA
-- Run this in your Supabase project's SQL Editor (Dashboard > SQL Editor > New query)
-- ==============================================================================

-- 1. Create page_metadata Table
CREATE TABLE IF NOT EXISTS public.page_metadata (
  id TEXT PRIMARY KEY,
  path TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  og_image TEXT,
  og_type TEXT DEFAULT 'website',
  twitter_card TEXT DEFAULT 'summary_large_image',
  noindex BOOLEAN DEFAULT false,
  canonical_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create site_settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.page_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. Public Read Policies (Allows fast, unauthenticated frontend reads)
CREATE POLICY "Public read access for page_metadata"
  ON public.page_metadata
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for site_settings"
  ON public.site_settings
  FOR SELECT
  TO public
  USING (true);

-- 5. Authenticated Admin Write Policies
CREATE POLICY "Admin write access for page_metadata"
  ON public.page_metadata
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin write access for site_settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Seed Default Core Page Metadata
INSERT INTO public.page_metadata (id, path, title, description, og_image, og_type, twitter_card, noindex)
VALUES
  ('meta-home', '/', 'Kozker Tech | Data, AI & Automation', 'Kozker engineers custom data intelligence pipelines, private AI assistants, and workflow automations that help modern businesses eliminate busywork and make confident decisions.', 'https://kozker.com/assets/19d5f3.png', 'website', 'summary_large_image', false),
  ('meta-services', '/services', 'Services — Data Analytics, AI Assistants & Automation | Kozker', 'Explore Kozker''s engineering services: unified financial & operational BI, custom private AI copilots, and end-to-end webhook workflow automation.', 'https://kozker.com/assets/4a80c6.webp', 'website', 'summary_large_image', false),
  ('meta-work', '/work', 'Work & Case Studies — Proven ROI & Automation | Kozker', 'Explore documented client case studies showing how Kozker built custom BI dashboards, AI copilots, and workflow automations that delivered up to 75% faster reporting and 3.2x ROI.', 'https://kozker.com/assets/e467dd.webp', 'website', 'summary_large_image', false),
  ('meta-products', '/products', 'Products & Systems — AI Tools & Platforms | Kozker', 'Discover specialized software products engineered by Kozker, including AI recruitment platforms, automated workflow agents, and business analytics suites.', 'https://kozker.com/assets/3132a8.webp', 'website', 'summary_large_image', false),
  ('meta-about', '/about', 'About Kozker — Systems, Speed & Pragmatic AI', 'Learn how Kozker partners with ambitious companies to design, build, and deploy reliable data intelligence pipelines, AI copilots, and workflow automations.', 'https://kozker.com/assets/642e0f.png', 'website', 'summary_large_image', false),
  ('meta-partners', '/partners', 'Partnerships & Advisory — Kozker Tech Network', 'Partner with Kozker to scale your tech operations, implement enterprise-grade AI copilots, and build resilient data pipelines.', 'https://kozker.com/assets/d5b56b.webp', 'website', 'summary_large_image', false),
  ('meta-contact', '/contact', 'Contact Kozker — Start Your Project', 'Get in touch with Kozker engineers to discuss custom BI dashboards, private AI assistants, and end-to-end automation systems.', 'https://kozker.com/assets/19d5f3.png', 'website', 'summary_large_image', false)
ON CONFLICT (path) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  og_image = EXCLUDED.og_image,
  updated_at = NOW();

-- 7. Seed Default Analytics Setting (Disabled by default, ready for your Measurement ID)
INSERT INTO public.site_settings (key, value)
VALUES (
  'google_analytics',
  '{"measurementId": "", "enabled": false, "trackDevelopment": false, "excludeAdmin": true, "consentMode": "default_denied"}'::jsonb
)
ON CONFLICT (key) DO NOTHING;
