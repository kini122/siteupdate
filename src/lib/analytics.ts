import type { SiteAnalyticsSettings } from "@/types/metadata"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let isInitialized = false
let currentMeasurementId = ""

/**
 * Checks if the current environment is local / development
 */
export function isDevEnvironment(): boolean {
  if (typeof window === "undefined") return false
  const host = window.location.hostname
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host.endsWith(".local") ||
    host.includes("192.168.")
  )
}

/**
 * Initializes Google Analytics 4 (GA4) or Google Tag Manager (GTM)
 * based on dynamic CMS configuration with strict environment & admin exclusion.
 */
export function initGoogleAnalytics(
  settings: SiteAnalyticsSettings,
  isAdminUser = false
): void {
  if (typeof window === "undefined") return

  const { measurementId, enabled, trackDevelopment, excludeAdmin, consentMode } = settings

  // 1. Validation check
  if (!enabled || !measurementId || !measurementId.trim()) {
    return
  }

  const cleanId = measurementId.trim()

  // 2. Environment check: suppress on development/localhost unless explicitly enabled
  if (isDevEnvironment() && !trackDevelopment) {
    console.info(`[Analytics] GA4 tracking (${cleanId}) suppressed on development environment.`)
    return
  }

  // 3. Admin exclusion check: suppress for logged-in admin users
  if (isAdminUser && excludeAdmin) {
    console.info(`[Analytics] GA4 tracking (${cleanId}) excluded for authenticated CMS administrator.`)
    return
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || []
  function gtag(..._args: unknown[]) {
    window.dataLayer?.push(arguments)
  }
  window.gtag = gtag

  // 4. Privacy & Consent Management (Google Consent Mode v2)
  if (consentMode === "default_denied") {
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    })
  } else if (consentMode === "default_granted") {
    gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
  }

  // 5. Automated Frontend Script Injection
  const scriptId = "dynamic-gtag-script"
  const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null

  if (!existingScript || currentMeasurementId !== cleanId) {
    if (existingScript) existingScript.remove()

    const script = document.createElement("script")
    script.id = scriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag.js?id=${cleanId}`
    document.head.appendChild(script)

    gtag("js", new Date())
    gtag("config", cleanId, {
      send_page_view: false, // Page views are tracked explicitly on route transitions
      anonymize_ip: true,
    })

    currentMeasurementId = cleanId
    isInitialized = true
  }
}

/**
 * Advanced Custom Data Layer & Page View Tracking
 */
export function trackPageView(
  pagePath: string,
  pageTitle: string,
  contextData?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []

  // Push structured metadata to Data Layer
  window.dataLayer.push({
    event: "page_view",
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
    timestamp: new Date().toISOString(),
    ...contextData,
  })

  // If gtag is configured, notify GA4
  if (isInitialized && window.gtag && currentMeasurementId) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
      ...contextData,
    })
  }
}

/**
 * Track custom user events (CTA clicks, form submissions, filter changes)
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: eventName,
    ...params,
  })

  if (isInitialized && window.gtag) {
    window.gtag("event", eventName, params)
  }
}

/**
 * Direct Data Layer helper
 */
export function pushDataLayer(data: Record<string, unknown>): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(data)
}

/**
 * Update consent after visitor accepts/rejects cookie banner
 */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined" || !window.gtag) return
  const state = granted ? "granted" : "denied"
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
  })
}
