
import { CORE_PAYMENT_CASES } from '../../modules/crypto/core-payment-cases.ts';
import { test } from '../../modules/fixtures.ts';

test.describe('Основные кейсы оплаты выделенного сервера через SBP и Card', () => {
  for (const c of CORE_PAYMENT_CASES) {
    test(`Оплата пописки по сценарию ${c.id}`, { tag: c.tags }, async ({ cardPaymentPage, mainPaymentPage, personalPage, sbpPaymentPage }) => {
      let planPrice;
      await test.step(`Окрыть форму, указать параметры согласно сценарию и перейти на форму выбора метода оплаты ${c.id}`, async () => {
        planPrice = await personalPage.fillOrderDetails({ country: c.country, fiatCurrency: c.fiatCurrency, plan: c.plan });
        await personalPage.proceedToPaymentMethods();
      });
      await test.step('Проверить доступные способы для оплаты', async () => {
        await mainPaymentPage.expectMethods(c.expectedMethods, c.disabledMethods);
      });
      await test.step('Выбрать способо опаты и нажать оплатить', async () => {
        await mainPaymentPage.selectPaymentMethodAndProceed(c.payWith);
      });
      await test.step('Поверить открытие формы опаты и что сумма к опате совпадает с указанной в тарифе', async () => {
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