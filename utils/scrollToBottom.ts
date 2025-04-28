import { Page } from "@playwright/test";
export async function scrollToBottom(page: Page) {
    await page.evaluate(async () => {
        // Scroll step-by-step until you're at the bottom
        await new Promise<void>((resolve) => {
            const distance = 200;
            const delay = 100;

            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                const scrollTop = window.scrollY;
                const windowHeight = window.innerHeight;

                if (scrollTop + windowHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                } else {
                    window.scrollBy(0, distance);
                }
            }, delay);
        });
    });

    await page.waitForTimeout(1000); // Allow lazy-loaded footer elements to render
}
