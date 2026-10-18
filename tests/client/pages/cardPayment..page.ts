/* eslint-disable prettier/prettier */
import { expect, Page } from '../../modules/fixtures.ts';
export class CardPaymentPage {
  private page: Page;


  constructor(page: Page) {
    this.page = page;
  }
  async checkOpeningCardPayingForm(planPrice) {
    await expect(this.page.locator('p[class="shop-name"]')).toHaveText('PlanetVPN');
    await expect(this.page.locator('p[class="tl-display amount"]')).toHaveText(planPrice.price);
    /*
    Because the payment form via card fails to load, expected checks are copied from the method SbpPaymentPage. 
    After fixing the BUG with the card payment page loading, the validation logic will need to be rewritten.*/
  }
}
