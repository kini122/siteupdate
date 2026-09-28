import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SiteFooter } from "@/components/site/SiteFooter"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { caseStudiesList, faqItems, products } from "@/data/siteContent"

const BRANCH_LABELS: Record<string, string> = {
  "data-bi": "DATA ANALYTICS & BUSINESS INTELLIGENCE",
  "ai-assistants": "AI CHATBOTS & KNOWLEDGE SYSTEMS",
  "automation": "WORKFLOW AUTOMATION",
}

export function WorkPage() {
  const [tab, setTab] = useState("case-studies")
  const [filter, setFilter] = useState("data-bi")

  const visibleCaseStudies = useMemo(() => {
    return caseStudiesList.filter((study) => study.branchKey === filter)
  }, [filter])

  const visibleProducts = useMemo(() => {
    if (filter === "ai-assistants") {
      return products.filter((product) => product.category.toLowerCase().includes("ai"))
    }
    if (filter === "automation") {
      return products.filter((product) => product.category.toLowerCase().includes("recruitment"))
    }
    return products
  }, [filter])

  return (
    <div className="work-page-root">
      <PageIntro
        eyebrow="Portfolio"
        title="Our Work"
        description="Tools and systems built around real business problems."
      />

      {/* Centralized Pill Switcher for Case Studies / Projects */}
      <motion.div
        className="work-switcher-container"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs
          value={tab}
          onValueChange={setTab}
          aria-label="Work category selection"
          className="items-center justify-center"
        >
          <TabsList className="pill-tabs-centered">
            <TabsTrigger value="case-studies" className="pill-tab-item">
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="projects" className="pill-tab-item">
              Projects
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger aria-label="Filter work by category" className="work-frame105-trigger">
                <span className="work-frame105-label">
                  {BRANCH_LABELS[filter] || "DATA ANALYTICS & BUSINESS INTELLIGENCE"}
                </span>
              </SelectTrigger>
              <SelectContent className="work-frame105-content">
                <SelectItem value="data-bi">DATA ANALYTICS & BUSINESS INTELLIGENCE</SelectItem>
                <SelectItem value="ai-assistants">AI CHATBOTS & KNOWLEDGE SYSTEMS</SelectItem>
                <SelectItem value="automation">WORKFLOW AUTOMATION</SelectItem>
              </SelectContent>
            </Select>
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

      <FaqSection items={faqItems} />
      <SiteFooter />
    </div>
  )
}
