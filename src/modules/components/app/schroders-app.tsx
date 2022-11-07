import React, { useEffect, useState } from "react";
import "./schroders-app.less";
import { Toolbar } from "@modules/components";
import { Ticker } from "@modules/domain";
import { getUsSymbolsListAsync } from "@modules/services";

export const SchrodersApp = () => {
  const [tickers, setTickers] = useState<Array<Ticker>>([]);

  useEffect(() => {
    getUsSymbolsListAsync().then((tickers: Array<Ticker>) => {
      setTickers(tickers);
    });
  }, []);

  return (
    <div className="sch-app">
      <Toolbar tickers={tickers} onTickerSelection={() => {}}></Toolbar>
    </div>
  );
};
