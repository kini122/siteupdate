import { useState } from "react"
import { Link } from "@tanstack/react-router"
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Globe,
  Layers,
  Lock,
  Maximize2,
  Minimize2,
  Quote,
  Sparkles,
} from "lucide-react"

import type { CaseStudy } from "@/types/site"

interface CaseStudyPagePreviewProps {
  study: CaseStudy
  viewMode?: "split" | "full"
  onToggleViewMode?: () => void
}

export function CaseStudyPagePreview({
  study,
  viewMode = "split",
  onToggleViewMode,
}: CaseStudyPagePreviewProps) {
  const [copied, setCopied] = useState(false)
  const slugPath = `/case-studies/${study.slug || study.id}`
  const fullUrl = `https://kozker.com${slugPath}`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const branchTitle =
    study.branchKey === "data-bi"
      ? "Data Analytics & BI"
      : study.branchKey === "ai-assistants"
      ? "AI Assistants & Copilots"
      : study.branchKey === "automation"
      ? "Workflow Automation"
      : study.category || "Consulting Practice"

  return (
    <div className="admin-slug-preview-window">
      {/* Browser Window Chrome Topbar */}
      <div className="admin-browser-chrome">
        <div className="admin-browser-dots" aria-hidden="true">
          <span className="browser-dot browser-dot--red" />
          <span className="browser-dot browser-dot--yellow" />
          <span className="browser-dot browser-dot--green" />
        </div>

        {/* Address Bar */}
        <div className="admin-browser-address-bar">
          <Lock className="h-3 w-3 text-emerald-600 shrink-0" aria-hidden="true" />
          <span className="admin-browser-protocol">https://</span>
          <span className="admin-browser-host">kozker.com</span>
          <span className="admin-browser-slug">/case-studies/{study.slug || study.id || "preview"}</span>
        </div>

        {/* Quick Actions */}
        <div className="admin-browser-actions">
          <button
            type="button"
            onClick={handleCopy}
            className="admin-browser-btn"
            title="Copy Public Slug URL"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span className="admin-browser-btn-text">{copied ? "Copied" : "Copy"}</span>
          </button>

          <Link
            to="/case-studies/$slug"
            params={{ slug: study.slug || study.id }}
            target="_blank"
            className="admin-browser-btn admin-browser-btn--primary"
            title="Open Live Slug Page in New Tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="admin-browser-btn-text">Open Live</span>
          </Link>

          {onToggleViewMode && (
            <button
              type="button"
              onClick={onToggleViewMode}
              className="admin-browser-btn"
              title={viewMode === "split" ? "Expand Full Screen Preview" : "Collapse to Split View"}
            >
              {viewMode === "split" ? (
                <Maximize2 className="h-3.5 w-3.5" />
              ) : (
                <Minimize2 className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar: Status Pill */}
      <div className="admin-slug-preview-subbar">
        <div className="flex items-center gap-1.5">
          <span className="admin-pulse-dot" />
          <span className="text-xs font-semibold text-[#1C1A17]">Actual Slug Page Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#8D8980]">Updates live as you type in CMS</span>
          <span className="admin-preview-pill">
            <Globe className="h-3 w-3 text-[#FF6E30]" />
            <span>Dedicated Slug Page</span>
          </span>
        </div>
      </div>

      {/* Scrollable Viewport Canvas: The Actual Case Study Slug Page */}
      <div className="admin-slug-preview-canvas">
        {/* Hero Header Section */}
        <section className="admin-slug-hero">
          <div className="admin-slug-badge-row">
            <span className="admin-slug-eyebrow">
              {study.category || "CASE STUDY"}
            </span>
            {study.timeline && (
              <span className="admin-slug-timeline-plain flex items-center gap-1.5 text-xs text-[#55504A] font-medium">
                <Clock className="h-3 w-3 text-[#FF6E30]" />
                <span>{study.timeline}</span>
              </span>
            )}
          </div>

          <h1 className="admin-slug-title">
            {study.title || "Case Study Headline Title"}
          </h1>

          <p className="admin-slug-lead">
            {study.description ||
              study.overview ||
              "Brief executive overview outlining the problem solved and core operational outcomes."}
          </p>

          <div className="admin-slug-meta-strip">
            <div className="admin-meta-cell">
              <span className="admin-meta-lbl">Client</span>
              <strong className="admin-meta-val">{study.client || "Client Organization"}</strong>
            </div>
            {study.industry && (
              <div className="admin-meta-cell">
                <span className="admin-meta-lbl">Industry</span>
                <strong className="admin-meta-val">{study.industry}</strong>
              </div>
            )}
            <div className="admin-meta-cell">
              <span className="admin-meta-lbl">Practice Area</span>
              <strong className="admin-meta-val">{branchTitle}</strong>
            </div>
          </div>
        </section>

        {/* Banner Imagery Section */}
        <div className="admin-slug-banner-box">
          {study.image ? (
            <img
              src={study.image}
              alt={`${study.client} banner preview`}
              className="admin-slug-banner-img"
            />
          ) : (
            <div className="admin-slug-banner-empty">
              <span>No banner image uploaded. Add an image in the editor.</span>
            </div>
          )}
          <span className="admin-slug-banner-pill">
            <Sparkles className="h-3 w-3 text-[#FF6E30]" />
            <span>Hero Banner Media</span>
          </span>
        </div>

        {/* Key Metrics / Outcomes Section */}
        {study.stats && study.stats.length > 0 && (
          <section className="admin-slug-metrics-section">
            <h4 className="admin-slug-subheading">Key Measurable Outcomes</h4>
            <div className="admin-slug-metrics-grid">
              {study.stats.map((stat, idx) => (
                <div key={idx} className="admin-slug-metric-card">
                  <span className="admin-slug-metric-val">{stat.value || "—"}</span>
                  <span className="admin-slug-metric-lbl">{stat.label || "Outcome metric"}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2-Column Split: Deep Dive Story (Left) & Sidebar (Right) */}
        <div className="admin-slug-content-grid">
          {/* Main Article Body */}
          <div className="admin-slug-article">
            {/* Overview Section */}
            {study.overview && (
              <div className="admin-slug-block">
                <h3 className="admin-slug-block-title">Overview</h3>
                <p className="admin-slug-prose">{study.overview}</p>
              </div>
            )}

            {/* The Challenge Section */}
            {study.challenge && (
              <div className="admin-slug-block">
                <h3 className="admin-slug-block-title">The Challenge &amp; Problem</h3>
                <p className="admin-slug-prose">{study.challenge}</p>
              </div>
            )}

            {/* The Solution Section */}
            {study.solution && (
              <div className="admin-slug-block">
                <h3 className="admin-slug-block-title">The Kozker Solution &amp; Technical Architecture</h3>
                <p className="admin-slug-prose">{study.solution}</p>
              </div>
            )}

            {/* Key Deliverables & Scope */}
            {study.deliverables && study.deliverables.length > 0 && (
              <div className="admin-slug-block">
                <h3 className="admin-slug-block-title">Key Capabilities &amp; Deliverables</h3>
                <div className="admin-slug-deliv-grid">
                  {study.deliverables.map((item, idx) => (
                    <div key={idx} className="admin-slug-deliv-card">
                      <CheckCircle2 className="h-4 w-4 text-[#FF6E30] shrink-0 mt-0.5" />
                      <div>
                        <strong className="admin-slug-deliv-title">{item.title}</strong>
                        <p className="admin-slug-deliv-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial Quote */}
            {study.quote && study.quote.text && (
              <div className="admin-slug-quote-box">
                <Quote className="h-6 w-6 text-[#FF6E30] fill-[#FF6E30] opacity-80 shrink-0" />
                <div>
                  <p className="admin-slug-quote-text">&ldquo;{study.quote.text}&rdquo;</p>
                  <cite className="admin-slug-quote-author">{study.quote.author}</cite>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="admin-slug-sidebar">
            <div className="admin-slug-sidebar-card">
              <h4 className="admin-slug-sidebar-title">Project Details</h4>

              <div className="admin-slug-detail-list">
                <div className="admin-slug-detail-item">
                  <span className="detail-lbl">Client</span>
                  <strong className="detail-val">{study.client || "—"}</strong>
                </div>
                {study.industry && (
                  <div className="admin-slug-detail-item">
                    <span className="detail-lbl">Industry</span>
                    <strong className="detail-val">{study.industry}</strong>
                  </div>
                )}
                {study.timeline && (
                  <div className="admin-slug-detail-item">
                    <span className="detail-lbl">Timeline</span>
                    <strong className="detail-val">{study.timeline}</strong>
                  </div>
                )}
                <div className="admin-slug-detail-item">
                  <span className="detail-lbl">Practice Area</span>
                  <strong className="detail-val">{branchTitle}</strong>
                </div>
              </div>

              {/* Tech Stack */}
              {study.techStack && study.techStack.length > 0 && (
                <div className="admin-slug-tech-block">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Layers className="h-3.5 w-3.5 text-[#FF6E30]" />
                    <span className="text-xs font-semibold text-[#1C1A17]">Technologies &amp; Tools</span>
                  </div>
                  <div className="admin-slug-tech-tags">
                    {study.techStack.map((tech) => (
                      <span key={tech} className="admin-slug-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button Block */}
              <div className="admin-slug-cta-block">
                <div className="admin-slug-cta-btn">
                  <span>{study.ctaText || "Start a Conversation"}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <span className="admin-slug-cta-hint">Direct client conversion action</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer info banner */}
        <div className="admin-slug-preview-footer">
          <span>Viewing live preview of: /case-studies/{study.slug || study.id}</span>
        </div>
      </div>
    </div>
  )
}
