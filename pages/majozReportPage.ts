import { Page, expect } from '@playwright/test';
import { scrollSmoothly } from '../utils/scrollWheel'


export class MajozReport {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private secondCardExploreButton = () => this.page.getByRole('link', { name: 'Explore now' }).nth(1)
    private HeadingText = () => this.page.getByRole('heading', { name: 'Get a Mojaz Car History' })
    private carvisibility = () => this.page.getByRole('img', { name: 'Mojaz Car History Report -' })
    private enterVINnumber = () => this.page.getByRole('textbox', { name: 'Enter VIN Number' })
    private getFreeReportBtn = () => this.page.locator('section').filter({ hasText: 'Get a Mojaz Car History' }).getByRole('button')
    private mobileno = () => this.page.locator('#modal-root').getByRole('textbox')
    private proceedbtn = () => this.page.getByRole('button', { name: 'Proceed' })
    private enterOTP = () => this.page.locator('input[name="OTPNumber"]')
    private confirmbttn = () => this.page.getByRole('button', { name: 'Confirm' })
    private headingText2 = () => this.page.getByRole('heading', { name: 'Unveil Your Car\'s True Story' })
    private getfullreport92 = () => this.page.getByRole('button', { name: 'Get full report for ' })
    private getfullreportbtn = () => this.page.getByRole('button', { name: 'Get Free Report' }).nth(1)
    private imagevalidation = () => this.page.locator('img[alt="car"]');

    //selectors for the True story section
    private header = () => this.page.locator('h2', { hasText: "Unveil Your Car's True Story" });
    private description = () => this.page.locator('p', { hasText: "The Mojaz report provides complete transparency" });
    private features = () => this.page.locator('.grid.grid-cols-2 div.flex');
    private getFullReportBtn = () => this.page.locator('button.btn-primary', { hasText: 'Get full report' });
    private getFreeRepor3tBton = () => this.page.locator('button.btn-secondary', { hasText: 'Get Free Report' });

    // Reporter card selectors
    private reportCards = () => this.page.locator('.snap-x > div');

   
    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 600, 500);
    }



    // Methods
    async clickSecondCardExploreButton() {
        await this.ensurePageIsScrolled();
        await this.page.waitForSelector('.swiper-slide');
        await this.page.waitForLoadState('domcontentloaded');
       
        await this.secondCardExploreButton().scrollIntoViewIfNeeded();
        await expect(this.secondCardExploreButton()).toBeVisible();
        await this.secondCardExploreButton().click();
    }

    async CheckTextVisiblity() {
        await this.ensurePageIsScrolled()
        await this.HeadingText().scrollIntoViewIfNeeded();
        await expect(this.HeadingText()).toBeVisible();
        await expect(this.carvisibility()).toBeVisible();
    }

    async FillVinNumber() {
        await this.enterVINnumber().fill('LSJA36E32LZ027958');
        await this.page.waitForLoadState('networkidle')
        await this.getFreeReportBtn().click();
        await this.page.waitForLoadState('load');
        await this.page.waitForTimeout(3000);
    }

    async EnterPhoneNumber() {
        await this.mobileno().fill('1234567890');
        await this.page.waitForLoadState('networkidle');
        await this.proceedbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        await this.enterOTP().fill('1234');
        await this.confirmbttn().click();
        await this.page.waitForLoadState('networkidle');
    }

    async GetFullReport92() {
       
        await this.ensurePageIsScrolled()
        await this.getfullreport92().scrollIntoViewIfNeeded()
        await this.getfullreport92().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async GetFreeReport() {
        await this.ensurePageIsScrolled()
        await this.headingText2().scrollIntoViewIfNeeded();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        await this.getfullreportbtn().scrollIntoViewIfNeeded();
        await this.getfullreportbtn().click();
        await this.page.waitForLoadState('networkidle');
    }

    async validateReportCard(index: number, expectedTitle: string, expectedDescription: string) {
        
        const card = this.reportCards().nth(index);
        await expect(card).toBeVisible();
        await expect(card.locator('h3')).toHaveText(expectedTitle);
        await expect(card.locator('p')).toContainText(expectedDescription);
    }

    async validateAllReportCards() {
        await this.ensurePageIsScrolled()

        for (let i = 0; i < 3; i++) {
            
            await this.page.waitForTimeout(500);
            await this.validateReportCard(
                0,
                'Reports for All Vehicles',
                'We provide information on every vehicle in the Kingdom'
            );
            await this.validateReportCard(
                1,
                'Comprehensive Reports',
                'With vehicle information collected from multiple sources'
            );
            await this.validateReportCard(
                2,
                'Easy to View',
                'Through Mojaz, you could be able to find all the requested vehicle'
            );

            await expect(this.imagevalidation()).toBeVisible();
        }
    }

    async verifyReportImageVisible() {
        await this.ensurePageIsScrolled()
       
        await this.header().scrollIntoViewIfNeeded();
        await expect(this.imagevalidation()).toBeVisible();
    }

    async verifyHeader() {
        await this.ensurePageIsScrolled()
         
        await this.description().scrollIntoViewIfNeeded();
        await expect(this.header()).toBeVisible();
    }

    async verifyDescription() {
        await this.ensurePageIsScrolled();
          
        await this.description().scrollIntoViewIfNeeded();
        await expect(this.description()).toBeVisible();
    }

    async verifyFeatureCount(expectedCount: number) {
        await this.ensurePageIsScrolled()
         
        await this.description().scrollIntoViewIfNeeded();
        await expect(this.features()).toHaveCount(expectedCount);
    }

    async verifyButtons() {
        await this.ensurePageIsScrolled()
       
        await this.description().scrollIntoViewIfNeeded();
        await expect(this.getFullReportBtn()).toBeVisible();
        await expect(this.getFreeRepor3tBton()).toBeVisible();
    }
}
