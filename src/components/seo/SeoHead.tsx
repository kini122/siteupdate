import { useEffect } from "react"

interface SeoHeadProps {
  title: string
  description: string
  canonicalPath?: string
  noindex?: boolean
  ogType?: "website" | "article" | "profile"
  ogImage?: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

const SITE_URL = "https://kozker.com"
const DEFAULT_IMAGE = "https://kozker.com/assets/19d5f3.png"

export function SeoHead({
  title,
  description,
  canonicalPath = "",
  noindex = false,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  jsonLd,
}: SeoHeadProps) {
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
    setMeta(
      "robots",
      noindex
        ? "noindex, nofollow, noarchive"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    )

    // 3. Canonical Tag
    const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`
    const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement("link")
      canonicalLink.setAttribute("rel", "canonical")
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute("href", canonicalUrl)

    // 4. Open Graph Tags
    setMeta("og:title", title, true)
    setMeta("og:description", description, true)
    setMeta("og:url", canonicalUrl, true)
    setMeta("og:type", ogType, true)
    setMeta("og:image", ogImage, true)
    setMeta("og:site_name", "Kozker", true)

    // 5. Twitter Card Tags
    setMeta("twitter:card", "summary_large_image")
    setMeta("twitter:title", title)
    setMeta("twitter:description", description)
    setMeta("twitter:image", ogImage)
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

    return () => {
      // Clean up route-specific script on unmount
      const existing = document.getElementById(scriptId)
      if (existing) existing.remove()
    }
  }, [title, description, canonicalPath, noindex, ogType, ogImage, jsonLd])

  return null
}
