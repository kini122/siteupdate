import { useState, useEffect, useId } from "react"
import { Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  ExternalLink,
  Eye,
  Key,
  LogOut,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  AlertCircle,
  Clock,
} from "lucide-react"

import { isSupabaseConfigured, supabase, uploadCaseStudyImage } from "@/lib/supabase"
import { useAdminCaseStudies } from "@/hooks/useCaseStudies"
import { CaseStudyCard } from "@/components/site/CaseStudyCard"
import { CaseStudyDialog } from "@/components/site/CaseStudyDialog"
import { SeoHead } from "@/components/seo/SeoHead"
import type { CaseStudy, CaseStudyCapability } from "@/types/site"

export function AdminPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [authMessage, setAuthMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false)

  // CMS state
  const {
    caseStudies,
    loading: studiesLoading,
    saveCaseStudy,
    deleteCaseStudy,
    togglePublish,
  } = useAdminCaseStudies()

  const [activeTab, setActiveTab] = useState<"list" | "edit">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterBranch, setFilterBranch] = useState<string>("all")
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const imageUploadInputId = useId()

  // Check auth state
  useEffect(() => {
    async function checkUser() {
      if (!isSupabaseConfigured()) {
        setAuthLoading(false)
        return
      }
      try {
        const { data } = await supabase.auth.getSession()
        if (data?.session?.user) {
          setUser({ email: data.session.user.email })
        }
      } catch {
        // Ignore auth check error
      } finally {
        setAuthLoading(false)
      }
    }

    checkUser()

    if (isSupabaseConfigured()) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email })
        } else {
          setUser(null)
        }
      })
      return () => {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  // Handle Login
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthMessage(null)
    setIsSubmittingAuth(true)

    if (!isSupabaseConfigured()) {
      setAuthMessage({
        type: "error",
        text: "Supabase credentials are not configured in .env.",
      })
      setIsSubmittingAuth(false)
      return
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setAuthMessage({ type: "success", text: "Signed in successfully!" })
    } catch (err: unknown) {
      setAuthMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Authentication failed.",
      })
    } finally {
      setIsSubmittingAuth(false)
    }
  }

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut()
    }
    setUser(null)
  }

  // Create new blank case study template
  const handleCreateNew = () => {
    const newId = `case-${Date.now().toString(36)}`
    setEditingStudy({
      id: newId,
      client: "New Client",
      category: "DATA & AUTOMATION",
      title: "New Transformational Case Study Headline",
      image: "/assets/60ed30.jpg",
      description: "Brief summary describing how Kozker engineered custom systems and automated operations.",
      industry: "Enterprise Operations",
      timeline: "3 Weeks Deployment",
      overview: "Detailed background describing the client operational context and initial challenges.",
      challenge: "Specific operational bottlenecks, manual data entry friction, or system delays.",
      solution: "How Kozker designed and deployed the custom pipeline, AI assistant, or automated workflow.",
      stats: [
        { value: "50%", label: "Time Saved" },
        { value: "3.5x", label: "Productivity Boost" },
        { value: "99%", label: "Accuracy" },
      ],
      quote: {
        text: "Kozker built a solution that completely eliminated our daily bottlenecks.",
        author: "— Operations Lead, New Client",
      },
      deliverables: [
        { title: "Core System Integration", desc: "Automated webhook sync and unified data pipelines." },
        { title: "Custom Dashboard View", desc: "Real-time visibility and milestone monitoring." },
      ],
      techStack: ["PostgreSQL", "Next.js", "REST APIs", "Power BI"],
      branchKey: "data-bi",
      ctaText: "Start a Conversation",
      ctaHref: "/contact",
      prefilledSubject: "Inquiry: New Client Case Study",
      prefilledMessage: "Hi Kozker, I was reviewing your case study and would like to explore similar solutions for our company.",
      sortOrder: (caseStudies.length || 0) + 1,
      isPublished: true,
    })
    setActiveTab("edit")
    setSaveStatus(null)
  }

  const handleEdit = (study: CaseStudy) => {
    setEditingStudy({
      ...study,
      stats: study.stats ? [...study.stats] : [],
      deliverables: study.deliverables ? [...study.deliverables] : [],
      techStack: study.techStack ? [...study.techStack] : [],
    })
    setActiveTab("edit")
    setSaveStatus(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editingStudy) return

    setIsUploadingImage(true)
    const { url, error } = await uploadCaseStudyImage(file)
    setIsUploadingImage(false)

    if (error || !url) {
      alert(`Image upload error: ${error?.message || "Failed to upload"}`)
      return
    }

    setEditingStudy({ ...editingStudy, image: url })
  }

  const handleSave = async () => {
    if (!editingStudy) return
    setIsSaving(true)
    setSaveStatus(null)

    const result = await saveCaseStudy(editingStudy)
    setIsSaving(false)

    if (result.success) {
      setSaveStatus("Saved successfully to Supabase!")
      setTimeout(() => setSaveStatus(null), 3000)
    } else {
      alert(`Save failed: ${result.error || "Unknown error"}`)
    }
  }

  // Filtered case studies
  const filteredStudies = caseStudies.filter((s) => {
    const matchesSearch =
      s.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesBranch = filterBranch === "all" || s.branchKey === filterBranch
    return matchesSearch && matchesBranch
  })

  // If not logged in, show Login Page
  const isAuthenticated = Boolean(user)

  if (authLoading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Loading Kozker CMS...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-page">
        <SeoHead
          title="Admin Portal | Kozker CMS"
          description="Kozker CMS administration"
          canonicalPath="/admin"
          noindex={true}
        />
        <div className="admin-auth-card">
          <div className="admin-auth-brand">
            <span className="admin-brand-tag">KOZKER CMS</span>
            <h1 className="admin-auth-title">Admin Portal</h1>
            <p className="admin-auth-desc">
              Manage case studies, visual media storage, and live published content.
            </p>
          </div>

          {!isSupabaseConfigured() && (
            <div className="admin-warning-box">
              <Key className="h-4 w-4 text-[#FF6E30] shrink-0 mt-0.5" />
              <div>
                <strong>Supabase credentials not configured in .env yet.</strong>
                <p>
                  Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> to <code>frontend/.env</code> to enable live database sync.
                </p>
              </div>
            </div>
          )}

          {authMessage && (
            <div className={`admin-auth-alert ${authMessage.type}`}>
              {authMessage.type === "error" ? (
                <AlertCircle className="h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              )}
              <span>{authMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="admin-auth-form">
            <div className="admin-form-group">
              <label htmlFor="admin-email">Admin Email Address</label>
              <input
                id="admin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kozker.com"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="admin-input"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingAuth}
              className="admin-submit-btn"
            >
              {isSubmittingAuth ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="admin-auth-footer">
            <Link to="/" className="admin-back-link">
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Kozker Website</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <div className="admin-dashboard-root">
      <SeoHead
        title="Dashboard — Admin Portal | Kozker CMS"
        description="Kozker CMS administration dashboard"
        canonicalPath="/admin"
        noindex={true}
      />
      {/* Admin Top Navigation */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-nav-left">
            <Link to="/admin" className="admin-nav-logo">
              <span className="admin-logo-dot" />
              <span>KOZKER CMS</span>
            </Link>
            <span className="admin-status-badge">
              {isSupabaseConfigured() ? (
                <>
                  <Database className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Supabase Connected</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                  <span>Local Mode (Add keys in .env)</span>
                </>
              )}
            </span>
          </div>

          <div className="admin-nav-right">
            <Link to="/work" target="_blank" className="admin-view-site-link">
              <span>View Live Work</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            {user?.email && <span className="admin-user-email">{user.email}</span>}
            <button
              type="button"
              onClick={handleSignOut}
              className="admin-signout-btn"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-main-content">
        {activeTab === "list" ? (
          <div className="admin-list-view">
            {/* Action Bar */}
            <div className="admin-header-row">
              <div>
                <h1 className="admin-page-title">Case Studies &amp; Outcomes</h1>
                <p className="admin-page-subtitle">
                  Configure case study cards, banner imagery in Supabase storage, outcome metrics, and detailed modal views.
                </p>
              </div>

              <div className="admin-action-buttons">
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="admin-primary-btn"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Case Study</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="admin-filter-bar">
              <div className="admin-search-wrap">
                <Search className="h-4 w-4 text-[#8D8980]" />
                <input
                  type="text"
                  placeholder="Search client, title, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div className="admin-branch-filters">
                {["all", "data-bi", "ai-assistants", "automation"].map((branch) => (
                  <button
                    key={branch}
                    type="button"
                    className={`admin-branch-btn ${filterBranch === branch ? "active" : ""}`}
                    onClick={() => setFilterBranch(branch)}
                  >
                    {branch === "all"
                      ? "All Branches"
                      : branch === "data-bi"
                      ? "Data & BI"
                      : branch === "ai-assistants"
                      ? "AI Assistants"
                      : "Automation"}
                  </button>
                ))}
              </div>
            </div>

            {/* Case Studies Grid / Cards Table */}
            {studiesLoading ? (
              <div className="admin-loading-box">
                <div className="admin-spinner" />
                <p>Loading case studies...</p>
              </div>
            ) : filteredStudies.length === 0 ? (
              <div className="admin-empty-state">
                <p>No case studies found matching your criteria.</p>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="admin-primary-btn mt-4"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create First Case Study</span>
                </button>
              </div>
            ) : (
              <div className="admin-cards-grid">
                {filteredStudies.map((study) => (
                  <div key={study.id} className="admin-case-row-card">
                    <div className="admin-row-thumb">
                      <img src={study.image} alt={study.client} />
                      <span className={`admin-status-pill ${study.isPublished ? "published" : "draft"}`}>
                        {study.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <div className="admin-row-details">
                      <div className="admin-row-meta">
                        <span className="admin-row-client">{study.client}</span>
                        <span className="admin-row-category">{study.category}</span>
                        {study.timeline && (
                          <span className="admin-row-timeline">
                            <Clock className="h-3 w-3 text-[#FF6E30]" />
                            <span>{study.timeline}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="admin-row-title">{study.title}</h3>

                      <div className="admin-row-stats-tags">
                        {study.stats?.map((stat) => (
                          <span key={stat.label} className="admin-row-stat-badge">
                            <strong>{stat.value}</strong> {stat.label}
                          </span>
                        ))}
                        {study.deliverables && (
                          <span className="admin-row-deliv-badge">
                            {study.deliverables.length} Deliverables
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="admin-row-actions">
                      <button
                        type="button"
                        onClick={() => handleEdit(study)}
                        className="admin-edit-action-btn"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await togglePublish(study.id, !study.isPublished)
                        }}
                        className="admin-toggle-pub-btn"
                        title={study.isPublished ? "Unpublish" : "Publish"}
                      >
                        {study.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm(`Are you sure you want to delete ${study.client}?`)) {
                            await deleteCaseStudy(study.id)
                          }
                        }}
                        className="admin-del-action-btn"
                        title="Delete Case Study"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ========================================================================= */
          /* EDIT / CREATE VIEW WITH LIVE PREVIEW                                      */
          /* ========================================================================= */
          editingStudy && (
            <div className="admin-edit-view">
              {/* Sticky Top Sub-Header */}
              <div className="admin-edit-topbar">
                <div className="admin-topbar-left">
                  <button
                    type="button"
                    onClick={() => setActiveTab("list")}
                    className="admin-back-btn"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to List</span>
                  </button>
                  <h2 className="admin-edit-page-title">
                    {editingStudy.id ? `Editing: ${editingStudy.client}` : "New Case Study"}
                  </h2>
                </div>

                <div className="admin-topbar-right">
                  {saveStatus && <span className="admin-save-toast">{saveStatus}</span>}
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="admin-save-btn"
                  >
                    <Save className="h-4 w-4" />
                    <span>{isSaving ? "Saving..." : "Save to Database"}</span>
                  </button>
                </div>
              </div>

              {/* Two Column Layout: Editor Form (Left) & Real-time Live Card Preview (Right) */}
              <div className="admin-editor-layout">
                {/* Left Column: Form Fields */}
                <div className="admin-form-col">
                  {/* Card Section 1: Basic Identifiers */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">1. Basic Information &amp; Meta</h3>
                    <div className="admin-grid-two">
                      <div className="admin-form-group">
                        <label>Unique ID / Slug</label>
                        <input
                          type="text"
                          value={editingStudy.id}
                          onChange={(e) => setEditingStudy({ ...editingStudy, id: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Client Name</label>
                        <input
                          type="text"
                          value={editingStudy.client}
                          onChange={(e) => setEditingStudy({ ...editingStudy, client: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="admin-grid-two">
                      <div className="admin-form-group">
                        <label>Category Label (e.g. FINTECH &amp; BI)</label>
                        <input
                          type="text"
                          value={editingStudy.category}
                          onChange={(e) => setEditingStudy({ ...editingStudy, category: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Service Branch</label>
                        <select
                          value={editingStudy.branchKey || "data-bi"}
                          onChange={(e) =>
                            setEditingStudy({
                              ...editingStudy,
                              branchKey: e.target.value as "data-bi" | "ai-assistants" | "automation",
                            })
                          }
                          className="admin-input admin-select"
                        >
                          <option value="data-bi">Data Analytics &amp; BI</option>
                          <option value="ai-assistants">AI Assistants &amp; Knowledge Systems</option>
                          <option value="automation">Workflow Automation</option>
                        </select>
                      </div>
                    </div>

                    <div className="admin-form-group">
                      <label>Headline Title</label>
                      <input
                        type="text"
                        value={editingStudy.title}
                        onChange={(e) => setEditingStudy({ ...editingStudy, title: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    <div className="admin-grid-two">
                      <div className="admin-form-group">
                        <label>Industry</label>
                        <input
                          type="text"
                          value={editingStudy.industry || ""}
                          onChange={(e) => setEditingStudy({ ...editingStudy, industry: e.target.value })}
                          placeholder="e.g. High-Growth FinTech Platform"
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Timeline</label>
                        <input
                          type="text"
                          value={editingStudy.timeline || ""}
                          onChange={(e) => setEditingStudy({ ...editingStudy, timeline: e.target.value })}
                          placeholder="e.g. 4 Weeks Deployment"
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="admin-grid-two">
                      <div className="admin-form-group">
                        <label>Sort Order Index</label>
                        <input
                          type="number"
                          value={editingStudy.sortOrder ?? 0}
                          onChange={(e) => setEditingStudy({ ...editingStudy, sortOrder: Number(e.target.value) })}
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group admin-checkbox-group">
                        <label className="admin-checkbox-label">
                          <input
                            type="checkbox"
                            checked={editingStudy.isPublished ?? true}
                            onChange={(e) => setEditingStudy({ ...editingStudy, isPublished: e.target.checked })}
                          />
                          <span>Publish to Website</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Card Section 2: Banner Image & Supabase Storage */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">2. Banner Image &amp; Storage</h3>
                    <p className="admin-section-sub">
                      Upload an image directly into the Supabase <code>case-study-media</code> bucket or enter a URL.
                    </p>

                    <div className="admin-media-upload-row">
                      <label htmlFor={imageUploadInputId} className="admin-upload-btn">
                        <Upload className="h-4 w-4" />
                        <span>{isUploadingImage ? "Uploading to Supabase..." : "Upload from Device"}</span>
                      </label>
                      <input
                        id={imageUploadInputId}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploadingImage}
                        style={{ display: "none" }}
                      />

                      <input
                        type="text"
                        value={editingStudy.image}
                        onChange={(e) => setEditingStudy({ ...editingStudy, image: e.target.value })}
                        placeholder="https://... or /assets/60ed30.jpg"
                        className="admin-input flex-1"
                      />
                    </div>

                    {editingStudy.image && (
                      <div className="admin-image-preview-box">
                        <img src={editingStudy.image} alt="Cover preview" />
                        <span className="admin-preview-tag">Image Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Card Section 3: Highlighted Metrics (Stats) */}
                  <div className="admin-section-card">
                    <div className="admin-section-header-flex">
                      <h3 className="admin-section-heading">3. Key Outcome Metrics</h3>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingStudy({
                            ...editingStudy,
                            stats: [...(editingStudy.stats || []), { value: "100%", label: "New Metric" }],
                          })
                        }
                        className="admin-add-sub-btn"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Metric</span>
                      </button>
                    </div>

                    <div className="admin-stats-inputs-list">
                      {editingStudy.stats?.map((stat, idx) => (
                        <div key={idx} className="admin-stat-input-row">
                          <input
                            type="text"
                            placeholder="Value (e.g. 75%)"
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...(editingStudy.stats || [])]
                              updated[idx].value = e.target.value
                              setEditingStudy({ ...editingStudy, stats: updated })
                            }}
                            className="admin-input stat-val-input"
                          />
                          <input
                            type="text"
                            placeholder="Label (e.g. Faster reporting)"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...(editingStudy.stats || [])]
                              updated[idx].label = e.target.value
                              setEditingStudy({ ...editingStudy, stats: updated })
                            }}
                            className="admin-input stat-lbl-input"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = editingStudy.stats?.filter((_, i) => i !== idx)
                              setEditingStudy({ ...editingStudy, stats: updated })
                            }}
                            className="admin-del-sub-btn"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Section 4: Narrative (Overview, Challenge, Solution) */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">4. Case Study Narrative</h3>

                    <div className="admin-form-group">
                      <label>Brief Card Description</label>
                      <textarea
                        rows={2}
                        value={editingStudy.description}
                        onChange={(e) => setEditingStudy({ ...editingStudy, description: e.target.value })}
                        className="admin-input admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Case Overview</label>
                      <textarea
                        rows={3}
                        value={editingStudy.overview || ""}
                        onChange={(e) => setEditingStudy({ ...editingStudy, overview: e.target.value })}
                        className="admin-input admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>The Challenge &amp; Problem</label>
                      <textarea
                        rows={3}
                        value={editingStudy.challenge || ""}
                        onChange={(e) => setEditingStudy({ ...editingStudy, challenge: e.target.value })}
                        className="admin-input admin-textarea"
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>The Kozker Solution &amp; Architecture</label>
                      <textarea
                        rows={3}
                        value={editingStudy.solution || ""}
                        onChange={(e) => setEditingStudy({ ...editingStudy, solution: e.target.value })}
                        className="admin-input admin-textarea"
                      />
                    </div>
                  </div>

                  {/* Card Section 5: Technologies & Integrations */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">5. Tech Stack &amp; Integrations</h3>
                    <p className="admin-section-sub">Comma-separated list of technologies used.</p>
                    <input
                      type="text"
                      value={editingStudy.techStack?.join(", ") || ""}
                      onChange={(e) => {
                        const tags = e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                        setEditingStudy({ ...editingStudy, techStack: tags })
                      }}
                      placeholder="e.g. Microsoft Power BI, Snowflake, Python, Stripe API"
                      className="admin-input"
                    />
                    <div className="admin-tags-preview">
                      {editingStudy.techStack?.map((t) => (
                        <span key={t} className="admin-tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Section 6: Key Deliverables & Scope */}
                  <div className="admin-section-card">
                    <div className="admin-section-header-flex">
                      <h3 className="admin-section-heading">6. Key Capabilities &amp; Deliverables</h3>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingStudy({
                            ...editingStudy,
                            deliverables: [
                              ...(editingStudy.deliverables || []),
                              { title: "New Capability", desc: "Brief description of the feature or workflow built." },
                            ],
                          })
                        }
                        className="admin-add-sub-btn"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Deliverable</span>
                      </button>
                    </div>

                    <div className="admin-deliv-inputs-list">
                      {editingStudy.deliverables?.map((item: CaseStudyCapability, idx: number) => (
                        <div key={idx} className="admin-deliv-input-block">
                          <div className="admin-deliv-header">
                            <span className="admin-deliv-num">#{idx + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = editingStudy.deliverables?.filter((_, i) => i !== idx)
                                setEditingStudy({ ...editingStudy, deliverables: updated })
                              }}
                              className="admin-del-sub-btn"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Deliverable Title (e.g. Automated Reconciliation ETL)"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...(editingStudy.deliverables || [])]
                              updated[idx].title = e.target.value
                              setEditingStudy({ ...editingStudy, deliverables: updated })
                            }}
                            className="admin-input mb-2"
                          />
                          <textarea
                            rows={2}
                            placeholder="Deliverable Description..."
                            value={item.desc}
                            onChange={(e) => {
                              const updated = [...(editingStudy.deliverables || [])]
                              updated[idx].desc = e.target.value
                              setEditingStudy({ ...editingStudy, deliverables: updated })
                            }}
                            className="admin-input admin-textarea"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Section 7: Quote & Testimonial */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">7. Testimonial Quote</h3>
                    <div className="admin-form-group">
                      <label>Quote Text</label>
                      <textarea
                        rows={2}
                        value={editingStudy.quote?.text || ""}
                        onChange={(e) =>
                          setEditingStudy({
                            ...editingStudy,
                            quote: {
                              text: e.target.value,
                              author: editingStudy.quote?.author || "— Client",
                            },
                          })
                        }
                        className="admin-input admin-textarea"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Author &amp; Role Citation</label>
                      <input
                        type="text"
                        value={editingStudy.quote?.author || ""}
                        onChange={(e) =>
                          setEditingStudy({
                            ...editingStudy,
                            quote: {
                              text: editingStudy.quote?.text || "",
                              author: e.target.value,
                            },
                          })
                        }
                        placeholder="— Head of Finance, FinScale Analytics"
                        className="admin-input"
                      />
                    </div>
                  </div>

                  {/* Card Section 8: CTA & Prefill Settings */}
                  <div className="admin-section-card">
                    <h3 className="admin-section-heading">8. Contact Enquiry Settings</h3>
                    <div className="admin-grid-two">
                      <div className="admin-form-group">
                        <label>CTA Button Text</label>
                        <input
                          type="text"
                          value={editingStudy.ctaText || "Start a Conversation"}
                          onChange={(e) => setEditingStudy({ ...editingStudy, ctaText: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                      <div className="admin-form-group">
                        <label>Target Link</label>
                        <input
                          type="text"
                          value={editingStudy.ctaHref || "/contact"}
                          onChange={(e) => setEditingStudy({ ...editingStudy, ctaHref: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>
                    <div className="admin-form-group">
                      <label>Prefilled Contact Subject</label>
                      <input
                        type="text"
                        value={editingStudy.prefilledSubject || ""}
                        onChange={(e) => setEditingStudy({ ...editingStudy, prefilledSubject: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div className="admin-form-group">
                      <label>Prefilled Contact Message</label>
                      <textarea
                        rows={2}
                        value={editingStudy.prefilledMessage || ""}
                        onChange={(e) => setEditingStudy({ ...editingStudy, prefilledMessage: e.target.value })}
                        className="admin-input admin-textarea"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Card & Modal Preview (Sticky) */}
                <div className="admin-preview-col">
                  <div className="admin-preview-sticky-box">
                    <div className="admin-preview-header">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-[#FF6E30]" />
                        <h4 className="font-semibold text-sm text-[#0C0B09]">Live Website Card Preview</h4>
                      </div>
                      <span className="text-xs text-[#8D8980]">Updates in real-time</span>
                    </div>

                    <div className="admin-card-render-wrapper">
                      <CaseStudyCard study={editingStudy} />
                    </div>

                    <div className="admin-preview-modal-trigger-box">
                      <button
                        type="button"
                        onClick={() => setIsPreviewModalOpen(true)}
                        className="admin-open-modal-preview-btn"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>View Full Modal Preview</span>
                      </button>
                    </div>

                    <CaseStudyDialog
                      study={editingStudy}
                      open={isPreviewModalOpen}
                      onOpenChange={setIsPreviewModalOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </main>
    </div>
  )
}
