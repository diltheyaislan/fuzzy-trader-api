import { injectable, inject, container } from 'tsyringe';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionsRepository from '@modules/transactions/repositories/ITransactionsRepository';
import ShowCryptocurrencyService from '@modules/cryptocurrencies/services/ShowCryptocurrencyService';
import ShowCompanyService from '@modules/companies/services/ShowCompanyService';
import SaveUserHasCompanyService from './SaveUserHasCompanyService';
import SaveUserHasCryptocurrencyService from './SaveUserHasCryptocurrencyService';

interface IRequest {
  amount: number;
  user_id: string;
  company_id?: string;
  cryptocurrency_id?: string;
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
  ) {}

  public async execute({
    amount,
    user_id,
    company_id,
    cryptocurrency_id,
  }: IRequest): Promise<Transaction> {
    const transactionData = {
      quantity: 0,
      price: 0,
      amount,
      type: cryptocurrency_id ? 'cryptocurrency' : 'shares',
      user_id,
      company_id,
      cryptocurrency_id,
    };

    if (cryptocurrency_id && transactionData.type === 'cryptocurrency') {
      const showCryptocurrency = container.resolve(ShowCryptocurrencyService);
      const currency = await showCryptocurrency.execute(cryptocurrency_id);

      transactionData.price = currency.price;
      transactionData.quantity = amount / currency.price;

      delete transactionData.company_id;
    }

    if (company_id && transactionData.type === 'shares') {
      const showCompany = container.resolve(ShowCompanyService);
      const company = await showCompany.execute(company_id);

      transactionData.price = company.price;
      transactionData.quantity = amount / company.price;

      delete transactionData.cryptocurrency_id;
    }

    const transaction = await this.transactionsRepository.create(
      transactionData,
    );

    if (company_id && transaction.type === 'shares') {
      const saveUserHasCompany = container.resolve(SaveUserHasCompanyService);
      await saveUserHasCompany.execute({
        quantity: transactionData.quantity,
        user_id,
        company_id,
      });
    }

    if (cryptocurrency_id && transaction.type === 'cryptocurrency') {
      const saveUserHasCryptocurrency = container.resolve(
        SaveUserHasCryptocurrencyService,
      );
      await saveUserHasCryptocurrency.execute({
        quantity: transactionData.quantity,
        user_id,
        cryptocurrency_id,
      });
    }

    return transaction;
  }
}

export default CreateTransactionService;
