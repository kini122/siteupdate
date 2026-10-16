import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

function dynamicSitemapPlugin(): Plugin {
  return {
    name: "dynamic-sitemap-middleware",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split("?")[0] === "/sitemap.xml") {
          try {
            const { default: sitemapHandler } = await import("./api/sitemap.ts")
            await sitemapHandler(req, res)
          } catch (err) {
            console.error("Error generating dynamic sitemap:", err)
            next()
          }
          return
        }
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split("?")[0] === "/sitemap.xml") {
          try {
            const { default: sitemapHandler } = await import("./api/sitemap.ts")
            await sitemapHandler(req, res)
          } catch (err) {
            console.error("Error generating dynamic sitemap:", err)
            next()
          }
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dynamicSitemapPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
