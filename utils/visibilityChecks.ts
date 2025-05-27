import { expect, Locator } from '@playwright/test';

export async function expectVisible(locator: Locator, label: string) {
  await locator.waitFor({ state: 'visible', timeout: 7000 });
  await expect(locator, `${label} should be visible`).toBeVisible();
}
