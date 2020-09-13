import ICreateUserHasCryptocurrencyDTO from '../dtos/ICreateUserHasCryptocurrencyDTO';
import IFindUserHasCryptocurrencyDTO from '../dtos/IFindUserHasCryptocurrencyDTO';
import UserHasCryptocurrency from '../infra/typeorm/entities/UserHasCryptocurrency';

export default interface IUserHasCryptocurrenciesRepository {
  find(
    data: IFindUserHasCryptocurrencyDTO,
  ): Promise<UserHasCryptocurrency | undefined>;
  findByUser(id: string): Promise<UserHasCryptocurrency[]>;
  create(data: ICreateUserHasCryptocurrencyDTO): Promise<UserHasCryptocurrency>;
  save(data: UserHasCryptocurrency): Promise<UserHasCryptocurrency>;
  delete(id: string): Promise<void>;
}
