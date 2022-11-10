import { Reducer } from 'react';
import { TRootActions } from '../actions/root-actions';
import { toolbarReducer, toolbarInitState } from './toolbar-reducer';
import { candlesReducer, candlesInitState } from './candles-reducer';

export const rootState = {
  toolbar: toolbarInitState,
  candles: candlesInitState,
};

export type TRootState = typeof rootState;
export type TRootReducer<S = TRootState, A = TRootActions> = Reducer<S, A>;

const combineReducers = <S = TRootState>(reducers: {
  [K in keyof S]: TRootReducer<S[K]>;
}): TRootReducer<S> => {
  return (state, action) => {
    return (Object.keys(reducers) as Array<keyof S>).reduce(
      (prevState, key) => ({
        ...prevState,
        [key]: reducers[key](prevState[key], action),
      }),
      state
    );
  };
};

export const rootReducer = combineReducers({
  toolbar: toolbarReducer,
  candles: candlesReducer,
});
