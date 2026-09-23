const partnerLogos = [
  { src: "/assets/758ef6.svg", alt: "Logoipsum" },
  { src: "/assets/6a4e64.svg", alt: "IpSum" },
  { src: "/assets/666f4d.svg", alt: "logo ipsum" },
]

export function LogoStrip() {
  return (
    <div className="logo-marquee-container" aria-label="Partner logos marquee">
      <div className="logo-marquee-track">
        {/* Set 1 */}
        <div className="logo-marquee-group">
          {partnerLogos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="logo-marquee-item">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
        {/* Set 2 (for seamless loop) */}
        <div className="logo-marquee-group" aria-hidden="true">
          {partnerLogos.map((logo, index) => (
            <div key={`logo-2-${index}`} className="logo-marquee-item">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
        {/* Set 3 */}
        <div className="logo-marquee-group" aria-hidden="true">
          {partnerLogos.map((logo, index) => (
            <div key={`logo-3-${index}`} className="logo-marquee-item">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
        {/* Set 4 */}
        <div className="logo-marquee-group" aria-hidden="true">
          {partnerLogos.map((logo, index) => (
            <div key={`logo-4-${index}`} className="logo-marquee-item">
              <img src={logo.src} alt={logo.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

