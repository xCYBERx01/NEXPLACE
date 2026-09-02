import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { resolve } from "node:path"

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    dedupe: ["three", "react", "react-dom"],
    alias: {
      three: resolve("./node_modules/three")
    }
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@react-three/rapier") || id.includes("@dimforge") || id.includes("@rapier")) return "physics"
            if (id.includes("node_modules/three/")) return "three"
          }
        }
      }
    }
  }
})