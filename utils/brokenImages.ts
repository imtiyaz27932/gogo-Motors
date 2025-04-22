import { Page } from '@playwright/test';

export async function checkForBrokenImages(page: Page) {
    const images = await page.$$('img');
    let brokenImagesCount = 0;

    for (const image of images) {
        const src = await image.getAttribute('src');
        const naturalWidth = await image.evaluate(img => img.naturalWidth);

        if (naturalWidth === 0) {
            console.error(`❌ Broken image detected: ${src}`);
            await page.screenshot({ path: `screenshots/broken_image_${Date.now()}.png` });
            brokenImagesCount++;
        }
    }

    if (brokenImagesCount > 0) {
        throw new Error(`Found ${brokenImagesCount} broken images on the page.`);
    } else {
        console.log('✅ No broken images found on the page.');
    }
}
