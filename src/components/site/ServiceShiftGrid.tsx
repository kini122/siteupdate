import { motion } from "motion/react"

import { AnimatedStrike } from "@/components/site/SolutionTabs"

export interface ComparisonItem {
  from: string
  to: string
  copy: string
}

interface ServiceShiftGridProps {
  heading?: string
  comparisons: ComparisonItem[]
  className?: string
}

export function ServiceShiftGrid({
  heading = "Turn your Data into Decisions.",
  comparisons,
  className = "",
}: ServiceShiftGridProps) {
  return (
    <section className={`service-shift-section ${className}`} aria-label="The Shift">
      <div className="site-container">
        {/* Frame 33 - The Shift Eyebrow */}
        <div className="service-shift-eyebrow-wrap">
          <motion.div
            className="service-shift-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span>The Shift</span>
          </motion.div>
        </div>

        {/* Section Heading */}
        <motion.h2
          className="service-shift-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {heading}
        </motion.h2>

        {/* Rectangle 106 - 2x2 Comparison Card */}
        <motion.div
          className="service-shift-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Horizontal Divider Line 17 */}
          <div className="shift-card-divider-h" aria-hidden="true" />

          {/* Vertical Divider Line 36 */}
          <div className="shift-card-divider-v" aria-hidden="true" />

          {/* 4 Comparison Cells */}
          {comparisons.map((item, idx) => (
            <motion.div
              key={item.from}
              className={`shift-card-cell shift-card-cell--${idx + 1}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
            >
              <h3 className="shift-card-title">
                <AnimatedStrike delay={0.3 + idx * 0.08}>{item.from}</AnimatedStrike>
                <span className="shift-card-arrow"> → </span>
                <strong className="shift-card-to">{item.to}</strong>
              </h3>
              <p className="shift-card-copy">{item.copy}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
