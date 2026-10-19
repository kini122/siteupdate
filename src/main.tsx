import { StrictMode } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"
import App from "./App.tsx"
import { router } from "./router"

const queryClient = new QueryClient()

const rootEl = document.getElementById("root")!

const mount = async () => {
  try {
    await router.load()
  } catch {
    // Ignore
  }

  const content = (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  )

  if (rootEl && rootEl.hasChildNodes()) {
    try {
      hydrateRoot(rootEl, content)
      return
    } catch {
      // Fallback to createRoot if hydration encounters an issue
    }
  }

  createRoot(rootEl).render(content)
}

mount()
