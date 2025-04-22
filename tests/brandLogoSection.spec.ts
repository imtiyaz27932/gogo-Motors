import { test, expect } from '@playwright/test';
import { BrandPage } from '../pages/brandSectionPage';
import { HeaderPage } from '../pages/headerPage';
import { Logger } from '../utils/logger';

test.describe('Brand Section Validation', () => {
  let headerPage: HeaderPage;

  test.beforeEach(async ({ page }) => {
    await page.addStyleTag({ content: `* { transition: none !important; animation: none !important; }` });
    headerPage = new HeaderPage(page);
    await headerPage.navigateToHomePage();
    await Logger.divider();
    await Logger.info('Navigated to Home Page');
  });

  test('Validate all brand images and detect broken ones with screenshots', async ({ page }) => {
    const brandPage = new BrandPage(page);

    await Logger.info('Fetching all brand images...');
    const brands = await brandPage.getAllBrandInfo();

    await Logger.info(`Total brands found: ${brands.length}`);

    for (const brand of brands) {
      await Logger.info(`Checking visibility for brand: ${brand.alt}`);
      await expect(brand.locator, `${brand.alt} image should be visible`).toBeVisible();
    }

    await Logger.info('Checking for broken images...');
    const brokenImages = await brandPage.getBrokenImagesWithScreenshots();

    if (brokenImages.length > 0) {
      await Logger.error(`Broken images found: ${brokenImages.join(', ')}`);
      await Logger.info('Screenshots saved in test-results/screenshots/');
    } else {
      await Logger.success('✅ All brand images are working fine.');
    }

    expect(brokenImages.length, 'Broken images detected').toBe(0);

    await Logger.info('Checking "See all" link visibility...');
    expect(await brandPage.isSeeAllVisible(), '"See all" link should be visible').toBeTruthy();

    await Logger.info('Clicking on "See all" link...');
    await brandPage.clickSeeAll();

    await Logger.success('🎉 Test completed successfully!');
    await Logger.divider();
  });
});
