import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { ArrowRight, Quote } from "lucide-react"

import { CaseStudyDialog } from "@/components/site/CaseStudyDialog"
import type { CaseStudy } from "@/types/site"

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <motion.article
        className="case-study-card-figma"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {/* Top Image (Rectangle 113) - click opens dialog */}
        <div
          className="case-card-img-wrap"
          onClick={() => setDialogOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setDialogOpen(true)
            }
          }}
          aria-label={`View ${study.client} case study details`}
        >
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

          {/* Head Title - click opens dialog */}
          <h3
            className="case-card-heading case-card-heading--clickable"
            onClick={() => setDialogOpen(true)}
          >
            {study.title}
          </h3>

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

          {/* Bottom Actions Row: Read More + Start a Conversation */}
          <div className="case-card-cta-wrap">
            <button
              type="button"
              onClick={() => setDialogOpen(true)}
              className="case-card-read-more-btn"
              aria-label={`Read full case study for ${study.client}`}
            >
              <span>Read More</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <Link
              to={study.ctaHref || "/contact"}
              search={{
                subject: study.prefilledSubject || `Inquiry regarding ${study.client} case study`,
                message:
                  study.prefilledMessage ||
                  `Hi Kozker, I was reviewing your ${study.client} case study (${study.title}) and would like to explore similar solutions for our company.`,
              }}
              className="case-card-cta-btn"
            >
              <span>{study.ctaText || "Start a Conversation"}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </motion.article>

      {/* Pop-up Case Study Modal (Homogeneous with PartnerModelDialog) */}
      <CaseStudyDialog
        study={study}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}
