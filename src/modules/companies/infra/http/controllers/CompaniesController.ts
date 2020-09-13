import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import ListCompanyService from '@modules/companies/services/ListCompaniesServices';
import ShowCompanyService from '@modules/companies/services/ShowCompanyService';
import UpdateCompanyService from '@modules/companies/services/UpdateCompanyService';
import DeleteCompanyService from '@modules/companies/services/DeleteCompanyService';

export default class CompaniesController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listCompanies = container.resolve(ListCompanyService);

    const companies = await listCompanies.execute();

    return response.json(classToClass(companies));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCompany = container.resolve(ShowCompanyService);

    const company = await showCompany.execute(id);

    return response.json(classToClass(company));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, symbol, description } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
      symbol,
      description,
    });

    return response.json(classToClass(company));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, symbol, description } = request.body;

    const udpateCompany = container.resolve(UpdateCompanyService);

    const company = await udpateCompany.execute({
      id,
      name,
      symbol,
      description,
    });

    return response.json(classToClass(company));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompany = container.resolve(DeleteCompanyService);

    await deleteCompany.execute(id);

    return response.status(204).send();
  }
}
