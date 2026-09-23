import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ServiceTab, SolutionPanel } from "@/types/site"

interface SolutionTabsProps {
  panels: Record<ServiceTab, SolutionPanel>
  showComparisons?: boolean
  className?: string
}

const toolNames: Record<string, string> = {
  "53cb26.png": "Microsoft Power BI",
  "0c5d97.png": "Python Coding Editor & IDE App",
  "57de97.png": "SQL Playground",
  "e8263c.png": "API Requester - HTTP Client",
}

interface AnimatedStrikeProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedStrike({ children, className = "", delay = 0.3 }: AnimatedStrikeProps) {
  return (
    <span className={`data-cross ${className}`}>
      <span className="data-cross-text">{children}</span>
      <motion.span
        className="strike-line"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] }}
        aria-hidden="true"
      />
    </span>
  )
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
              <AnimatedStrike delay={0.35}>{panel.title}</AnimatedStrike>
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
              {panel.comparisons.map((comparison, idx) => (
                <motion.div
                  key={comparison.from}
                  className="shift-grid-cell"
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                >
                  <h3 className="comparison-cell-title">
                    <AnimatedStrike delay={0.25 + idx * 0.08}>
                      {comparison.from}
                    </AnimatedStrike>{" "}
                    → <strong>{comparison.to}</strong>
                  </h3>
                  <p className="comparison-cell-copy">{comparison.copy}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="shift-panel-card"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* Image 6 - Flow Diagram Illustration (422.34px x 261.21px) */}
              <div className="shift-panel-image-wrap">
                <motion.img
                  src={panel.heroImage}
                  alt={`${panel.id} system flow diagram`}
                  className="shift-panel-flow-img"
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                />
              </div>

              {/* Tool Stack Label + Tree Connector + 4 Icons */}
              <div className="tool-stack-vertical-group">
                {/* Rotated "Tool Stack" Column (DM Sans, 17px, rotate -90deg) */}
                <div className="tool-stack-label-col">
                  <span className="tool-stack-rotated-text">
                    Tool Stack
                  </span>
                </div>

                {/* Tree Connector Diagram (Vectors 6, 7, 8, 9, 10 - border 1.71px solid #C1BEB5) */}
                <div className="tool-stack-connector-wrap">
                  <svg
                    viewBox="0 0 26 228.24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="tool-stack-connector-svg"
                    aria-hidden="true"
                  >
                    {/* Horizontal stem coming from label (Vector 10) */}
                    <motion.path
                      d="M 0 114.12 H 10"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    />
                    {/* Vertical spine (Vectors 6 & 7) */}
                    <motion.path
                      d="M 10 20.5 V 207.7"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                    {/* Branch 1 to Icon 1 (Vector 6 top spur) */}
                    <motion.path
                      d="M 10 20.5 H 26"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.25 }}
                    />
                    {/* Branch 2 to Icon 2 (Vector 9 spur) */}
                    <motion.path
                      d="M 10 82.9 H 26"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.3 }}
                    />
                    {/* Branch 3 to Icon 3 (Vector 8 spur) */}
                    <motion.path
                      d="M 10 145.3 H 26"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.35 }}
                    />
                    {/* Branch 4 to Icon 4 (Vector 7 bottom spur) */}
                    <motion.path
                      d="M 10 207.7 H 26"
                      stroke="#C1BEB5"
                      strokeWidth="1.70857"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.4 }}
                    />
                  </svg>
                </div>

                {/* 4 Tool Stack Icons (41.01px x 41.01px) */}
                <div className="tool-stack-icon-stack">
                  {panel.stackIcons.map((icon, idx) => {
                    const fileName = icon.split("/").pop() || ""
                    const name = toolNames[fileName] || "Technology"
                    return (
                      <motion.div
                        key={icon}
                        className="tool-stack-icon-wrap"
                        initial={{ opacity: 0, scale: 0.7, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.22 + idx * 0.07,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        whileHover={{
                          scale: 1.15,
                          y: -2,
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)",
                        }}
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
    </div>
  )
}
