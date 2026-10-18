import { Page } from '../../modules/fixtures.ts';

export class Common {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  /*async clickOnHeaderSection(text: string) {
    await this.page.waitForLoadState('load');
    await this.page.locator(`a:has-text('${text}')`).click();
  }


  async closeConsentBanner() {
    await this.page.addLocatorHandler(
      this.page.locator('button[aria-label="Consent"]'),
      async (locator) => {
        await locator.click({ timeout: 5_000 });
      },
      { noWaitAfter: true } // важно: не ждать навигацию после клика, если баннер её не триггерит
    );
  }*/

}
