import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { SectionReveal } from "@/components/site/SectionReveal"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ServiceTab, SolutionPanel } from "@/types/site"

interface SolutionTabsProps {
  panels: Record<ServiceTab, SolutionPanel>
  showComparisons?: boolean
  className?: string
}

const toolNames: Record<string, string> = {
  "53cb26.png": "Power BI",
  "0c5d97.png": "Python",
  "57de97.png": "SQL",
  "e8263c.png": "REST APIs",
}

export function SolutionTabs({
  panels,
  showComparisons = false,
  className = "",
}: SolutionTabsProps) {
  const [activeTab, setActiveTab] = useState<ServiceTab>("Data & BI")
  const panel = panels[activeTab]
  const tabKeys = Object.keys(panels) as ServiceTab[]
  const tabIndex = tabKeys.indexOf(activeTab) + 1

  return (
    <div className={`solution-tabs-root ${className}`}>
      {/* Pills Container */}
      <div className="shift-tabs-container">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ServiceTab)}
          aria-label="Solution categories"
          className="items-center justify-center"
        >
          <TabsList className="shift-tabs-pill">
            {tabKeys.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="shift-tab-button"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={panel.id}
          className={`shift-content-layout ${
            showComparisons ? "shift-content--comparisons" : ""
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {/* Left Column Copy */}
          <div className="shift-copy-column">
            <div className="mono-step-count">
              {String(tabIndex).padStart(2, "0")} / {String(tabKeys.length).padStart(2, "0")}
            </div>
            <div className="shift-category-label">{panel.label}</div>

            {/* Crossed out transform heading */}
            <h3 className="shift-transform-title">
              <span className="data-cross">{panel.title}</span>
              <br />
              <em className="transform-to-italic">to</em>{" "}
              <span className="transform-lead">{panel.lead}</span>
            </h3>

            <p className="shift-body-copy">{panel.copy}</p>

            <div className="shift-builds-wrap">
              <h4 className="shift-builds-title">We build</h4>
              <ul className="shift-builds-list">
                {panel.builds.map((build) => (
                  <motion.li
                    key={build}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {build}
                  </motion.li>
                ))}
              </ul>
            </div>

            <a className="solution-action-link" href="#contact">
              {panel.actionLabel} <span className="arrow-hover">→</span>
            </a>
          </div>

          {/* Right Column Visual / Comparisons */}
          {showComparisons ? (
            <div className="shift-grid-card">
              {panel.comparisons.map((comparison) => (
                <motion.div
                  key={comparison.from}
                  className="shift-grid-cell"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="comparison-cell-title">
                    <span className="data-cross">{comparison.from}</span> →{" "}
                    <strong>{comparison.to}</strong>
                  </h3>
                  <p className="comparison-cell-copy">{comparison.copy}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="shift-panel-card"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="shift-panel-image-wrap">
                <img
                  src={panel.heroImage}
                  alt={`${panel.id} system diagram and flow`}
                  className="shift-panel-flow-img"
                  loading="lazy"
                />
              </div>

              {/* Tool Stack Connector and Icons */}
              <div className="tool-stack-vertical-group">
                <span className="tool-stack-rotated-label">Tool Stack</span>
                <img
                  src="/assets/fb7ae4.svg"
                  alt=""
                  aria-hidden="true"
                  className="tool-stack-connector-svg"
                  loading="lazy"
                />
                <div className="tool-stack-icon-stack">
                  {panel.stackIcons.map((icon) => {
                    const fileName = icon.split("/").pop() || ""
                    const name = toolNames[fileName] || "Technology"
                    return (
                      <motion.div
                        key={icon}
                        className="tool-stack-icon-wrap"
                        whileHover={{ scale: 1.15, y: -2 }}
                        transition={{ duration: 0.18 }}
                        title={name}
                      >
                        <img
                          src={icon}
                          alt={name}
                          className="tool-stack-img"
                          loading="lazy"
                        />
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {!showComparisons && (
        <SectionReveal className="solution-tabs-help" y={10}>
          <span>Choose a focus to see how Kozker transforms systems.</span>
        </SectionReveal>
      )}
    </div>
  )
}
