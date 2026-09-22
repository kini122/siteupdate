import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { ProductPreviewDialog } from "@/components/site/ProductPreviewDialog"
import { Button } from "@/components/ui/button"
import type { ProductItem } from "@/types/site"

interface ProductRowProps {
  product: ProductItem
  index: number
  showIndex?: boolean
}

export function ProductRow({ product, index, showIndex = true }: ProductRowProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <article>
      {showIndex && <div className="listing-index"><span>{String(index + 1).padStart(2, "0")} / 02</span><span aria-hidden="true">—</span></div>}
      <div className="product-listing">
        <Button type="button" variant="ghost" className="product-listing-image" aria-label={`Preview ${product.title.toLowerCase()}`} onClick={() => setPreviewOpen(true)}>
          <img src={product.image} alt={`${product.title} preview`} loading={index > 0 ? "lazy" : "eager"} />
          <span className="play-overlay" aria-hidden="true" />
        </Button>
        <div className="product-listing-copy">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <h4>What it does</h4>
          <ul>{product.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          <Button variant="outline" type="button" className="button-secondary" onClick={() => setPreviewOpen(true)}>
            Try Product <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </div>
      <ProductPreviewDialog product={product} open={previewOpen} onOpenChange={setPreviewOpen} />
    </article>
  )
}
