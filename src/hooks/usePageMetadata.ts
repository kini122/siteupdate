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
    // If it's pointing to kozker.com but current active base is vercel (or vice-versa),
    // normalize the asset path so it resolves on the reachable current domain
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

/**
 * Hook to retrieve and update the active base site URL / domain.
 */
export function useSiteSettings() {
  const [siteSettings, setSiteSettings] = useState<SiteGeneralSettings>(getStoredSiteSettings)
  const [loading, setLoading] = useState(false)

  const fetchRemote = useCallback(async () => {
    if (!isSupabaseConfigured()) return
    try {
      setLoading(true)
      const client = await getSupabaseClient()
      const { data: row } = await client
        .from("site_settings")
        .select("value")
        .eq("key", "general")
        .maybeSingle()

      if (row?.value) {
        const parsed = row.value as SiteGeneralSettings
        setStoredSiteSettings(parsed)
        setSiteSettings(parsed)
      }
    } catch {
      // Keep local
    } finally {
      setLoading(false)
    }
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
        await client.from("site_settings").upsert(
          {
            key: "general",
            value: payload,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        )
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
      const client = await getSupabaseClient()
      const { data: rows, error } = await client
        .from("page_metadata")
        .select("*")

      if (!error && rows && rows.length > 0) {
        const merged = DEFAULT_PAGE_METADATA.map((def) => {
          const remote = rows.find((r: { path?: string }) => r.path === def.path)
          if (!remote) return def
          return {
            ...def,
            ...remote,
            ogType: remote.og_type || remote.ogType || def.ogType,
            ogImage: remote.og_image || remote.ogImage || def.ogImage,
            twitterCard: remote.twitter_card || remote.twitterCard || def.twitterCard,
            canonicalUrl: remote.canonical_url || remote.canonicalUrl || def.canonicalUrl,
            updatedAt: remote.updated_at || remote.updatedAt,
          }
        })
        setStoredMetadata(merged)
        setMetadataList(merged)
      }
    } catch {
      // Gracefully maintain local/cached metadata
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
      const client = await getSupabaseClient()
      const { data: rows, error: fetchErr } = await client
        .from("page_metadata")
        .select("*")

      if (fetchErr) {
        setAllMetadata(getStoredMetadata())
      } else if (rows && rows.length > 0) {
        const merged = DEFAULT_PAGE_METADATA.map((def) => {
          const remote = rows.find((r: { path?: string }) => r.path === def.path)
          if (!remote) return def
          return {
            ...def,
            ...remote,
            ogType: remote.og_type || remote.ogType || def.ogType,
            ogImage: remote.og_image || remote.ogImage || def.ogImage,
            twitterCard: remote.twitter_card || remote.twitterCard || def.twitterCard,
            canonicalUrl: remote.canonical_url || remote.canonicalUrl || def.canonicalUrl,
            updatedAt: remote.updated_at || remote.updatedAt,
          }
        })
        setStoredMetadata(merged)
        setAllMetadata(merged)
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
  }, [fetchAll])

  const saveMetadata = async (
    item: PageMetadata
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const updatedList = allMetadata.map((m) =>
        m.path === item.path ? { ...item, updatedAt: new Date().toISOString() } : m
      )
      if (!updatedList.some((m) => m.path === item.path)) {
        updatedList.push({ ...item, updatedAt: new Date().toISOString() })
      }

      setStoredMetadata(updatedList)
      setAllMetadata(updatedList)

      if (isSupabaseConfigured()) {
        const client = await getSupabaseClient()
        await client.from("page_metadata").upsert(
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
      const { data: row, error } = await client
        .from("site_settings")
        .select("value")
        .eq("key", "google_analytics")
        .maybeSingle()

      if (!error && row?.value) {
        const remoteSettings = row.value as SiteAnalyticsSettings
        setStoredAnalyticsSettings(remoteSettings)
        setSettings(remoteSettings)
        initGoogleAnalytics(remoteSettings, isAdminUser)
      } else {
        const local = getStoredAnalyticsSettings()
        setSettings(local)
        initGoogleAnalytics(local, isAdminUser)
      }
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
        await client.from("site_settings").upsert(
          {
            key: "google_analytics",
            value: payload,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "key" }
        )
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
