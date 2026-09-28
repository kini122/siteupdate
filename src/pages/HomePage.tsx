import { useEffect, useState } from "react"
import { Link } from "@tanstack/react-router"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, Play } from "lucide-react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { FaqSection } from "@/components/site/FaqSection"
import { LogoStrip } from "@/components/site/LogoStrip"
import { MediaCollage } from "@/components/site/MediaCollage"
import { ProcessStack } from "@/components/site/ProcessStack"
import { ProductPreviewDialog } from "@/components/site/ProductPreviewDialog"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SignatureBand } from "@/components/site/SignatureBand"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SolutionTabs } from "@/components/site/SolutionTabs"
import { Button } from "@/components/ui/button"
import { caseStudiesList, faqItems, products, solutionPanels } from "@/data/siteContent"

const clientTestimonials = [
  {
    quote: "The WhatsApp automation has revolutionized our customer communication. Highly recommended!",
    author: "- Daniel",
    role: "E-commerce Business",
  },
  {
    quote: "The AI chatbot and reporting workflow transformed our customer experience. Sales have never been better.",
    author: "- Priya Sharma",
    role: "Founder, TechGadgets Pro",
  },
  {
    quote: "Kozker unified our logistics data and automated exception tracking, cutting manual hours by 60%.",
    author: "- Marcus Vance",
    role: "VP Operations, Global Logistics",
  },
  {
    quote: "Intuitive AI assistants integrated right into our workflow. Answers that used to take hours now take seconds.",
    author: "- Elena Rostova",
    role: "Head of Operations, SaaS Co",
  },
]

export function HomePage() {
  const [productPreviewOpen, setProductPreviewOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialPaused, setTestimonialPaused] = useState(false)

  const featuredProduct = products[selectedProductIndex] || products[0]

  // Testimonial auto-rotation without pagination dots
  useEffect(() => {
    if (testimonialPaused) return
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % clientTestimonials.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [testimonialPaused])

  return (
    <div className="home-page-root">
      {/* Hero Section */}
      <section className="page-hero home-hero" aria-labelledby="home-title">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow eyebrow--mono">DATA, AI &amp; AUTOMATION</span>
          </motion.div>

          <motion.h1
            id="home-title"
            className="display-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            Your Business,
            <br />
            made easier with <em>Technology</em>
            <span className="accent-dot">.</span>
          </motion.h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            We build intelligent systems and products that help businesses work faster,
            automate the busywork, and make better decisions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
          >
            <a href="#contact" className="button-primary">
              Start a Conversation →
            </a>
            <a href="#products" className="button-secondary">
              Explore Products
            </a>
          </motion.div>
        </div>
      </section>

      {/* Selected Projects Media Collage & Results */}
      <section className="section section--tight project-gallery-section" aria-label="Selected projects">
        <div className="site-container">
          <MediaCollage />

          {/* Metrics Row */}
          <div className="metrics-row" aria-label="Kozker results">
            <div className="metric">
              <div className="metric-label">Projects Delivered</div>
              <div className="metric-value">100+</div>
            </div>
            <div className="metric">
              <div className="metric-label">Client Satisfaction</div>
              <div className="metric-value">98%</div>
            </div>
            <div className="metric">
              <div className="metric-label">Repeat Business</div>
              <div className="metric-value">92%</div>
            </div>
          </div>

          {/* Testimonial Row (Rectangle 153 spec + Auto-rotate) */}
          <div className="testimonial-row">
            <div className="testimonial-stat">
              <div className="metric-label">With Client Satisfaction</div>
              <div className="metric-value">98%</div>
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
                  <motion.div
                    key={testimonialIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                    className="testimonial-quote-inner"
                  >
                    <p>{clientTestimonials[testimonialIndex].quote}</p>
                    <strong>{clientTestimonials[testimonialIndex].author}</strong>
                    <span>{clientTestimonials[testimonialIndex].role}</span>
                  </motion.div>
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

          {/* Partner Logos Strip */}
          <div className="partner-strip-wrapper">
            <p className="partner-strip-label">Helping businesses build simpler ways</p>
            <LogoStrip />
          </div>
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
            <div className="case-study-service-pill">
              <span className="case-study-service-label">DATA ANALYTICS &amp; BUSINESS INTELLIGENCE</span>
              <ChevronDown className="h-4 w-4 text-[#7B776F] stroke-[2]" aria-hidden="true" />
            </div>
          </SectionReveal>

          {/* Frame 114: Two Side-by-Side Case Study Cards */}
          <div className="case-studies-grid-two">
            {caseStudiesList.slice(0, 2).map((study) => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>

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

          <ProcessStack />
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
            <div className="dark-product-tag">Product 01</div>
            <div className="dark-product-card-body">
              <div className="dark-product-visual">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.title}
                  className="dark-product-img"
                />
              </div>
              <div className="dark-product-info">
                <h3>{featuredProduct.title}</h3>
                <p>{featuredProduct.description}</p>
                <div className="dark-product-actions">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setSelectedProductIndex(0)
                      setProductPreviewOpen(true)
                    }}
                    className="demo-btn"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Watch 1 Min Demo
                  </Button>
                  <Link to="/products" className="text-link">
                    Explore Product →
                  </Link>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={faqItems} />

      {/* Signature Brand Band */}
      <SignatureBand />

      {/* Site Footer */}
      <SiteFooter />

      {/* Product Interactive Demo Modal */}
      <ProductPreviewDialog
        product={featuredProduct}
        open={productPreviewOpen}
        onOpenChange={setProductPreviewOpen}
      />
    </div>
  )
}
