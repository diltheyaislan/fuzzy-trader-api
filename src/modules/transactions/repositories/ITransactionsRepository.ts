import ICreateTransactionDTO from '../dtos/ICreateTransactionDTO';
import Transaction from '../infra/typeorm/entities/Transaction';

export default interface ITransactionsRepository {
  find(userId: string): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | undefined>;
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
