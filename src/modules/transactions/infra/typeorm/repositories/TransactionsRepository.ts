import { getRepository, Repository } from 'typeorm';

import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import Transaction from '../entities/Transaction';

class TransactionsRepository implements ITransactionsRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async find(user_id: string): Promise<Transaction[]> {
    const transactions = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
      relations: ['company', 'cryptocurrency'],
    });
    return transactions;
  }

  public async findById(id: string): Promise<Transaction | undefined> {
    const transactions = await this.ormRepository.findOne(id);
    return transactions;
  }

  public async create(
    transactionData: ICreateTransactionDTO,
  ): Promise<Transaction> {
    const transaction = this.ormRepository.create(transactionData);
    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TransactionsRepository;
