import React, { useEffect, useRef, useState } from 'react';
import { Ticker } from '@modules/domain';
import { useClickOutside } from '@modules/utils';
import './ticker-search.less';

const MAX_TICKER_RESULTS = 30;
const MAX_SELECTED_TICKERS = 3;

type TTickerSearch = {
  tickersList: Array<Ticker>;
  selectedTickers: Array<Ticker>;
  onTickerSelected: (ticker: Ticker) => any;
};

export const TickerSearch = ({
  tickersList,
  selectedTickers,
  onTickerSelected,
}: TTickerSearch): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Array<Ticker>>([]);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);
  const searchRef = useRef();

  useEffect(() => {
    setSearchTerm('');
    setSearchEnabled(selectedTickers.length < MAX_SELECTED_TICKERS);
  }, [selectedTickers]);

  useClickOutside(searchRef, () => setSearchTerm(''));

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value;

    if (!searchTerm) {
      setSearchResults([]);
    } else {
      const regex = new RegExp(searchTerm, 'i');

      let results = tickersList.filter((ticker) => {
        const searchScope = `${ticker.symbol}-${ticker.displaySymbol}-${ticker.description}`;

        return (
          regex.test(searchScope) &&
          !selectedTickers.find((selected) => selected.symbol === ticker.symbol)
        );
      });

      results =
        results.length > MAX_TICKER_RESULTS
          ? results.slice(0, MAX_TICKER_RESULTS - 1)
          : results;
      setSearchResults(results);
    }
    setSearchTerm(searchTerm);
  };

  return (
    <div ref={searchRef} className="sch-ticker-search">
      <input
        disabled={!searchEnabled}
        title={searchEnabled ? `Max tickers: ${MAX_SELECTED_TICKERS}` : ''}
        className="sch-ticker-search__input"
        placeholder="Search Ticker"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchTerm && (
        <ul className="sch-ticker-search__results">
          {searchTerm && !searchResults.length && <li>no results</li>}
          {searchResults.map((ticker) => (
            <li
              className="sch-ticker-search__results__item"
              onClick={() => onTickerSelected(ticker)}
              key={ticker.symbol}
            >
              <div className="sch-ticker-search__results__ticker">
                {ticker.displaySymbol}
              </div>
              <div className="sch-ticker-search__results__description">
                {ticker.description}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
