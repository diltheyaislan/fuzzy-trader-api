import { injectable, inject } from 'tsyringe';

import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';
import ICryptocurrencyMarketProvider from '../providers/CrpytocurrencyMarketProvider/models/ICryptocurrencyMarketProvider';

@injectable()
class ListCryptocurrenciesService {
  constructor(
    @inject('CryptocurrenciesRepository')
    private cryptocurrenciesRepository: ICryptocurrenciesRepository,

    @inject('CryptocurrencyMarketProvider')
    private cryptocurrencyMarketProvider: ICryptocurrencyMarketProvider,
  ) {}

  public async execute(): Promise<Cryptocurrency[]> {
    const cryptocurrencies = await this.cryptocurrenciesRepository.find();

    const symbols = cryptocurrencies.map(currency => currency.symbol);

    const prices = await this.cryptocurrencyMarketProvider.getPrices(
      ...symbols,
    );

    cryptocurrencies.forEach(currency => {
      const price = prices.find(p => p.symbol === currency.symbol);
      currency.price = price?.price || 0;
    });

    return cryptocurrencies;
  }
}

export default ListCryptocurrenciesService;
