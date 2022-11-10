import { TRootActions } from '../actions/root-actions';
import { AllActions } from '../actions/all-action-types';
import { SymbolToTHLOCMap } from '@modules/domain';

export const candlesInitState: SymbolToTHLOCMap = {};

export const candlesReducer = (
  state = candlesInitState,
  action: TRootActions
): SymbolToTHLOCMap => {
  switch (action.type) {
    case AllActions.CANDLE_DATA_LOADED: {
      return {
        ...state,
        [action.payload.symbol]: action.payload.candles,
      };
    }

    case AllActions.REMOVE_SELECTED_TICKER: {
      const newState = { ...state };
      delete newState[action.payload.symbol];

      return {
        ...newState,
      };
    }

    default:
      return state;
  }
};
