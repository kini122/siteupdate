export type SiteRoute = "/" | "/services" | "/products" | "/work" | "/about" | "/partners"

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
}

export interface CaseStudy {
  id: string
  client: string
  category: string
  title: string
  image: string
  description: string
  stats?: Array<{ value: string; label: string }>
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
