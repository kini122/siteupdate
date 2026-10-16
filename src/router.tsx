import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"

import { SiteLayout } from "@/components/site/SiteLayout"
import { AboutPage } from "@/pages/AboutPage"
import { ContactPage } from "@/pages/ContactPage"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { PartnershipPage } from "@/pages/PartnershipPage"
import { ProductsPage } from "@/pages/ProductsPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { WorkPage } from "@/pages/WorkPage"
import { CaseStudyDetailPage } from "@/pages/CaseStudyDetailPage"
import { AdminPage } from "@/pages/admin/AdminPage"

const rootRoute = createRootRoute({ component: SiteLayout })

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage })
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as string) || "data-bi",
  }),
  component: ServicesPage,
})
const productsRoute = createRoute({ getParentRoute: () => rootRoute, path: "/products", component: ProductsPage })
const workRoute = createRoute({ getParentRoute: () => rootRoute, path: "/work", component: WorkPage })
const caseStudiesHubRoute = createRoute({ getParentRoute: () => rootRoute, path: "/case-studies", component: WorkPage })
const caseStudyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/$slug",
  component: CaseStudyDetailPage,
})
const workCaseStudyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work/$slug",
  component: CaseStudyDetailPage,
})
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: "/about", component: AboutPage })
const partnersRoute = createRoute({ getParentRoute: () => rootRoute, path: "/partners", component: PartnershipPage })
const adminRoute = createRoute({ getParentRoute: () => rootRoute, path: "/admin", component: AdminPage })
interface ContactSearch {
  service?: string
  subject?: string
  message?: string
}

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    service: search.service ? String(search.service) : undefined,
    subject: search.subject ? String(search.subject) : undefined,
    message: search.message ? String(search.message) : undefined,
  }),
  component: ContactPage,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  productsRoute,
  workRoute,
  caseStudiesHubRoute,
  caseStudyDetailRoute,
  workCaseStudyDetailRoute,
  aboutRoute,
  partnersRoute,
  contactRoute,
  adminRoute,
])

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultNotFoundComponent: NotFoundPage,
  trailingSlash: "never",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
