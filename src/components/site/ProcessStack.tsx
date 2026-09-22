import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface WorkStep {
  number: string
  title: string
  headline: string
  description: string
}

export const workSteps: WorkStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    headline: "Understand the core problem.",
    description: "Map the workflows, pain points, and opportunities behind your business operations.",
  },
  {
    number: "02",
    title: "DESIGN",
    headline: "Architect the solution.",
    description: "Shape a practical, intuitive system built around how your team actually works.",
  },
  {
    number: "03",
    title: "BUILD",
    headline: "Ship fast, iterate often.",
    description: "Ship a useful first version rapidly and make it an effortless part of daily operations.",
  },
  {
    number: "04",
    title: "EVOLVE",
    headline: "Improve with data.",
    description: "Measure what works, refine the system, and help it evolve with your business.",
  },
]

export function ProcessStack() {
  const [currentStepIndex, setCurrentStepIndex] = useState(3) // default to step 04 EVOLVE as in design
  const currentStep = workSteps[currentStepIndex]

  const nextStep = () => {
    setCurrentStepIndex((prev) => (prev + 1) % workSteps.length)
  }

  const prevStep = () => {
    setCurrentStepIndex((prev) => (prev - 1 + workSteps.length) % workSteps.length)
  }

  return (
    <div className="process-stack-container">
      {/* Interactive Step Selector Tabs */}
      <div className="process-step-tabs" role="tablist" aria-label="Process steps">
        {workSteps.map((step, index) => {
          const isActive = index === currentStepIndex
          return (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`process-step-tab ${isActive ? "is-active" : ""}`}
              onClick={() => setCurrentStepIndex(index)}
            >
              <span className="step-tab-num">{step.number}</span>
              <span className="step-tab-title">{step.title}</span>
            </button>
          )
        })}
      </div>

      {/* Layered Card Stack Shell */}
      <div className="process-layers-wrapper">
        {/* Visual Stack Layers Behind */}
        <div className="work-layers" aria-hidden="true">
          <div
            className="work-layer one"
            onClick={prevStep}
            title="Click to view previous step"
          />
          <div
            className="work-layer two"
            onClick={prevStep}
            title="Click to view previous step"
          />
          <div
            className="work-layer three"
            onClick={nextStep}
            title="Click to view next step"
          />
        </div>

        {/* Active Animated Process Card */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={currentStep.number}
            className="process-card"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Vertical Accent Graphic */}
            <img
              src="/assets/440648.svg"
              alt=""
              aria-hidden="true"
              className="process-accent-bar"
            />

            {/* Step Metadata & Navigation Controls */}
            <div className="process-card-header">
              <div className="process-meta">
                <span className="process-num">{currentStep.number}</span>
                <span className="process-title-tag">{currentStep.title}</span>
              </div>
              <div className="process-nav-buttons">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Previous process step"
                  onClick={prevStep}
                  className="process-arrow-btn"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <span className="process-counter-indicator">
                  {currentStepIndex + 1} / {workSteps.length}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label="Next process step"
                  onClick={nextStep}
                  className="process-arrow-btn"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Headline and Description */}
            <h3 className="process-headline">{currentStep.headline}</h3>
            <p className="process-description">{currentStep.description}</p>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
