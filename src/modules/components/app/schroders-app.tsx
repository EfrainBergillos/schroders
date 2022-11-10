import React, { useContext, useEffect, useState } from 'react';
import './schroders-app.less';
import { Toolbar, ChartWrapper } from '@modules/components';
import { THLOCSeries, Ticker } from '@modules/domain';
import { getCandlesAsync, getUsSymbolsListAsync } from '@modules/services';
import { candleDataLoaded, SchStore, usTickersLoaded } from '@modules/store';

export const SchrodersApp = () => {
  const { dispatch, state } = useContext(SchStore);
  const { toolbar, candles } = state;
  const { dateFrom, dateTo, selectedTickers, priceType } = toolbar;

  // These effect could be extracted in to hooks
  useEffect(() => {
    getUsSymbolsListAsync().then((tickers: Array<Ticker>) => {
      dispatch(usTickersLoaded(tickers));
    });
  }, []);

  useEffect(() => {
    selectedTickers.forEach((ticker) => {
      getCandlesAsync({ ticker, dateFrom, dateTo }).then(
        (candles: THLOCSeries) => {
          dispatch(candleDataLoaded({ symbol: ticker.symbol, candles }));
        }
      );
    });
  }, [dateFrom, dateTo, selectedTickers]);

  return (
    <div className="sch-app">
      <Toolbar toolbarState={state.toolbar} />
      <ChartWrapper
        hlocData={candles}
        priceType={priceType}
        dateTo={dateTo}
        dateFrom={dateFrom}
        selectedTickers={selectedTickers}
      />
    </div>
  );
};
