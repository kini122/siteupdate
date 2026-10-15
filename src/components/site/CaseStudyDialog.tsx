import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2, Clock, Quote } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CaseStudy } from "@/types/site"

interface CaseStudyDialogProps {
  study: CaseStudy | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CaseStudyDialog({
  study,
  open,
  onOpenChange,
}: CaseStudyDialogProps) {
  if (!study) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="case-study-dialog">
        {/* Visual Banner Media */}
        <div className="case-modal-media-wrap image-frame">
          <img
            src={study.image}
            alt={`${study.client} case study banner`}
            className="case-modal-banner-img"
          />
        </div>

        {/* Modal Header */}
        <DialogHeader className="case-modal-header text-left">
          <div className="case-modal-badge-row">
            <span className="eyebrow eyebrow--mono case-modal-eyebrow">
              {study.category}
            </span>
            {study.timeline && (
              <span className="case-modal-tag-pill">
                <Clock className="h-3 w-3 text-[#FF6E30]" aria-hidden="true" />
                <span>{study.timeline}</span>
              </span>
            )}
          </div>
          <DialogTitle className="case-modal-title">
            {study.title}
          </DialogTitle>
          <DialogDescription className="case-modal-headline">
            {study.client} {study.industry ? `• ${study.industry}` : ""}
          </DialogDescription>
        </DialogHeader>

        {/* Key Metrics / Outcomes Grid */}
        {study.stats && study.stats.length > 0 && (
          <div className="case-modal-stats-grid">
            {study.stats.map((stat) => (
              <div key={stat.label} className="case-modal-stat-card">
                <span className="case-modal-stat-value">{stat.value}</span>
                <span className="case-modal-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Overview */}
        {study.overview && (
          <div className="case-modal-section">
            <h4 className="case-modal-section-title">Case Overview</h4>
            <p className="case-modal-body-text">{study.overview}</p>
          </div>
        )}

        {/* The Challenge */}
        {study.challenge && (
          <div className="case-modal-section">
            <h4 className="case-modal-section-title">The Challenge &amp; Problem</h4>
            <p className="case-modal-body-text">{study.challenge}</p>
          </div>
        )}

        {/* The Kozker Solution */}
        {study.solution && (
          <div className="case-modal-section">
            <h4 className="case-modal-section-title">The Kozker Solution &amp; Architecture</h4>
            <p className="case-modal-body-text">{study.solution}</p>
          </div>
        )}

        {/* Technologies & Stack Pills */}
        {study.techStack && study.techStack.length > 0 && (
          <div className="case-modal-section">
            <h4 className="case-modal-section-title">Technologies &amp; Integrations</h4>
            <div className="case-modal-stack-tags">
              {study.techStack.map((tech) => (
                <span key={tech} className="case-modal-stack-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Deliverables & Scope (Matching PartnerModelDialog) */}
        {study.deliverables && study.deliverables.length > 0 && (
          <div className="case-modal-section">
            <h4 className="case-modal-section-title">Key Capabilities &amp; Deliverables</h4>
            <div className="case-modal-capabilities-grid">
              {study.deliverables.map((item) => (
                <div key={item.title} className="case-modal-cap-item">
                  <div className="case-modal-cap-icon-wrap">
                    <CheckCircle2 className="h-4 w-4 text-[#FF6E30] shrink-0 mt-0.5" />
                  </div>
                  <div className="case-modal-cap-content">
                    <strong className="case-modal-cap-title">{item.title}</strong>
                    <span className="case-modal-cap-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial Quote */}
        {study.quote && (
          <div className="case-modal-quote-box">
            <Quote className="h-5 w-5 text-[#FF6E30] fill-[#FF6E30] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="case-modal-quote-content">
              <p className="case-modal-quote-text">{study.quote.text}</p>
              <cite className="case-modal-quote-author">{study.quote.author}</cite>
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="case-modal-actions">
          <Link
            to={study.ctaHref || "/contact"}
            search={{
              subject: study.prefilledSubject || `Inquiry regarding ${study.client} case study`,
              message:
                study.prefilledMessage ||
                `Hi Kozker, I was reviewing your ${study.client} case study (${study.title}) and would like to explore similar solutions for our company.`,
            }}
            onClick={() => onOpenChange(false)}
            className="case-modal-enquire-btn"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="case-modal-close-btn"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
