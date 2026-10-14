import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown } from "lucide-react"

export interface ServiceOption {
  id: string
  label: string
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "all", label: "ALL" },
  { id: "data-bi", label: "DATA ANALYTICS & BUSINESS INTELLIGENCE" },
  { id: "ai-assistants", label: "AI CHATBOTS & KNOWLEDGE SYSTEMS" },
  { id: "automation", label: "WORKFLOW AUTOMATION" },
]

interface ServiceDropdownProps {
  value: string
  onChange: (value: string) => void
  options?: ServiceOption[]
  className?: string
  ariaLabel?: string
}

export function ServiceDropdown({
  value,
  onChange,
  options = SERVICE_OPTIONS,
  className = "",
  ariaLabel = "Filter by service",
}: ServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedOption = options.find((opt) => opt.id === value) || options[0]

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault()
        setIsOpen(true)
        const idx = options.findIndex((opt) => opt.id === value)
        setHighlightedIndex(idx >= 0 ? idx : 0)
      }
      return
    }

    if (e.key === "Escape" || e.key === "Tab") {
      setIsOpen(false)
      triggerRef.current?.focus({ preventScroll: true })
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1))
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        onChange(options[highlightedIndex].id)
        setIsOpen(false)
        triggerRef.current?.focus({ preventScroll: true })
      }
    }
  }

  function handleSelect(optId: string) {
    onChange(optId)
    setIsOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }

  return (
    <div
      ref={containerRef}
      className={`service-dropdown-container ${className}`}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        className="case-study-service-pill service-dropdown-trigger"
        onClick={() => {
          setIsOpen((prev) => !prev)
          const idx = options.findIndex((opt) => opt.id === value)
          setHighlightedIndex(idx >= 0 ? idx : 0)
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
      >
        <span className="case-study-service-label">{selectedOption.label}</span>
        <ChevronDown
          className={`h-4 w-4 text-[#7B776F] stroke-[2] transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="service-dropdown-popover"
            role="listbox"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.id === value
              const isHighlighted = idx === highlightedIndex
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`service-dropdown-item ${
                    isSelected ? "is-selected" : ""
                  } ${isHighlighted ? "is-highlighted" : ""}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelect(opt.id)
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                >
                  <span className="service-dropdown-item-label">{opt.label}</span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-[#FF6E30] stroke-[2.4] shrink-0" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
