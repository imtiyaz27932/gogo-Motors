import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";
import { DiscountNewCars } from '../pages/discountNewCarsPage'

export class SellCarPage {
    private page: Page;
    //private discountNewCars: DiscountNewCars;

    constructor(page: Page) {
        this.page = page;
       //this.discountNewCars = new DiscountNewCars(page);
    }

    // Selector
    private carImageSelector = 'img[alt="Looking to sell your car?"]';
    private sellcarHeading = () => this.page.getByText('Looking to sell your car?')
    private listCarButton = () => this.page.getByRole('button', { name: 'List your Car' })
    private ownerid = () => this.page.getByRole('textbox', { name: 'e.g. W1N0J8AB1MF29566' })
    private sequenceNumber = () => this.page.getByRole('textbox', { name: 'e.g. W1N0J8AB1', exact: true })
    private getDetailsButton = () => this.page.getByRole('button', { name: 'Get car details' })
    private selectMakeDropdown = () => this.page.locator('div').filter({ hasText: /^Select MakeSelect$/ }).locator('div').nth(1);
    private manufacturerYearDropdown = () => this.page.locator('div').filter({ hasText: /^Manufacturing YearSelect$/ }).locator('div').nth(1);
    private selectModelDropdown = () => this.page.locator('div').filter({ hasText: /^Select ModelSelect$/ }).locator('div').nth(1);
    private confirmbtn = () => this.page.getByRole('button', { name: 'Confirm' });
    private automatiicbtn = () => this.page.getByRole('listitem').filter({ hasText: 'SAutomatic' })
    private variant = () => this.page.getByRole('listitem').filter({ hasText: 'test2' })
    private selectcity = () => this.page.getByRole('img', { name: 'Riyadh' })
    private phonefile = () => this.page.locator('input[type="tel"]')
    private procedbtn = () => this.page.getByRole('button', { name: 'Proceed' })
    private otp =() =>  this. page.locator('input[type="text"]').first()





    async ensurePageIsScrolled() {
        await scrollSmoothly(this.page, 2000, 900, 700);
    }

    async carImageVisibility() {
        await this.ensurePageIsScrolled();
        const carImage = this.page.locator(this.carImageSelector);
        await carImage.scrollIntoViewIfNeeded();
        await expect(carImage).toBeVisible();
    }

    async sellCarHeadingVisibility() {
        const carImage = this.page.locator(this.carImageSelector);
        await carImage.scrollIntoViewIfNeeded();
        await expect(this.sellcarHeading()).toBeVisible();
    }

    async clicklistCarButton() {
        await this.listCarButton().scrollIntoViewIfNeeded();
        await this.listCarButton().click();
        await this.page.waitForLoadState('networkidle');
        await this.ownerid().click();
        await this.ownerid().fill('7000102744')
        await this.page.waitForTimeout(2000)
        await this.sequenceNumber().fill('919654020')
        await this.getDetailsButton().click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillDetails() {
        await this.selectMakeDropdown().click();
        await this.page.locator('span.dropdown-item').filter({ hasText: /^NISSAN$/ }).click();
        await this.page.waitForTimeout(1000);

        // Select Manufacturing Year
        await this.manufacturerYearDropdown().scrollIntoViewIfNeeded();
        await this.manufacturerYearDropdown().click();
        await this.page.getByText('2025', { exact: true }).click();
        await this.page.waitForTimeout(1000);

        // Select Model
        await this.selectModelDropdown().scrollIntoViewIfNeeded();
        await this.selectModelDropdown().click();
        await this.page.getByText('SUNNY', { exact: true }).click();
        await this.page.waitForTimeout(1000);
        await this.confirmbtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.variant().click();
        await this.page.waitForTimeout(4000)
        await this.selectcity().click()
        await this.page.waitForLoadState('networkidle')
    }

    async fillingPhoneDetails() {
        await this.page.getByRole('combobox').selectOption('+966');
        await this.phonefile().fill('531938880')
        await this.page.waitForTimeout(3000)
        await this.procedbtn().click();
        await this.page.waitForTimeout(2000)
        await this.otp().fill('9461');
        await this.page.waitForTimeout(2000)
        await this.page.waitForLoadState('networkidle')
    }
    }
