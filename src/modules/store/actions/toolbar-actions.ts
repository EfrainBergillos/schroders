import { AllActions } from './all-action-types';
import { PriceType, TDateFromTo, Ticker } from '@modules/domain';

export const usTickersLoaded = (payload: Array<Ticker>) => ({
  type: AllActions.US_TICKERS_LOADED,
  payload,
});

export const priceTypeUpdated = (payload: PriceType) => ({
  type: AllActions.PRICE_TYPE_UPDATED,
  payload,
});

export const dateFromToSelected = (payload: TDateFromTo) => ({
  type: AllActions.DATE_FROM_TO_UPDATED,
  payload,
});

export const removeSelectedTicker = (payload: Ticker) => ({
  type: AllActions.REMOVE_SELECTED_TICKER,
  payload,
});

export const addSelectedTicker = (payload: Ticker) => ({
  type: AllActions.ADD_SELECTED_TICKER,
  payload,
});
