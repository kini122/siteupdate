import { useEffect, useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const serviceSubLinks = [
  { num: "01", label: "DATA ANALYTICS & BUSINESS INTELLIGENCE", to: "/services" as const, search: { tab: "data-bi" } },
  { num: "02", label: "AI CHATBOTS", to: "/services" as const, search: { tab: "ai-assistants" } },
  { num: "03", label: "AUTOMATION", to: "/services" as const, search: { tab: "automation" } },
]

const primaryNavLinks = [
  { label: "Products", to: "/products" as const },
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Partners", to: "/partners" as const },
]

const contactHref = "mailto:hello@kozker.com?subject=Kozker%20consultation"

export function SiteHeader() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll state for subtle elevation shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-expand services submenu if current route is /services
  useEffect(() => {
    if (location.pathname === "/services") {
      setMobileServicesOpen(true)
    }
  }, [location.pathname])

  // Prevent background scrolling when mobile menu modal is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const isActive = (path: string) => location.pathname === path

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="site-nav-wrap">
      {/* ========================================================= */}
      {/* DESKTOP NAVBAR (Image 2: Sleek Dark Floating Pill)        */}
      {/* ========================================================= */}
      <div className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        {/* Brand Logo Monogram */}
        <Link to="/" className="nav-brand" aria-label="Kozker home">
          <img
            src="/assets/19d5f3.png"
            alt="Kozker"
            className="nav-brand-img"
          />
        </Link>

        {/* Middle Desktop Links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={`nav-link nav-service-trigger ${isActive("/services") ? "is-active" : ""}`}
                type="button"
                aria-label="Open services menu"
                data-active={isActive("/services")}
              >
                <span>Services</span>
                <ChevronDown
                  className="h-3.5 w-3.5 stroke-[2.2] transition-transform duration-200"
                  aria-hidden="true"
                />
                {isActive("/services") && <span className="nav-active-dot">•</span>}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={14}
              className="services-menu-popover !bg-[#2a2624] !border !border-white/12 !text-white !p-3 !rounded-[16px] !shadow-[0_16px_40px_rgba(0,0,0,0.5)] !min-w-[340px] !z-[120]"
            >
              {serviceSubLinks.map((link) => (
                <DropdownMenuItem
                  key={link.num + link.label}
                  asChild
                  className="services-menu-item !p-0 !bg-transparent focus:!bg-transparent data-[highlighted]:!bg-transparent focus:!outline-none"
                >
                  <Link to={link.to} search={link.search} className="services-menu-link">
                    <span className="services-menu-num">{link.num}</span>
                    <span className="services-menu-title">{link.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Other Desktop Links */}
          {primaryNavLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? "is-active" : ""}`}
              data-active={isActive(link.to)}
            >
              <span>{link.label}</span>
              {isActive(link.to) && <span className="nav-active-dot">•</span>}
            </Link>
          ))}
        </nav>

        {/* Desktop Contact CTA Button */}
        <a href={contactHref} className="nav-contact">
          Contact
        </a>

        {/* Mobile Hamburger Trigger (Image 1: 3-line hamburger) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="mobile-nav-trigger"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* MOBILE NAVIGATION MODAL / CARD (Images 3 & 4)             */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="mobile-nav-backdrop" onClick={closeMobileMenu}>
            <motion.div
              className="mobile-nav-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Card Top Row: Monogram Logo + Close Button */}
              <div className="mobile-nav-header">
                <Link to="/" onClick={closeMobileMenu} className="nav-brand" aria-label="Kozker home">
                  <img
                    src="/assets/19d5f3.png"
                    alt="Kozker"
                    className="nav-brand-img"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="mobile-close-btn"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* Vertical Menu List with Divider Lines */}
              <div className="mobile-nav-list">
                {/* 1. Services (Expandable Item with Sub-Items) */}
                <div className="mobile-nav-item-wrap">
                  <button
                    type="button"
                    className={`mobile-nav-item-btn ${
                      isActive("/services") || mobileServicesOpen ? "is-active" : ""
                    }`}
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    aria-expanded={mobileServicesOpen}
                  >
                    <span className="mobile-nav-label">
                      Services
                      {(isActive("/services") || mobileServicesOpen) && (
                        <span className="mobile-active-dot">•</span>
                      )}
                    </span>
                    {mobileServicesOpen ? (
                      <ChevronUp className="h-4 w-4 text-white/70" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white/70" />
                    )}
                  </button>

                  {/* Services Sub-Links (Image 4) */}
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        className="mobile-services-sublist"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        {serviceSubLinks.map((sub) => (
                          <Link
                            key={sub.num + sub.label}
                            to={sub.to}
                            search={sub.search}
                            onClick={closeMobileMenu}
                            className="mobile-sublink"
                          >
                            <span className="mobile-sublink-num">{sub.num}</span>
                            <span className="mobile-sublink-title">{sub.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Our Work */}
                <div className="mobile-nav-item-wrap">
                  <Link
                    to="/work"
                    onClick={closeMobileMenu}
                    className={`mobile-nav-link ${isActive("/work") ? "is-active" : ""}`}
                  >
                    <span>Our Work</span>
                    {isActive("/work") && <span className="mobile-active-dot">•</span>}
                  </Link>
                </div>

                {/* 3. Products */}
                <div className="mobile-nav-item-wrap">
                  <Link
                    to="/products"
                    onClick={closeMobileMenu}
                    className={`mobile-nav-link ${isActive("/products") ? "is-active" : ""}`}
                  >
                    <span>Products</span>
                    {isActive("/products") && <span className="mobile-active-dot">•</span>}
                  </Link>
                </div>

                {/* 4. About */}
                <div className="mobile-nav-item-wrap">
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className={`mobile-nav-link ${isActive("/about") ? "is-active" : ""}`}
                  >
                    <span>About</span>
                    {isActive("/about") && <span className="mobile-active-dot">•</span>}
                  </Link>
                </div>

                {/* 5. Partnership */}
                <div className="mobile-nav-item-wrap mobile-nav-item-wrap--last">
                  <Link
                    to="/partners"
                    onClick={closeMobileMenu}
                    className={`mobile-nav-link ${isActive("/partners") ? "is-active" : ""}`}
                  >
                    <span>Partnership</span>
                    {isActive("/partners") && <span className="mobile-active-dot">•</span>}
                  </Link>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="mobile-nav-footer">
                <a
                  href={contactHref}
                  onClick={closeMobileMenu}
                  className="mobile-contact-btn"
                >
                  Contact Us
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
