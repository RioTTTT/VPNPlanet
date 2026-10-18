import type { FiatCurrency, PlanId, Method, Country } from '../types.ts';

export interface CheckoutCell {
  id: string;
  currency: FiatCurrency;
  plan: PlanId;
  available: Method[];
  unavailable: Method[];
}

export type PlanPrice = {
  value: PlanId;
  label: string;
  price: string;
};

export const CORE_MATRIX: CheckoutCell[] = [
  // USD
  { id: 'usd-2d', currency: 'USD', plan: '2 days', available: ['Credit Card'], unavailable: ['Система быстрых платежей', 'Cryptocurrency'] },
  { id: 'usd-1m', currency: 'USD', plan: '1 month', available: ['Credit Card', 'Cryptocurrency'], unavailable: ['Система быстрых платежей'] },
  { id: 'usd-1y', currency: 'USD', plan: '1 year', available: ['Credit Card', 'Cryptocurrency'], unavailable: ['Система быстрых платежей'] },
  // EUR
  { id: 'eur-2d', currency: 'EUR', plan: '2 days', available: ['Credit Card'], unavailable: ['Система быстрых платежей', 'Cryptocurrency'] },
  { id: 'eur-1m', currency: 'EUR', plan: '1 month', available: ['Credit Card', 'Cryptocurrency'], unavailable: ['Система быстрых платежей'] },
  { id: 'eur-1y', currency: 'EUR', plan: '1 year', available: ['Credit Card', 'Cryptocurrency'], unavailable: ['Система быстрых платежей'] },
  // RUB
  { id: 'rub-2d', currency: 'RUB', plan: '2 days', available: ['Система быстрых платежей', 'Credit Card'], unavailable: ['Cryptocurrency'] },
  { id: 'rub-1m', currency: 'RUB', plan: '1 month', available: ['Система быстрых платежей', 'Credit Card', 'Cryptocurrency'], unavailable: [] },
  { id: 'rub-1y', currency: 'RUB', plan: '1 year', available: ['Система быстрых платежей', 'Credit Card', 'Cryptocurrency'], unavailable: [] },
];

export const COUNTRIES: readonly Country[] = ['NL', 'DE', 'FR', 'US', 'TK', 'CZ', 'ES', 'PL', 'AR', 'TA', 'KZ', 'UA'];
export const CORE_COUNTRY: Country = 'DE';

export const cellFor = (currency: FiatCurrency, plan: PlanId): CheckoutCell => {
  const cell = CORE_MATRIX.find(c => c.currency === currency && c.plan === plan);
  if (!cell) throw new Error(`No matrix cell for ${currency}/${plan}`);
  return cell;
};