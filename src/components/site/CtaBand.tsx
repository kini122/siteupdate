import { Link } from "@tanstack/react-router"
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
  const handleClick = () => {
    if (typeof window !== "undefined" && window.location.pathname === "/contact") {
      const target = document.getElementById("cal") || document.getElementById("book-call")
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <section id="contact" className="cta-band" aria-label="Call to action">
      <div className="site-container cta-band-inner">
        <h2 className="cta-band-title">{title}</h2>
        <p className="cta-band-desc">{description}</p>
        <div className="cta-band-action">
          <Button asChild className="button-primary cta-band-btn">
            <Link to="/contact" hash="cal" onClick={handleClick}>
              <span>{buttonLabel}</span>
              <ArrowRight className="h-4 w-4 ml-1 shrink-0" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
