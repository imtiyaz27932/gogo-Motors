import { Page } from '@playwright/test';

export async function slowScrollDown(page: Page, step = 100, delay = 300) {
  await page.evaluate(
    async ({ step, delay }) => {
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    },
    { step, delay }
  );
}

export async function slowScrollUp(page: Page, step = 100, delay = 300) {
  await page.evaluate(
    async ({ step, delay }) => {
      for (let y = document.body.scrollHeight; y > 0; y -= step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    },
    { step, delay }
  );
}
