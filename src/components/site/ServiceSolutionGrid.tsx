import {
  Activity,
  BellRing,
  Bot,
  BrainCircuit,
  Cable,
  Code2,
  FileSpreadsheet,
  LayoutDashboard,
  Network,
  Share2,
  Sparkles,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react"
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

// Strictly context-related emblem mapping for each card across the 3 services
const contextIconMap: Record<string, LucideIcon> = {
  // Service 1: Data Analytics & Business Intelligence
  "Performance Dashboards": LayoutDashboard,
  "Automated Reporting": FileSpreadsheet,
  "Connected Data Models": Network,
  "Operational Analytics": Activity,

  // Service 2: AI Chatbots & Knowledge Systems
  "Customer Support AI": Bot,
  "Internal Knowledge Copilots": BrainCircuit,
  "Lead Qualification Bots": Target,
  "Multi-Channel AI": Share2,

  // Service 3: Workflow Automation
  "Workflow Automation": Workflow,
  "System Integrations": Cable,
  "Operational Alerts": BellRing,
  "Custom API Pipelines": Code2,
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
          {cards.map((card, idx) => {
            const IconComponent = contextIconMap[card.title] || Sparkles

            return (
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
                {/* Icon Box with Less Stroke Width & Minimal Appear Animation */}
                <div className="solution-card-icon-box">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + idx * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="solution-card-emblem-wrap"
                  >
                    <IconComponent
                      className="solution-card-emblem-icon"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>

                {/* Title (IBM Plex Sans, 23px, #000000) */}
                <h3 className="solution-card-title">{card.title}</h3>

                {/* Description (DM Sans, 21px, #757575) */}
                <p className="solution-card-desc">{card.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
