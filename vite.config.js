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
            // Pin React in its own vendor chunk. Without this, Rollup hoists
            // react/react-dom into the physics chunk (imported by the rapier
            // wrapper), which makes the entry statically depend on the 2.5MB
            // physics bundle and defeats lab-entry code-splitting.
            // suspend-react + three-stdlib are shared by drei (landing) and
            // the rapier wrapper (lab) — same treatment, or they drag the
            // same static edge into physics.
            // @react-three/fiber + @react-three/drei ditto: the rapier
            // wrapper imports fiber hooks, so unpinned fiber/drei modules
            // shared with landing get absorbed into physics the same way.
            if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/") || id.includes("node_modules/scheduler") || id.includes("node_modules/suspend-react") || id.includes("node_modules/three-stdlib") || id.includes("node_modules/@react-three/fiber") || id.includes("node_modules/@react-three/drei")) return "vendor"
          }
        }
      }
    }
  }
})