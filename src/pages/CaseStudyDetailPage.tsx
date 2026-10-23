import { useMemo } from "react"
import { Link, useParams } from "@tanstack/react-router"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Quote,
} from "lucide-react"

import { SeoHead } from "@/components/seo/SeoHead"
import { SiteFooter } from "@/components/site/SiteFooter"
import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { useCaseStudies, useCaseStudyBySlug } from "@/hooks/useCaseStudies"

export function CaseStudyDetailPage() {
  const params = useParams({ strict: false }) as { slug?: string }
  const slug = params.slug || ""

  const { study, loading, error } = useCaseStudyBySlug(slug)
  const { caseStudies } = useCaseStudies()

  // Suggest other related case studies
  const relatedStudies = useMemo(() => {
    if (!study) return []
    return caseStudies
      .filter((s) => s.id !== study.id && s.slug !== study.slug)
      .slice(0, 2)
  }, [study, caseStudies])

  if (loading && !study) {
    return (
      <div className="case-detail-loading-wrap">
        <div className="admin-spinner" />
        <p>Loading case study...</p>
      </div>
    )
  }

  if (!study || error) {
    return (
      <div className="case-detail-not-found">
        <SeoHead
          title="Case Study Not Found | Kozker"
          description="The requested case study could not be found."
          canonicalPath="/case-studies"
          noindex={true}
        />
        <div className="case-detail-not-found-card">
          <span className="eyebrow eyebrow--mono">404</span>
          <h1 className="case-detail-not-found-title">Case Study Not Found</h1>
          <p className="case-detail-not-found-text">
            We couldn't find a case study matching &ldquo;{slug}&rdquo;. It may have been renamed or archived.
          </p>
          <div className="case-detail-not-found-actions">
            <Link to="/work" className="case-detail-btn-primary">
              <ArrowLeft className="h-4 w-4" />
              <span>Browse All Case Studies</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const publicImageUrl = study.image.startsWith("http")
    ? study.image
    : `https://kozker.com${study.image}`

  const canonicalUrlPath = `/case-studies/${study.slug || slug}`

  const effectiveKeywords =
    study.keywords && study.keywords.length > 0
      ? study.keywords
      : [
          "Augment existing software with AI",
          "AI for your existing software",
          "AI systems development",
          "custom AI solutions development",
          "Build AI-powered systems",
          "Custom AI layer",
          "AI & Analytics Layer",
          "AI automation",
          "intelligent systems for business",
          "Extend existing systems with AI",
          "Tailored AI systems for service companies",
          "Custom AI systems for business",
          "AI extension for business software",
          "AI integration layer",
          "Intelligent systems built around yours",
          "Automated Reporting",
          "Integrated AI Platform",
          "Agentic-AI Systems For Your Existing Systems",
        ]

  // CreativeWork & Article Schema JSON-LD
  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: study.seoTitle || study.title,
      name: `${study.client} Case Study: ${study.title}`,
      description: study.seoDescription || study.description || study.overview || "",
      keywords: effectiveKeywords.join(", "),
      image: [publicImageUrl],
      author: {
        "@type": "Organization",
        name: "Kozker",
        url: "https://kozker.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Kozker",
        url: "https://kozker.com",
        logo: {
          "@type": "ImageObject",
          url: "https://kozker.com/assets/19d5f3.png",
        },
      },
      about: study.industry || study.category,
      mainEntityOfPage: `https://kozker.com${canonicalUrlPath}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://kozker.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work & Case Studies",
          item: "https://kozker.com/work",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: study.client,
          item: `https://kozker.com${canonicalUrlPath}`,
        },
      ],
    },
  ]

  return (
    <div className="case-detail-page-root">
      {/* Dynamic SEO Meta & Self-Referencing Canonical */}
      <SeoHead
        title={study.seoTitle ? `${study.seoTitle} | Kozker` : `${study.title} | Kozker`}
        description={
          study.seoDescription ||
          study.description ||
          `Read how Kozker partnered with ${study.client} to build ${study.title}, delivering measurable operational ROI.`
        }
        canonicalPath={canonicalUrlPath}
        ogType="article"
        ogImage={publicImageUrl}
        keywords={effectiveKeywords}
        jsonLd={jsonLdData}
      />

      {/* Hero Header Section */}
      <header className="case-detail-hero">
        <div className="site-container">
          <div className="case-detail-hero-content">
            <div className="case-detail-badge-row">
              <span className="eyebrow eyebrow--mono case-detail-eyebrow">
                {study.category}
              </span>
              {study.timeline && (
                <span className="case-detail-timeline-plain">
                  <Clock className="h-3.5 w-3.5 text-[#FF6E30]" aria-hidden="true" />
                  <span>{study.timeline}</span>
                </span>
              )}
            </div>

            <h1 className="case-detail-title">{study.title}</h1>

            <p className="case-detail-lead-desc">
              {study.description ||
                `How Kozker engineered a scalable data and automation system for ${study.client}.`}
            </p>

            <div className="case-detail-meta-strip">
              <div className="meta-strip-item">
                <span className="meta-strip-label">Client</span>
                <strong className="meta-strip-value">{study.client}</strong>
              </div>
              {study.industry && (
                <div className="meta-strip-item">
                  <span className="meta-strip-label">Industry</span>
                  <strong className="meta-strip-value">{study.industry}</strong>
                </div>
              )}
              {study.timeline && (
                <div className="meta-strip-item">
                  <span className="meta-strip-label">Timeline</span>
                  <strong className="meta-strip-value">{study.timeline}</strong>
                </div>
              )}
              {study.branchKey && (
                <div className="meta-strip-item">
                  <span className="meta-strip-label">Practice</span>
                  <strong className="meta-strip-value">
                    {study.branchKey === "data-bi"
                      ? "Data Analytics & BI"
                      : study.branchKey === "ai-assistants"
                      ? "AI Assistants & Copilots"
                      : "Workflow Automation"}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="case-detail-main">
        <div className="site-container">
          {/* Banner Hero Image */}
          <div className="case-detail-banner-wrap">
            <img
              src={study.image}
              alt={`${study.client} system architecture and outcomes`}
              className="case-detail-banner-img"
              loading="eager"
            />
          </div>

          {/* Key Metrics / Highlights Row */}
          {study.stats && study.stats.length > 0 && (
            <section
              aria-label="Key Outcomes and Metrics"
              className="case-detail-metrics-section"
            >
              <div className="case-detail-metrics-grid">
                {study.stats.map((stat) => (
                  <div key={stat.label} className="case-detail-metric-card">
                    <span className="case-detail-metric-value">{stat.value}</span>
                    <span className="case-detail-metric-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2-Column Split: Deep Dive Story (Left) & Sidebar (Right) */}
          <div className="case-detail-layout-grid">
            {/* Left Main Article Column */}
            <article className="case-detail-article">
              {/* Overview */}
              {study.overview && (
                <section className="case-detail-content-block">
                  <h2 className="case-detail-section-heading">Overview</h2>
                  <p className="case-detail-prose">{study.overview}</p>
                </section>
              )}

              {/* The Challenge */}
              {study.challenge && (
                <section className="case-detail-content-block">
                  <h2 className="case-detail-section-heading">
                    The Challenge &amp; Problem
                  </h2>
                  <p className="case-detail-prose">{study.challenge}</p>
                </section>
              )}

              {/* The Kozker Solution */}
              {study.solution && (
                <section className="case-detail-content-block">
                  <h2 className="case-detail-section-heading">
                    The Kozker Solution &amp; Technical Architecture
                  </h2>
                  <p className="case-detail-prose">{study.solution}</p>
                </section>
              )}

              {/* Deliverables & Scope */}
              {study.deliverables && study.deliverables.length > 0 && (
                <section className="case-detail-content-block">
                  <h2 className="case-detail-section-heading">
                    Key Capabilities &amp; Deliverables
                  </h2>
                  <div className="case-detail-capabilities-grid">
                    {study.deliverables.map((item) => (
                      <div key={item.title} className="case-detail-cap-card">
                        <div className="case-detail-cap-icon-box">
                          <CheckCircle2 className="h-5 w-5 text-[#FF6E30] shrink-0" />
                        </div>
                        <div>
                          <strong className="case-detail-cap-title">
                            {item.title}
                          </strong>
                          <p className="case-detail-cap-desc">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Testimonial Quote */}
              {study.quote && (
                <section className="case-detail-quote-section">
                  <div className="case-detail-quote-box">
                    <Quote className="h-8 w-8 text-[#FF6E30] fill-[#FF6E30] shrink-0 opacity-80" />
                    <div className="case-detail-quote-content">
                      <blockquote className="case-detail-quote-text">
                        &ldquo;{study.quote.text}&rdquo;
                      </blockquote>
                      <cite className="case-detail-quote-author">
                        {study.quote.author}
                      </cite>
                    </div>
                  </div>
                </section>
              )}
            </article>

            {/* Right Sticky Sidebar */}
            <aside className="case-detail-sidebar">
              <div className="case-detail-sidebar-card">
                <h3 className="case-sidebar-title">Project Details</h3>
                <div className="case-sidebar-info-list">
                  <div className="case-sidebar-item">
                    <span className="case-sidebar-label">Client</span>
                    <strong className="case-sidebar-value">{study.client}</strong>
                  </div>
                  {study.industry && (
                    <div className="case-sidebar-item">
                      <span className="case-sidebar-label">Industry</span>
                      <strong className="case-sidebar-value">{study.industry}</strong>
                    </div>
                  )}
                  {study.timeline && (
                    <div className="case-sidebar-item">
                      <span className="case-sidebar-label">Timeline</span>
                      <strong className="case-sidebar-value">{study.timeline}</strong>
                    </div>
                  )}
                  <div className="case-sidebar-item">
                    <span className="case-sidebar-label">Category</span>
                    <strong className="case-sidebar-value">{study.category}</strong>
                  </div>
                </div>

                {/* Tech Stack */}
                {study.techStack && study.techStack.length > 0 && (
                  <div className="case-sidebar-stack-block">
                    <h4 className="case-sidebar-stack-title">
                      <Layers className="h-4 w-4 text-[#FF6E30]" />
                      <span>Technologies &amp; Integrations</span>
                    </h4>
                    <div className="case-sidebar-stack-tags">
                      {study.techStack.map((tech) => (
                        <span key={tech} className="case-sidebar-stack-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Conversation CTA Button */}
                <div className="case-sidebar-cta-block">
                  {(() => {
                    const rawHref = study.ctaHref || "/contact"
                    const [baseRoute, queryPart] = rawHref.split("?")
                    const sidebarSearchParams: Record<string, string> = {}
                    if (queryPart) {
                      const parsed = new URLSearchParams(queryPart)
                      parsed.forEach((val, key) => {
                        sidebarSearchParams[key] = val
                      })
                    }
                    sidebarSearchParams.subject =
                      study.prefilledSubject || `Inquiry regarding ${study.client} case study`
                    sidebarSearchParams.message =
                      study.prefilledMessage ||
                      `Hi Kozker, I was reviewing your ${study.client} case study (${study.title}) and would like to explore similar solutions for our company.`

                    return (
                      <Link
                        to={baseRoute || "/contact"}
                        search={sidebarSearchParams}
                        className="case-sidebar-cta-btn"
                      >
                        <span>{study.ctaText || "Start a Conversation"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )
                  })()}
                  <p className="case-sidebar-cta-note">
                    Average response time: under 4 business hours.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section className="case-detail-related-section">
          <div className="site-container">
            <div className="case-detail-related-header">
              <span className="eyebrow eyebrow--mono">More Outliers</span>
              <h2 className="case-detail-related-title">
                Explore More Client Case Studies
              </h2>
            </div>
            <div className="case-studies-grid-two">
              {relatedStudies.map((relStudy) => (
                <CaseStudyCard key={relStudy.id} study={relStudy} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Conversion Banner */}
      <section className="case-detail-bottom-cta">
        <div className="site-container">
          <div className="case-detail-cta-card">
            <span className="eyebrow eyebrow--mono">Partner With Us</span>
            <h2 className="case-detail-cta-title">
              Ready to engineer high-ROI workflows for your team?
            </h2>
            <p className="case-detail-cta-subtitle">
              We design custom BI dashboards, AI copilots, and multi-system automations
              that scale with your company.
            </p>
            <div className="case-detail-cta-actions">
              <Link
                to="/contact"
                search={{
                  subject: `Inquiry inspired by ${study.client} case study`,
                  message: `Hi Kozker, I reviewed your work on ${study.title} and want to discuss automating our processes.`,
                }}
                className="case-detail-btn-primary"
              >
                <span>Book an Architecture Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/work" className="case-detail-btn-secondary">
                <span>View All Portfolio Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
