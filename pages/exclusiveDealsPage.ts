import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { scrollSmoothly } from '../utils/scrollWheel';

export class CarDealsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Modal locator to scope form fields inside the modal
  private requestQuoteModal = () => this.page.locator('.modal-content-rounded').first();

  // Locators
  private exclusiveDeals = () => this.page.getByRole('heading', { name: 'Exclusive Car Deals' });
  private sliderBtn = () =>this.page.locator('section').filter({ hasText: 'Exclusive car dealsDrive away' }).getByLabel('swiperpnext');
  private requestQuoteBtn = () =>this.page.locator('div').filter({ hasText: /^EMI Starts: 969Request a Quote$/ }).getByRole('button');

  // Form locators inside the modal
  private firstname = () => this.requestQuoteModal().getByRole('textbox', { name: 'Name' });
  private mobilenumber = () => this.requestQuoteModal().getByRole('textbox').nth(2);
  private email = () => this.requestQuoteModal().getByRole('textbox', { name: 'Email' });
  private city = () =>this.requestQuoteModal().locator('.mb-3 > .go-form-dropdown > .relative > .select-area').first();
  private salary = () =>this.requestQuoteModal().locator('div:nth-child(5) > .go-form-dropdown > .relative > .select-area');
  private duration = () =>this.requestQuoteModal().locator('div:nth-child(6) > .go-form-dropdown > .relative > .select-area');
  private checkbox1 = () =>this.requestQuoteModal().getByRole('checkbox', { name: 'Do you have a valid driving' });
  private checkbox2 = () =>this.requestQuoteModal().getByRole('checkbox', { name: 'I agree to receive' });
  private submitBtn = () => this.requestQuoteModal().getByRole('button', { name: 'REQUEST A QUOTE' });
  private closemodal = () => this.requestQuoteModal().locator('.absolute').first();
  private otpfield = () => this.requestQuoteModal().locator('input[name="otp_number"]');
  private verifyotpbtn = () => this.requestQuoteModal().getByRole('button', { name: 'Verify' });

  // Updated ensurePageIsScrolled() as requested
  private async ensurePageIsScrolled() {
      await scrollSmoothly(this.page, 2000, 500, 500);
  }

  private clickonveiwallCars = () =>
    this.page.getByRole('link', { name: 'View All Cars on Deal' });
  private firstCarCard = () => this.page.locator('div.w-full.mx-auto.bg-white.rounded-xl').first();

  // Methods
  async verifyExclusiveDeals() {
    await this.ensurePageIsScrolled();
    console.log('✅ Exclusive Car Deals heading is visible.');

    for (let i = 0; i < 3; i++) {
      await this.sliderBtn().click();
      console.log(`✅ Clicked slider button ${i + 1} time(s)`);
      await this.page.waitForTimeout(3000);
    }
  }

  async requestQuote() {
    await this.ensurePageIsScrolled();
    await this.requestQuoteBtn().first().click();
    console.log('✅ Request a Quote button clicked.');
    await this.page.waitForLoadState('networkidle');
  }
  async fillRequestQuoteForm() {
    const firstName = faker.person.firstName();
    const mobileNumber = faker.phone.number();
    const email = faker.internet.email();

    await this.firstname().fill(firstName);
    await this.email().fill(email);

    await this.city().click();
    await this.page.locator('.dropdown-item').filter({ hasText: 'Riyadh' }).nth(0).click();

    //await this.page.locator('.dropdown-item', { hasText: 'Riyadh' }).click();

    await this.salary().click();
    await this.page.locator('.dropdown-item', { hasText: 'Up to 3,500 SAR' }).waitFor({ state: 'visible' });
    await this.page.locator('.dropdown-item', { hasText: 'Up to 3,500 SAR' }).click();

    await this.duration().click();
    await this.page.locator('.dropdown-item', { hasText: 'Less than 3 months' }).waitFor({ state: 'visible' });
    await this.page.locator('.dropdown-item', { hasText: 'Less than 3 months' }).click();

    await this.checkbox1().check();
    await this.checkbox2().check();
    await this.closemodal().click();
    await this.page.waitForLoadState('networkidle');

    console.log('✅ Request Quote form filled successfully.');
}


  async clickOnViewAllCars() {
    await this.ensurePageIsScrolled();
    await this.clickonveiwallCars().click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000)
    console.log('✅ View All Cars on Deal link clicked.');
  }

  async requestQuoteFromFirstCarCard() {
    await this.ensurePageIsScrolled();
    const requestQuoteBtn = this.firstCarCard().getByRole('button', { name: 'Request A Quote' });
    await requestQuoteBtn.click();
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Request A Quote clicked from first car card.');
  }
}
