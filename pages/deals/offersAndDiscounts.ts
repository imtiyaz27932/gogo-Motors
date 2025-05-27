import { expect, Page } from "@playwright/test";
import { Logger } from "../../utils/logger";



export class OffersandDiscounts {
    private page: Page;


    constructor(page: Page) {
        this.page = page;


    }



    //Offer Selectors
    private offerdiscountlink = () => this.page.locator('div:nth-child(3) > .transition-all > .px-\\[24px\\] > div:nth-child(2)').first()

    // Header Selectors
    private heading = () => this.page.getByRole('heading', { name: 'Find Offers on your dream car' })

    // Card Selectors
    private offerCards = () => this.page.locator('section[id^="deal-slot-id-"]');

    private unlockButtons = () => this.page.locator('role=button[name*="Unlock"]');


    //Methods


    async clickonOfferDisocuntlink() {
        Logger.info('clicking on offers and discount link');
        await this.offerdiscountlink().click();
        await this.page.waitForLoadState('load')
    }

    async validateHeading() {
        await expect(this.heading()).toBeVisible();

    }
    async validateAllCardsPresent() {
        await this.page.waitForLoadState('networkidle');
        const count = await this.offerCards().count();
        console.log(`🔍 offer card count: ${count}`);
        
        for (let i = 0; i < count; i++) {
            const text = await this.offerCards().nth(i).textContent();
            console.log(`🧾 Card ${i} content: ${text}`);
        }
    
        expect(count).toBeGreaterThan(0);
        console.log(`✅ Found ${count} offer cards`);
        return count;
    }
    
    async clickRandomUnlockButton() {
        await this.page.waitForLoadState('networkidle');
        const total = await this.unlockButtons().count();
    
        if (total === 0) {
          console.error(`❌ No unlock buttons found in cards.`);
          const totalCards = await this.offerCards().count();
          console.log(`🧩 Debug: Found ${totalCards} offer cards.`);
    
          for (let i = 0; i < totalCards; i++) {
            const text = await this.offerCards().nth(i).textContent();
            console.log(`🧾 Card ${i} content: ${text}`);
          }
    
          throw new Error('❌ No unlock buttons found. Check card rendering or button visibility.');
        }
    
        const randomIndex = Math.floor(Math.random() * total);
        console.log(`🔘 Clicking unlock button at index: ${randomIndex}`);
        await this.unlockButtons().nth(randomIndex).click();
      }
    }




