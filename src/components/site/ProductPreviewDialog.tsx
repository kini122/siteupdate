import { Play } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { ProductItem } from "@/types/site"

interface ProductPreviewDialogProps {
  product: ProductItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductPreviewDialog({ product, open, onOpenChange }: ProductPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="product-preview-dialog">
        <div className="product-preview-dialog-media image-frame">
          <img src={product.image} alt={`${product.title} preview`} />
        </div>
        <DialogHeader className="product-preview-dialog-header">
          <span className="eyebrow eyebrow--mono">{product.category}</span>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>
        <div className="product-preview-dialog-details">
          <h3>What it does</h3>
          <ul>
            {product.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </div>
        {(product.demoUrl || product.exploreUrl || product.detailsUrl) && (
          <div className="product-preview-dialog-actions" style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            {product.demoUrl && (
              <a
                href={product.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-product-btn-demo"
              >
                <Play className="h-4 w-4 fill-current mr-1.5" />
                Watch Video Tour
              </a>
            )}
            {product.exploreUrl && (
              <a
                href={product.exploreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-product-btn-explore"
              >
                {product.id === "ai-tools" ? "Try Product →" : "Explore Live Platform →"}
              </a>
            )}
            {product.detailsUrl && (
              <a
                href={product.detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dark-product-btn-demo"
              >
                Details / Platform Home
              </a>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
