import { test as base, expect } from '@playwright/test';
import { HeaderPage } from '../pages/headerPage';
import { MajozReport } from '../pages/majozReportPage';
import { Logger } from './logger';
import { CarDealsPage } from '../pages/exclusiveDealsPage';

type MyFixtures = {
    headerPage: HeaderPage;
    reports: MajozReport;
    DealsPage: CarDealsPage;
};

export const test = base.extend<MyFixtures>({
    headerPage: async ({ page }, use) => {
        const headerPage = new HeaderPage(page);
        await headerPage.navigateToHomePage();
          // Apply 50% zoom AFTER navigation
          await page.evaluate(() => {
            document.body.style.zoom = '50%';
        });
        await use(headerPage);
    },
    reports: async ({ page }, use) => {
        const reports = new MajozReport(page);
        await use(reports);
    },
    DealsPage: async ({ page }, use) => {
        const DealsPage = new CarDealsPage(page);
        await use(DealsPage);
      },
});

test.beforeAll(async () => {
    await Logger.info('--- Starting  test suite ---');
});

test.afterAll(async () => {
    await Logger.success('--- Finished test suite ---');
});

test.afterEach(async ({}, testInfo) => {
    if (testInfo.status === 'passed') {
        await Logger.success(`Test passed: ${testInfo.title}`);
    } else if (testInfo.status === 'failed') {
        await Logger.error(`Test failed: ${testInfo.title}`);
    } else {
        await Logger.warn(`Test finished with status: ${testInfo.status} - ${testInfo.title}`);
    }
    await Logger.divider();
});
