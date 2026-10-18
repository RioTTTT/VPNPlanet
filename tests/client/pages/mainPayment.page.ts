import { expect, Page } from '../../modules/fixtures.ts';
import { Method, } from '../../modules/types.ts';
export class MainPaymentPage {
  private page: Page;;

  constructor(page: Page) {
    this.page = page;
  }


  async expectMethods(expectedEnabled: readonly Method[], expectedDisabled: readonly Method[]) {
    await expect(this.page.locator('button[type="submit"]')).toBeVisible();
    const names = await this.page
      .locator('input[name="gateway"]')
      .evaluateAll((inputs) =>
        inputs.map((i) =>
          (i.closest('label')?.querySelector('b')?.textContent ?? '')
            .replace(/\s+/g, ' ')
            .trim(),
        ),
      );
    expect([...names].sort()).toEqual(([...expectedEnabled, ...expectedDisabled]).sort());
  }

  async selectPaymentMethodAndProceed(method: Method) {
    await this.chosePaymentMethod(method);
    await this.agreeWithTerms();
    await this.clickPayButton();
  }

  async chosePaymentMethod(method: Method) {
    await this.page
      .locator('.select-multiple label:has(input[name="gateway"])')
      .filter({ hasText: method })
      .click();
  }

  async agreeWithTerms() {
    await this.page.click('span:has-text("By clicking this button you agree to the")'); //костыль
  }

  async clickPayButton() {
    await this.page.click('button[type="submit"]');
  }
}
