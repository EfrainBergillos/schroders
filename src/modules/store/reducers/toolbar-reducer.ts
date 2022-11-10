import { TRootActions } from '../actions/root-actions';
import { AllActions } from '../actions/all-action-types';
import { PriceType, Ticker } from '@modules/domain';
import moment from 'moment';

export interface IToolbarState {
  usTickers: Array<Ticker>;
  priceType: PriceType;
  dateFrom: Date;
  dateTo: Date;
  selectedTickers: Array<Ticker>;
}

export const toolbarInitState: IToolbarState = {
  usTickers: [],
  priceType: PriceType.CLOSE_PRICES,
  dateFrom: moment().subtract(1, 'months').toDate(),
  dateTo: new Date(),
  selectedTickers: [],
};

export const toolbarReducer = (
  state = toolbarInitState,
  action: TRootActions
): IToolbarState => {
  switch (action.type) {
    case AllActions.US_TICKERS_LOADED: {
      return {
        ...state,
        usTickers: action.payload,
      };
    }

    case AllActions.PRICE_TYPE_UPDATED: {
      return {
        ...state,
        priceType: action.payload,
      };
    }

    case AllActions.DATE_FROM_TO_UPDATED: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case AllActions.REMOVE_SELECTED_TICKER: {
      const results = state.selectedTickers.filter(
        (ticker) => ticker.symbol !== action.payload.symbol
      );

      return {
        ...state,
        selectedTickers: results,
      };
    }

    case AllActions.ADD_SELECTED_TICKER: {
      return {
        ...state,
        selectedTickers: [...state.selectedTickers, action.payload],
      };
    }

    default:
      return state;
  }
};
