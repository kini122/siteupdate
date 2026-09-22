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
      </DialogContent>
    </Dialog>
  )
}
