import { Page, Locator } from '@playwright/test';
import fs from 'fs-extra';

export class BrandPage {
    readonly page: Page;
    readonly brandImages: Locator;
    readonly seeAllLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brandImages = page.locator('.grid.grid-cols-10 img');
        this.seeAllLink = page.locator('//a[@href="/en/new-cars" and normalize-space(text())="See all"]');
    }

    async getBrandCount() {
        await this.brandImages.first().waitFor({ state: 'visible', timeout: 10000 });
        return await this.brandImages.count();
    }

    async getAllBrandInfo() {
        const count = await this.getBrandCount();
        const brandInfoList: { alt: string; locator: Locator }[] = [];
        for (let i = 0; i < count; i++) {
            const brandImg = this.brandImages.nth(i);
            await brandImg.waitFor({ state: 'visible', timeout: 10000 });
            brandInfoList.push({
                alt: await brandImg.getAttribute('alt') ?? `Brand ${i + 1}`,
                locator: brandImg,
            });
        }
        return brandInfoList;
    }

    async isSeeAllVisible() {
        try {
            await this.seeAllLink.waitFor({ state: 'visible', timeout: 10000 });
            return await this.seeAllLink.isVisible();
        } catch {
            return false;
        }
    }

    async clickSeeAll() {
        await this.seeAllLink.scrollIntoViewIfNeeded();
        await this.seeAllLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.seeAllLink.click();
        // Wait for navigation or a specific element on the new page if possible
        await this.page.waitForLoadState('domcontentloaded');
    }

    async isImageBroken(locator: Locator) {
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        return await locator.evaluate(
            (img: HTMLImageElement) => img.naturalWidth === 0 || img.naturalHeight === 0
        );
    }

    async getBrokenImagesWithScreenshots() {
        await fs.ensureDir('test-results/screenshots');
        const brokenImages: string[] = [];
        const brands = await this.getAllBrandInfo();

        for (const brand of brands) {
            try {
                const isBroken = await this.isImageBroken(brand.locator);
                if (isBroken) {
                    brokenImages.push(brand.alt || 'Unnamed brand');
                    await brand.locator.screenshot({
                        path: `test-results/screenshots/${brand.alt?.replace(/\s+/g, '_')}-broken.png`,
                    });
                }
            } catch (err) {
                // Log and continue with the next image
                console.warn(`Error checking image for brand "${brand.alt}": ${err}`);
            }
        }
        return brokenImages;
    }
}