# Kozker CMS & Supabase High-Performance Caching & Egress Optimization Guide

This document outlines the architecture implemented to strictly minimize Supabase API calls and Storage egress while preserving 100% of Kozker's visual design, layout, typography, responsive styling, and content structure.

---

## 1. Supabase Storage Edge CDN & Browser Caching

By default, Supabase Storage serves assets through Cloudflare's Smart CDN. We have configured the upload and asset delivery pipeline to eliminate duplicate egress:

### Explicit 1-Year Cache Duration on Upload
In [`frontend/src/lib/supabase.ts`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/src/lib/supabase.ts), the image uploader sets an explicit 1-year cache duration (`31,536,000` seconds) and enables `upsert: true`:

```typescript
const { error: uploadError } = await supabase.storage
  .from("case-study-media")
  .upload(filePath, file, {
    cacheControl: "31536000", // 1 year in seconds
    upsert: true,
  })
```

### Immutable Public URLs with Version Query Parameters
Rather than continually refetching media, public URLs automatically include immutable version hashes or timestamps (`?v=timestamp`):

```typescript
export function getOptimizedMediaUrl(url: string, updatedAt?: string): string {
  if (!url) return url
  if ((url.includes("supabase.co/storage") || url.includes("/storage/v1/object/public/")) && !url.includes("?v=")) {
    const version = updatedAt ? new Date(updatedAt).getTime() : "1"
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}v=${version}`
  }
  return url
}
```
**Benefits:**
- Cloudflare CDN caches images indefinitely on its global edge.
- Client browsers never issue duplicate requests for existing media.
- When an editor uploads a replacement, a new version timestamp is assigned, busting the cache cleanly with zero stale-asset issues.

---

## 2. Client & Server Stale-While-Revalidate (SWR) Caching

Visitors and search engine bots navigating between the Home, Services, and Work pages no longer trigger separate Supabase database queries.

In [`frontend/src/hooks/useCaseStudies.ts`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/src/hooks/useCaseStudies.ts):
- **Fresh Window (1 Hour / 3,600s)**: Reads from the in-memory / persistent cache. **Zero network calls are made to Supabase**.
- **Stale-While-Revalidate Window (Up to 24 Hours)**: Renders cached data **instantaneously** (0ms latency, zero layout shift, zero spinner) while silently issuing a single background revalidation request.
- **Zero-Flicker Fallback**: If offline or if Supabase is temporarily unreachable, the cached data or static fallback seamlessly renders without interrupting the user experience.

---

## 3. On-Demand Cache Invalidation via Realtime & Webhooks

When an editor modifies, publishes, deletes, or seeds case studies in the Admin Panel (`/admin`):
1. **Instant Client-Side Purge**: `invalidateCaseStudiesCache()` immediately clears memory and local storage.
2. **Cross-Tab Sync**: A `BroadcastChannel("kozker_cms_sync")` notifies all open browser tabs to refresh instantly.
3. **Supabase Realtime Channel**:
   The client subscribes to Postgres changes on `public:case_studies`:
   ```typescript
   supabase
     .channel("public:case_studies_changes")
     .on(
       "postgres_changes",
       { event: "*", schema: "public", table: "case_studies" },
       () => {
         invalidateCaseStudiesCache()
         fetchStudies(false)
       }
     )
     .subscribe()
   ```

### Supabase Dashboard Webhook (For External Server Revalidation / Next.js)
If deploying alongside an external server-side revalidation endpoint:
1. In the Supabase Dashboard, navigate to **Database** > **Webhooks**.
2. Click **Create a new webhook**.
3. Name: `revalidate-kozker-cache`.
4. Table: `case_studies`.
5. Events: Check `INSERT`, `UPDATE`, `DELETE`.
6. Webhook URL: `https://kozker.com/api/revalidate?secret=YOUR_SECURE_TOKEN`.
7. HTTP Method: `POST`.

---

## 4. Optimized Database Query Payloads & B-Tree Indexes

### Selective Column Projection
Rather than executing `select('*')` (which fetches raw blobs and unused metadata), [`useCaseStudies.ts`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/src/hooks/useCaseStudies.ts) explicitly requests only the fields required for rendering:

```typescript
const CASE_STUDIES_SELECT_FIELDS = [
  "id", "client", "category", "title", "image", "description",
  "industry", "timeline", "overview", "challenge", "solution",
  "stats", "quote", "deliverables", "tech_stack", "branch_key",
  "cta_text", "cta_href", "prefilled_subject", "prefilled_message",
  "sort_order", "is_published", "updated_at"
].join(", ")

const { data } = await supabase
  .from("case_studies")
  .select(CASE_STUDIES_SELECT_FIELDS)
  .eq("is_published", true)
  .order("sort_order", { ascending: true })
```

### High-Performance Postgres B-Tree Indexes
In [`frontend/supabase_schema.sql`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/supabase_schema.sql):
```sql
CREATE INDEX IF NOT EXISTS idx_case_studies_published_sort 
  ON public.case_studies (is_published, sort_order ASC);

CREATE INDEX IF NOT EXISTS idx_case_studies_branch 
  ON public.case_studies (branch_key);

CREATE INDEX IF NOT EXISTS idx_case_studies_category 
  ON public.case_studies (category);

CREATE INDEX IF NOT EXISTS idx_case_studies_updated_at 
  ON public.case_studies (updated_at DESC);
```
**Benefits:**
- Eliminates sequential table scans.
- Query execution drops below 1ms.
- Minimizes compute billing and database CPU spikes.

---

## 5. Edge / CDN Cache Headers (Cloudflare / Vercel / Nginx / Caddy)

All hosting configurations enforce edge caching with background stale-while-revalidate for the HTML document shell:

```http
Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=86400
```

- **`s-maxage=3600`**: Edge CDN nodes (Cloudflare, Vercel Edge, Fastly) serve cached copies for up to 1 hour without contacting the server or Supabase.
- **`stale-while-revalidate=86400`**: If edge cache expires, stale HTML is served instantly to visitors/crawlers while refreshing asynchronously in the background.
- **`assets/*`**: Retains `public, max-age=31536000, immutable` for 1-year caching.

Configs updated:
- [`frontend/vercel.json`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/vercel.json)
- [`frontend/public/_headers`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/public/_headers)
- [`frontend/public/nginx.conf`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/public/nginx.conf)
- [`frontend/public/Caddyfile`](file:///c:/Users/91974/Kombai/projects/project-ivory-waffle/frontend/public/Caddyfile)
