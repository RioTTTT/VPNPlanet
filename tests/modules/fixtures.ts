import { test as base, expect, type Locator, type BrowserContext, type Page, chromium, Browser } from '@playwright/test';
import { MainPaymentPage, CardPaymentPage, Common, PersonalPage, CryptoPaymentPage } from '../client/pages/index.ts';
import { config } from '../consts/environment-variables.ts';
import { SbpPaymentPage } from '../client/pages/sbpPayment.page.ts';

export type TestFixtures = {
  context: BrowserContext;
  page: Page;
  Locator: Locator;
  cleanupAfterTest: void;
  autoPrepare: void;
  baseURL?: string;
  mainPaymentPage: MainPaymentPage;
  common: Common;
  cryptoPaymentPage: CryptoPaymentPage;
  personalPage: PersonalPage;
  cardPaymentPage: CardPaymentPage;
  sbpPaymentPage: SbpPaymentPage;
};


export const test = base.extend<TestFixtures>({

  mainPaymentPage: async ({ page }, use) => {
    const mainPaymentPage = new MainPaymentPage(page);
    await use(mainPaymentPage);
  },

  common: async ({ page }, use) => {
    const common = new Common(page);
    await use(common);
  },

  cryptoPaymentPage: async ({ page }, use) => {
    const cryptoPaymentPage = new CryptoPaymentPage(page);
    await use(cryptoPaymentPage);
  },

  personalPage: async ({ page }, use) => {
    const personalPage = new PersonalPage(page);
    await use(personalPage);
  },

  cardPaymentPage: async ({ page }, use) => {
    const cardPaymentPage = new CardPaymentPage(page);
    await use(cardPaymentPage);
  },

  sbpPaymentPage: async ({ page }, use) => {
    const sbpPaymentPage = new SbpPaymentPage(page);
    await use(sbpPaymentPage);
  },

  browser: async ({ }, use) => {
    let browser: Browser;
    if (config.USE_LOCAL_BROWSER === true) {
      browser = await chromium.launch({
        headless: false,
      });
    } else {
      const playwrightVersion = '1.64.1';
      browser = await chromium.connect(`ws://1.0.0.10/playwright/chromium/playwright-${playwrightVersion}?headless=true`, { slowMo: 75 }); // use it for outher test-stand, for example moon
    }
    await use(browser);
    await browser.close();
  },

  page: async ({ browser }, use) => {
    if (!browser) throw new Error('Browser not initialized');

    let context;
    try {
      context = await browser.newContext({ permissions: ['clipboard-write'] });
    } catch (e) {
      console.error('[Page Fixture] Error creating context:', e);
      throw e;
    }

    const page = await context.newPage();
    await use(page);
    await context.close();
  },

  autoPrepare: [async ({ page }, use) => {
    const baseURL = process.env.FRONT_URL;
    await page.goto(baseURL);
    /*await common.closeConsentBanner();
    await page.addStyleTag({
      content: `
      ins.adsbygoogle,
      iframe[id^="aswift_"],
      iframe[src*="doubleclick"],
      div[id^="google_ads"] {
        display: none !important;
      }
    `
    });

    await page.evaluate(() => {
      document.querySelectorAll('ins.adsbygoogle').forEach(el => el.remove());
    });*/
    await use();
  }, { auto: true }],
});
export { type Locator, type BrowserContext, type Page, expect };
