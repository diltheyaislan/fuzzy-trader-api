import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';

@injectable()
class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const transaction = await this.transactionsRepository.findById(id);

    if (!transaction) {
      throw new AppError(locale.resources.transactions.notFound, 404);
    }

    await this.transactionsRepository.delete(transaction.id);
  }
}

export default DeleteTransactionService;
