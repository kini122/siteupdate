import { motion } from "motion/react"

export interface WorkStep {
  number: string
  title: string
  headline: string
  description: string
  progress: number
}

export const workSteps: WorkStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    headline: "Understand the core problem.",
    description: "Map the workflows, pain points, and opportunities behind your business operations.",
    progress: 0.25,
  },
  {
    number: "02",
    title: "DESIGN",
    headline: "Architect the solution.",
    description: "Shape a practical, intuitive system built around how your team actually works.",
    progress: 0.5,
  },
  {
    number: "03",
    title: "BUILD",
    headline: "Ship fast, iterate often.",
    description: "Ship a useful first version rapidly and make it an effortless part of daily operations.",
    progress: 0.75,
  },
  {
    number: "04",
    title: "EVOLVE",
    headline: "Improve with data.",
    description: "Measure what works, refine the system, and help it evolve with your business.",
    progress: 1.0,
  },
]

function ProcessProgressBar({ progress }: { progress: number }) {
  return (
    <div className="process-progress-track" aria-hidden="true">
      <svg
        className="process-progress-svg"
        viewBox="0 0 16 400"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Inactive Base Track */}
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="400"
          stroke="#eeeadc"
          strokeWidth="2.75"
          strokeLinecap="round"
        />

        {/* Animated Active Orange Progress Line */}
        <motion.line
          x1="8"
          y1="0"
          x2="8"
          y2={400 * progress}
          stroke="#FF6E30"
          strokeWidth="3.25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.85,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Animated Indicator Node Circle */}
        <motion.circle
          cx="8"
          cy={Math.max(14, Math.min(386, 400 * progress))}
          r="6"
          fill="#FF6E30"
          stroke="#fffefb"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: 0.45,
            delay: 0.3 + progress * 0.15,
            ease: "backOut",
          }}
        />
      </svg>
    </div>
  )
}

export function ProcessStack() {
  return (
    <div className="process-stack-scroll-wrapper" aria-label="Process steps stack">
      {workSteps.map((step, index) => (
        <motion.article
          key={step.number}
          className="process-card process-card--stacked"
          style={{
            top: `calc(100px + ${index * 20}px)`,
            zIndex: index + 1,
          }}
          initial={{ opacity: 0.4, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Progressive Accent Progress Bar (fills 25%, 50%, 75%, 100% progressively) */}
          <ProcessProgressBar progress={step.progress} />

          {/* Step Metadata Header */}
          <div className="process-card-header">
            <div className="process-meta">
              <span className="process-num">{step.number}</span>
              <span className="process-title-tag">{step.title}</span>
            </div>
          </div>

          {/* Headline and Description */}
          <h3 className="process-headline">{step.headline}</h3>
          <p className="process-description">{step.description}</p>
        </motion.article>
      ))}
    </div>
  )
}


