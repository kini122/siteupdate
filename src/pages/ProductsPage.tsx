import { motion } from "motion/react"

import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { faqItems, products } from "@/data/siteContent"

export function ProductsPage() {
  return (
    <div className="products-page">
      <PageIntro
        eyebrow="Products"
        title="Products"
        description="Tools built around real business problems."
      />
      <section className="section section--tight">
        <div className="listing-shell product-list">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 + index * 0.12 }}
            >
              <ProductRow product={product} index={index} />
            </motion.div>
          ))}
          <SectionReveal className="placeholder-reveal">
            <div className="placeholder-panel" aria-label="More products coming soon">
              <span className="text-muted font-medium">More useful tools are on the way.</span>
            </div>
          </SectionReveal>
        </div>
      </section>
      <FaqSection items={faqItems} />
      <SiteFooter />
    </div>
  )
}
