import { motion } from "motion/react"

import { CtaBand } from "@/components/site/CtaBand"
import { FaqSection } from "@/components/site/FaqSection"
import { FeatureCard } from "@/components/site/FeatureCard"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { partnerFeatureCards, partnershipFaqItems } from "@/data/siteContent"

const partnerCases = [
  {
    id: "case-1",
    title: "HR & Recruitment Agencies",
    category: "Agency Partnership",
    headline: "Expand Client Offerings with AI Intelligence",
    description:
      "Deliver bespoke candidate scoring, automated initial screening, and seamless workflow integrations for your clients.",
    tag: "AI Automation",
    image: "/assets/60ed30.jpg",
  },
  {
    id: "case-2",
    title: "Enterprise Solutions",
    category: "Co-Development",
    headline: "Custom Knowledge Systems & Automation",
    description:
      "Partner with our engineering team to co-build enterprise-grade data intelligence systems tailored to complex operations.",
    tag: "Enterprise Partner",
    image: "/assets/60ed30.jpg",
  },
]

export function PartnershipPage() {
  return (
    <div className="partnership-page-root">
      {/* Partnership Hero */}
      <section className="page-hero partnership-hero" aria-labelledby="partner-title">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow">Partnership</span>
          </motion.div>
          <motion.h1
            id="partner-title"
            className="display-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build with <span className="accent-text">Kozker</span><span className="accent-dot">.</span>
          </motion.h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We partner with HR professionals, service providers, and businesses to bring AI-powered systems and automation to more teams.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#contact" className="button-primary">Become a Partner</a>
          </motion.div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <span className="eyebrow">Why Us</span>
            <h2>
              More than a partnership.<br />
              A way to <span className="accent-text">build and grow together</span><span className="accent-dot">.</span>
            </h2>
          </SectionReveal>
          <div className="why-us-grid">
            {partnerFeatureCards.map((card, idx) => (
              <FeatureCard key={card.id} card={card} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Choose your Partnership */}
      <section className="partnership-cases">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <h2>Choose your Partnership</h2>
            <p>Simple systems that save time, reduce manual work, and keep your business moving.</p>
          </SectionReveal>
          <div className="partner-case-grid">
            {partnerCases.map((item) => (
              <motion.article
                key={item.id}
                className="partner-case-card group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <div className="image-frame">
                  <img src={item.image} alt={item.headline} loading="lazy" />
                </div>
                <div className="partner-case-card-content">
                  <h3>{item.title}</h3>
                  <div className="category">{item.category}</div>
                  <h4>{item.headline}</h4>
                  <p>{item.description}</p>
                  <span className="orange-tag">{item.tag}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Process */}
      <section className="partner-process">
        <div className="site-container">
          <SectionReveal className="section-heading">
            <span className="eyebrow">The Process</span>
            <h2>
              More than a partnership.<br />
              A way to build and grow together.
            </h2>
          </SectionReveal>
          <div className="partner-process-grid">
            {partnerFeatureCards.map((card, idx) => (
              <FeatureCard key={`process-${card.id}`} card={card} delay={idx * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={partnershipFaqItems} />

      {/* CTA Band */}
      <CtaBand buttonLabel="Get Consultation" />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
