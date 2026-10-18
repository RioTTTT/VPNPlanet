/* eslint-disable prettier/prettier */
import { expect, Page } from '../../modules/fixtures.ts';
export class SbpPaymentPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkOpeningSbpPayingForm(planPrice) {
    await expect(this.page.locator('p[class="shop-name"]')).toHaveText('PlanetVPN');
    await expect(this.page.locator('p[class="tl-display amount"]')).toHaveText(planPrice.price);
    await expect(this.page.locator('figure[class="qr-figure"]')).toBeVisible();
  }
}
