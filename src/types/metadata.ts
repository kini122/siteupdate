export interface PageMetadata {
  id: string
  path: string // e.g. "/", "/services", "/work", "/products", "/about", "/partners", "/contact"
  title: string
  description: string
  ogImage: string // Internal image path (e.g. "/assets/og-preview.jpg") or full external URL
  ogType: "website" | "article" | "profile"
  twitterCard: "summary_large_image" | "summary"
  noindex?: boolean
  canonicalUrl?: string
  keywords?: string[]
  updatedAt?: string
}

export interface SiteGeneralSettings {
  siteUrl: string // e.g. "https://siteupdate-opal.vercel.app" (editable in CMS, can be changed later to "https://kozker.com")
  siteName: string // e.g. "Kozker"
  defaultOgImage: string // e.g. "/assets/og-preview.jpg"
  updatedAt?: string
}

export interface SiteAnalyticsSettings {
  measurementId: string // e.g. "G-XXXXXXXXXX" or "GTM-XXXXXXX"
  enabled: boolean
  trackDevelopment: boolean // false to exclude localhost / 127.0.0.1
  excludeAdmin: boolean // true to exclude logged-in admin / editor traffic
  consentMode: "default_denied" | "default_granted" | "disabled"
  updatedAt?: string
}

export const DEFAULT_SITE_SETTINGS: SiteGeneralSettings = {
  siteUrl: "https://siteupdate-opal.vercel.app",
  siteName: "Kozker",
  defaultOgImage: "/assets/og-preview.jpg",
}

export const DEFAULT_PAGE_METADATA: PageMetadata[] = [
  {
    id: "meta-home",
    path: "/",
    title: "Kozker Tech | Data, AI & Automation",
    description: "Kozker engineers custom data intelligence pipelines, private AI assistants, and workflow automations that help modern businesses eliminate busywork and make confident decisions.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
  {
    id: "meta-services",
    path: "/services",
    title: "Services — Data Analytics, AI Assistants & Automation | Kozker",
    description: "Explore Kozker's engineering services: unified financial & operational BI, custom private AI copilots, and end-to-end webhook workflow automation.",
    ogImage: "/assets/4a80c6.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
  {
    id: "meta-work",
    path: "/work",
    title: "Work & Case Studies — Proven ROI & Automation | Kozker",
    description: "Explore documented client case studies showing how Kozker built custom BI dashboards, AI copilots, and workflow automations that delivered up to 75% faster reporting and 3.2x ROI.",
    ogImage: "/assets/e467dd.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
  {
    id: "meta-products",
    path: "/products",
    title: "Products & Systems — AI Tools & Platforms | Kozker tech..",
    description: "Discover specialized software products engineered by Kozker, including AI recruitment platforms, automated workflow agents, and business analytics suites.",
    ogImage: "/assets/e467dd.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    canonicalUrl: "https://siteupdate-opal.vercel.app/products",
  },
  {
    id: "meta-about",
    path: "/about",
    title: "About Kozker — Systems, Speed & Pragmatic AI",
    description: "Learn how Kozker partners with ambitious companies to design, build, and deploy reliable data intelligence pipelines, AI copilots, and workflow automations.",
    ogImage: "/assets/642e0f.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
  {
    id: "meta-partners",
    path: "/partners",
    title: "Partnerships & Advisory — Kozker Tech Network",
    description: "Partner with Kozker to scale your tech operations, implement enterprise-grade AI copilots, and build resilient data pipelines.",
    ogImage: "/assets/d5b56b.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
  {
    id: "meta-contact",
    path: "/contact",
    title: "Contact Kozker — Start Your Project",
    description: "Get in touch with Kozker engineers to discuss custom BI dashboards, private AI assistants, and end-to-end automation systems.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
  },
]

export const DEFAULT_ANALYTICS_SETTINGS: SiteAnalyticsSettings = {
  measurementId: "",
  enabled: false,
  trackDevelopment: false,
  excludeAdmin: true,
  consentMode: "default_denied",
}
