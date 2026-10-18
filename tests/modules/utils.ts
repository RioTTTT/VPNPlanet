export function parseAmount(raw: string): number {
  const match = raw.replace(/\s+/g, '').match(/-?\d+(?:[.,]\d+)?/);
  if (!match) throw new Error(`Cannot parse amount from "${raw}"`);
  return Number(match[0].replace(',', '.'));
}

export function extractNumeric(raw: string): string {
  const m = raw.replace(/\s+/g, '').match(/-?\d+(?:[.,]\d+)?/);
  if (!m) throw new Error(`No numeric value in "${raw}"`);
  return m[0].replace(',', '.');
}