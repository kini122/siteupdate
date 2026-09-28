import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"

export interface ProjectPreviewItem {
  image: string
  title: string
  description: string
  label?: string
  projectTag?: string
  category?: string
}

interface MediaCollageProps {
  mainImage?: string
  sideImages?: string[]
  items?: ProjectPreviewItem[]
  title?: string
  description?: string
  label?: string
}

export const defaultProjectItems: ProjectPreviewItem[] = [
  {
    image: "/assets/4a80c6.jpg",
    title: "Business Dashboard",
    description: "Built to cut decision-making time by 20%.",
    label: "01 ANALYTICS & BI",
    projectTag: "01 ANALYTICS & BI",
    category: "Analytics & BI",
  },
  {
    image: "/assets/e467dd.jpg",
    title: "AI Customer Copilot",
    description: "Automate responses & save 15+ hours per week.",
    label: "02 AI ASSISTANTS",
    projectTag: "02 AI ASSISTANTS",
    category: "AI Assistants",
  },
  {
    image: "/assets/3132a8.jpg",
    title: "Executive Decision Engine",
    description: "Unified metrics across operations and sales.",
    label: "03 BUSINESS INTELLIGENCE",
    projectTag: "03 BUSINESS INTELLIGENCE",
    category: "Business Intelligence",
  },
  {
    image: "/assets/671883.jpg",
    title: "Mobile Ops Hub",
    description: "Streamlined workflow and team coordination.",
    label: "04 AUTOMATION & OPS",
    projectTag: "04 AUTOMATION & OPS",
    category: "Automation",
  },
  {
    image: "/assets/d5b56b.jpg",
    title: "Workflow Automation",
    description: "Automated alerts and instant synchronization.",
    label: "05 WORKFLOW SYNC",
    projectTag: "05 WORKFLOW SYNC",
    category: "Operations",
  },
  {
    image: "/assets/0c83b9.jpg",
    title: "Knowledge Research AI",
    description: "Turn scattered info into actionable briefs.",
    label: "06 ENTERPRISE AI",
    projectTag: "06 ENTERPRISE AI",
    category: "Enterprise AI",
  },
]

const AUTO_SLIDE_DURATION = 4800 // 4.8 seconds per slide
const PROGRESS_STEP_INTERVAL = 30 // update progress every 30ms

export function MediaCollage({
  mainImage,
  sideImages,
  items,
  title,
  description,
  label,
}: MediaCollageProps) {
  const projectList: ProjectPreviewItem[] =
    items ||
    (mainImage
      ? [
          {
            image: mainImage,
            title: title || "Business Dashboard",
            description: description || "Built to cut decision-making time by 20%.",
            label: label || "01 ANALYTICS & BI",
            projectTag: label || "01 ANALYTICS & BI",
          },
          ...(sideImages || []).map((img, idx) => ({
            image: img,
            title: defaultProjectItems[idx + 1]?.title || `System ${idx + 2}`,
            description:
              defaultProjectItems[idx + 1]?.description ||
              "Intelligent systems built around real workflows.",
            label: defaultProjectItems[idx + 1]?.label || `0${idx + 2} EXPANDED VIEW`,
            projectTag: defaultProjectItems[idx + 1]?.projectTag || `0${idx + 2} EXPANDED VIEW`,
          })),
        ]
      : defaultProjectItems)

  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  const selectProject = useCallback(
    (index: number) => {
      const nextIndex = (index + projectList.length) % projectList.length
      setActiveIndex(nextIndex)
      setProgress(0)
    },
    [projectList.length]
  )

  // Auto-scroll track when active tab changes on mobile/overflowing screens
  useEffect(() => {
    const activeEl = tabRefs.current[activeIndex]
    const trackEl = trackRef.current
    if (activeEl && trackEl) {
      const isOverflowing = trackEl.scrollWidth > trackEl.clientWidth + 10
      if (isOverflowing) {
        // Calculate offset to center active element with neighboring collapsed tabs visible
        const trackRect = trackEl.getBoundingClientRect()
        const elRect = activeEl.getBoundingClientRect()
        const scrollLeftOffset =
          trackEl.scrollLeft +
          (elRect.left - trackRect.left) -
          (trackEl.clientWidth / 2 - elRect.width / 2)

        trackEl.scrollTo({
          left: Math.max(0, scrollLeftOffset),
          behavior: "smooth",
        })
      }
    }
  }, [activeIndex])

  // Auto-play timer with progress bar
  useEffect(() => {
    if (isPaused || projectList.length <= 1) return

    const progressIncrement = (PROGRESS_STEP_INTERVAL / AUTO_SLIDE_DURATION) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((currentIdx) => (currentIdx + 1) % projectList.length)
          return 0
        }
        return prev + progressIncrement
      })
    }, PROGRESS_STEP_INTERVAL)

    return () => clearInterval(timer)
  }, [isPaused, projectList.length, activeIndex])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      selectProject(activeIndex - 1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      selectProject(activeIndex + 1)
    }
    if (event.key === "Home") {
      event.preventDefault()
      selectProject(0)
    }
    if (event.key === "End") {
      event.preventDefault()
      selectProject(projectList.length - 1)
    }
  }

  return (
    <div
      className="project-collage-root"
      role="region"
      aria-roledescription="carousel"
      aria-label="Interactive project and service showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Horizontal In-Place Expanding Accordion Track */}
      <div
        className="project-accordion-track"
        ref={trackRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {projectList.map((item, idx) => {
          const isExpanded = idx === activeIndex
          const itemLabel =
            item.label ||
            item.projectTag ||
            `0${idx + 1} ${(item.category || item.title || "SYSTEM").toUpperCase()}`

          if (isExpanded) {
            return (
              <article
                key={`tab-${idx}-${item.title}`}
                ref={(el) => {
                  tabRefs.current[idx] = el
                }}
                className="project-accordion-tab is-expanded"
                role="tabpanel"
                aria-label={`Expanded view: ${item.title}`}
                aria-selected={true}
              >
                <div className="tab-expanded-card">
                  {/* Left Rail (Label + Vertical Orange Progress Line) */}
                  <div className="tab-left-rail">
                    <span className="tab-rail-label">{itemLabel}</span>
                    <div className="tab-rail-track" aria-hidden="true">
                      <div
                        className="tab-rail-progress"
                        style={{ height: `${Math.min(100, Math.max(0, progress))}%` }}
                      />
                    </div>
                  </div>

                  {/* Right Image & Content Area */}
                  <div className="tab-image-area">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`img-${item.title}-${idx}`}
                        className="tab-image-inner"
                        initial={{ opacity: 0.85, scale: 0.99 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.85 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="tab-image-cover"
                          loading="eager"
                        />
                        {/* Dark Gradient Overlay for optimal contrast */}
                        <div className="tab-gradient-overlay" />

                        {/* Title & Description Overlay */}
                        <div className="tab-content-overlay">
                          {item.category && (
                            <span className="tab-category-badge">
                              {item.category}
                            </span>
                          )}
                          <h3 className="tab-title">{item.title}</h3>
                          <p className="tab-desc">{item.description}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </article>
            )
          }

          // Collapsed Slim Vertical Tab
          return (
            <button
              key={`tab-${idx}-${item.title}`}
              ref={(el) => {
                tabRefs.current[idx] = el
              }}
              type="button"
              className="project-accordion-tab is-collapsed"
              role="tab"
              aria-label={`Open tab: ${item.title} (${itemLabel})`}
              aria-selected={false}
              onClick={() => selectProject(idx)}
              onMouseEnter={() => {
                // Desktop hover-to-expand
                selectProject(idx)
              }}
              onFocus={() => selectProject(idx)}
            >
              <div className="tab-collapsed-pill">
                <span className="tab-collapsed-label">{itemLabel}</span>
                <span className="tab-collapsed-tooltip">{item.title}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Pagination Controls & Indicator Dots matching reference */}
      <div className="project-gallery-controls">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Previous project tab"
          onClick={() => selectProject(activeIndex - 1)}
          className="gallery-nav-btn"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="project-gallery-dots" aria-label="Select project slide">
          {projectList.map((item, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              className={`gallery-dot ${idx === activeIndex ? "is-active" : ""}`}
              aria-label={`Go to ${item.label || item.title}`}
              aria-pressed={idx === activeIndex}
              onClick={() => selectProject(idx)}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Next project tab"
          onClick={() => selectProject(activeIndex + 1)}
          className="gallery-nav-btn"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
