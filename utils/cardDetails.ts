import { Page } from '@playwright/test';
import { Logger } from '../utils/logger';

export class CardUtils {
  constructor(private page: Page) {}

  private card = {
    cardNumber: '1',
    nameOnCard: 'test',
    expiry: '12/26',
    cvv: '123',
    address: '123 Main St',
    city: 'Springfield',
    postcode: '12345',
  };

  async fillTestCardDetails() {
    Logger.info('Filling test card details inside iframe fields...');

    const numberFrame = this.page.frameLocator('iframe[name^="card-fields-number"]');
    const nameFrame = this.page.frameLocator('iframe[name^="card-fields-name"]');
    const expiryFrame = this.page.frameLocator('iframe[name^="card-fields-expiry"]');
    const cvvFrame = this.page.frameLocator('iframe[name^="card-fields-verification_value"]');

    await numberFrame.getByRole('textbox', { name: 'Card number' }).fill(this.card.cardNumber);
    Logger.info('Filled card number.');

    await nameFrame.getByRole('textbox', { name: 'Name on card' }).fill(this.card.nameOnCard);
    Logger.info('Filled name on card.');

    await expiryFrame.getByRole('textbox', { name: 'Expiration date (MM / YY)' }).fill(this.card.expiry);
    Logger.info('Filled expiration date.');

    await cvvFrame.getByRole('textbox', { name: 'Security code' }).fill(this.card.cvv);
    Logger.info('Filled security code.');

    Logger.info('Filling address details...');

    await this.page.getByRole('combobox', { name: 'Address', exact: true }).scrollIntoViewIfNeeded()
    await this.page.getByRole('combobox', { name: 'Address', exact: true }).fill(this.card.address);
    Logger.info('Filled address.');

    await this.page.getByRole('textbox', { name: 'City' }).fill(this.card.city);
    Logger.info('Filled city.');

    await this.page.getByRole('textbox', { name: 'Postal code (optional)' }).fill(this.card.postcode);
    Logger.info('Filled postal code.');

    Logger.info('All card and address details filled successfully.');
  }
}
