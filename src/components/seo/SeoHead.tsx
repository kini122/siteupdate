import { useEffect } from "react"
import { usePageMetadata, resolveOgImageUrl } from "@/hooks/usePageMetadata"
import { trackPageView } from "@/lib/analytics"

interface SeoHeadProps {
  title: string
  description: string
  canonicalPath?: string
  noindex?: boolean
  ogType?: "website" | "article" | "profile"
  ogImage?: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
  pageType?: string
  keywords?: string[] | string
}

const DEFAULT_INTERNAL_IMAGE = "/assets/og-preview.jpg"

export function SeoHead({
  title: fallbackTitle,
  description: fallbackDescription,
  canonicalPath = "",
  noindex: fallbackNoindex = false,
  ogType: fallbackOgType = "website",
  ogImage: fallbackOgImage = DEFAULT_INTERNAL_IMAGE,
  jsonLd,
  pageType = "website",
  keywords: fallbackKeywords,
}: SeoHeadProps) {
  // Check for dynamic CMS-managed metadata for the canonical path or route
  const routePath = canonicalPath || (typeof window !== "undefined" ? window.location.pathname : "/")
  const { metadata, siteUrl } = usePageMetadata(routePath)

  // Dynamic overrides from CMS if defined
  const title = metadata?.title || fallbackTitle
  const description = metadata?.description || fallbackDescription
  const rawOgImage = metadata?.ogImage || fallbackOgImage
  const resolvedOgImage = resolveOgImageUrl(rawOgImage, siteUrl)
  const ogType = metadata?.ogType || fallbackOgType
  const noindex = metadata?.noindex !== undefined ? metadata.noindex : fallbackNoindex
  const twitterCard = metadata?.twitterCard || "summary_large_image"
  const rawKeywords = metadata?.keywords && metadata.keywords.length > 0 ? metadata.keywords : fallbackKeywords
  const keywordsString = Array.isArray(rawKeywords) ? rawKeywords.join(", ") : rawKeywords || ""

  useEffect(() => {
    // 1. Title
    document.title = title

    // Helper to find or create a meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name"
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement("meta")
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute("content", content)
    }

    // 2. Primary Meta Tags
    setMeta("description", description)
    if (keywordsString) {
      setMeta("keywords", keywordsString)
    }
    setMeta(
      "robots",
      noindex
        ? "noindex, nofollow, noarchive"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    )

    // 3. Canonical Tag
    const cleanPath = routePath.startsWith("/") ? routePath : `/${routePath}`
    const baseDomain = (siteUrl || "https://siteupdate-opal.vercel.app").replace(/\/+$/, "")
    const canonicalUrl = metadata?.canonicalUrl || `${baseDomain}${cleanPath === "/" ? "" : cleanPath}`
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.setAttribute("rel", "canonical")
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute("href", canonicalUrl)

    // 4. Open Graph Tags (Facebook, WhatsApp, LinkedIn, Slack, Discord unfurling)
    setMeta("og:title", title, true)
    setMeta("og:description", description, true)
    setMeta("og:url", canonicalUrl, true)
    setMeta("og:type", ogType, true)
    setMeta("og:image", resolvedOgImage, true)
    setMeta("og:image:alt", title, true)
    setMeta("og:image:width", "1200", true)
    setMeta("og:image:height", "630", true)
    setMeta("og:site_name", "Kozker", true)

    // 5. Twitter / X Specific Cards
    setMeta("twitter:card", twitterCard)
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)
    setMeta("twitter:image", resolvedOgImage)
    setMeta("twitter:url", canonicalUrl)

    // 6. JSON-LD Structured Data
    const scriptId = "route-specific-jsonld"
    let jsonLdScript = document.getElementById(scriptId) as HTMLScriptElement | null

    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement("script")
        jsonLdScript.id = scriptId
        jsonLdScript.type = "application/ld+json"
        document.head.appendChild(jsonLdScript)
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd)
    } else if (jsonLdScript) {
      jsonLdScript.remove()
    }

    // 7. Google Analytics & DataLayer Page View Tracking
    trackPageView(cleanPath, title, {
      page_type: pageType,
      og_type: ogType,
    })

    return () => {
      // Clean up route-specific script on unmount
      const existing = document.getElementById(scriptId)
      if (existing) existing.remove()
    }
  }, [title, description, keywordsString, routePath, noindex, ogType, resolvedOgImage, twitterCard, metadata?.canonicalUrl, siteUrl, jsonLd, pageType])

  return null
}
