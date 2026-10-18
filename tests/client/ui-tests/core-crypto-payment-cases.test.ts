import { CRYPTO_UI_CASES } from '../../modules/crypto/core-crypto-payment-cases.ts';
import { test } from '../../modules/fixtures.ts';

test.describe('Основные кейсы оплаты выделенного сервера через Crypto', () => {
  for (const c of CRYPTO_UI_CASES) {
    test(`Оплата пописки по сценарию ${c.id}`, { tag: c.tags }, async ({ mainPaymentPage, personalPage, cryptoPaymentPage }) => {
      let planPrice;
      let cryptoPrice;
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
      await test.step('Проверить что сумма к опате совпадает с указанной в тарифе', async () => {
        await cryptoPaymentPage.checkPlanPriceIsCorrect(planPrice);
      });
      await test.step('Выбрать способ опаты с помощью крипты и перейти на форму оплаты', async () => {
        cryptoPrice = await cryptoPaymentPage.selectCryptoPaymentMethodAndProceed(c.cryptoCurrency, c.networkLabel);
      });
      await test.step('Поверить открытие формы опаты и сумму к оплате', async () => {
        await cryptoPaymentPage.checkOpeningCryptoPayingForm(cryptoPrice, c.addressKind);
      });
    });
  }
});