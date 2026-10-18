import { Country, FiatCurrency, Method, PlanId } from "../types.ts";

export interface CorePaymentCase {
  id: string;
  group: 'core' | 'country';
  country: Country;
  fiatCurrency: FiatCurrency;
  plan: PlanId;
  expectedMethods: Method[];
  disabledMethods: Method[];
  payWith: Method;
  tags: string[];
}

export const CORE_PAYMENT_CASES: CorePaymentCase[] = [
  {
    id: 'core-usd-2d', group: 'core', country: 'DE', fiatCurrency: 'USD', plan: '2 days',
    expectedMethods: ['Credit Card'], disabledMethods: ['Cryptocurrency'], payWith: 'Credit Card', tags: ['@uitests']
  },
  {
    id: 'core-usd-1m', group: 'core', country: 'DE', fiatCurrency: 'USD', plan: '1 month',
    expectedMethods: ['Credit Card', 'Cryptocurrency'], disabledMethods: [], payWith: 'Credit Card', tags: ['@uitests']
  },
  {
    id: 'core-eur-1y', group: 'core', country: 'DE', fiatCurrency: 'EUR', plan: '1 year',
    expectedMethods: ['Credit Card', 'Cryptocurrency'], disabledMethods: [], payWith: 'Credit Card', tags: ['@uitests']
  },
  {
    id: 'core-rub-2d', group: 'core', country: 'DE', fiatCurrency: 'RUB', plan: '2 days',
    expectedMethods: ['Система быстрых платежей', 'Credit Card'], disabledMethods: ['Cryptocurrency'], payWith: 'Credit Card', tags: ['@uitests']
  },
  {
    id: 'core-rub-1m', group: 'core', country: 'DE', fiatCurrency: 'RUB', plan: '1 month',
    expectedMethods: ['Система быстрых платежей', 'Credit Card', 'Cryptocurrency'], disabledMethods: [], payWith: 'Система быстрых платежей', tags: ['@uitests']
  },
  {
    id: 'country-us-usd-1m', group: 'country', country: 'US', fiatCurrency: 'USD', plan: '1 month',
    expectedMethods: ['Credit Card', 'Cryptocurrency'], disabledMethods: [], payWith: 'Credit Card', tags: ['@uitests']
  },
  {
    id: 'country-kz-rub-1m', group: 'country', country: 'KZ', fiatCurrency: 'RUB', plan: '1 month',
    expectedMethods: ['Система быстрых платежей', 'Credit Card', 'Cryptocurrency'], disabledMethods: [], payWith: 'Credit Card', tags: ['@uitests']
  },
];