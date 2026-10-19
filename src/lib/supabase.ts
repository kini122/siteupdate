import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { isSupabaseConfigured, getOptimizedMediaUrl } from "./supabaseUtils"

export { isSupabaseConfigured, getOptimizedMediaUrl }

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

// Fallback dummy client or active client
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : createClient("https://placeholder-project.supabase.co", "placeholder-key", {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

/**
 * Upload an image file to Supabase Storage bucket 'case-study-media'
 * Configured with 1-year cacheControl (31536000) for Cloudflare / Supabase Edge CDN caching,
 * and immutable timestamp versioning (?v=...) to eliminate repeated egress.
 */
export async function uploadCaseStudyImage(file: File): Promise<{ url: string | null; error: Error | null }> {
  if (!isSupabaseConfigured()) {
    return {
      url: null,
      error: new Error("Supabase is not configured yet. Please add your credentials to .env"),
    }
  }

  try {
    const fileExt = file.name.split(".").pop() || "png"
    const timestamp = Date.now()
    const fileHash = Math.random().toString(36).substring(2, 9)
    const fileName = `${timestamp}-${fileHash}.${fileExt}`
    const filePath = `case-studies/${fileName}`

    // 1-year immutable cache duration (31,536,000s) on Supabase / Cloudflare Edge CDN
    const { error: uploadError } = await supabase.storage
      .from("case-study-media")
      .upload(filePath, file, {
        cacheControl: "31536000",
        upsert: true,
      })

    if (uploadError) {
      return { url: null, error: uploadError }
    }

    const { data: publicUrlData } = supabase.storage
      .from("case-study-media")
      .getPublicUrl(filePath)

    // Append versioning query parameter so CDN and browsers can cache forever without refetching
    const immutableUrl = `${publicUrlData.publicUrl}?v=${timestamp}`

    return { url: immutableUrl, error: null }
  } catch (err: unknown) {
    return { url: null, error: err instanceof Error ? err : new Error(String(err)) }
  }
}
