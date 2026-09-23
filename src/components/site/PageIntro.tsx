import type { ReactNode } from "react"
import { motion } from "motion/react"

interface PageIntroProps {
  eyebrow?: string
  title: ReactNode
  description: string
  compact?: boolean
}

export function PageIntro({ eyebrow, title, description, compact = true }: PageIntroProps) {
  return (
    <section className={`page-hero ${compact ? "page-hero--compact" : ""}`}>
      <div className="site-container">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="eyebrow">{eyebrow}</span>
          </motion.div>
        )}
        <motion.h1
          className="display-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="hero-copy"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
