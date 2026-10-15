import { useEffect, useMemo, useState } from "react"
import { Link, useSearch } from "@tanstack/react-router"
import { AnimatePresence, motion } from "motion/react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { ServiceDropdown } from "@/components/site/ServiceDropdown"
import { CtaBand } from "@/components/site/CtaBand"
import { FaqSection } from "@/components/site/FaqSection"
import { LogoStrip } from "@/components/site/LogoStrip"
import { MediaCollage } from "@/components/site/MediaCollage"
import { SectionReveal } from "@/components/site/SectionReveal"
import { ServiceProcessTimeline } from "@/components/site/ServiceProcessTimeline"
import { ServiceShiftGrid } from "@/components/site/ServiceShiftGrid"
import { ServiceSolutionGrid } from "@/components/site/ServiceSolutionGrid"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SeoHead } from "@/components/seo/SeoHead"
import { servicesDetails, servicesFaqItems } from "@/data/siteContent"
import { useCaseStudies } from "@/hooks/useCaseStudies"
import { TEMPORARY_SECTION_VISIBILITY } from "@/config/visibility"

export function ServicesPage() {
  const { caseStudies } = useCaseStudies()
  const search = useSearch({ from: "/services" }) as { tab?: string }
  const activeTabId = search.tab && servicesDetails[search.tab] ? search.tab : "data-bi"
  const currentService = servicesDetails[activeTabId] || servicesDetails["data-bi"]

  const [selectedService, setSelectedService] = useState<string>(activeTabId)

  useEffect(() => {
    setSelectedService(activeTabId)
  }, [activeTabId])

  const featuredStudies = useMemo(() => {
    if (selectedService === "all") return caseStudies.slice(0, 2)
    return caseStudies.filter((study) => study.branchKey === selectedService).slice(0, 2)
  }, [selectedService, caseStudies])

  return (
    <div className="services-page-root">
      <SeoHead
        title="Services — Data Analytics, AI Assistants & Automation | Kozker"
        description="Explore Kozker's engineering services: unified financial & operational BI, custom private AI copilots, and end-to-end webhook workflow automation."
        canonicalPath="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Kozker Technology Services",
          serviceType: "Data Analytics, AI Development, Workflow Automation",
          provider: {
            "@type": "Organization",
            name: "Kozker",
            url: "https://kozker.com",
          },
        }}
      />
      {/* Service Hero Section (Frame 41 & Media Collage) */}
      <section className="page-hero services-hero" aria-labelledby="service-title">
        <div className="service-hero-grid">
          {/* Left Column Copy (Frame 41) */}
          <div className="service-hero-copy">
            {/* Frame 40 */}
            <div className="service-hero-text-wrap">
              {/* Frame 39 */}
              <div className="service-hero-headings-wrap">
                {/* Frame 12 - Eyebrow Badge */}
                <motion.div
                  className="service-hero-badge"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                >
                  <span>Service</span>
                </motion.div>

                {/* Frame 38 */}
                <div className="service-hero-titles-wrap">
                  <motion.h1
                    id="service-title"
                    className="service-hero-title"
                    key={currentService.id + "-title"}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                  >
                    {currentService.heroTitle}
                  </motion.h1>

                  <motion.h2
                    className="service-hero-subtitle"
                    key={currentService.id + "-subtitle"}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.14 }}
                  >
                    {currentService.heroSubtitle}
                  </motion.h2>
                </div>
              </div>

              {/* Description Body Text */}
              <motion.p
                className="service-hero-desc"
                key={currentService.id + "-desc"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
              >
                {currentService.heroDescription}
              </motion.p>
            </div>

            {/* Frame 32 - Get Consultation CTA Button */}
            <motion.div
              className="service-hero-action-wrap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
            >
              <Link className="service-hero-cta-btn" to="/contact">
                <span>Get Consultation</span>
                <span className="service-hero-cta-arrow" aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column Media Panels (Covering half screen on desktop) */}
          <div className="service-hero-media">
            <MediaCollage
              key={currentService.id + "-collage"}
              items={currentService.collageItems}
            />
          </div>
        </div>
      </section>

      {/* Section 1: The Shift (Rectangle 106 2x2 Comparison Card with Animated Strike) */}
      <ServiceShiftGrid
        key={currentService.id + "-shift"}
        heading={currentService.shiftHeading}
        comparisons={currentService.comparisons}
      />

      {/* Section 2: The Solution (4 Feature Cards - Rectangle 109, 123, 124, 125) */}
      <ServiceSolutionGrid
        key={currentService.id + "-solution"}
        heading={currentService.solutionHeading}
        cards={currentService.solutionCards}
      />

      {/* Section 3: The Process (Scroll-Driven Animated Orange Loader Timeline) */}
      <ServiceProcessTimeline
        key={currentService.id + "-process"}
        steps={currentService.processSteps}
      />

      {/* Featured Case Studies Section (Frame 116 / 115 / 114 with 2 Cards) */}
      <section id="work" className="section case-study-section" aria-labelledby="services-case-studies-heading">
        <div className="case-study-shell">
          {/* Frame 106 & Frame 105 */}
          <SectionReveal className="case-study-hero-wrap">
            <div className="case-study-headings">
              <h2 id="services-case-studies-heading" className="case-study-section-title">
                See it in <span className="accent-text">Action</span>
                <span className="accent-dot">.</span>
              </h2>
              <p className="case-study-section-subtext">
                Explore the respective featured case studies for specific service.
              </p>
            </div>

            {/* Frame 105: Service Selector Dropdown Pill */}
            <ServiceDropdown
              value={selectedService}
              onChange={setSelectedService}
              ariaLabel="Filter case studies by service"
            />
          </SectionReveal>

          {/* Frame 114: Two Side-by-Side Case Study Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService}
              className="case-studies-grid-two"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {featuredStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Center CTA Button matching Figma Frame 116 / CTA */}
          <div className="case-studies-bottom-cta">
            <Link to="/work" className="case-section-cta-btn">
              <span>View all Work</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Logos Strip (Temporarily hidden - restore in src/config/visibility.ts) */}
      {TEMPORARY_SECTION_VISIBILITY.helpingBusinessesLogoStrip && (
        <section className="section section--tight service-logos-section">
          <div className="site-container">
            <div className="partner-strip-wrapper">
              <p className="partner-strip-label">Helping businesses build simpler ways</p>
              <LogoStrip />
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <FaqSection items={servicesFaqItems} />

      {/* CTA */}
      <CtaBand />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
