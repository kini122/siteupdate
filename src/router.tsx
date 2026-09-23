import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"

import { SiteLayout } from "@/components/site/SiteLayout"
import { AboutPage } from "@/pages/AboutPage"
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

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  productsRoute,
  workRoute,
  aboutRoute,
  partnersRoute,
])

export const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
