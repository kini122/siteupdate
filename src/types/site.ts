export type SiteRoute = "/" | "/services" | "/products" | "/work" | "/about" | "/partners" | "/contact"

export type ServiceTab = "Data & BI" | "AI Assistants" | "Automation"

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ProductItem {
  id: string
  title: string
  image: string
  description: string
  bullets: string[]
  category: string
  demoUrl?: string
  exploreUrl?: string
  detailsUrl?: string
}

export interface CaseStudyCapability {
  title: string
  desc: string
}

export interface CaseStudy {
  id: string
  slug?: string
  client: string
  category: string
  title: string
  image: string
  description: string
  stats?: Array<{ value: string; label: string }>
  quote?: {
    text: string
    author: string
  }
  ctaText?: string
  ctaHref?: string
  branchKey?: "data-bi" | "ai-assistants" | "automation"
  industry?: string
  timeline?: string
  overview?: string
  challenge?: string
  solution?: string
  deliverables?: CaseStudyCapability[]
  techStack?: string[]
  prefilledSubject?: string
  prefilledMessage?: string
  sortOrder?: number
  isPublished?: boolean
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  image: string
}

export interface FeatureCardData {
  id: string
  title: string
  description: string
  icon: string
}

export interface SolutionComparison {
  from: string
  to: string
  copy: string
}

export interface SolutionPanel {
  id: ServiceTab
  label: string
  title: string
  lead: string
  copy: string
  builds: string[]
  heroImage: string
  stackIcons: string[]
  comparisons: SolutionComparison[]
  actionLabel: string
}
