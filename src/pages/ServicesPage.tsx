import { motion } from "motion/react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { CtaBand } from "@/components/site/CtaBand"
import { FaqSection } from "@/components/site/FaqSection"
import { FeatureCard } from "@/components/site/FeatureCard"
import { LogoStrip } from "@/components/site/LogoStrip"
import { MediaCollage } from "@/components/site/MediaCollage"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SolutionTabs } from "@/components/site/SolutionTabs"
import { caseStudy, featureCards, servicesFaqItems, solutionPanels } from "@/data/siteContent"

const processSteps = [
  ["THE VISION", "Turn complex data into insights your team can act on."],
  ["THE SYSTEM", "Design the right system around how your team operates."],
  ["THE BUILD", "Build a useful first version and make it part of the day-to-day."],
  ["THE EVOLVE", "Improve the system with real feedback and better data."],
] as const

const serviceCollageItems = [
  {
    image: "/assets/d5b56b.jpg",
    title: "Intelligence Platform",
    description: "Centralized KPI tracking and automated reporting.",
    projectTag: "Service 01",
    category: "Data & BI",
  },
  {
    image: "/assets/e467dd.jpg",
    title: "AI Knowledge Copilot",
    description: "Instant semantic search across internal manuals.",
    projectTag: "Service 02",
    category: "AI Assistants",
  },
  {
    image: "/assets/fd345e.jpg",
    title: "Executive Decision Hub",
    description: "Unified revenue and pipeline dashboards.",
    projectTag: "Service 03",
    category: "Analytics",
  },
  {
    image: "/assets/671883.jpg",
    title: "Ops Workflow Automation",
    description: "Eliminate error-prone spreadsheets with automated sync.",
    projectTag: "Service 04",
    category: "Automation",
  },
]

export function ServicesPage() {
  return (
    <div className="services-page-root">
      {/* Service Hero */}
      <section className="page-hero services-hero" aria-labelledby="service-title">
        <div className="service-hero-grid">
          <div className="service-hero-copy">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="eyebrow">Service</span>
            </motion.div>
            <motion.h1
              id="service-title"
              className="display-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Data Analytics &amp;<br />
              Business Intelligence
            </motion.h1>
            <h2 className="service-hero-subtitle">Turn your data into decisions.</h2>
            <p className="hero-copy">
              Your business already has data. We help you bring it together, make sense of it,
              and turn it into clear insights that support better decisions.
            </p>
            <div className="hero-actions">
              <a className="button-primary" href="#contact">Get Consultation →</a>
            </div>
          </div>
          <div className="service-hero-media">
            <MediaCollage items={serviceCollageItems} />
          </div>
        </div>
      </section>

      {/* The Shift */}
      <section className="shift-section">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <span className="eyebrow">The Shift</span>
            <h2>Turn your Data into Decisions.</h2>
          </SectionReveal>
          <SolutionTabs panels={solutionPanels} showComparisons />
        </div>
      </section>

      {/* The Solution */}
      <section className="section" id="solutions">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <span className="eyebrow">The Solution</span>
            <h2>
              We build the systems that<br />
              make your data useful.
            </h2>
          </SectionReveal>
          <div className="solution-grid mt-16">
            {featureCards.map((card, index) => (
              <FeatureCard key={card.id} card={card} delay={index * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* The Process Timeline */}
      <section className="section section--warm process-timeline-section">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <span className="eyebrow">The Process</span>
            <h2>How we bring your systems to life.</h2>
          </SectionReveal>
          <div className="timeline-list">
            {processSteps.map(([label, copy], index) => (
              <motion.div
                key={label}
                className="timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <span className="timeline-dot" />
                <span className="mono-label">0{index + 1}</span>
                <div className="timeline-content">
                  <strong>{label}</strong>
                  <p>{copy}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="section case-study-section">
        <div className="case-study-shell">
          <SectionReveal className="section-heading">
            <span className="eyebrow">Featured Case Study</span>
            <h2 className="case-study-title">{caseStudy.title}</h2>
          </SectionReveal>
          <CaseStudyCard study={caseStudy} />
        </div>
      </section>

      {/* Service Logos */}
      <section className="section section--tight service-logos">
        <div className="site-container">
          <p className="text-center text-muted mb-8 font-medium">Helping businesses build simpler ways</p>
          <LogoStrip />
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={servicesFaqItems} />

      {/* CTA */}
      <CtaBand />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
