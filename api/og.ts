import { createClient } from "@supabase/supabase-js"

interface MetaData {
  title: string
  description: string
  ogImage: string
  ogType: string
  twitterCard: string
  canonicalUrl?: string
}

const DEFAULT_METADATA: Record<string, MetaData> = {
  "/": {
    title: "Kozker Tech | Data, AI & Automation",
    description: "Kozker engineers custom data intelligence pipelines, private AI assistants, and workflow automations that help modern businesses eliminate busywork and make confident decisions.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/services": {
    title: "Services — Data Analytics, AI Assistants & Automation | Kozker",
    description: "Explore Kozker's engineering services: unified financial & operational BI, custom private AI copilots, and end-to-end webhook workflow automation.",
    ogImage: "/assets/4a80c6.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/work": {
    title: "Work & Case Studies — Proven ROI & Automation | Kozker",
    description: "Explore documented client case studies showing how Kozker built custom BI dashboards, AI copilots, and workflow automations that delivered up to 75% faster reporting and 3.2x ROI.",
    ogImage: "/assets/e467dd.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/products": {
    title: "Products & Systems — AI Tools & Platforms | Kozker",
    description: "Discover specialized software products engineered by Kozker, including AI recruitment platforms, automated workflow agents, and business analytics suites.",
    ogImage: "/assets/3132a8.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/about": {
    title: "About Kozker — Systems, Speed & Pragmatic AI",
    description: "Learn how Kozker partners with ambitious companies to design, build, and deploy reliable data intelligence pipelines, AI copilots, and workflow automations.",
    ogImage: "/assets/642e0f.png",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/partners": {
    title: "Partnerships & Advisory — Kozker Tech Network",
    description: "Partner with Kozker to scale your tech operations, implement enterprise-grade AI copilots, and build resilient data pipelines.",
    ogImage: "/assets/d5b56b.webp",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
  "/contact": {
    title: "Contact Kozker — Start Your Project",
    description: "Get in touch with Kozker engineers to discuss custom BI dashboards, private AI assistants, and end-to-end automation systems.",
    ogImage: "/assets/og-preview.jpg",
    ogType: "website",
    twitterCard: "summary_large_image",
  },
}

export default async function handler(req: any, res: any) {
  const rawPath = String(req.query.path || req.query.p || "/").trim()
  const cleanPath = rawPath.startsWith("/") ? rawPath : `/${rawPath}`

  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://mqytcatdlecuuoitlxud.supabase.co"
  const supabaseKey =
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "sb_publishable_21-TIrUEmBc7k24n87O2Rg_E4nGKAjO"

  let siteUrl = "https://siteupdate-opal.vercel.app"
  let meta: MetaData = DEFAULT_METADATA[cleanPath] || DEFAULT_METADATA["/"]

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)

      // 1. Fetch active domain settings
      const { data: domainRow } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "general")
        .maybeSingle()

      if (domainRow?.value?.siteUrl) {
        siteUrl = domainRow.value.siteUrl
      } else {
        // Fallback row in case_studies
        const { data: fbDomain } = await supabase
          .from("case_studies")
          .select("description")
          .eq("id", "__site_settings__")
          .maybeSingle()

        if (fbDomain?.description) {
          try {
            const parsed = JSON.parse(fbDomain.description)
            if (parsed.siteUrl) siteUrl = parsed.siteUrl
          } catch {
            // Ignore
          }
        }
      }

      // 2. If path is a case study (/case-studies/:slug or /work/:slug)
      if (cleanPath.startsWith("/case-studies/") || cleanPath.startsWith("/work/")) {
        const slug = cleanPath.replace(/^\/(case-studies|work)\//, "")
        const { data: study } = await supabase
          .from("case_studies")
          .select("title, client, description, image, category")
          .eq("slug", slug)
          .maybeSingle()

        if (study) {
          meta = {
            title: `${study.client} — ${study.title} | Kozker`,
            description: study.description || `${study.category} Case Study by Kozker.`,
            ogImage: study.image || "/assets/og-preview.jpg",
            ogType: "article",
            twitterCard: "summary_large_image",
          }
        }
      } else {
        // 3. Check page_metadata table
        const { data: pageRow } = await supabase
          .from("page_metadata")
          .select("*")
          .eq("path", cleanPath)
          .maybeSingle()

        if (pageRow) {
          meta = {
            title: pageRow.title || meta.title,
            description: pageRow.description || meta.description,
            ogImage: pageRow.og_image || pageRow.ogImage || meta.ogImage,
            ogType: pageRow.og_type || pageRow.ogType || meta.ogType,
            twitterCard: pageRow.twitter_card || pageRow.twitterCard || meta.twitterCard,
            canonicalUrl: pageRow.canonical_url || pageRow.canonicalUrl,
          }
        } else {
          // Check fallback row in case_studies
          const { data: fbMeta } = await supabase
            .from("case_studies")
            .select("description")
            .eq("id", "__site_metadata__")
            .maybeSingle()

          if (fbMeta?.description) {
            try {
              const list = JSON.parse(fbMeta.description)
              const found = Array.isArray(list) ? list.find((item: any) => item.path === cleanPath) : null
              if (found) {
                meta = {
                  title: found.title || meta.title,
                  description: found.description || meta.description,
                  ogImage: found.ogImage || meta.ogImage,
                  ogType: found.ogType || meta.ogType,
                  twitterCard: found.twitterCard || meta.twitterCard,
                  canonicalUrl: found.canonicalUrl,
                }
              }
            } catch {
              // Ignore
            }
          }
        }
      }
    } catch {
      // Use defaults on DB failure
    }
  }

  // Resolve absolute URLs
  const baseDomain = siteUrl.replace(/\/+$/, "")
  const canonicalUrl = meta.canonicalUrl || `${baseDomain}${cleanPath === "/" ? "" : cleanPath}`
  
  let ogImageUrl = meta.ogImage.trim()
  if (ogImageUrl.startsWith("/")) {
    ogImageUrl = `${baseDomain}${ogImageUrl}`
  } else if (!ogImageUrl.startsWith("http://") && !ogImageUrl.startsWith("https://")) {
    ogImageUrl = `${baseDomain}/${ogImageUrl}`
  }

  // Generate lightweight HTML response for social unfurl crawlers
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <link rel="canonical" href="${canonicalUrl}" />

  <!-- Open Graph / WhatsApp / Facebook / LinkedIn / Slack -->
  <meta property="og:type" content="${meta.ogType}" />
  <meta property="og:site_name" content="Kozker" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:secure_url" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${meta.title}" />

  <!-- Twitter / X Cards -->
  <meta name="twitter:card" content="${meta.twitterCard}" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <meta name="twitter:url" content="${canonicalUrl}" />

  <!-- Automatic redirect if visited directly in standard browser -->
  <meta http-equiv="refresh" content="0; url=${canonicalUrl}" />
</head>
<body>
  <h1>${meta.title}</h1>
  <p>${meta.description}</p>
  <a href="${canonicalUrl}">Continue to page</a>
</body>
</html>`

  res.setHeader("Content-Type", "text/html; charset=utf-8")
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=86400")
  return res.status(200).send(html)
}
