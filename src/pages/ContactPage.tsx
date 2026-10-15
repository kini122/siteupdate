import { useEffect, useState } from "react"
import { useSearch } from "@tanstack/react-router"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, CheckCircle2, Instagram, Linkedin } from "lucide-react"

import { FaqSection } from "@/components/site/FaqSection"
import { SignatureBand } from "@/components/site/SignatureBand"
import { SiteFooter } from "@/components/site/SiteFooter"
import { SeoHead } from "@/components/seo/SeoHead"
import { contactDetails, contactFaqItems } from "@/data/siteContent"

const subjectOptions = [
  "Web Design",
  "Customer Support",
  "WhatsApp Automation",
  "Power BI Solutions",
  "General Inquiry",
] as const

type SubjectType = (typeof subjectOptions)[number] | ""

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  subject: SubjectType
  message: string
}

export function ContactPage() {
  let searchParams: { subject?: string; message?: string } = {}
  try {
    searchParams = useSearch({ from: "/contact" })
  } catch {
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search)
      searchParams = {
        subject: sp.get("subject") || undefined,
        message: sp.get("message") || undefined,
      }
    }
  }

  const [formData, setFormData] = useState<FormData>(() => {
    const validSubject = (subjectOptions as readonly string[]).includes(searchParams.subject || "")
      ? (searchParams.subject as SubjectType)
      : ""
    return {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: validSubject,
      message: searchParams.message || "",
    }
  })

  // Synchronize when search parameters change
  useEffect(() => {
    if (searchParams.message || searchParams.subject) {
      const validSubject = (subjectOptions as readonly string[]).includes(searchParams.subject || "")
        ? (searchParams.subject as SubjectType)
        : ""
      setFormData((prev) => ({
        ...prev,
        message: searchParams.message !== undefined ? searchParams.message : prev.message,
        subject: validSubject || prev.subject,
      }))
    }
  }, [searchParams.message, searchParams.subject])

  // Smooth scroll to Cal embed section when URL has #cal or #book-call
  useEffect(() => {
    const scrollToCal = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : ""
      if (hash === "#cal" || hash === "#book-call") {
        const target = document.getElementById("cal") || document.getElementById("book-call")
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }
    }

    scrollToCal()
    const t1 = setTimeout(scrollToCal, 100)
    const t2 = setTimeout(scrollToCal, 350)
    const t3 = setTimeout(scrollToCal, 750)

    window.addEventListener("hashchange", scrollToCal)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener("hashchange", scrollToCal)
    }
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errorMsg) setErrorMsg(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.")
      return
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMsg("Please enter a valid email address.")
      return
    }
    if (!formData.subject) {
      setErrorMsg("Please select a subject.")
      return
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please enter your message.")
      return
    }

    setErrorMsg(null)
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 700)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    })
    setIsSubmitted(false)
    setErrorMsg(null)
  }

  return (
    <div className="contact-page-root">
      <SeoHead
        title="Start a Conversation | Kozker"
        description="Get in touch with Kozker to discuss your company's data analytics, custom AI assistant, or workflow automation requirements. Fast turnaround and direct founder engagement."
        canonicalPath="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Kozker",
          url: "https://kozker.com/contact",
          description: "Get in touch with Kozker for custom software, AI automations, and data analytics inquiries.",
          mainEntity: {
            "@type": "Organization",
            name: "Kozker",
            email: "contact@kozker.com",
            url: "https://kozker.com",
          },
        }}
      />
      {/* Editorial Hero */}
      <section className="page-hero editorial-hero" aria-labelledby="contact-title">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">Contact Us</span>
          </motion.div>

          <motion.h1
            id="contact-title"
            className="display-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Contact <span className="accent-text">Us</span>
            <span className="accent-dot">.</span>
          </motion.h1>

          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions or need assistance? Our team is here to help you.
          </motion.p>
        </div>
      </section>

      {/* Main Editorial Contact Grid */}
      <section className="contact-content-section" aria-label="Contact information and message form">
        <div className="site-container">
          <div className="contact-editorial-layout">
            {/* Left Column: Direct Inquiries, HQ & Socials */}
            <div className="contact-details-column">
              {/* Phone Block */}
              <div className="contact-editorial-block">
                <span className="contact-editorial-label">Phone</span>
                <div className="contact-editorial-value">
                  <div className="contact-phones-list flex flex-col gap-1">
                    <a href={`tel:${contactDetails.phoneRaw}`} className="contact-tele-link">
                      {contactDetails.phone}
                    </a>
                    <a href={`tel:${contactDetails.phoneSecondaryRaw}`} className="contact-tele-link">
                      {contactDetails.phoneSecondary}
                    </a>
                  </div>
                  <span className="contact-editorial-sub">{contactDetails.hours}</span>
                </div>
              </div>

              {/* Email Block */}
              <div className="contact-editorial-block">
                <span className="contact-editorial-label">Email</span>
                <div className="contact-editorial-value contact-emails-list">
                  <a href={`mailto:${contactDetails.emails.contact}`} className="contact-text-link">
                    {contactDetails.emails.contact}
                  </a>
                  <a href={`mailto:${contactDetails.emails.support}`} className="contact-text-link">
                    {contactDetails.emails.support}
                  </a>
                </div>
              </div>

              {/* HQ Block */}
              <div className="contact-editorial-block">
                <span className="contact-editorial-label">HQ</span>
                <div className="contact-editorial-value">
                  <p className="contact-address-line">
                    1st Floor, Adithya Shopping Complex,
                    <br />
                    Thoppumpady, Kochi, Kerala, India, P.O 682005
                    <br />
                    India
                  </p>
                  <a
                    href={contactDetails.hq.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-arrow-link"
                  >
                    <span>Open in Maps</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Connect With Us Block (monocolor logos for LinkedIn & Instagram - no container) */}
              <div className="contact-editorial-block contact-editorial-block--last">
                <span className="contact-editorial-label">Connect With Us</span>
                <div className="contact-social-icons-row">
                  <a
                    href={contactDetails.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-bare-link"
                    aria-label="Kozker on LinkedIn"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-7 w-7" aria-hidden="true" strokeWidth={1.8} />
                  </a>
                  <a
                    href={contactDetails.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-bare-link"
                    aria-label="Kozker on Instagram"
                    title="Instagram"
                  >
                    <Instagram className="h-7 w-7" aria-hidden="true" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Minimalist "Send Us a Message" Form */}
            <div className="contact-form-column">
              <div className="contact-form-wrapper">
                <h3 className="contact-form-heading">
                  Send Us a Message<span className="accent-dot">.</span>
                </h3>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="form-success"
                      className="contact-success-minimal"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="h-10 w-10 text-orange mx-auto" aria-hidden="true" />
                      <h4>Message Sent</h4>
                      <p>
                        Thank you for reaching out. We have received your inquiry and our team will get
                        back to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="button-secondary mt-6"
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="contact-form-minimal"
                      noValidate
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {errorMsg && (
                        <div className="contact-form-error" role="alert">
                          {errorMsg}
                        </div>
                      )}

                      <div className="contact-input-grid">
                        <div className="contact-field">
                          <label htmlFor="contact-name" className="contact-label">
                            Name <span className="text-orange">*</span>
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="contact-input"
                            autoComplete="name"
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="contact-email" className="contact-label">
                            Email <span className="text-orange">*</span>
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="contact-input"
                            autoComplete="email"
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="contact-phone" className="contact-label">
                            Phone (Optional)
                          </label>
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 73062 61147"
                            className="contact-input"
                            autoComplete="tel"
                          />
                        </div>

                        <div className="contact-field">
                          <label htmlFor="contact-company" className="contact-label">
                            Company (Optional)
                          </label>
                          <input
                            id="contact-company"
                            name="company"
                            type="text"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Organization name"
                            className="contact-input"
                            autoComplete="organization"
                          />
                        </div>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="contact-subject" className="contact-label">
                          Subject <span className="text-orange">*</span>
                        </label>
                        <select
                          id="contact-subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className={`contact-select ${!formData.subject ? "is-empty" : ""}`}
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          {subjectOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="contact-field">
                        <label htmlFor="contact-message" className="contact-label">
                          Message <span className="text-orange">*</span>
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help your business?"
                          className="contact-textarea"
                        />
                      </div>

                      <div className="contact-action-wrap">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="button-primary contact-submit-btn"
                        >
                          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection items={contactFaqItems} />

      {/* Signature Brand Band */}
      <SignatureBand />

      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
}
