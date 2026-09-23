import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "motion/react"

export interface ProcessStepItem {
  num: string
  label: string
  copy: string
}

interface ServiceProcessTimelineProps {
  heading?: string
  steps: ProcessStepItem[]
  className?: string
}

export function ServiceProcessTimeline({
  heading = "How we bring your systems to life.",
  steps,
  className = "",
}: ServiceProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  })

  // Smooth spring physics for loader line
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Transform progress to percentage height
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <section className={`service-process-section ${className}`} ref={containerRef} aria-label="The Process">
      <div className="site-container">
        {/* Frame 43 - The Process Eyebrow */}
        <div className="service-process-eyebrow-wrap">
          <motion.div
            className="service-process-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span>The Process</span>
          </motion.div>
        </div>

        {/* Section Heading */}
        <motion.h2
          className="service-process-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          {heading}
        </motion.h2>

        {/* Timeline Shell */}
        <div className="service-process-timeline-shell">
          {/* Left Vertical Progress Rail with Animated Orange Loader */}
          <div className="process-rail-container" aria-hidden="true">
            {/* Inactive Background Rail Track (Vector 31: #D1CEC7) */}
            <div className="process-rail-bg-track" />

            {/* Active Animated Orange Loader Bar (Vectors 24, 27, 29: #FF6E30, 5px) */}
            <motion.div
              className="process-rail-active-bar"
              style={{ height: lineHeight }}
            />

            {/* Node Markers at 4 step positions (Vectors 25, 26, 28, 30) */}
            {steps.map((_, idx) => {
              const nodeThreshold = idx / (steps.length - 1 || 1)
              return (
                <ProcessNodeMarker
                  key={idx}
                  index={idx}
                  total={steps.length}
                  threshold={nodeThreshold}
                  progress={smoothProgress}
                />
              )
            })}
          </div>

          {/* Right Side 4 Step Rows */}
          <div className="process-steps-list">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num + step.label}
                className={`process-step-row process-step-row--${idx + 1}`}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
              >
                {/* Step Number (JetBrains Mono, 21.28px, #C4C0B8) */}
                <span className="process-step-num">{step.num}</span>

                {/* Step Content Group */}
                <div className="process-step-body">
                  {/* Step Label (DM Sans, 24.55px, #5A5651) */}
                  <h3 className="process-step-label">{step.label}</h3>

                  {/* Step Copy (DM Sans, 20.06px, #757575) */}
                  <p className="process-step-copy">{step.copy}</p>
                </div>

                {/* Horizontal Divider Line (Lines 42, 43, 44: #EEEADC) */}
                {idx < steps.length - 1 && (
                  <div className="process-step-divider" aria-hidden="true" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProcessNodeMarkerProps {
  index: number
  total: number
  threshold: number
  progress: any
}

function ProcessNodeMarker({ index, total, threshold, progress }: ProcessNodeMarkerProps) {
  const topPercent = `${(index / (total - 1 || 1)) * 100}%`

  // Scale and glow color when reached
  const isReached = useTransform(progress, (v: number) => v >= threshold - 0.05)

  return (
    <motion.div
      className="process-node-marker"
      style={{ top: topPercent }}
      animate={isReached ? "active" : "inactive"}
    >
      <motion.div
        className="process-node-dot"
        variants={{
          inactive: {
            borderColor: "#D1CEC7",
            backgroundColor: "#FFFFFF",
            scale: 1,
            boxShadow: "none",
          },
          active: {
            borderColor: "#FF6E30",
            backgroundColor: "#FF6E30",
            scale: 1.18,
            boxShadow: "0 0 12px rgba(255, 110, 48, 0.45)",
          },
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
