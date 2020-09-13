import { injectable, inject } from 'tsyringe';

import UserHasCryptocurrency from '@modules/transactions/infra/typeorm/entities/UserHasCryptocurrency';
import IUserHasCryptocurrenciesRepository from '@modules/transactions/repositories/IUserHasCryptocurrenciesRepository';
import ICryptocurrencyMarketProvider from '@modules/cryptocurrencies/providers/CrpytocurrencyMarketProvider/models/ICryptocurrencyMarketProvider';

@injectable()
class ListUserCryptocurrenciesService {
  constructor(
    @inject('UserHasCryptocurrenciesRepository')
    private userHasCryptocurrenciesRepository: IUserHasCryptocurrenciesRepository,

    @inject('CryptocurrencyMarketProvider')
    private cryptocurrencyMarketProvider: ICryptocurrencyMarketProvider,
  ) {}

  public async execute(user_id: string): Promise<UserHasCryptocurrency[]> {
    const currencies = await this.userHasCryptocurrenciesRepository.findByUser(
      user_id,
    );

    const symbols = currencies.map(currency => currency.cryptocurrency.symbol);

    if (symbols.length > 0) {
      const prices = await this.cryptocurrencyMarketProvider.getPrices(
        ...symbols,
      );

      currencies.forEach(currency => {
        const price = prices.find(
          p => p.symbol === currency.cryptocurrency.symbol,
        );
        currency.cryptocurrency.price = price?.price || 0;
      });
    }

    return currencies;
  }
}

export default ListUserCryptocurrenciesService;
