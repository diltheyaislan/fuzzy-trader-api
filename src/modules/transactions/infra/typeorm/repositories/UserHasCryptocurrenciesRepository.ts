import { getRepository, Repository } from 'typeorm';

import ICreateUserHasCryptocurrencyDTO from '@modules/transactions/dtos/ICreateUserHasCryptocurrencyDTO';
import IUserHasCryptocurrenciesRepository from '@modules/transactions/repositories/IUserHasCryptocurrenciesRepository';
import IFindUserHasCryptocurrencyDTO from '@modules/transactions/dtos/IFindUserHasCryptocurrencyDTO';
import UserHasCryptocurrency from '../entities/UserHasCryptocurrency';

class UserHasCryptocurrenciesRepository
  implements IUserHasCryptocurrenciesRepository {
  private ormRepository: Repository<UserHasCryptocurrency>;

  constructor() {
    this.ormRepository = getRepository(UserHasCryptocurrency);
  }

  public async find({
    user_id,
    cryptocurrency_id,
  }: IFindUserHasCryptocurrencyDTO): Promise<
    UserHasCryptocurrency | undefined
  > {
    const cryptocurrency = await this.ormRepository.findOne({
      where: { user_id, cryptocurrency_id },
    });
    return cryptocurrency;
  }

  public async findByUser(user_id: string): Promise<UserHasCryptocurrency[]> {
    const cryptocurrencies = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
      relations: ['cryptocurrency'],
    });
    return cryptocurrencies;
  }

  public async create(
    data: ICreateUserHasCryptocurrencyDTO,
  ): Promise<UserHasCryptocurrency> {
    const cryptocurrency = this.ormRepository.create(data);
    await this.ormRepository.save(cryptocurrency);

    return cryptocurrency;
  }

  public async save(
    cryptocurrency: UserHasCryptocurrency,
  ): Promise<UserHasCryptocurrency> {
    return this.ormRepository.save(cryptocurrency);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UserHasCryptocurrenciesRepository;
