import { motion } from "motion/react"

import type { CaseStudy } from "@/types/site"

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export function CaseStudyCard({ study, compact = false }: CaseStudyCardProps) {
  return (
    <motion.article
      className={`case-study-card ${compact ? "case-study-card--compact" : ""}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="case-study-image image-frame">
        <img src={study.image} alt={`${study.client} case study`} />
      </div>
      <div className="case-study-copy">
        <div className="case-study-header-meta">
          <span className="case-study-client-name">{study.client}</span>
          <span className="case-study-category-badge">{study.category}</span>
        </div>
        <h3 className="case-study-heading">{study.title}</h3>
        <p className="case-study-desc">{study.description}</p>

        <div className="case-study-tag-container">
          <span className="case-study-accent-tag">description</span>
        </div>

        {study.stats && (
          <div className="case-study-stats">
            {study.stats.map((stat) => (
              <div key={stat.label} className="case-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        <div className="case-study-quote">
          <img src="/assets/67acaf.svg" alt="" aria-hidden="true" />
          <span>The AI chatbot and WhatsApp automation transformed our customer experience. Sales have never been better.</span>
          <cite>— Priya Sharma, Founder, TechGadgets Pro</cite>
        </div>
      </div>
    </motion.article>
  )
}
