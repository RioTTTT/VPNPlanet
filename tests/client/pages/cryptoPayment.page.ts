import { expect, Page } from '../../modules/fixtures.ts';
import { CryptoCurrency, CryptoNetwork } from '../../modules/types.ts';
import { extractNumeric, parseAmount } from '../../modules/utils.ts';


export class CryptoPaymentPage {
  constructor(private readonly page: Page) { }

  private readonly nextButton = () => this.page.getByText('Proceed to payment');

  async selectCryptoCurrency(cryptoCurrency: CryptoCurrency) {
    await this.page.getByTestId('select-currency-button').click();
    await this.page.fill('input[placeholder="Search"]', cryptoCurrency);
    await this.page.click(`p:has-text("${cryptoCurrency}")`)
  }
  async selectCryptoNetwork(cryptoNetwork: CryptoNetwork) {
    await this.page.getByTestId('select-network-button').click();
    await this.page.fill('input[placeholder="Search"]', cryptoNetwork);
    await this.page.click(`p:has-text("${cryptoNetwork}")`)
  }

  async checkPlanPriceIsCorrect(planPrice) {
    const expected = parseAmount(planPrice.price);

    const toPayAmount = this.page
      .locator('div:has(> div > p:text-is("To pay:")) p')
      .filter({ hasNotText: 'To pay:' });

    await expect
      .poll(async () => parseAmount((await toPayAmount.textContent()) ?? ''))
      .toBe(expected);
  }


  async selectCryptoPaymentMethodAndProceed(cryptoCurrency: CryptoCurrency, cryptoNetwork: CryptoNetwork) {
    await this.selectCryptoCurrency(cryptoCurrency);
    await this.selectCryptoNetwork(cryptoNetwork);
    await this.proceedToPaymentMethods();
    const cryptoPrice = this.page.locator(
      'p:text-is("Amount payable in selected currency") + p',
    );
    const cryptoPriceStr = (await cryptoPrice.textContent())?.trim() ?? '';
    return {
      price: cryptoPriceStr,
    };
  }

  async proceedToPaymentMethods() {
    await expect(this.nextButton()).toBeEnabled();
    await this.nextButton().click();
  }
  async checkOpeningCryptoPayingForm(cryptoPrice, networkLabel) {
    await this.expectNetwork(networkLabel);
    await expect(this.page.locator(`div[title="${extractNumeric(cryptoPrice.price)}"]`)).toBeVisible();
    await expect(this.page.locator('canvas[id="react-qrcode-logo"]')).toBeVisible();
  }

  async expectNetwork(expected: string) {
    const item = this.page.locator('div:has(> span:text-is("Network:"))');

    const raw = (await item.textContent()) ?? '';
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const value = normalized.replace(/^.*Network:\s*/i, '');

    expect(value.toLowerCase()).toBe(expected.toLowerCase());
  }
}

