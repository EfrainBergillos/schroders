import React, { useContext } from 'react';
import { PriceLabels } from '@modules/domain';
import {
  GenericDropdown,
  TickerSearch,
  DateRangePicker,
} from '@modules/components';
import {
  dateFromToSelected,
  priceTypeUpdated,
  SchStore,
  removeSelectedTicker,
  IToolbarState,
  addSelectedTicker,
} from '@modules/store';
import './toolbar.less';

type TToolbarProps = {
  toolbarState: IToolbarState;
};

export const Toolbar = ({ toolbarState }: TToolbarProps): JSX.Element => {
  const { dispatch } = useContext(SchStore);
  const { selectedTickers, priceType, usTickers, dateFrom, dateTo } =
    toolbarState;

  return (
    <div className="sch-toolbar">
      <TickerSearch
        selectedTickers={selectedTickers}
        tickersList={usTickers}
        onTickerSelected={(ticker) => dispatch(addSelectedTicker(ticker))}
      />
      <GenericDropdown
        dataList={PriceLabels}
        onSelection={(priceType) => dispatch(priceTypeUpdated(priceType))}
        selected={priceType}
      />
      <DateRangePicker
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChanged={(args) => dispatch(dateFromToSelected(args))}
      />
      {selectedTickers.length > 0 && (
        <ul className="sch-toolbar__selected-tickers">
          {selectedTickers.map((ticker, index) => {
            return (
              <li
                key={ticker.symbol}
                className="sch-toolbar__selected-tickers__item"
                title={ticker.description || ''}
              >
                {ticker.displaySymbol}
                <button
                  onClick={() => dispatch(removeSelectedTicker(ticker))}
                  title="Remove Ticker"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
