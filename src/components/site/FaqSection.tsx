import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FaqItem } from "@/types/site"

interface FaqSectionProps {
  items: FaqItem[]
  className?: string
}

export function FaqSection({ items, className = "" }: FaqSectionProps) {
  return (
    <section className={`section section--tight ${className}`}>
      <div className="site-container faq-layout">
        <div className="faq-heading">
          <span className="eyebrow">FAQs</span>
          <h2>Got Questions?</h2>
        </div>
        <Accordion type="single" collapsible className="faq-list" aria-label="Frequently asked questions">
          {items.map((item, index) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>
                <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                <span>{item.question}</span>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
