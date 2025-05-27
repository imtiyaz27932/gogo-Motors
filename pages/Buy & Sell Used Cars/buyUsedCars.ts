import { Page } from "@playwright/test";
import { Logger } from "../../utils/logger";
import { scrollToBottom } from "../../utils/scrollToBottom";
import { scrollToTop } from "../../utils/scrollTotop";
import { addAbortListener } from "events";

export class BuyUsedCar {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Selectors for Buy & Sell used car navigation
    private buyandSellUsedCar = () => this.page.getByRole('navigation').getByText('Buy & Sell Used Cars');
    private clickonBuyUsedCar = () => this.page.getByRole('link', { name: 'Buy Used Cars' });


    // Selectors Suryed Car Toggle
    private suryedCarToggle = () => this.page.locator('div').filter({ hasText: /^Surveyed cars only$/ }).locator('div').nth(1)

    // Pagination selectors
    private paginationdropdown = () => this.page.getByRole('button', { name: 'Show' })

    // SortBy Selectors
    private sortby = () => this.page.getByRole('button', { name: 'Sort By' })
    private priceLowToHighOption = () => this.page.getByText('Low to High', { exact: true }).nth(0);
    private priceHighToLowOption = () => this.page.getByText('High to Low', { exact: true }).nth(0);
    private emiLowToHighOption = () => this.page.getByText('Low to High', { exact: true }).nth(1);
    private emiHighToLowOption = () => this.page.getByText('High to Low', { exact: true }).nth(1);
    private yearNewestToOldestOption = () => this.page.getByText('Newest to Oldest', { exact: true });
    private yearOldestToNewestOption = () => this.page.getByText('Oldest to newest', { exact: true });
    private defaultOption = () => this.page.getByText('Default', { exact: true });

   
    // Search Selectors
    private searchInput = () => this.page.getByRole('textbox', { name: 'Search used car' })

    // clear filter Selectors
    private clearFilter = () => this.page.getByRole('button', { name: 'Clear all' })

    // EMI Locator
    private emi = () => this.page.getByText('EMIMinimumMaximumSet EMI')
    
    // Make & Model selectors
    private makeAndModel = () => this.page.getByRole('paragraph').filter({ hasText: 'Make & Models' })

    // Model Year selectors
    private modelYear = () => this.page.getByRole('paragraph').filter({ hasText: 'Model Year' })

    // Body type Selectors
    private bodyType = () => this.page.getByRole('paragraph').filter({ hasText: 'Body type' })

    // Fuel Type Selectors
    private fuelType = () => this.page.getByRole('paragraph').filter({ hasText: 'Fuel type' })

    // Transmission Type Selectors
    private transmissionType = () => this.page.getByRole('paragraph').filter({ hasText: 'Transmission' })
    
    // Exterior color Selectors
    private exteriorColor = () => this.page.getByRole('paragraph').filter({ hasText: 'Exterior Colour' })

    // Interior color Selectors
    private interiorColor = () => this.page.getByRole('paragraph').filter({ hasText: 'Interior Colour' })

    // ownership Selectors
    private ownership = () => this.page.getByRole('paragraph').filter({ hasText: 'Ownership' })

    // Kilometers driven selectos
    private kilometersDriven = () => this.page.getByRole('paragraph').filter({ hasText: 'Kilometres driven' })

    // Features Selectors
    private Features = () => this.page.getByRole('paragraph').filter({ hasText: 'Features' })

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
    

    // Methods
    async clickBuyUsedCar() {
        Logger.info('Clicking on Buy & Sell Used Cars in the navigation bar');
        await this.buyandSellUsedCar().click();
        await this.page.waitForTimeout(2000);

        Logger.info('Clicking on Buy Used Cars Link');
        await this.clickonBuyUsedCar().click();
        await this.page.waitForTimeout(3000)
    }

    async clickonSuryedCarToggle() {
        Logger.info("Clicking on Surveyed Car Toggle");
        await this.suryedCarToggle().click();
        await this.page.waitForTimeout(2000)


    }

    async pagination() {

        Logger.info('Clicking on Pagination Dropdown')
        await this.paginationdropdown().scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000)
        await this.paginationdropdown().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByText('50', { exact: true }).click();
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle')
        Logger.info('Scrolling to the top of the page')
        await scrollToTop(this.page)
        Logger.info('Scrolling to top successfull')
    }


    async verifyUsedCarsCount(expectedCity: string): Promise<void> {
        Logger.info(`Verifying used cars count heading for ${expectedCity}`);

        try {
            const heading = this.page.getByRole('heading', { name: `Used Cars in ${expectedCity}` });
            await heading.waitFor({ state: 'visible', timeout: 10000 });

            const container = heading.locator('..');
            const containerText = await container.innerText();
            Logger.info(`Used cars container text: ${containerText}`);

            const match = containerText.match(/(\d+)\s+Used Cars in [A-Za-z]+/);
            if (!match) throw new Error('Used cars count not found');

            const count = parseInt(match[1], 10);
            if (count <= 0) throw new Error(`Used cars count is invalid: ${count}`);

            Logger.success(`Used cars count verified: ${count}`);

        } catch (error) {
            Logger.error('Failed to verify used cars count. Taking a screenshot...');
            await this.page.screenshot({ path: 'screenshots/used-car-text-fail.png', fullPage: true });
            throw error;
        }
    }


    async getUsedCarsCount(): Promise<number | null> {
        Logger.info('Getting the number of used cars shown near the heading');
        const heading = this.page.getByRole('heading', { name: 'Used Cars in Riyadh' })
        await heading.waitFor({ state: 'visible', timeout: 10000 });
        const container = heading.locator('..'); // or use `.locator('xpath=..')` if needed
        const containerText = await container.innerText();
        Logger.info(`Found container text: ${containerText}`)
        const match = containerText.match(/(\d+)\s+Used Cars in Riyadh/);
        return match ? parseInt(match[1], 10) : null;
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


    async searchCar() {
        Logger.info('Searching for a used car')
        await this.searchInput().fill('Nissan')
        await this.searchInput().press('Enter');
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(200)
        await this.page.getByRole('main').locator('form').getByRole('button').first().click();
        await this.page.waitForLoadState('networkidle')
        Logger.info('Searching for a used car completed');
        
        
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

    async ClearFilter() {
        Logger.info('Clearing all filters')
        await this.clearFilter().click();
        await this.page.waitForLoadState('networkidle');
        Logger.info('All Filters cleared successfully');
    }

    async setEMI() {
        await this.emi().click();
        await this.page.waitForTimeout(200)
    }

    async setEmiSliderRange(lowerOffset: number, upperOffset: number) {
        const emiSection = this.page.locator('div').filter({ hasText: /^Set EMI range$/ });
    
        const lowerThumb = emiSection.getByLabel('Lower thumb');
        const upperThumb = emiSection.getByLabel('Upper thumb');
    
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
        Logger.info('clicking on Make & Model');
        await this.makeAndModel().click();
        await this.page.waitForTimeout(100)
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
        Logger.info('Clicking on Model year');
        await this.modelYear().click();
        await this.page.waitForTimeout(100)
        
    }
    async setYearRangeSlider(lowerOffset: number, upperOffset: number) {
        Logger.info('Dragging year range slider thumbs');
    
        const sliderContainer = this.page.locator('div').filter({ hasText: /^Set year range$/ });
    
        const lowerThumb = sliderContainer.getByLabel('Lower thumb');
        const upperThumb = sliderContainer.getByLabel('Upper thumb');
    
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
        Logger.info('cliking on Body Type');
        await this.bodyType().click();
        await this.page.waitForTimeout(100)
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
        Logger.info('Clicking on Fuel Type');
        await this.fuelType().click();
        await this.page.waitForTimeout(100)

        const fuelTypes = ['Petrol', 'Diesel', 'HEV', 'MHEV', 'PHEV', 'EV', 'LPG'];
        for (const type of fuelTypes) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await card.scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected fuel type: ${type}`);
            await this.page.waitForTimeout(1000);
        }
    }

    async clickonTransmissionType() {
        Logger.info('Clicking on Transmission Type');
        await this.transmissionType().click();
        await this.page.waitForTimeout(100)

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
        Logger.info('Clicking on Exterior Color');
        await this.exteriorColor().click();
        await this.page.waitForTimeout(100)

        const colors = ['Black', 'White']
        for (const type of colors) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).first();
            await this.exteriorColor().scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected exterior color: ${type}`);
            await this.page.waitForTimeout(1000);
        }

    }

    async clickonInteriorColor() {
        Logger.info('Clicking on Interior Color');
        await this.interiorColor().click();
        await this.page.waitForTimeout(100);

        const colors = ['Black', 'White']
        for (const type of colors) {
            const card = this.page.locator('div', { hasText: new RegExp(`^${type}$`) }).nth(2);
            await this.interiorColor().scrollIntoViewIfNeeded();
            await card.click();
            Logger.info(`Selected interior color: ${type}`);
            await this.page.waitForTimeout(1000);
        }

    }
    async clickonOwnership() {
        Logger.info('Clicking on Ownership');
        await this.ownership().click();
        await this.page.waitForTimeout(100);
    
        const owners = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner'];
    
        for (const owner of owners) {
            const ownerRow = this.page.locator('div').filter({ hasText: new RegExp(`^${owner}$`) });
            const checkboxSpan = ownerRow.locator('span');
            Logger.info(`Clicking checkbox for: ${owner}`);
            await checkboxSpan.click();
            await this.page.waitForTimeout(1000);
        }
    }

    async clickonKilometersDriven() {
        Logger.info('clicking on kilometers driven');
        await this.kilometersDriven().click();
        await this.page.waitForTimeout(100);

    }
    async setKilometersDrivenRange(lowerOffset: number, upperOffset: number) {
        Logger.info('clicking on kilometers driven');
    
        // Locate the kilometers driven slider section
        const kmSection = this.page.locator('div').filter({ hasText: /^Set range$/ });
    
        // Locate the lower and upper thumbs inside this section
        const lowerThumb = kmSection.getByLabel('Lower thumb');
        const upperThumb = kmSection.getByLabel('Upper thumb');
    
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
        Logger.info('Clicking on Features section');
        await this.Features().click();
        await this.page.waitForTimeout(100);
    
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
            const feature = this.page.getByText(featureName, { exact: true });
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
        await this.filloffer().fill('10000')
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
        await this.reportlisting().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByText('Others').locator('..').locator('div').first().click();
        await this.page.waitForTimeout(1000);
        await this.concerns().fill('Hey this is the testing concern')
        await this.submitbtn().click();
        await this.page.waitForLoadState('networkidle')
        await this.page.getByRole('button', { name: 'Got it' }).click();
        
        

    }

    
}
    
