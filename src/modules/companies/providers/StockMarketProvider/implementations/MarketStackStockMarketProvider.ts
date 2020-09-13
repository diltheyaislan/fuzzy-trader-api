import Axios from 'axios';

import IStockMarketProvider, {
  IStockMarket,
} from '../models/IStockMarketProvider';

interface IDataResponse {
  close: number;
  symbol: string;
  exchange: string;
}

interface IResponse {
  data: IDataResponse[];
}

export default class MarketStackStockMarketProvider
  implements IStockMarketProvider {
  private BASE_URL = 'http://api.marketstack.com/v1';

  private URL_EOD = `eod/latest?access_key=${process.env.MARKET_STACK_ACCESS_KEY}`;

  async getPrices(...symbols: string[]): Promise<IStockMarket[]> {
    const api = Axios.create({
      baseURL: this.BASE_URL,
    });

    const response = await api.get<IResponse>(
      `${this.URL_EOD}&symbols=${symbols.join(',')}`,
    );

    const prices: IStockMarket[] = response.data.data.map(price => {
      return {
        price: price.close,
        symbol: price.symbol,
      };
    });

    return prices;
  }
}
