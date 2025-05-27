import { Page } from "@playwright/test";
import { Logger } from "../../utils/logger";
import { expect } from "@playwright/test";

export class mobileUsedClass {
    private page: Page;

    constructor(page: Page) {
        this.page = page
    }



    //Selectors for Mobile
    private humberginiicon = () => this.page.getByRole('button', { name: 'mobile menu toggle' })

    // Buy and sell used cars selectors
    private hoveronBuysellusedcars = () => this.page.getByRole('button', { name: 'Buy & Sell Used Cars' }).first()
    private usedCarlink = () => this.page.getByText('Buy Used Cars', { exact: true }).nth(2)
    
    //Toggle Selectors
    private toggle = () => this.page.locator('div > svg > path:nth-child(2)').first()
    
    // SortBy Selectors
    private sortby = () => this.page.locator('div').filter({ hasText: /^Sort By$/ })
    private priceLowToHighOption = () => this.page.getByText('Low to High', { exact: true }).nth(0);
    private priceHighToLowOption = () => this.page.getByText('High to Low', { exact: true }).nth(0);
    private emiLowToHighOption = () => this.page.getByText('Low to High', { exact: true }).nth(1);
    private emiHighToLowOption = () => this.page.getByText('High to Low', { exact: true }).nth(1);
    private yearNewestToOldestOption = () => this.page.getByText('Newest to Oldest', { exact: true });
    private yearOldestToNewestOption = () => this.page.getByText('Oldest to newest', { exact: true });
    private defaultOption = () => this.page.getByText('Default', { exact: true });
    private showfilter = () => this.page.locator('button').filter({ hasText: /Show \d+ Cars/ })

    
    // Budget Locators
    private budget = () => this.page.locator('div').filter({ hasText: /^Budget$/ }).first()

    // EMI selectors
    private setemi = () => this.page.locator('div').filter({ hasText: /^EMI$/ }).first()

    // Make and Model
    private makeAndModel = () => this.page.locator('div').filter({ hasText: /^Make & Models$/ }).first()
    
    // Model Year selectors
    private modeYear = () => this.page.locator('div').filter({ hasText: /^Model Year$/ }).first()
    
    // body type selectors
    private bodytype = () => this.page.locator('div').filter({ hasText: /^Body type$/ }).first()

    // Fuel Type Selectors
    private fueltype = () => this.page.locator('div').filter({ hasText: /^Fuel type$/ }).first()
    
    // Transmission Selectors
    private transmissionType = () => this.page.locator('div').filter({ hasText: /^Transmission$/ }).first()

    // Exterior Color selectors
    private exteriorcolor = () => this.page.locator('div').filter({ hasText: /^Exterior Colour$/ }).first()

    //Interior Color Selectors
    private interiorcolor = () => this.page.locator('div').filter({ hasText: /^Interior Colour$/ }).first()

    //Ownership Selectors
    private ownership = () => this.page.locator('div').filter({ hasText: /^Ownership$/ }).first()
    
    //Kilometers Driven selectors
    private kilometersdriven = () => this.page.locator('div').filter({ hasText: /^Kilometres driven$/ }).first()
    
    // Features Selecors
    private features = () => this.page.locator('div').filter({ hasText: /^Features$/ }).first()

     // Wishlist icon selectors
     private wishlisticon = () => this.page.locator('.w-\\[24px\\] > path').first()

     // Card details selectors
     private carCards = () => this.page.locator('section > div.bg-white');

     // Make Your offer
     private makeOffer = () => this.page.getByRole('button', { name: 'Make your offer' })
     private makeofferbtn = () => this.page.getByRole('button', { name: 'Continue to make an offer' })
     private filloffer = () => this.page.getByRole('spinbutton', { name: '' })
     private sendofferbtn = () => this.page.getByRole('button', { name: 'Send your offer' })
     private donebtn = () => this.page.getByRole('button', { name: 'Done' })
 
     // Contact Seller selector
     private contactsellerbtn = () => this.page.getByRole('button', { name: 'Contact seller' }).first()
 
     // specification selector
     private specification = () => this.page.getByRole('button', { name: 'View full specification' })
     
     // report Listing selector
     private reportlisting = () => this.page.getByRole('button', { name: 'Report this listing' })
     private concerns = () => this.page.getByRole('textbox', { name: 'Please type your concerns' })
     private submitbtn = ()=> this.page.getByRole('button', { name: 'Submit' })

 


    async clickonMenu() {
        await this.humberginiicon().click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickonBuySellUsedCars() {
        Logger.info('Clicking on buy and sell used cars')
        await this.hoveronBuysellusedcars().click();
    }

    async clickonUsedCar() {
        Logger.info('Clicking on Used Car link')
        await this.usedCarlink().click();
        await this.page.waitForLoadState('networkidle')
    }
    async clickonToggle() {
        Logger.info('Turning Toggle ON/OFF');
        await this.toggle().evaluate(el => el.scrollIntoView({ block: 'center' }));
        await this.page.waitForTimeout(500); // Let sticky headers/overlays settle
    
        // Optionally wait for a known overlay to disappear
        // await this.page.locator('.header-mobile').waitFor({ state: 'hidden' });
    
        await expect(this.toggle()).toBeVisible(); // Optional: assert it's visible
        await this.toggle().click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }
    


    
    async sortBy(option: string) {
        Logger.info(`Sorting by: ${option}`);
        await this.sortby().click();

        switch (option) {
            case 'Price: Low to High':
                await this.priceLowToHighOption().click();
                break;
            case 'Price: High to Low':
                await this.priceHighToLowOption().click();
                break;
            case 'EMI: Low to High':
                await this.emiLowToHighOption().click();
                break;
            case 'EMI: High to Low':
                await this.emiHighToLowOption().click();
                break;
            case 'Year: Newest to Oldest':
                await this.yearNewestToOldestOption().click();
                break;
            case 'Year: Oldest to Newest':
                await this.yearOldestToNewestOption().click();
                break;
            case 'Default':
                await this.defaultOption().click();
                break;
            default:
                throw new Error(`Unsupported sort option: ${option}`);
        }

        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(2000);
    }

    async clearFilters() {
        await this.showfilter().click();
        await this.page.waitForTimeout(2000)
    }

    async clickonBudget() {
        await this.budget().click();
        await this.page.waitForLoadState('networkidle')
    }

    async setPriceRange(minOffset: number, maxOffset: number) {
        const priceSlider = this.page.locator('div').filter({ hasText: /^Set price range$/ });
        const thumbs = priceSlider.locator('[role="slider"]');
        const lowerThumb = thumbs.nth(0);
        const upperThumb = thumbs.nth(1);
    
        await lowerThumb.waitFor({ state: 'visible' });
        await upperThumb.waitFor({ state: 'visible' });
    
        const lowerBox = await lowerThumb.boundingBox();
        const upperBox = await upperThumb.boundingBox();
    
        if (!lowerBox || !upperBox) throw new Error('Slider bounding boxes not found');
    
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2, lowerBox.y + lowerBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2 + minOffset, lowerBox.y + lowerBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    
        await this.page.waitForTimeout(500);
        await this.page.mouse.move(upperBox.x + upperBox.width / 2, upperBox.y + upperBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(upperBox.x + upperBox.width / 2 - maxOffset, upperBox.y + upperBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    
        await this.page.waitForTimeout(2000);
    }


    async clickonEMI() {
        await this.setemi().click();
        await this.page.waitForTimeout(1000);

    }
    
    
    async setEmiSliderRange(lowerOffset: number, upperOffset: number) {
        const emiSection = this.page.locator('div').filter({ hasText: /^Set EMI range$/ });
    
        const lowerThumb = emiSection.getByLabel('Lower thumb').first()
        const upperThumb = emiSection.getByLabel('Upper thumb').first()
    
        Logger.info(`Moving Lower thumb by ${lowerOffset}px`);
        const lowerBox = await lowerThumb.boundingBox();
        if (!lowerBox) throw new Error('Lower thumb bounding box not found');
    
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2, lowerBox.y + lowerBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2 + lowerOffset, lowerBox.y + lowerBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    
        Logger.info(`Moving Upper thumb by ${upperOffset}px`);
        const upperBox = await upperThumb.boundingBox();
        if (!upperBox) throw new Error('Upper thumb bounding box not found');
    
        await this.page.mouse.move(upperBox.x + upperBox.width / 2, upperBox.y + upperBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(upperBox.x + upperBox.width / 2 + upperOffset, upperBox.y + upperBox.height / 2, { steps: 10 });
        await this.page.mouse.up();
    
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }
    

    async clickonMakeAndModel() {
        await this.makeAndModel().click();
        await this.page.waitForTimeout(2000)

        const allOptions = this.page.locator('label:has(input[type="checkbox"])');
        const count = await allOptions.count();
    
        for (let i = 0; i < count; i++) {
            const label = allOptions.nth(i);
            const checkbox = label.locator('input[type="checkbox"]');
            const isChecked = await checkbox.isChecked();
            
            if (!isChecked) {
                Logger.info(`Clicking option ${i + 1} of ${count}`);
                await label.click();
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async clickonModelYear() {
        await this.modeYear().click()
        await this.page.waitForTimeout(2000)
    }

    async setYearRangeSlider(lowerOffset: number, upperOffset: number) {
        Logger.info('Dragging year range slider thumbs');
    
        const sliderContainer = this.page.locator('div').filter({ hasText: /^Set year range$/ });
    
        const lowerThumb = sliderContainer.getByLabel('Lower thumb').first()
        const upperThumb = sliderContainer.getByLabel('Upper thumb').first()
    
        const lowerBox = await lowerThumb.boundingBox();
        const upperBox = await upperThumb.boundingBox();
    
        if (!lowerBox || !upperBox) throw new Error('Slider thumbs not found');
    
        // Move lower thumb to the right (increase minimum year)
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2, lowerBox.y + lowerBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(lowerBox.x + lowerBox.width / 2 + 80, lowerBox.y + lowerBox.height / 2); // adjust offset
        await this.page.mouse.up();
        await this.page.waitForTimeout(1000);
    
        // Move upper thumb to the left (decrease maximum year)
        await this.page.mouse.move(upperBox.x + upperBox.width / 2, upperBox.y + upperBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(upperBox.x + upperBox.width / 2 - 80, upperBox.y + upperBox.height / 2); // adjust offset
        await this.page.mouse.up();
    
        Logger.success('Year range adjusted successfully');
    }


    async clickonBodyType() {
        await this.bodytype().click()
        await this.page.waitForTimeout(2000)

        const bodyTypes = ['Sedan', 'Coupe', 'Sports Car', 'Hatchback', 'Van/Minivan', 'Small SUV', 'MPV', 'Large SUV', 'Pick Up'];

        for (const type of bodyTypes) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await card.scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected body type: ${type}`);
            await this.page.waitForTimeout(1000);
        }
    }

    async clickonFuelType() {
        await this.fueltype().click();
        await this.page.waitForTimeout(1000)

        const fuelTypes = ['Petrol', 'Diesel', 'HEV', 'MHEV', 'PHEV', 'EV', 'LPG'];
        for (const type of fuelTypes) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await card.scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected fuel type: ${type}`);
            await this.page.waitForTimeout(1000);
        }
    }

    async clickonTransmission() {
        await this.transmissionType().click();
        await this.page.waitForTimeout(1000)

        const transmissionTypes = ['Automatic', 'Manual'];
        for (const type of transmissionTypes) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await card.scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected transmission type: ${type}`);
            await this.page.waitForTimeout(1000);
        }
    }

    async clickonExteriorColor() {
        await this.exteriorcolor().click();
        await this.page.waitForTimeout(1000)

        const colors = ['Black', 'White']
        for (const type of colors) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await this.exteriorcolor().scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected exterior color: ${type}`);
            await this.page.waitForTimeout(1000);
        }

    }

    async clickonInteriorColor() {
        Logger.info('Clicking on Interior Color');
        await this.interiorcolor().click();
        await this.page.waitForTimeout(100);

        const colors = ['Black', 'White']
        for (const type of colors) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await this.interiorcolor().scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected interior color: ${type}`);
            await this.page.waitForTimeout(1000);
        }

    }

    async clickonOwnership() {
        await this.ownership().click();
        await this.page.waitForTimeout(1000)

        const owners = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner'];
    
        for (const owner of owners) {
            const ownerRow = this.page.locator('div').filter({ hasText: new RegExp(`^${owner}$`) });
            const checkboxSpan = ownerRow.locator('span').first()
            Logger.info(`Clicking checkbox for: ${owner}`);
            await checkboxSpan.click();
            await this.page.waitForTimeout(1000);
        }
    }
    
    async clickonKms() {
        await this.kilometersdriven().click();
        await this.page.waitForTimeout(1000)


    }
        async setKilometersDrivenRange(lowerOffset: number, upperOffset: number) {
            Logger.info('clicking on kilometers driven');
        
            // Locate the kilometers driven slider section
            const kmSection = this.page.locator('div').filter({ hasText: /^Set range$/ });
        
            // Locate the lower and upper thumbs inside this section
            const lowerThumb = kmSection.getByLabel('Lower thumb').first()
            const upperThumb = kmSection.getByLabel('Upper thumb').first()
        
            Logger.info(`Moving Lower thumb by ${lowerOffset}px`);
            const lowerBox = await lowerThumb.boundingBox();
            if (!lowerBox) throw new Error('Lower thumb bounding box not found for Kilometers Driven');
        
            await this.page.mouse.move(lowerBox.x + lowerBox.width / 2, lowerBox.y + lowerBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(lowerBox.x + lowerBox.width / 2 + lowerOffset, lowerBox.y + lowerBox.height / 2, { steps: 10 });
            await this.page.mouse.up();
        
            Logger.info(`Moving Upper thumb by ${upperOffset}px`);
            const upperBox = await upperThumb.boundingBox();
            if (!upperBox) throw new Error('Upper thumb bounding box not found for Kilometers Driven');
        
            await this.page.mouse.move(upperBox.x + upperBox.width / 2, upperBox.y + upperBox.height / 2);
            await this.page.mouse.down();
            await this.page.mouse.move(upperBox.x + upperBox.width / 2 + upperOffset, upperBox.y + upperBox.height / 2, { steps: 10 });
            await this.page.mouse.up();
        
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
        }

    
    async clickonFeatures() {
        await this.features().click();
        await this.page.waitForTimeout(1000)
        const featuresToClick = [
            'Cooled Seats',
            'Heated Seats',
            'Leather Interior',
            'Sunroof',
            'DVD Video',
            'Blind Spot Sensors',
            'Lane Departure Warning',
            'GPS Navigation'
        ];
    
        for (const featureName of featuresToClick) {
            Logger.info(`Clicking on feature: ${featureName}`);
            const feature = this.page.getByText(featureName, { exact: true }).first()
            await feature.click();
            await this.page.waitForTimeout(1000);
        }
    }


    async clickWishlistIcon() {
        Logger.info('Clicking on wishlist');
        await this.wishlisticon().click();
        
    }

  async getCarCount() {
    return this.carCards().count();
  }

  getCarTitle(index: number) {
    return this.carCards().nth(index).locator('a span[title]');
  }

  getCarPrice(index: number) {
    return this.carCards().nth(index).locator('p.text-\\[\\#212121\\]');
  }
  

  getCarMileage(index: number) {
    return this.carCards().nth(index).locator('p:has-text("KM")');
  }

  getCarFuel(index: number) {
    return this.carCards().nth(index).locator('p:has-text("Petrol"), p:has-text("Diesel")');
  }

  getCarLocation(index: number) {
    return this.carCards().nth(index).locator('p.overflow-ellipsis.overflow-hidden');
  }
  

  getCarLink(index: number) {
    return this.carCards().nth(index).locator('a');
  }

  async clickCar(index: number) {
    await this.getCarLink(index).click();
  }

  async getCarLinkHref(index: number) {
    return this.getCarLink(index).getAttribute('href');
    }


    async makeYourOffer() {
        Logger.info('Clicking on make an Offer button');
        await this.makeOffer().click();
        await this.page.waitForTimeout(2000)
        await this.makeofferbtn().click();
        await this.page.waitForTimeout(2000);
        await this.filloffer().fill('80000')
        await this.sendofferbtn().click();
        await this.page.waitForLoadState('networkidle')
        await this.donebtn().click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickcontactSeller() {
        await this.contactsellerbtn().click({force:true})
        await this.page.waitForLoadState('networkidle')
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await this.page.waitForLoadState('networkidle')
    }

    async clickonCarSpecification() {
        Logger.info('clicking on the view Specification');
        await this.specification().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.locator('.py-\\[18px\\] > div > button').first().click();
        await this.page.waitForTimeout(1000)
        
    }

    async clickonReportListing() {
        Logger.info('Clicking on report listing')
        this.page.locator('[id="\\33 637"]').getByRole('button').filter({ hasText: /^$/ }).nth(2)
        await this.page.waitForTimeout(2000)
        await this.reportlisting().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByText('Others').locator('..').locator('div').first().click();
        await this.page.waitForTimeout(1000);
        await this.concerns().fill('Hey this is the testing concern')
        await this.submitbtn().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByRole('button', { name: 'Got it' }).click();
        Logger.info('report listing successfully')
        
        

    }

    
}
    


 



    

