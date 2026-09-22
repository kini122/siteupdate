import type { ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export function SectionReveal({ children, className, delay = 0, y = 22 }: SectionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
