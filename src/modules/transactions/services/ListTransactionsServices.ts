import { injectable, inject } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

@injectable()
class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(userId: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find(userId);

    return transactions;
  }
}

export default ListTransactionsService;
