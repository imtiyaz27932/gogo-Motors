


import { Page, expect } from "@playwright/test";
import { DiscountNewCars } from "../discountNewCarsPage";
import { Logger } from "../../utils/logger";
import { TIMEOUT } from "dns";

export class ExtendedWarranty {
    private page: Page;
    private discountNewCars: DiscountNewCars;

    constructor(page: Page, discountNewCars: DiscountNewCars) {
        this.page = page;
        this.discountNewCars = discountNewCars;
    }

    // Selectors
    private serviceTab = () => this.page.getByRole('navigation').getByText('Services');
    private extendedwarranty = () => this.page.getByRole('link', { name: 'Extended Warranty Get' });
    private nationalIDfield = () => this.page.locator('input[name="customerNationalId"]');
    private dobfield = () => this.page.locator('input[name="dateOfBirth"]');
    private confirmbtn = () => this.page.getByRole('button', { name: 'Confirm' });
    private kmdriven = () => this.page.getByRole('textbox', { name: 'eg:' });
    private endKm = () => this.page.getByRole('spinbutton');
    private endDate = () => this.page.locator('input[name="MwEndDate"]');
    private packagebtn = () => this.page.getByRole('button', { name: 'Get Packages' });
    private selectplanbtn = () => this.page.getByRole('button', { name: 'Select This Plan' });
    private promocode = () => this.page.getByRole('textbox', { name: 'eg FIRST300' });
    private paynowbtn = () => this.page.getByRole('button', { name: 'Pay Now' });
    private homepagebtn = () => this.page.getByRole('button', { name: 'Go to Home Page' });
    private benefitheader = () => this.page.locator('text=Benefits you get').nth(0);
    private benefitItems = () => this.page.locator('.flex.items-start.pb-4');
    private sectionTitle = () => this.page.locator('text=Extended Warranty Eligible Criteria');
    private criteriaItems = () => this.page.locator('div.flex.items-start.pb-4');
    private sectiontitle = () => this.page.getByRole('heading', { name: 'Process to Buy' })
    private contactUsHeading = () => this.page.locator('h2', { hasText: 'Contact Us' });
    private writeToUsLabel = () => this.page.locator('p.text-lg', { hasText: 'Write To Us' });
    private writeToUsEmail = () => this.page.locator('a[href^="mailto:"]');
    private callUsLabel = () => this.page.locator('p.text-lg', { hasText: 'Call Us' });
    private callUsNumber = () => this.page.locator('p.text-xl', { hasText: '8002440258' });
    private downloadAppHeading = () => this.page.locator('h2', { hasText: 'Download our app for a more convenient experience!' });
    private downloadAppDescription = () => this.page.locator('p', { hasText: 'Please visit your app store to download the app.' });
    private googlePlayLink = () => this.page.locator('a[href*="play.google.com"]').first();

    private googlePlayImg = () => this.page.locator('img[src*="google_play.png"]');
    private ppStoreLink = () => this.page.locator('a[href*="apps.apple.com"]:has(img[src*="app_store.png"])');

    private appStoreImg = () => this.page.locator('img[src*="app_store.png"]');
    private emailaddress = () => this.page.getByRole('textbox', { name: 'Email Address' })
    private proceedbtn = () => this.page.getByRole('button', { name: 'Proceed' })
    private otpfiled = () => this.page.getByRole('textbox', { name: 'Please enter OTP' })
    private verifybtn = () => this.page.getByRole('button', { name: 'Verify' })

    async ServiceTab() {
        await this.serviceTab().hover();
        await this.extendedwarranty().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    async checkEligibilityFromDiscountNewCars() {
        await this.discountNewCars.checkEligibility();
    }

    async verifyCarForm() {
        await this.discountNewCars.verifyCarForm();
    }

    async ConfirmCarDetails() {
        await this.discountNewCars.ConfirmCarDetails();
    }

    async NationalID() {
        await this.nationalIDfield().fill('2550205963');
        await this.page.waitForTimeout(2000);
        await this.dobfield().fill('09/10/1990');
        await this.page.waitForLoadState('networkidle');
        await this.confirmbtn().click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('networkidle');
    }

    async KmDetails() {
        await this.kmdriven().fill('2000');
        await this.endKm().fill('5');
    }

    private getFutureDate() {
        const today = new Date();
        today.setMonth(today.getMonth() + 1);
        const day = today.getDate().toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    }

    private async checkForBlockingMessages(): Promise<boolean> {
        const alreadyRegisteredMsg = this.page.getByText('Your vehicle is already');
        const selectAnotherCarBtn = this.page.getByRole('button', { name: 'Select Another Car' });

        try {
            await Promise.race([
                expect(alreadyRegisteredMsg).toBeVisible({ timeout: 5000 }),
                expect(selectAnotherCarBtn).toBeVisible({ timeout: 5000 }),
            ]);
            console.log("⚠️ Vehicle already registered or 'Select Another Car' message shown.");
            return true;
        } catch (error) {
            if (
                error instanceof Error &&
                (error.message.includes("expect.toBeVisible") || error.message.includes("Timeout"))
            ) {
                console.log("✅ No registration conflict. Proceeding.");
                return false;
            }
            throw error;
        }
    }

    async selectEndDate(): Promise<boolean> {
        const futureDate = this.getFutureDate();
        console.log(`📅 Selecting end date: ${futureDate}`);

        await this.endDate().click();
        await this.endDate().fill(futureDate);
        await this.page.locator('body').click();
        await this.page.waitForTimeout(100);
        await this.packagebtn().click();
        await this.page.waitForLoadState('networkidle');

        const isBlocked = await this.checkForBlockingMessages();
        if (isBlocked) {
            console.log("⛔️ Vehicle already registered. Skipping further steps.");
            return false;
        }

        return true;
    }

    async SelectPlan() {
        await this.selectplanbtn().click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('networkidle');
    }

    async applyPromoCode() {
        await this.promocode().fill('MJZUAT');
        await this.page.getByRole('button', { name: 'Apply' }).click();

        await this.page.waitForTimeout(1000);
      

   
       
    
        // async payWithoutPromoCode() {
        //     await this.paynowbtn.scrollIntoViewIfNeeded();
        
        //     await Promise.all([
        //       this.page.waitForNavigation({ waitUntil: 'load' }),
        //       this.paynowbtn.click(),
        //     ]);
        
        //     await this.enterCardDetails();
        //   }

      
    }

    async usedCarsDiscount() {
        await this.discountNewCars.usedCarsDiscount();
    }

    async kmdeatils(): Promise<boolean> {
        await this.kmdriven().fill('2000');
        await this.page.waitForTimeout(1000);
        await this.packagebtn().click();
        await this.page.waitForLoadState('networkidle');

        const isBlocked = await this.checkForBlockingMessages();
        if (isBlocked) {
            console.log("⛔️ Vehicle already registered (used car). Skipping further steps.");
            return false;
        }

        return true;
    }

    async gogoProshield() {
        await this.page.locator('h1').scrollIntoViewIfNeeded();
        await expect(this.page.locator('h1')).toHaveText('What is GOGO Proshield?');
        await expect(this.page.locator('body')).toContainText('GOGO Proshield is comprehensive extended warranty plan design to protect your');


    }



    async skipPromocode() {
        await this.paynowbtn().scrollIntoViewIfNeeded();
        await this.paynowbtn().click();
        //await this.packagebtn().click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000)

        await this.page.getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
        await this.page.getByRole('textbox', { name: 'Name on Card' }).fill('Test User');
        await this.page.getByPlaceholder('MM/YY').fill('12/26');
        await this.page.getByRole('textbox', { name: 'CVV' }).fill('123');

        await this.page.getByRole('button', { name: /place order/i }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
        await this.homepagebtn().click();
    }


    private expectedBenefits = [
        'Best in class warranty coverage for new and pre-owned cars.',
        'Total transparency in terms of coverage and claims with zero deductibles.',
        'Variety in coverage plans to meet your requirements.',
        'Kingdom wide highly trained and professional network of warranty repair facilities.',
        'Up to 3 Years and Unlimited* KM warranty plans.'
    ];
    async verifyBenefitsSectionVisible() {
        await this.benefitheader().scrollIntoViewIfNeeded();
        await expect(this.benefitheader()).toBeVisible();
    }

    async getBenefitTexts(): Promise<string[]> {
        return this.benefitItems().allTextContents();
    }

    async verifyAllBenefitsVisible() {
        const actualBenefits = await this.getBenefitTexts();
        for (let i = 0; i < this.expectedBenefits.length; i++) {
            expect(actualBenefits[i]).toContain(this.expectedBenefits[i]);
        }
    }


    async validateEligibilitySection() {
        const expectedTexts = [
            'Must be a Saudi registered vehicle.',
            'Must be a GCC specification vehicle.',
            'Must be either a passenger car or a light commercial vehicle.',
            'Must be less than 7 years of age and 150,000 km driven.',
            'Must be an Internal Combustion Engine, Electric or Hybrid vehicle.'
        ];

        await this.sectionTitle().scrollIntoViewIfNeeded();
        await expect(this.sectionTitle()).toBeVisible();

        const items = await this.criteriaItems();

        for (const expectedText of expectedTexts) {
            let found = false;
            const count = await items.count();

            for (let i = 0; i < count; i++) {
                const itemText = await items.nth(i).innerText();
                if (itemText.includes(expectedText)) {
                    found = true;
                    break;
                }
            }

            expect(found).toBeTruthy();
        }
    }



    async validateSectiontitle() {
        await this.sectiontitle().scrollIntoViewIfNeeded()
        await expect(this.sectiontitle()).toBeVisible();
        await expect(this.sectiontitle()).toHaveText('Process to Buy');
    }

    async validateContactUsSection() {
        await this.contactUsHeading().scrollIntoViewIfNeeded()
        await expect(this.contactUsHeading()).toBeVisible();
        await expect(this.writeToUsLabel()).toHaveText('Write To Us');
        await expect(this.writeToUsEmail()).toHaveText('care@gogoproshield.com');
        await expect(this.callUsLabel()).toHaveText('Call Us');
        await expect(this.callUsNumber()).toHaveText('8002440258');
    }
    
    
    async validateDownloadAppSection() {
        await this.downloadAppHeading().scrollIntoViewIfNeeded()
        await expect(this.downloadAppHeading()).toBeVisible();
        await expect(this.downloadAppDescription()).toBeVisible();
        await expect(this.googlePlayImg()).toBeVisible();
        await expect(this.appStoreImg()).toBeVisible();
    }
    async enterEmail() {
        await this.emailaddress().fill('portal@gogomotor.com');
        await this.proceedbtn().click();
        await this.page.waitForLoadState('networkidle');
    
        await this.otpfiled().fill('9461');
        await this.verifybtn().click();
        await this.page.waitForLoadState('networkidle');
    
        await this.paynowbtn().scrollIntoViewIfNeeded();
        console.log("Clicking on Pay Now...");
    
      
        await this.paynowbtn().click({ force: true });
        Logger.info('Pay Now Button clicked successfully')
        const navigationPromise = this.page.waitForURL('**/payment', {
            timeout: 240000, 
            waitUntil: 'load',
        });
        
        try {
            // Wait for the main element or elements that indicate the page is fully loaded
            await Promise.all([
                navigationPromise,
                this.page.waitForSelector('text="Select Payment Method"', { timeout: 240000, state: 'visible' }), , // Adjust the selector accordingly
            ]);
        
            // Additional checks like waiting for network idle state can be added if needed
            await this.page.waitForLoadState('networkidle', { timeout: 240000 }); // This ensures no network requests are in progress
        
            console.log('Page has loaded successfully');
        } catch (error) {
            console.error('Failed to load the page:', error);
        }
        
        await this.page.getByRole('textbox', { name: 'Card Number' }).fill('4111111111111111');
        await this.page.getByRole('textbox', { name: 'Name on Card' }).fill('Test User');
        await this.page.getByPlaceholder('MM/YY').fill('12/26');
        await this.page.getByRole('textbox', { name: 'CVV' }).fill('123');
    
        await this.page.getByRole('button', { name: /place order/i }).click();
        await this.page.waitForLoadState('networkidle');
    
        await expect(this.page.getByText(/congratulations!/i)).toBeVisible();
    
        await this.homepagebtn().click();
        await this.page.waitForLoadState('networkidle');
      }
    }