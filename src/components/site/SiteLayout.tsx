import { useEffect } from "react"
import { Outlet, useRouterState } from "@tanstack/react-router"

import { SiteHeader } from "@/components/site/SiteHeader"
import { useSiteAnalytics } from "@/hooks/usePageMetadata"

export function SiteLayout() {
  const routerState = useRouterState()
  const isAdmin = routerState.location.pathname.startsWith("/admin")

  // Automated Google Analytics (GA4) initialization with environment & admin controls
  useSiteAnalytics(isAdmin)

  // Technical SEO: Enforce canonical domain (apex), lowercase paths, and remove trailing slashes
  useEffect(() => {
    if (typeof window === "undefined") return

    // 1. Canonical domain enforcement: redirect www. to apex domain in production
    if (window.location.hostname === "www.kozker.com") {
      window.location.replace(`https://kozker.com${window.location.pathname}${window.location.search}${window.location.hash}`)
      return
    }

    // 2. Trailing slash and case standardization
    const pathname = window.location.pathname
    const hasUpperCase = /[A-Z]/.test(pathname)
    const hasTrailingSlash = pathname.length > 1 && pathname.endsWith("/")

    if (hasUpperCase || hasTrailingSlash) {
      const normalizedPath = pathname.toLowerCase().replace(/\/+$/, "")
      window.history.replaceState(null, "", `${normalizedPath}${window.location.search}${window.location.hash}`)
    }
  }, [routerState.location.pathname])

  if (isAdmin) {
    return <Outlet />
  }

  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}
