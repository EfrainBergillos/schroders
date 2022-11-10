import * as candlesActions from './candles-actions';
import * as toolbarActions from './toolbar-actions';

export const rootActions = {
  candles: candlesActions,
  toolbar: toolbarActions,
};

export type ActionsMap<A> = {
  [K in keyof A]: A[K] extends Record<keyof A[K], (...arg: never[]) => infer R>
    ? R
    : never;
}[keyof A];

export type TRootActions = ActionsMap<typeof rootActions>;
