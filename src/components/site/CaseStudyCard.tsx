import { motion } from "motion/react"
import { ArrowRight, Quote } from "lucide-react"

import type { CaseStudy } from "@/types/site"

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <motion.article
      className="case-study-card-figma"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Top Image (Rectangle 113) */}
      <div className="case-card-img-wrap">
        <img
          src={study.image}
          alt={`${study.client} case study`}
          className="case-card-img"
          loading="lazy"
        />
      </div>

      {/* Main Content (Frame 110) */}
      <div className="case-card-body">
        {/* Client & Category Meta (Frame 54) */}
        <div className="case-card-meta">
          <span className="case-card-client">{study.client}</span>
          <span className="case-card-category">{study.category}</span>
        </div>

        {/* Head Title */}
        <h3 className="case-card-heading">{study.title}</h3>

        {/* Stats Row (Frame 77) */}
        {study.stats && study.stats.length > 0 && (
          <div className="case-card-stats-row">
            {study.stats.map((stat) => (
              <div key={stat.label} className="case-card-stat-box">
                <span className="case-card-stat-val">{stat.value}</span>
                <span className="case-card-stat-lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Testimonial Quote Box (Frame 109) */}
        {study.quote && (
          <div className="case-card-quote-box">
            <Quote className="h-5 w-5 text-[#FF6E30] shrink-0 fill-[#FF6E30]" aria-hidden="true" />
            <p className="case-card-quote-text">{study.quote.text}</p>
            <cite className="case-card-quote-author">{study.quote.author}</cite>
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="case-card-cta-wrap">
          <a href={study.ctaHref || "#contact"} className="case-card-cta-btn">
            <span>{study.ctaText || "Start a Conversation"}</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
