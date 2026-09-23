import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"

export interface ProjectPreviewItem {
  image: string
  title: string
  description: string
  projectTag: string
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
    projectTag: "Project 01",
    category: "Analytics & BI",
  },
  {
    image: "/assets/e467dd.jpg",
    title: "AI Customer Copilot",
    description: "Automate responses & save 15+ hours per week.",
    projectTag: "Project 02",
    category: "AI Assistants",
  },
  {
    image: "/assets/3132a8.jpg",
    title: "Decision Engine",
    description: "Unified metrics across operations and sales.",
    projectTag: "Project 03",
    category: "Business Intelligence",
  },
  {
    image: "/assets/671883.jpg",
    title: "Mobile Ops Hub",
    description: "Streamlined workflow and team coordination.",
    projectTag: "Project 04",
    category: "Automation",
  },
  {
    image: "/assets/d5b56b.jpg",
    title: "Workflow Automation",
    description: "Automated alerts and instant synchronization.",
    projectTag: "Project 05",
    category: "Operations",
  },
]

const AUTO_SLIDE_DURATION = 4500 // 4.5 seconds per slide
const PROGRESS_STEP_INTERVAL = 30 // update progress every 30ms

export function MediaCollage({
  mainImage,
  sideImages,
  items,
  title,
  description,
}: MediaCollageProps) {
  const projectList: ProjectPreviewItem[] =
    items ||
    (mainImage
      ? [
          {
            image: mainImage,
            title: title || "Business Dashboard",
            description: description || "Built to cut decision-making time by 20%.",
            projectTag: "Project 01",
          },
          ...(sideImages || []).map((img, idx) => ({
            image: img,
            title: defaultProjectItems[idx + 1]?.title || `System ${idx + 2}`,
            description:
              defaultProjectItems[idx + 1]?.description ||
              "Intelligent systems built around real workflows.",
            projectTag: `Project 0${idx + 2}`,
          })),
        ]
      : defaultProjectItems)

  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const activeProject = projectList[activeIndex] || projectList[0]

  // Auto-play timer and smooth orange loader progression
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

  const selectProject = (index: number) => {
    const nextIndex = (index + projectList.length) % projectList.length
    setActiveIndex(nextIndex)
    setProgress(0)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      selectProject(activeIndex - 1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      selectProject(activeIndex + 1)
    }
  }

  // Get the 4 side projects in sequential order (excluding currently active project)
  const sideProjects = projectList
    .map((item, originalIndex) => ({ ...item, originalIndex }))
    .filter((_, idx) => idx !== activeIndex)

  return (
    <div
      className="project-collage-root"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      ref={trackRef}
    >
      <div className="project-gallery-layout">
        {/* Main Left Card (Rectangle 121: 461px x 461px) */}
        <div
          className="featured-project-card-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <article className="featured-dashboard-card">
            {/* Left Rail (74px wide: Project tag + Orange Vertical Loader Line) */}
            <div className="featured-left-rail">
              {/* Project Vertical Tag (e.g. Project 01) */}
              <span className="featured-project-tag">
                {activeProject.projectTag}
              </span>

              {/* Inactive Base Track Line (Line 24) */}
              <div className="featured-loader-track" aria-hidden="true">
                {/* Active Orange Loader Line (Line 25) */}
                <div
                  className="featured-loader-bar"
                  style={{ height: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>
            </div>

            {/* Right Image Area (Rectangle 122 & 123: 387px x 461px) */}
            <div className="featured-image-area">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeProject.title + activeIndex}
                  className="featured-image-inner"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="featured-dashboard-img"
                    loading="eager"
                  />
                  {/* Rectangle 123: Dark Gradient Overlay */}
                  <div className="featured-gradient-overlay" />

                  {/* Copy Overlay at bottom */}
                  <div className="featured-project-copy">
                    {activeProject.category && (
                      <span className="featured-category-badge">
                        {activeProject.category}
                      </span>
                    )}
                    <h3 className="featured-project-title">
                      {activeProject.title}
                    </h3>
                    <p className="featured-project-desc">
                      {activeProject.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </article>
        </div>

        {/* 4 Right Rectangles (Side Cards: Rectangle 97, 100, 101, 124 - 85px x 461px each) */}
        <div
          className="narrow-projects-strip"
          aria-label="Additional project previews"
        >
          {sideProjects.map((item) => (
            <motion.button
              key={`${item.image}-${item.originalIndex}`}
              type="button"
              className="narrow-project-card"
              aria-label={`Switch to ${item.title} (${item.projectTag})`}
              onClick={() => selectProject(item.originalIndex)}
              onMouseEnter={() => selectProject(item.originalIndex)}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="narrow-project-img"
                loading="lazy"
              />
              <div className="narrow-project-overlay" />

              {/* Rotated Tag at the bottom */}
              <span className="narrow-project-num">{item.projectTag}</span>

              {/* Tooltip on hover */}
              <span className="narrow-project-name-tooltip">
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Carousel Controls (Prev, Next, Dots) */}
      <div className="project-gallery-controls">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Previous project preview"
          onClick={() => selectProject(activeIndex - 1)}
          className="gallery-nav-btn"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="project-gallery-dots" aria-label="Select slide">
          {projectList.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              className={`gallery-dot ${idx === activeIndex ? "is-active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
              aria-pressed={idx === activeIndex}
              onClick={() => selectProject(idx)}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Next project preview"
          onClick={() => selectProject(activeIndex + 1)}
          className="gallery-nav-btn"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
