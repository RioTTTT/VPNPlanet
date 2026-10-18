export type FiatCurrency = 'USD' | 'EUR' | 'RUB';
export type CryptoCurrency = 'USDT' | 'BTC' | 'LTC' | 'TRX' | 'ETH' | 'XMR' | 'POL' | 'BNB' | 'USDC' | 'SOL' | 'DASH' | 'DOGE' | 'GRAM' | 'BCH' | 'AVAX' | 'DAI' | 'SHIB';
export type PlanId = '2 days' | '1 month' | '1 year';
export type CryptoPlanId = Exclude<PlanId, '2 days'>;
export type Method = 'Credit Card' | 'Система быстрых платежей' | 'Cryptocurrency';
export type Country = 'NL' | 'DE' | 'FR' | 'US' | 'TK' | 'CZ' | 'ES' | 'PL' | 'AR' | 'TA' | 'KZ' | 'UA';
export type CryptoNetwork =
  | 'BSC (BEP-20)' | 'Tron (TRC-20)' | 'ETH (ERC-20)' | 'Polygon (ERC-20)'
  | 'TON' | 'Solana' | 'Arbitrum One' | 'Avalanche'
  | 'BTC' | 'LTC' | 'DASH' | 'Doge' | 'Bitcoin cash'
  | 'Monero';
export type AddressKind = 'tron' | 'btc' | 'ltc' | 'ton' | 'sol' | 'dash' | 'doge' | 'bch' | 'xmr' | 'arbitrum' | 'eth (erc-20)' | 'avalanche' | 'bsc (bep-20)' | 'polygon (erc-20)' | 'tron (trc-20)';

export type PlanValue = '2_days' | '1_month' | '1_year';

const planIdToValue: Record<PlanId, PlanValue> = {
  '2 days': '2_days',
  '1 month': '1_month',
  '1 year': '1_year',
};

export function toPlanValue(plan: PlanId): PlanValue {
  return planIdToValue[plan];
}