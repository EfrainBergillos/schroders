export enum PriceType {
  OPEN_PRICES,
  HIGH_PRICES,
  LOW_PRICES,
  CLOSE_PRICES,
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

export type TCharSeries = {
  h: Array<number>;
  l: Array<number>;
  o: Array<number>;
  c: Array<number>;
  t: Array<number>;
  v: Array<number>;
};
