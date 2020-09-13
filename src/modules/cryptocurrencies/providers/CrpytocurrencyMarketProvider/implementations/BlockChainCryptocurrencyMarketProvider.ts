import Axios from 'axios';

import ICryptocurrencyMarketProvider, {
  CrpytocurrencyMarket,
} from '../models/ICryptocurrencyMarketProvider';

interface IResponse {
  USD: {
    buy: number;
  };
}

export default class BlockChainCryptocurrencyMarketProvider
  implements ICryptocurrencyMarketProvider {
  private BASE_URL = 'https://blockchain.info';

  async getPrices(...symbols: string[]): Promise<CrpytocurrencyMarket[]> {
    const api = Axios.create({
      baseURL: this.BASE_URL,
    });

    const response = await api.get<IResponse>('ticker');

    const price: number = response.data.USD.buy;

    const prices: CrpytocurrencyMarket[] = symbols.map(symbol => {
      return {
        price,
        symbol,
      } as CrpytocurrencyMarket;
    });

    return prices;
  }
}
