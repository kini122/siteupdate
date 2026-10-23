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
import { SeoHead } from "@/components/seo/SeoHead"
import { teamMembers } from "@/data/siteContent"
import { TEMPORARY_SECTION_VISIBILITY } from "@/config/visibility"

export function AboutPage() {
  return (
    <div className="about-page-root">
      <SeoHead
        title="About Kozker — AI Systems Development & Custom AI Solutions"
        description="Learn about Kozker's AI systems development. We build custom AI solutions, intelligent systems built around yours, and custom AI layers that integrate into daily operations."
        keywords={[
          "AI systems development",
          "custom AI solutions development",
          "Custom AI layer",
          "AI integration layer",
          "Intelligent systems built around yours",
          "Custom AI systems for business",
          "Augment existing software with AI",
          "Extend existing systems with AI",
          "Tailored AI systems for service companies",
          "Agentic-AI Systems For Your Existing Systems",
        ]}
        canonicalPath="/about"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              name: "About Kozker",
              url: "https://kozker.com/about",
              description: "Our startup is young, our experience isn't. We engineer custom, interconnected systems that fit into daily operations from day one.",
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Kozker's Vision?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Make advanced technology more accessible and useful to the businesses that need it. We envision an operating standard where data intelligence, private assistants, and workflow automation are practical tools lean teams use every day.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is Kozker's Mission?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Build systems that help people spend less time searching and more time deciding. We engineer dependable, low-overhead software layers that integrate directly into existing stacks.",
                  },
                },
              ],
            },
          ],
        }}
      />
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
            We are on a mission to advance custom AI solutions development and AI systems development, engineering intelligent systems built around yours to help businesses scale.
          </motion.p>
        </div>

        {/* Hero Team Image (Temporarily hidden - restore in src/config/visibility.ts) */}
        {TEMPORARY_SECTION_VISIBILITY.aboutHeroTeamImage && (
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
        )}
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="site-container">
          <div className="story-header">
            <h2>
              Our Story<span className="accent-dot">.</span>
            </h2>
          </div>
          <div className="story-grid">
            <div className="story-copy">
              <p>
                Founded in 2024, KozkerTech is the technology division of Kozker, a
                brand established in 2022. We began with a simple vision: to make
                advanced technology accessible to businesses of all sizes.
              </p>
              <p>
                Too many growing companies get caught between off-the-shelf software
                that doesn&apos;t fit their workflows and enterprise systems that cost too
                much to build and maintain. We bridge that divide through custom AI solutions development—delivering a custom AI layer and custom AI systems for business that fit into daily operations from day one.
              </p>
              <p className="story-highlight">
                Our startup is young, our experience isn&apos;t.
              </p>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["vision", "mission"]}
              className="story-accordion"
              aria-label="Our story details"
            >
              <AccordionItem value="vision">
                <AccordionTrigger>
                  <span className="faq-number">01</span>
                  <span className="faq-question-text">THE VISION</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Make advanced technology more accessible and useful to the businesses
                    that need it.
                  </p>
                  <p>
                    We envision an operating standard where custom AI systems for business, AI automation, and intelligent systems built around yours aren&apos;t exclusive to massive tech enterprises, but practical tools that lean teams use every day to outpace operational friction and scale confidently.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mission">
                <AccordionTrigger>
                  <span className="faq-number">02</span>
                  <span className="faq-question-text">OUR MISSION</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Build systems that help people spend less time searching and more
                    time deciding.
                  </p>
                  <p>
                    We engineer dependable, low-overhead software layers and an AI integration layer to augment existing software with AI—eliminating repetitive manual work, automating reporting, and giving operators clear, reliable visibility that compounds over time.
                  </p>
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
            <div className="founder-photo-frame">
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
                “Running a business shouldn&apos;t feel like wrestling with your own software every single day. We built Kozker to bring data from across your entire operation into one clear, honest view—so your team stops drowning in tabs, and spends less time searching and more time deciding.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (Temporarily hidden - restore in src/config/visibility.ts) */}
      {TEMPORARY_SECTION_VISIBILITY.aboutTeamSection && (
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
      )}

      {/* What We Build Band */}
      <section className="what-build-band">
        <div className="site-container what-build-grid">
          <div className="what-build-copy">
            <span className="mono-label">WHAT WE BUILD</span>
            <h2>From business problems to useful technology.</h2>
            <p>
              We specialize in AI systems development and intelligent systems built around yours, deploying a tailored AI integration layer to extend existing systems with AI without operational disruption.
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
