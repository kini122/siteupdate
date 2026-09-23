import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { motion } from "motion/react"
import { Play } from "lucide-react"

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
import { caseStudy, faqItems, products, solutionPanels } from "@/data/siteContent"

export function HomePage() {
  const [productPreviewOpen, setProductPreviewOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const featuredProduct = products[selectedProductIndex] || products[0]

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

          {/* Testimonial Row */}
          <div className="testimonial-row">
            <div className="testimonial-stat">
              <div className="metric-label">With Client Satisfaction</div>
              <div className="metric-value">98%</div>
            </div>
            <article className="testimonial-card" aria-label="Client testimonial">
              <img src="/assets/cb0953.svg" alt="Quote" aria-hidden="true" />
              <p>
                The WhatsApp automation has revolutionized our customer communication.
                Highly recommended!
              </p>
              <strong>- Daniel</strong>
              <span>E-commerce Business</span>
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

      {/* Featured Case Study Section */}
      <section id="work" className="section case-study-section">
        <div className="case-study-shell">
          <SectionReveal className="section-heading">
            <h2>
              See it in <span className="accent-text">Action</span>
              <span className="accent-dot">.</span>
            </h2>
            <p>
              Simple systems that save time, reduce manual work, and keep your business
              moving.
            </p>
          </SectionReveal>

          <div className="case-study-topline">
            <span className="case-badge">Featured Case Study</span>
          </div>

          <h3 className="case-study-title">{caseStudy.title}</h3>
          <CaseStudyCard study={caseStudy} />
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
            transition={{ duration: 0.25 }}
          >
            <div className="dark-product-step-indicator">
              <span>{String(selectedProductIndex + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
            </div>

            <button
              type="button"
              className="dark-product-card-button"
              onClick={() => setProductPreviewOpen(true)}
              aria-label={`Open ${featuredProduct.title.toLowerCase()} preview`}
            >
              <div className="dark-product-card-image">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.title}
                  loading="lazy"
                />
                <div className="play-button-overlay">
                  <Play className="h-6 w-6 fill-white text-white translate-x-0.5" />
                </div>
              </div>

              <div className="dark-product-card-content">
                <h3 className="dark-product-title">{featuredProduct.title}</h3>
                <p className="dark-product-desc">{featuredProduct.description}</p>
                <h4 className="dark-product-subtitle">What it does</h4>
                <ul className="dark-product-bullets">
                  {featuredProduct.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </button>

            <div className="dark-product-cta-wrap flex flex-col gap-3">
              <Button
                className="dark-product-cta"
                type="button"
                onClick={() => setProductPreviewOpen(true)}
              >
                Try Product
              </Button>
              {products.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-1">
                  {products.map((_, idx) => (
                    <button
                      key={`prod-dot-${idx}`}
                      type="button"
                      className={`h-2 w-2 rounded-full transition-all ${
                        idx === selectedProductIndex ? "bg-orange scale-125" : "bg-white/40"
                      }`}
                      aria-label={`Select product ${idx + 1}`}
                      onClick={() => setSelectedProductIndex(idx)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        </div>
      </section>

      <ProductPreviewDialog
        product={featuredProduct}
        open={productPreviewOpen}
        onOpenChange={setProductPreviewOpen}
      />

      {/* Founder Section */}
      <section id="founder" className="section founder-section">
        <div className="site-container">
          <SectionReveal className="section-heading" y={16}>
            <h2>
              A note from <span className="accent-text">Founder</span>
              <span className="accent-dot">.</span>
            </h2>
          </SectionReveal>

          <div className="founder-row">
            <div className="image-frame founder-photo-frame">
              <img
                src="/assets/642e0f.png"
                alt="Govind Bhat, Founder of Kozker"
                loading="lazy"
              />
            </div>
            <div className="founder-copy">
              <blockquote>
                “After six years of building with technology, I&apos;ve learned that the
                best systems are the ones that make themselves feel invisible.”
              </blockquote>
              <footer className="founder-byline">— Govind Bhat, Founder</footer>
              <Link className="button-secondary inline-flex mt-8" to="/about">
                Meet Team Kozker
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection items={faqItems} />

      {/* Signature Band */}
      <SignatureBand />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
