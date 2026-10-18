import { AddressKind, Country, CryptoCurrency, CryptoNetwork, CryptoPlanId, FiatCurrency, Method } from "../types.ts";
import { CRYPTO_BY_ID } from "./crypto-matrix.ts";

export interface CryptoUiCase {
  id: string;
  country: Country;
  fiatCurrency: FiatCurrency;
  plan: CryptoPlanId;
  extended?: boolean;
  cryptoCurrency: CryptoCurrency;
  networkLabel: CryptoNetwork;
  expectedMethods: Method[];
  disabledMethods: Method[];
  payWith: Method;
  addressKind: AddressKind;
  tags: string[];
}

const METHODS_BY_FIAT: Record<FiatCurrency, { enabled: Method[]; disabled: Method[] }> = {
  USD: { enabled: ['Credit Card', 'Cryptocurrency'], disabled: [] },
  EUR: { enabled: ['Credit Card', 'Cryptocurrency'], disabled: [] },
  RUB: { enabled: ['Система быстрых платежей', 'Credit Card', 'Cryptocurrency'], disabled: [] },
};

interface Step1 { country: Country; fiat: FiatCurrency; plan: CryptoPlanId }

const cryptoCase = (
  name: string,
  pairId: string,
  s: Step1,
  opts: { extended?: boolean } = {},
): CryptoUiCase => {
  const pair = CRYPTO_BY_ID[pairId];
  if (!pair) throw new Error(`crypto-ui-${name}: unknown pairId "${pairId}"`);
  const m = METHODS_BY_FIAT[s.fiat];
  return {
    id: `crypto-ui-${name}`,
    country: s.country,
    fiatCurrency: s.fiat,
    plan: s.plan,
    expectedMethods: [...m.enabled],
    disabledMethods: [...m.disabled],
    payWith: 'Cryptocurrency',
    addressKind: pair.addressKind,
    cryptoCurrency: pair.currency,
    networkLabel: pair.networkLabel,
    extended: opts.extended,
    tags: ['@uitests'],
  };
};

export const CRYPTO_UI_CASES: CryptoUiCase[] = [
  // smoke
  cryptoCase('usdt-trc20', 'usdt-tron-trc-20', { country: 'DE', fiat: 'RUB', plan: '1 year' }, { extended: true }),
  cryptoCase('btc', 'btc-btc', { country: 'US', fiat: 'USD', plan: '1 month' }),
  cryptoCase('ltc', 'ltc-ltc', { country: 'NL', fiat: 'EUR', plan: '1 month' }),
  cryptoCase('trx', 'trx-tron-trc-20', { country: 'FR', fiat: 'RUB', plan: '1 month' }),
  cryptoCase('eth-erc20', 'eth-eth-erc-20', { country: 'DE', fiat: 'USD', plan: '1 year' }),
  // rest
  cryptoCase('usdc-arbitrum', 'usdc-arbitrum-one', { country: 'CZ', fiat: 'EUR', plan: '1 year' }),
  cryptoCase('dai-eth', 'dai-eth-erc-20', { country: 'ES', fiat: 'USD', plan: '1 month' }),
  cryptoCase('pol-polygon', 'pol-polygon-erc-20', { country: 'PL', fiat: 'RUB', plan: '1 year' }),
  cryptoCase('bnb-bsc', 'bnb-bsc-bep-20', { country: 'AR', fiat: 'EUR', plan: '1 month' }),
  cryptoCase('sol', 'sol-solana', { country: 'TK', fiat: 'USD', plan: '1 year' }),
  cryptoCase('avax', 'avax-avalanche-c-chain', { country: 'TA', fiat: 'RUB', plan: '1 month' }),
  cryptoCase('gram-ton', 'gram-ton', { country: 'KZ', fiat: 'EUR', plan: '1 year' }),
  cryptoCase('shib-eth', 'shib-eth-erc-20', { country: 'UA', fiat: 'USD', plan: '1 month' }),
  cryptoCase('dash', 'dash-dash', { country: 'DE', fiat: 'RUB', plan: '1 year' }),
  cryptoCase('doge', 'doge-doge', { country: 'US', fiat: 'EUR', plan: '1 month' }),
  cryptoCase('bch', 'bch-bch', { country: 'NL', fiat: 'USD', plan: '1 year' }),
  cryptoCase('xmr', 'xmr-monero', { country: 'KZ', fiat: 'RUB', plan: '1 month' }),
];