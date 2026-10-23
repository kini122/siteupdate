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
    title: "Kozker Tech | AI Systems Development & Custom AI Layer",
    description: "Kozker delivers custom AI solutions development, building an AI & analytics layer to augment existing software with AI and eliminate manual operational overhead.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "Augment existing software with AI",
      "AI for your existing software",
      "AI systems development",
      "custom AI solutions development",
      "Build AI-powered systems",
      "Custom AI layer",
      "AI & Analytics Layer",
      "AI automation",
      "intelligent systems for business",
      "Agentic-AI Systems For Your Existing Systems",
    ],
  },
  {
    id: "meta-services",
    path: "/services",
    title: "Services — AI Systems Development, Analytics Layer & Automation | Kozker",
    description: "Explore our AI systems development: build AI-powered systems, extend existing systems with AI, and deploy an AI integration layer with automated reporting.",
    ogImage: "/assets/4a80c6.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "AI systems development",
      "Build AI-powered systems",
      "Extend existing systems with AI",
      "AI integration layer",
      "Automated Reporting",
      "Custom AI layer",
      "custom AI solutions development",
      "AI automation",
    ],
  },
  {
    id: "meta-work",
    path: "/work",
    title: "Work & Case Studies — Custom AI Systems for Business | Kozker",
    description: "Explore documented client case studies showing how Kozker builds tailored AI systems for service companies and agentic-AI systems for your existing systems.",
    ogImage: "/assets/e467dd.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "Custom AI systems for business",
      "Tailored AI systems for service companies",
      "Agentic-AI Systems For Your Existing Systems",
      "Intelligent systems built around yours",
      "AI extension for business software",
      "Automated Reporting",
    ],
  },
  {
    id: "meta-products",
    path: "/products",
    title: "Products & Systems — Integrated AI Platform & Intelligent Tools | Kozker",
    description: "Discover our integrated AI platform and intelligent systems for business, engineered as an AI extension for business software and operational workflows.",
    ogImage: "/assets/e467dd.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    canonicalUrl: "https://siteupdate-opal.vercel.app/products",
    keywords: [
      "Integrated AI Platform",
      "intelligent systems for business",
      "AI extension for business software",
      "Build AI-powered systems",
      "AI automation",
    ],
  },
  {
    id: "meta-about",
    path: "/about",
    title: "About Kozker — AI Systems Development & Pragmatic Engineering",
    description: "Learn how Kozker engineers custom AI systems for business, providing an AI integration layer and intelligent systems built around yours.",
    ogImage: "/assets/642e0f.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "AI systems development",
      "Custom AI systems for business",
      "AI integration layer",
      "Intelligent systems built around yours",
      "Augment existing software with AI",
    ],
  },
  {
    id: "meta-partners",
    path: "/partners",
    title: "Partnerships — Tailored AI Systems for Service Companies | Kozker",
    description: "Partner with Kozker to deliver tailored AI systems for service companies, extend existing systems with AI, and provide a white-label custom AI layer.",
    ogImage: "/assets/d5b56b.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "Tailored AI systems for service companies",
      "Extend existing systems with AI",
      "Custom AI layer",
      "custom AI solutions development",
      "AI integration layer",
    ],
  },
  {
    id: "meta-contact",
    path: "/contact",
    title: "Contact Kozker — Augment Existing Software with AI",
    description: "Connect with our engineers to build AI-powered systems, deploy an AI & analytics layer, and develop custom AI solutions for your existing software.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
    noindex: false,
    keywords: [
      "Augment existing software with AI",
      "AI for your existing software",
      "Build AI-powered systems",
      "AI & Analytics Layer",
      "custom AI solutions development",
    ],
  },
]

export const DEFAULT_ANALYTICS_SETTINGS: SiteAnalyticsSettings = {
  measurementId: "",
  enabled: false,
  trackDevelopment: false,
  excludeAdmin: true,
  consentMode: "default_denied",
}
