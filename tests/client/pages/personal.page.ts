import { faker } from '@faker-js/faker';
import { expect, Page } from '../../modules/fixtures.ts';
import { Country, FiatCurrency, PlanId, toPlanValue } from '../../modules/types.ts';
import { PlanPrice } from '../../modules/crypto/payment-plan-matrix.ts';


export class PersonalPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  private readonly nextButton = () => this.page.locator('button[id="qa-btn-submit-step1"]');

  async selectCountry(country: Country) {
    const serverLocations = await this.page.locator('label[data-name="location"] > input').inputValue();
    if (serverLocations === country) {
      return
    } else {
      await this.page.click('label[data-name="location"]');
      await this.page.click(`li[data-id=${country}]`)
    }
  }

  async selectCurrency(fiatCurrency: FiatCurrency) {
    const currentcurrency = await this.page.locator('label[data-name="currency_code"] > input').inputValue();
    if (currentcurrency === fiatCurrency) {
      return
    } else {
      await this.page.click('label[data-name="currency_code"]');
      await this.page.click(`li[data-id=${fiatCurrency}]`)
    }
  }

  async selectPlan(plan: PlanId): Promise<PlanPrice> {
    const planHtml = toPlanValue(plan);
    const label = this.page.locator(
      `label:has(input[name="offer_id"][value="${planHtml}"])`,
    );

    await label.click();
    await expect(label.locator('input')).toBeChecked();

    const [labelText, priceText] = await Promise.all([
      label.locator('span').textContent(),
      label.locator('b.currency_code_variable').textContent(),
    ]);

    return {
      value: plan,
      label: (labelText ?? '').replace(/\s+/g, ' ').trim(),
      price: (priceText ?? '').replace(/\s+/g, ''),
    };
  }

  async fillEmail() {
    await this.page.fill('input[type="email"]', faker.internet.email())
  }


  async fillOrderDetails(d: { country: Country; fiatCurrency: FiatCurrency; plan: PlanId }) {
    await this.selectCountry(d.country);
    await this.selectCurrency(d.fiatCurrency);
    const planPrice = await this.selectPlan(d.plan);
    await this.fillEmail();
    return planPrice;
  }

  async proceedToPaymentMethods() {
    await expect(this.nextButton()).toBeEnabled();
    await this.nextButton().click();
  }
}
