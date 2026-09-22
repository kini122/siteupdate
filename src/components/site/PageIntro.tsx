import type { ReactNode } from "react"

interface PageIntroProps {
  eyebrow?: string
  title: ReactNode
  description: string
  compact?: boolean
}

export function PageIntro({ eyebrow, title, description, compact = true }: PageIntroProps) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`}>
      <div className="site-container">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="display-title">{title}</h1>
        <p className="hero-copy">{description}</p>
      </div>
    </section>
  )
}
