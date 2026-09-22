import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CtaBandProps {
  title?: string
  description?: string
  buttonLabel?: string
}

export function CtaBand({
  title = "Have a problem worth solving?",
  description = "Let's talk about what you're trying to improve, automate, or build.",
  buttonLabel = "Get Consultation",
}: CtaBandProps) {
  return (
    <section id="contact" className="cta-band" aria-label="Call to action">
      <div className="site-container cta-band-inner">
        <h2 className="cta-band-title">{title}</h2>
        <p className="cta-band-desc">{description}</p>
        <div className="cta-band-action">
          <Button asChild className="button-primary">
            <a href="mailto:hello@kozker.com?subject=Kozker%20consultation">
              {buttonLabel} <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
