import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SiteFooter } from "@/components/site/SiteFooter"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { faqItems, products } from "@/data/siteContent"

export function WorkPage() {
  const [tab, setTab] = useState("case-studies")
  const [filter, setFilter] = useState("all")
  const visibleProducts = useMemo(
    () =>
      filter === "all"
        ? products
        : products.filter((product) =>
            product.category.toLowerCase().includes(filter.toLowerCase())
          ),
    [filter]
  )

  return (
    <div className="work-page-root">
      <PageIntro
        eyebrow="Portfolio"
        title="Our Work"
        description="Tools and systems built around real business problems."
      />

      {/* Centralized Pill Switcher for Case Studies / Projects */}
      <div className="work-switcher-container">
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
      </div>

      <section className="section section--tight">
        <div className="listing-shell">
          <div className="work-filter-bar">
            <span className="work-filter-label">Filter work</span>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger aria-label="Filter work by category" className="work-filter-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Work</SelectItem>
                <SelectItem value="recruitment">Recruitment</SelectItem>
                <SelectItem value="ai">AI intelligence</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProducts.length ? (
              visibleProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28 }}
                  className="work-list-item"
                >
                  <ProductRow
                    product={{
                      ...product,
                      title: tab === "projects" ? `${product.title} (System)` : product.title,
                    }}
                    index={index}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="work-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <strong>No matching work yet.</strong>
                <span>Try another category to see more of Kozker’s systems.</span>
                <Button type="button" variant="outline" onClick={() => setFilter("all")}>
                  Show all work
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FaqSection items={faqItems} />
      <SiteFooter />
    </div>
  )
}
