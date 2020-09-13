import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';

interface IRequest {
  name: string;
  symbol: string;
  description: string;
}

@injectable()
class CreateCryptocurrencyService {
  constructor(
    @inject('CryptocurrenciesRepository')
    private cryptocurrenciesRepository: ICryptocurrenciesRepository,
  ) {}

  public async execute({
    name,
    symbol,
    description,
  }: IRequest): Promise<Cryptocurrency> {
    const checkCryptocurrencyExists = await this.cryptocurrenciesRepository.findBySymbol(
      symbol,
    );

    if (checkCryptocurrencyExists) {
      throw new AppError(locale.resources.cryptocurrencies.alreadyExists, 409);
    }
    const cryptocurrency = await this.cryptocurrenciesRepository.create({
      name,
      symbol,
      description,
    });

    return cryptocurrency;
  }
}

export default CreateCryptocurrencyService;
