
import { CORE_PAYMENT_CASES } from '../../modules/crypto/core-payment-cases.ts';
import { test } from '../../modules/fixtures.ts';

test.describe('Core payment cases', () => {
  for (const c of CORE_PAYMENT_CASES) {
    test(`Pay for a subscription by scenario ${c.id}`, { tag: c.tags }, async ({ cardPaymentPage, mainPaymentPage, personalPage, sbpPaymentPage }) => {
      let planPrice;
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
      await test.step('Check opening paying form', async () => {
        if (c.payWith === 'Credit Card') {
          await cardPaymentPage.checkOpeningCardPayingForm(planPrice);
        }
        else {
          await sbpPaymentPage.checkOpeningSbpPayingForm(planPrice);
        }
      });
    });
  }
});