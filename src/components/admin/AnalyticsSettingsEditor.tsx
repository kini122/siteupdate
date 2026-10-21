import { useState } from "react"
import {
  BarChart3,
  Save,
  CheckCircle2,
  AlertCircle,
  Code2,
} from "lucide-react"
import { useSiteAnalytics } from "@/hooks/usePageMetadata"
import type { SiteAnalyticsSettings } from "@/types/metadata"

interface AnalyticsSettingsEditorProps {
  isAdminUser?: boolean
}

export function AnalyticsSettingsEditor({ isAdminUser = true }: AnalyticsSettingsEditorProps) {
  const { settings, saveSettings } = useSiteAnalytics(isAdminUser)
  const [formData, setFormData] = useState<SiteAnalyticsSettings>(settings)
  const [isSaving, setIsSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Keep form data in sync when settings load
  const [lastSettingsTime, setLastSettingsTime] = useState(settings.updatedAt)
  if (settings.updatedAt !== lastSettingsTime) {
    setFormData(settings)
    setLastSettingsTime(settings.updatedAt)
  }

  const handleFieldChange = (field: keyof SiteAnalyticsSettings, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setStatusMessage(null)

    const res = await saveSettings(formData)
    setIsSaving(false)

    if (res.success) {
      setStatusMessage({
        type: "success",
        text: "Google Analytics settings saved successfully. Once your Measurement ID is entered, tracking will automatically activate on production.",
      })
      setTimeout(() => setStatusMessage(null), 5000)
    } else {
      setStatusMessage({
        type: "error",
        text: res.error || "Failed to save analytics settings.",
      })
    }
  }

  const isConfigured = Boolean(formData.measurementId && formData.measurementId.trim())

  return (
    <div className="admin-analytics-editor">
      {/* Header Info */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-page-title">Google Analytics (GA4) &amp; Tracking Engine</h1>
          <p className="admin-page-subtitle">
            Configure Google Analytics 4 (GA4) or Google Tag Manager (GTM). The script injection engine,
            custom Data Layer, environment suppression, and consent modes are fully prepared and ready for your Measurement ID.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`admin-status-alert ${
            statusMessage.type === "success" ? "admin-status-success" : "admin-status-error"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Integration Status Banner */}
      <div className="admin-analytics-status-card">
        <div className="flex items-center gap-3">
          <div className={`admin-status-indicator ${isConfigured && formData.enabled ? "status-live" : "status-idle"}`}>
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="admin-panel-subheading" style={{ margin: 0 }}>
              {isConfigured
                ? formData.enabled
                  ? `Active on Production: ${formData.measurementId}`
                  : `Configured but Disabled: ${formData.measurementId}`
                : "Engine Ready — Awaiting Measurement ID"}
            </h3>
            <p className="admin-hint" style={{ margin: "4px 0 0 0" }}>
              {isConfigured
                ? "gtag.js is automatically injected into the frontend HTML with active environment filtering."
                : "Enter your Google Analytics 4 Measurement ID below whenever you are ready. No code changes needed."}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-analytics-grid">
        {/* Settings Form */}
        <form onSubmit={handleSave} className="admin-analytics-form">
          <div className="admin-panel-card">
            <h2 className="admin-panel-heading">1. Tracking Credentials</h2>

            <div className="admin-form-group">
              <label className="admin-label">
                Google Analytics Measurement ID or GTM ID
              </label>
              <input
                type="text"
                value={formData.measurementId}
                onChange={(e) => handleFieldChange("measurementId", e.target.value.trim())}
                placeholder="e.g. G-XXXXXXXXXX or GTM-XXXXXXX"
                className="admin-input"
              />
              <span className="admin-hint">
                Found in Google Analytics: <strong>Admin &gt; Data Streams &gt; Web Stream &gt; Measurement ID</strong>.
              </span>
            </div>

            <div className="admin-form-checkbox-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => handleFieldChange("enabled", e.target.checked)}
                  className="admin-checkbox"
                />
                <span><strong>Enable Google Analytics tracking</strong></span>
              </label>
            </div>

            <hr className="admin-divider" />

            <h2 className="admin-panel-heading">2. Environment &amp; Role-Based Controls</h2>
            <p className="admin-hint" style={{ marginBottom: "12px" }}>
              Prevent internal developer testing and CMS admin sessions from polluting real visitor analytics.
            </p>

            <div className="admin-form-checkbox-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={!formData.trackDevelopment}
                  onChange={(e) => handleFieldChange("trackDevelopment", !e.target.checked)}
                  className="admin-checkbox"
                />
                <div className="flex flex-col">
                  <span><strong>Exclude Development / Localhost Environments</strong></span>
                  <span className="admin-hint">
                    Automatically suppresses tracking when running on <code>localhost</code>, <code>127.0.0.1</code>, or dev servers.
                  </span>
                </div>
              </label>
            </div>

            <div className="admin-form-checkbox-row">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.excludeAdmin}
                  onChange={(e) => handleFieldChange("excludeAdmin", e.target.checked)}
                  className="admin-checkbox"
                />
                <div className="flex flex-col">
                  <span><strong>Exclude Logged-In Admin Traffic</strong></span>
                  <span className="admin-hint">
                    Suppresses analytics hits whenever an administrator is actively browsing the website.
                  </span>
                </div>
              </label>
            </div>

            <hr className="admin-divider" />

            <h2 className="admin-panel-heading">3. Privacy &amp; Consent Management (Google Consent Mode v2)</h2>

            <div className="admin-form-group">
              <label className="admin-label">Default Consent State</label>
              <select
                value={formData.consentMode}
                onChange={(e) => handleFieldChange("consentMode", e.target.value)}
                className="admin-select"
              >
                <option value="default_denied">
                  Default Denied (Recommended for GDPR — waits for user consent)
                </option>
                <option value="default_granted">
                  Default Granted (Direct tracking on load)
                </option>
                <option value="disabled">
                  Standard Mode (No consent mode flags)
                </option>
              </select>
            </div>

            <div className="admin-form-actions">
              <button
                type="submit"
                disabled={isSaving}
                className="admin-primary-btn"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? "Saving Settings..." : "Save Analytics Settings"}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Technical Architecture Info Panel */}
        <div className="admin-analytics-info-column">
          <div className="admin-panel-card">
            <div className="flex items-center gap-2 mb-3">
              <Code2 className="h-4 w-4 text-[#FF6E30]" />
              <h3 className="admin-panel-subheading">Technical Provisions &amp; Data Layer</h3>
            </div>

            <p className="admin-hint" style={{ marginBottom: "14px" }}>
              Every public route on Kozker automatically manages context-specific page views and Data Layer pushes.
            </p>

            <div className="admin-feature-list">
              <div className="admin-feature-item">
                <div className="admin-feature-bullet" />
                <div>
                  <strong>Automated Script Injection</strong>
                  <p className="admin-hint">
                    Dynamically injects <code>gtag.js</code> into <code>&lt;head&gt;</code> without requiring manual code edits.
                  </p>
                </div>
              </div>

              <div className="admin-feature-item">
                <div className="admin-feature-bullet" />
                <div>
                  <strong>Custom Data Layer (<code>window.dataLayer</code>)</strong>
                  <p className="admin-hint">
                    Structured event payloads transmit <code>page_type</code>, <code>page_path</code>, and <code>page_title</code> on every navigation.
                  </p>
                </div>
              </div>

              <div className="admin-feature-item">
                <div className="admin-feature-bullet" />
                <div>
                  <strong>Zero-Perf-Impact</strong>
                  <p className="admin-hint">
                    Asynchronously loaded with IP anonymization, preserving 97+ Lighthouse scores.
                  </p>
                </div>
              </div>
            </div>

            <div className="admin-meta-code-preview" style={{ marginTop: "16px" }}>
              <div className="admin-code-header">
                <Code2 className="h-3.5 w-3.5 text-[#A5A095]" />
                <span>Active Tracking Injection Spec</span>
              </div>
              <pre className="admin-code-block">
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag.js?id=${formData.measurementId || "G-XXXXXXXXXX"}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${formData.measurementId || "G-XXXXXXXXXX"}', {
    send_page_view: false,
    anonymize_ip: true
  });
</script>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
