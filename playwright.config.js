import { defineConfig } from "@playwright/test"

// Hallway-test rig for NEXPLACE. Chromium only (Firefox/WebKit browsers are
// not cached in CI/dev machines); the 3D canvas renders under SwiftShader,
// which is slow but sufficient — all assertions target DOM state, and the
// ~3.3s timer-driven preloader gate needs generous timeouts.
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 90000,
  expect: { timeout: 15000 },
  reporter: [["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [{ name: "chromium" }],
  webServer: {
    command: "npm run preview -- --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
})
