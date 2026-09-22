import { motion } from "motion/react"

import type { FeatureCardData } from "@/types/site"

interface FeatureCardProps {
  card: FeatureCardData
  delay?: number
}

export function FeatureCard({ card, delay = 0 }: FeatureCardProps) {
  return (
    <motion.article className="feature-card" tabIndex={0} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay, duration: 0.5 }} whileHover={{ y: -6 }} whileFocus={{ y: -4 }}>
      <img src={card.icon} alt="" aria-hidden="true" />
      <h3>{card.title}</h3>
      <p>{card.description}</p>
    </motion.article>
  )
}
