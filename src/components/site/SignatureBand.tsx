import { useState, useEffect } from "react"

export function SignatureBand() {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false)
  const [iframeHeight, setIframeHeight] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        let data = e.data
        if (typeof data === "string") {
          try {
            data = JSON.parse(data)
          } catch {
            return
          }
        }
        if (!data || typeof data !== "object") return

        // Cal.com sends resize events in different formats across versions:
        // __dimensionChanged event with data.iframeHeight or data.data.iframeHeight
        const rawHeight =
          data.data?.iframeHeight ??
          data.iframeHeight ??
          data.payload?.iframeHeight ??
          data.data?.height ??
          data.height ??
          data.payload?.height ??
          data.data?.size?.height ??
          data.size?.height ??
          data.cal?.height ??
          data.data?.dimensions?.height ??
          data.dimensions?.height

        const numHeight =
          typeof rawHeight === "number"
            ? rawHeight
            : typeof rawHeight === "string"
              ? parseInt(rawHeight, 10)
              : NaN

        if (!isNaN(numHeight) && numHeight > 300) {
          const mobile = typeof window !== "undefined" && window.innerWidth <= 768
          // On mobile, add comfortable bottom breathing room (40px) so slot buttons & confirm CTA never clip
          const buffer = mobile ? 40 : 0
          const minAllowed = mobile ? 750 : 580
          setIframeHeight(Math.max(Math.ceil(numHeight) + buffer, minAllowed))
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
      <div
        id="book-call"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: "none",
          visibility: "hidden",
        }}
      />
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
            style={
              iframeHeight
                ? { height: `${iframeHeight}px`, minHeight: `${iframeHeight}px` }
                : undefined
            }
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
              loading="eager"
              scrolling={isMobile ? "auto" : "no"}
              onLoad={() => setIsIframeLoaded(true)}
              allow="camera; microphone; autoplay; clipboard-write; encrypted-media; fullscreen"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
