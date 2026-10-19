import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SiteFooter } from "@/components/site/SiteFooter"
import { Button } from "@/components/ui/button"
import { ServiceDropdown } from "@/components/site/ServiceDropdown"
import { products, workFaqItems } from "@/data/siteContent"
import { useCaseStudies } from "@/hooks/useCaseStudies"
import { SeoHead } from "@/components/seo/SeoHead"

export function WorkPage() {
  const { caseStudies } = useCaseStudies()
  const [tab, setTab] = useState("case-studies")
  const [filter, setFilter] = useState("all")

  const visibleCaseStudies = useMemo(() => {
    if (filter === "all") return caseStudies
    return caseStudies.filter((study) => study.branchKey === filter)
  }, [filter, caseStudies])

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products
    if (filter === "ai-assistants") {
      return products.filter((product) => product.category.toLowerCase().includes("ai"))
    }
    if (filter === "automation") {
      return products.filter((product) => product.category.toLowerCase().includes("recruitment"))
    }
    return products
  }, [filter])

  const currentPath =
    typeof window !== "undefined" && window.location.pathname.startsWith("/case-studies")
      ? "/case-studies"
      : "/work"

  return (
    <div className="work-page-root">
      <SeoHead
        title="Work & Case Studies — Proven ROI & Automation | Kozker"
        description="Explore documented client case studies showing how Kozker built custom BI dashboards, AI copilots, and workflow automations that delivered up to 75% faster reporting and 3.2x ROI."
        canonicalPath={currentPath}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kozker Case Studies & Client Outcomes",
          url: `https://kozker.com${currentPath}`,
          description: "Documented engineering case studies showing measurable ROI across FinTech, E-Commerce, Logistics, Healthcare, and Operations.",
        }}
      />
      <PageIntro
        eyebrow="Portfolio"
        title="Our Work"
        description="Tools and systems built around real business problems."
      />

      {/* Centralized Switcher for Case Studies / Projects (styled identical to Data & BI toggle) */}
      <motion.div
        className="work-switcher-container"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="shift-tabs-container">
          <div
            role="tablist"
            aria-label="Work category selection"
            className="shift-tabs-pill [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              type="button"
              role="tab"
              id="work-tab-case-studies"
              aria-selected={tab === "case-studies"}
              tabIndex={tab === "case-studies" ? 0 : -1}
              onClick={() => setTab("case-studies")}
              className={`shift-tab-button after:hidden after:content-none ${
                tab === "case-studies" ? "data-[state=active]" : "data-[state=inactive]"
              }`}
              data-state={tab === "case-studies" ? "active" : "inactive"}
            >
              Case Studies
            </button>
            <button
              type="button"
              role="tab"
              id="work-tab-projects"
              aria-selected={tab === "projects"}
              tabIndex={tab === "projects" ? 0 : -1}
              onClick={() => setTab("projects")}
              className={`shift-tab-button after:hidden after:content-none ${
                tab === "projects" ? "data-[state=active]" : "data-[state=inactive]"
              }`}
              data-state={tab === "projects" ? "active" : "inactive"}
            >
              Projects
            </button>
          </div>
        </div>
      </motion.div>

      <section className="section section--tight work-section-main">
        <div className="work-listing-shell">
          {/* Frame 105: Category Selector Dropdown matching Figma Frame 105 / 104 */}
          <motion.div
            className="work-frame105-container"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <ServiceDropdown
              value={filter}
              onChange={setFilter}
              ariaLabel="Filter work by category"
            />
          </motion.div>

          {/* Case Studies Tab View: 2-Column Side-by-Side Cards (Frame 114 & Frame 156) */}
          {tab === "case-studies" && (
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCaseStudies.length ? (
                <div className="case-studies-grid-two">
                  {visibleCaseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                    >
                      <CaseStudyCard study={study} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="work-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <strong>No matching case studies yet.</strong>
                  <span>Try another category to see more of Kozker’s client outcomes.</span>
                  <Button type="button" variant="outline" onClick={() => setFilter("all")}>
                    Show all work
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Projects Tab View */}
          {tab === "projects" && (
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleProducts.length ? (
                <div className="work-items-list">
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="work-list-item"
                    >
                      <ProductRow
                        product={{
                          ...product,
                          title: `${product.title} (System)`,
                        }}
                        index={index}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="work-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <strong>No matching projects yet.</strong>
                  <span>Try another category to see more of Kozker’s systems.</span>
                  <Button type="button" variant="outline" onClick={() => setFilter("all")}>
                    Show all work
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>

      <FaqSection items={workFaqItems} />
      <SiteFooter />
    </div>
  )
}
