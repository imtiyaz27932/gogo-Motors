import { Page } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";

export class DreamCarSearch {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors
    private newCartoggle = () => this.page.locator('div').filter({ hasText: /^New cars$/ }).first();
    private pricerangebtn = () => this.page.locator('div').filter({ hasText: /^Price range$/ });
    private searchCarInput = () => this.page.getByRole('textbox', { name: 'Search Cars, Brand, Body Type' });
    private selectprice = () => this.page.locator('span').filter({ hasText: 'Under ' })
    private searchbtn = () => this.page.getByRole('button', { name: 'Search' });
    private sortby = () => this.page.getByRole('button', { name: 'Sort By' });
    private lowtohighOption = () => this.page.getByRole('menuitem', { name: 'Low to High' });
    private hightolowOption = () => this.page.getByRole('menuitem', { name: 'High to Low' });
    private popularityOption = () => this.page.getByRole('menuitem', { name: 'Popularity' });
    private latestOption = () => this.page.getByRole('menuitem', { name: 'Latest' });
    private seeAllBrandslink = () => this.page.getByRole('button', { name: 'See all brands' })
    private sliderUpperThumb = () => this.page.getByRole('slider', { name: 'Upper thumb' });
    private changecitylink = () => this.page.getByRole('button', { name: 'Change city' })
    private selectcity = () => this.page.getByRole('img', { name: 'Riyadh' })
    private resetfilterbtn = () => this.page.getByRole('button', { name: 'Reset Filters' })
    private clearfilter = () => this.page.getByRole('button', { name: 'Clear all' })
    private searchcars = () => this.page.getByRole('textbox', { name: 'Search new cars' })
    private paginationdropdown = () => this.page.getByRole('button', { name: 'Show' })
    private usedCarToggle = () => this.page.getByRole('img', { name: 'used-cars' })


    

    private async ensurePageIsScrolled() {
            await scrollSmoothly(this.page, 2000, 300, 500);
        }


    private async sortBy(option: 'Low to High' | 'High to Low' | 'Popularity' | 'Latest') {
        
        await this.sortby().click();
        if (option === 'Low to High') await this.lowtohighOption().click();
        else if (option === 'High to Low') await this.hightolowOption().click();
        else if (option === 'Popularity') await this.popularityOption().click();
        else if (option === 'Latest') await this.latestOption().click();
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
    }

    private async increaseSliderLength(pixels: number = 50) {
        await this.ensurePageIsScrolled()
        const slider = this.sliderUpperThumb();
        const box = await slider.boundingBox();
        if (box) {
            await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(box.x + box.width / 2 + pixels, box.y + box.height / 2, { steps: 10 });
            await this.page.mouse.up();
        } else {
            console.error('Slider bounding box not found.');
        }
    }

    async searchForDreamCar() {
        await this.ensurePageIsScrolled();
        await this.newCartoggle().click();
        await this.pricerangebtn().click();
        await this.selectprice().click();
        await this.searchCarInput().fill('Nissan');
        await this.searchbtn().click();
        await this.page.waitForLoadState("networkidle");

        // Sort actions
        await this.sortBy('Low to High');
        await this.sortBy('High to Low');
        await this.sortBy('Popularity');
        await this.sortBy('Latest');
        await this.page.waitForLoadState('networkidle')
        await this.seeAllBrandslink().click();
        await this.page.evaluate(() => window.scrollBy(0, 1000));
        await this.page.waitForTimeout(3000)
        await this.increaseSliderLength(80);
        await this.page.waitForTimeout(2000);
        await this.searchcars().fill('Nissan');
        await this.page.keyboard.press('Enter')
        await this.page.waitForLoadState("networkidle")
        await this.clearfilter().click()
        await this.page.waitForLoadState('networkidle')
        await this.changecitylink().click();
        await this.page.waitForLoadState('networkidle')
        await this.selectcity().click();
        await this.paginationdropdown().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByText('50', { exact: true }).click();
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle')
        await this. page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(1000); 

    }
}