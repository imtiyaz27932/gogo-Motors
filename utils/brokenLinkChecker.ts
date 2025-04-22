import { Page } from "@playwright/test";

export class BrokenLinkChecker {
    // Function to check if an image is broken
    static async checkBrokenImages(page: Page) {
        const images = await page.locator('img').all();
        const brokenImages: { src: string | null; status: number }[] = [];

        for (const image of images) {
            const src = await image.getAttribute('src');
            if (src) {
                const response = await page.request.get(src);
                if (response.status() >= 400) {
                    brokenImages.push({ src, status: response.status() });
                }
            }
        }

        if (brokenImages.length > 0) {
            console.error('Broken Images:', brokenImages);
            return brokenImages;
        }

        console.log('No broken images found.');
        return [];
    }

    // Function to check if a link is broken
    static async checkBrokenLinks(page: Page) {
        const links = await page.locator('a').all();
        const brokenLinks: { href: string | null; status: number }[] = [];

        for (const link of links) {
            const href = await link.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                const response = await page.request.get(href);
                if (response.status() >= 400) {
                    brokenLinks.push({ href, status: response.status() });
                }
            }
        }

        if (brokenLinks.length > 0) {
            console.error('Broken Links:', brokenLinks);
            return brokenLinks;
        }

        console.log('No broken links found.');
        return [];
    }
}