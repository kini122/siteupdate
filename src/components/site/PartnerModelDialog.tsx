import { Link } from "@tanstack/react-router"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export interface PartnerCaseItem {
  id: string
  title: string
  category: string
  headline: string
  description: string
  tag: string
  image: string
  overview: string
  capabilities: { title: string; desc: string }[]
  idealFor: string
  prefilledSubject: string
  prefilledMessage: string
}

interface PartnerModelDialogProps {
  model: PartnerCaseItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PartnerModelDialog({
  model,
  open,
  onOpenChange,
}: PartnerModelDialogProps) {
  if (!model) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="partner-model-dialog">
        {/* Visual Banner Media */}
        <div className="partner-modal-media-wrap image-frame">
          <img
            src={model.image}
            alt={model.headline}
            className="partner-modal-banner-img"
          />
        </div>

        {/* Modal Header */}
        <DialogHeader className="partner-modal-header text-left">
          <span className="eyebrow eyebrow--mono partner-modal-eyebrow">
            {model.category}
          </span>
          <DialogTitle className="partner-modal-title">
            {model.title}
          </DialogTitle>
          <DialogDescription className="partner-modal-headline">
            {model.headline}
          </DialogDescription>
        </DialogHeader>

        {/* Detailed Overview */}
        <div className="partner-modal-section">
          <h4 className="partner-modal-section-title">Model Overview</h4>
          <p className="partner-modal-overview-text">{model.overview}</p>
        </div>

        {/* Scope & Capabilities List */}
        <div className="partner-modal-section">
          <h4 className="partner-modal-section-title">Key Capabilities &amp; Scope</h4>
          <div className="partner-modal-capabilities-grid">
            {model.capabilities.map((cap) => (
              <div key={cap.title} className="partner-modal-cap-item">
                <div className="partner-modal-cap-icon-wrap">
                  <CheckCircle2 className="h-4 w-4 text-[#FF6E30] shrink-0 mt-0.5" />
                </div>
                <div className="partner-modal-cap-content">
                  <strong className="partner-modal-cap-title">{cap.title}</strong>
                  <span className="partner-modal-cap-desc">{cap.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="partner-modal-actions">
          <Link
            to="/contact"
            search={{
              subject: model.prefilledSubject,
              message: model.prefilledMessage,
            }}
            onClick={() => onOpenChange(false)}
            className="partner-modal-enquire-btn"
          >
            <span>Enquire this Model</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="partner-modal-close-btn"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
