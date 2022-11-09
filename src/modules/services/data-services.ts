// @ts-ignore
import { ApiClient, DefaultApi } from 'finnhub';
import { PriceType, TCharSeries, Ticker } from '@modules/domain';

ApiClient.instance.authentications['api_key'].apiKey =
  'cdjt6n2ad3i33584nqngcdjt6n2ad3i33584nqo0';
ApiClient.instance.defaultHeaders = {};

const finnHubClient = new DefaultApi();

export const getUsSymbolsListAsync = (): Promise<Array<Ticker>> => {
  return new Promise((resolve, reject) => {
    finnHubClient.stockSymbols(
      'US',
      {},
      (error: any, data: Array<any>, response: any) => {
        if (!error) {
          const propsSubsetData = data.map((data) => {
            const { symbol, displaySymbol, description } = data;
            return { symbol, displaySymbol, description } as Ticker;
          });

          resolve(propsSubsetData);
        }
        reject([]);
      }
    );
  });
};

type TGetCandlesCallProps = {
  ticker: Ticker;
  priceType: PriceType;
  resolution: string;
  dateFrom: Date;
  dateTo: Date;
};

export const getCandlesAsync = ({
  ticker,
  priceType,
  resolution = '5',
  dateFrom,
  dateTo,
}: TGetCandlesCallProps): Promise<Array<TCharSeries>> => {
  return new Promise((resolve, reject) => {
    finnHubClient.stock_candles(
      ticker.symbol,
      resolution,
      dateFrom.getTime(),
      dateTo.getTime(),
      (error: any, data: Array<any>, response: any) => {
        if (!error) {
          resolve(data);
        }
        reject([]);
      }
    );
  });
};
