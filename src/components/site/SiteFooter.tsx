import { Link } from "@tanstack/react-router"
import { Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer id="contact" className="footer" aria-label="Kozker footer">
      <div className="site-container">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand" aria-label="Kozker Tech home">
              <img src="/assets/19d5f3.png" alt="Kozker Tech" className="footer-brand-img" />
              <span className="footer-brand-text">Kozker Tech.</span>
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
              <li><Link to="/contact" className="footer-nav-link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-contact-column">
            <h4 className="footer-nav-heading">Get in Touch</h4>
            <div className="footer-contact-links">
              <div className="footer-phones-group">
                <a href="tel:+917306261147" className="footer-contact-phone font-mono">
                  +91-73062-61147
                </a>
                <a href="tel:+919846700327" className="footer-contact-phone font-mono">
                  +91 98467 00327
                </a>
              </div>
              <div className="footer-emails-group">
                <a href="mailto:contact@kozker.com?subject=Kozker%20Inquiry" className="footer-contact-email">
                  contact@kozker.com
                </a>
                <a href="mailto:support@kozker.com?subject=Kozker%20Support" className="footer-contact-email">
                  support@kozker.com
                </a>
              </div>
            </div>
            <p className="footer-contact-sub">
              Kozker Tech Pvt Ltd
              <br />
              1st Floor, Adithya Shopping Complex, Thoppumpady, Kochi, Kerala, India, P.O 682005
            </p>
            <div className="footer-social-row">
              <a
                href="https://www.linkedin.com/company/kozker-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-link"
                aria-label="Kozker on LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="h-7 w-7" aria-hidden="true" strokeWidth={1.8} />
              </a>
              <a
                href="https://www.instagram.com/kozkertech/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon-link"
                aria-label="Kozker on Instagram"
                title="Instagram"
              >
                <Instagram className="h-7 w-7" aria-hidden="true" strokeWidth={1.8} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-rule" />

        <div className="footer-meta">
          <span>© 2026 Kozker Tech Pvt Ltd. All rights reserved.</span>
          <span>Data, AI &amp; Automation</span>
        </div>
      </div>
    </footer>
  )
}
