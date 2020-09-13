import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCryptocurrencyService from '@modules/cryptocurrencies/services/CreateCryptocurrencyService';
import ListCryptocurrencyService from '@modules/cryptocurrencies/services/ListCryptocurrenciesServices';
import ShowCryptocurrencyService from '@modules/cryptocurrencies/services/ShowCryptocurrencyService';
import UpdateCryptocurrencyService from '@modules/cryptocurrencies/services/UpdateCryptocurrencyService';
import DeleteCryptocurrencyService from '@modules/cryptocurrencies/services/DeleteCryptocurrencyService';

export default class CryptocurrenciesController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listCryptocurrencies = container.resolve(ListCryptocurrencyService);

    const cryptocurrencies = await listCryptocurrencies.execute();

    return response.json(classToClass(cryptocurrencies));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCryptocurrency = container.resolve(ShowCryptocurrencyService);

    const cryptocurrency = await showCryptocurrency.execute(id);

    return response.json(classToClass(cryptocurrency));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, symbol, description } = request.body;

    const createCryptocurrency = container.resolve(CreateCryptocurrencyService);

    const cryptocurrency = await createCryptocurrency.execute({
      name,
      symbol,
      description,
    });

    return response.json(classToClass(cryptocurrency));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, symbol, description } = request.body;

    const udpateCryptocurrency = container.resolve(UpdateCryptocurrencyService);

    const cryptocurrency = await udpateCryptocurrency.execute({
      id,
      name,
      symbol,
      description,
    });

    return response.json(classToClass(cryptocurrency));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCryptocurrency = container.resolve(DeleteCryptocurrencyService);

    await deleteCryptocurrency.execute(id);

    return response.status(204).send();
  }
}
