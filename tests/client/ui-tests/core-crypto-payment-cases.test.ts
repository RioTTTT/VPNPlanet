import { CRYPTO_UI_CASES } from '../../modules/crypto/core-crypto-payment-cases.ts';
import { test } from '../../modules/fixtures.ts';

test.describe('Core payment cases', () => {
  for (const c of CRYPTO_UI_CASES) {
    test(`Pay for a subscription by scenario ${c.id}`, { tag: c.tags }, async ({ mainPaymentPage, personalPage, cryptoPaymentPage }) => {
      let planPrice;
      let cryptoPrice;
      await test.step(`Open and pick server params by scenario ${c.id}`, async () => {
        planPrice = await personalPage.fillOrderDetails({ country: c.country, fiatCurrency: c.fiatCurrency, plan: c.plan });
        await personalPage.proceedToPaymentMethods();
      });
      await test.step('Check available payment methods', async () => {
        await mainPaymentPage.expectMethods(c.expectedMethods, c.disabledMethods);
      });
      await test.step('Chose payment method and proceed', async () => {
        await mainPaymentPage.selectPaymentMethodAndProceed(c.payWith);
      });
      await test.step('Check planPrice on Crypto page', async () => {
        await cryptoPaymentPage.checkPlanPriceIsCorrect(planPrice);
      });
      await test.step('Chose crypto payment method and proceed', async () => {
        cryptoPrice = await cryptoPaymentPage.selectCryptoPaymentMethodAndProceed(c.cryptoCurrency, c.networkLabel);
      });
      await test.step('Check opening paying form', async () => {
        await cryptoPaymentPage.checkOpeningCryptoPayingForm(cryptoPrice, c.addressKind);
      });
    });
  }
});