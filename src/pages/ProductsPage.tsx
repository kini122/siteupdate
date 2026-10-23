import { motion } from "motion/react"

import { FaqSection } from "@/components/site/FaqSection"
import { PageIntro } from "@/components/site/PageIntro"
import { ProductRow } from "@/components/site/ProductRow"
import { SectionReveal } from "@/components/site/SectionReveal"
import { SiteFooter } from "@/components/site/SiteFooter"
import { products, productsFaqItems } from "@/data/siteContent"
import { SeoHead } from "@/components/seo/SeoHead"

export function ProductsPage() {
  return (
    <div className="products-page">
      <SeoHead
        title="Products — Integrated AI Platform & Business Software | Kozker"
        description="Explore proprietary software tools engineered by Kozker: integrated AI platform, agentic-AI systems for your existing systems, and custom AI extensions."
        keywords={[
          "Integrated AI Platform",
          "Agentic-AI Systems For Your Existing Systems",
          "AI extension for business software",
          "Build AI-powered systems",
          "AI automation",
          "Intelligent systems built around yours",
        ]}
        canonicalPath="/products"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Kozker Software Products",
          url: "https://kozker.com/products",
          description: "Tools built around real business problems.",
        }}
      />
      <PageIntro
        eyebrow="Products"
        title="Products"
        description="Integrated AI platform tools and agentic-AI systems for your existing systems."
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
      <FaqSection items={productsFaqItems} />
      <SiteFooter />
    </div>
  )
}
