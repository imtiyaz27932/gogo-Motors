import { expect, Page } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";

export class DiscountBudget {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private discountHeadingText = () => this.page.getByRole('heading', { name: 'Discounted new cars for your' });
    private tabList = () => this.page.locator('[role="tablist"]');
    private tab2 = () => this.page.getByRole('tab', { name: 'Under   ' });
    private tab3 = () => this.page.getByRole('tab', { name: ' 75,000 -' });
    private tab4 = () => this.page.getByRole('tab', { name: ' 1,30,000 -' });
    private tab5 = () => this.page.getByRole('tab', { name: ' 2,00,000 -' });
    private tab6 = () => this.page.getByRole('tab', { name: ' 2,50,000+' });
    private discountCarslink = () => this.page.getByRole('link', { name: 'View All Discounted Cars' })
    private cardeatilsview =()=> this. page.locator('h3[title="Adamp Motors SUNNY12"]')

   
    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 1200, 500);
    }


    async discountHeadingVisiblity() {
        await this.ensurePageIsScrolled();
        await this.page.waitForTimeout(500); 

        await expect(this.discountHeadingText()).toBeVisible();
        await this.page.waitForTimeout(2000)
        await this.page.waitForLoadState('networkidle');
    }


    async validateTabListVisible() {
        await this.ensurePageIsScrolled();
        await expect(this.tabList()).toBeVisible();
        await this.page.waitForTimeout(2000)
    }


    async clickAllTabs() {
        const tabs = [this.tab2(), this.tab3(), this.tab4(), this.tab5(), this.tab6()];

        for (const [index, tab] of tabs.entries()) {
            await this.ensurePageIsScrolled();
            await tab.scrollIntoViewIfNeeded();
            await tab.click({ force: true });

            console.log(`🟢 Clicked on tab ${index + 1}`);
            await this.page.waitForTimeout(500);

            const isActive = await tab.getAttribute("data-state");

            console.log(`🔍 Tab ${index + 1} state: ${isActive}`);
            await expect(tab).toHaveAttribute("data-state", "active", { timeout: 5000 });
        }
    }
    async ClickingOnDiscountCarsLink() {
        await this.ensurePageIsScrolled()
        await this.discountCarslink().click()
        await this.page.waitForLoadState('networkidle')
        

    }

    async clickFirstCarView() {
        await this.ensurePageIsScrolled();
        await this.page.waitForTimeout(100)
        await this.cardeatilsview().click()
        await this.page.waitForLoadState('domcontentloaded');
        
    }
}
