import { test, expect } from "@playwright/test"

// Hallway task from docs/strategy.md:
// "open Projects → find Croc OS → contact" must succeed end to end.
// The preloader gate is timer-driven (~3.3s), so the first assertion waits
// on .site-content rather than sleeping a fixed duration.
test.describe("hallway: Projects → Croc OS → contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    // Preloader withholds all content until its timers finish.
    await page.locator(".site-content").waitFor({ state: "attached", timeout: 30000 })
  })

  test("finds Croc OS in the catalog and opens its case file", async ({ page }) => {
    const work = page.locator("#work")
    await work.scrollIntoViewIfNeeded()

    const row = page.locator(".work-row", { hasText: "Croc OS" }).first()
    await expect(row).toBeVisible()

    // Keyboard path opens the case file (click only selects for preview).
    await row.focus()
    await page.keyboard.press("Enter")

    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText("Croc OS")

    // Focus trap: initial focus lands on the close button.
    await expect(page.getByRole("button", { name: "Close project" })).toBeFocused()

    await page.keyboard.press("Escape")
    await expect(dialog).toBeHidden()
  })

  test("contact section exposes a working email CTA", async ({ page }) => {
    const contact = page.locator("#contact")
    await contact.scrollIntoViewIfNeeded()

    const email = page.locator('a[href^="mailto:"]')
    await expect(email).toBeVisible()
    await expect(email).toHaveAttribute("href", "mailto:iahmedakrami@gmail.com")
  })
})
