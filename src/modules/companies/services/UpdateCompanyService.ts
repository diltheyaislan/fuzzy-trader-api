import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

interface IRequest {
  id: string;
  name?: string;
  symbol?: string;
  image?: string;
  description?: string;
}

@injectable()
class UpdateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    id,
    name,
    symbol,
    description,
  }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError(locale.resources.companies.notFound, 404);
    }

    if (name) {
      company.name = name;
    }

    if (symbol) {
      const checkCompanyExists = await this.companiesRepository.findBySymbol(
        symbol,
      );

      if (checkCompanyExists && checkCompanyExists.id !== id) {
        throw new AppError(locale.resources.companies.alreadyExists, 409);
      }

      company.symbol = symbol;
    }

    if (description) {
      company.description = description;
    }

    return this.companiesRepository.save(company);
  }
}

export default UpdateCompanyService;
