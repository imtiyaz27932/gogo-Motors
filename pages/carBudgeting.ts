import { Page, Locator, expect } from '@playwright/test';
import { scrollSmoothly } from '../utils/scrollWheel';

export class CarBudgetingPage {
    readonly page: Page;
    readonly emiInput: Locator;
    readonly incrementButton: Locator;
    readonly decrementButton: Locator;
    readonly durationOptions: Locator;
    readonly selectedDuration: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emiInput = page.locator('input#price');
        this.incrementButton = page.getByText('+ 500')
        this.decrementButton = page.getByText('- 500').first()
        this.durationOptions = page.locator('div[class*="cursor-pointer bg-white text-[#757575]"]'); // Unselected duration
        this.selectedDuration = page.locator('div[class*="cursor-pointer bg-black text-white"]'); // Selected duration
    }


    private async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 2000, 500);
    }


    async setEMI(value: number) {
        await this.page.mouse.wheel(0, 3000)
        await this.emiInput.fill(value.toString());
        const enteredValue = await this.emiInput.inputValue();
        expect(enteredValue.replace(/,/g, '')).toBe(value.toString());
    }


    async increaseEMI() {
        await this.ensurePageIsScrolled()
        await this.page.mouse.wheel(0, 4000)
        await this.incrementButton.click();

    }


    async selectDurationWithDelay() {
        await this.ensurePageIsScrolled()
        await this.page.mouse.wheel(0, 4000)
        const durations = this.page.locator('div[class*="w-[54px]"]');
        const count = await durations.count();
        console.log(`Total duration options: ${count}`);

        for (let i = 0; i < count; i++) {
            await durations.nth(i).click();
            console.log(`Clicked on duration: ${i + 1}`);
            await this.page.waitForTimeout(2000);
        }
    }

}

