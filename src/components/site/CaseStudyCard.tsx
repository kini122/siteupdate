import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { ArrowRight, Quote } from "lucide-react"

import type { CaseStudy } from "@/types/site"

interface CaseStudyCardProps {
  study: CaseStudy
  compact?: boolean
}

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  const slugParam = study.slug || study.id

  // Cleanly split base route path and query parameters from ctaHref
  const rawHref = study.ctaHref || "/contact"
  const [baseRoute, queryPart] = rawHref.split("?")
  const contactSearchParams: Record<string, string> = {}

  if (queryPart) {
    const parsed = new URLSearchParams(queryPart)
    parsed.forEach((val, key) => {
      contactSearchParams[key] = val
    })
  }

  if (study.prefilledSubject) {
    contactSearchParams.subject = study.prefilledSubject
  } else {
    contactSearchParams.subject = `Inquiry regarding ${study.client} case study`
  }

  if (study.prefilledMessage) {
    contactSearchParams.message = study.prefilledMessage
  } else {
    contactSearchParams.message = `Hi Kozker, I was reviewing your ${study.client} case study (${study.title}) and would like to explore similar solutions for our company.`
  }

  const ctaLabel = study.ctaText || "Start a Conversation"

  return (
    <motion.article
      className="case-study-card-figma"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {/* Top Image (Rectangle 113) - Direct link to dedicated slug page */}
      <Link
        to="/case-studies/$slug"
        params={{ slug: slugParam }}
        className="case-card-img-wrap"
        aria-label={`Read ${study.client} case study`}
      >
        <img
          src={
            study.image.includes("images.unsplash.com")
              ? study.image.replace(/w=\d+/, "w=640")
              : study.image
          }
          srcSet={
            study.image.includes("images.unsplash.com")
              ? `${study.image.replace(/w=\d+/, "w=380")} 380w, ${study.image.replace(/w=\d+/, "w=640")} 640w, ${study.image.replace(/w=\d+/, "w=1000")} 1000w`
              : undefined
          }
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 540px"
          alt={`${study.client} case study`}
          className="case-card-img"
          loading="lazy"
          width={540}
          height={320}
        />
      </Link>

      {/* Main Content (Frame 110) */}
      <div className="case-card-body">
        {/* Client & Category Meta (Frame 54) */}
        <div className="case-card-meta">
          <span className="case-card-client">{study.client}</span>
          <span className="case-card-category">{study.category}</span>
        </div>

        {/* Head Title - Clickable Crawlable Link for Search Engines */}
        <h3 className="case-card-heading">
          <Link
            to="/case-studies/$slug"
            params={{ slug: slugParam }}
            className="case-card-heading-link"
            title={`Read full case study: ${study.title}`}
          >
            {study.title}
          </Link>
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

        {/* Bottom Actions Row: Direct Read Case Study Button + Customized Action Button */}
        <div className="case-card-cta-wrap">
          <Link
            to="/case-studies/$slug"
            params={{ slug: slugParam }}
            className="case-card-read-more-btn"
            aria-label={`Read Story: ${study.client}`}
          >
            <span>Read Story</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            to={baseRoute || "/contact"}
            search={contactSearchParams}
            className="case-card-cta-btn"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
