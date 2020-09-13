import { getRepository, Repository } from 'typeorm';

import ICreateCryptocurrencyDTO from '@modules/cryptocurrencies/dtos/ICreateCryptocurrencyDTO';
import ICryptocurrenciesRepository from '@modules/cryptocurrencies/repositories/ICryptocurrenciesRepository';
import Cryptocurrency from '../entities/Cryptocurrency';

class CryptocurrenciesRepository implements ICryptocurrenciesRepository {
  private ormRepository: Repository<Cryptocurrency>;

  constructor() {
    this.ormRepository = getRepository(Cryptocurrency);
  }

  public async find(): Promise<Cryptocurrency[]> {
    const cryptocurrencies = await this.ormRepository.find({
      order: { name: 'ASC' },
    });
    return cryptocurrencies;
  }

  public async findById(id: string): Promise<Cryptocurrency | undefined> {
    const cryptocurrencies = await this.ormRepository.findOne(id);
    return cryptocurrencies;
  }

  public async findBySymbol(
    symbol: string,
  ): Promise<Cryptocurrency | undefined> {
    const cryptocurrency = await this.ormRepository.findOne({
      where: { symbol },
    });
    return cryptocurrency;
  }

  public async create(
    cryptocurrencyData: ICreateCryptocurrencyDTO,
  ): Promise<Cryptocurrency> {
    const cryptocurrency = this.ormRepository.create(cryptocurrencyData);
    await this.ormRepository.save(cryptocurrency);

    return cryptocurrency;
  }

  public async save(cryptocurrency: Cryptocurrency): Promise<Cryptocurrency> {
    return this.ormRepository.save(cryptocurrency);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default CryptocurrenciesRepository;
