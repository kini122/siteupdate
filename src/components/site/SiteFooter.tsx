import { Link } from "@tanstack/react-router"

export function SiteFooter() {
  return (
    <footer id="contact" className="footer" aria-label="Kozker footer">
      <div className="site-container">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand" aria-label="Kozker home">
              <img src="/assets/19d5f3.png" alt="Kozker" className="footer-brand-img" />
              <span>Kozker.</span>
            </Link>
            <p className="footer-note">
              Simple systems that save time, reduce manual work, and keep your business moving.
            </p>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-nav-heading">Navigation</h4>
            <ul className="footer-nav-list">
              <li><Link to="/services" search={{ tab: "data-bi" }} className="footer-nav-link">Services</Link></li>
              <li><Link to="/products" className="footer-nav-link">Products</Link></li>
              <li><Link to="/work" className="footer-nav-link">Work</Link></li>
              <li><Link to="/about" className="footer-nav-link">About</Link></li>
              <li><Link to="/partners" className="footer-nav-link">Partners</Link></li>
            </ul>
          </div>

          <div className="footer-contact-column">
            <h4 className="footer-nav-heading">Get in Touch</h4>
            <a href="mailto:hello@kozker.com?subject=Kozker%20consultation" className="footer-contact-email">
              hello@kozker.com
            </a>
            <p className="footer-contact-sub">Available worldwide for custom AI &amp; systems engineering.</p>
          </div>
        </div>

        <div className="footer-rule" />

        <div className="footer-meta">
          <span>© 2024 KozkerTech. All rights reserved.</span>
          <span>Data, AI &amp; Automation</span>
        </div>
      </div>
    </footer>
  )
}
