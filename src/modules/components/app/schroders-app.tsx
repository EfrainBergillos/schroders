import React, { useContext, useEffect, useState } from 'react';
import './schroders-app.less';
import { Toolbar, Chart } from '@modules/components';
import { TCharSeries, Ticker } from '@modules/domain';
import { getCandlesAsync, getUsSymbolsListAsync } from '@modules/services';
import { SchStore, usTickersLoaded } from '@modules/store';

export const SchrodersApp = () => {
  const { dispatch, state } = useContext(SchStore);
  const { toolbar } = state;
  const { dateFrom, dateTo, priceType, selectedTickers } = toolbar;

  // These effect could be extracted in to hooks
  useEffect(() => {
    getUsSymbolsListAsync().then((tickers: Array<Ticker>) => {
      dispatch(usTickersLoaded(tickers));
    });
  }, []);

  // useEffect(() => {
  //   selectedTickers.forEach(() => {
  //
  //   });
  //   getCandlesAsync({
  //
  //   }).then((timeSeries: TCharSeries) => {
  //     dispatch()
  //   });
  // }, [dateFrom, dateTo]);

  return (
    <div className="sch-app">
      <Toolbar toolbarState={state.toolbar} />
      <Chart priceType={priceType} />
    </div>
  );
};
