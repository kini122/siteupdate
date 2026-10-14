import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"

import { SiteLayout } from "@/components/site/SiteLayout"
import { AboutPage } from "@/pages/AboutPage"
import { ContactPage } from "@/pages/ContactPage"
import { HomePage } from "@/pages/HomePage"
import { PartnershipPage } from "@/pages/PartnershipPage"
import { ProductsPage } from "@/pages/ProductsPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { WorkPage } from "@/pages/WorkPage"

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
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: "/about", component: AboutPage })
const partnersRoute = createRoute({ getParentRoute: () => rootRoute, path: "/partners", component: PartnershipPage })
interface ContactSearch {
  subject?: string
  message?: string
}

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
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
  aboutRoute,
  partnersRoute,
  contactRoute,
])

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
