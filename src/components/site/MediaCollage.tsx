import { useRef, useState } from "react"
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

const defaultProjectItems: ProjectPreviewItem[] = [
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
    image: "/assets/4a80c6.jpg",
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
    image: "/assets/671883.jpg",
    title: "Workflow Automation",
    description: "Automated alerts and instant synchronization.",
    projectTag: "Project 05",
    category: "Operations",
  },
]

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
            title: defaultProjectItems[idx + 1]?.title || `System System ${idx + 2}`,
            description:
              defaultProjectItems[idx + 1]?.description ||
              "Intelligent systems built around real workflows.",
            projectTag: `Project 0${idx + 2}`,
          })),
        ]
      : defaultProjectItems)

  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const activeProject = projectList[activeIndex] || projectList[0]

  const selectPreview = (index: number) => {
    const nextIndex = (index + projectList.length) % projectList.length
    setActiveIndex(nextIndex)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      selectPreview(activeIndex - 1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      selectPreview(activeIndex + 1)
    }
  }

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
        {/* Featured Left Card */}
        <div className="featured-project-card-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeProject.image + activeIndex}
              className="featured-dashboard-card group"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="featured-dashboard-img"
                loading="eager"
              />
              <div className="featured-gradient-overlay" />

              {/* Vertical Accent Bar */}
              <img
                src="/assets/440648.svg"
                alt=""
                aria-hidden="true"
                className="featured-accent-bar"
              />

              {/* Project Vertical Tag */}
              <span className="featured-project-tag">
                {activeProject.projectTag}
              </span>

              {/* Featured Project Copy */}
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
            </motion.article>
          </AnimatePresence>
        </div>

        {/* Vertical Slices Strip on the Right */}
        <div
          className="narrow-projects-strip"
          aria-label="Additional project previews"
        >
          {projectList.map((item, idx) => {
            const isActive = idx === activeIndex
            return (
              <motion.button
                key={`${item.image}-${idx}`}
                type="button"
                className={`narrow-project-card ${isActive ? "is-active" : ""}`}
                aria-label={`Select ${item.title} (${item.projectTag})`}
                aria-pressed={isActive}
                onClick={() => selectPreview(idx)}
                whileHover={{ y: -6, scale: 1.03 }}
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
                <span className="narrow-project-num">{item.projectTag}</span>
                <span className="narrow-project-name-tooltip">
                  {item.title}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Carousel Controls (Prev, Next, Dots) */}
      <div className="project-gallery-controls">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Previous project preview"
          onClick={() => selectPreview(activeIndex - 1)}
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
              onClick={() => selectPreview(idx)}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Next project preview"
          onClick={() => selectPreview(activeIndex + 1)}
          className="gallery-nav-btn"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
