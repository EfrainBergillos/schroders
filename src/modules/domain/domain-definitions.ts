export enum PriceType {
  HIGH_PRICES = 'h',
  LOW_PRICES = 'l',
  OPEN_PRICES = 'o',
  CLOSE_PRICES = 'c',
}

export type Ticker = {
  description: string;
  displaySymbol: string;
  symbol: string;
};

export const PriceLabels = new Map<PriceType, string>([
  [PriceType.OPEN_PRICES, 'Open Prices'],
  [PriceType.HIGH_PRICES, 'High Prices'],
  [PriceType.LOW_PRICES, 'Low Prices'],
  [PriceType.CLOSE_PRICES, 'Close Prices'],
]);

export type TDateFromTo = {
  dateFrom?: Date;
  dateTo?: Date;
};

export type THLOCSeries = {
  h: Array<number>;
  l: Array<number>;
  o: Array<number>;
  c: Array<number>;
  t: Array<number>;
  v: Array<number>;
  s: string;
};

export type SymbolToTHLOCMap = { [symbol: string]: THLOCSeries };
