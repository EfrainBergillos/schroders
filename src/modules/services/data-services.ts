// @ts-ignore
import { ApiClient, DefaultApi } from "finnhub";
import { Ticker } from "@modules/domain";

ApiClient.instance.authentications["api_key"].apiKey =
  "cdjt6n2ad3i33584nqngcdjt6n2ad3i33584nqo0";
ApiClient.instance.defaultHeaders = {};

const finnHubClient = new DefaultApi();

export const getUsSymbolsListAsync = (): Promise<Array<Ticker>> => {
  return new Promise((resolve, reject) => {
    finnHubClient.stockSymbols(
      "US",
      {},
      (error: any, data: any, response: any) => {
        if (!error) {
          resolve(data as Array<Ticker>);
        }
        reject([]);
      }
    );
  });
};
