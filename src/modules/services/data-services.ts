// @ts-ignore
import { ApiClient, DefaultApi } from 'finnhub';
import { THLOCSeries, Ticker } from '@modules/domain';

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
  resolution?: string;
  dateFrom: Date;
  dateTo: Date;
};

export const getCandlesAsync = ({
  ticker,
  resolution = 'D',
  dateFrom,
  dateTo,
}: TGetCandlesCallProps): Promise<THLOCSeries> => {
  return new Promise((resolve, reject) => {
    finnHubClient.stockCandles(
      ticker.symbol,
      resolution,
      Math.round(dateFrom.getTime() / 1000),
      Math.round(dateTo.getTime() / 1000),
      (error: any, data: THLOCSeries, response: any) => {
        if (!error) {
          resolve(data);
        }
        reject([]);
      }
    );
  });
};
