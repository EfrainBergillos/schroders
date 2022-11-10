import { AllActions } from './all-action-types';
import { THLOCSeries } from '@modules/domain';

export const candleDataLoaded = (payload: {
  symbol: string;
  candles: THLOCSeries;
}) => ({
  type: AllActions.CANDLE_DATA_LOADED,
  payload,
});
