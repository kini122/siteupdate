import { useEffect, useState, useCallback, useRef } from "react"
import { isSupabaseConfigured, supabase, getOptimizedMediaUrl } from "@/lib/supabase"
import { caseStudiesList } from "@/data/siteContent"
import { generateSlug } from "@/lib/slug"
import type { CaseStudy } from "@/types/site"

// Database row interface matching Supabase table
export interface DbCaseStudyRow {
  id: string
  slug?: string
  client: string
  category: string
  title: string
  image: string
  description?: string
  industry?: string
  timeline?: string
  overview?: string
  challenge?: string
  solution?: string
  stats?: { value: string; label: string }[]
  quote?: { text: string; author: string }
  deliverables?: { title: string; desc: string }[]
  tech_stack?: string[]
  branch_key?: string
  cta_text?: string
  cta_href?: string
  prefilled_subject?: string
  prefilled_message?: string
  sort_order?: number
  is_published?: boolean
  published?: boolean
  created_at?: string
  updated_at?: string
}

// Optimization 4: Selective projection fields to minimize payload & Supabase egress
const CASE_STUDIES_SELECT_FIELDS = [
  "id",
  "slug",
  "client",
  "category",
  "title",
  "image",
  "description",
  "industry",
  "timeline",
  "overview",
  "challenge",
  "solution",
  "stats",
  "quote",
  "deliverables",
  "tech_stack",
  "branch_key",
  "cta_text",
  "cta_href",
  "prefilled_subject",
  "prefilled_message",
  "sort_order",
  "is_published",
  "updated_at",
].join(", ")

export function mapDbRowToCaseStudy(row: DbCaseStudyRow): CaseStudy {
  const generatedSlug = generateSlug(row.title || row.client || row.id)
  return {
    id: row.id,
    slug: row.slug ? generateSlug(row.slug) : generatedSlug,
    client: row.client,
    category: row.category,
    title: row.title,
    image: getOptimizedMediaUrl(row.image, row.updated_at),
    description: row.description || "",
    industry: row.industry || "",
    timeline: row.timeline || "",
    overview: row.overview || "",
    challenge: row.challenge || "",
    solution: row.solution || "",
    stats: row.stats || [],
    quote: row.quote,
    deliverables: row.deliverables || [],
    techStack: row.tech_stack || [],
    branchKey: (row.branch_key as "data-bi" | "ai-assistants" | "automation") || "data-bi",
    ctaText: row.cta_text || "Start a Conversation",
    ctaHref: row.cta_href || "/contact",
    prefilledSubject: row.prefilled_subject,
    prefilledMessage: row.prefilled_message,
    sortOrder: row.sort_order ?? 0,
    isPublished: row.is_published ?? true,
  }
}

export function mapCaseStudyToDbRow(study: CaseStudy): Partial<DbCaseStudyRow> {
  const cleanSlug = study.slug
    ? generateSlug(study.slug)
    : generateSlug(study.title || study.client || study.id)

  return {
    id: study.id,
    slug: cleanSlug,
    client: study.client,
    category: study.category,
    title: study.title,
    image: study.image,
    description: study.description || "",
    industry: study.industry || "",
    timeline: study.timeline || "",
    overview: study.overview || "",
    challenge: study.challenge || "",
    solution: study.solution || "",
    stats: study.stats || [],
    quote: study.quote,
    deliverables: study.deliverables || [],
    tech_stack: study.techStack || [],
    branch_key: study.branchKey || "data-bi",
    cta_text: study.ctaText || "Start a Conversation",
    cta_href: study.ctaHref || "/contact",
    prefilled_subject: study.prefilledSubject || "",
    prefilled_message: study.prefilledMessage || "",
    sort_order: study.sortOrder ?? 0,
    is_published: study.isPublished ?? true,
    updated_at: new Date().toISOString(),
  }
}

// ============================================================================
// Optimization 2 & 3: Stale-While-Revalidate (SWR) & In-Memory / Storage Caching
// ============================================================================
const SWR_CACHE_KEY = "kozker_case_studies_swr_cache"
const SWR_CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour (3600 seconds fresh window)
const SWR_STALE_MAX_AGE_MS = 24 * 60 * 60 * 1000 // Up to 24 hours stale-while-revalidate

interface SwrCachePayload {
  data: CaseStudy[]
  timestamp: number
}

let memoryCache: SwrCachePayload | null = null

function getCachedData(): { data: CaseStudy[]; isFresh: boolean } | null {
  const now = Date.now()

  // 1. In-memory check
  if (memoryCache && Array.isArray(memoryCache.data)) {
    const age = now - memoryCache.timestamp
    if (age < SWR_STALE_MAX_AGE_MS) {
      return {
        data: memoryCache.data,
        isFresh: age < SWR_CACHE_TTL_MS,
      }
    }
  }

  // 2. localStorage check
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(SWR_CACHE_KEY)
      if (stored) {
        const parsed: SwrCachePayload = JSON.parse(stored)
        if (Array.isArray(parsed.data) && parsed.data.length > 0 && typeof parsed.timestamp === "number") {
          const age = now - parsed.timestamp
          if (age < SWR_STALE_MAX_AGE_MS) {
            memoryCache = parsed
            return {
              data: parsed.data,
              isFresh: age < SWR_CACHE_TTL_MS,
            }
          }
        }
      }
    } catch {
      // Silently ignore storage quota or parse errors
    }
  }

  return null
}

function setCachedData(data: CaseStudy[]) {
  const payload: SwrCachePayload = {
    data,
    timestamp: Date.now(),
  }
  memoryCache = payload
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(SWR_CACHE_KEY, JSON.stringify(payload))
    } catch {
      // Ignore
    }
  }
}

/**
 * On-demand cache invalidation trigger.
 * Purges memory and persistent cache, and broadcasts to other tabs/listeners.
 */
export function invalidateCaseStudiesCache() {
  memoryCache = null
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(SWR_CACHE_KEY)
      window.dispatchEvent(new CustomEvent("kozker:case-studies:cache-invalidated"))
      if ("BroadcastChannel" in window) {
        const channel = new BroadcastChannel("kozker_cms_sync")
        channel.postMessage({ type: "CACHE_INVALIDATED", timestamp: Date.now() })
        channel.close()
      }
    } catch {
      // Ignore
    }
  }
}

/**
 * Public hook for fetching published case studies with SWR (Stale-While-Revalidate).
 * - Instant paint from in-memory / local cache (0ms latency, zero layout shift)
 * - 0 Supabase API hits when cache is fresh (< 1 hour)
 * - Silent background revalidation when stale
 * - Realtime / on-demand webhook cache bust listener
 */
export function useCaseStudies() {
  const cached = getCachedData()
  const [data, setData] = useState<CaseStudy[]>(cached ? cached.data : caseStudiesList)
  const [loading, setLoading] = useState<boolean>(!cached)
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(!isSupabaseConfigured() && !cached)
  const isFetchingRef = useRef<boolean>(false)

  const fetchStudies = useCallback(async (isInitial = false) => {
    if (!isSupabaseConfigured()) {
      setData(caseStudiesList)
      setIsUsingFallback(true)
      setLoading(false)
      return
    }

    if (isFetchingRef.current) return
    isFetchingRef.current = true

    if (isInitial && !cached) {
      setLoading(true)
    }

    try {
      // Selective projection minimizes egress & payload
      const { data: rows, error } = await supabase
        .from("case_studies")
        .select(CASE_STUDIES_SELECT_FIELDS)
        .eq("is_published", true)
        .order("sort_order", { ascending: true })

      if (error || !rows || rows.length === 0) {
        if (!cached) {
          setData(caseStudiesList)
          setIsUsingFallback(true)
        }
      } else {
        const mapped = (rows as unknown as DbCaseStudyRow[]).map(mapDbRowToCaseStudy)
        setData(mapped)
        setCachedData(mapped)
        setIsUsingFallback(false)
      }
    } catch {
      if (!cached) {
        setData(caseStudiesList)
        setIsUsingFallback(true)
      }
    } finally {
      isFetchingRef.current = false
      setLoading(false)
    }
  }, [cached])

  useEffect(() => {
    // If cache is missing or stale, revalidate
    if (!cached || !cached.isFresh) {
      fetchStudies(true)
    }

    // Optimization 3: Listen for local & broadcast cache invalidation events
    const handleInvalidation = () => {
      fetchStudies(false)
    }
    window.addEventListener("kozker:case-studies:cache-invalidated", handleInvalidation)

    let broadcastChannel: BroadcastChannel | null = null
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      broadcastChannel = new BroadcastChannel("kozker_cms_sync")
      broadcastChannel.onmessage = (event) => {
        if (event.data?.type === "CACHE_INVALIDATED") {
          fetchStudies(false)
        }
      }
    }

    return () => {
      window.removeEventListener("kozker:case-studies:cache-invalidated", handleInvalidation)
      if (broadcastChannel) {
        broadcastChannel.close()
      }
    }
  }, [fetchStudies])

  return { caseStudies: data, loading, isUsingFallback, refetch: () => fetchStudies(false) }
}

/**
 * Admin hook with CRUD operations, storage sync, one-click seeding,
 * and automatic on-demand cache invalidation.
 */
export function useAdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setCaseStudies(caseStudiesList)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data: rows, error: fetchErr } = await supabase
        .from("case_studies")
        .select(CASE_STUDIES_SELECT_FIELDS)
        .order("sort_order", { ascending: true })

      if (fetchErr) {
        setError(fetchErr.message)
        setCaseStudies(caseStudiesList)
      } else if (!rows || rows.length === 0) {
        setCaseStudies(caseStudiesList)
      } else {
        const mapped = (rows as unknown as DbCaseStudyRow[]).map(mapDbRowToCaseStudy)
        setCaseStudies(mapped)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err))
      setCaseStudies(caseStudiesList)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const saveCaseStudy = async (study: CaseStudy): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, error: "Supabase is not configured yet. Please add your credentials to .env" }
    }

    try {
      const payload = mapCaseStudyToDbRow(study)
      const { error: saveErr } = await supabase
        .from("case_studies")
        .upsert(payload, { onConflict: "id" })

      if (saveErr) {
        return { success: false, error: saveErr.message }
      }

      // Invalidate public SWR cache so frontend updates instantly
      invalidateCaseStudiesCache()
      await fetchAll()
      return { success: true }
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  const deleteCaseStudy = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, error: "Supabase is not configured yet." }
    }

    try {
      const { error: delErr } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", id)

      if (delErr) {
        return { success: false, error: delErr.message }
      }

      invalidateCaseStudiesCache()
      await fetchAll()
      return { success: true }
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  const togglePublish = async (id: string, published: boolean): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, error: "Supabase is not configured yet." }
    }

    try {
      const { error: updateErr } = await supabase
        .from("case_studies")
        .update({ is_published: published, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (updateErr) {
        return { success: false, error: updateErr.message }
      }

      invalidateCaseStudiesCache()
      await fetchAll()
      return { success: true }
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : String(err) }
    }
  }

  const seedCurrentCards = async (replaceLegacy = true): Promise<{ success: boolean; count: number; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, count: 0, error: "Supabase is not configured yet." }
    }

    try {
      if (replaceLegacy) {
        // Delete old demo/legacy records
        await supabase
          .from("case_studies")
          .delete()
          .in("id", ["finscale", "globalbi", "techgadgets", "healthops", "apexautomation", "autoops", "case-mv9dxvd1"])
      }

      const rowsToInsert = caseStudiesList.map((item, index) => {
        const payload = mapCaseStudyToDbRow({ ...item, sortOrder: index + 1, isPublished: true })
        return payload
      })

      const { error: seedErr } = await supabase
        .from("case_studies")
        .upsert(rowsToInsert, { onConflict: "id" })

      if (seedErr) {
        return { success: false, count: 0, error: seedErr.message }
      }

      invalidateCaseStudiesCache()
      await fetchAll()
      return { success: true, count: rowsToInsert.length }
    } catch (err: unknown) {
      return { success: false, count: 0, error: err instanceof Error ? err.message : String(err) }
    }
  }

  return {
    caseStudies,
    loading,
    error,
    fetchAll,
    saveCaseStudy,
    deleteCaseStudy,
    togglePublish,
    seedCurrentCards,
  }
}

/**
 * Hook for fetching a single case study by slug (or fallback to id).
 * 1. Checks memory & SWR cached list for 0ms immediate render
 * 2. Checks static default list
 * 3. If missing from cache and Supabase is configured, fetches on-demand
 */
export function useCaseStudyBySlug(slugOrId: string | undefined) {
  const { caseStudies, loading: listLoading } = useCaseStudies()
  const [study, setStudy] = useState<CaseStudy | null>(() => {
    if (!slugOrId) return null
    return (
      caseStudies.find((s) => s.slug === slugOrId || s.id === slugOrId) ||
      caseStudiesList.find((s) => s.slug === slugOrId || s.id === slugOrId) ||
      null
    )
  })
  const [loading, setLoading] = useState<boolean>(!study && listLoading)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slugOrId) {
      setStudy(null)
      setLoading(false)
      return
    }

    // 1. Check loaded caseStudies list
    const matched = caseStudies.find((s) => s.slug === slugOrId || s.id === slugOrId)
    if (matched) {
      setStudy(matched)
      setLoading(false)
      return
    }

    // 2. Check fallback list
    const fallbackMatch = caseStudiesList.find((s) => s.slug === slugOrId || s.id === slugOrId)
    if (fallbackMatch && !isSupabaseConfigured()) {
      setStudy(fallbackMatch)
      setLoading(false)
      return
    }

    // 3. Direct Supabase query if not found in cache and Supabase is configured
    if (isSupabaseConfigured()) {
      let cancelled = false
      setLoading(true)

      const queryCaseStudy = async () => {
        try {
          const { data: row, error: fetchErr } = await supabase
            .from("case_studies")
            .select(CASE_STUDIES_SELECT_FIELDS)
            .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
            .eq("is_published", true)
            .maybeSingle()

          if (cancelled) return
          if (fetchErr) {
            setError(fetchErr.message)
            setStudy(fallbackMatch || null)
          } else if (row) {
            setStudy(mapDbRowToCaseStudy(row as unknown as DbCaseStudyRow))
          } else {
            setStudy(fallbackMatch || null)
          }
        } catch (err: unknown) {
          if (cancelled) return
          setError(err instanceof Error ? err.message : String(err))
          setStudy(fallbackMatch || null)
        } finally {
          if (!cancelled) {
            setLoading(false)
          }
        }
      }

      queryCaseStudy()

      return () => {
        cancelled = true
      }
    } else {
      setStudy(fallbackMatch || null)
      setLoading(false)
    }
  }, [slugOrId, caseStudies])

  return { study, loading, error }
}


