import { useState } from "react"
import type { FaqItem } from "@/types/site"

interface FaqSectionProps {
  items: FaqItem[]
  className?: string
}

export function FaqSection({ items, className = "" }: FaqSectionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "home-businesses")

  return (
    <section className={`section section--tight ${className}`} aria-labelledby="faq-title">
      <div className="site-container faq-layout">
        <div className="faq-heading">
          <span className="eyebrow">FAQs</span>
          <h2 id="faq-title">Got Questions?</h2>
        </div>
        <div
          className="faq-list"
          role="region"
          aria-label="Frequently asked questions"
        >
          {items.map((item, index) => {
            const isOpen = openId === item.id
            const itemNum = String(index + 1).padStart(2, "0")
            const triggerId = `faq-trigger-${item.id}`
            const contentId = `faq-content-${item.id}`

            return (
              <div
                key={item.id}
                data-slot="accordion-item"
                data-state={isOpen ? "open" : "closed"}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  data-slot="accordion-trigger"
                  data-state={isOpen ? "open" : "closed"}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                >
                  <span className="faq-number">{itemNum}</span>
                  <span className="faq-question-text">{item.question}</span>
                </button>
                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    data-slot="accordion-content"
                    data-state="open"
                  >
                    <div className="text-[17px] leading-[1.65] text-[#55514B]">
                      {item.answer}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
