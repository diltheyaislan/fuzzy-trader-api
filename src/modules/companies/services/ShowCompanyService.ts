import { injectable, inject } from 'tsyringe';

import locale from '@config/locales';
import AppError from '@shared/errors/AppError';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IStockMarketProvider from '../providers/StockMarketProvider/models/IStockMarketProvider';

@injectable()
class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('StockMarketProvider')
    private stockMarketProvider: IStockMarketProvider,
  ) {}

  public async execute(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError(locale.resources.companies.notFound, 404);
    }

    const prices = await this.stockMarketProvider.getPrices(company.symbol);

    const price = prices.find(p => p.symbol === company.symbol);
    company.price = price?.price || 0;

    return company;
  }
}

export default ShowCompanyService;
