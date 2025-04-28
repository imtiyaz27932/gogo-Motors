import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { scrollSmoothly } from "../utils/scrollWheel";
import { DiscountNewCars } from '../pages/discountNewCarsPage'
import { Logger } from "../utils/logger";

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
    private otp = () => this.page.locator('input[type="text"]').first()
    private kmsdriven = () => this.page.getByRole('textbox', { name: 'For eg.' })
    private continuebtn = () => this.page.locator('form').filter({ hasText: 'You can share approximate kms' }).getByRole('button')
    private uploadcarimage = () => this.page.getByText('Upload car photos')
    private continue2btn = () => this.page.getByRole('button', { name: 'Continue' }).first()
    private enterPriceSAR = () => this.page.locator('input[name="expected_price"]')
    private submitbtn = () => this.page.getByRole('button', { name: 'Submit' })
    private wearelistening = () => this.page.getByText('We are listening')
    private enterlistenningreview = () => this.page.getByRole('textbox', { name: 'How can we improve things' })
    private submitfeedback = () => this.page.getByRole('button', { name: 'Submit Feedback' })
    private successMessage = () => this.page.getByText('Feedback Submitted')
    private closepopup = () => this.page.locator('#breadcrumb-id').getByRole('img')



    // Buy and sell used Car Selectors
    private buyandSellUsedCar = () => this.page.getByRole('navigation').getByText('Buy & Sell Used Cars')
    private clicksellusedcar = () => this.page.getByRole('link', { name: 'Sell My Car Sell your car' })
    private selectCarBrand = () => this.page.getByRole('img', { name: 'TOYOTA' })
   

    // Car Year Selector
    private selectyear = () => this.page.getByRole('listitem').filter({ hasText: '2024' })
    private selectcar1 = () => this.page.getByText('FORTUNER')
    private selectautomatic = () => this.page.getByRole('listitem').filter({ hasText: 'SAutomatic' })
    private city = () => this.page.getByRole('img', { name: 'Riyadh' })

    // Km Driven selector
    private kmdriven = () => this.page.getByRole('textbox', { name: 'eg:' });





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
        await this.page.waitForLoadState('load')
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

    async kmsDriven() {
        Logger.info('Filling the kms driven details');
        await this.kmsdriven().fill('1000');
        await this.page.waitForTimeout(4000);
        await this.continuebtn().click();
        await this.page.waitForLoadState('networkidle')
    }

    async uploadCarImage() {
        Logger.info('Uploading car image');
        const filePath = 'D:/gogomotor/carimage.jpg';
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.uploadcarimage().click(),
        ]);
    
        await fileChooser.setFiles(filePath);
    
        Logger.info('Car image uploaded successfully');
        await this.page.waitForTimeout(4000);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(15000);
        await this.continue2btn().click();
        await this.page.waitForLoadState('networkidle');
    }

    async enterPrice() {
        Logger.info('Filling the expected price')
        await this.enterPriceSAR().fill('6000')
        await this.page.waitForTimeout(1000)
        await this.submitbtn().click();
        await this.page.waitForLoadState('networkidle')

    }

    async weAreListening() {
        Logger.info('Submitting a review message');
        await this.wearelistening().scrollIntoViewIfNeeded();
        await this.enterlistenningreview().fill('Test message for review listening')
        await this.page.waitForTimeout(2000);
        await this.submitfeedback().click();
        await this.page.waitForLoadState('networkidle')
        
        Logger.info('Waiting for success message to appear');
        await expect(this.successMessage()).toBeVisible()
        Logger.info('Success Message is visible')
        await this.closepopup().click()
    }

    async hoveronBuyandSellCars() {
        Logger.info("Hovering on Buy and Sell Cars in Header")
        await this.buyandSellUsedCar().hover();
        Logger.info('Clicking on Sell My Car Link')
        await this.clicksellusedcar().click();
        await this.page.waitForLoadState('networkidle');

    }

    async SelectCarBrand() {
        Logger.info('Clicking on the car brand image')
        await this.selectCarBrand().click();
        await this.page.waitForLoadState('networkidle')
    }
    async selectCarYear() {
        Logger.info('Selecting the car Year');
        await this.selectyear().click();
        await this.page.waitForLoadState('networkidle')
        await this.selectcar1().click();
        await this.page.waitForLoadState('networkidle');
        await this.selectautomatic().click();
        await this.page.waitForLoadState('networkidle');
    }
    async selectCity() {
        await this.city().click();
        await this.page.waitForLoadState('networkidle');
    }

    async kilomDriven() {
        await this.kmdriven().fill('2000');
        await this.page.waitForTimeout(1000);
        await this.continuebtn().click();
        
    }
    
}