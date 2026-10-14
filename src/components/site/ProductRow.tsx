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
          onClick={() => {
            if (product.demoUrl) {
              window.open(product.demoUrl, "_blank", "noopener,noreferrer")
            } else if (product.exploreUrl) {
              window.open(product.exploreUrl, "_blank", "noopener,noreferrer")
            } else if (product.detailsUrl) {
              window.open(product.detailsUrl, "_blank", "noopener,noreferrer")
            } else {
              setPreviewOpen(true)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              if (product.demoUrl) {
                window.open(product.demoUrl, "_blank", "noopener,noreferrer")
              } else if (product.exploreUrl) {
                window.open(product.exploreUrl, "_blank", "noopener,noreferrer")
              } else if (product.detailsUrl) {
                window.open(product.detailsUrl, "_blank", "noopener,noreferrer")
              } else {
                setPreviewOpen(true)
              }
            }
          }}
        >
          <img
            src={product.image}
            alt={`${product.title} preview`}
            loading={index > 0 ? "lazy" : "eager"}
            className="product-img"
          />
          {/* Centered Play Button when video demo exists */}
          {product.demoUrl && (
            <div className="product-play-center-btn" aria-hidden="true">
              <div className="product-play-circle">
                <Play className="product-play-icon" />
              </div>
            </div>
          )}
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
            {product.exploreUrl ? (
              <a
                href={product.exploreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-try-btn"
              >
                {product.id === "ai-tools" ? "Try Product →" : "Explore Product →"}
              </a>
            ) : (
              <button
                type="button"
                className="product-try-btn"
                onClick={() => setPreviewOpen(true)}
              >
                Try Product
              </button>
            )}
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-demo-btn"
              >
                <Play className="h-4 w-4 fill-current mr-1.5" />
                Watch Demo
              </a>
            )}
            {product.detailsUrl ? (
              <a
                href={product.detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="product-details-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#757575",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Details
              </a>
            ) : (
              <button
                type="button"
                className="product-details-btn"
                onClick={() => setPreviewOpen(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#757575",
                  fontSize: "14px",
                  cursor: "pointer",
                  padding: "8px 12px",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Details
              </button>
            )}
          </div>
        </div>
      </div>
      <ProductPreviewDialog product={product} open={previewOpen} onOpenChange={setPreviewOpen} />
    </article>
  )
}
