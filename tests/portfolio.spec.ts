import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E', () => {
  test('boot sequence and main content load', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Check for boot sequence text
    await expect(page.locator('text=initializing kernel')).toBeVisible();
    
    // Wait for boot to finish (approx 5s)
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible({ timeout: 10000 });
  });

  test('toggle api view', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    // Wait for main content
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible({ timeout: 10000 });

    // Click API toggle in navbar
    await page.click('button[title="Toggle API View"]');

    // Check for JSON content
    await expect(page.locator('text="status": 200')).toBeVisible();
    await expect(page.locator('text="x-powered-by": ".NET 8 (Simulated)"')).toBeVisible();

    // Toggle back
    await page.click('button[title="Toggle API View"]');
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible();
  });

  test('command palette opens', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await expect(page.locator('text=Senior Software Engineer')).toBeVisible({ timeout: 10000 });

    // Open via keyboard shortcut
    await page.keyboard.press('Meta+k');
    await expect(page.locator('input[placeholder="Type a command..."]')).toBeVisible();
    
    // Close via ESC
    await page.keyboard.press('Escape');
    await expect(page.locator('input[placeholder="Type a command..."]')).toBeHidden();

    // Open via Navbar button
    await page.click('button[title="Search (Cmd+K)"]');
    await expect(page.locator('input[placeholder="Type a command..."]')).toBeVisible();
  });
});
