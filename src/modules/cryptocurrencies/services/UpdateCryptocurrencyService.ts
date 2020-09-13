import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Cryptocurrency from '@modules/cryptocurrencies/infra/typeorm/entities/Cryptocurrency';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';

interface IRequest {
  id: string;
  name?: string;
  symbol?: string;
  image?: string;
  description?: string;
}

@injectable()
class UpdateCryptocurrencyService {
  constructor(
    @inject('CryptocurrenciesRepository')
    private cryptocurrenciesRepository: ICryptocurrenciesRepository,
  ) {}

  public async execute({
    id,
    name,
    symbol,
    description,
  }: IRequest): Promise<Cryptocurrency> {
    const cryptocurrency = await this.cryptocurrenciesRepository.findById(id);

    if (!cryptocurrency) {
      throw new AppError(locale.resources.cryptocurrencies.notFound, 404);
    }

    if (name) {
      cryptocurrency.name = name;
    }

    if (symbol) {
      const checkCryptocurrencyExists = await this.cryptocurrenciesRepository.findBySymbol(
        symbol,
      );

      if (checkCryptocurrencyExists && checkCryptocurrencyExists.id !== id) {
        throw new AppError(
          locale.resources.cryptocurrencies.alreadyExists,
          409,
        );
      }

      cryptocurrency.symbol = symbol;
    }

    if (description) {
      cryptocurrency.description = description;
    }

    return this.cryptocurrenciesRepository.save(cryptocurrency);
  }
}

export default UpdateCryptocurrencyService;
