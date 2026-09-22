import { Outlet } from "@tanstack/react-router"

import { SiteHeader } from "@/components/site/SiteHeader"

export function SiteLayout() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="page-main">
        <Outlet />
      </main>
    </div>
  )
}
