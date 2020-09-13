import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateTransactionService from '@modules/transactions/services/CreateTransactionService';
import ListTransactionService from '@modules/transactions/services/ListTransactionsServices';
import ShowTransactionService from '@modules/transactions/services/ShowTransactionService';
import DeleteTransactionService from '@modules/transactions/services/DeleteTransactionService';

export default class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTransactions = container.resolve(ListTransactionService);

    const userId = request.user.id;

    const transactions = await listTransactions.execute(userId);

    return response.json(classToClass(transactions));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransaction = container.resolve(ShowTransactionService);

    const company = await showTransaction.execute(id);

    return response.json(classToClass(company));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      quantity,
      amount,
      company_id,
      cryptocurrency_id,
      price,
    } = request.body;

    const user_id = request.user.id;

    const createTransaction = container.resolve(CreateTransactionService);

    const company = await createTransaction.execute({
      quantity,
      amount,
      user_id,
      company_id,
      cryptocurrency_id,
      price,
    });

    return response.json(classToClass(company));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTransaction = container.resolve(DeleteTransactionService);

    await deleteTransaction.execute(id);

    return response.status(204).send();
  }
}
