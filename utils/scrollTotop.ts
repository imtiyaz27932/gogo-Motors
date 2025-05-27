import { Page } from "@playwright/test";

export async function scrollToTop(page: Page) {
    await page.evaluate(async () => {
        await new Promise<void>((resolve) => {
            const distance = 200;
            const delay = 100;

            const timer = setInterval(() => {
                const scrollTop = window.scrollY;

                if (scrollTop <= 0) {
                    clearInterval(timer);
                    resolve();
                } else {
                    window.scrollBy(0, -distance);
                }
            }, delay);
        });
    });

    await page.waitForTimeout(1000); 
}
