import { expect, Page } from "@playwright/test";
import { Logger } from "../../utils/logger";

export class Fastlane {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

   
    private sellFastLaneLink = () => this.page.getByRole('link', { name: /sell with fastlane/i });


    async clicksellFastLaneLink() {
        Logger.info('➡ Clicking on Sell With Fastlane link');
        const fastlanelink = this.sellFastLaneLink();

        await expect(fastlanelink).toBeVisible({ timeout: 15000 });
        await expect(fastlanelink).toBeEnabled({ timeout: 7000 });
        await fastlanelink.scrollIntoViewIfNeeded();
        await fastlanelink.click({ force: true });

        
        await this.page.waitForURL(/\/sell-my-car\/fastlane$/, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await expect(this.page).toHaveURL(/\/sell-my-car\/fastlane$/);

        Logger.success('✅ Clicked on Sell With Fastlane link');
        Logger.success('✅ Navigated to Sell With Fastlane page');
    }
}