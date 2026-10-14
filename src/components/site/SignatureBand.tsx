import { useState, useEffect } from "react"

export function SignatureBand() {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [iframeHeight, setIframeHeight] = useState<number | null>(null)

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data
        if (data && (data.type === "CAL:RESIZE" || data.action === "resize")) {
          const height = data.data?.height || data.height
          if (typeof height === "number" && height > 350) {
            setIframeHeight(Math.ceil(height))
          }
        }
      } catch {
        // Ignore non-JSON postMessages from browser extensions or other sources
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <section
      className="signature-band book-call-section"
      aria-label="Book a call with Kozker"
      id="cal"
    >
      <div id="book-call" aria-hidden="true" style={{ position: "absolute", top: 0 }} />
      <div className="site-container book-call-container">
        {/* Simple heading in the exact style of other headings on the page */}
        <div className="section-heading book-call-heading">
          <h2>
            Book a <span className="accent-text">Call</span>
            <span className="accent-dot">.</span>
          </h2>
          <p>
            Schedule an introductory consultation directly on our calendar.
          </p>
        </div>

        {/* Embedded Cal.com Card with Calendar & Details */}
        <div className="cal-embed-card">
          <div
            className="cal-iframe-container"
            style={iframeHeight ? { height: `${iframeHeight}px` } : undefined}
          >
            {!isIframeLoaded && (
              <div className="cal-loading-placeholder" aria-label="Loading calendar">
                <div className="cal-loading-spinner" />
                <span className="cal-loading-text">Loading calendar...</span>
              </div>
            )}
            <iframe
              src="https://cal.com/kozker/data-ai-consulting?embed=true&theme=light"
              title="30 Minute Introductory Consulting Call | Kozker Tech"
              className={`cal-embed-iframe ${isIframeLoaded ? "is-loaded" : "is-loading"}`}
              loading="lazy"
              scrolling="no"
              onLoad={() => setIsIframeLoaded(true)}
              allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
