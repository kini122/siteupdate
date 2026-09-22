import { useEffect, useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { ChevronDown, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const primaryLinks = [
  { label: "Products", to: "/products" as const },
  { label: "Work", to: "/work" as const },
  { label: "About", to: "/about" as const },
  { label: "Partners", to: "/partners" as const },
]

const serviceLinks = [
  { label: "Data Analytics & BI", to: "/services" as const },
  { label: "AI Assistants", to: "/services" as const },
  { label: "Automation", to: "/services" as const },
]

const contactHref = "mailto:hello@kozker.com?subject=Kozker%20consultation"

export function SiteHeader() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="site-nav-wrap">
      <div className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        {/* Brand Logo */}
        <Link to="/" className="nav-brand" aria-label="Kozker home">
          <img src="/assets/19d5f3.png" alt="Kozker" className="h-8 w-8 object-contain" />
        </Link>

        {/* Primary Desktop Nav Links */}
        <nav className="nav-links" aria-label="Primary navigation">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="nav-link nav-service-trigger"
                type="button"
                aria-label="Open services menu"
                data-active={isActive("/services")}
              >
                Services
                <ChevronDown className="h-3 w-3 stroke-[2.2] transition-transform duration-200" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="services-menu-popover">
              {serviceLinks.map((link) => (
                <DropdownMenuItem key={link.label} asChild>
                  <Link to={link.to} className="services-menu-link">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {primaryLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="nav-link"
              data-active={isActive(link.to)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <Button asChild type="button" className="nav-contact">
          <a href={contactHref}>Contact</a>
        </Button>

        {/* Mobile Navigation Sheet */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-nav-trigger text-white hover:bg-white/10"
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="mobile-sheet bg-[#322d2a] text-white border-l-[#4a4440]">
            <SheetHeader className="mobile-sheet-header text-left">
              <SheetTitle className="text-white flex items-center gap-3">
                <img src="/assets/19d5f3.png" alt="" className="h-7 w-7 object-contain" />
                <span>Kozker</span>
              </SheetTitle>
              <SheetDescription className="text-white/60">
                Simple systems that save time, reduce manual work, and keep your business moving.
              </SheetDescription>
            </SheetHeader>
            <nav className="mobile-sheet-nav" aria-label="Mobile navigation">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="mobile-sheet-link"
                data-active={isActive("/")}
              >
                Home
              </Link>
              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="mobile-sheet-link"
                data-active={isActive("/services")}
              >
                Services
              </Link>
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-sheet-link"
                  data-active={isActive(link.to)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={contactHref}
                onClick={() => setMenuOpen(false)}
                className="mobile-sheet-contact"
              >
                Contact Us
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
