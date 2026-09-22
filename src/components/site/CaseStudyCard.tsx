import { motion } from "motion/react"

import type { CaseStudy } from "@/types/site"

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export function CaseStudyCard({ study, compact = false }: CaseStudyCardProps) {
  return (
    <motion.article className={`case-study-card ${compact ? "case-study-card--compact" : ""}`} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <div className="case-study-image image-frame">
        <img src={study.image} alt={`${study.client} case study`} />
      </div>
      <div className="case-study-copy">
        <h3>{study.client}</h3>
        <span className="category">{study.category}</span>
        <p>{study.description}</p>
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
