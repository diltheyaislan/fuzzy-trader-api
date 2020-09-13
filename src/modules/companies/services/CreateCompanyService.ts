import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

interface IRequest {
  name: string;
  symbol: string;
  image?: string;
  description: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    name,
    symbol,
    description,
  }: IRequest): Promise<Company> {
    const checkCompanyExists = await this.companiesRepository.findBySymbol(
      symbol,
    );

    if (checkCompanyExists) {
      throw new AppError(locale.resources.companies.alreadyExists, 409);
    }
    const company = await this.companiesRepository.create({
      name,
      symbol,
      description,
    });

    return company;
  }
}

export default CreateCompanyService;
