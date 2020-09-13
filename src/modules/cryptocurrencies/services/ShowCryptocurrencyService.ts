import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';
import ICryptocurrencyMarketProvider from '../providers/CrpytocurrencyMarketProvider/models/ICryptocurrencyMarketProvider';

@injectable()
class ShowCryptocurrencyService {
  constructor(
    @inject('CryptocurrenciesRepository')
    private cryptocurrenciesRepository: ICryptocurrenciesRepository,

    @inject('CryptocurrencyMarketProvider')
    private cryptocurrencyMarketProvider: ICryptocurrencyMarketProvider,
  ) {}

  public async execute(id: string): Promise<Cryptocurrency> {
    const currency = await this.cryptocurrenciesRepository.findById(id);

    if (!currency) {
      throw new AppError(locale.resources.cryptocurrencies.notFound, 404);
    }

    const prices = await this.cryptocurrencyMarketProvider.getPrices(
      currency.symbol,
    );

    const price = prices.find(p => p.symbol === currency.symbol);
    currency.price = price?.price || 0;

    return currency;
  }
}

export default ShowCryptocurrencyService;
