import { Page, Locator } from '@playwright/test';
import fs from 'fs-extra';

export class BrandPage {
    readonly page: Page;
    readonly brandImages: Locator;
    readonly seeAllLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.brandImages = page.locator('.grid.grid-cols-10 img');
        this.seeAllLink = this.page.getByRole('link', { name: 'See all' })
    }

    async getBrandCount() {
        return await this.brandImages.count();
    }

    async getAllBrandInfo() {
        const count = await this.getBrandCount();
        const brandInfoList: { alt: string; locator: Locator }[] = [];
        for (let i = 0; i < count; i++) {
            const brandImg = this.brandImages.nth(i);
            brandInfoList.push({
                alt: await brandImg.getAttribute('alt') ?? `Brand ${i + 1}`,
                locator: brandImg,
            });
        }
        return brandInfoList;
    }

    async isSeeAllVisible() {
        return await this.seeAllLink.isVisible();
    }

    async clickSeeAll() {
        await this.seeAllLink.scrollIntoViewIfNeeded()
        await this.seeAllLink.waitFor({ state: 'visible' });
        await this.seeAllLink.click();
        await this.page.waitForLoadState('networkidle')

    }

    async isImageBroken(locator: Locator) {
        return await locator.evaluate(
            (img: HTMLImageElement) => img.naturalWidth === 0 || img.naturalHeight === 0
        );
    }

    async getBrokenImagesWithScreenshots() {
        await fs.ensureDir('test-results/screenshots');
        const brokenImages: string[] = [];
        const brands = await this.getAllBrandInfo();

        for (const brand of brands) {
            const isBroken = await this.isImageBroken(brand.locator);
            if (isBroken) {
                brokenImages.push(brand.alt || 'Unnamed brand');
                await brand.locator.screenshot({
                    path: `test-results/screenshots/${brand.alt?.replace(/\s+/g, '_')}-broken.png`,
                });
            }
        }
        return brokenImages;
    }
}
