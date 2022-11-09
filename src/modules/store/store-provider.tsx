import React, { createContext, Dispatch, useMemo, useReducer } from 'react';

import { rootReducer, rootState, TRootState } from './reducers';
import { TRootActions } from './actions/root-actions';

export const SchStore = createContext<{
  state: TRootState;
  dispatch: Dispatch<TRootActions>;
}>({
  state: rootState,
  dispatch: () => '',
});

export const SchStoreProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(rootReducer, rootState);
  const store = useMemo(() => ({ state, dispatch }), [state]);

  return <SchStore.Provider value={store}>{children}</SchStore.Provider>;
};
