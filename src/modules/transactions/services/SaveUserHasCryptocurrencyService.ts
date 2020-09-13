import { injectable, inject } from 'tsyringe';

import UserHasCryptocurrency from '../infra/typeorm/entities/UserHasCryptocurrency';
import IUserHasCryptocurrenciesRepository from '../repositories/IUserHasCryptocurrenciesRepository';

interface IRequest {
  quantity: number;
  user_id: string;
  cryptocurrency_id: string;
}

@injectable()
class SaveUserHasCryptocurrencyService {
  constructor(
    @inject('UserHasCryptocurrenciesRepository')
    private userHasCryptocurrenciesRepository: IUserHasCryptocurrenciesRepository,
  ) {}

  public async execute({
    quantity,
    user_id,
    cryptocurrency_id,
  }: IRequest): Promise<UserHasCryptocurrency> {
    const foundUserHasCryptocurrency = await this.userHasCryptocurrenciesRepository.find(
      {
        user_id,
        cryptocurrency_id,
      },
    );

    if (foundUserHasCryptocurrency) {
      foundUserHasCryptocurrency.quantity += quantity;

      const userHasCryptocurrency = await this.userHasCryptocurrenciesRepository.save(
        foundUserHasCryptocurrency,
      );

      return userHasCryptocurrency;
    }
    const userHasCryptocurrency = await this.userHasCryptocurrenciesRepository.create(
      {
        quantity,
        user_id,
        cryptocurrency_id,
      },
    );

    return userHasCryptocurrency;
  }
}

export default SaveUserHasCryptocurrencyService;
