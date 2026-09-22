import { Link } from "@tanstack/react-router"

export function NotFoundPage() {
  return <section className="page-hero"><div className="site-container"><span className="eyebrow">404</span><h1 className="display-title">Page not found<span className="accent-dot">.</span></h1><Link to="/" className="button-primary mt-8 inline-flex">Back home</Link></div></section>
}
