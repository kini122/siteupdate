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
  keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure keywords column exists if migrating an existing table
ALTER TABLE public.page_metadata ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';

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
INSERT INTO public.page_metadata (id, path, title, description, og_image, og_type, twitter_card, noindex, keywords)
VALUES
  (
    'meta-home',
    '/',
    'Kozker Tech | AI Systems Development & Custom AI Layer',
    'Kozker delivers custom AI solutions development, building an AI & analytics layer to augment existing software with AI and eliminate manual operational overhead.',
    'https://kozker.com/assets/19d5f3.png',
    'website',
    'summary_large_image',
    false,
    ARRAY['Augment existing software with AI', 'AI for your existing software', 'AI systems development', 'custom AI solutions development', 'Build AI-powered systems', 'Custom AI layer', 'AI & Analytics Layer', 'AI automation', 'intelligent systems for business', 'Agentic-AI Systems For Your Existing Systems']
  ),
  (
    'meta-services',
    '/services',
    'Services — AI Systems Development, Analytics Layer & Automation | Kozker',
    'Explore our AI systems development: build AI-powered systems, extend existing systems with AI, and deploy an AI integration layer with automated reporting.',
    'https://kozker.com/assets/4a80c6.webp',
    'website',
    'summary_large_image',
    false,
    ARRAY['AI systems development', 'Build AI-powered systems', 'Extend existing systems with AI', 'AI integration layer', 'Automated Reporting', 'Custom AI layer', 'custom AI solutions development', 'AI automation']
  ),
  (
    'meta-work',
    '/work',
    'Work & Case Studies — Custom AI Systems for Business | Kozker',
    'Explore documented client case studies showing how Kozker builds tailored AI systems for service companies and agentic-AI systems for your existing systems.',
    'https://kozker.com/assets/e467dd.webp',
    'website',
    'summary_large_image',
    false,
    ARRAY['Custom AI systems for business', 'Tailored AI systems for service companies', 'Agentic-AI Systems For Your Existing Systems', 'Intelligent systems built around yours', 'AI extension for business software', 'Automated Reporting']
  ),
  (
    'meta-products',
    '/products',
    'Products & Systems — Integrated AI Platform & Intelligent Tools | Kozker',
    'Discover our integrated AI platform and intelligent systems for business, engineered as an AI extension for business software and operational workflows.',
    'https://kozker.com/assets/3132a8.webp',
    'website',
    'summary_large_image',
    false,
    ARRAY['Integrated AI Platform', 'intelligent systems for business', 'AI extension for business software', 'Build AI-powered systems', 'AI automation']
  ),
  (
    'meta-about',
    '/about',
    'About Kozker — AI Systems Development & Pragmatic Engineering',
    'Learn how Kozker engineers custom AI systems for business, providing an AI integration layer and intelligent systems built around yours.',
    'https://kozker.com/assets/642e0f.png',
    'website',
    'summary_large_image',
    false,
    ARRAY['AI systems development', 'Custom AI systems for business', 'AI integration layer', 'Intelligent systems built around yours', 'Augment existing software with AI']
  ),
  (
    'meta-partners',
    '/partners',
    'Partnerships — Tailored AI Systems for Service Companies | Kozker',
    'Partner with Kozker to deliver tailored AI systems for service companies, extend existing systems with AI, and provide a white-label custom AI layer.',
    'https://kozker.com/assets/d5b56b.webp',
    'website',
    'summary_large_image',
    false,
    ARRAY['Tailored AI systems for service companies', 'Extend existing systems with AI', 'Custom AI layer', 'custom AI solutions development', 'AI integration layer']
  ),
  (
    'meta-contact',
    '/contact',
    'Contact Kozker — Augment Existing Software with AI',
    'Connect with our engineers to build AI-powered systems, deploy an AI & analytics layer, and develop custom AI solutions for your existing software.',
    'https://kozker.com/assets/19d5f3.png',
    'website',
    'summary_large_image',
    false,
    ARRAY['Augment existing software with AI', 'AI for your existing software', 'Build AI-powered systems', 'AI & Analytics Layer', 'custom AI solutions development']
  )
ON CONFLICT (path) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  og_image = EXCLUDED.og_image,
  keywords = EXCLUDED.keywords,
  updated_at = NOW();

-- 7. Seed Default Analytics Setting (Disabled by default, ready for your Measurement ID)
INSERT INTO public.site_settings (key, value)
VALUES (
  'google_analytics',
  '{"measurementId": "", "enabled": false, "trackDevelopment": false, "excludeAdmin": true, "consentMode": "default_denied"}'::jsonb
)
ON CONFLICT (key) DO NOTHING;
