export enum PriceTypes {
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

export const PriceLabels = new Map<PriceTypes, string>([
  [PriceTypes.OPEN_PRICES, "Open Prices"],
  [PriceTypes.HIGH_PRICES, "High Prices"],
  [PriceTypes.LOW_PRICES, "Low Prices"],
  [PriceTypes.CLOSE_PRICES, "Close Prices"],
]);
