import { useState, useEffect } from "react"
import {
  Globe,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Share2,
  Info,
  Plus,
} from "lucide-react"
import { useAdminMetadata, useSiteSettings, resolveOgImageUrl } from "@/hooks/usePageMetadata"
import type { PageMetadata } from "@/types/metadata"

const INTERNAL_PRESET_IMAGES = [
  { label: "OG Brand Card", path: "/assets/og-preview.jpg" },
  { label: "Services & BI", path: "/assets/4a80c6.webp" },
  { label: "Case Studies / Work", path: "/assets/e467dd.webp" },
  { label: "Products & Systems", path: "/assets/3132a8.webp" },
  { label: "About & Team", path: "/assets/642e0f.png" },
  { label: "Partnerships", path: "/assets/d5b56b.webp" },
  { label: "AI Tools Platform", path: "/assets/ai-tools-platform.webp" },
  { label: "Recruiter AI", path: "/assets/recruiter-ai.webp" },
]

export function PageMetadataEditor() {
  const { allMetadata, saveMetadata, resetToDefault } = useAdminMetadata()
  const { siteSettings, updateSiteSettings } = useSiteSettings()

  const [selectedPath, setSelectedPath] = useState<string>("/")
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [previewPlatform, setPreviewPlatform] = useState<"og" | "twitter">("og")
  const [customPathInput, setCustomPathInput] = useState("")
  const [showAddCustom, setShowAddCustom] = useState(false)

  // Editable base site URL / domain settings
  const [domainInput, setDomainInput] = useState<string>(siteSettings.siteUrl)
  const [domainStatus, setDomainStatus] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSavingDomain, setIsSavingDomain] = useState(false)

  // Sync domainInput whenever siteSettings updates
  useEffect(() => {
    setDomainInput(siteSettings.siteUrl)
  }, [siteSettings.siteUrl])

  const currentItem: PageMetadata =
    allMetadata.find((m) => m.path === selectedPath) || {
      id: `meta-${selectedPath.replace(/\//g, "-")}`,
      path: selectedPath,
      title: "Kozker Tech",
      description: "Intelligent systems, data pipelines, and workflow automation.",
      ogImage: "/assets/og-preview.jpg",
      ogType: "website",
      twitterCard: "summary_large_image",
      noindex: false,
    }

  const [formData, setFormData] = useState<PageMetadata>(currentItem)

  // Keep formData in sync when allMetadata finishes loading or updates
  useEffect(() => {
    const match = allMetadata.find((m) => m.path === selectedPath)
    if (match) {
      setFormData(match)
    }
  }, [selectedPath, allMetadata])

  // Helper to ensure internal paths are used for previewing without domain errors
  const getPreviewImageSrc = (img?: string) => {
    if (!img || !img.trim()) return "/assets/og-preview.jpg"
    const trimmed = img.trim()
    if (trimmed.startsWith("/")) return trimmed
    if (trimmed.includes("/assets/")) {
      return trimmed.substring(trimmed.indexOf("/assets/"))
    }
    return trimmed
  }

  // Derive hostname for preview card (e.g. "siteupdate-opal.vercel.app" or "kozker.com")
  const activeHostname = (() => {
    try {
      const url = new URL(siteSettings.siteUrl)
      return url.hostname
    } catch {
      return "siteupdate-opal.vercel.app"
    }
  })()

  // Sync formData when selectedPath changes
  const handleSelectPath = (path: string) => {
    setSelectedPath(path)
    setStatusMessage(null)
    const match = allMetadata.find((m) => m.path === path)
    if (match) {
      setFormData(match)
    } else {
      setFormData({
        id: `meta-${path.replace(/\//g, "-")}`,
        path,
        title: "Kozker Tech",
        description: "Intelligent systems, data pipelines, and workflow automation.",
        ogImage: "/assets/og-preview.jpg",
        ogType: "website",
        twitterCard: "summary_large_image",
        noindex: false,
      })
    }
  }

  const handleFieldChange = (field: keyof PageMetadata, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Save Page Metadata
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setStatusMessage(null)

    const res = await saveMetadata(formData)
    setIsSaving(false)

    if (res.success) {
      setStatusMessage({
        type: "success",
        text: `Successfully saved metadata for "${formData.path}". Dynamic Open Graph and Twitter Card tags are updated.`,
      })
      setTimeout(() => setStatusMessage(null), 4000)
    } else {
      setStatusMessage({
        type: "error",
        text: res.error || "Failed to save metadata. Please try again.",
      })
    }
  }

  // Save Active Domain / Base URL
  const handleSaveDomain = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!domainInput.trim()) return

    setIsSavingDomain(true)
    setDomainStatus(null)

    let cleaned = domainInput.trim().replace(/\/+$/, "")
    if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
      cleaned = `https://${cleaned}`
    }

    const res = await updateSiteSettings({
      ...siteSettings,
      siteUrl: cleaned,
    })
    setIsSavingDomain(false)

    if (res.success) {
      setDomainStatus({
        type: "success",
        text: `Active domain updated to "${cleaned}". All canonical URLs and Open Graph unfurls will now resolve to this domain.`,
      })
      setTimeout(() => setDomainStatus(null), 4500)
    } else {
      setDomainStatus({
        type: "error",
        text: res.error || "Failed to update domain settings.",
      })
    }
  }

  const handleReset = () => {
    resetToDefault(selectedPath)
    setStatusMessage({
      type: "success",
      text: `Reset "${selectedPath}" metadata to default specifications.`,
    })
    setTimeout(() => {
      const match = allMetadata.find((m) => m.path === selectedPath)
      if (match) setFormData(match)
      setStatusMessage(null)
    }, 500)
  }

  const handleAddCustomPath = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customPathInput.trim()) return
    let clean = customPathInput.trim()
    if (!clean.startsWith("/")) clean = `/${clean}`

    handleSelectPath(clean)
    setCustomPathInput("")
    setShowAddCustom(false)
  }

  // Resolved dynamic values for developer tag inspection
  const cleanRoutePath = formData.path.startsWith("/") ? formData.path : `/${formData.path}`
  const activeBaseUrl = siteSettings.siteUrl.replace(/\/+$/, "")
  const resolvedOgUrl = `${activeBaseUrl}${cleanRoutePath === "/" ? "" : cleanRoutePath}`
  const resolvedOgImageUrl = resolveOgImageUrl(formData.ogImage, siteSettings.siteUrl)
  const resolvedCanonical = formData.canonicalUrl || resolvedOgUrl

  return (
    <div className="admin-metadata-editor">
      {/* Top Header */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Page Metadata &amp; Social Unfurls</h1>
          <p className="admin-page-subtitle">
            Configure Open Graph (OG) meta tags, Twitter Cards, and search snippets for every page.
            When any link is shared on WhatsApp, LinkedIn, X, Slack, or Facebook, it will unfurl with a visible internal preview image and summary.
          </p>
        </div>

        <div className="admin-action-buttons">
          <button
            type="button"
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="admin-secondary-btn"
          >
            <Plus className="h-4 w-4" />
            <span>Add Custom Path</span>
          </button>
        </div>
      </div>

      {/* Global Domain & Base URL Configuration Card */}
      <div className="admin-domain-card">
        <div className="admin-domain-card-header">
          <div className="admin-domain-card-title">
            <Globe className="h-4 w-4 text-[#FF6E30]" />
            <span>Active Site Domain &amp; Unfurl Base URL</span>
          </div>
          <span className="admin-domain-card-badge">
            Current: {siteSettings.siteUrl}
          </span>
        </div>

        <p className="admin-hint" style={{ margin: 0 }}>
          Social platforms (WhatsApp, LinkedIn, X, etc.) require fully-qualified absolute URLs for link previews.
          Internal assets like <code>/assets/og-preview.jpg</code> are automatically prefixed with this domain. You can edit this anytime when switching domains.
        </p>

        <form onSubmit={handleSaveDomain} className="admin-domain-form">
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="https://siteupdate-opal.vercel.app"
              className="admin-input"
            />
          </div>
          <button
            type="submit"
            disabled={isSavingDomain}
            className="admin-primary-btn"
          >
            <Save className="h-4 w-4" />
            <span>{isSavingDomain ? "Updating..." : "Save Domain"}</span>
          </button>
        </form>

        <div className="admin-domain-presets">
          <span className="admin-preset-label">Quick Presets:</span>
          <button
            type="button"
            onClick={() => setDomainInput("https://siteupdate-opal.vercel.app")}
            className={`admin-preset-chip ${domainInput === "https://siteupdate-opal.vercel.app" ? "active" : ""}`}
          >
            Vercel (siteupdate-opal.vercel.app)
          </button>
          <button
            type="button"
            onClick={() => setDomainInput("https://kozker.com")}
            className={`admin-preset-chip ${domainInput === "https://kozker.com" ? "active" : ""}`}
          >
            Production Domain (kozker.com)
          </button>
        </div>

        {domainStatus && (
          <div
            className={`admin-status-alert ${
              domainStatus.type === "success" ? "admin-status-success" : "admin-status-error"
            }`}
            style={{ marginTop: "4px" }}
          >
            {domainStatus.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
            )}
            <span>{domainStatus.text}</span>
          </div>
        )}
      </div>

      {showAddCustom && (
        <form onSubmit={handleAddCustomPath} className="admin-custom-path-bar">
          <input
            type="text"
            placeholder="e.g. /case-studies/custom-slug"
            value={customPathInput}
            onChange={(e) => setCustomPathInput(e.target.value)}
            className="admin-input"
            style={{ maxWidth: "340px" }}
          />
          <button type="submit" className="admin-primary-btn">
            Add Page
          </button>
          <button
            type="button"
            onClick={() => setShowAddCustom(false)}
            className="admin-cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Route Switcher Tabs */}
      <div className="admin-route-pill-list">
        {allMetadata.map((meta) => {
          const isActive = meta.path === selectedPath
          return (
            <button
              key={meta.path}
              type="button"
              onClick={() => handleSelectPath(meta.path)}
              className={`admin-route-pill-btn ${isActive ? "active" : ""}`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{meta.path === "/" ? "/ (Home)" : meta.path}</span>
            </button>
          )
        })}
      </div>

      {statusMessage && (
        <div
          className={`admin-status-alert ${
            statusMessage.type === "success" ? "admin-status-success" : "admin-status-error"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Editor Grid: Form on Left, Live Rich Card Unfurl Preview on Right */}
      <div className="admin-metadata-grid">
        {/* Left: Form Controls */}
        <form onSubmit={handleSave} className="admin-metadata-form">
          <div className="admin-panel-card">
            <h2 className="admin-panel-heading">Primary &amp; Open Graph Tags</h2>

            <div className="admin-form-group">
              <label className="admin-label">Page Route Path</label>
              <input
                type="text"
                value={formData.path}
                readOnly
                className="admin-input admin-input-readonly"
              />
              <span className="admin-hint">Relative URL path matching the frontend route.</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Page Title (og:title &amp; twitter:title)</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                className="admin-input"
                placeholder="Engaging page title..."
              />
              <div className="admin-char-count">
                <span>{formData.title.length} characters</span>
                <span className={formData.title.length > 60 ? "text-amber-400" : "text-emerald-400"}>
                  (Ideal: 50–60 characters)
                </span>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Meta Description (og:description &amp; twitter:description)</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                className="admin-textarea"
                placeholder="A 1–2 sentence summary of what this page is about..."
              />
              <div className="admin-char-count">
                <span>{formData.description.length} characters</span>
                <span className={formData.description.length > 160 ? "text-amber-400" : "text-emerald-400"}>
                  (Ideal: 120–160 characters)
                </span>
              </div>
            </div>

            {/* Social Preview Image Input & Internal Gallery Chips */}
            <div className="admin-form-group">
              <label className="admin-label">
                Social Preview Image (og:image &amp; twitter:image)
              </label>
              <input
                type="text"
                required
                value={formData.ogImage}
                onChange={(e) => handleFieldChange("ogImage", e.target.value)}
                className="admin-input"
                placeholder="/assets/og-preview.jpg"
              />
              <span className="admin-hint">
                Use an internal asset path (e.g. <code>/assets/og-preview.jpg</code>) or a full URL.
                Recommended aspect ratio: <strong>1.91:1</strong> (1200 × 630 px).
              </span>

              {/* Internal Image Preset Gallery */}
              <div style={{ marginTop: "10px" }}>
                <span className="admin-hint" style={{ fontSize: "11px", fontWeight: 600, color: "#C0BBB0" }}>
                  Select Internal Image:
                </span>
                <div className="admin-image-presets-grid">
                  {INTERNAL_PRESET_IMAGES.map((preset) => {
                    const isSelected = formData.ogImage === preset.path
                    return (
                      <button
                        key={preset.path}
                        type="button"
                        onClick={() => handleFieldChange("ogImage", preset.path)}
                        className={`admin-image-chip ${isSelected ? "active" : ""}`}
                        title={preset.path}
                      >
                        <img
                          src={preset.path}
                          alt={preset.label}
                          className="admin-image-chip-thumb"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).style.display = "none"
                          }}
                        />
                        <span>{preset.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="admin-form-row-two">
              <div className="admin-form-group">
                <label className="admin-label">Open Graph Type (og:type)</label>
                <select
                  value={formData.ogType}
                  onChange={(e) => handleFieldChange("ogType", e.target.value)}
                  className="admin-select"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                  <option value="profile">profile</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Twitter Card Format</label>
                <select
                  value={formData.twitterCard}
                  onChange={(e) => handleFieldChange("twitterCard", e.target.value)}
                  className="admin-select"
                >
                  <option value="summary_large_image">summary_large_image (Recommended)</option>
                  <option value="summary">summary (Small thumbnail)</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Canonical URL (Optional override)</label>
              <input
                type="text"
                value={formData.canonicalUrl || ""}
                onChange={(e) => handleFieldChange("canonicalUrl", e.target.value)}
                className="admin-input"
                placeholder={`${activeBaseUrl}${formData.path === "/" ? "" : formData.path}`}
              />
            </div>

            <div className="admin-form-checkbox-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.noindex ?? false}
                  onChange={(e) => handleFieldChange("noindex", e.target.checked)}
                  className="admin-checkbox"
                />
                <span>Set noindex (prevent search engines from indexing this page)</span>
              </label>
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                disabled={isSaving}
                className="admin-primary-btn"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? "Saving..." : "Save Metadata"}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="admin-secondary-btn"
                title="Reset to default values"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset to Default</span>
              </button>
            </div>
          </div>
        </form>

        {/* Right: Live Rich Card Unfurl Preview */}
        <div className="admin-preview-column">
          <div className="admin-panel-card">
            <div className="admin-preview-header">
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4 text-[#FF6E30]" />
                <h3 className="admin-panel-subheading">Live Social Unfurl Preview</h3>
              </div>

              <div className="admin-platform-switcher">
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("og")}
                  className={`admin-platform-btn ${previewPlatform === "og" ? "active" : ""}`}
                >
                  WhatsApp / LinkedIn / FB
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewPlatform("twitter")}
                  className={`admin-platform-btn ${previewPlatform === "twitter" ? "active" : ""}`}
                >
                  Twitter / X Card
                </button>
              </div>
            </div>

            <p className="admin-hint" style={{ marginBottom: "16px" }}>
              This simulates the exact rich embedded preview card (unfurl) rendered when your link is shared on social media and messaging platforms.
            </p>

            {/* Simulated Rich Link Card (1.91:1 aspect ratio) */}
            <div className="social-card-mockup">
              <div className="social-card-image-wrap">
                <img
                  src={getPreviewImageSrc(formData.ogImage)}
                  alt={formData.title}
                  className="social-card-image"
                  onError={(e) => {
                    // Fallback to internal brand og-preview on load error
                    ;(e.target as HTMLImageElement).src = "/assets/og-preview.jpg"
                  }}
                />
                <span className="social-card-dim-badge">1200 × 630</span>
              </div>

              <div className="social-card-content">
                <span className="social-card-domain">
                  {previewPlatform === "twitter" ? activeHostname : activeHostname.toUpperCase()}
                </span>
                <h4 className="social-card-title">{formData.title || "Untitled Page"}</h4>
                <p className="social-card-desc">
                  {formData.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Generated HTML Meta Snippet (Live Inspection for developer) */}
            <div className="admin-meta-code-preview">
              <div className="admin-code-header">
                <Info className="h-3.5 w-3.5 text-[#A5A095]" />
                <span>Active Head Meta Tags (Auto-Injected)</span>
              </div>
              <pre className="admin-code-block">
{`<head>
  <!-- Basic Open Graph (WhatsApp, LinkedIn, Slack, Discord, FB) -->
  <meta property="og:type" content="${formData.ogType}" />
  <meta property="og:url" content="${resolvedOgUrl}" />
  <meta property="og:title" content="${formData.title}" />
  <meta property="og:description" content="${formData.description}" />
  <meta property="og:image" content="${resolvedOgImageUrl}" />

  <!-- Twitter / X Specific Cards -->
  <meta name="twitter:card" content="${formData.twitterCard}" />
  <meta name="twitter:title" content="${formData.title}" />
  <meta name="twitter:description" content="${formData.description}" />
  <meta name="twitter:image" content="${resolvedOgImageUrl}" />
  <meta name="twitter:url" content="${resolvedOgUrl}" />

  <!-- Canonical Tag -->
  <link rel="canonical" href="${resolvedCanonical}" />
</head>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
