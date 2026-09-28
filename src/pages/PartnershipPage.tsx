import { motion } from "motion/react"
import { ArrowRight, Layers, Rocket, TrendingUp, Users2, Workflow } from "lucide-react"

import { CtaBand } from "@/components/site/CtaBand"
import { FaqSection } from "@/components/site/FaqSection"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { partnershipFaqItems } from "@/data/siteContent"

const whyUsCards = [
  {
    id: "practical-systems",
    title: "Practical Systems",
    description: "Clear tools that fit how your partners already work.",
    icon: Rocket,
  },
  {
    id: "shared-growth",
    title: "Shared Growth",
    description: "A product direction shaped around useful outcomes.",
    icon: TrendingUp,
  },
  {
    id: "built-together",
    title: "Built Together",
    description: "A responsive team from first idea to steady adoption.",
    icon: Layers,
  },
]

const processCards = [
  {
    id: "process-1",
    num: "01",
    title: "Discovery & Mapping",
    description: "Audit existing workflows and identify high-leverage automation opportunities.",
    icon: Workflow,
  },
  {
    id: "process-2",
    num: "02",
    title: "Co-Build & Integrate",
    description: "Engineer custom AI solutions and connect seamlessly with your team's tools.",
    icon: Rocket,
  },
  {
    id: "process-3",
    num: "03",
    title: "Scale & Ongoing Support",
    description: "Deploy production-grade systems with operator training and continuous iteration.",
    icon: Users2,
  },
]

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
    image: "/assets/3132a8.jpg",
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

      {/* 1. Why Us Section matching Figma Rectangle 105 / Frame 33 / Rectangle 109, 123, 124 */}
      <section className="partnership-why-us-section" aria-labelledby="why-us-title">
        <div className="site-container">
          <SectionReveal className="partner-section-header">
            {/* Frame 33: Pill Badge */}
            <div className="partner-pill-tag">
              <span>Why Us</span>
            </div>
            {/* Heading: IBM Plex Sans 40px / 52px */}
            <h2 id="why-us-title" className="partner-section-heading">
              More than a partnership.{" "}
              <br className="hidden-mobile" />
              A way to build and grow together.
            </h2>
          </SectionReveal>

          {/* 3 Cards Grid (Rectangle 109, 123, 124) */}
          <div className="partner-cards-grid">
            {whyUsCards.map((card, idx) => {
              const IconComp = card.icon
              return (
                <motion.article
                  key={card.id}
                  className="partner-feature-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  {/* Rectangle 131 / 132 / 133: Icon Box */}
                  <div className="partner-card-icon-box">
                    <IconComp className="partner-coral-icon" />
                  </div>
                  {/* Card Title (IBM Plex Sans 23px / 30px) */}
                  <h3 className="partner-card-title">{card.title}</h3>
                  {/* Card Description (DM Sans 17px-21px / 27px) */}
                  <p className="partner-card-desc">{card.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Choose your Partnership Cases */}
      <section className="partnership-cases-section">
        <div className="site-container">
          <SectionReveal className="partner-section-header">
            <div className="partner-pill-tag">
              <span>Models</span>
            </div>
            <h2 className="partner-section-heading">
              Choose your Partnership
            </h2>
            <p className="partner-section-subtext">
              Simple systems that save time, reduce manual work, and keep your business moving.
            </p>
          </SectionReveal>

          <div className="partner-case-grid-two">
            {partnerCases.map((item, idx) => (
              <motion.article
                key={item.id}
                className="partner-case-card-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <div className="partner-case-img-wrap">
                  <img src={item.image} alt={item.headline} loading="lazy" />
                  <span className="partner-case-tag">{item.tag}</span>
                </div>
                <div className="partner-case-card-body">
                  <div className="partner-case-meta">
                    <span className="partner-case-title">{item.title}</span>
                    <span className="partner-case-category">{item.category}</span>
                  </div>
                  <h3 className="partner-case-headline">{item.headline}</h3>
                  <p className="partner-case-description">{item.description}</p>
                  <a href="#contact" className="partner-case-cta">
                    <span>Explore Model</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. The Process Section matching Figma Rectangle 90 / Frame 43 / Rectangle 136, 137, 138 with Vectors */}
      <section className="partnership-process-section" aria-labelledby="process-title">
        <div className="site-container">
          <SectionReveal className="partner-section-header">
            {/* Frame 43: Pill Badge */}
            <div className="partner-pill-tag">
              <span>The Process</span>
            </div>
            {/* Heading: IBM Plex Sans 40px / 52px */}
            <h2 id="process-title" className="partner-section-heading">
              More than a partnership.{" "}
              <br className="hidden-mobile" />
              A way to build and grow together.
            </h2>
          </SectionReveal>

          {/* 3 Process Cards with Inline Evenly Spaced Step Flow Connectors */}
          <div className="partner-process-flow-row">
            {/* Step 1 */}
            <motion.article
              className="partner-feature-card partner-process-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="partner-card-icon-box">
                <Workflow className="partner-coral-icon" />
              </div>
              <h3 className="partner-card-title">{processCards[0].title}</h3>
              <p className="partner-card-desc">{processCards[0].description}</p>
            </motion.article>

            {/* Arrow 1: Connecting Step 1 -> Step 2 with Left-to-Right Sequential Scroll Animation */}
            <motion.div
              className="partner-flow-arrow-col"
              aria-hidden="true"
              initial={{ opacity: 0, x: -28, scale: 0.75 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                className="partner-arrow-inner"
              >
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12H36M36 12L26 2M36 12L26 22" stroke="#FF6E30" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.article
              className="partner-feature-card partner-process-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{ y: -6 }}
            >
              <div className="partner-card-icon-box">
                <Rocket className="partner-coral-icon" />
              </div>
              <h3 className="partner-card-title">{processCards[1].title}</h3>
              <p className="partner-card-desc">{processCards[1].description}</p>
            </motion.article>

            {/* Arrow 2: Connecting Step 2 -> Step 3 with Left-to-Right Sequential Scroll Animation */}
            <motion.div
              className="partner-flow-arrow-col"
              aria-hidden="true"
              initial={{ opacity: 0, x: -28, scale: 0.75 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            >
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="partner-arrow-inner"
              >
                <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12H36M36 12L26 2M36 12L26 22" stroke="#FF6E30" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>

            {/* Step 3 */}
            <motion.article
              className="partner-feature-card partner-process-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -6 }}
            >
              <div className="partner-card-icon-box">
                <Users2 className="partner-coral-icon" />
              </div>
              <h3 className="partner-card-title">{processCards[2].title}</h3>
              <p className="partner-card-desc">{processCards[2].description}</p>
            </motion.article>
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

