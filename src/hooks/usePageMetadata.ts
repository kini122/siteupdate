import { useEffect, useState, useCallback, useRef } from "react"
import { isSupabaseConfigured } from "@/lib/supabaseUtils"
import {
  type PageMetadata,
  type SiteAnalyticsSettings,
  type SiteGeneralSettings,
  DEFAULT_PAGE_METADATA,
  DEFAULT_ANALYTICS_SETTINGS,
  DEFAULT_SITE_SETTINGS,
} from "@/types/metadata"
import { initGoogleAnalytics } from "@/lib/analytics"

const METADATA_STORAGE_KEY = "kozker_page_metadata_v2"
const ANALYTICS_STORAGE_KEY = "kozker_site_analytics_settings_v1"
const SITE_SETTINGS_STORAGE_KEY = "kozker_site_general_settings_v1"
const SYNC_CHANNEL_NAME = "kozker_metadata_sync"

// Fallback row IDs in case_studies table (which already exists in Supabase)
// This ensures edits persist to Supabase across all browsers even if
// the user hasn't run the dedicated page_metadata SQL migration yet.
const SYSTEM_METADATA_ID = "__site_metadata__"
const SYSTEM_SETTINGS_ID = "__site_settings__"
const SYSTEM_ANALYTICS_ID = "__site_analytics__"

async function getSupabaseClient() {
  const mod = await import("@/lib/supabase")
  return mod.supabase
}

// In-memory caches
let inMemoryMetadata: PageMetadata[] | null = null
let inMemoryAnalytics: SiteAnalyticsSettings | null = null
let inMemorySiteSettings: SiteGeneralSettings | null = null

export function getStoredSiteSettings(): SiteGeneralSettings {
  if (inMemorySiteSettings) return inMemorySiteSettings
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(SITE_SETTINGS_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed.siteUrl === "string" && parsed.siteUrl.trim()) {
          inMemorySiteSettings = parsed
          return parsed
        }
      }
    } catch {
      // Ignore parse error
    }
  }
  return DEFAULT_SITE_SETTINGS
}

export function setStoredSiteSettings(settings: SiteGeneralSettings): void {
  inMemorySiteSettings = settings
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SITE_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
      window.dispatchEvent(new CustomEvent("kozker:site-settings:updated"))
      if ("BroadcastChannel" in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
        channel.postMessage({ type: "SITE_SETTINGS_UPDATED" })
        channel.close()
      }
    } catch {
      // Ignore
    }
  }
}

/**
 * Resolves an internal or external image path to a fully qualified URL
 * using the configured base site domain.
 */
export function resolveOgImageUrl(imagePath?: string, baseSiteUrl?: string): string {
  const activeBase = (baseSiteUrl || getStoredSiteSettings().siteUrl).replace(/\/+$/, "")
  const fallback = `${activeBase}/assets/og-preview.jpg`

  if (!imagePath || !imagePath.trim()) return fallback

  const trimmed = imagePath.trim()

  // Full URL provided
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    if (trimmed.includes("/assets/")) {
      const assetPart = trimmed.substring(trimmed.indexOf("/assets/"))
      return `${activeBase}${assetPart}`
    }
    return trimmed
  }

  // Internal relative path (e.g. "/assets/og-preview.jpg" or "assets/...")
  const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`
  return `${activeBase}${cleanPath}`
}

function getStoredMetadata(): PageMetadata[] {
  if (inMemoryMetadata) return inMemoryMetadata
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(METADATA_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed) && parsed.length > 0) {
          inMemoryMetadata = parsed
          return parsed
        }
      }
    } catch {
      // Ignore parse error
    }
  }
  return DEFAULT_PAGE_METADATA
}

function setStoredMetadata(data: PageMetadata[]): void {
  inMemoryMetadata = data
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(METADATA_STORAGE_KEY, JSON.stringify(data))
      window.dispatchEvent(new CustomEvent("kozker:metadata:updated"))
      if ("BroadcastChannel" in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
        channel.postMessage({ type: "METADATA_UPDATED" })
        channel.close()
      }
    } catch {
      // Ignore storage error
    }
  }
}

function getStoredAnalyticsSettings(): SiteAnalyticsSettings {
  if (inMemoryAnalytics) return inMemoryAnalytics
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed.measurementId === "string") {
          inMemoryAnalytics = parsed
          return parsed
        }
      }
    } catch {
      // Ignore parse error
    }
  }
  return DEFAULT_ANALYTICS_SETTINGS
}

function setStoredAnalyticsSettings(settings: SiteAnalyticsSettings): void {
  inMemoryAnalytics = settings
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(settings))
      window.dispatchEvent(new CustomEvent("kozker:analytics:updated"))
      if ("BroadcastChannel" in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
        channel.postMessage({ type: "ANALYTICS_UPDATED" })
        channel.close()
      }
    } catch {
      // Ignore
    }
  }
}

// Helper: Fetch remote metadata with multi-tier fallback (page_metadata table -> case_studies fallback row)
async function fetchRemoteMetadata(): Promise<PageMetadata[] | null> {
  if (!isSupabaseConfigured()) return null
  try {
    const client = await getSupabaseClient()

    // 1. Try dedicated page_metadata table
    const { data: rows, error: metaErr } = await client
      .from("page_metadata")
      .select("*")

    if (!metaErr && rows && rows.length > 0) {
      const map = new Map<string, PageMetadata>()
      DEFAULT_PAGE_METADATA.forEach((def) => map.set(def.path, { ...def }))
      rows.forEach((remote: any) => {
        if (remote && remote.path) {
          const existing: PageMetadata = map.get(remote.path) || {
            id: remote.id || `meta-${remote.path.replace(/\//g, "-")}`,
            path: remote.path,
            title: remote.title || "Kozker Tech",
            description: remote.description || "",
            ogImage: "/assets/og-preview.jpg",
            ogType: "website" as const,
            twitterCard: "summary_large_image" as const,
            noindex: false,
          }
          map.set(remote.path, {
            ...existing,
            ...remote,
            ogType: remote.og_type || remote.ogType || existing.ogType,
            ogImage: remote.og_image || remote.ogImage || existing.ogImage,
            twitterCard: remote.twitter_card || remote.twitterCard || existing.twitterCard,
            canonicalUrl: remote.canonical_url || remote.canonicalUrl || existing.canonicalUrl,
            updatedAt: remote.updated_at || remote.updatedAt,
          })
        }
      })
      return Array.from(map.values())
    }

    // 2. If table doesn't exist, try fallback storage in case_studies
    const { data: fbRow, error: fbErr } = await client
      .from("case_studies")
      .select("description")
      .eq("id", SYSTEM_METADATA_ID)
      .maybeSingle()

    if (!fbErr && fbRow?.description) {
      try {
        const parsed = JSON.parse(fbRow.description)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map<string, PageMetadata>()
          DEFAULT_PAGE_METADATA.forEach((def) => map.set(def.path, { ...def }))
          parsed.forEach((p: PageMetadata) => {
            if (p && p.path) {
              const existing = map.get(p.path)
              map.set(p.path, existing ? { ...existing, ...p } : p)
            }
          })
          return Array.from(map.values())
        }
      } catch {
        // Ignore parse error
      }
    }
  } catch {
    // Ignore fetch error
  }
  return null
}

// Helper: Fetch remote site general settings with multi-tier fallback
async function fetchRemoteSiteSettings(): Promise<SiteGeneralSettings | null> {
  if (!isSupabaseConfigured()) return null
  try {
    const client = await getSupabaseClient()
    const { data: row, error: setErr } = await client
      .from("site_settings")
      .select("value")
      .eq("key", "general")
      .maybeSingle()

    if (!setErr && row?.value) {
      return row.value as SiteGeneralSettings
    }

    // Fallback row in case_studies
    const { data: fbRow, error: fbErr } = await client
      .from("case_studies")
      .select("description")
      .eq("id", SYSTEM_SETTINGS_ID)
      .maybeSingle()

    if (!fbErr && fbRow?.description) {
      try {
        const parsed = JSON.parse(fbRow.description)
        if (parsed && typeof parsed.siteUrl === "string") {
          return parsed as SiteGeneralSettings
        }
      } catch {
        // Ignore
      }
    }
  } catch {
    // Ignore
  }
  return null
}

/**
 * Hook to retrieve and update the active base site URL / domain.
 */
export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteGeneralSettings>(getStoredSiteSettings)
  const [loading, setLoading] = useState(false)

  const fetchRemote = useCallback(async () => {
    setLoading(true)
    const remote = await fetchRemoteSiteSettings()
    if (remote) {
      setStoredSiteSettings(remote)
      setSiteSettings(remote)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchRemote()

    const handleUpdate = () => {
      setSiteSettings(getStoredSiteSettings())
    }

    window.addEventListener("kozker:site-settings:updated", handleUpdate)
    let channel: BroadcastChannel | null = null
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
      channel.onmessage = (e) => {
        if (e.data?.type === "SITE_SETTINGS_UPDATED") {
          handleUpdate()
        }
      }
    }

    return () => {
      window.removeEventListener("kozker:site-settings:updated", handleUpdate)
      if (channel) channel.close()
    }
  }, [fetchRemote])

  const updateSiteSettings = async (
    newSettings: SiteGeneralSettings
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const payload: SiteGeneralSettings = {
        ...newSettings,
        siteUrl: newSettings.siteUrl.trim().replace(/\/+$/, ""),
        updatedAt: new Date().toISOString(),
      }
      setStoredSiteSettings(payload)
      setSiteSettings(payload)

      if (isSupabaseConfigured()) {
        const client = await getSupabaseClient()
        // Try dedicated site_settings table
        const { error: setErr } = await client.from("site_settings").upsert(
          {
            key: "general",
            value: payload,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        )

        // If site_settings table doesn't exist or errors, fall back to case_studies storage
        if (setErr) {
          const { error: fbErr } = await client.from("case_studies").upsert(
            {
              id: SYSTEM_SETTINGS_ID,
              client: "__SYSTEM__",
              category: "SETTINGS",
              title: "Site Settings Storage",
              image: "/assets/og-preview.jpg",
              description: JSON.stringify(payload),
              is_published: false,
              sort_order: 999998,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          )
          if (fbErr) {
            console.warn("[SiteSettings] Supabase fallback warning:", fbErr.message)
          }
        }
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  return { siteSettings, updateSiteSettings, loading }
}

/**
 * Hook to retrieve dynamic metadata for a specific route path.
 */
export function usePageMetadata(path: string) {
  const [metadataList, setMetadataList] = useState<PageMetadata[]>(getStoredMetadata)
  const { siteSettings } = useSiteSettings()
  const isFetchingRef = useRef(false)

  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  const fetchDynamicMetadata = useCallback(async () => {
    if (!isSupabaseConfigured() || isFetchingRef.current) return
    isFetchingRef.current = true

    try {
      const remote = await fetchRemoteMetadata()
      if (remote && remote.length > 0) {
        setStoredMetadata(remote)
        setMetadataList(remote)
      }
    } finally {
      isFetchingRef.current = false
    }
  }, [])

  useEffect(() => {
    fetchDynamicMetadata()

    const handleUpdate = () => {
      setMetadataList(getStoredMetadata())
    }

    window.addEventListener("kozker:metadata:updated", handleUpdate)
    let channel: BroadcastChannel | null = null
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
      channel.onmessage = (e) => {
        if (e.data?.type === "METADATA_UPDATED") {
          handleUpdate()
        }
      }
    }

    return () => {
      window.removeEventListener("kozker:metadata:updated", handleUpdate)
      if (channel) channel.close()
    }
  }, [fetchDynamicMetadata])

  const currentMeta =
    metadataList.find((m) => m.path === normalizedPath) ||
    DEFAULT_PAGE_METADATA.find((m) => m.path === normalizedPath) ||
    null

  return { metadata: currentMeta, siteUrl: siteSettings.siteUrl }
}

/**
 * Admin hook to manage dynamic metadata for all pages.
 */
export function useAdminMetadata() {
  const [allMetadata, setAllMetadata] = useState<PageMetadata[]>(getStoredMetadata)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setAllMetadata(getStoredMetadata())
      return
    }

    try {
      setLoading(true)
      setError(null)
      const remote = await fetchRemoteMetadata()
      if (remote && remote.length > 0) {
        setStoredMetadata(remote)
        setAllMetadata(remote)
      } else {
        setAllMetadata(getStoredMetadata())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setAllMetadata(getStoredMetadata())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()

    const handleUpdate = () => {
      setAllMetadata(getStoredMetadata())
    }

    window.addEventListener("kozker:metadata:updated", handleUpdate)
    return () => {
      window.removeEventListener("kozker:metadata:updated", handleUpdate)
    }
  }, [fetchAll])

  const saveMetadata = async (
    item: PageMetadata
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      let updatedList: PageMetadata[] = []

      setAllMetadata((prev) => {
        const next = prev.map((m) =>
          m.path === item.path ? { ...item, updatedAt: new Date().toISOString() } : m
        )
        if (!next.some((m) => m.path === item.path)) {
          next.push({ ...item, updatedAt: new Date().toISOString() })
        }
        updatedList = next
        setStoredMetadata(next)
        return next
      })

      if (isSupabaseConfigured()) {
        const client = await getSupabaseClient()

        // 1. Try dedicated page_metadata table
        const { error: metaErr } = await client.from("page_metadata").upsert(
          {
            id: item.id || `meta-${item.path.replace(/\//g, "-")}`,
            path: item.path,
            title: item.title,
            description: item.description,
            og_image: item.ogImage,
            og_type: item.ogType,
            twitter_card: item.twitterCard,
            noindex: item.noindex ?? false,
            canonical_url: item.canonicalUrl || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "path" }
        )

        // 2. If table doesn't exist or errors, fall back to case_studies fallback storage
        if (metaErr) {
          const { error: fbErr } = await client.from("case_studies").upsert(
            {
              id: SYSTEM_METADATA_ID,
              client: "__SYSTEM__",
              category: "METADATA",
              title: "Page Metadata Storage",
              image: "/assets/og-preview.jpg",
              description: JSON.stringify(updatedList),
              is_published: false,
              sort_order: 999999,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          )

          if (fbErr) {
            console.warn("[PageMetadata] Supabase fallback storage warning:", fbErr.message)
          }
        }
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  const resetToDefault = (path: string): void => {
    const defaultItem = DEFAULT_PAGE_METADATA.find((d) => d.path === path)
    if (defaultItem) {
      saveMetadata(defaultItem)
    }
  }

  return {
    allMetadata,
    loading,
    error,
    saveMetadata,
    resetToDefault,
    refresh: fetchAll,
  }
}

/**
 * Hook to retrieve and manage site-wide Google Analytics (GA4) settings.
 */
export function useSiteAnalytics(isAdminUser = false) {
  const [settings, setSettings] = useState<SiteAnalyticsSettings>(getStoredAnalyticsSettings)
  const [loading, setLoading] = useState(false)

  const fetchSettings = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      const local = getStoredAnalyticsSettings()
      setSettings(local)
      initGoogleAnalytics(local, isAdminUser)
      return
    }

    try {
      setLoading(true)
      const client = await getSupabaseClient()
      const { data: row, error: setErr } = await client
        .from("site_settings")
        .select("value")
        .eq("key", "google_analytics")
        .maybeSingle()

      if (!setErr && row?.value) {
        const remoteSettings = row.value as SiteAnalyticsSettings
        setStoredAnalyticsSettings(remoteSettings)
        setSettings(remoteSettings)
        initGoogleAnalytics(remoteSettings, isAdminUser)
        return
      }

      // Fallback in case_studies
      const { data: fbRow, error: fbErr } = await client
        .from("case_studies")
        .select("description")
        .eq("id", SYSTEM_ANALYTICS_ID)
        .maybeSingle()

      if (!fbErr && fbRow?.description) {
        try {
          const parsed = JSON.parse(fbRow.description)
          if (parsed && typeof parsed.measurementId === "string") {
            setStoredAnalyticsSettings(parsed)
            setSettings(parsed)
            initGoogleAnalytics(parsed, isAdminUser)
            return
          }
        } catch {
          // Ignore
        }
      }

      const local = getStoredAnalyticsSettings()
      setSettings(local)
      initGoogleAnalytics(local, isAdminUser)
    } catch {
      const local = getStoredAnalyticsSettings()
      setSettings(local)
      initGoogleAnalytics(local, isAdminUser)
    } finally {
      setLoading(false)
    }
  }, [isAdminUser])

  useEffect(() => {
    fetchSettings()

    const handleUpdate = () => {
      const updated = getStoredAnalyticsSettings()
      setSettings(updated)
      initGoogleAnalytics(updated, isAdminUser)
    }

    window.addEventListener("kozker:analytics:updated", handleUpdate)
    let channel: BroadcastChannel | null = null
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME)
      channel.onmessage = (e) => {
        if (e.data?.type === "ANALYTICS_UPDATED") {
          handleUpdate()
        }
      }
    }

    return () => {
      window.removeEventListener("kozker:analytics:updated", handleUpdate)
      if (channel) channel.close()
    }
  }, [fetchSettings, isAdminUser])

  const saveSettings = async (
    newSettings: SiteAnalyticsSettings
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const payload = {
        ...newSettings,
        updatedAt: new Date().toISOString(),
      }
      setStoredAnalyticsSettings(payload)
      setSettings(payload)
      initGoogleAnalytics(payload, isAdminUser)

      if (isSupabaseConfigured()) {
        const client = await getSupabaseClient()
        const { error: setErr } = await client.from("site_settings").upsert(
          {
            key: "google_analytics",
            value: payload,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        )

        // Fallback to case_studies storage
        if (setErr) {
          await client.from("case_studies").upsert(
            {
              id: SYSTEM_ANALYTICS_ID,
              client: "__SYSTEM__",
              category: "ANALYTICS",
              title: "Analytics Settings Storage",
              image: "/assets/og-preview.jpg",
              description: JSON.stringify(payload),
              is_published: false,
              sort_order: 999997,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          )
        }
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  return {
    settings,
    loading,
    saveSettings,
  }
}
