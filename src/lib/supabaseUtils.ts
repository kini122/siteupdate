const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ""
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ""

export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id")
  )
}

/**
 * Ensures any Supabase Storage URL includes an immutable version parameter
 * so the Edge CDN and browser cache forever without refetching.
 */
export function getOptimizedMediaUrl(url: string, updatedAt?: string): string {
  if (!url) return url
  // Only append version if it's a remote storage URL and doesn't already have one
  if ((url.includes("supabase.co/storage") || url.includes("/storage/v1/object/public/")) && !url.includes("?v=")) {
    const version = updatedAt ? new Date(updatedAt).getTime() : "1"
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}v=${version}`
  }
  return url
}
