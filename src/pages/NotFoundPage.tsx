import { useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { SeoHead } from "@/components/seo/SeoHead"

export function NotFoundPage() {
  useEffect(() => {
    if (typeof window === "undefined") return
    const pathname = window.location.pathname
    // Do not redirect files or assets
    if (pathname.includes(".") || pathname.startsWith("/assets")) return

    const normalized = pathname.toLowerCase().replace(/\/+$/, "") || "/"
    if (normalized !== pathname) {
      window.location.replace(`${normalized}${window.location.search}${window.location.hash}`)
    }
  }, [])
  return (
    <>
      <SeoHead
        title="404 — Page Not Found | Kozker"
        description="The requested page could not be found on Kozker. Return to the home page or contact our team."
        noindex={true}
      />
      <section className="page-hero">
        <div className="site-container">
          <span className="eyebrow">404</span>
          <h1 className="display-title">
            Page not found<span className="accent-dot">.</span>
          </h1>
          <p className="hero-copy" style={{ marginTop: "16px", maxWidth: "480px" }}>
            The link you followed may be broken or the page may have been moved.
          </p>
          <Link to="/" className="button-primary mt-8 inline-flex">
            Back home →
          </Link>
        </div>
      </section>
    </>
  )
}
