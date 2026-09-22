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
            <ProductRow key={product.id} product={product} index={index} />
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
