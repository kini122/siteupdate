import { createRootRoute, createRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router"

import { SiteLayout } from "@/components/site/SiteLayout"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"

const rootRoute = createRootRoute({ component: SiteLayout })

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: "/", component: HomePage })
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  validateSearch: (search: Record<string, unknown>) => ({
    tab: (search.tab as string) || "data-bi",
  }),
  component: lazyRouteComponent(() => import("@/pages/ServicesPage"), "ServicesPage"),
})
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: lazyRouteComponent(() => import("@/pages/ProductsPage"), "ProductsPage"),
})
const workRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work",
  component: lazyRouteComponent(() => import("@/pages/WorkPage"), "WorkPage"),
})
const caseStudiesHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies",
  component: lazyRouteComponent(() => import("@/pages/WorkPage"), "WorkPage"),
})
const caseStudyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/case-studies/$slug",
  component: lazyRouteComponent(() => import("@/pages/CaseStudyDetailPage"), "CaseStudyDetailPage"),
})
const workCaseStudyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/work/$slug",
  component: lazyRouteComponent(() => import("@/pages/CaseStudyDetailPage"), "CaseStudyDetailPage"),
})
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: lazyRouteComponent(() => import("@/pages/AboutPage"), "AboutPage"),
})
const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: lazyRouteComponent(() => import("@/pages/PartnershipPage"), "PartnershipPage"),
})
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: lazyRouteComponent(() => import("@/pages/admin/AdminPage"), "AdminPage"),
})
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
  component: lazyRouteComponent(() => import("@/pages/ContactPage"), "ContactPage"),
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
