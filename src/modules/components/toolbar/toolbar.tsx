import React, { useRef, useState } from "react";
import { Ticker, PriceLabels, PriceTypes } from "@modules/domain";
import { useClickOutside } from "@modules/utils";
import { GenericDropdown } from "@modules/components";
import "./toolbar.less";

type ToolbarProps = {
  tickers: Array<Ticker>;
  onTickerSelection: (tickers: Array<Ticker>) => void;
};
const MAX_TICKER_RESULTS = 30;
const MAX_SELECTED_TICKERS = 3;

export const Toolbar = ({
  tickers,
  onTickerSelection,
}: ToolbarProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Array<Ticker>>([]);
  const [selectedTickers, setSelectedTickers] = useState<Array<Ticker>>([]);
  const [searchEnabled, setSearchEnabled] = useState<boolean>(true);
  const searchRef = useRef();

  useClickOutside(searchRef, () => setSearchTerm(""));

  const handleSearchChange = (event: any) => {
    const searchTerm = event.target.value;

    if (!searchTerm) {
      setSearchResults([]);
    } else {
      const regex = new RegExp(searchTerm, "i");

      let results = tickers.filter((ticker) => {
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

  const handleSelectTicker = (ticker: Ticker) => {
    selectedTickers.push(ticker);
    setSelectedTickers(selectedTickers);
    setSearchTerm("");
    setSearchEnabled(selectedTickers.length < MAX_SELECTED_TICKERS);
    onTickerSelection(selectedTickers);
  };

  const handleRemoveTicker = (index: number) => {
    const newTickers = [...selectedTickers];
    newTickers.splice(index, 1);
    setSelectedTickers(newTickers);
    setSearchEnabled(true);
  };

  return (
    <div className="sch-toolbar">
      <div ref={searchRef} className="sch-toolbar__search">
        <input
          disabled={!searchEnabled}
          title={!searchEnabled && `Max tickers: ${MAX_SELECTED_TICKERS}`}
          className="sch-toolbar__search__input"
          placeholder="Search Ticker"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <ul className="sch-toolbar__search-results">
            {searchTerm && !searchResults.length && <li>no results</li>}
            {searchResults.map((ticker) => (
              <li
                className="sch-toolbar__search-results__item"
                onClick={() => handleSelectTicker(ticker)}
                key={ticker.symbol}
              >
                <div className="sch-toolbar__search-results__ticker">
                  {ticker.displaySymbol}
                </div>
                <div className="sch-toolbar__search-results__description">
                  {ticker.description}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ul className="sch-toolbar__selected-tickers">
        {selectedTickers.map((ticker, index) => {
          return (
            <li
              key={ticker.symbol}
              className="sch-toolbar__selected-tickers__item"
              title={ticker.description}
            >
              {ticker.displaySymbol}
              <button
                onClick={() => handleRemoveTicker(index)}
                title="Remove Ticker"
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <GenericDropdown
        dataList={PriceLabels}
        onSelection={() => {}}
        selected={PriceTypes.OPEN_PRICES}
      />
    </div>
  );
};
