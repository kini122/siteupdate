import { createClient } from "@supabase/supabase-js"

interface CaseStudyRow {
  slug?: string
  id: string
  updated_at?: string
  is_published?: boolean
  published?: boolean
}

// Default fallback case studies in case Supabase credentials aren't configured yet
const FALLBACK_SLUGS = [
  { slug: "brooke-india-whatsapp-equine-helpline", updated_at: "2026-10-19" },
  { slug: "custom-recruitment-platform-ai-matching", updated_at: "2026-10-19" },
  { slug: "frappe-erp-ai-recruiter-copilot", updated_at: "2026-10-19" },
  { slug: "recruitment-power-bi-dashboards", updated_at: "2026-10-19" },
  { slug: "chartered-accountancy-workflow-automation", updated_at: "2026-10-19" },
  { slug: "hospital-ai-telecalling-appointment-system", updated_at: "2026-10-19" },
]

export default async function handler(_req: any, res: any) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey =
    process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  let caseStudies: Array<{ slug: string; updated_at?: string }> = []

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      // Query published case studies matching the requested SQL:
      // SELECT slug, updated_at FROM case_studies WHERE published = true;
      const { data, error } = await supabase
        .from("case_studies")
        .select("slug, id, updated_at, is_published")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })

      if (!error && data && data.length > 0) {
        caseStudies = (data as CaseStudyRow[]).map((row) => ({
          slug: row.slug || row.id,
          updated_at: row.updated_at
            ? row.updated_at.split("T")[0]
            : new Date().toISOString().split("T")[0],
        }))
      } else {
        caseStudies = FALLBACK_SLUGS
      }
    } catch {
      caseStudies = FALLBACK_SLUGS
    }
  } else {
    caseStudies = FALLBACK_SLUGS
  }

  const today = new Date().toISOString().split("T")[0]

  // Construct Dynamic XML Sitemap matching exact specification
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Core Static Pages -->
  <url>
    <loc>https://kozker.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://kozker.com/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://kozker.com/work</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://kozker.com/case-studies</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://kozker.com/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://kozker.com/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://kozker.com/partners</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <url>
    <loc>https://kozker.com/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Dynamic Case Study Slug Pages -->
${caseStudies
  .map(
    (study) => `  <url>
    <loc>https://kozker.com/case-studies/${study.slug}</loc>
    <lastmod>${study.updated_at || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n")}

</urlset>
`

  res.setHeader("Content-Type", "application/xml; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400"
  )
  res.status(200).send(xml)
}
