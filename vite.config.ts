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
  build: {
    modulePreload: {
      resolveDependencies: (_filename, deps) => {
        return deps.filter((dep) => !dep.includes("supabase"))
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("@supabase")) return "supabase"
            if (id.includes("lucide-react")) return "lucide"
            if (id.includes("motion")) return "motion"
            if (id.includes("@tanstack")) return "router"
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
