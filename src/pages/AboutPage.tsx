import { motion } from "motion/react"
import { Link } from "@tanstack/react-router"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { CtaBand } from "@/components/site/CtaBand"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { teamMembers } from "@/data/siteContent"

export function AboutPage() {
  return (
    <div className="about-page-root">
      {/* Editorial Hero */}
      <section className="page-hero editorial-hero" aria-labelledby="about-title">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">About Us</span>
          </motion.div>
          <motion.h1
            id="about-title"
            className="display-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming Businesses
            <br />
            Through <span className="accent-text">Technology</span>
            <span className="accent-dot">.</span>
          </motion.h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We&apos;re on a mission to help businesses leverage cutting-edge technology to
            grow, innovate, and succeed in the digital age.
          </motion.p>
        </div>

        <div className="site-container">
          <motion.div
            className="image-frame about-hero-image"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <img
              src="/assets/887522.png"
              alt="Kozker team working together"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="site-container">
          <div className="story-grid">
            <div className="story-copy">
              <h2>
                Our Story<span className="accent-dot">.</span>
              </h2>
              <p>
                Founded in 2024, KozkerTech is the technology division of Kozker, a
                brand established in 2022. We began with a simple vision: to make
                advanced technology accessible to businesses of all sizes.
              </p>
              <p className="story-highlight">
                Our startup is young, our experience isn&apos;t.
              </p>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="vision"
              className="story-accordion"
              aria-label="Our story details"
            >
              <AccordionItem value="vision">
                <AccordionTrigger>
                  <span className="faq-number">01</span>
                  <span className="faq-question-text">THE VISION</span>
                </AccordionTrigger>
                <AccordionContent>
                  Make advanced technology more accessible and useful to the businesses
                  that need it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mission">
                <AccordionTrigger>
                  <span className="faq-number">02</span>
                  <span className="faq-question-text">OUR MISSION</span>
                </AccordionTrigger>
                <AccordionContent>
                  Build systems that help people spend less time searching and more
                  time deciding.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>

          <SectionReveal className="quote-block">
            <img src="/assets/ff53c8.svg" alt="" aria-hidden="true" />
            <blockquote>
              “Technology should make business simpler, not more complicated.”
            </blockquote>
          </SectionReveal>

          <div className="founder-row">
            <div className="image-frame founder-spotlight-img">
              <img
                src="/assets/642e0f.png"
                alt="Govind Bhat, Founder of Kozker"
                loading="lazy"
              />
            </div>
            <div className="founder-copy">
              <h3>Govind Bhat</h3>
              <div className="role">Founder of Kozker</div>
              <p>
                “Bring data from across your business into one clear view, so teams
                spend less time searching and more time deciding.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="site-container">
          <SectionReveal className="team-intro">
            <h2>
              The Team<span className="accent-dot">.</span>
            </h2>
            <p className="muted-copy">
              We&apos;re on a mission to help businesses leverage cutting-edge
              technology to grow, innovate, and succeed in the digital age.
            </p>
          </SectionReveal>
          <div className="team-grid">
            {teamMembers.map((member, idx) => (
              <motion.article
                key={`${member.id}-${idx}`}
                className="team-card group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div className="image-frame">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build Band */}
      <section className="what-build-band">
        <div className="site-container what-build-grid">
          <div className="what-build-copy">
            <span className="mono-label">WHAT WE BUILD</span>
            <h2>From business problems to useful technology.</h2>
            <p>
              Founded in 2024, KozkerTech is the technology division of Kozker, a
              brand established in 2022. We began with a simple vision: to make
              advanced technology accessible to businesses of all sizes.
            </p>
          </div>
          <div className="what-build-links">
            <Link className="dark-outline-link" to="/work">
              WORK
            </Link>
            <Link className="dark-outline-link" to="/products">
              PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <CtaBand />

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
