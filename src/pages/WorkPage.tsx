import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SiteFooter } from "@/components/site/SiteFooter"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { caseStudiesList, faqItems, products } from "@/data/siteContent"

export function WorkPage() {
  const [tab, setTab] = useState("case-studies")
  const [filter, setFilter] = useState("all")

  const visibleCaseStudies = useMemo(() => {
    if (filter === "all") return caseStudiesList
    return caseStudiesList.filter((study) =>
      study.category.toLowerCase().includes(filter.toLowerCase())
    )
  }, [filter])

  const visibleProducts = useMemo(() => {
    if (filter === "all") return products
    return products.filter((product) =>
      product.category.toLowerCase().includes(filter.toLowerCase())
    )
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

      <section className="section section--tight">
        <div className="listing-shell">
          {/* Work Filter Bar (Line 41 & Dropdown) */}
          <motion.div
            className="work-filter-bar"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <span className="work-filter-label">All Work</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger aria-label="Filter work by category" className="work-filter-select">
                <SelectValue placeholder="All Work" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Work</SelectItem>
                <SelectItem value="e-commerce">E-commerce</SelectItem>
                <SelectItem value="recruitment">Recruitment</SelectItem>
                <SelectItem value="ai">AI intelligence</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Case Studies Tab View */}
          {tab === "case-studies" && (
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCaseStudies.length ? (
                <div className="work-items-list">
                  {visibleCaseStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="work-list-item"
                    >
                      {/* Mobile Index Bar (01 / 02) & Divider */}
                      <div className="work-item-index-bar">
                        <span className="work-item-num">
                          {String(index + 1).padStart(2, "0")} / {String(visibleCaseStudies.length).padStart(2, "0")}
                        </span>
                        <div className="work-item-divider" aria-hidden="true" />
                      </div>

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
