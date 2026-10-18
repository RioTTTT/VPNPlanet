import type { CryptoCurrency, AddressKind, CryptoNetwork } from '../types.ts';

export interface CryptoPair {
  id: string;
  currency: CryptoCurrency;
  networkId: string;
  networkLabel: CryptoNetwork;
  addressKind: AddressKind;
}

const pair = (
  id: string,
  currency: CryptoCurrency,
  networkId: string,
  networkLabel: CryptoNetwork,
  addressKind: AddressKind,
): CryptoPair => ({ id, currency, networkId, networkLabel, addressKind });
export const CRYPTO_MATRIX: CryptoPair[] = [
  // USDT (8)
  pair('usdt-bsc-bep-20', 'USDT', 'bsc', 'BSC (BEP-20)', 'bsc (bep-20)'),
  pair('usdt-tron-trc-20', 'USDT', 'tron', 'Tron (TRC-20)', 'tron (trc-20)'),
  pair('usdt-eth-erc-20', 'USDT', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('usdt-polygon-erc-20', 'USDT', 'polygon', 'Polygon (ERC-20)', 'eth (erc-20)'),
  pair('usdt-ton', 'USDT', 'ton', 'TON', 'ton'),
  pair('usdt-solana', 'USDT', 'solana', 'Solana', 'sol'),
  pair('usdt-arbitrum-one', 'USDT', 'arbitrum', 'Arbitrum One', 'arbitrum'),
  pair('usdt-avalanche-c-chain', 'USDT', 'avalanche', 'Avalanche', 'avalanche'),

  // USDC (6)
  pair('usdc-bsc-bep-20', 'USDC', 'bsc', 'BSC (BEP-20)', 'bsc (bep-20)'),
  pair('usdc-eth-erc-20', 'USDC', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('usdc-polygon-erc-20', 'USDC', 'polygon', 'Polygon (ERC-20)', 'eth (erc-20)'),
  pair('usdc-solana', 'USDC', 'solana', 'Solana', 'sol'),
  pair('usdc-arbitrum-one', 'USDC', 'arbitrum', 'Arbitrum One', 'arbitrum'),
  pair('usdc-avalanche-c-chain', 'USDC', 'avalanche', 'Avalanche', 'avalanche'),

  // DAI (3)
  pair('dai-bsc-bep-20', 'DAI', 'bsc', 'BSC (BEP-20)', 'bsc (bep-20)'),
  pair('dai-eth-erc-20', 'DAI', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('dai-polygon-erc-20', 'DAI', 'polygon', 'Polygon (ERC-20)', 'eth (erc-20)'),

  // ETH (3)
  pair('eth-bsc-bep-20', 'ETH', 'bsc', 'BSC (BEP-20)', 'bsc (bep-20)'),
  pair('eth-eth-erc-20', 'ETH', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('eth-arbitrum-one', 'ETH', 'arbitrum', 'Arbitrum One', 'arbitrum'),

  // POL (2)
  pair('pol-eth-erc-20', 'POL', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('pol-polygon-erc-20', 'POL', 'polygon', 'Polygon (ERC-20)', 'polygon (erc-20)'),

  // One network (12)
  pair('btc-btc', 'BTC', 'btc', 'BTC', 'btc'),
  pair('ltc-ltc', 'LTC', 'ltc', 'LTC', 'ltc'),
  pair('trx-tron-trc-20', 'TRX', 'tron', 'Tron (TRC-20)', 'tron (trc-20)'),
  pair('bnb-bsc-bep-20', 'BNB', 'bsc', 'BSC (BEP-20)', 'bsc (bep-20)'),
  pair('sol-solana', 'SOL', 'solana', 'Solana', 'sol'),
  pair('dash-dash', 'DASH', 'dash', 'DASH', 'dash'),
  pair('doge-doge', 'DOGE', 'doge', 'Doge', 'doge'),
  pair('gram-ton', 'GRAM', 'ton', 'TON', 'ton'),
  pair('bch-bch', 'BCH', 'bch', 'Bitcoin cash', 'bch'),
  pair('avax-avalanche-c-chain', 'AVAX', 'avalanche', 'Avalanche', 'avalanche'),
  pair('shib-eth-erc-20', 'SHIB', 'eth', 'ETH (ERC-20)', 'eth (erc-20)'),
  pair('xmr-monero', 'XMR', 'monero', 'Monero', 'xmr'),
];

export const CRYPTO_BY_ID: Record<string, CryptoPair> = Object.fromEntries(
  CRYPTO_MATRIX.map(p => [p.id, p]),
);