import { Rocket } from "lucide-react"
import { motion } from "motion/react"

export interface ServiceSolutionItem {
  title: string
  description: string
  icon?: string
}

interface ServiceSolutionGridProps {
  heading?: string
  cards: ServiceSolutionItem[]
  className?: string
}

export function ServiceSolutionGrid({
  heading = "We build the systems that make your data useful.",
  cards,
  className = "",
}: ServiceSolutionGridProps) {
  return (
    <section className={`service-solution-section ${className}`} id="solutions" aria-label="The Solution">
      <div className="site-container">
        {/* The Solution Eyebrow */}
        <div className="service-solution-eyebrow-wrap">
          <motion.div
            className="service-solution-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span>The Solution</span>
          </motion.div>
        </div>

        {/* Section Heading */}
        <motion.h2
          className="service-solution-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {heading}
        </motion.h2>

        {/* 4 Cards Grid (Rectangle 109, 123, 124, 125) */}
        <div className="service-solution-grid">
          {cards.map((card, idx) => (
            <motion.article
              key={card.title}
              className={`service-solution-card service-solution-card--${idx + 1}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: 0.12 + idx * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              {/* Icon Box (Rectangle 131-134, 64px x 64px, #F8F7F5) */}
              <div className="solution-card-icon-box">
                <Rocket
                  className="solution-card-rocket-icon"
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </div>

              {/* Title (IBM Plex Sans, 23px, #000000) */}
              <h3 className="solution-card-title">{card.title}</h3>

              {/* Description (DM Sans, 21px, #757575) */}
              <p className="solution-card-desc">{card.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
