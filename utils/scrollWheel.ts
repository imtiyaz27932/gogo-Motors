import { Page } from "@playwright/test";

/**
 * Smoothly scrolls down the page in multiple steps.
 * @param page - Playwright Page object.
 * @param totalPixels - Total number of pixels to scroll (default: 2000).
 * @param step - Pixels to scroll per step (default: 400).
 * @param delay - Delay between steps in milliseconds (default: 300).
 */
export async function scrollSmoothly(page: Page, totalPixels: number = 2000, step: number = 400, delay: number = 300) {
    for (let scrolled = 0; scrolled < totalPixels; scrolled += step) {
        await page.mouse.wheel(0, step);
        await page.waitForTimeout(delay); 
    }
}
