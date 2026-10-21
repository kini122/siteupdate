import { useEffect, useMemo, useState, lazy, Suspense } from "react"
import { Link } from "@tanstack/react-router"
import { AnimatePresence, motion } from "motion/react"
import { Play } from "lucide-react"

const ProductPreviewDialog = lazy(() =>
  import("@/components/site/ProductPreviewDialog").then((m) => ({ default: m.ProductPreviewDialog }))
)
const SignatureBand = lazy(() =>
  import("@/components/site/SignatureBand").then((m) => ({ default: m.SignatureBand }))
)
const ProcessStack = lazy(() =>
  import("@/components/site/ProcessStack").then((m) => ({ default: m.ProcessStack }))
)
const FaqSection = lazy(() =>
  import("@/components/site/FaqSection").then((m) => ({ default: m.FaqSection }))
)

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { ServiceDropdown } from "@/components/site/ServiceDropdown"
import { LogoStrip } from "@/components/site/LogoStrip"
import { MediaCollage } from "@/components/site/MediaCollage"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SolutionTabs } from "@/components/site/SolutionTabs"
import { SeoHead } from "@/components/seo/SeoHead"
import { faqItems, products, solutionPanels } from "@/data/siteContent"
import { useCaseStudies } from "@/hooks/useCaseStudies"
import { TEMPORARY_SECTION_VISIBILITY } from "@/config/visibility"

export function HomePage() {
  const { caseStudies } = useCaseStudies()
  const [productPreviewOpen, setProductPreviewOpen] = useState(false)
  const [caseStudyService, setCaseStudyService] = useState<string>("all")

  // Dynamically derive client testimonials directly from live case studies in CMS
  const caseStudyTestimonials = useMemo(() => {
    if (!caseStudies || caseStudies.length === 0) return []

    const filtered = caseStudies
      .map((s) => {
        const quoteObj = s.quote && s.quote.text ? s.quote : null
        if (!quoteObj || !quoteObj.text) return null

        const rawAuthor = quoteObj.author ? quoteObj.author.replace(/^[—–-]\s*/, "").trim() : s.client
        const commaIdx = rawAuthor.indexOf(",")
        let authorName = rawAuthor
        let authorOrg = s.client
        if (commaIdx !== -1) {
          authorName = rawAuthor.slice(0, commaIdx).trim()
          authorOrg = rawAuthor.slice(commaIdx + 1).trim()
        }
        const roleStr = s.industry ? `${authorOrg} • ${s.industry}` : authorOrg

        return {
          quote: quoteObj.text,
          author: authorName,
          role: roleStr,
          slug: s.slug || s.id,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    return filtered
  }, [caseStudies])

  const featuredStudies = useMemo(() => {
    const list = caseStudies || []
    if (caseStudyService === "all") return list.slice(0, 2)
    return list.filter((study) => study.branchKey === caseStudyService).slice(0, 2)
  }, [caseStudyService, caseStudies])

  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialPaused, setTestimonialPaused] = useState(false)

  const featuredProduct = products[0]

  // Relaxed, comfortably readable dynamic loop for testimonials (7.0s cycle)
  useEffect(() => {
    if (testimonialPaused || caseStudyTestimonials.length <= 1) return
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % caseStudyTestimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonialPaused, caseStudyTestimonials.length])

  return (
    <div className="home-page-root">
      <SeoHead
        title="Kozker Tech | Data, AI & Automation"
        description="We build intelligent systems and products that help businesses work faster, automate the busywork, and make better decisions."
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Kozker Tech",
          url: "https://kozker.com/",
          description: "We build intelligent systems and products that help businesses work faster, automate the busywork, and make better decisions.",
        }}
      />
      {/* Hero Section */}
      <section className="page-hero home-hero" aria-labelledby="home-title">
        <div className="site-container">
          <div className="hero-entrance-eyebrow">
            <span className="eyebrow eyebrow--mono">DATA, AI &amp; AUTOMATION</span>
          </div>

          <h1 id="home-title" className="display-title hero-entrance-title">
            Your Business,
            <br />
            made easier with <em>Technology</em>
            <span className="accent-dot">.</span>
          </h1>

          <p className="hero-copy hero-entrance-copy">
            We build intelligent systems and products that help businesses work faster,
            automate the busywork, and make better decisions.
          </p>

          <div className="hero-actions hero-entrance-actions">
            <Link to="/contact" className="button-primary">
              Start a Conversation →
            </Link>
            <a href="#products" className="button-secondary">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Selected Projects Media Collage & Results */}
      <section className="section section--tight project-gallery-section" aria-label="Selected projects">
        <div className="site-container">
          <h2 className="sr-only">Featured Systems &amp; Capabilities</h2>
          <MediaCollage />

          {/* Metrics Row */}
          <div className="metrics-row" aria-label="Kozker results">
            <div className="metric">
              <div className="metric-label">Projects Delivered</div>
              <div className="metric-value">150+</div>
            </div>
            <div className="metric">
              <div className="metric-label">Hours of Manual Work&nbsp;Cut</div>
              <div className="metric-value">5,000+</div>
            </div>
            <div className="metric">
              <div className="metric-label">Live Workflows Built</div>
              <div className="metric-value">100+</div>
            </div>
          </div>

          {/* Testimonial Row (Rectangle 153 spec + Auto-rotate) */}
          <div className="testimonial-row">
            <div className="testimonial-stat">
              <div className="metric-label">Average Launch Time</div>
              <div className="metric-value">4 Weeks</div>
            </div>
            <article
              className="testimonial-card"
              aria-label="Client testimonial"
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
            >
              <img src="/assets/cb0953.svg" alt="Quote" aria-hidden="true" />
              <div className="testimonial-rotator-area">
                <AnimatePresence mode="wait" initial={false}>
                  {(() => {
                    if (caseStudyTestimonials.length === 0) return null
                    const currentTestimonial =
                      caseStudyTestimonials[testimonialIndex % caseStudyTestimonials.length]
                    if (!currentTestimonial) return null
                    return (
                      <motion.div
                        key={testimonialIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
                        className="testimonial-quote-inner"
                      >
                        <p>{currentTestimonial.quote}</p>
                        <strong>{currentTestimonial.author}</strong>
                        <span>{currentTestimonial.role}</span>
                      </motion.div>
                    )
                  })()}
                </AnimatePresence>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Solutions / Shift Section */}
      <section id="services" className="shift-section">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <h2>
              Business moves fast.
              <br />
              Your systems <span className="accent-text">Should Too</span>
              <span className="accent-dot">.</span>
            </h2>
            <p>
              Simple systems that save time, reduce manual work, and keep your business
              moving.
            </p>
          </SectionReveal>

          <SolutionTabs panels={solutionPanels} />

          {/* Partner Logos Strip (Temporarily hidden - restore in src/config/visibility.ts) */}
          {TEMPORARY_SECTION_VISIBILITY.helpingBusinessesLogoStrip && (
            <div className="partner-strip-wrapper">
              <p className="partner-strip-label">Helping businesses build simpler ways</p>
              <LogoStrip />
            </div>
          )}
        </div>
      </section>

      {/* Featured Case Studies Section (Frame 116 / 115 / 114 with 2 Cards) */}
      <section id="work" className="section case-study-section" aria-labelledby="case-studies-heading">
        <div className="case-study-shell">
          {/* Frame 106 & Frame 105 */}
          <SectionReveal className="case-study-hero-wrap">
            <div className="case-study-headings">
              <h2 id="case-studies-heading" className="case-study-section-title">
                See it in <span className="accent-text">Action</span>
                <span className="accent-dot">.</span>
              </h2>
              <p className="case-study-section-subtext">
                Explore the respective featured case studies for specific service.
              </p>
            </div>

            {/* Frame 105: Service Selector Dropdown Pill */}
            <ServiceDropdown
              value={caseStudyService}
              onChange={setCaseStudyService}
              ariaLabel="Filter case studies by service"
            />
          </SectionReveal>

          {/* Frame 114: Two Side-by-Side Case Study Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={caseStudyService}
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

      {/* How we Work / Process Stack Section */}
      <section className="section process-section">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <h2>
              How we <span className="accent-text">Work</span>
            </h2>
            <p>
              Simple systems that save time, reduce manual work, and keep your business
              moving.
            </p>
          </SectionReveal>

          <Suspense fallback={null}>
            <ProcessStack />
          </Suspense>
        </div>
      </section>

      {/* Dark Products Section */}
      <section id="products" className="dark-product-section">
        <div className="site-container dark-product-grid">
          <SectionReveal className="dark-product-copy">
            <h2>
              Not everything <span>We Build</span> starts with a client.
            </h2>
            <p>
              We explore problems &amp; apply the same thinking we bring to every
              business we work with.
            </p>
            <Link to="/products" className="dark-product-link">
              View all Products →
            </Link>
          </SectionReveal>

          <motion.article
            className="dark-product-card"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {/* Visual Container with Play Overlay */}
            <div className="dark-product-visual">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.title}
                className="dark-product-img"
                loading="lazy"
                width={800}
                height={450}
              />
              <a
                href={featuredProduct.demoUrl || "https://www.loom.com/share/a0e96cbbd64e46188561d0eb22c3d0ea"}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-product-play-overlay"
                aria-label="Watch Recruitment App Admin Console and AI Copilot Tour on Loom"
              >
                <span className="dark-product-play-circle">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </span>
              </a>
            </div>

            {/* Information Body with Generous Padding and No Clutter */}
            <div className="dark-product-info">
              <div className="dark-product-meta-row">
                <span className="dark-product-badge">AI Recruitment Operations</span>
                <span className="dark-product-version">v1.0.8-PRO</span>
              </div>

              <h3 className="dark-product-title">{featuredProduct.title}</h3>
              <p className="dark-product-desc">{featuredProduct.description}</p>

              <div className="dark-product-actions">
                <a
                  href={featuredProduct.demoUrl || "https://www.loom.com/share/a0e96cbbd64e46188561d0eb22c3d0ea"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-product-btn-demo"
                  title="Recruitment App Admin Console and AI Copilot Tour"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Watch 1 Min Demo</span>
                </a>
                <a
                  href={featuredProduct.exploreUrl || "https://recruiter-landing-page-olive.vercel.app/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark-product-btn-explore"
                  title="Kozker Recruiter AI | AI Recruitment Operations Platform"
                >
                  <span>Explore Product</span>
                  <span className="arrow-icon" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={null}>
        <FaqSection items={faqItems} />
      </Suspense>

      {/* Signature Brand Band */}
      <Suspense fallback={null}>
        <SignatureBand />
      </Suspense>

      {/* Site Footer */}
      <SiteFooter />

      {/* Product Interactive Demo Modal */}
      {productPreviewOpen && (
        <Suspense fallback={null}>
          <ProductPreviewDialog
            product={featuredProduct}
            open={productPreviewOpen}
            onOpenChange={setProductPreviewOpen}
          />
        </Suspense>
      )}
    </div>
  )
}
