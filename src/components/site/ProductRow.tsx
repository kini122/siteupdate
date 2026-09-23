import { useState } from "react"
import { Play } from "lucide-react"

import { ProductPreviewDialog } from "@/components/site/ProductPreviewDialog"
import type { ProductItem } from "@/types/site"

interface ProductRowProps {
  product: ProductItem
  index: number
  showIndex?: boolean
}

export function ProductRow({ product, index, showIndex = true }: ProductRowProps) {
  const [previewOpen, setPreviewOpen] = useState(false)

  return (
    <article className="product-row-article">
      {showIndex && (
        <div className="listing-index">
          <span className="listing-index-num">{String(index + 1).padStart(2, "0")} / 02</span>
          <span className="listing-index-divider" aria-hidden="true" />
        </div>
      )}
      <div className="product-listing">
        <div
          className="product-listing-image"
          role="button"
          tabIndex={0}
          aria-label={`Preview ${product.title.toLowerCase()}`}
          onClick={() => setPreviewOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setPreviewOpen(true)
            }
          }}
        >
          <img
            src={product.image}
            alt={`${product.title} preview`}
            loading={index > 0 ? "lazy" : "eager"}
            className="product-img"
          />
          {/* Centered Play Button on both Desktop and Mobile */}
          <div className="product-play-center-btn" aria-hidden="true">
            <div className="product-play-circle">
              <Play className="product-play-icon" />
            </div>
          </div>
        </div>

        <div className="product-listing-copy">
          <h3 className="product-title-heading">{product.title}</h3>
          <p className="product-desc-text">{product.description}</p>
          <h4 className="product-what-heading">What it does</h4>
          <ul className="product-bullets-list">
            {product.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className="product-action-wrap">
            <button
              type="button"
              className="product-try-btn"
              onClick={() => setPreviewOpen(true)}
            >
              Try Product
            </button>
          </div>
        </div>
      </div>
      <ProductPreviewDialog product={product} open={previewOpen} onOpenChange={setPreviewOpen} />
    </article>
  )
}
